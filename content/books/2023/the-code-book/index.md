---
title: "Book Review: The Code Book"
date: "2023-02-01"
description: "A book review of The Code Book, by Simon Singh. Reviewed by Leo Robinovitch."
---

Rating: 🧨

I picked up [The Code Book](https://simonsingh.net/books/the-code-book/) at a used book store in Seattle, honestly
expecting it to be a nonstarter. Another book on an interesting technical topic that assumes the reader has a PhD in the
field or that they'd shrivel up at the first whiff of math.

I am happy to report that I was wrong! This is the best book I've read in the last year.

The Code Book by Simon Singh is a master class in explaining things. Singh takes the often dense and vast topic of
cryptography, selects compelling stories from its history, and recounts them with the perfect level of detail.

Every chapter and anecdote advances the reader forward through the history of code making and code breaking, but each
firmly places humanity (rather than say, number theory or statistics) at the center. Reading it is a cross between the
human drama and ingenuity in
[The Imitation Game](https://en.wikipedia.org/wiki/The_Imitation_Game), the time travel
in [Bill & Ted's Excellent Adventure](https://en.wikipedia.org/wiki/Bill_%26_Ted%27s_Excellent_Adventure), and the
clarity and spark of [Feynman's Lectures on Physics](https://www.feynmanlectures.caltech.edu/).

Throughout, the book doesn't look down on the reader's ability to learn and understand. Complicated concepts are
brilliantly explained. Singh builds concepts up from fundamentals, makes great use of diagrams and tables, and puts the
most abstract bits -- like textual explanations of the RSA algorithms -- in dedicated sections of the appendix.

It's now been out for over 20 years, and some topics, like government regulation of cryptographic algorithms and the
ubiquity of HTTPS, show their age a bit. I'm sure there have been many major breakthroughs in cryptography since 1999
that were excluded, but this book has given me a good base to work off of to learn more about them. That being said, the
first ~4000 years of cryptography have enough in there to keep readers entertained.

I think you should just stop here and read the whole book, but to whet your appetite further, here are some notable
paraphrased snippets (spoilers ahead):

* An early example of Steganography, or "hiding messages", was a Greek tyrant shaving the head of a servant, tattooing a
  message on his scalp, waiting for hair to regrow, then sending the man to his destination to be shaved again
* Mary, Queen of Scots, may have escaped beheading if her and her collaborators had used a stronger cipher
* [The Beale ciphers](https://en.wikipedia.org/wiki/Beale_ciphers) include 2 unsolved ciphertexts describing the
  location of ~$45 million worth of gold buried somewhere in Virginia. The one deciphered text was solved using the
  Declaration of Independence
* The Brits deciphered the Zimmerman Telegram, and with it motivated the Americans in to WWI. In order to cover up their
  discovery, they only leaked the version of the text that made it look like it had been cracked in Mexico, causing
  major criticism of British code breaking efforts in the press
* Charles Babbage broke the Vigenère cipher because of a random challenge from someone claiming they had "invented" a
  variant of it. He never published his method of breaking it
* Turing's time at Bletchley Park was quite misrepresented in The Imitation Game. In particular, he worked there from
  very early on in the effort, he was much more well liked and kind than portrayed in the film, and his machine worked
  well after only two major variations.
* 29 Navajo code talkers were deployed in 1942 as the Americans took on the Japanese, encoding English into Navajo and
  back again for fast and secure American communications
* There are a good amount of Jews in cryptography (represent!): "In April 1977, Rivest, Shamir, and Adleman spent
  Passover at the house of a student and consumed liberal quantities of Manischewitz wine before returning to their
  respective homes sometime around midnight. Rivest was unable to sleep, so he lay on his couch with a math textbook. He
  began to mull over the question that had been nagging him all year: Is it possible to find a one-way function that can
  be reversed only if the receiver has some special information? Suddenly, the mists began to clear and he had a
  revelation."
* At England's [GCHQ](https://en.wikipedia.org/wiki/GCHQ), [James Ellis](https://en.wikipedia.org/wiki/James_H._Ellis)
  independently invented public key cryptography (e.g. RSA and Diffie–Hellman key exchange) 3-5yrs before the academics,
  but couldn't publish anything due to the secretive nature of his agency
* Quantum cryptography stemmed from the idea of quantum money - maybe Bitcoin-style crypto might produce something
  worthwhile over time after all :)

The book has made me excited to learn more about cryptography and cybersecurity in general. Maybe I'll pick back up
on [cryptopals](https://cryptopals.com/), or write a virtual Enigma machine or something. I hope you read it and enjoy
it as much as I did.
