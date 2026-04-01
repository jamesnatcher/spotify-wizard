import type { PageServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ params, cookies }) => {
	const accessToken = cookies.get('spotify_access_token');
	if (!accessToken) {
		throw redirect(303, '/login');
	}

	const rawOffset = Number(params.id);
	const offset = Number.isNaN(rawOffset) || rawOffset < 0 ? 0 : rawOffset;

	const meRes = await fetch('https://api.spotify.com/v1/me', {
		headers: { Authorization: `Bearer ${accessToken}` }
	});

	if (!meRes.ok) {
		cookies.delete('spotify_access_token', { path: '/' });
		throw redirect(303, '/login');
	}

	const user = await meRes.json();
	let playlistsURL = `https://api.spotify.com/v1/users/${user['id']}/playlists?`;
	const query = new URLSearchParams();
	query.append('limit', '50');
	query.append('offset', (offset * 50).toString());
	playlistsURL += query.toString();

	const playlistsRes = await fetch(playlistsURL, {
		method: 'GET',
		headers: { Authorization: `Bearer ${accessToken}` }
	});
	const playlists = playlistsRes.ok ? (await playlistsRes.json())['items'] : [];

	return { offset, user, playlists };
};
