import { DateTime } from 'luxon';

export type Props = {
	date: Date;
	className?: string;
};

export const HumanDate = ( { date, className }: Props ) =>
{
	const dt = DateTime.fromJSDate( date, { zone: 'utc' } );
	const ordinal = getOrdinal( date.getUTCDate() );

	return (
		<time datetime={dt.toFormat( 'yyyy-MM-dd' )} class={className}>{dt.toFormat( `LLLL d'${ordinal},' yyyy` )}</time>
	);
};

const getOrdinal = ( n: number ): string =>
	( n > 10 && n <= 13 )
		? 'th'
		: [ 'th', 'st', 'nd', 'rd' ][n % 10 > 3 ? 0 : n % 10];
