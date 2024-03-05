import { redirect } from '@sveltejs/kit';
import { accessToken, refreshToken, tokenExpired } from '../../../../stores';
import {
	PUBLIC_SPOTIFY_CLIENT_SECRET,
	PUBLIC_SPOTIFY_CLIENT_ID,
	PUBLIC_APP_URL
} from '$env/static/public';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async (event) => {
	const { url } = event;
	const code = url.searchParams.get('code') as string;
	const state = url.searchParams.get('code') as string;

	if (state !== null) {
		const params = new URLSearchParams();
		const header_string = Buffer.from(
			`${PUBLIC_SPOTIFY_CLIENT_ID}:${PUBLIC_SPOTIFY_CLIENT_SECRET}`
		).toString('base64');
		const redirect_uri = PUBLIC_APP_URL + 'api/auth/callback';

		params.append('grant_type', 'authorization_code');
		params.append('code', code);
		params.append('redirect_uri', redirect_uri);
		params.append('client_secret', PUBLIC_SPOTIFY_CLIENT_SECRET);
		params.append('client_id', PUBLIC_SPOTIFY_CLIENT_ID);

		const res = await fetch('https://accounts.spotify.com/api/token', {
			method: 'POST',
			headers: {
				Authorization: 'Basic ' + header_string,
				'Content-Type': 'application/x-www-form-urlencoded'
			},
			body: params
		});

		if (res.ok) {
			const data = await res.json();
			accessToken.set(data.access_token);
			refreshToken.set(data.refresh_token);
			tokenExpired.set(false);

			throw redirect(303, `/home`);
		} else {
			throw redirect(303, `/`);
		}
	}

	throw redirect(303, '/');
};
