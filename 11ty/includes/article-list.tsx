import type { Page } from '@/11ty';
import { Preview } from './preview';

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
		<ol class="plain | article-list">
			{articles.map( ( post: Page ) => (
				<li>
					<Preview {...post} />
				</li>
			) )}
		</ol>
	);
};
