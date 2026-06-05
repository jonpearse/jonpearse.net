import { type ClassValue, clsx } from 'clsx';

/**
 * Wrapper function around any transformations that only performs the transform
 * if the input file is HTML.
 */
export const ifHtml = ( fn: any ) => ( content: string, outputPath: string ): string =>
	( !outputPath || !outputPath.endsWith( '.html' ) ) ? content : fn( content );

/**
 * Go-go-gadget classname concatenation
 */
export const cn = ( ...inputs: Array<ClassValue> ): string => clsx( inputs );
