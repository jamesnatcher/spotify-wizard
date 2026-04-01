import type { PageServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';
import { PRIVATE_SPOTIFY_CLIENT_ID, PRIVATE_SPOTIFY_CLIENT_SECRET } from '$env/static/private';

export const load: PageServerLoad = async ({ url, cookies }) => {
	const code = url.searchParams.get('code');
	const state = url.searchParams.get('state');

	let accessToken = cookies.get('spotify_access_token') ?? null;

	if (code !== null || state !== null) {
		const expectedState = cookies.get('spotify_oauth_state');
		cookies.delete('spotify_oauth_state', { path: '/' });

		if (!code || !state || !expectedState || state !== expectedState) {
			throw redirect(303, '/login');
		}

		const params = new URLSearchParams();
		const header_string = Buffer.from(
			`${PRIVATE_SPOTIFY_CLIENT_ID}:${PRIVATE_SPOTIFY_CLIENT_SECRET}`
		).toString('base64');
		const redirect_uri = url.origin + '/home';

		params.append('grant_type', 'authorization_code');
		params.append('code', code);
		params.append('redirect_uri', redirect_uri);
		params.append('client_secret', PRIVATE_SPOTIFY_CLIENT_SECRET);
		params.append('client_id', PRIVATE_SPOTIFY_CLIENT_ID);

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
			const tokenFromSpotify = data.access_token as string;
			accessToken = tokenFromSpotify;
			cookies.set('spotify_access_token', tokenFromSpotify, {
				path: '/',
				httpOnly: true,
				sameSite: 'lax',
				secure: url.protocol === 'https:',
				maxAge: 60 * 60
			});
		} else {
			cookies.delete('spotify_access_token', { path: '/' });
			throw redirect(303, '/');
		}
	}

	let user = null;
	if (accessToken) {
		const profileRes = await fetch('https://api.spotify.com/v1/me', {
			headers: { Authorization: `Bearer ${accessToken}` }
		});

		if (profileRes.ok) {
			user = await profileRes.json();
		} else if (profileRes.status === 401) {
			cookies.delete('spotify_access_token', { path: '/' });
		}
	}

	return { user };
};
