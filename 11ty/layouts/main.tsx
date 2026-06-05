import { EleventyProps } from '@/11ty';

export default ( { content }: EleventyProps ) => <main class="container">{content}</main>;

export const data = {
	layout: 'base',
};
