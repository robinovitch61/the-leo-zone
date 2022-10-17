---
title: "please, may i see my knee?"
description: "One man's search to find, view, and share medical images of his knee."
date: 2022-10-16
---

TL;DR it can be hard to obtain, view, and share medical images of your own body. Scroll down for a cool video of the
inside of my knee derived from a CD with DICON images on it uploaded to a cool open source viewer.

I have had persistent and increasing knee pain in my left knee for about five years. It's a real bummer. I've tried to
get it fixed various times:

* physiotherapy for a few months in Vancouver in college
* one chiropractor visit in Vancouver who looked at a pendulum and told me the cause was that I was "standing wrong"
* more physiotherapy in San Francisco
* bone scan, x-ray, and MRI imaging where everything looked ok
* Platelet-Rich Plasma (PRP) injections that cost $2500 and did nothing
* most recently, even more physiotherapy in the East Bay

It's gotten significantly worse this year despite (accelerated by?) the physio, and I'd really like to get to the bottom
of it, if there is a bottom to get to. I'd like to get some more imaging done and see if anything has changed that might
indicate any missing treatment paths. If all still "looks good", I'll double down on the yoga, physio, and stretching.

This is the short, rant-ey story of trying to get the medical images of my knee (bone scan, x-ray, and MRI) that were
taken in the past so that I can provide them to a referred specialist.

I got these images at Sutter Health from a doctor famous
for [undergoing knee surgery without anaesthetic to figure out where we feel knee pain](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC2723708/):

> This led him to ask the question, “What anatomic structures in the knee can really feel pain?"...To answer the
> question, Dye asked a colleague to perform knee arthroscopy on his knee without anesthetic.
>
> During the arthroscopy, the surgeon would probe different anatomic structures, and Dye would report what he felt. He
> described both the intensity of the sensation and whether he could localize the sensation. As a result, he discovered
> that he had almost no pain with palpation of the patellofemoral joint, while probing of the anterior fat pad and
> anterior joint capsule was exquisitely painful. Correctly identifying the anatomic structures that lead to knee pain
> should help provide direction for treatments in the future.

Dr. Dye did not look so hot when I saw him for treatment - it looked like he had fallen and scraped up his face and arm
pretty badly. He didn't offer an explanation and I didn't ask.

After looking at the images and telling me nothing stood out, he offered to give me a steroid injection right then and
there for something like $500. It "might help ease the pain for up to 6 months, at which point we'd do another one, but
their effectiveness wears off after the third or fourth one". Disappointed that this was the latest recommendation from
someone who had done such cool research, I passed.

A while later, I requested the bone scan, x-ray, and MRI results from his office. They told me I could pick it up in
person only - no email or physical mail options were available. I showed up at the door and received an envelope from a
masked assistant through a crack in the door (this was early in COVID times).

Unopened, I delivered the envelope to another specialist.

Recently, I requested the images again, only to find that Dr. Dye's office, the "San Francisco Knee Clinic" had
disappeared. The decrepit Facebook page held a number that rang forever, Google Maps called it "Closed", and Sutter had
no information about where he had gone.

They did tell me to call the imaging department, which I did, and they told me to come pick up the images in person.

I showed up downtown the next day and received an envelope. I opened it.

Me: "Where are the images of my knee?"

CD Master: "They're on the CD"

Me: "...what?"

I had missed that there was a physical CD at the bottom of the envelope.

Me: "Can you print them for me?"

CD Master: "We don't print images."

Me: "Can I get it on a USB drive?"

CD Master: "...no"

CD in hand, I left pretty sad. I didn't know how I'd read a CD. What if I scratched it, or a crow saw its shine and
stole it for its nest of treasures? I called the library on the suggestion of my partner, but the library didn't know
how to read one either. I talked to a print shop, and they told me in many many words that them being able to read it
depended on the kind of CD it was.

Finally, I found and ordered
a [CD/DVD drive](https://www.amazon.com/dp/B07MJW5BXZ?ref=ppx_yo2ov_dt_b_product_details&th=1) off Amazon.

It arrived today, and I excitedly popped the CD in and plugged the drive into my USB dock. The `PATIENT_DATA` volume
appeared, but decided to unmount every time I tried to view or copy any files.

After unplugging everything else from my dock to try to provide the drive a steady power source and turning it on and
off again, I was able to `sudo cp -r PATIENT_DATA/* ~/leo-knee`.

I immediately version controlled this folder with `git` and a remote in the cloud, HIPAA be damned (can you break HIPAA
for your own medical data? Someone probably knows).

Expecting to find some PDFs of my knee with big red arrows to the important bits, I was surprised to find no obvious
image files in the contents of the CD:

```sh
dr-xr-xr-x  199 leo  staff      6368 Oct 16 21:06 DICOM
-r-xr-xr-x    1 leo  staff     52960 Oct 16 21:22 DICOMDIR
-r-xr-xr-x    1 leo  staff  32620048 Oct 16 21:22 GEARView.exe
-r-xr-xr-x    1 leo  staff    146653 Oct 16 21:22 Gear_View_Basic_Release_Notes.pdf
-r-xr-xr-x    1 leo  staff    119806 Oct 16 21:22 Gear_View_Basic_Technical_Specifications.pdf
dr-xr-xr-x    6 leo  staff       192 Oct 16 21:06 Images  <- this contained images for OsiriX, not of my knee :(
-r-xr-xr-x    1 leo  staff    240510 Oct 16 21:22 Lexmark EULA.rtf
dr-xr-xr-x    3 leo  staff        96 Oct 16 21:06 OsiriX Launcher.app
-r-xr-xr-x    1 leo  staff        28 Oct 16 21:22 autorun.inf
-r-xr-xr-x    1 leo  staff     17556 Oct 16 21:22 background.jpg
-r-xr-xr-x    1 leo  staff       362 Oct 16 21:22 check.bat
dr-xr-xr-x    7 leo  staff       224 Oct 16 21:06 config
dr-xr-xr-x    4 leo  staff       128 Oct 16 21:06 de
-r-xr-xr-x    1 leo  staff  52070032 Oct 16 21:23 dotNetFx45_Full_x86_x64.exe
dr-xr-xr-x    4 leo  staff       128 Oct 16 21:06 en
dr-xr-xr-x    4 leo  staff       128 Oct 16 21:06 es
dr-xr-xr-x    4 leo  staff       128 Oct 16 21:06 fr
-r-xr-xr-x    1 leo  staff        34 Oct 16 21:23 hash.bin
-r-xr-xr-x    1 leo  staff       367 Oct 16 21:23 launch.bat
dr-xr-xr-x    4 leo  staff       128 Oct 16 21:06 neutral
dr-xr-xr-x    4 leo  staff       128 Oct 16 21:06 pt
-r-xr-xr-x    1 leo  staff       495 Oct 16 21:23 readme_mac.rtf
-r-xr-xr-x    1 leo  staff      1744 Oct 16 21:23 start.hta
```

It looks like the CD came with a directory of files in [DICOM](https://en.wikipedia.org/wiki/DICOM) format, which I've
learned today is a standard for medical imaging data. When you see the Radiologist scroll through your body slices like
you're in a [Body Worlds exhibit](https://bodyworlds.com/), I guess they're often using a DICOM viewer.

It also came with a copy of DICOM viewer [OsiriX](https://pixmeo.onfastspring.com/osirix-md-monthly-subscription), an
application that "needs to be updated to run on my Mac" and costs 90€/month.

Luckily, the internet is beautiful and amazing and there is a fork of the open-source bits of OsiriX
called [miele-lxiv](https://github.com/bettar/miele-lxiv), available
for [free on the Mac App Store](https://apps.apple.com/us/app/miele-lxiv/id988332475?mt=12).

This was written by one person, Alex Bettarini, making [$8/month](https://www.patreon.com/miele_lxiv) on Patreon
currently. Alex, we love you and I will be giving you some money.

Importing all the DICON files into Miele-LXIV was fast and simple and it was pretty cool and scary to scroll around my
knee and leg bone slices.

There was a movie export option, so finally, here is what my knee looked like from the inside a while ago:

{{< mp4 src="knee.mp4" >}}

So what have I learned?

* Be very diligent about medical records, particularly in the United States of America (I was not and have learned my
  lesson)
* Medical images are probably not pdfs, which is why folks don't/won't print them or email you them or whatever (also
  probably privacy reasons)
* I am once again happy I am ok at computers and good at Googling things

What remains to be seen:

* How will I share these DICON images? Maybe I can just email them to my Doctor? Is that in any way legal, encouraged,
  or helpful?
