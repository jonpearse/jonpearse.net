import type { EleventyProps } from '@/11ty';
import { Footer } from '@ui/footer';
import { Header } from '@ui/header';

export default ( { title, description, content, nav, eleventy, meta, page, tags, shortUrl }: EleventyProps ) =>
{
	const isPost = tags?.includes( '_posts' );

	const metaTitle = title ? `${title} :: ${meta.title}` : meta.title;
	const metaDesc = description ?? meta.description;
	const canonicalUrl = new URL( page.url, meta.rootUrl );
	const ogUrl = isPost && shortUrl
		? new URL( shortUrl, meta.shortUrl )
		: canonicalUrl;

	return (
		<html lang={meta.language} dir="ltr">
			<head>
				<meta charset="utf-8" />
				<meta content="width=device-width,initial-scale=1" name="viewport" />
				<meta name="generator" content={`eleventy v${eleventy.version}`} />
				<title>{metaTitle}</title>

				{/* SEO-juice + meta-fu */}
				<meta name="description" content={metaDesc} />
				<meta property="og:title" content={metaTitle} />
				<meta property="og:description" content={metaDesc} />
				<meta property="og:type" content={isPost ? 'article' : 'website'} />
				<meta property="og:url" content={ogUrl.href} />
				<meta property="og:site_name" content={meta.title} />
				<meta property="og:locale" content={meta.language.replace( '-', '_' )} />

				{/* RSS is awesome */}
				<link rel="alternate" type="application/rss+xml" href="/feeds/full.xml" title="RSS - full posts" />
				<link rel="alternate" type="application/rss+xml" href="/feeds/summary.xml" title="RSS - summary only" />

				{/* Other links */}
				<link rel="author" href="/humans.txt" />
				<link rel="canonical" href={canonicalUrl.href} />
				<meta name="fediverse:creator" content="@jonpearse@front-end.social" />

				{/* Assets */}
				<style>{`:root { --XSSICOLOURSCHEME:; }`}</style>
				<style>@import "/a/critical.css";</style>
				<link rel="stylesheet" href="/a/site.css" />
				{/*<script src="/a/site.js" type="module" async defer />*/}
			</head>
			<body>
				<Header nav={nav} />
				{content}
				<Footer />
			</body>
		</html>
	);
};
