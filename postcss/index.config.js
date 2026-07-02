import cssnano from 'cssnano';
import nesting from 'postcss-nesting';
import size from 'postcss-size';
import utopia from 'postcss-utopia';
import scopePolyfill from './scope-polyfill';

export default {
	plugins: [
		scopePolyfill,
		size,
		nesting,
		utopia,
		cssnano,
	],
};
