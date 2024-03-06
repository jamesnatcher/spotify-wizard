import type { PageServerLoad, Actions } from './$types';
import { PUBLIC_APP_URL } from '$env/static/public';
import { PRIVATE_SPOTIFY_CLIENT_ID, PRIVATE_SPOTIFY_CLIENT_SECRET } from '$env/static/private';
import { redirect } from '@sveltejs/kit';

function generateRandomString(length: number) {
	let text = '';
	let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

	for (let i = 0; i < length; i++) {
		text += possible.charAt(Math.floor(Math.random() * possible.length));
	}
	return text;
}

export const load: PageServerLoad = async ({ url }) => {
	var state = generateRandomString(16);
	return { appURL: url.origin, state: state };
};
