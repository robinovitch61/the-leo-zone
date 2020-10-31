---
title: Recurse 09 (λεξικόν)
date: 2019-11-30
---

In my third to last week of RC (!!!), I learned about Nix, Jest for Test Driven Development in Javascript, completed project 10 of nand2tetris, and continued interview prep.

Project 10 consists of the first half of the Jack compiler. The overall compiler is split in to tokenization + lexical analysis (project 10) and VM code generation (project 11).

The first half of the compiler was the most time consuming project of the course so far. It results in a compiler that doesn't yet produce any actual VM code - the output is a `.xml` file that visualizes the lexical tree for each `.jack` Jack class. This tree is determined by the language grammar, and demonstrates that the compiler correctly parses the structure of the grammar in a bug-free, recursive pass on the high-level code.

{{< fig width="80" src="lexical_tree.png" caption="Example Lexical Tree from the Elements of Computing Systems" >}}

The complete Jack language grammar is shown below. I spent a lot of time staring at it this week. Once I figured out how to structure the recursive calls to my `generate_tree` function, it became fun to build up the grammar and see how it all works out. Everything is greatly simplified due to things like lack of object inheretence, enforcement of prefix words like `do my_function()` rather than simply calling `my_function()` and other idiosyncracies and simplifications made in the design of the Jack language.

{{< fig width="90" src="jack_grammar1.png" >}}
{{< fig width="90" src="jack_grammar2.png" caption="The Complete Grammar of the Jack Language" >}}

I paired almost every day with my friend and fellow recurser Waj on interview questions. It's really interesting seeing someone else think through a problem, and I've learned so much from actively practicing together.

I'm currently in JFK flying to SF for some interviews. Stoked. I also started some really great books this week:
* **Code: The Hidden Language of Computer Hardware and Software by Charles Petzold**. It's like nand2tetris but in Novel and not Project form. I think it's incredibly approachable, interesting, and doesn't shy away from complexity and detail.
* **Exhalation: Stories by Ted Chiang**. This is the best short story book I've picked up in a long time.
