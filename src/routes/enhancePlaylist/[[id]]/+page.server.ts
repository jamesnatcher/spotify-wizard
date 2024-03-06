import type { Actions } from '@sveltejs/kit';
import type { PageLoad } from '../$types';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = ({ params }) => {
	console.log('Hello!', params.id);
	return { offset: Number(params.id) };
};
