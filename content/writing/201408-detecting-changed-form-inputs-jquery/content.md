---
title: "Briefly: detecting changed form inputs with jQuery"
description: I needed to detect whether HTML form inputs had been changed by the user for a project, so I knocked up a quick jQuery selector for it. I thought I’d share it…
pathComponent: briefly-detecting-changed-form-inputs-with-jquery
date: 2014-08-14
tags:
  - javascript
  - snippets
shortUrl: nbe9dj11
---

I was working on a project a few months back that required me to detect whether the user had changed the values of HTML form inputs, and prompt them suitably. After a little poking into the `defaultValue`, `defaultSelected` and `defaultChecked` DOM properties, I knocked together a quick jQuery selector.

It’s since worked its way into a number of other projects—this site included—so I thought I’d post it in case anyone is interested or has suggestions for improvements. Share and enjoy :)

```js
( function( $ )
{
	/**
	 * Selector that returns form input elements that have been changed by the
	 * user since the page was uploaded.
	 *
	 * Example use:
	 *
	 *    $('form :input').filter(':changed').each(function() { … })
	 *
	 * @param   oEl     the element itself
	 * @param   index   the current loop index (unused)
	 * @param   meta    metadata about the selector (unused)
	 * @param   stack   a stack of the elements to loop (unused)
	 */
	$.expr[':'].changed = function( oEl, index, meta, stack )
	{
		// 0. drop out
		var sN = oEl.nodeName.toLowerCase();
		if ( ( sN !== 'input' ) && ( sN !== 'textarea' ) && ( sN !== 'select' ) )
		{
			return false;
		}
		if ( oEl.getAttribute( 'data-no-check' ) != null )
		{
			return false;
		}

		// 1. custom hook for SELECT boxes
		if ( sN == 'select' )
		{
			// a) iterate through all options. If one has changed, we've changed
			for ( var i = 0; i < oEl.options.length; i++ )
			{
				if ( oEl.options[i].defaultSelected != oEl.options[i].selected )
				{
					return true;
				}
			}

			// b. nothing has changed
			return false;
		}

		// 2. otherwise, for radios and checkboxen, use (default)checked
		var sType = oEl.getAttribute( 'type' );
		if (
			( sType !== null )
			&& ( ( sType.toLowerCase() == 'radio' )
				|| ( sType.toLowerCase() == 'checkbox' ) )
		)
		{
			return ( oEl.checked != oEl.defaultChecked );
		}

		// 3. everything else uses (default)value
		return ( oEl.defaultValue != oEl.value );
	};
} )( jQuery );
```

At some point, I’ll get around to making it play nice with [Zepto](http://zeptojs.com/) as well: it’s not being picked up quite right at the moment…
