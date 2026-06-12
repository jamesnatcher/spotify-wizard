import type { PageServerLoad } from './$types';
import { setOAuthStateCookie } from '$lib/server/spotify';

function generateRandomString(length: number) {
	let text = '';
	const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

	for (let i = 0; i < length; i++) {
		text += possible.charAt(Math.floor(Math.random() * possible.length));
	}
	return text;
}

export const load: PageServerLoad = async ({ url, cookies }) => {
	const state = generateRandomString(16);
	setOAuthStateCookie(cookies, state, url.protocol === 'https:');

	return { appURL: url.origin, state };
};
