import type { Page } from '@/11ty';

export type Props = {
	articles: Array<Page>;
};

export const ArticleList = ( { articles }: Props ) =>
{
	if ( articles.length === 0 )
	{
		return <></>;
	}

	return (
		<ul>
			{articles.map( ( post: Page ) => (
				<li>
					<a href={post.url}>{post.data.title}</a>
				</li>
			) )}
		</ul>
	);
};
