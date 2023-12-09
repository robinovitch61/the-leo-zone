---
title: "a visit to Bletchley Park"
date: "2023-12-09"
description: "A visit to Bletchley Park, by Leo Robinovitch."
---

> I cannot imagine how, with our primitive methods of collecting and registering traffic, and our tiny staff for
> decoding it, we managed to cope at all. The main sensation of the newcomer was that he was participating in a miracle
> which he was entirely incapable of comprehending.
>
> \- [Stuart Milner-Barry][barry], Codebreaker at Bletchley Park

One of my highest priority trips while living in London this year was visiting [Bletchley Park][bletchley]. I'd seen
[The Imitation Game][imitationgame] and knew a few things about [Alan Turing][turing] within the context of the history
of computing, so I had a strong sense that Bletchley Park would be a special place to visit in real life.

Bletchley Park was home base for the Allied code breaking operation during World War II. According to Historian [Harry
Hinsley][hinsley], the intel out of Bletchley "shortened the war by not less that two years and probably by four years"
([source][shortened]). At peak, it employed almost 9000 people - Mathematicians, Linguists, Cryptographers, Typists,
Historians, Translators, Cooks, Dispatch Riders (motorcyclists who carried classified intel between locations),
Librarians, Musicians, and many others. [Three-quarters of them were women][women].

After the war, most of the original physical documents and machines from Bletchley Park were destroyed. Information
about it remained heavily classified. It wasn't until the '70s that the world started to know the full nature of the
work that was done there from 1938 to 1946. Work on some ciphers wasn't declassified until the 21st century!

Bletchley Park reopened as a museum in '93. The original mansion and huts where the codebreakers did most of their work
remain intact, and there are now recreations of many other artifacts. The museum is lovely, with a lot of interactive
elements, informative tours, and a very high volume of content. Five hours in a single day wasn't enough to explore it
fully. I'll share some of my photos and main recollections, but you should definitely go at least once if you have the
chance!

{{< fig src="./img/entrance_sign.png" width="50" caption="The Entrance to Bletchley Park" >}}

[Y-stations][ystations] intercepted 3,000 to 20,000 messages daily from radio traffic which, if encrypted, were then
hand-delivered or [teleprinted] to Bletchley Park. Then came the task of deciphering the encrypted messages, which is
what so much of the literature focuses on. Once that day's cipher settings were worked out for a given machine (e.g.
[Enigma], [Lorenz], or [Purple]), the mechanical task of deciphering all of the messages with modified [Typex] machines
was completed. Then came translation (e.g. German to English), cross-referencing, and sending out the intel -- code
named "Ultra" -- to relevant strategic parties. Ultra couldn't be used unless there was a viable cover story for how
they had obtained the intel, as it was vital to keep the Axis powers believing that their ciphers remained unbroken.

{{< fig src="./img/mod_typex.png" width="50" caption="British Typex machines modified to mimic Enigma" >}}

{{< fig src="./img/lorenz.png" width="50" caption="A Lorenz machine, the successor to Enigma" >}}

At Bletchley, the main mansion and breakout huts were busy with folks carrying out these tasks. Some of the rooms of the
mansion were reserved for leisure and activities, like the Ballroom, Tennis Courts and the Drama club, which put on more
than 20 performances through the years.

{{< fig src="./img/ballroom.png" width="50" caption="The Ballroom" >}}

{{< fig src="./img/mansion.png" width="80" caption="The Mansion" >}}

{{< fig src="./img/office.png" width="80" caption="The Main Office" >}}

{{< fig src="./img/newspaper_purchase.png" width="50" caption="\"Government Buy Park\" - 1938" >}}

The people who worked there were extremely diverse, ranging from fairly unkempt nerds to military commanders. [Tolkein]
was on the list of emergency recruits for Bletchley, but declined. Hierarchy and bureaucracy emerged as the years went
on, but there was a remarkably flat and self-directed structure for most of the years of Bletchley Park's operation.

{{< fig src="./img/memos.png" width="70" caption="A wall of sampled memos from Bletchley Park" >}}

{{< fig src="./img/wrens.png" width="80" caption="Women's Royal Navy Service operatives (\"Wrens\")" >}}

Years before folks at Bletchley started working to crack Enigma, three Polish mathematician-cryptologists had already
made significant progress. [Marian Rejewsky][rejewsky], [Jerzy Różycki][jerzy], and [Henryk Zygalski][zygalski], working
for the [Polish Cipher Bureau][polishbureau], reconstructed the Enigma machine from limited French military
intelligence. In 1939, they met the French and British at a conference in Warsaw and shared their intel, including
copies of the reconstructed Enigma machine. Rejewsky also invented the [bomba kryptologiczna][bomba] in order to speed
up the decipherment process. There is a powerful memorial to these men at the Bletchley Park museum.

{{< fig src="./img/polish_bomba.png" width="50" caption="A recreation of a Polish \"Bomba\"" >}}

{{< fig src="./img/polish_plaque.png" width="80" caption="A Plaque to the Polish codebreakers" >}}

[Alan Turing][turing] and [Gordon Welchman][welchman] improved on the Poles' design to adapt to Enigma's latest design
and operational changes. Using the fact that Enigma never enciphered a character as itself and that parts of the cipher
text could be guessed ("cribs"), they designed huge mechanized [Bombe] machines that were then built by the [British
Tabulating Machine Company][btmc]. Starting in 1940, Bombes began breaking messages regularly, and more and more
machines were manufactured and spread around to outstations in order to avoid losing all of them at once in an air raid.
The Bombes were configured and operated by [Wrens][women] according to a [menus][menu], which tested a crib against a
piece of ciphertext in order to determine the machine settings that produced that text.

{{< fig src="./img/bombe_blueprints.png" width="80" caption="Bombe Blueprints" >}}

{{< fig src="./img/bombe_draft.png" width="80" caption="Bombe Draft" >}}

{{< fig src="./img/dial.png" width="80" caption="One of the Enigma dials" >}}

{{< fig src="./img/model_bombe.png" width="80" caption="A reconstructed working Bombe machine" >}}

Work at Bletchley also lead to the world's first programmable computer: [Colossus]. It used vacuum tubes to perform
basic operations, and was optimized for decrypting messages generated by the [Lorenz] machine. [Tommy Flowers][flowers]
designed and lead its prototyping. It played a critical role in gathering intelligence prior to [D-Day][dday], and
remained secret until the mid-'70s.

{{< fig src="./img/colossus.png" width="90" caption="\"The first event in the modern computer age\"" >}}

[Turing] was critical to the success of Bletchley Park codebreaking efforts, but there were so many other basically
unknown geniuses working at Bletchley Park! Here are tiny summaries on a small sample of them:

#### [Alan Turing][turing]

Developed the [Bombes][bombe] as well as [Banburismus] and many other ideas and techniques during the war. Headed up
[Hut 8][hut8]. Apparently actually a pretty kind person, unlike Cumberbatch's portrayal of him in [The Imititation
Game][imitationgame]. I wish the museum had focused a little more on his government's [appalling treatment][conviction]
of him for being gay, which he was only posthumously pardoned for in 2009.

{{< fig src="./img/turing_office.png" width="80" caption="Turing's office in Hut 8" >}}

{{< fig src="./img/turing_death.png" width="90" caption="\"Died from cyanide poisoning\"" >}}

#### [Marian Rejewsky][rejewsky]

The Pole who lead the reconstruction of the Enigma machine before the war, as well as the inventor of the Polish
[Bomba], a precursor to the [Turing-Welchman Bombe][bombe].

#### [Alastair Denniston][denniston]

Head of the [Government Code & Cipher School][gccs] (GC&CS) from 1919 until 1942. Designed the huts built at Bletchley
Park. Senior cryptologists at Bletchley went over his head to [request more staff directly from Churchill][request], to
which Churchill replied:

> Make sure they have all they want on extreme priority and report to me that this has been done

#### [John Tiltman][tiltman]

Cryptanalyst who laid much of the groundwork for cracking the [Lorenz cipher][lorenzcrack]. Worked off of intercepted
messages that had been erroneously sent twice with the same machine settings.

#### [Dilly Knox][knox]

Knox did important cryptanalysis throughout both World Wars. Developed a technique along with his [all-Women
team][girls] that decrypted Italian Naval intel at Bletchley Park.

#### [Mavis Lever][lever]

Assistant to Dilly Knox at Bletchley Park. Lead the cracking of the Italian Naval Enigma machine at just 19 years old.

#### [Peter Twinn][twinn]

Mathematician, codebreaker, and entomologist (yes, bugs). The first Mathematician at GC&CS. Alongside Knox, lead the
original core group making efforts to crack Enigma.

#### [Gordon Welchman][welchman]

Mathematician, head of Hut 6 at Bletchley Park. Inventor of the "diagonal board" that greatly improved the design of the
[Bombe] machines.

#### [Stuart Milner-Barry][barry]

Chess player and codebreaker. Successor to Welchman as head of Hut 6. Personally delivered the letter requesting
resources from Churchill to 10 Downing Street.

#### [Hugh Alexander][alexander]

Deputy head of Hut 8 under Turing. Head of the Cryptanalysis Division at [GCHQ] for 25 years after the war.

#### [John Herivel][herivel]

Working under Welchman, discovered the "Herivel Tip" technique, which was used during a brief but critical time before
the [Bombes][bombe] to obtain the daily Enigma settings.

#### [Tommy Flowers][flowers]

Electrical Engineer, designer, and builder of [Colossus], the worlds first programmable computer. Facilitated the
reliable cracking of the [Lorenz] cipher.

#### [Max Newman][newman]

Mathematician and codebreaker, Newman worked with [Tiltman] and [Flowers] on cracking the [Lorenz] cipher and building
[Colossus].

#### [Edward "Jumbo" Travis][jumbo]

Succeeded [Denniston] as Operational Head of Bletchley Park in 1942. Was directly praised in the cryptanalyst's letter
to Churchill for his "energy and foresight". Directed [GCHQ] after the war.

---

Finally, the garage was super interesting, with a number of restored vehicles from the time.

{{< fig src="./img/garage.png" width="90" caption="Garage entrance" >}}

{{< fig src="./img/motorcycle.png" width="90" caption="A Dispatch Rider's motorcycle" >}}

{{< fig src="./img/ambulance.png" width="90" caption="Ambulance used in 'Goodnight Mr Tom' and 'Enigma'" >}}

As mentioned above, if you enjoy this sort of history and you have the chance to go to Bletchley Park, do it! I've
barely scratched the surface here, and had an excellent time during my visit.

[imitationgame]: https://en.wikipedia.org/wiki/The_Imitation_Game
[turing]: https://en.wikipedia.org/wiki/Alan_Turing
[bletchley]: https://en.wikipedia.org/wiki/Bletchley_Park
[shortened]: https://www.cix.co.uk/~klockstone/hinsley.htm
[hinsley]: https://en.wikipedia.org/wiki/Harry_Hinsley
[ystations]: https://en.wikipedia.org/wiki/Y_service
[teleprinted]: https://en.wikipedia.org/wiki/Teleprinter
[typex]: https://en.wikipedia.org/wiki/Typex
[enigma]: https://en.wikipedia.org/wiki/Enigma_machine
[lorenz]: https://en.wikipedia.org/wiki/Lorenz_cipher
[purple]: https://en.wikipedia.org/wiki/Type_B_Cipher_Machine
[tolkein]: https://www.telegraph.co.uk/news/uknews/6197169/JRR-Tolkien-trained-as-British-spy.html
[rejewsky]: https://en.wikipedia.org/wiki/Marian_Rejewski
[jerzy]: https://en.wikipedia.org/wiki/Jerzy_R%C3%B3%C5%BCycki
[zygalski]: https://en.wikipedia.org/wiki/Henryk_Zygalski
[polishbureau]: https://en.wikipedia.org/wiki/Cipher_Bureau_(Poland)
[bomba]: https://en.wikipedia.org/wiki/Bomba_(cryptography)
[bombe]: https://en.wikipedia.org/wiki/Bombe
[welchman]: https://en.wikipedia.org/wiki/Gordon_Welchman
[btmc]: https://en.wikipedia.org/wiki/British_Tabulating_Machine_Company
[women]: https://en.wikipedia.org/wiki/Women_in_Bletchley_Park
[menu]: https://en.wikipedia.org/wiki/Bombe#Bombe_menu
[colossus]: https://en.wikipedia.org/wiki/Colossus_computer
[flowers]: https://en.wikipedia.org/wiki/Tommy_Flowers
[dday]: https://en.wikipedia.org/wiki/Normandy_landings
[banburismus]: https://en.wikipedia.org/wiki/Banburismus
[hut8]: https://en.wikipedia.org/wiki/Hut_8
[conviction]: https://en.wikipedia.org/wiki/Alan_Turing#Homosexuality_and_indecency_conviction
[denniston]: https://en.wikipedia.org/wiki/Alastair_Denniston
[gccs]: https://en.wikipedia.org/wiki/GCHQ#Government_Code_and_Cypher_School
[request]: https://en.wikipedia.org/wiki/Action_This_Day_(memo)
[lorenzcrack]: https://en.wikipedia.org/wiki/Cryptanalysis_of_the_Lorenz_cipher
[tiltman]: https://en.wikipedia.org/wiki/John_Tiltman
[knox]: https://en.wikipedia.org/wiki/Dilly_Knox
[girls]: https://www.huffingtonpost.co.uk/2015/01/25/bletchley-park-enigma-female-codebreakers_n_6532856.html
[lever]: https://en.wikipedia.org/wiki/Mavis_Batey
[twinn]: https://en.wikipedia.org/wiki/Peter_Twinn
[barry]: https://en.wikipedia.org/wiki/Stuart_Milner-Barry
[alexander]: https://en.wikipedia.org/wiki/Conel_Hugh_O%27Donel_Alexander
[gchq]: https://en.wikipedia.org/wiki/GCHQ
[herivel]: https://en.wikipedia.org/wiki/John_Herivel
[newman]: https://en.wikipedia.org/wiki/Max_Newman
[jumbo]: https://en.wikipedia.org/wiki/Edward_Travis
