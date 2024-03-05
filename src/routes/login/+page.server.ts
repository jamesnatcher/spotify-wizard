import type { PageServerLoad, Actions } from './$types';

export const load: PageServerLoad = async () => {};

export const actions = {
	login: async () => {
		await fetch('/api/auth/login');
	}
} satisfies Actions;
