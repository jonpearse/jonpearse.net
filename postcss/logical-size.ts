/**
 * Reimplementation of `postcss-size`, but with logical properties + in Typescript. That is all.
 *
 * Note that, while CSS convention for multiple values is to assume they’re <block> <inline>; postcss-size does it the
 * other way around, so this plugin does the same thing for consistency.
 */
import { list } from 'postcss';
import type { Declaration, Plugin } from 'postcss';

const process = ( decl: Declaration, prefix: string = '' ) =>
{
	// parse out values; treat multiple values appropriately
	let values: Array<string> = list.space( decl.value );
	if ( values.length === 1 )
	{
		values[1] = values[0];
	}

	// insert new versions
	decl.cloneBefore( { prop: `${prefix}inline-size`, value: values[0] } );
	decl.cloneBefore( { prop: `${prefix}block-size`, value: values[1] } );

	// remove the original
	decl.remove();
};

export default {
	postcssPlugin: 'postcss-logical-size',
	Declaration: {
		/*
			Because `size` is already part of css-page-3, we want to make sure we leave ‘legitimate’ uses well alone…
	 	*/
		size: ( decl: Declaration ) =>
		{
			// if we’re a child of a @page block, bounce
			if ( ( decl.parent?.type === 'atrule' ) && ( decl.parent.name === 'page' ) )
			{
				return;
			}

			process( decl );
		},

		// min- and max- variants are our own concoction, so are much easier
		'max-size': ( decl: Declaration ) => process( decl, 'max-' ),
		'min-size': ( decl: Declaration ) => process( decl, 'min-' ),
	},
} satisfies Plugin;
