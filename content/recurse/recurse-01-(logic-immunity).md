---
title: Recurse 01 (logic immunity)
date: 2019-10-04
---

I have been learning about basic computer architecture (logic gates) and working on a herd immunity simulation.

Computer architecture work has come from the awesome [Nand2Tetris course](https://www.nand2tetris.org/) by Shimon Schocken and Noam Nisan. Shimon has a [fantastic Ted Talk about the course](https://www.ted.com/talks/shimon_schocken_the_self_organizing_computer_course?language=pt) and many Recursers have done it in the past. I'm 2 projects in to the first half of the course ([Coursera link](https://www.coursera.org/learn/build-a-computer/home/welcome))

The premise is that you start with a `Nand` ("Not And") logic gate. The first project, you build other elementary logic gates from the `Nand` gate (e.g. `Not(x) = x Nand x`, furthermore `x And y = Not(x Nand y)`; etc.) The 12th and last project, you complete the operating system that you have built up from the `Nand` gate, with the 10 projects in between filling in all the gaps. You could build tetris (or any similar game) in the completed computer you have built "from scratch".

{{< fig src="nand2tetris_overview.png" caption="The Nand2Tetris Overview" >}}

I am excited to keep digging in to the course. At 1 project per week, I'll complete the course just in time! I've heard the last 6 projects are more time intensive than the first 6, so I'm trying to budget time accordingly.

The other thing I've been sinking time into is a prototype herd immunity simulation in python. [Alex Haak](https://github.com/haack) and I are both excited about interactive data visualization and illustrating concepts through interactive online experiences. Our ultimate goal is to publish something on [explorabl.es - Explorable Explanations](https://explorabl.es/). This site is mind blowing. Don't visit it if you don't have a couple hours to kill.

Initial results for the simulator are really interesting! I came up with a simplified set of rules that give a certain level of complexity while still massively simplifying the real world. [All the code is here.](https://github.com/robinovitch61/herd_immunity)

{{< fig src="good_immunity.gif" caption="90% Immunity - Blue Immunity Protec" >}}

{{< fig src="bad_immunity.gif" caption="80% Immunity - Red Sickness Attac" >}}

Alex and I will be working on porting a modified version of this logic in to an awesome interactive data visualization - Alex is great with React, javascript, html, css, and general design so I'm excited to learn a lot from him!

A mostly complete set of rules for the model:

1. Number of agents is `GRID_WIDTH * GRID_HEIGHT = NUM_AGENTS`.
Each point in the rectangular grid is occupied by an agent.

2. Agents are randomly assigned an `IMMUNE` status, either 0
(susceptible) or 1 (immune), at the beginning.
`NUM_IMMUNE_START = PERC_IMMUNE_START * NUM_AGENTS`

3. Agents are initially randomly flagged as sick, with
`NUM_SICK_START = PERC_SICK_START * NUM_AGENTS.` Immune agents
cannot be initially flagged as sick.

4. All agents that aren't immune or sick are set as initially healthy.

5. At each timestep, agents connect with some of the agents around them,
with probability of connecting to each agent within their
`CONNECTION_DISTANCE` being `PROB_SOCIAL` . This
determines the candidate pool a given agent could connect with:
* If `CONNECTION_DISTANCE = 1`, agents have a candidate pool of <= 8, that is, the agents directly around them in a square with themself at the center.
* If `CONNECTION_DISTANCE = 2,` agents have a candidate pool of <= 16, that is, the agents directly around them in 2 concentric squares with themself at the center.
* etc. with `CONNECTION_DISTANCE <= MAX(GRID_WIDTH, GRID_HEIGHT) - 1`

6. If a sick agent connects with a healthy agent who is not immune,
probability of infection is `PROB_INFECTION.` If a sick agent
connects with an immune agent, probability of infection is zero (could
change later accounting for imperfect vaccination success rate).

7. After infections occur, each agent has a chance to recover with
`PROB_RECOVERY`. Sick agents then have a chance to die with
`PROB_DEATH`.

Recurse continues to be a fantastic experience, albeit a little overwhelming in the sheer volume of knowledge and opportunities it presents! This is a great problem to have. I am trying to stay focused on diving in to items of greatest interest while not burning myself out before the 12 weeks are up. It's also FLYING by.
