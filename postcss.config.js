import cssnano from 'cssnano';
import size from 'postcss-size';
import utopia from 'postcss-utopia';

export default {
	plugins: [
		size,
		utopia,
		cssnano,
	],
};
