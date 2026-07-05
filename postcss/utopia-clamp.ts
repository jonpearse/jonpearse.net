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

import type { Declaration, Plugin } from 'postcss';
import type { FunctionNode, Node } from 'postcss-value-parser';

export default {
	postcssPlugin: 'utopia-revised',
	Declaration( decl: Declaration )
	{
		// The faster way to find Declaration node
		const parsedValue = CSSValueParser( decl.value );

		let valueChanged: boolean = false;
		parsedValue.walk( ( node: Node ): boolean | undefined =>
		{
			if ( node.type !== 'function' || node.value !== 'utopia-clamp' )
			{
				return;
			}

			let [ minSize, maxSize, minWidth, maxWidth ]: Array<number> = node.nodes
				.filter( x => x.type === 'word' )
				.map( x => x.value )
				.map( Number );
			if ( !minSize || !maxSize || !minWidth || !maxWidth ) return false;

			// Generate clamp
			const clamp: string = calculateClamp( { minSize, maxSize, minWidth, maxWidth } );

			// Convert back PostCSS nodes
			const { nodes } = CSSValueParser( clamp ).nodes[0] as FunctionNode;

			node.value = 'clamp';
			node.nodes = nodes;
			valueChanged = true;

			return false;
		} );

		if ( valueChanged )
		{
			decl.value = CSSValueParser.stringify( parsedValue.nodes );
		}
	},
} satisfies Plugin;
