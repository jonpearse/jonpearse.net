---
title: "#TILJS: Converting from NodeLists to Arrays"
description: A useful tip for anyone who loves JS’ querySelector and querySelectorAll functions as much as I do…
date: 2016-01-14
tags:
  - javascript
  - "#tiljs"
pathComponent: tiljs-converting-from-nodelists-to-arrays
shortUrl: 5f0z1c3a
---

**2021 update:** NodeList has had its own `forEach` iterator for [a little while now](https://developer.mozilla.org/en-US/docs/Web/API/NodeList/forEach), so unless you’re—for some reason—supporting IE11, you probably shouldn’t be using anything I wrote about in this post. I will, however, leave it here for curiosity.

---

A couple days ago, the highly esteemable [Mr Jegtnes](http://jegtnes.co.uk/) launched [TIL JS](http://tiljs.jegtnes.co.uk/): a side-project born from a desire to improve his JavaScript skills.

It’s a brilliant idea, and given two of my goals this year are to \[a\] [ditch jQuery](http://lea.verou.me/2015/04/jquery-considered-harmful/), and \[b\] get properly into Node / polish my JavaScript, I thought I’d ~~jump on the passing bandwagon~~ join in, thus…

## Background

Anyone who’s used jQuery or any of its clones will be instantly familiar with its `$(selector)` syntax, which allows targetting of arbitrary elements within the DOM by CSS selector. It’s extremely powerful, and for anyone who remembers the bad old days before jQuery, makes life whole amounts easier.

In recent years, similar functionality has been added to native Javascript in the shape of the [querySelector](https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelector) and [querySelectorAll](https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelectorAll) functions, the former returning a single `Node`, and the latter a `NodeList`.

However, whilst [NodeList](https://developer.mozilla.org/en-US/docs/Web/API/NodeList) objects might look a little like array to the casual observer they aren’t, as anyone who attempts to use any of the new(-ish) array iterator functions will find out very quickly.

## The magical invocation

Fortunately, converting from a `NodeList` to an `Array` is simple:

```js
var myArray = [].slice.call( myNodeList );
```

You could even abuse Javascript’s prototype inheritance and do something like:

```js
NodeList.prototype.toArray = function()
{
	return [].slice.call( this );
};
```

… which would give you the ability to do this:

```js
var myArray = document.querySelectorAll( '.foobar' ).toArray();
```

Those of a more Ruby-bent might prefer `to_a()` instead, but that feels a little too much like crossing the streams…

---

While I’m writing, (another) quick note on the state of this site… which basically comes down to the usual “I either seem to have the motivation to write, or the time, but never both at the same time”. I’m trying to change this, don’t hold your breath.
