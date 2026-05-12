---
title: Gem updates
description: Some downtime means I’ve had time to release a couple new gems, as well as updating an old friend.
date: 2018-06-06
tags:
  - yum, dogfood
  - open source
  - process
shortUrl: gw509yn9
---

I’ve had some downtime of late following the end of my most recent contract, and I might possibly write about the larger part of my motivation behind this at some later point, but it has given me the opportunity to do some ‘personal’ projects, including a few bits and pieces that I’m releasing as open-source.

Thus, a quick summary of a few Ruby Gems I’ve released/updated recently.

## `devise_date_restrictable`

This is an extension for the widely-used [Devise gem](https://github.com/plataformatec/devise) that allows restriction of user access by date (either before- or after a single date, or between two dates). It’s fairly self-contained and simple to use, so if you’ve used Devise before, there shouldn’t be anything too surprising in `devise_date_restrictable`.

Careful observers will note that this isn’t an especially _new_ gem. I originally wrote it about a year ago for [Sønr](https://sonr.global) and released it as 0.0.1 at the time, it’s just taken until now to have enough time to polish it into a properly releasable (ie, 1.0.0) state.

For more information, check out the [Github repo](https://github.com/jonpearse/devise_date_restrictable) or [RubyGems page](https://rubygems.org/gems/devise_date_restrictable).

## `simple_ar_localizer`

This is a utility gem that ties into [Rails’ I18n framework](http://guides.rubyonrails.org/i18n.html) and—hopefully—gives you a slightly easier interface for localising ActiveRecord objects without having to mess around with awkwardly-nested YAML files. This is especially useful if, like me, you like breaking your localisations up into per-model files to keep everything in a reasonably obvious place.

Out of the box, it handles ‘human’ model names and attribute names (including pluralisation), as well as validation/error messages defined on both a per-model or per-attribute basis. Beyond that, it has a fairly extensible configuration to allow you to use it in any way you so desire.

Again, this is something that came from Sønr and that has been released into the wild in case it proves useful for anyone else.

More information—including documentation + examples—can be found in the [Github repo](https://github.com/jonpearse/simple_ar_localizer).

## `grouped_property_scss_linter`

This is definitely not a new gem and I’ve written about it before, but in the process of rebuilding this site I found that it really didn’t like [CSS custom properties](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_variables) (‘variables’). A little digging and bugfixing later, and it’s back to being useful once more.

Whilst I was at it, I also informed it of a few properties—mostly surrounding CSS Grid—about which it had hitherto been unaware. I’m still not 100% sure whether grid content or -parent properties should go first, but at least it doesn’t ignore them completely!

As with everything else more information, documentation, and the like is on [Github](https://github.com/jonpearse/grouped_property_scss_linter).

…

Share and enjoy!
