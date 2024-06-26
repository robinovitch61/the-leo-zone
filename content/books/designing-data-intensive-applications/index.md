---
title: "Book Review: Designing Data Intensive Applications"
date: "2023-10-08"
description: "A book review of Designing Data Intensive Applications, by Martin Kleppmann. Reviewed by Leo Robinovitch."
---

Rating: 📀

[Designing Data Intensive Applications][book] (DDIA) is a book by [Martin Kleppmann][author].

How do I review this incredible reference? I'll first say that if you program professionally, you should read this book.
It will introduce you to new ideas and help you clarify and reconceptualize ones you may already be familiar with. You
are very likely to find relevance to your work in multiple chapters. You can view my [abridged notes in Notion
here][notes] if you'd like.

In the rest of this review, I'll cherry pick a few of the experiences and learnings I took away from this book. I lead a
book club for it at Voltus, and we took it really slowly, reading it over ~8 months. It was a 2023 goal of mine to
finish the book and I think that leading the book club helped somewhat with accountability. That being said, very few
others stuck with it all the way through. I think that actually reading this whole book is a serious commitment not to
be taken lightly. There is a lot of rich content to get through. You also have to decide how many side quests to go on,
e.g. "should I pause here in the Distributed Consensus section and go play with toy implementations of Paxos and/or
Raft, or should I keep reading?".

I don't claim to remember and fully grok every topic in DDIA now that I've finished it. But it did further my
understanding across a variety of domains, give concrete justification for certain "accepted practices" that I'd
previously taken at face value, and inspire further exploration and application of the plethora of concepts presented.

If I were to choose the five chapters I got the most out of, it would go as follows. All chapters are relatively
stand-alone in the sense that you could jump in anywhere and not feel like you had to read the prior chapters to get a
lot out of a given one. Kleppmann does a great job cross referencing previously discussed topics when relevant.

## 1. Chapter 2: Data Models and Query Languages

If you're going to read something in this book, I think it should be this chapter. I have recommended this chapter stand
alone to so many people. Almost every developer has to persist state somehow, and that inevitably leads to the question
"which database class should I select for my application - relational, document, graph, or some combination?". Almost
every dev will have interacted with an ORM, or at least manually (de)serializing stored objects into and out of
application memory. This chapter gives an excellent overview of the ways to model data, the tradeoffs among different
database classes, query languages, and some of the history of db development.

Later in the book, Kleppman says:

> Surprisingly often I see software engineers make statements like, “In my experience, 99% of people only need X” or
> “...don’t need X” (for various values of X). I think that such statements say more about the experience of the speaker
> than about the actual usefulness of a technology. The range of different things you might want to do with data is
> dizzyingly wide.

This explains his resistance to determining the "best" data model in this chapter:

> It’s not possible to say in general which data model leads to simpler application code; it depends on the kinds of
> relationships that exist between data items.

That being said, he provides extension discussion around the tradeoffs and different scenarios for which one model class
works better or worse than another.

## 2. Chapter 3: Storage and Retrieval

This chapter does an excellent job in demystifying how one might implement a very simple database. In an interview I
give for non-professional programming position, one of the questions is to implement a simple key-value store via an
HTTP server. Candidates implement it with an in-memory solution before the interview, then during we pair on persisting
the data to a file. We go as far as we can in the short amount of time we have. This question, and exactly how far you
might take it towards a production implementation of a database, is discussed extensively in this chapter.

This chapter also discusses things that you might hear about or interact with regularly as a developer, like write-ahead
logs (WALs), B-trees, LSM-trees, primary, secondary, and multi-column indexes, star schema design, columnar storage, and
more.

## 3. Chapter 7: Transactions

This chapter has the best discussion around what ACID actually means I've ever found. Did you know that "Consistency"
probably doesn't even belong in ACID? It lays out the concept of data races, failure recovery, isolation levels,
consistent snapshots, atomic operations, and serializability.

Kleppmann's sequence diagrams are so excellent. I found the concepts in this chapter challenging, and the diagrams were
exceedingly helpful to get across specific conditions where unexpected behavior might occur.

## 4. Chapter 4: Encoding and Evolution

This chapter also touches on a number of concepts very relevant to most software jobs, including forwards/backwards
compatibility, JSON, XML, and binary encoding formats like MessagePack, Thrift, ProtoBufs, and Avro, schema and data
migrations, and data transfer protocols like HTTP, REST/SOAP, RPCs, and message passing/actor frameworks.

## 5. Chapter 10: Batch Processing OR Chapter 11: Stream Processing

Read either or both of these depending on your interests and relevant use cases. Having done a lot of streaming work
with Kafka in my current role, Chapter 11 kinda blew my mind. Kafka is NOT the obvious/first design or implementation
for a stream processor, even if it is a very good/advanced one. Conceptualizing batch processing/map reduce as a flavor
of functional programming and learning about how Unix tools operate was super interesting.

## Conclusion

There is a lot more to say about this book, and I know it'll be a jumping off point reference for me for the rest of my
career. I can't really recommend it enough. It's not overrated. Kleppmann is also so clearly ethically oriented, which
really spoke to me. In the final chapter, he talks about replacing the word "data" with "surveillance" and seeing how
your applications of data strike you in this context - are you doing good with your work?

Jump in and start reading at the most interesting point for you, or read it all the way through. It's worth it!

[book]: https://dataintensive.net/
[author]: https://martin.kleppmann.com/
[notes]: https://sulky-hose-c46.notion.site/Designing-Data-Intensive-Applications-418576f829af4eb8b6bf45afc4451522?pvs=4
