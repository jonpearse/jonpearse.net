/**
 * This is a reimplementation of `utopia.clamp` from the `postcss-utopia` package because, as much as I love it, the
 * ‘.’ in the name causes all manners of problems for both Zed’s CSS LSP and dprint as it’s not technically valid CSS.
 *
 * This is a simple reimplementation (read: copy/paste) of the appropriate code from the `postcss-utopia` module that
 * exposes the same functionality with a slightly different—and spec compliant—name.
 *
 * @TODO: open a PR on `postcss-utopia` to make the function name configurable :)
 */
import CSSValueParser from 'postcss-value-parser';
import { calculateClamp } from 'utopia-core';

export default {
	postcssPlugin: 'utopia-revised',
	Declaration( decl )
	{
		// The faster way to find Declaration node
		const parsedValue = CSSValueParser( decl.value );

		let valueChanged = false;
		parsedValue.walk( node =>
		{
			if ( node.type !== 'function' || node.value !== 'utopia-clamp' )
			{
				return;
			}

			let [ minSize, maxSize, minWidth, maxWidth ] = node.nodes.filter( x => x.type === 'word' ).map( x => x.value )
				.map( Number );
			if ( !minSize || !maxSize || !minWidth || !maxWidth ) return false;

			// Generate clamp
			const clamp = calculateClamp( { minSize, maxSize, minWidth, maxWidth } );

			// Convert back PostCSS nodes
			const { nodes: [ { nodes } ] } = CSSValueParser( clamp );

			node.value = 'clamp';
			node.nodes = nodes;
			valueChanged = true;

			return false;
		} );

		if ( valueChanged )
		{
			decl.value = CSSValueParser.stringify( parsedValue );
		}
	},
};
