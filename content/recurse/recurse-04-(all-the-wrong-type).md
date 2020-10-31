---
title: Recurse 04 (all the wrong type)
date: 2019-10-26
---

This week, the hack computer's hardware was completed with project 5 of
Nand2Tetris! I decided to write the remaining software portion of the course
(projects 6-12) in Rust, feeding two birds with one scone.

{{< fig src="mandel.png" caption="The Mandelbrot set with Rust" source="http://downloads.codecoding.com/rust/Programming%20Rust.pdf" >}}

While I started learning Rust with the [the O'Reilly Book](http://downloads.codecoding.com/rust/Programming%20Rust.pdf), I've found [The Rust Programming Language](https://doc.rust-lang.org/book/) and [Rustlings](https://github.com/rust-lang/rustlings) to be great resources as well. It was also incredibly helpful when Evan installed Rust Language Server (RLS) in my VSCode environment, making it easy to view source code and highlighting errors before compile time. This had to have increased the learning rate 3x or so. Rust is incredibly strict in comparison to the dynamic programming that I'm used to. This quote sums it up and keeps me going:

> I’ve found that Rust has forced me to learn many of the things that I was slowly learning as ‘good practice’ in C/C++ before I could even compile my code. ...I want to stress that Rust isn’t the kind of language you can learn in a couple days and just deal with the hard/technical/good-practice stuff later. You will be forced to learn strict safety immediately and it will probably feel uncomfortable at first. However in my own experience, this has led me towards feeling like compiling my code actually means something to me again. —Mitchell Nordine

Rust will be the first language I program in that is:
* Compiled rather than interpreted
* Statically typed (compiler enforces specifying types unless they can be inferred)
* Memory-explicit in a real way, with concepts of ownership, references, and mutability very explicit

Despite banging my head against this new language in frustration and being disproportionately happy when anything works at all, I'm super psyched to stick with it and finish Nand2Tetris in Rust.

I also finished a [post on statistical bias]({{< ref statistical-bias >}}). Going through these "rudimentary" ideas in detail like [linear regression and bias]({{< ref linear-regression >}}) has been incredibly satisfying. Even though they're fundamental ideas, going through the proofs in detail has been super informative - they very quickly get in to quite complex matrix calculus and linear algebra. It is more clear now why undergraduate engineering sort of skims over the proofs and gives you the final formulas...

The job search continues to slowly creep in to my daily concerns. It will likely be a rollercoaster of hope, hard decisions, and rejection. I am prioritizing companies who have missions I can deeply align with first and foremost. Interview prep is on the horizon...
