/*********************************************************************************************************************
 *
 * Output transforms
 *
 *********************************************************************************************************************/

import { ifHtml } from '@/utils';
import { parse } from 'node-html-parser';

import rehighlightSyntax from './syntax-highlighting';

/**
 * Processes HTML and modifies the @rel attributes of any external links, where
 * necessary.
 */
const processLinks = async ( html: string ): Promise<string> =>
{
	const root = parse( html );

	// ensure all external + mailto links have appropriate rel + target attrs
	root.querySelectorAll( 'a[href^=http], a[href^=mailto]' ).forEach( el =>
	{
		const rel = el.getAttribute( 'rel' ) ?? '';
		const external = el.getAttribute( 'href' )?.startsWith( 'http' ) ? 'external' : '';
		el.setAttribute( 'rel', `${rel} ${external} nofollower nooopener`.trim() );

		if ( !el.getAttribute( 'target' ) )
		{
			el.setAttribute( 'target', '_blank' );
		}
	} );

	return root.toString();
};

/** ---- Default export ---- */
export default ( { bind }: { bind: any } ) =>
{
	bind( 'processLinks', ifHtml( processLinks ) );
	bind( 'rehighlightSyntax', ifHtml( rehighlightSyntax ) );
};
