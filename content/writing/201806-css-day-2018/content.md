---
title: UX Special and CSS Day 2018
description: I was fortunate enough to go to CSS Day this year, and this is my quick write-up.
date: 2018-06-19
tags:
  - conferences
  - meta
shortUrl: usjz57ar
---

I’m on my way back from Amsterdam and the 6th iteration of the ever-wonderful [CSS Day](https://cssday.nl) conference. This time around, the first day—the theme of which varies from year to year—was all about UX.

This is a quick write-up of everything while it’s still relatively fresh in my mind: I’ll probably miss a few bits out (because there was a _lot_ of information in a relatively short spot of time), but it should hopefully give you a reasonable taste of ~~what you missed~~ what happened over the two days.

## Day One: UX Special

[Alla Kholmatova](http://craftui.com) started the conference talking about the importance of building a set of design principles: the underlying guidelines by which the design process should be run. These should be genuine, opinionated, actionable, and memorable—with no more than three to five in total. They should also be defined with the audience and goals in mind, rather than being abstract, and should be continually re-assessed to ensure that they still work.

[Jenny Shen](http://jennyshen.com) told us how to **build bridges, not walls** when designing for users across cultures. She emphasised the importance of understanding both the local culture and traditions of our audience, as well as the existing conventions already being used within the web and mobile apps—for example, that while western sites/apps use the ‘Hamburger’ or ‘three dots’ icon to denote a menu/additional options, in China a ‘Discover’ option is far more widely used and understood. She also mentioned that when looking for existing research, your search should be for content in your audience’s native language, rather than your own.\
And never use machine translation: just… don’t.

[Jane Austin](https://twitter.com/msjaneaustin) gave us ten (actually eleven) ways to irritate our design teams. She talked about the [double diamond](https://www.designcouncil.org.uk/news-opinion/design-process-what-double-diamond) and the importance of building the right thing, and building the thing right. Also, that it is sometimes far more productive to stay with sketches and wireframes for longer as people find it easier to be critical of them, without getting too invested in/distracted by the visual designs. For the curious, the eleven ways were:

1. asking designers ‘just to colour in the wireframes’
2. treating designers as feature factories (+ don’t fake agile)
3. treating projects as ‘ship and forget’, with no time to fix and revisit at a later stage
4. doing the above until technical debt has piled up so high that it is impossible to ship anything at all
5. poor hiring and onboarding practices
6. not providing designers with a future
7. not allowing proper time for research (+ responding to what people want, rather than what they need)
8. overloading everyone with meetings (managers typically split their days into 30min slots, whereas designers—and developers—work in multi-hour chunks, leading to scheduling conflicts)
9. having a poorly set-up workspace (walls on which to stick post-its are absolutely essential)
10. culture (if the culture is bad, people won’t want to work for you)
11. micromanagement (no-one likes a [hovering art director](http://hoveringartdirectors.tumblr.com/))

[Benjamin de Cock](https://twitter.com/bdc) explained how clever design and animation can help user experience, but only if done properly. Subtle transitions and animations can be really useful to illustrate how an interface is working, and purely decorative elements can make an interface seem more ‘friendly’ and welcoming, but taken too far they can actively get in the way of what users are trying to achieve. Websites should also respect the user’s preferences—if iOS users have opted to reduce motions in their UI, your website should also do so.\
From a development perspective, only the `transform` and `opacity` CSS properties are ‘cheap’ to animate, and with a little lateral thinking, many effects can be created with combinations of the two. Where this is not possible, SVG animations should be used instead, especially as they will use subpixel aliasing, resulting in smoother animations.

[Nadieh Bremer](https://www.visualcinnamon.com/) shared her experience of working on [Data Sketches](http://datasketch.es), a data-visualisation project in collaboration with [Shirley Wu](http://sxywu.com). She talked through her process of creating a visualisation, starting with sourcing and ascertaining the accuracy and completeness (use google, don’t be afraid to break out the spreadsheets), and emphasised the importance of sketching ideas out as a way of catching any errors in the design or data before committing too much to code.

[Vitaly Friedman](https://www.smashingmagazine.com/) talked about how terrible the average ecommerce experience is for users: extra costs, limited payment methods, enforced sign-up, and a perceived lack of trust in the platform leads to an almost-70% abandonment rate (in particular, 54% of users will abandon the process when asked to sign up, 75% if they have to go through a ‘recover password’ process). He also talked about the importance of reviews (4.83/5 stars is optimal, apparently), breadcrumbs, and ‘thumb-driven design’: that folk using mobile devices are more accurately able to hit targets in the centre of a touchscreen than in the corners.

[Ida Aalen](https://idaaa.no/) told us how she does user testing on a budget, impressing that developers and designers aren’t suitable candidates for testers (they’re all a little too genre-savvy), as well as warning against testing by usability experts who apparently miss 50% of actual user issues, whilst 33% of raised issues are actually false flags.\
Instead, we should be going out into the world—with snacks—and testing with real live people, asking them to perform tasks (without helping) whilst thinking out loud and explaining what they’re doing.

[Andy Budd](http://andybudd.com/) closed the day out talking about becoming an ‘Accidental Design Leader’ (although everything he said could apply to anyone in a leadership position). He highlighted that many people see leadership as power and that power is necessary to make change, whereas in many organisations it’s far more complex than that, and that leaders should stand between them and the larger organisation.

## Day Two: CSS Day

[Eric Meyer](https://meyerweb.com) began the day talking about the ‘Friction of Web Standards’; explaining that some apparently simple browser features take far longer than might be expected to become standards because they’re actually quite difficult beneath the surface. His example was the humble border radius, and how it interacts with background images, box shadows, and differing border styles and thicknesses. He also highlighted the ‘long tail’ of the internet: that the first website still works, and that the browser default styles for `blockquote` elements have a left margin (or inline-start margin, if you will) of 40px because that’s what Mosaic did, and therefore the implicit requirement of decisions to be made ‘right’ rather than ‘quick’.

[Richard Rutter](https://clagnut.com) talked us through the ‘Golden Rules for Typography on the Web’: how display text—for titles and such—should often be treated differently to paragraph text, and how both should be sized across different devices to attain maximum readability. He also talked about variable fonts—a part of the CSS Fonts level 4 spec—which allows full manipulation of a number of different axes (font weight, slant, spacing, etc) whilst only distributing a single file over the wire.

[Hidde de Vries](https://hiddedevries.nl) took us on a journey through 100 years of graphic design to show us that the ’Web is ready for great graphic design’. Through the works of Jan Tschichold and Josef Müller-Brockmann, he explained how CSS Flexbox and Grid in conjunction with CSS viewport units can make our lives substantially easier without having to resort to 12-column layouts and CSS frameworks like Bootstrap.

[Sara Souiedan](https://sarasouiedan.com) then proceeded to blow our minds with a fast-paced introduction into the world of [SVG filters](https://developer.mozilla.org/en-US/docs/Web/SVG/Element/filter). In contrast to the somewhat limited set of CSS filters (which are applied one after the other), SVG has nineteen individual filters which can be combined in any way you wish, and therefore can be used to do Photoshop-like effects in the browser in real time. She started off with a simple drop shadow (which, unlike CSS, supports complex shapes rather than just rectangles) before showing us how to implement displacement effects and, eventually, a rather attractive crumpled paper texture via judicious use of noise generators (I will _so_ be experimenting with this!)

[Greg Whitworth](https://twitter.com/gregwhitworth) talked about container queries, why we don}t have them yet, and why we probably don’t actually need them because CSS flex and grid along with object-fit and viewport units can do a lot of what we are trying to achieve in a much more performant way, albeit with a little more lateral thinking. He talked about `ResizeObserver` (wonderful but almost completely unsupported) and `IntersectionObserver` and how they can be used to provide container query-like behaviour when required, but also highlighted the importance of deciding whether the designed behaviour was actually strictly required as opposed to merely being desirable, and therefore whether it was actually needed at all.

[Hui Jing Chen](https://www.chenhuijing.com/) talked about how we as CSS folk are ‘programmers of boxes’ as she covered the intricacies of boxes in CSS. With the help of some especially endearingly-illustrated slides, she talked about box positioning, flow context (aka, how to clearfix without, well… clearfix), and finally CSS flex and grid, and how it all works together with writing direction and the myriad _possibilities_ it all gives us.

[Ire Aderinokun](https://ireaderinokun.com/) talked about building websites for the ‘next billion users’, likely to be users of much-improved assistive technologies, non-English speakers, folk using the internet primarily on mobile devices, and those with poor internet access. She talked about building performant sites, that are easy to internationalise, and that are highly accessible (something we seem to have forgotten over the years). This applies equally in code, where we should be using the right tool for the job (CSS for presentation, JS for behaviour), ensuring our CSS classes and variables are named globally (‘sidebar’, rather than ‘left’), and choosing CSS selectors appropriately (ID and class are way more performant than :nth-child and pseudos).

Finally, [Bruce Lawson](http://www.brucelawson.co.uk) took on the subject of CSS-in-JS, talking about some of the reasons for the cultural clash that has been taking place since its arrival in the world, and offering a potential solution in the shape of [Stylable](https://stylable.io): a component-friendly pre-processed framework that compiles down into vanilla CSS. There was also distribution of mohawked potatoes through the audience, but … you kinda had to be there.

---

All of which is a lot of words that really can’t do the conference justice: there was so much tremendously good stuff covered at the conference, and I’ve come away with a list of projects, techniques, and APIs, some of which will be worked into projects directly, and others—like everything from Sara’s talk—that I can’t wait to take a deeper dive into and have fun with. The hardest part thus far is prioritising everything instead of trying to do it all at once!\
More than that, though, it was the opportunities to meet developers, designers, UXers, and others from all over the world (albeit, mostly from the Netherlands) and to chat ideas, inspiration, and web tech in such an enthusiastic and relaxed atmosphere.

If you want more, take a look at the [CSS Day twitter feed](https://twitter.com/cssdayconf), [Stephanie Nemeth](http://twitter.com/stephaniecodes) took some [amazing sketchnotes](https://twitter.com/i/moments/1008626433114148866), and you’ll almost certainly want to keep an eye on the [CSS Day Vimeo channel](https://vimeo.com/webconferences) where videos of the conference will be joining those from previous years over the next few months.

And, of course, CSS Day will be returning next year with a UI special: provisional dates are June 13–14th, but keep an eye on [the website](https://cssday.nl/) for updates. I’ll see you there!
