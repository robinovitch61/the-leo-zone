---
title: "pdf-ify a website"
date: "2023-12-13"
description: "PDF-ify a website, for example, all the SICP solutions. By Leo Robinovitch."
---

I love writing a bit of code at the airport gate. My flight today had a 45 minute delay, so I was able to slap together
a solution to a small problem I had.

I recently got a [reMarkable 2](https://remarkable.com/store/remarkable-2) and love it. I've been reading through
[SICP](https://web.mit.edu/6.001/6.037/sicp.pdf) on it, and really enjoy inserting note pages inline to do the exercises
while I read the text.

I want to reference solutions for SICP problems to check my own answers and for when I get stuck. I googled "SICP all
solutions single pdf", but the most complete reference for solutions I could find was the
[Scheme Wiki's Solutions](http://community.schemewiki.org/?SICP-Solutions), which individually links to each worked
solution.

Using ChatGPT to get started, then adapting the code myself to accommodate for the large number of links involved and
some CSS parsing issues, I hacked together a Python script to scrape all the right links from this page, generate PDFs
from each, and concatenate them all together into a single output file. The script, PDF output, and repro instructions
are [here on Github](https://github.com/robinovitch61/sicp-solutions).

Take inspiration if there is a website with a lot of links on it that you'd like to have as a single long PDF!

Now I enter airplane mode with all the solutions on my reMarkable:

{{< fig src="./img/sicp_remarkable.png" width="80" caption="Solution reference ready to rock" >}}
