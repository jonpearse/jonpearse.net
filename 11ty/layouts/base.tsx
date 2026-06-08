import type { EleventyProps } from '@/11ty';
import { Footer } from '@ui/footer';
import { Header } from '@ui/header';

export default ( { title, content, nav, navKey, eleventy }: EleventyProps ) => (
	<html lang="en-GB" dir="ltr">
		<head>
			<meta charset="utf-8" />
			<meta content="width=device-width,initial-scale=1" name="viewport" />
			<meta name="generator" content={`eleventy v${eleventy.version}`} />
			<link rel="author" href="/humans.txt" />
			<title>{title} :: jonpearse.net</title>
			<link rel="stylesheet" href="/a/site.css" />
			{/*<script src="/a/site.js" type="module" async defer />*/}
		</head>
		<body>
			<Header nav={nav} current={navKey} />
			{content}
			<Footer />
		</body>
	</html>
);
