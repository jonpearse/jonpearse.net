import type { EleventyProps } from '@/11ty';
import { Footer } from '@ui/footer';
import { Header } from '@ui/header';

export default ( { title, description, content, nav, navKey, eleventy, meta }: EleventyProps ) => (
	<html lang={meta.language} dir="ltr">
		<head>
			<meta charset="utf-8" />
			<meta content="width=device-width,initial-scale=1" name="viewport" />
			<meta name="generator" content={`eleventy v${eleventy.version}`} />

			{/* SEO-juice */}
			<title>{title} :: {meta.title}</title>
			<meta name="description" content={description ?? meta.description} />

			{/* RSS is awesome */}
			<link rel="alternate" type="application/rss+xml" href="/feeds/full.xml" title="RSS - full posts" />
			<link rel="alternate" type="application/rss+xml" href="/feeds/summary.xml" title="RSS - summary only" />

			{/* Other links */}
			<link rel="author" href="/humans.txt" />

			{/* Assets */}
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
