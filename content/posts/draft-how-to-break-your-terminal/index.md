---
title: "DRAFT: how to break your terminal"
date: "2023-03-12"
description: "TODO"
draft: true
---

* `stty columns 1`: set terminal width to 1col
* `stty -isig`: terminal ignores certain signals
* `stty werase ' '`: terminal erases previous word on space
* `stty size`: get terminal height x width
* `stty -echo; read a`: read a secret password in to a
  * https://stackoverflow.com/questions/51187275/make-stty-raw-echo-works-with-zsh-or-fish
* `STTY` env variable https://zsh-manual.netlify.app/parameters?highlight=ttyctl#156-parameters-used-by-the-shell
* `tput` command
* https://www.mkssoftware.com/docs/man1/stty.1.asp
* https://github.com/fish-shell/fish-shell/issues/2315
