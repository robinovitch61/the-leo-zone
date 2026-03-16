#!/usr/bin/env python3
"""
Convert a terminal "screenplay" file to an HTML fragment.

ANSI-to-HTML converter: a state machine that walks each event's text,
tracks SGR state (colors, bold, dim, underline, reverse), and emits
<span> elements with appropriate CSS classes.

Wide characters (emoji, CJK) are wrapped in inline-block spans forced
to exactly 2ch width so the browser aligns them with the surrounding
monospace grid.
"""

import re
import sys
import unicodedata
from html import escape as html_escape

PROMPT = "$ "
DEFAULT_WIDTH = 80
DEFAULT_HEIGHT = 24
DEFAULT_DELAY = 0.05


def unescape(s: str) -> str:
    """replace \\e or \\033 literals with the actual ESC character."""
    return s.replace("\\e", "\x1b").replace("\\033", "\x1b")


def parse_screenplay(text: str):
    meta = {
        "title": "terminal",
        "width": DEFAULT_WIDTH,
        "height": DEFAULT_HEIGHT,
        "delay": DEFAULT_DELAY,
    }
    events = []
    t = 0.1

    for raw_line in text.splitlines():
        if raw_line.startswith("#!"):
            m = re.match(r"#!(\w+):\s*(.+)", raw_line)
            if m:
                key, val = m.group(1), m.group(2).strip()
                if key in ("width", "height"):
                    meta[key] = int(val)
                elif key == "delay":
                    meta["delay"] = float(val)
                elif key == "title":
                    meta["title"] = val
            continue

        if raw_line.startswith("#"):
            continue

        line = unescape(raw_line)
        events.append([round(t, 3), "o", line + "\r\n"])
        t += meta["delay"]

    return meta, events


COLOR_NAMES = [
    "black", "red", "green", "yellow",
    "blue", "magenta", "cyan", "white",
]

SGR_RE = re.compile(r"\x1b\[([0-9;]*)m")


def _is_wide(ch: str) -> bool:
    """return True if ch occupies two cells in a terminal."""
    return unicodedata.east_asian_width(ch) in ("W", "F")


def _color_class(layer: str, n: int) -> str:
    """return a CSS class name for color index n."""
    if n < 8:
        return f"ansi-{layer}-{COLOR_NAMES[n]}"
    if n < 16:
        return f"ansi-{layer}-bright-{COLOR_NAMES[n - 8]}"
    return f"ansi-{layer}-{n}"


class SGRState:
    """track current SGR attributes."""

    __slots__ = ("fg", "bg", "bold", "dim", "underline", "reverse")

    def __init__(self):
        self.fg = None
        self.bg = None
        self.bold = False
        self.dim = False
        self.underline = False
        self.reverse = False

    def reset(self):
        self.fg = self.bg = None
        self.bold = self.dim = self.underline = self.reverse = False

    def classes(self) -> list[str]:
        """return list of CSS class names for the current state."""
        cls = []
        if self.bold:
            cls.append("ansi-bold")
        if self.dim:
            cls.append("ansi-dim")
        if self.underline:
            cls.append("ansi-underline")
        if self.reverse:
            cls.append("ansi-reverse")
        if self.fg is not None:
            cls.append(_color_class("fg", self.fg))
        if self.bg is not None:
            cls.append(_color_class("bg", self.bg))
        return cls

    def apply(self, params: list[int]):
        """apply a list of SGR parameters."""
        i = 0
        while i < len(params):
            p = params[i]
            if p == 0:
                self.reset()
            elif p == 1:
                self.bold = True
            elif p == 2:
                self.dim = True
            elif p == 4:
                self.underline = True
            elif p == 7:
                self.reverse = True
            elif p == 22:
                self.bold = self.dim = False
            elif p == 24:
                self.underline = False
            elif p == 27:
                self.reverse = False
            elif 30 <= p <= 37:
                self.fg = p - 30
            elif 40 <= p <= 47:
                self.bg = p - 40
            elif 90 <= p <= 97:
                self.fg = p - 90 + 8
            elif 100 <= p <= 107:
                self.bg = p - 100 + 8
            elif p == 39:
                self.fg = None
            elif p == 49:
                self.bg = None
            elif p in (38, 48):
                # extended color: 38;5;N or 38;2;R;G;B
                attr = "fg" if p == 38 else "bg"
                if i + 1 < len(params) and params[i + 1] == 5:
                    if i + 2 < len(params):
                        setattr(self, attr, params[i + 2])
                        i += 2
                elif i + 1 < len(params) and params[i + 1] == 2:
                    i += 4  # skip 2;R;G;B
            i += 1


def ansi_to_html(text: str) -> str:
    """convert a string with ANSI escapes to HTML with CSS classes."""
    state = SGRState()
    out: list[str] = []
    pos = 0
    in_span = False

    def close_span():
        nonlocal in_span
        if in_span:
            out.append("</span>")
            in_span = False

    def open_span(classes: list[str]):
        nonlocal in_span
        if classes:
            out.append(f'<span class="{" ".join(classes)}">')
            in_span = True

    def emit_segment(seg: str):
        nonlocal in_span
        for ch in seg:
            if _is_wide(ch):
                close_span()
                classes = ["wide-char"] + state.classes()
                out.append(
                    f'<span class="{" ".join(classes)}">'
                    f"{ch}</span>"
                )
                open_span(state.classes())
            else:
                out.append(html_escape(ch, quote=False))

    for m in SGR_RE.finditer(text):
        emit_segment(text[pos:m.start()])

        raw = m.group(1)
        params = [int(x) for x in raw.split(";") if x] if raw else [0]
        close_span()
        state.apply(params)
        open_span(state.classes())

        pos = m.end()

    emit_segment(text[pos:])
    close_span()

    return "".join(out)


def screenplay_to_html(text: str) -> str:
    """convert a screenplay string to an HTML <pre> content fragment."""
    meta, events = parse_screenplay(text)
    lines: list[str] = []
    for _t, _kind, data in events:
        line = data
        if line.endswith("\r\n"):
            line = line[:-2]
        elif line.endswith("\n"):
            line = line[:-1]
        lines.append(ansi_to_html(line))
    return "\n".join(lines)


def main():
    if len(sys.argv) < 3:
        print("usage: term2html.py input.term output.html")
        sys.exit(1)

    with open(sys.argv[1]) as f:
        text = f.read()

    html = screenplay_to_html(text)
    with open(sys.argv[2], "w") as f:
        f.write(html)

    print(f"wrote {sys.argv[2]}")


if __name__ == "__main__":
    main()
