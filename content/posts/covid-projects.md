---
title: covid projects
date: 2020-05-25
---

I have been very fortunate to remain employed during this global pandemic. My productivity working from home has been about on par with what I had in the office, although my learning rate has gone down a bit due to the lack of water-cooler style chats about the product and software in general. We use Slack for remote chat and it feels a bit too formal to trigger notifications for offhand questions.

My free time has been sometimes well-spent, sometimes less so. One of the efforts I'm proud of is [covid19medstudents.ca](https://covid19medstudents.ca/). In the spirit [gifting websites]({{< ref `gifting-websites` >}}) and leveraging tech to help the COVID relief effort in some way, I collaborated with a good friend from home to make this site. My friend is president of his medical student's society, and along with a talented designer on his team ([Nancy Duan](http://www.nancyduanart.com/), [@nancyduanart](https://www.instagram.com/nancyduanart/?hl=en)), we created an online index of volunteer opportunities and resources aimed at medical students and physicians in Western Canada. It has connected physicians and med students to ~50 projects across 3 provinces over the last couple months.

{{< fig src="covid19medstudentshome.png" caption="The landing page is very pretty IMO" >}}
  
It was a satisfying effort. I was feeling quite useless during the early stages of the pandemic, being neither essential nor truly negatively effected. I enjoyed working with a friendly client to fulfill a vision, working with a skilled designer to make things look great, and hearing about volunteers getting connected to projects through the site.

I've also had the chance to be a Section Leader for Stanford's online "Code In Place" class. The instructors of CS106A, a relatively well-known intro to programming course offered by Stanford, decided to run a remote "first half of the course" over 6 weeks of instruction during COVID. Over 5 of those weeks, I met up with ~8 students via zoom as a teaching assistant and we worked through Python challenges together. Participants were brand new to programming and from a huge variety of backgrounds. Seeing them grow and progress over the 5 weeks from learning what a variable was to writing their own text parsers was so very cool.

Another fun project has been taking on the semi-famous [cryptopals cryptography challenges](https://cryptopals.com/). Many sharp folks at the [Recurse Center](https://www.recurse.com/) were working on these during my time there and I had heard it was a good way to learn a new programming language. I'm [solving them in Scala](https://github.com/robinovitch61/cryptopals/tree/master/src) as that's the primary language used at my work, and I've also taken the opportunity to encorporate a test driven development approach to the challenges. My tests vary in quality, from `"frequencyScore" should "be smaller for more englishey things"` to `"encodeToHexWithXorVigenere" should "encode correctly"`.

I've absolutely loved the format of the challenges - clear and seemingly "simple enough" questions with very little theoretical explanations, leaving the solver to do the digging and self-education required to make sense of things. For instance, in set 1, question 6, they walk you through a method of finding first the key length, then the key itself for a ciphertext encoded using a repeated-key XOR cipher. Things they don't tell you outright:
* Given a collection of characters, estimating a probability that the characters were sampled from English or from random garbage text is both a science and an art. They recommend frequency scoring, and my final `frequencyScore` function included character frequency comparisons to the English language as well as checks for `allCharsInAsciiRange` and `hasReasonableNumSpecialChars`. I also experimented with number of spaces in the text sample, to less than excellent results. It felt like getting a good model for this was half the challenge.
* The challenge talks about computing and maybe averaging the hamming distance of ciphertext snippets to get the key length. The hamming distance is the number of differing bits. Three equal-length strings, A, B, and K, have the same number of bits. The XOR operation is 1 only if the bits are different, so you can get the hamming distance by counting the number of ones after XOR'ing two strings. Note that `num_1_bits(A XOR K XOR B XOR K) = num_1_bits(A XOR B)`. Also, since English has non-uniform character frequency, the hamming distance of two english snippets is lower than that of two garbage snippets, as english is more similar to english than random text is to random text. All of this was very non-obvious to me and required reading and experimenting a decent amount! Averaging the hamming distance was also definitely necessary to get good results across other encoded text with different keys.
* Cracking repeating-key XOR is relatively probabilistic. The longer the ciphertext in relation to the key, the better shot at decoding you've got! It was easy for me to spend too much time optimizing for instantly cracking all future possible key/text combos - I had to say enough was enough and move on at some point.

Here is some code I cracked:
```bash
0b3637272a2b2e63622c2e69692a23693a2a3c6324202d623d63343c2a26226324272765272a282b2f20430a652e2c652a3124333a653e2b2027630c692b20283165286326302e27282f
```

is hex-encoded ciphertext for repeating key XOR of:

>Burning 'em, if you ain't quick and nimble\nI go crazy when I hear a
cymbal

encoded with
```bash
ICE
```

😁

I've also been playing a good amount of Zelda: Breath of the Wild, Rocket
League, and Super Smash Bros. Finally, I'm now a plant Dad.

{{< fig src="plontz.JPG" caption="Proud of my lil' guys!" >}}
