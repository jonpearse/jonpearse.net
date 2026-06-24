export default {
	tags: [ '_posts' ],
	layout: 'article',

	// allow easy overriding of the path slug within the permlink without having to manually override the whole thing
	pathComponent: '{{ title | slug }}',
	eleventyComputed: {
		permalink: 'writing/{{ pathComponent }}/index.html',
	},
};
