---
title: Extracting SVG spritesheet dimensions with gulp
description: I had to fix an issue with SVG spritesheets yesterday evening, and thought I’d write up how I did it.
date: 2018-09-05
tags:
  - yum, dogfood
  - javascript
  - snippets
masthead: _mastheads/code.jpg
shortUrl: upnuo923
---

I’ve been working on something of a legacy project for a client of late, and about 5pm yesterday QA raised a bug. In the spirit of Sara Soueidan’s recent invocation to “[Just Write](https://www.sarasoueidan.com/desk/just-write/)”, I thought I’d write it up in case it’s helpful for anyone else.

At some point in the history of the project in question, it was updated to use SVG spritesheets in lieu of custom icon fonts. To do this, the author had used [gulp-svg-sprite](https://www.npmjs.com/package/gulp-svg-sprite) which, among other things, spits out the dimensions of the individual files into a CSS file for later use.

This has worked fine, right up until I created an icon with a gradient and came across a [known bug](https://github.com/jkphl/svg-sprite/issues/74) where gradients aren’t handled correctly and therefore don’t work in Firefox. Unfortunately, while the issue has been fixed in the repo, it doesn’t seem to have been made available in a public release at time of writing.

After a bit of poking around, I opted to fix this by replacing gulp-svg-sprite with my usual combination of [gulp-svgstore](https://www.npmjs.com/package/gulp-svgstore) and [gulp-svgmin](https://www.npmjs.com/package/gulp-svgmin), with a wee bit of custom glue to generate the required CSS file.

## Let’s write some code

The usual invocation when using gulp-svgstore is something like this:

```js
const gulp = require( 'gulp' );
const svgstore = require( 'gulp-svgstore' );
const rename = require( 'gulp-rename' );

gulp.task( 'svg-sprites', () =>
{
	return gulp.src( 'path/to/*.svg' )
		.pipe( svgstore() )
		.pipe( rename( 'spritesheet.svg' ) )
		.pipe( gulp.dest( 'output/directory' ) );
} );
```

If you’re not _au fait_ with gulp, this ingests all SVG files in the specified directory, compiles them into a single file of `SYMBOL` elements and saves the resulting file in `output/directory/spritesheet.svg`.

So what about generating the CSS file?

I’m sure there are other ways of doing this but, inspired by [an example in the gulp-svgstore documentation](https://github.com/w0rm/gulp-svgstore#extracting-metadata-from-combined-svg), I elected to process the output stylesheet thus:

```js
const gulp = require( 'gulp' );
const svgstore = require( 'gulp-svgstore' );
const rename = require( 'gulp-rename' );
const through2 = require( 'through2' );
const cheerio = require( 'cheerio' );

gulp.task( 'svg-sprites', () =>
{
	return gulp.src( 'path/to/*.svg' )
		.pipe( svgstore() )
		.pipe( rename( 'spritesheet.svg' ) )
		.pipe( gulp.dest( 'output/directory' ) )
		.pipe( through2.obj( function( file, encoding, callback )
		{
			// load the file using cheerio in XML mode
			let $ = cheerio.load( file.contents.toString(), { xmlMode: true } );

			// find all symbols and generate a string of CSS
			let sCssString = $( 'svg > symbol[viewBox]' ).map( ( idx, el ) =>
			{
				// get the viewbox attr + split it out into components,
				// also grab the ID
				let $el = $( el ); // caching for later
				let aViewbox = $el.attr( 'viewBox' ).split( /\s+/ );
				let sId = $el.attr( 'id' );

				// return a formatted string
				return `.${sId}-dims {\n`
					+ `\theight: ${aViewbox[3]}px;\n`
					+ `\twidth: ${aViewbox[2]}px;\n}\n`;
			} ).get().join( '\n' );

			// write our CSS back to the file stream
			file.contents = Buffer.from( sCssString );
			this.push( file );
			callback();
		} ) )
		.pipe( rename( 'dimensions.css' ) )
		.pipe( gulp.dest( 'output/directory ' ) );
} );
```

I’m using [through2](https://www.npmjs.com/package/through2) (mostly out of habit) to give me a slightly nicer interface for dealing with the inbound/outbound file stream, and [Cheerio](https://www.npmjs.com/package/cheerio) to parse the SVG and provide a jQuery-like interface for ease of traversal.

Otherwise, the actual process of finding `SYMBOL`s and generating individual CSS rules based on their IDs is relatively simple.

## Things to mention

I mentioned gulp-svgmin earlier, but have not included it in either section of code as it’s not really part of the process in question, but for completeness’ sake, I tend to use it after gulp-svgstore to tidy up the generated code and remove any unwanted elements/attributes.\
In the case of this project, I also used it before gulp-svgstore to try and normalise everything before generating the spritesheet (because legacy/folk blindly exporting from Illustrator without tidying things up first).

More significantly, I also found that in some cases, gulp-svgstore occasionally strips the `viewBox` attribute from the `SYMBOL` element (even if the source SVG file had one). I wasn’t able to work out why (it was late in the evening and I wanted to go home), so I wound up processing individual files in a separate gulp task:

```js
const gulp = require( 'gulp' );
const rename = require( 'gulp-rename' );
const through2 = require( 'through2' );
const cheerio = require( 'cheerio' );
const basename = require( 'path' ).basename;
const rename = require( 'gulp-rename' );

gulp.task( 'svg-sprite-dimensions', () =>
{
	return gulp.src( 'path/to/*.svg' )
		.pipe( through2.obj( function( file, encoding, callback )
		{
			// load the file
			let $ = cheerio.load( file.contents.toString(), { xmlMode: true } );
			let $svg = $( 'svg' );

			// get the viewbox, height and width attrs
			let sViewbox = $svg.attr( 'viewBox' );
			let fHeight = parseFloat( $svg.attr( 'height' ) );
			let fWidth = parseFloat( $svg.attr( 'width' ) );

			// if we have neither height nor width, then try a viewbox
			if ( Number.isNaN( fHeight ) || Number.isNaN( fWidth ) )
			{
				let aViewbox = sViewbox.split( /\s+/ );
				fWidth = aViewbox[2];
				fHeight = aViewbox[3];
			}

			// get a filename so we can generate our rule
			let sFilename = basename( file.path, '.svg' );

			// create our rule + push it back
			file.contents = Buffer.from(
				`.${sFilename}-dims {\n`
					+ `\theight: ${fHeight}px;\n`
					+ `\twidth: ${fWidth}px;\n`
					+ `}\n`,
			);
			this.push();
			callback();
		} ) )
		.pipe( concat( 'dimensions.css' ) )
		.pipe( gulp.dest( 'output/directory' ) );
} );
```

It’s a slightly different approach, but the overall process is pretty much the same: it just modifies the contents of the individual streams being processed & concatenates the result, rather than doing it all in one place.

Of course, whether or not you need to do it this way will depend on circumstance: I’ve tested the first approach—processing the spritesheet—with a number of other projects I’ve worked on in the past couple years and it’s worked fine each time. I’m assuming there’s something about the way some of the SVGs were generated in this most recent project that required the alternative approach 🤷‍♂️

---

Of course, the internet being the internet, there’s almost certainly a node module that does this automatically and I didn’t find it while I was searching last night, but this was an interesting foray into the world of node and gulp so hey.

Maybe this will be useful to someone—share and enjoy :)
