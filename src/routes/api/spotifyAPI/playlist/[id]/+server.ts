import { json, redirect, type RequestHandler } from '@sveltejs/kit';
import { accessToken, refreshToken, tokenExpired } from '../../../../../stores';
import { PUBLIC_APP_URL } from '$env/static/public';
import { PRIVATE_SPOTIFY_CLIENT_ID, PRIVATE_SPOTIFY_CLIENT_SECRET } from '$env/static/private';
import { get } from 'svelte/store';

export const GET: RequestHandler = async ({ params }) => {
	const $accessToken = get(accessToken);

	if (params.id) {
		let url = `https://api.spotify.com/v1/playlists/${params.id}/tracks?`;

		const urlParams = new URLSearchParams();
		urlParams.append('market', 'ES');
		url += urlParams;

		if ($accessToken) {
			const res = await fetch(url, {
				method: 'GET',
				headers: {
					Authorization: 'Bearer ' + $accessToken
				}
			});
			if (res.ok) {
				const data = await res.json();
				return json(data);
			}
		}
	}

	return json({ data: 'no can do boss' });
};
