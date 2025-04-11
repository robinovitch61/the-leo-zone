---
title: "scripting movie scripts"
date: "2025-04-11"
description: "Scripting Movie Scripts with Leo Robinovitch."
---

During COVID, my bored friends decided to read the entire Shrek movie script together one night. It took them about 45
minutes and sounded like a really good time.

I remembered this recently and wanted to get a group together to do something similar.
[The Princess Bride](<https://en.wikipedia.org/wiki/The_Princess_Bride_(film)>) struck me as an excellent script for
this.

After confirming people had seen it before and agreeing on a time that worked for ~13 of us, I thought about how to
prepare the scripts for the table read. I realized a few things:

- I wanted physical scripts - reading on a screen had potential to be distracting or feel inauthentic
- The [script I found online](https://sfy.ru/?script=princess_bride) was nicely formatted, but would require a lot of
  paper (>100 pages/script) to print without modification
- I'd want to highlight people's speaking and narration parts, which would take a long time and could be error-prone
- I wanted to make sure people had roughly equal participation without any long gaps between speaking parts

Thankfully, I realized that a movie script is just a bunch of structured text, and I was absolutely willing to spend
time solving these issues with some code.

I ended up with 13 pre-highlighted scripts with between 1400-1600 spoken words each. A single script took 27 pages of
paper to print double-sided. Here is how I structured
[the code](https://github.com/robinovitch61/movie-scripts/tree/main) to make it happen:

A [tokenizer] split the script into `Dialogue`, `Narration`, and `SceneTransition` elements:

```python
[
    ...
    Dialogue(text='Inconceivable!', label='', character_name='VIZZINI')
    SceneTransition(text="PULL BACK TO REVEAL Vizzini, staring down from a narrow mountain path, as far below the Man In Black can be seen running. FEZZIK, carrying the Princess, stands alongside. It's a little later in the morning.", label='')
    Dialogue(text='Give her to me. (grabs Buttercup starts off) Catch up with us quickly.', label='', character_name='VIZZINI')
    Dialogue(text='(starting to panic) What do I do?', label='', character_name='FEZZIK')
    Dialogue(text='Finish him, finish him. Your way.', label='', character_name='VIZZINI')
    Dialogue(text='Oh, good, my way. Thank you, Vizzini. (little pause) Which way is my way?', label='', character_name='FEZZIK')
    ...
]
```

These elements come out of the tokenizer unlabeled (`label=''`). The next step is to assign reader labels to them
according to a few rules.

For characters, I assigned each reader (e.g. me, Leo) at least one character (e.g. Count Ruben). Inigo Montoya had a
huge amount of dialogue, so I split him into "Dark Inigo" and "Light Inigo" based on sentiment analysis of his dialogue,
assigning one reader to each.

One reader had all the side characters, like _Impressive Clergyman_ ("mawwiage", anyone?), _Little Old Guy_ and _Ancient
Booer_.

From there, I assigned out narration and scene transitions in a round-robin fashion. Once a reader reached 100 words of
non-dialogue in a row, the next reader picked it up from there.

To balance the word counts, I gave each reader a manual [narration_factor][config] - a multiplier that changed that 100
word threshold accordingly. I made the program print the number of spoken words for each reader after labeling was
complete, so tweaking these narration factors allowed me to reach roughly equal word counts across readers.

Finally, the program renders these labeled script elements into PDFs. I transformed the list of labeled script elements
into renderable objects:

```python
@dataclass
class RenderableElement:
    text: str
    text_style: TextStyle  # normal, italic, bold, etc.
    highlight_rgb: tuple[int, int, int] | None  # rgb for highlighting
    indent_mm: int  # I indented non-dialogue elements a bit
```

The [renderer] took in a list of `RenderableElement`s and an output path and generated the PDF for the reader using
[fpdf2](https://github.com/py-pdf/fpdf2). This package is able to easily handle title pages, highlights, adjustable
fonts and margins, and page numbering.

An [example script sample can be viewed here](./sample.pdf). I left out my friend's actual names in the code and
randomly assigned them characters just before printing.

The event was a success! Things that went well:

- Picking an awesome movie that people know and has a variety of entertaining characters
- The script itself was well written, with a good balance between dialogue and narration/scene direction
- Round-robin non-dialogue worked well
- The PDF layout was very readable - I probably could have gone even a bit smaller on font and spacing to save paper &
  ink
- The number of people was about right - less than 8 or over 14 is a bit hard to picture

Things I'll change for next time:

- Let people know their character(s) in advance so that they can prepare
- Ask people to dress up
- Bring props to give out that people can deploy during the table read (e.g. a rubber rat for the Fire Swamp scene)
- Do it on a Friday/weekend rather than a Monday night. Budgeting about an hour per 10,000 words of script without
  breaks is about right for timing

[tokenizer]:
  https://github.com/robinovitch61/movie-scripts/blob/73fa60e8d59abc4a22fc6cedf2a10868406e320b/princess_bride_tokenizer.py
[config]: https://github.com/robinovitch61/movie-scripts/blob/73fa60e8d59abc4a22fc6cedf2a10868406e320b/readers.py
[renderer]: https://github.com/robinovitch61/movie-scripts/blob/main/pdf_renderer.py
