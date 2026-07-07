import cssnano from 'cssnano';
import mergeAtRules from 'postcss-merge-at-rules';
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
		// merge all @layers together to keep the output clean
		mergeAtRules( { atRulePattern: /layer/im } ),
		cssnano,
	],
};
