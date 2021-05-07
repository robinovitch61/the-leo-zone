---
title: "verbify your arrows"
date: 2021-06-10T22:36:07-07:00
draft: true
---

This is a diagram from an open source project I was evaluating at work recently, and the subsequent conversations I had:

{{< fig width="60" src="noarrows.png" >}}

Me: So their solution is push based?

Coworker: No, I think they just specify the general protocol.

Me: But those lines from the squares at the top to the central circle sort of look like arrows, don't they? And their client pushes data...I think maybe it's push based?

Coworker: Yea, it's unclear...

Me on Slack channel of project: Hi! I'm a n00b to this project. Is this only push based?

Project maintainers: No, our reference implementation is push based but we're not opinionated about it. We just specify the protocol.

Me: Cool, thanks!

...

Here are some results from googling "architecture diagram":

{{< fig width="100" src="manynoarrows.png" >}}

Cool. These things point to each other. I don't know how they relate, just apparently there's a directionality to their relationships.

Another one:

{{< fig width="100" src="somearrows.png" >}}

This is a bit better. I know the Gateway transfers JSON over HTTP. Does it POST a JSON body from the Gateway to the arrow targets, or does the Gateway send a GET request to the arrow targets and receive a JSON response? Maybe both?

Both of these use Gateway TO arrow targets, just like the direction of the arrows, but have very different implications. If both occur, why not say so?

If I knew the domain specific context of the relationships of these entities, maybe it's obvious. Maybe if I thought about it more, it would become obvious. But the diagram would ideally communicate the relationships clearly without a lot of thought or inference required.

I think the best way to do this is to label your arrows, preferably with verbs and prepositions. For example:
* depends on
* transfers to
* receives from
* communicates with
* scrapes from
* uploads to
* child of

**This is incredibly helpful, and most diagrams with arrows don't do this**. It's not a revolutionary idea, but I think it can be more widely proliferated.

In the [graphviz gallery](https://graphviz.gitlab.io/gallery/) - open source software built for making diagrams of blobs with arrows between them - almost none of the examples contain labeled arrows, despite this being a [first class feature in graphviz](https://graphviz.org/doc/info/attrs.html#d:label).

Here is a decent example, ~10 images into the "architecture diagram" image search:

{{< fig width="100" src="goodarrows.png" >}}

Let's label our arrows more and communicate better, faster.
