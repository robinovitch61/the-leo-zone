---
title: "Book Review: A Philosophy of Software Design"
date: "2024-06-09"
description: "A book review of A Philosophy of Software Design, by John Ousterhout. Reviewed by Leo Robinovitch."
---

Rating:💯

[A Philosophy of Software Design][book] is a book by [John Ousterhout][author]. I found it extremely worthwhile to read.
It distilled certain vague intuitions that I'd built up over time into clear ideas. Reading it immediately impacted my
programming style across different dimensions.

Ousterhout admits:

> Unfortunately, there isn’t a simple recipe that will guarantee great software designs. Instead, I will present a
> collection of higher-level concepts that border on the philosophical...

Here are the main philosophical ideas -- the "summary of design principles" -- enumerated at the end of the book:

1. Complexity is incremental: you have to sweat the small stuff
2. Working code isn’t enough
3. Make continual small investments to improve system design
4. Modules should be deep
5. Interfaces should be designed to make the most common usage as simple as possible
6. It’s more important for a module to have a simple interface than a simple implementation
7. General-purpose modules are deeper
8. Separate general-purpose and special-purpose code
9. Different layers should have different abstractions
10. Pull complexity downward
11. Define errors
12. Design it twice
13. Comments should describe things that are not obvious from the code
14. Software should be designed for ease of reading, not ease of writing
15. The increments of software development should be abstractions, not features

What follows is some paraphrased and summarized notes I took throughout the book. They resonate with me unless specified
otherwise.

Ousterhout defines software complexity as "anything related to the structure of a software system that makes it hard to
understand and modify the system". I think this rings true. He also emphasizes that system complexity is the sum of the
complexity of each system part weighted by the fraction of time developers spend engaged with that part.

Complexity is caused by dependencies and obscurity, and its symptoms manifest as simple changes requiring many code
modifications in different places, high cognitive load, and non-obviousness of what needs modifying to complete a task.

Dependencies exist when code can't be understood and modified in isolation -- you need to read higher-level caller or
lower-level implementation code to understand the current code's workings or implications.

Modules should be deep, with the simplest and clearest possible interface and the bulk of the complexity of
implementation hidden away from the user of the interface. Configuration, if necessary, should have reasonable defaults,
and potential for errors eliminated when possible.

A garbage collector is a deep module with "no interface" - it just runs and does what is required mostly invisibly. The
Unix I/O interface is extremely deep, with a few simple methods: `open`, `read`, `write`, `seek`, `close`. Hidden away
in the implementation is everything from how files are represented on disk, how permissions work, how concurrent file
access is implemented, caching, and device driver interoperability. It is more important to have a simple interface than
a simple implementation.

The length of functions doesn't really matter, as long as the code in them needs to be executed sequentially and serve
the function's goal of doing one thing, completely. Comments and spacing can help differentiate sequential blocks of
code within a single function rather than breaking code out into a short function call with a descriptive name,
particularly if these "internal" functions need to access and return many variables and so have a complex interface.
This is in direct contrast to "Clean Code"'s guidance that "The first rule of functions is that they should be small",
which never seemed comprehensive to me.

"Designing it twice" has directly influenced how I'm building my current project. It's now small enough to iterate on
but big enough to have some tricky complexity to manage, so I've been building and rebuilding it and examining the
tradeoffs of each set of abstractions. I've learned a TON doing this, and am going to end up with a much better code
base as a result.

Comments should describe things that aren't already obvious from the code. They can fill in missing details, like units,
inclusivity/exclusivity of boundaries, responsibility for resource management, and invariants. Interface comments that
talk about implementation details probably indicate a shallow interface. Comments can be a valuable design tool,
especially when written before the code.

Consistency and convention is more important than being brilliant and new. Event-driven programming can make it hard to
follow control flow. Test Driven Development pulls focus towards getting specific features working rather than finding
the best design.

The increments of development should be abstractions, not features. If you have the right abstraction, the
implementation should be trivial. If the implementation isn't trivial, it's probably time to rethink some abstractions.

Like I've said, I loved this book, and would like to read it again as I progress as a software designer and engineer.

[book]: https://web.stanford.edu/~ouster/cgi-bin/book.php
[author]: https://web.stanford.edu/~ouster/cgi-bin/home.php
