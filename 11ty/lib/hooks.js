/**
 * Do some cache-busting within Node’s module loader, so changes to .tsx files are actually picked up without having to
 * HUP the dev server.
 */
import { fileURLToPath } from 'url';

// Directories that should always be reloaded
const MUST_RELOAD = [ '11ty/includes/', '11ty/layouts/' ];

/**
 * Custom file resolution helper: appends a timestamp to any files in the MUST_RELOAD paths, which forces it to be
 * loaded from disk each build.
 */
export const resolve = async ( specifier, context, nextResolve ) =>
{
	const result = await nextResolve( specifier, context );
	if ( !result.url.startsWith( 'file://' ) )
	{
		return result;
	}
	const cleanPath = fileURLToPath( result.url.split( '?' )[0] );

	// if the file must be reloaded, append a timestamp; otherwise…
	return MUST_RELOAD.some( dir => cleanPath.includes( dir ) )
		? { ...result, url: `${result.url}?nocache=${Date.now()}` }
		: result;
};

/**
 * Custom loader: remove the querystring added by the resolution step
 */
export const load = async ( url, context, nextLoad ) =>
	// Strip our cache-buster so tsx/Node can read the file from disk
	nextLoad( url.replace( /\?nocache=\d+/, '' ), context );
