/**
 * Wrapper function around any transformations that only performs the transform
 * if the input file is HTML.
 */
export const ifHtml = ( fn: any ) => ( content: string, outputPath: string ): string =>
	( !outputPath || !outputPath.endsWith( '.html' ) ) ? content : fn( content );
