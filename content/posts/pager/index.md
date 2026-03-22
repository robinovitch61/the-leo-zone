---
title: "I Made a Terminal Pager"
date: "2026-03-04"
description:
  "A writeup on implementing my own terminal viewport component in Go, which eventually became a Terminal pager
  (robinovitch61/lore) and is used in a k8s log viewer TUI (robinovitch61/kl)."
draft: true
---

> _TL;DR: I build terminal applications like [kl for k8s logs][kl] and [wander for Nomad][wander]. Core functionality of
> these applications is interacting with long blocks of text like application manifests and logs. I created a reusable
> `viewport` component in Go for text navigation in my projects. Terminal pagers are programs that allow you to page
> forwards and backwards through multipage text. I used my `viewport` component to make [lore], which I'm now daily
> driving as my terminal pager. In this post, I detail the features I wanted to support in my `viewport` and some
> learnings and design decisions on my way to making them a reality._

Along with running commands, the terminal is often a place for viewing and navigating text.

<!-- prettier-ignore-start -->
{{< terminal cols="100" rows="30" title="cat-file" >}}
\e[33m❯\e[0m cat file.txt
I love terminals!
{{< /terminal >}}
<!-- prettier-ignore-end -->

## Introduction to Terminal Paging

Terminals have a grid-like nature with a monospace font. Their size is defined in rows and columns, with text filling
this grid accordingly.

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

{{< details summary="Aside: styling text in terminals" >}}

You can style text in terminals with [ANSI escape codes](https://en.wikipedia.org/wiki/ANSI_escape_code).

<!-- prettier-ignore-start -->
{{< terminal cols="40" rows="14" title="ansi-red" >}}
\e[33m❯\e[0m echo "default, \x1b[31mred text\x1b[0m, default"
default, \e[31mred text\e[0m, default
{{< /terminal >}}
<!-- prettier-ignore-end -->

- `\x1b[31m`: begin red foreground text styling
- `red text`: content to be styled
- `\x1b[0m`: reset styling

This type of styling is how we get the grey checkerboard pattern in the terminal out of `chessboard.txt` above:
`chessboard.txt` contains text with ANSI escape codes styling it for the terminal.

{{< /details >}}

There are often high volumes of text output that developers scan through in their terminal:

- verbose output from scripts and CLIs
- `git` diffs
- application logs
- `man` pages
- `README`s
- database query results, e.g., `psql`/`sqlite` result rows

Sometimes, especially when the text output is less than one terminal view's height, output is printed directly to your
terminal without a special pager. You can then scroll with the mouse and search using your terminal emulator's built in
functionality (e.g. `cmd+f` in iTerm2). Or maybe you use a terminal multiplexer like `tmux` within your terminal
emulator that has its own set of keyboard bindings for search and scrollback.

But most often for text spanning multiple terminal view heights, programs that are about to show many lines of text
first ask "is the `PAGER` environment variable set? If so, I'll use that to display the text instead." The `PAGER`
environment variable points to a program that expects either piped input `<lots of text output> | PAGER` or a file
argument `PAGER myfile.txt`.

TODO: aside about how programs use PAGER, piping etc.

Most developer machines use [`less`][less] as the default pager. If you wanted everything to be dumped to your terminal
directly, you could export your `PAGER` environment variable to `cat`. Other options include [bat], [most], and [delta].
There are special paging environment variables as well, for example, setting [`GIT_PAGER`][gitpager] specifically for
git output, or [`BAT_PAGER`][batpager] for paging within `bat` after it performs syntax highlighting.

The default `PAGER`, `less`, is quite powerful with effective use of the options and configuration. For example, text by
default is lost once you quit `less`, which is generally reasonable, but you can use `--no-init/-X` to have the text
you've paged through up to the point of quitting persist in your terminal output once quit. And use `--ignore-case/-i`
to make searching case-insensitive. I recommend these articles on [less options][lessopts] and [less
configuration][lessconfig] to learn more.

## Unicode handling

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

The sparkles emoji, represented by its [Unicode code point][codepoint]
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

## Searching and filtering

- exact, regex, case-insensitive regex
- contextual or matches only
- highlights

## Reflow

Item interface

## Horizontal panning

Solved also with Item interface out of the box

## Item selection

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

[ansi]: https://en.wikipedia.org/wiki/ANSI_escape_code
[bat]: https://github.com/sharkdp/bat
[batpager]: https://github.com/sharkdp/bat/blob/a1e7c0ab4ae87d388e2f2922a25f15b4ca5f62de/README.md?plain=1#L631
[bubbletea]: https://github.com/charmbracelet/bubbletea
[bubbleviewport]: https://github.com/charmbracelet/bubbles/tree/main/viewport
[codepoint]: https://en.wikipedia.org/wiki/List_of_Unicode_characters
[delta]: https://github.com/dandavison/delta
[gitpager]: https://www.man7.org/linux/man-pages/man1/git.1.html
[k9s]: https://github.com/derailed/k9s
[kl]: https://github.com/robinovitch61/kl
[less]: https://www.greenwoodsoftware.com/less/index.html
[lessconfig]: https://www.topbug.net/blog/2016/09/27/make-gnu-less-more-powerful/
[lessopts]: https://blog.thechases.com/posts/assorted-less-tips/
[lore]: https://github.com/robinovitch61/lore/
[most]: https://jedsoft.org/most/
[nomad]: https://developer.hashicorp.com/nomad
[wander]: https://github.com/robinovitch61/wander/
[wcwidth]: https://github.com/jquast/wcwidth
