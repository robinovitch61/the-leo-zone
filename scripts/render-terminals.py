#!/usr/bin/env python3
r"""
Pre-build step: scan content/**/*.md for inline {{< terminal >}} shortcodes,
generate HTML fragments, and cache them in static/terminals/<title>.html.

The title param is required and must be unique across all shortcodes.

Run before hugo build:
  python3 scripts/render-terminals.py
"""

import re
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).parent))
from term2html import screenplay_to_html

REPO = Path(__file__).parent.parent
CONTENT_DIR = REPO / "content"
STATIC_TERMINALS = REPO / "static" / "terminals"

# matches paired {{< terminal [params] >}}...{{< /terminal >}}
SHORTCODE_RE = re.compile(
    r'\{\{<\s*terminal([^>]*?)>\}\}(.*?)\{\{<\s*/terminal\s*>\}\}',
    re.DOTALL,
)
PARAM_RE = re.compile(r'(\w+)="([^"]*)"')


def parse_params(s: str) -> dict:
    return dict(PARAM_RE.findall(s))


def render(params: dict, content: str, out_path: Path) -> bool:
    directives = []
    if "title" in params:
        directives.append(f"#!title: {params['title']}")
    if "cols" in params:
        directives.append(f"#!width: {params['cols']}")
    if "rows" in params:
        directives.append(f"#!height: {params['rows']}")

    screenplay = "\n".join(directives + [content.strip()])
    html = screenplay_to_html(screenplay)

    if not html:
        print("  skip: no content", file=sys.stderr)
        return False

    out_path.write_text(html)
    return True


def main():
    STATIC_TERMINALS.mkdir(parents=True, exist_ok=True)
    generated = errors = 0
    seen: dict[str, str] = {}  # title → source file
    needed: set[str] = set()

    for md_file in sorted(CONTENT_DIR.rglob("*.md")):
        text = md_file.read_text()
        rel = md_file.relative_to(REPO)
        for m in SHORTCODE_RE.finditer(text):
            params = parse_params(m.group(1))
            inner = m.group(2)

            title = params.get("title")
            if not title:
                print(f"error: {rel}: terminal shortcode missing required title param", file=sys.stderr)
                errors += 1
                continue

            if title in seen:
                print(f"error: {rel}: duplicate terminal title \"{title}\" (also in {seen[title]})", file=sys.stderr)
                errors += 1
                continue
            seen[title] = str(rel)

            filename = f"{title}.html"
            needed.add(filename)
            out_path = STATIC_TERMINALS / filename
            print(f"render {rel} → terminals/{filename}")
            if render(params, inner, out_path):
                generated += 1
            else:
                errors += 1

    # remove stale fragments
    for old in STATIC_TERMINALS.glob("*.html"):
        if old.name not in needed:
            print(f"remove stale terminals/{old.name}")
            old.unlink()

    print(f"{generated} generated, {errors} errors")
    if errors:
        sys.exit(1)


if __name__ == "__main__":
    main()
