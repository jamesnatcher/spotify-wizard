import { PUBLIC_SPOTIFY_CLIENT_ID, PUBLIC_SPOTIFY_CLIENT_SECRET } from '$env/static/public';
import type { PageServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ url }) => {
	const code = url.searchParams.get('code') as string;
	const state = url.searchParams.get('state') as string;

	let access_token;
	if (state !== null) {
		const params = new URLSearchParams();
		const header_string = Buffer.from(
			`${PUBLIC_SPOTIFY_CLIENT_ID}:${PUBLIC_SPOTIFY_CLIENT_SECRET}`
		).toString('base64');
		const redirect_uri = url.origin + '/home';

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
			access_token = data.access_token;
		} else {
			throw redirect(303, `/`);
		}
	}

	return { access_token: access_token };
};
