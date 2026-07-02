import cssnano from 'cssnano';
import nesting from 'postcss-nesting';
import size from 'postcss-size';
import scopePolyfill from './scope-polyfill';
import utopiaClamp from './utopia-clamp';

export default {
	plugins: [
		scopePolyfill,
		size,
		nesting,
		utopiaClamp,
		cssnano,
	],
};
