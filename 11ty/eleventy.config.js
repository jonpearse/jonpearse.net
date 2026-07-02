import { dirname, relative, resolve } from 'path';
import { fileURLToPath } from 'url';

// dependencies
import 'tsx/esm';
import pluginRss from '@11ty/eleventy-plugin-rss';
import syntaxHighlight from '@11ty/eleventy-plugin-syntaxhighlight';
import EleventyVitePlugin from '@11ty/eleventy-plugin-vite';

import bindTransforms from '@/transforms/index';
import postcssConfig from '../postcss/index.config';

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
				cssMinify: false,
			},
			publicDir: '_public',
			css: {
				postcss: postcssConfig,
			},
		},
	} );
	config.addPassthroughCopy( {
		[ASSETS]: 'a',
	} );

	// syntax highlighting is awesome
	config.addPlugin( syntaxHighlight );

	// RSS!
	config.addPlugin( pluginRss );

	// Bind transforms
	bindModule( config, 'addTransform', bindTransforms );

	// … and return a config
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

/**
 * Utility function to bing thigs to the 11ty config object
 */
const bindModule = ( config, configHook, moduleFn ) =>
{
	const bindFn = ( bindAs, bindFn ) => config[configHook]( bindAs, bindFn );
	const bindAll = obj => Object.keys( obj ).forEach( k => bindFn( k, obj[k] ) );

	moduleFn( { bind: bindFn, bindAll } );
};
