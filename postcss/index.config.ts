import cssnano from 'cssnano';
import nesting from 'postcss-nesting';

import logicalSize from './logical-size';
import scopePolyfill from './scope-polyfill';
import utopiaClamp from './utopia-clamp';

export default {
	plugins: [
		scopePolyfill,
		logicalSize,
		nesting,
		utopiaClamp,
		cssnano,
	],
};
