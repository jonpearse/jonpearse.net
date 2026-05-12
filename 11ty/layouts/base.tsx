import type { EleventyProps } from '@/11ty';

export default ( { title, content, eleventy }: EleventyProps ) => (
	<html lang="en-GB" dir="ltr">
		<head>
			<meta charset="utf-8" />
			<meta content="width=device-width,initial-scale=1" name="viewport" />
			<meta name="generator" content={`eleventy v${eleventy.version}`} />
			<title>{title} :: jonpearse.net</title>
			<link rel="stylesheet" href="/a/site.css" />
			{/*<script src="/a/site.js" type="module" async defer />*/}
		</head>
		<body>
			{content}
		</body>
	</html>
);
