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

export const load: PageServerLoad = async () => {};

export const actions = {
	login: async () => {
		console.log('treig');
		let state = generateRandomString(16);
		const authorization_uri = 'https://accounts.spotify.com/authorize?';
		const redirect_uri = PUBLIC_APP_URL + 'api/auth/callback';

		let params = new URLSearchParams({
			response_type: 'code',
			client_id: PRIVATE_SPOTIFY_CLIENT_ID,
			scope:
				'user-read-private user-read-email user-top-read playlist-modify-public playlist-read-private',
			redirect_uri: redirect_uri,
			state
		});
		let loginLink = authorization_uri + params;
		throw redirect(301, loginLink);
	}
} satisfies Actions;
