---
title: Let’s talk about shoes
description: "Yup, that’s right: footwear. More specifically, the variety that shoemaker’s children tend to be without."
date: 2014-08-09
tags:
  - meta
  - personal
pathComponent: lets-talk-about-shoes
shortUrl: eseylu74
---

Nope, this isn’t a article about some exciting new framework or development methodology, I’d like to talk very briefly about footwear. In particular, the kind a shoemaker’s children are supposed to lack.

Because just over a year ago, I relaunched this site with an article where I talked about Getting On With It: relaunching my website, and filling it with useful if imperfect stuff.\
I set up a wee whiteboard next my desk which rapidly filled with hastily-scribbled ideas for things I could write. I reinstalled [PlainText](https://itunes.apple.com/gb/app/plaintext-2-dropbox-text-editing/id769101727) on my iPad, hooked it up to my Dropbox account and created a nice directory structure into which I could dump articles. It felt good to be doing something.

… all of which explains exactly why it’s taken 366 days to actually publish the next article.

## Whither art thou, motivation?

> I’ve just caught myself “but if”-ing again… which gives me an idea for a new blog post, which I might even get around to writing #motivation
>
> [@jonpearse, June 25th 2014](https://twitter.com/jonpearse/status/481886432332902401)

My clients have kept me very busy over the past twelve months (for which I’m not complaining at all!) and during that time, I’ve worked on a decent variety of projects. They’ve ranged from the comfortably pedestrian to the really quite overwhelmingly huge and complex. It’s meant for a few very long (100+ hour) weeks here and there, but on the whole it’s been a pretty enjoyable experience.

There’s been much to write about, too, from abstract discussions of process and architecture through to the ten lines of Javascript I’d written earlier that day to solve a wee problem. A few projects have meant that I’ve been [dogfooding](http://en.wikipedia.org/wiki/Eating_your_own_dog_food) a fair amount recently as well, which is always good when you want things to write about.

Or would be, except I’m not what one might call a natural writer. There are rare occasions where I can sit down and write, but for the most part, writing a decent non-rambling article that’s actually worth reading takes a lot of time and effort (it’s taken two hours to get this far through this article, for example).\
And for all that I might have some really interesting ideas, often I don’t have the time to sit down for several hours at a bash, but more often than not, I lack the motivation to do so.

Oftentimes it leads towards the curse of ‘but if…’: periodically, I’ll tell myself that I need to write _something_, whatever that might be, and then start thinking things that start ‘but, if…’: I could write now, but if I go change something, or do something slightly different, or have a different tool, I’ll be able to write better…\
… which, of course, is rarely the case.

Ironically, the conclusion to this is pretty much the same as the conclusion to my last post—stop procrastinating, start doing. Only it turns I like ‘doing’ development more than I like ‘doing’ writing about it.

## Returning to the barefoot children

I’m not going to make any promises of any kind: I have two more posts lined up, one of which is mostly written, so there might be _some_ activity here over the coming weeks. Whether or not I actually _publish_ either of them, and whether or not I publish any more following those … remains to be seen

Whatever happens, when I’ve had time to spare over the past few months, I’ve been chipping away at this site in the background. For the most part the changes are fairly subtle, but they’re there.\
In no particular order:

### Browser support

Previously, whilst this site worked best in a modern browser, it paid enough lip service to older browsers that it mostly worked pretty well. The most recent update does away with this, so if you’re using an older browser (in particular, IE8 and older), you’re going to get a decidedly sub-optimal experience. I’d apologise, but it’d not be sincere…

### A brief diet

The lack of having to support gronky old browsers means I’ve been able to slim everything down a little, in particular I’ve completely done away with [modernizr](http://modernizr.com/), which whilst awesome, is almost entirely unneeded. There is still some capability detection going on, but it’s old-school “are you IE” stuff done on the server-side to deal with IE9’s lack of flexbox support.

I’ve also run the version of [FontAwesome](http://fortawesome.github.io/Font-Awesome/) used on this site through the amazingly useful [Fontello](http://fontello.com/) to remove the 380-some icons I’m not actually using. Along with a bit of CSS slimming here and there, pages are about 80–100K smaller than they used to be.

### New functionality and tweaks

Due to ‘but, if…’-ing, the site now has both commenting (um, yay‽) and image galleries, both of which were blocking a couple of post ideas I’ve had.\
I’ve also been around and generally improved things all over the place: notably, I’ve changed the heading font up a little, because whilst I like [Lato](https://www.google.com/fonts/specimen/Lato), it does get a little bit too much after a while. Plus, a little more [Karma](https://www.google.com/fonts/specimen/Karma) is never a bad thing :D

I’ve also made a bunch of tweaks to the administration interface, but you’ll never see any of that…

### Now 100% open-source

Actually, this isn’t anything especially new, but I saw [Julie Ann Horvath](http://julieannhorvath.com/) talk at [HybridConf](http://www.hybridconf.net/) last year about open source, and it inspired me to chuck the source code for this site up on github.\
When it comes to it, I started off in this game hacking at other people’s code to see how it works—and in fact still do—so I figured it was kinda right that I allowed others to do the same.

If you’re curious, [go take a look](https://github.com/jonpearse/jonpearse.net), and feel free to adapt/play/use as you see fit.

## And now…

… well, we’ll see. Hopefully the next post won’t be quite so far away.
