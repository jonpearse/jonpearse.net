import { Page } from '@/11ty';
import { HumanDate } from './date';

export const Preview = ( { data, url, date }: Page ) => (
	<article class="preview">
		<header>
			<h2>
				<a href={url}>{data.title}</a>
			</h2>
			<HumanDate date={date} className="as-small" />
		</header>
		<div class="body">
			<p>{data.description}</p>
		</div>
	</article>
);
