import { json, redirect } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ params, cookies }) => {
	const accessToken = cookies.get('spotify_access_token');
	if (!accessToken) {
		redirect(303, '/login');
	}

	const playlistId = params.id;
	const tracksURL = new URL(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`);
	tracksURL.searchParams.set('market', 'ES');

	const spotifyRes = await fetch(tracksURL, {
		method: 'GET',
		headers: { Authorization: `Bearer ${accessToken}` }
	});

	if (spotifyRes.status === 401) {
		cookies.delete('spotify_access_token', { path: '/' });
		redirect(303, '/login');
	}

	if (!spotifyRes.ok) {
		return json({ items: [] }, { status: spotifyRes.status });
	}

	return json(await spotifyRes.json());
};
