---
title: Recurse 03 (regressing linearly)
date: 2019-10-18
---

This week, I completed project 4 of Nand2Tetris, updated my resume and converted it to [a responsive web page](/resume.html), and learned a [whole lot about linear regression]({{< ref linear-regression >}}).

Nand2Tetris project 4 breaks away from the Hardware Description Language of the first three projects and moves in to a pseudo assembly code. This assembly language is specifically written for the "Hack" computer that the class builds up through the first six projects. Writing in "assembly" is one step down from writing in something like C - there is no automatic memory management, only a couple registers to play with, lots of referencing addresses with pointers and semi-roundabout ways of doing things.

It is super cool to see how assembly actually translates directly to binary to operate at the hardware level. I've included my solution to "making a screen black if a key is pushed and white if no key is pushed" at the bottom of this post. I'm looking forward to finishing the Hack computer and the first half of the course (!) over the next couple weeks.

{{< fig src="project4.gif" caption="Push button, screen goes black" >}}

The resume update was necessary and a fun application of my responsive web dev Scrimba course. I'm continuing to slowly work through that and have found it very clear and satisfying. Fall 1'ers are ramping up their interview frequencies and proportion of time dedicated towards the job hunt. It makes me nervous and excited for the last month of my time at Recurse where I'll probably be doing the same.

After last week's frustration with the statistics textbook, I decided to slow down and zoom in on linear regression. While it's an "introductory" modeling technique in practice, I've never fully understood the underpinings of it! I'm realizing you truly can't understand the foundation of linear regression without understanding a TON of foundational statistics. Additionally, many models can be seen as direct or indirect extensions of linear regression, making it a good thing to start with. It has been a very good exercise to go through everything thoroughly and summarize it in a [big ol' plog bost]({{< ref linear-regression >}}), which I will continue to update as I delve deeper into the topic.

I hope to write more actual code next week and keep the learning rolling.

```bash
// This file is part of www.nand2tetris.org
// and the book "The Elements of Computing Systems"
// by Nisan and Schocken, MIT Press.
// File name: projects/04/Fill.asm

// Runs an infinite loop that listens to the keyboard input.
// When a key is pressed (any key), the program blackens the screen,
// i.e. writes "black" in every pixel;
// the screen should remain fully black as long as the key is pressed. 
// When no key is pressed, the program clears the screen, i.e. writes
// "white" in every pixel;
// the screen should remain fully clear as long as no key is pressed.

// Put your code here.

// *********
// VARIABLES
// *********

@512
D=A
@bitswidth
M=D // screen width in bits

@255
D=A
@bitsheight
M=D // screen height in bits

@16
D=A
@bitsperword
M=D // word width in bits

// words per screen, i.e. 512*255/16
@totalwords
M=0
@heightcovered
M=0
(MOREROWS)
@widthcovered
M=0
(MOREWORDS)
    // increment totalwords, widthcovered
    @totalwords
    M=M+1
    @bitsperword
    D=M
    @widthcovered
    M=M+D

    // if not entire width covered, MORE WORDS
    @widthcovered
    D=M
    @bitswidth
    D=M-D
    @MOREWORDS
    D;JGT

// increment heightcovered
@heightcovered
M=M+1

// if note entire height covered, MORE ROWS
@heightcovered
D=M
@bitsheight
D=M-D
@MOREROWS
D;JGT

// address of end of screen
@SCREEN
D=A
@totalwords
D=D+M
@scrend
M=D

@iswhite
M=1 // if >0, screen white. if 0, screen black. 

// *****
// LOOPS
// *****

(KEYUP)
// if current keyboard value non-zero, jump to KEYDOWN
@KBD
D=M
@KEYDOWN
D;JNE

// if black, paint white
@iswhite
D=M
@MAKEWHITE
D;JEQ

// keep listening
@KEYUP
0;JMP

(KEYDOWN)
// if current keyboard value zero, jump to KEYUP
@KBD
D=M
@KEYUP
D;JEQ

// if white, paint black
@iswhite
D=M
@MAKEBLACK
D;JGT

// keep listening
@KEYDOWN
0;JMP

(MAKEWHITE)
@paintword
M=0
@PAINTSCREEN
0;JMP

(PAINTEDWHITE)

// flag screen as white
@iswhite
M=1

// go back to keyup loop
@KEYUP
0;JMP

(MAKEBLACK)
@paintword
M=-1
@PAINTSCREEN
0;JMP

(PAINTEDBLACK)

// flag screen as black
@iswhite
M=0

// go back to keydown loop
@KEYDOWN
0;JMP

(PAINTSCREEN)
// paint screen
@SCREEN
D=A
@scraddr
M=D
(KEEPPAINTING)
    // paint at scraddr
    @paintword
    D=M
    @scraddr
    A=M
    M=D

    // increment scraddr
    @scraddr
    M=M+1

    @scrend
    D=M
    @scraddr
    D=D-M // positive until scraddr=scrend
    @KEEPPAINTING
    D;JGT

// jump back
@paintword
D=M
@PAINTEDWHITE
D;JEQ // if paintword is 0, painted white
@PAINTEDBLACK
0;JMP
```
