---
title: "I Made a Terminal Pager"
date: "2026-03-04"
description:
  "A writeup on implementing my own terminal viewport component in Go, which eventually became a Terminal pager
  (robinovitch61/lore) and is used in a k8s log viewer TUI (robinovitch61/kl)."
draft: true
---

> TL;DR: I build terminal applications like [kl for k8s logs][kl] and [wander for Nomad][wander]. Core functionality
> includes interacting with long blocks of text, like application manifests and logs. I created a reusable `viewport`
> component in Go for text navigation in my projects.
>
> Terminal pagers are programs that allow you to page forwards and backwards through multi-page text. I used my
> `viewport` component to make [lore], which I'm now daily driving as my terminal pager.
>
> In this post, I detail the features I wanted to support in my `viewport` as well as some learnings and design
> decisions on the way to making them a reality.

## Introduction to Terminal Paging

Along with running commands, the terminal is often a place for viewing and navigating text.

<!-- prettier-ignore-start -->
{{< terminal cols="100" rows="30" title="cat-file" >}}
\e[33m❯\e[0m cat file.txt
I love terminals!
{{< /terminal >}}
<!-- prettier-ignore-end -->

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
- output of agentic AI tools

Sometimes, especially when the text output is less than one terminal view's height, output is printed directly to your
terminal without a special pager. You can then scroll with the mouse and search using your terminal emulator's built in
functionality (e.g. `cmd+f` in iTerm2). Or maybe you use a terminal multiplexer like `tmux` within your terminal
emulator that has its own set of keyboard bindings for search and scrollback.

But most often for text spanning multiple terminal view heights, programs that are about to show many lines of text
first ask themselves: "is the `PAGER` environment variable set? If so, I'll use that to display the text instead." The
`PAGER` environment variable points to a program that expects either piped input `<lots of text output> | $PAGER` or a
file argument `$PAGER myfile.txt`.

TODO: aside about how programs use PAGER, piping etc.

Most developer machines use [`less`][less] as the default pager. If you wanted everything to be dumped to your terminal
directly, you could set your `PAGER` environment variable to `cat`. Other options include [bat], [most], and [delta].
There are special paging environment variables as well, for example, setting [`GIT_PAGER`][gitpager] specifically for
git output, or [`BAT_PAGER`][batpager] for paging within `bat` after it performs syntax highlighting.

The default `PAGER`, `less`, is quite powerful with effective use of the options and configuration. For example, text by
default is lost once you quit `less`, which is generally reasonable, but you can use `--no-init/-X` to have the text
you've paged through up to the point of quitting persist in your terminal output once quit. And use `--ignore-case/-i`
to make searching case-insensitive. I recommend these articles on [less options][lessopts] and [less
configuration][lessconfig] to learn more.

## Terminal Applications/TUIs

Terminal applications, or TUIs, are a bit like native desktop applications or websites, except that you run them within
your terminal.

TUIs may use the [alt screen][altscreen] to temporarily take over one full terminal width and screen, displaying
application components like titles, side bars, help text, and text viewports within them. Text viewport components are
similar to terminal pagers, but only take up part of the screen. Other common user workflows in TUIs are:

- moving focus between components on the screen
- selecting from a list of items on the screen
- taking in user input

In a TUI, the smallest editable unit is the terminal grid cell rather than the pixel. This provides a nice constraint,
pushing terminal applications to remove all but essential information and provide a hierarchy of keyboard-driven views
into the data, rather than one large scrollable screen of components and button-laden toolbars like a website or desktop
app might provide.

Take [kl], a TUI I built for interacting with Kubernetes logs across many clusters and namespaces, for example. On
startup, you're presented with 2 text viewports: a Kubernetes entity hierarchy on the left showing your configured
clusters, namespaces, pods, and containers, and an initially-empty view of logs on the right.

{{< fig src="./img/kl_startup.jpg" width="100" caption="kl on startup" >}}

You start focused in the selection viewport, where you select one or more containers to tail the logs for.

{{< fig src="./img/kl_selected.jpg" width="100" caption="select some containers, see their logs" >}}

Pressing `L` shows you those logs in full screen, hiding the selection tree. From there, you can search for exact
matches with `/`.

{{< fig src="./img/kl_search_error.jpg" width="100" caption="search the logs for \"ERROR\"" >}}

You can see matches with surrounding (non-matching) context, or only the matching items by pressing `x`. Pressing `p`
prettifies the JSON logs with spacing and indentation. Press `enter` to zoom into the single log view. `?` to show all
the potential commands, and `ctrl+c` to quit.

This gives you an idea how a TUI is a keyboard-driven application consisting of components, and **the most important
components of TUIs are often just mini terminal pagers**. In `kl`, both the selection tree and the logs view are both
mini terminal pagers. I extracted out this shared functionality into a `viewport` component.

## The Viewport Component

The viewport is a flexibly-sized box with an arbitrary amount of text. This box of text is resizable, scrollable,
provides a % indicator for your current position in the text, makes text (un)wrappable with horizontal panning when
unwrapped, enables search with match navigation, allows for item selection, supports ANSI escape codes for styling text,
handles Unicode, and is generally performant even with lots of text.

This viewport is written in Go and can be easily integrated into applications using the [Bubble Tea][bubbletea] TUI
framework.

To facilitate this feature set, there are three modules that make up the implementation:

- **item**: wraps a string and maps bytes to grapheme terminal cell widths
  - an item takes up one or more rows in the terminal, depending on the underlying string width, terminal width, and
    wrap state
- **viewport**: displays items and allows navigation
- **filterableviewport**: adds search to viewport functionality

{{< fig src="./img/viewport_annotated.jpg" width="100" caption="filterable viewport in action" >}}

If you have Go installed, the fastest way to try this out yourself is to run:

```shell
go run github.com/robinovitch61/viewport/examples/filterableviewport@latest
```

Or if you don't have Go, in Docker:

```shell
docker run -ti golang:1.26-alpine \
  go run github.com/robinovitch61/viewport/examples/filterableviewport@latest
```

### Unicode handling

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

In Unicode text in the context of terminals, there are:

- code points: a number assigned to a character in the Unicode standard e.g. `U+2728`
- grapheme: a human's perception of a single character (one or more code points), e.g. ✨
- byte encoding: byte representation of code points, dependent on UTF-8/16/32, e.g. ✨ is 3 bytes, `0xE2 0x9C 0xA8`, in
  UTF-8
- code point width: the number of terminal cells a code point occupies (0, 1, or 2), e.g. 2 for ✨
  - a grapheme's terminal width is determined by its combined code points

It's hard to guess how many terminal cells a given character will take up by only looking at it visually:

<!-- prettier-ignore-start -->
{{< terminal cols="40" rows="14" title="half-width-emoji" >}}
\e[33m❯\e[0m termwidth '全'
2

\e[33m❯\e[0m termwidth '￭'
1

\e[33m❯\e[0m termwidth '﷽'
1
{{< /terminal >}}
<!-- prettier-ignore-end -->

You can represent single-width characters like `é` multiple different ways in Unicode: either as a single `é` code
point, or an e code point with a combining accent codepoint following it.

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

To support Unicode in my `viewport`, I had to consider the mapping of string bytes (usually UTF-8 in Go) to code points
to graphemes and their corresponding terminal widths.

The `Item` interface handles the implementation of this, simplified below:

```go
type Item interface {
  // Width returns the total width in terminal cells
  Width() int

  // Take retrieves a string from startWidth to startWidth + takeWidth,
  // width being in terminal cells
  Take(startWidth, takeWidth int) string
}
```

Immutable strings, like kubernetes logs, can have their `Item` object eagerly instantiated as they arrive. Instantiation
builds a sparse internal map of string bytes to terminal cell widths.

A `MultiItem` implementation implements the same interface, but works across multiple individual Items, allowing for
efficient dynamic prefixing (e.g. line numbers, timestamps, container names, etc.) without needing to rebuild an entire
single Item just to change the prefix. Another Item implementation, `MultiLineItem`, supports items that span multiple
line breaks to allow multi-line formatted logs.

This abstraction supports wrapping -- successive calls to `Take` until an items underlying content is used up -- and
panning left and right efficiently when items are unwrapped.

## Searching and filtering

- exact, regex, case-insensitive regex
- contextual or matches only
- highlights

## Reflow

Item interface

## Horizontal panning

Solved also with Item interface out of the box

## Item selection

--- ROUGH BELOW

I've loved the terminal for many years now. It has always felt like a cruft-free, powerful place for beginners and power
users alike to derive a lot of productivity and value.

When I left my last employer, I went from using Nomad back to Kubernetes. I wanted something that could explore
sequential application logs from multiple containers across multiple clusters. This became [kl], a TUI for k8s logs.

INSERT PIC OF KL

[altscreen]: https://ratatui.rs/concepts/backends/alternate-screen/
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
