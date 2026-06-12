import { json, redirect } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { clearAccessTokenCookie, requireAccessToken } from '$lib/server/spotify';
import type { SpotifyPaginatedPlaylistTracks } from '$lib/types/spotify';

export const GET: RequestHandler = async ({ params, cookies }) => {
	const accessToken = requireAccessToken(cookies);

	const tracksURL = new URL(`https://api.spotify.com/v1/playlists/${params.id}/tracks`);
	tracksURL.searchParams.set('market', 'ES');

	const spotifyRes = await fetch(tracksURL, {
		method: 'GET',
		headers: { Authorization: `Bearer ${accessToken}` }
	});

	if (spotifyRes.status === 401) {
		clearAccessTokenCookie(cookies);
		throw redirect(303, '/login');
	}

	if (!spotifyRes.ok) {
		return json({ items: [] }, { status: spotifyRes.status });
	}

	const data = (await spotifyRes.json()) as SpotifyPaginatedPlaylistTracks;
	return json(data);
};
