---
title: "I Made a $PAGER"
date: "2026-03-04"
description:
  "A writeup of making my own terminal viewport, which eventually became a $PAGER (robinovitch61/lore) and is used in a
  k8s log viewer TUI (robinovitch61/kl)."
draft: true
---

Along with running commands, the terminal is a place for viewing and navigating text.

<!-- prettier-ignore-start -->
{{< terminal cols="100" rows="30" title="cat-file" >}}
\e[33m❯\e[0m cat ~/file.txt
I love terminals!
{{< /terminal >}}
<!-- prettier-ignore-end -->

Terminals have a grid-like nature. Their size is defined in rows and columns, with text filling this grid accordingly.

<!-- prettier-ignore-start -->
{{< terminal cols="40" rows="14" title="chessboard" >}}
\e[33m❯\e[0m cat ~/chessboard.txt
\e[90m    a  b  c  d  e  f  g  h \e[0m
\e[90m 8 \e[47;30m R \e[100;30m N \e[47;30m B \e[100;30m Q \e[47;30m K \e[100;30m B \e[47;30m N \e[100;30m R \e[0m
\e[90m 7 \e[100;30m P \e[47;30m P \e[100;30m P \e[47;30m P \e[100;30m P \e[47;30m P \e[100;30m P \e[47;30m P \e[0m
\e[90m 6 \e[47m   \e[100m   \e[47m   \e[100m   \e[47m   \e[100m   \e[47m   \e[100m   \e[0m
\e[90m 5 \e[100m   \e[47m   \e[100m   \e[47m   \e[100m   \e[47m   \e[100m   \e[47m   \e[0m
\e[90m 4 \e[47m   \e[100m   \e[47m   \e[100m   \e[47m   \e[100m   \e[47m   \e[100m   \e[0m
\e[90m 3 \e[100m   \e[47m   \e[100m   \e[47m   \e[100m   \e[47m   \e[100m   \e[47m   \e[0m
\e[90m 2 \e[47;97m P \e[100;97m P \e[47;97m P \e[100;97m P \e[47;97m P \e[100;97m P \e[47;97m P \e[100;97m P \e[0m
\e[90m 1 \e[100;97m R \e[47;97m N \e[100;97m B \e[47;97m Q \e[100;97m K \e[47;97m B \e[100;97m N \e[47;97m R \e[0m
\e[90m    a  b  c  d  e  f  g  h \e[0m
{{< /terminal >}}
<!-- prettier-ignore-end -->

You can style text with [ANSI escape codes][ansi].

<!-- prettier-ignore-start -->
{{< terminal cols="40" rows="14" title="ansi-red" >}}
\e[33m❯\e[0m echo "\x1b[31mred\x1b[0m"
\e[31mred text\e[0m
{{< /terminal >}}
<!-- prettier-ignore-end -->

- `\x1b[31m`: begin red foreground text styling
- `red text`: content to be styled
- `\x1b[0m`: reset styling

This type of styling is how we get the grey checkerboard pattern in the terminal out of `chessboard.txt` above.

Most Unicode characters take up 1 cell width in the terminal, but special ones don't.

Here's a shell function that uses the [wcwidth] library for checking the width in terminal columns of a string:

```shell
termwidth() {
  uv run --with wcwidth python -c \
  "import wcwidth; print(wcwidth.wcswidth('$1'))"
}
```

Simple strings are the cell width that you'd expect:

<!-- prettier-ignore-start -->
{{< terminal cols="40" rows="14" title="width-simple" >}}
\e[33m❯\e[0m termwidth 'a'
1

\e[33m❯\e[0m termwidth '123'
3
{{< /terminal >}}
<!-- prettier-ignore-end -->

But what's with these ones?

<!-- prettier-ignore-start -->
{{< terminal cols="40" rows="14" title="full-width-emoji" >}}
\e[33m❯\e[0m echo '\u2728'
✨

\e[33m❯\e[0m termwidth '✨'
2
{{< /terminal >}}
<!-- prettier-ignore-end -->

The sparkles emoji, represented by its [unicode code point][codepoint]
[✨ U+2728 SPARKLES](https://unicode-explorer.com/c/2728), takes up two terminal cells in width.

<!-- prettier-ignore-start -->
{{< terminal cols="40" rows="14" title="half-width-emoji" >}}
\e[33m❯\e[0m termwidth '全'
2

\e[33m❯\e[0m termwidth '￭'
1
{{< /terminal >}}
<!-- prettier-ignore-end -->

You can represent single-width characters like 'é' multiple different ways in Unicode: either as a single é code point,
or an e code point with a combining accent codepoint following it.

- [é U+00E9 LATIN SMALL LETTER E WITH ACUTE](https://unicode-explorer.com/c/00E9)
- [e U+0065 LATIN SMALL LETTER E](https://unicode-explorer.com/c/0065)
- [́ U+0301 COMBINING ACUTE ACCENT](https://unicode-explorer.com/c/0301)

<!-- prettier-ignore-start -->
{{< terminal cols="40" rows="14" title="e-accent" >}}
\e[33m❯\e[0m echo '\u00E9'
é

\e[33m❯\e[0m termwidth '\u00E9'
1

\e[33m❯\e[0m echo '\u0065\u0301'
é

\e[33m❯\e[0m termwidth '\u0065\u0301'
1

\e[33m❯\e[0m termwidth '\u0301'
0
{{< /terminal >}}
<!-- prettier-ignore-end -->

In Unicode text and terminals, there are:

- code points: a number assigned to a character in the Unicode standard
- grapheme: a human's perception of a single character (one or more code points)
- byte encoding: byte representation of code points, dependent on UTF-8/16/32
- code point width: the number of terminal cells a code point occupies (0, 1, or 2)
  - a grapheme's terminal width is determined by its combined code points

Terminal applications are a bit like native applications or websites, except that you really only have control of the
terminal grid. The smallest editable item is the terminal cell rather than the pixel. This provides a nice constraint,
pushing most terminal applications to remove all but the essential information and provide a hierarchy of
keyboard-driven views into the data rather than one large scrollable screen of components or button-laden toolbars.

Common workflows in Terminal UIs are:

- move focus between components on the screen
- select from a list of items on the screen
- navigate (scroll, pan, search, filter, wrap, etc.) text on the screen

I have spent quite a bit of time making my own terminal-based applications (TUIs). First, I made [wander], a terminal
interface to [HashiCorp Nomad][nomad], a Kubernetes alternative. Wander is a bit like [k9s] for Nomad.

INSERT PIC OF WANDER

When I left my last employer, I went from using Nomad back to Kubernetes. I wanted something that could explore
sequential application logs from multiple containers across multiple clusters. This became [kl], a TUI for k8s logs.

INSERT PIC OF KL

The core of both of these applications is a component called the "viewport". The viewport is a box that contains an
arbitrary amount of text. This box of text:

- is resizable
- is scrollable
- is (un)wrappable, with horizontal panning when unwrapped
- makes text searchable, with match navigation
- allows for item selection
- provides context for how much text there is and your position in it
- supports ANSI escape codes for styling text
- supports Unicode
- is generally efficient, even with a lot of text

This viewport is written in Go and made to be used in [Bubble Tea][bubbletea] applications, which is the TUI framework
both `wander` and `kl` are written in.

There are three main components that make up the implementation of this viewport:

- item
- viewport
- filterableviewport

The terminology I've settled on in this viewport context is:

- object
- item
- line
- cell

[wander]: https://github.com/robinovitch61/wander/
[nomad]: https://developer.hashicorp.com/nomad
[k9s]: https://github.com/derailed/k9s
[kl]: https://github.com/robinovitch61/kl
[bubbleviewport]: https://github.com/charmbracelet/bubbles/tree/main/viewport
[ansi]: https://en.wikipedia.org/wiki/ANSI_escape_code
[wcwidth]: https://github.com/jquast/wcwidth
[codepoint]: https://en.wikipedia.org/wiki/List_of_Unicode_characters
