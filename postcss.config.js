import cssnano from 'cssnano';
import size from 'postcss-size';
import utopia from 'postcss-utopia';

/**
 * PostCSS plugin to add vague support for css-cascade-6 @scope rules. This is very much a work in progress and is
 * subject to change as the underlying proposal changes, but it’s an interesting exercise in skating to where the puck
 * is going.
 *
 * Some things to note:
 * - currently `@scope (.foo) to (.bar)` is not supported because constraining selectors in this way isn’t really
 *   possible with current CSS.
 * - @scope will have higher precedence when supported natively than this polyfill allows. I *could* mess around with
 *  `[class]` hacks but that way madness lies, so such shenanigans are left as an exercise to the user.
 */
const scopePolyfill = {
	postcssPlugin: 'css-cascade-6 scope polyfill',
	AtRule: {
		scope: decl =>
		{
			const match = decl.params.match( /\((.*?)\)( to \((.*?)\))?/i );
			if ( match === null )
			{
				return decl;
			}

			if ( match[3] !== undefined )
			{
				console.warn( 'Found ‘to’ constraint in @scope rule: this is ignored for now' );
			}

			const rootScope = match[1];

			// ‘:scope’ directly inside @scope refers to the scope root — once everything’s nested
			// under a plain rule below, that’s exactly what ‘&’ means at this level
			decl.each( child =>
			{
				if ( !child.selectors )
				{
					return child;
				}

				child.selectors = child.selectors.map( selector =>
					selector.startsWith( ':scope' ) ? selector.replace( ':scope', '&' ) : selector
				);
			} );

			decl.replaceWith( { selector: rootScope, nodes: decl.nodes } );
		},
	},
};

export default {
	plugins: [
		scopePolyfill,
		size,
		utopia,
		cssnano,
	],
};
