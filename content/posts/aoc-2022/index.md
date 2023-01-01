---
title: "reflecting on advent of code 2022"
date: "2022-12-25"
description: "Leo Robinovitch's reflections on advent of code (https://adventofcode.com/) 2022."
---

WARNING: as per title, here be spoilers for Advent of Code 2022.

[Advent of Code](https://adventofcode.com) (AoC) is a set of puzzles released daily from Dec 1st through Dec 25th each
year. Each puzzle has two parts, with the prize of a "star" for each part completed. Puzzles are solved with a computer
program of your own creation.

My overall experience with AoC 2022 was better than it was last year. I had less needless stress and gained more
practice, insight, and knowledge from each puzzle.

### Stats and Summary of Techniques Used

Here is a brief overview of stars obtained and the techniques I used to solve (or attempt to solve) the puzzles this
year.

```{linenos=false}
  * = star obtained before Dec 25
 [] = star not yet obtained
[*] = star obtained after Dec 25

Day 01: **     sums, slices
Day 02: **     hashmaps/dictionaries
Day 03: **     sets, intersections
Day 04: **     line segment comparisons
Day 05: **     parsing, stacks
Day 06: **     sets
Day 07: **     tree generation & traversal
Day 08: **     2D grid navigation
Day 09: **     cellular automaton
Day 10: **     iteration, math
Day 11: **     state machines, modular arithmetic
Day 12: **     BFS, path finding
Day 13: **     parsing, recursion
Day 14: **     2D grid manipulation, state machines
Day 15: **     intervals, manhattan distance
Day 16: *[*]   BFS, trimming
Day 17: **     2D grid manipulation, state machines, cycles
Day 18: **     3D grid navigation
Day 19: [*][*] BFS, trimming
Day 20: [*][*] array/index manipulation, modular arithmetic
Day 21: **     iteration, binary search, newton's method
Day 22: *[*]   2D & 3D grid navigation
Day 23: **     cellular automaton
Day 24: **     path finding
Day 25: [*][*] balanced quinary numerical system

Notes on problems solved after Day 25:

  20: initial approach was way too complicated, was able to
      solve it relatively quickly on revisiting with a fresh
      view

  22: paper cubes, a pencil, and a lot of folding really
      helped
  
  16: needed a hint about trimming down the number of
      states based on their current "score" (pressure
      released)
      
  19: brutal. The hardest problem by far IME. Similar
      to 16, but required multiple aha moments about
      how to trim down states. Read a few other 
      people's solutions before being able to grok and
      solve myself.

  25: i very unnecessarily solved this with a trimmed
      BFS, the same technique as 16 and 19 :)
```

### Less Hints and Peeking

This year, I tried harder to think up and implement my own approaches to the problem before looking at anyone else's
hints or code. I did this even if I wasn't confident the approach I was implementing would work.

{{< img src="aoc2022.drawio.png" >}}

The iteration loop above is so much a part of programming. Short-circuiting it by seeking inspiration for -- or
pre-checking -- my next hypothesis against someone's validated solution results in less feelings of frustration, but
also less personal development. Sticking with the iteration cycle also increases my persistence and comfort with
ambiguity and exploration.

Importantly, I also knew when enough was enough, at least for the moment. Much of my AoC month was spent with family and
friends who I see rarely, so I didn't endlessly iterate on the tougher problems in real time. I was more comfortable
this year leaving the puzzle unsolved with the knowledge that I would revisit it later.

My approach to the remaining problems ~~is going to be~~ was as follows:

* look at the code I already wrote for it
* spend ~10mins coming up with a variation or alternate approach that might plausibly work
* if I come up with something, implement it
* otherwise, look at some of the keywords from the
  day's [reddit](https://www.reddit.com/r/adventofcode/wiki/archives/solution_megathreads/2022/)
  and [Recurse](https://www.recurse.com/) [Zulip](https://zulip.com/) thread
* implement an approach suggested by the hints there
* if I still can't get a solution, look at other people's code for more hints

### Decoupling Solving and Self-Worth

Last year, I let whether or not I could solve a puzzle affect my mood and self perception too much. If I could solve it,
I felt like a genius, or at least, a valid human. If I couldn't, a cloud of negative self judgement followed me for a
while.

What I've increasingly realized is that there is a mental "red zone" in pushing myself to achieve. In the red zone,
useful thoughts like "it seems like this technique might be relevant here, let me do some reading about the relevant
concepts" are impeded by counterproductive, spiraling thoughts like "how have I not gotten this already?!".

Pushing myself purely through negative self talk leads to worse outcomes than encouraging a baseline sense of self care
and curiosity. A limited amount of personal trash talk can be helpful, but it should be reminiscent of a good friend
teasing me rather than an imagined enemy whispering poison into my brain. I got better at recognizing and discouraging
the enemy this year, in no small part because of the tens (hundreds?) of times I listened
to [Mirror by Porter Robinson](https://www.youtube.com/watch?v=l0Jo-9aqhYc).

### Working in Python

I started out wanting to do this year's AoC in [Haskell](https://www.haskell.org/). Last year, I had
learned [Golang](https://go.dev/) through AoC and really enjoyed it.

I ran in to a couple issues that resulted in me instead using Python for all of this year's puzzles.

First, learning Haskell is more involved than learning Go. In my mind, Go is a bit like a typed, compiled version of
Python with a more sparse standard library, particularly in AoC problems where I didn't leverage the concurrent elements
of the language like goroutines or channels at all. The main challenge for me was thinking about a pointer here and
there.

I've heard many developers describe learning Haskell as "learning programming from scratch again". While I had some
experience with functional programming through Scala and TypeScript, Haskell has many new-to-me language features that I
struggled to grasp quickly. I started reading [Learn You a Haskell](http://learnyouahaskell.com/chapters) on Dec 1st,
and despite getting 7 chapters in after a few days, found myself intimidated by the remaining length and volume of new
concepts to digest.

I was also too much of a perfectionist with Haskell. I wanted to understand all the code I was writing, including the
boilerplate, before running it. I wanted to set up my environment with Stack, GHC, and the Haskell Language Server just
so. I wanted to create a command line tool to look up Haskell types easily. I went down too many rabbit holes unrelated
to AoC problems and should have just started getting in to it.

If I were to do it again, I'd have read Learn You a Haskell before December and set myself up with a basic template to
read in text, parse it, and run code that accesses it. I'm still interested in learning Haskell and look forward to
finishing the book this year.

In the end, I'm actually really glad I did AoC in Python, a language I use daily at work and have used for years now. I
experimented with functions and classes in the `collections`, `functools`, and `ast` modules that I'd wanted to mess
around with, had some fun code golfing some of the earlier days, reinforced my understanding of scopes and mutability in
Python, and came out of the experience a notably stronger Python programmer.

### Engaging with the Community

A lot of people do Advent of Code! As of this writing, over 240,000 people have completed the first day's puzzle this
year.

There are many online communities around it. In order of time I engaged with them, the communities I enjoyed this year
were:

1. [The Recurse Center](https://www.recurse.com/)'s chat community on [Zulip](https://zulip.com/). While only for
   never-graduates (aka graduates) of the Recurse Center, this is my all time favorite programming community, full of
   kind, curious, and whip-smart folks
2. [Reddit's Advent of Code](https://www.reddit.com/r/adventofcode/) subreddit
3. [Tildes](https://tildes.net/~comp.advent_of_code)'s `~comp.advent_of_code` subscription
4. A slack group at my [work](https://www.voltus.co/)

After solving a problem, I would browse these communities to find out about other solutions, often re-implementing some
or much of my own code after learning of a more optimal approach to the problem. I asked questions, pair programmed with
three different people from all over the world, and was able to share my solutions with others to critique and/or
benefit from.

I learned a ton reading other folks solutions, particularly when my own was fresh in my mind. One of the coolest moments
for me was seeing [Sam](https://www.samvangool.net) solve Day 15 using [Z3](https://github.com/Z3Prover/z3), a theorem
prover, with minimal code and getting a result to a challenging and CPU-intensive problem in <1s.

### Other Strengths this Year

I specifically improved in these areas this year:

* sticking with difficult things and sitting in ambiguity for longer
* letting go of feelings of failure and frustration when they didn't serve me
* honest evaluation of my solution or attempt, reflection on my day-to-day mistakes, and deeper investigation of
  alternate approaches
* better design of data structures, e.g. `Dict[2DPoint, List[Direction]]` for blizzard positions in Day 24
* relinquishing desire for perfection
* better use of testing, unit testing every problem
* (strangely?) less off-by-one errors than prior years

### Areas of Improvement

I could stand to focus on and improve these items:

* setting myself up for success for stated goals (e.g. reading about Haskell before Dec 1st)
* modular arithmetic - my intuition here remains poor so far, and there has been one AoC problem the last couple years
  that has stumped me as a result (2022's was Day 11 part 2, which I needed to look up hints for)
* knowing when to reach for recursion. Despite it being listed very few times in the summary of techniques used above, I
  would commonly reach for it as a solution technique, often backing off once I realized it wasn't necessary or relevant
  for the solution
* similarly, intuition for and ability to implement dynamic programming techniques, which seem to often be optimizations
  for something that might be solved recursively
* reliably building and walking graph structures, including trees
* generally doing more difficult competitive programming/leetcode style questions, more often

### Conclusion

I love Advent of Code. Seeing `That's the right answer!` makes me all warm and fuzzy, and the journey itself each
December results in more satisfaction and development every year.
