import { execSync } from 'child_process';
import { DateTime } from 'luxon';

export default () =>
{
	const date = DateTime.now();
	const sha = execSync( `git rev-parse --short HEAD` );

	return `/* TEAM */
	Author, doer of things: Jon Pearse
	Contact: hello [at] jonpearse [dot] net
	Mastodon: @jonpearse@front-end.social
	Bluesky: @jonpearse.net@bsky.app
	Location: Cardiff, UK

/* SITE */
	Language: English (en-GB)
	Software: 11ty [ https://www.11ty.dev/ ]
	Hosting: hetzner.com
	Last update: ${date.toISODate()}
	Source: https://github.com/jonpearse/jonpearse.net
	Current build: ${sha}
`;
};

export const data = () => ( {
	layout: null,
	permalink: '_public/humans.txt',
} );
