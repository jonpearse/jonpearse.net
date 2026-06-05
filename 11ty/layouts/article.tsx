import readingTime from 'reading-time';

import { EleventyProps } from '@/11ty';
import { HumanDate } from '@ui/date';
import { Calendar, Clock } from '@ui/icons';

export default ( { title, content, date }: EleventyProps ) => (
	<article class="container -narrow | article">
		<header>
			<h1>{title}</h1>

			<dl class="flex -wrap">
				<dt>
					<Calendar title="Posted on" />
				</dt>
				<dd>
					<HumanDate date={date} />
				</dd>

				<dt>
					<Clock title="Reading time" />
				</dt>
				<dd>
					<ReadingTime content={content} />
				</dd>
			</dl>
		</header>

		<div class="prose">
			{content}
		</div>
	</article>
);

export const data = () => ( {
	layout: 'main',
} );

// --------------------------------------------------------------------------
// Internal functions
// --------------------------------------------------------------------------

const ReadingTime = ( { content }: { content: string } ) =>
{
	const { minutes } = readingTime( content );
	const hours = Math.floor( minutes / 60 );
	const mins = Math.floor( minutes % 60 );
	const secs = Math.round( ( minutes % 1.0 ) * 60 );

	const adjusted = ( secs > 30 ) ? mins + 1 : mins;
	const plsn = ( adjusted === 1 ) ? 'minute' : 'minutes';

	return (
		<>
			<time datetime={`PT${hours}H${mins}M${secs}S`}>
				about {adjusted} {plsn}
			</time>
		</>
	);
};
