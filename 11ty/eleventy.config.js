import { dirname, relative, resolve } from 'path';
import { fileURLToPath } from 'url';

// dependencies
import 'tsx/esm';
import EleventyVitePlugin from '@11ty/eleventy-plugin-vite';

/** --- PATHS --- */

const ROOT = dirname( dirname( fileURLToPath( import.meta.url ) ) );

// Individual paths
const ASSETS = resolve( ROOT, './assets' );
const CONTENT = resolve( ROOT, './content' );
const ELEVENTY = resolve( ROOT, './11ty' );

/** --- CONFIG ---- */
export default async config =>
{
	// Enable JSX/TSX for template usa
	config.addExtension( [ 'jsx', 'tsx' ], {
		key: '11ty.js',
		compile()
		{
			return async function( data )
			{
				const html = await this.defaultRenderer( data );
				return html.startsWith( '<html' ) ? '<!DOCTYPE html>' + html : html;
			};
		},
	} );
	config.addTemplateFormats( [ 'jsx', 'tsx' ] );

	// Use vite for assets
	config.addPlugin( EleventyVitePlugin, {
		viteOptions: {
			build: {
				assetsDir: 'a',
			},
		},
	} );
	config.addPassthroughCopy( {
		[ASSETS]: 'a',
	} );

	return {
		dir: {
			input: './content',
			output: resolve( ROOT, '.build/site' ),

			// note that these are relative to CONTENT, not absolute
			includes: relative( CONTENT, resolve( ELEVENTY, './includes' ) ),
			layouts: relative( CONTENT, resolve( ELEVENTY, './layouts' ) ),
		},
	};
};
