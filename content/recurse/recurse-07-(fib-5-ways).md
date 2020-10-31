---
title: Recurse 07 (fib 5 ways)
date: 2019-11-19
---

Recurse continues!

Each successive number in the Fibonacci Sequence is the sum of the two prior numbers:

{{< center >}}0, 1, 1, 2, 3, 5, 8, 13...{{< /center >}}

While learning about algorithms and doing nand2tetris, I've come across the Fibonacci Sequence a number of times. Here are a 5 ways to calculate the Nth element of the sequence:

## Method 1: Recursion

Recursion is when a function calls itself. Intuitively, it's a top down approach to problem solving. Say Charlie is wondering what the fourth number in the Fibonacci Sequence is. She might say, well, the fourth number is the second number plus the third number. The second number is 1 as the sequence starts with 1, 1. The third number is the first number plus the second number, both of which are 1, so the third number is 1 + 1 = 2. So the fourth number is 1 + 2 = 3!

The idea is to drill down until you get to the base cases (here, the first and second numbers), and then traverse up your nested logic back to the original question. In a computer, each recursive call adds a new "frame" to the working stack, where a frame includes function arguments, local variables, and relevant pointers that allow restoration of the previous frame. More on this later.

In python, recursively solving for the Nth Fibonacci Number looks as follows:

```python
## Recursive Fibbing
def recursive_fib(n):
if n <= 0:
    raise ValueError('Fibonacci sequence starts at first number.')
elif n <= 2:
    return n-1 # first = 0, second = 1
else:
    return recursive_fib(n-2) + recursive_fib(n-1)

# Timing code included here for reference
from timeit import timeit
runs = 10000
time = timeit(
"recursive_fib(10)",
setup="from __main__ import recursive_fib",
number=runs)
print("recursive_fib took average of {:.2E}s across {} runs"
.format(time/runs, runs))
# >> recursive_fib took average of 1.82E-05s across 10000 runs

recursive_fib(10)
# >> 34
```

Note that this gets realllly slow as time goes on, and it isn't very space efficient either. Each progressive call to the function adds a frame to the call stack that uses up some memory. Additionally, repeat operations occur - note how Fib(3) shows up twice in the tree below.

{{< fig width="60" src="recursive_fib.png" caption="Recursive Fibonacci 'touches' about $ \phi^{n} $ Nodes" >}}

In [Big-O notation](https://en.wikipedia.org/wiki/Big_O_notation), this algorithm is O(~2^n) in time and O(n) in space, both not ideal.

## Method 2: Dynamic Programming - Top Down

This method, sometimes also called "Memoization", confusingly references "Dynamic Programming". Note that Dynamic Programming has nothing to do with the concept of a Dynamic Programming Language. Dynamic Programming is a method for solving complex problems by breaking them in to smaller sub problems and solving each of these problems once, storing the answer for possible reuse. A Dynamic Programming Language like Python or Javascript can execute code at [runtime](https://en.wikipedia.org/wiki/Runtime_(program_lifecycle_phase)) that would require compilation in a Static Programming Language.

The simple improvement upon the purely recursive solution above is to save the results of each calculation. In doing so, recalculating prior results multiple times is avoided. The dictionary implementation in Python is a hashmap with constant time insertion and retrieval, so no time complexity is added by the use of a `dict` below:

```python
## Fibbing with Memoization
def memo_fib(n, memo=None):
if memo is None:
    memo = {}
if n <= 0:
    raise ValueError('Fibonacci sequence starts at first number.')
elif n <= 2:
    return n-1 # first = 0, second = 1
else:
    # check if already calculated result
    if n not in memo:
        # function calls itself twice w/ same memo
        memo[n] = memo_fib(n-2, memo) + memo_fib(n-1, memo)
    return memo[n]

# Similar timing code to above produces:
# >> memo_fib(10) took average of 5.04E-06s across 10000 runs

memo_fib(10)
# >> 34
```

As per the timing code, memoization produces a much faster calculation - other than the hashtable lookups, no duplicate computation is being done.

The time complexity is now O(n), with space complexity still at O(n) as the call stack and memo `dict` both have O(n) space.

## Method 3: Dynamic Programming - Bottom Up

Another equivalent and sometimes more intuitive way to look at Dynamic Programming as a solution is to build a "table" of all the solutions to each little problem that must be solved along the way to solving the more complicated problem. This is sometimes called "Tabulation" In this case, the "table" could be a Python list that holds its `index+1`'th Fibonacci number, e.g. the 1st Fibonacci number is at `table[0]`, 4th at `table[3]`, etc.

```python
## Fibbing with Tabulation
def table_fib(n):
if n <= 0:
    raise ValueError('Fibonacci sequence starts at first number.')
elif n <= 2:
    return n-1 # first = 0, second = 1
else:
    table = [0, 1] + [None]*(n-2)
    for idx in range(2, len(table)):
        table[idx] = table[idx-2] + table[idx-1]
    return table[n-1]

# Similar timing code to above produces:
# >> table_fib(10) took average of 2.18E-06s across 10000 runs

table_fib(10)
# >> 34
```

As discussed in the excellent post [here](https://programming.guide/dynamic-programming-vs-memoization-vs-tabulation.html), tabulation is best when each sub problem is to be solved only once, where memoization is best when not all subproblems have to be solved to get to the answer to the overarching question. Fibonacci is a case where all subproblems must be solved only once, so Tabulation is faster by a constant factor.

Both Tabulation and Memoization are O(n) in time and O(n) in space.

## Method 4: Iteration

Note that the tabulation method is actually wasting space. If you were to solve for the n'th Fibonacci number in your head, you'd likely only keep track of 2 or 3 numbers at a time: "0 plus 1 is 1, now 1 plus 1 is 2, now 1 plus 2 is 3...". Once you've gotten the n'th Fibonacci number there's no need to keep anything before the n-1'th number around in memory! This method is called iteration:

```python
## Fibbing with Iteration
def iter_fib(n):
if n <= 0:
    raise ValueError('Fibonacci sequence starts at first number.')
elif n <= 2:
    return n-1 # first = 0, second = 1
else:
    prevprev = 0
    new = 1
    for _ in range(2, n):
        prev = new
        new = prevprev + prev
        prevprev = prev
    return new

# Similar timing code to above produces:
# >> iter_fib(10) took average of 1.13E-06s across 10000 runs

iter_fib(10)
# >> 34
```

This is as good as it gets: O(n) time and O(1) space.

## Method 5: Hack Computer (Nand2Tetris)

The Fibonacci sequence also came up in Nand2Tetris as a debugging program for my VM translator in Rust! While I can't show an easy example, it does serve to illustrate the idea for the VM Translator.

This is the "Virtual Machine Code" for a Fibonacci sequence. It is much like an [LLVM intermediate representation]({{< ref `recurse-06-(intermediate-representations)` >}}), but in the virtual machine language created by the Nand2Tetris team.

```bash
// Main.vm
// This file is part of www.nand2tetris.org
// and the book The Elements of Computing Systems
// by Nisan and Schocken, MIT Press.
// File name: projects/08/FunctionCalls/FibonacciElement/Main.vm

// Computes the nth element of the Fibonacci series, recursively.
// n is given in argument[0].  Called by the Sys.init function 
// (part of the Sys.vm file), which also pushes the argument[0] 
// parameter before this code starts running.

function Main.fibonacci 0
push argument 0
push constant 2
lt                     // checks if n<2
if-goto IF_TRUE
goto IF_FALSE
label IF_TRUE          // if n<2, return n
push argument 0        
return
label IF_FALSE         // if n>=2, returns fib(n-2)+fib(n-1)
push argument 0
push constant 2
sub
call Main.fibonacci 1  // computes fib(n-2)
push argument 0
push constant 1
sub
call Main.fibonacci 1  // computes fib(n-1)
add                    // returns fib(n-1) + fib(n-2)
return

// Sys.vm
// This file is part of www.nand2tetris.org
// and the book The Elements of Computing Systems
// by Nisan and Schocken, MIT Press.
// File name: projects/08/FunctionCalls/FibonacciElement/Sys.vm

// Pushes a constant, say n, onto the stack, and calls the Main.fibonacii
// function, which computes the nth element of the Fibonacci series.
// Note that by convention, the Sys.init function is called "automatically" 
// by the bootstrap code.

function Sys.init 0
push constant 4
call Main.fibonacci 1   // computes the 4'th fibonacci element
label WHILE
goto WHILE              // loops infinitely
```

My VM translator [here](https://github.com/robinovitch61/nand2tetris/blob/master/projects/08/p08/src/main.rs) creates a bunch of Hack Computer-specific assembly code (~500 lines) from this that look like this:

```bash
// Bootstrap

@256
D=A
@SP
M=D
// call Sys.init 0
// push return-address
@return-address0
D=A
@SP
A=M
M=D
@SP
M=M+1
// push LCL
@LCL
D=M
@SP
A=M
M=D
@SP
M=M+1
// push ARG
@ARG
D=M
@SP
A=M
M=D
@SP
M=M+1
// push THIS
@THIS
D=M
@SP
A=M
M=D
@SP
M=M+1
// push THAT
@THAT
D=M
@SP
A=M
M=D
@SP
M=M+1
// ARG = SP - n - 5
@SP
D=M
@0
D=D-A
@5
D=D-A
@ARG
M=D
// LCL = SP
@SP
D=M
@LCL
M=D
// goto f
@Sys.init
0;JMP
// declare (return-address)
(return-address0)

// ../FunctionCalls/FibonacciElement/Main.vm

// function Main.fibonacci 0
(Main.fibonacci)
// push argument 0
@0
D=A
@ARG
A=M
A=A+D
D=M
@SP
etc.
```

Which then assembles down to the actual machine code using the assembler I wrote [here](https://github.com/robinovitch61/nand2tetris/blob/master/projects/06/p06/src/main.rs):

```bash
0000000100000000 // this is @256
1110110000010000 // this is D=A
0000000000000000 // etc.
1110001100001000
0000000000110101
1110110000010000
0000000000000000
1111110000100000
1110001100001000
0000000000000000
1111110111001000
0000000000000001
1111110000010000
0000000000000000
1111110000100000
1110001100001000
0000000000000000
1111110111001000
0000000000000010
1111110000010000
0000000000000000
1111110000100000
1110001100001000
0000000000000000
1111110111001000
0000000000000011
1111110000010000
0000000000000000
1111110000100000
1110001100001000
0000000000000000
1111110111001000
0000000000000100
1111110000010000
0000000000000000
1111110000100000
etc.
```

So there it is. The fifth method - write your recursive Fibonacci code in VM Code and assemble for the hack computer :)!
