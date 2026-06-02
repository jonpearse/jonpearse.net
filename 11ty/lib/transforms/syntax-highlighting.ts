/*********************************************************************************************************************
 *
 * Let’s customise the syntax highlighting a bit!
 *
 *********************************************************************************************************************/

// Regex for any syntax-highlighted code. I would love to do this via parsing, but `node-html-parser` has some issues…
const CODE_REGEX: RegExp = new RegExp( '<pre class="language-(.*?)"><code(?:.*?)>(.*?)</code></pre>', 'sg' );

// Individual language definitions I might want to customise the appearance of
type Language = {
	name: string;
	title?: string;
};

const LANGUAGE_MAP: Record<string, Language> = {
	elm: { name: 'Elm' },
	javascript: { name: 'JS', title: 'Javascript' },
	js: { name: 'JS', title: 'Javascript' },
	scss: { name: 'SASS (SCSS)' },
};

const wrapLines = ( content: string, wrapFn: ( _: string ) => string ): string =>
	content.split( '\n' ).map( wrapFn ).join( '\n' );

const rewriteCodeBlock = ( _, langIdent: string, code: string ): string =>
{
	// 1. work out a language
	const language: Language = LANGUAGE_MAP[langIdent] ?? { name: 'Unknown' };
	const titleAttr: string = language.title ? ` title="${language.title}"` : '';

	// 2. reformat things a little so we can do nice line-numbering. This is a bit more complicated than it could be, as
	// prism occasionally wraps multiline comments as a single token, thus…
	// a. split out multiline comments
	let lined: string = code.replace(
		/<span class="token comment">(.*?)<\/span>/igs,
		( _, content: string ) => wrapLines( content, l => `<span class="token comment">${l}</span>` ),
	);

	// b. and wrap everything else…
	lined = wrapLines( lined, l => `<span class="line">${l}</span>` );

	// 3. finally, return a new block (JSX would be nice, but JSX + existing HTML is no bueno)
	return '<aside class="syntax">'
		+ '<header>'
		+ `<h3${titleAttr}>${language.name}</h3>`
		+ '</header>'
		+ `<pre><code class="language-${langIdent}">${lined}</code></pre>`
		+ '</aside>';
};

export default async ( html: string ): Promise<string> => html.replace( CODE_REGEX, rewriteCodeBlock );
