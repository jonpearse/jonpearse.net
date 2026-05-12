import type { EleventyProps } from '@/11ty';
import { ArticleList } from '@ui/article-list';

export default ( { collections }: EleventyProps ) => (
	<>
		<h1>Writing</h1>

		<ArticleList articles={collections._posts.reverse()} />
	</>
);

export const data = () => ( {
	title: 'Writing',
} );
