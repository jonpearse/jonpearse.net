---
title: On linting, and bringing order to SASS
description: SCSS-Lint’s default PropertySortOrder plugin irks me, so I decided to write my own.
date: 2016-07-15
tags:
  - CSS
  - process
  - yum, dogfood
  - open source
shortUrl: 3wazv9g9
---

**2019 update**: with SASS being ported from Ruby to Dart, SCSS-Lint is no longer being maintained, and the SCSS-Lint team [recommends using other tools instead](https://github.com/sds/scss-lint#notice-consider-other-tools-before-adopting-scss-lint). This post is left for curiosity’s sake.

---

Recently I’ve been working on-and-off on my front-end tookit (ie, the basic CSS/JS/etc I use to bootstrap projects). I’m almost ashamed to admit that it’s taken this long, but let’s file it along with the shoemaker’s children and move on.\
Whilst the overall process is something for another blog post, it’s spawned a couple of interesting side-projects, one of which has got to the stage where I can consider it ‘ready for the world’.

This particular side project came about after going to work with the lovely folk at [Mr B & Friends](https://www.mrbandfriends.co.uk) in Bath, who sometime earlier this year began to roll out SASS linting using the [SCSS-Lint](https://github.com/brigade/scss-lint) Node plugin.

Now, those who have worked with me in the past might think that I have something against linting: certainly, I’ve been known to express an opinion or two.\
The truth is, though, I’m actually really quite fond of linting… as long as it’s sane.

## Let’s talk CSS Property Ordering

When you get started with SCSS-Lint, one of the linters enabled by default is called [PropertySortOrder](https://github.com/brigade/scss-lint/blob/master/lib/scss_lint/linter/README.md#propertysortorder) and forces a strict ordering of properties within each rule.

This makes reasonable sense when writing ‘Vanilla’ CSS, as there are [some benefits](https://www.barryvan.com.au/2009/08/css-minifier-and-alphabetiser/) to doing so beyond just ‘looking good’.\
However, when writing SASS—or any other precompiled format—I would suggest that by the time your code has been through the precompiler and anything else in your toolchain, there’s a good chance things aren’t quite as neat as they might have been to start with.

Besides which, I don’t know about anyone else, but I’m not especially great at remembering a specific order of all 500+ CSS properties, and having to constantly parse the output of a linter and rejig my code gets very old very quick.

## Less order, more collation

That’s not to say this kind of linting is _bad_, just a little unnecessary. There is a lot to be said for keeping your CSS neat, and to this end many developers—myself included—have taken to grouping similar/related properties together within rules ([SMACSS](https://smacss.com), for example, talks about [categorising properties](https://smacss.com/book/categorizing)).

However, I’m not especially fussed about the particular order of individual properties within each of these groups or categories. As long as—say—positional properties are all grouped together, I’m not too bothered if `top` is specified before `left` or vice-versa.

Hopefully this strikes some kind of happy medium: your SASS is—hopefully—clean and readable, but without the overhead of having to worry about exactly which properties go in which order.\
Less worrying about pleasing the linter makes for happier developers, who can then concentrate on more important things. Those owls won’t lobotomise themselves, after all.

I did have a look around for an SCSS-Lint plugin that allowed this kind of fuzzy grouping of properties, but my search came up blank.\
So I wrote my own…

## Introducing `grouped_property_scss_linter`

[grouped\_property\_scss\_linter](https://github.com/jonpearse/grouped_property_scss_linter/) is a catchingly-titled SCSS-Lint plugin gem designed to replace the default `PropertySortOrder` and provide a saner linting experience, based on grouping CSS properties within a rule.\
As long as the groups are in the right order and have suitable (and configurable) separation, the linter is happy.

Thus, whilst…

```css
.myClass {
	height: 200px;
	color: #333;
	width: 200px;
}
```

… is bad, either of

```css
.myClass {
	height: 200px;
	width: 200px;
	color: #333;
}

.myOtherClass {
	width: 200px;
	height: 200px;

	color: #333;
}
```

… is just fine.

Which hopefully makes for happier developers, and that can only be a good thing. Unless you’re an owl.

I’ve spent the past month kicking it around in various projects, and it seems to be working OK… well enough that I think it’s ready to be inflicted upon the world.\
It’s currently available—with a readme—on my [github account](https://github.com/jonpearse/grouped_property_scss_linter/). Check it out, kick it about a bit, let me know what you think.

## But what about…

As I mentioned earlier, there are good reasons for using strict-ordering within your CSS, and this linter doesn’t really help you get there.

Fortunately, for those using a Node toolchain to compile SASS, there’s a Node module called [postcss-sorting](https://github.com/hudochenkov/postcss-sorting) that will order your CSS properties to your satisfaction after everything’s been compiled.\
Other solutions for other platforms may exist, I’ve not really looked as yet.

Finally, for those who want this kind of grouped property linting but aren’t using SASS, the [stylelint](https://github.com/stylelint/stylelint) Node module does approximately the same thing for vanilla CSS, and may have influenced this linter gem more than a little.
