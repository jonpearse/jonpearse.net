import { EleventyProps } from '@/11ty';

export default ( { title, content }: EleventyProps ) => (
	<article>
		<header>
			<h1>{title}</h1>
		</header>

		<div>
			{content}
		</div>
	</article>
);

export const data = () => ( {
	layout: 'base',
} );
