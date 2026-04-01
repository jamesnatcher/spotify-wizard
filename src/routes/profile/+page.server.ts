import type { PageServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ cookies }) => {
	const accessToken = cookies.get('spotify_access_token');
	if (!accessToken) {
		throw redirect(303, '/login');
	}

	let user, playlists;
	const res = await fetch('https://api.spotify.com/v1/me', {
		headers: {
			Authorization: `Bearer ${accessToken}`
		}
	});

	if (res.ok) {
		user = await res.json();

		let playlistsURL = `https://api.spotify.com/v1/users/${user['id']}/playlists?`;
		const params = new URLSearchParams();
		params.append('limit', '50');
		params.append('offset', '0');
		playlistsURL += params;

		const playlistsRes = await fetch(playlistsURL, {
			method: 'GET',
			headers: {
				Authorization: `Bearer ${accessToken}`
			}
		});

		if (playlistsRes.ok) {
			const data = await playlistsRes.json();
			playlists = data;
		}
	} else {
		cookies.delete('spotify_access_token', { path: '/' });
		throw redirect(303, '/login');
	}

	return { user, playlists };
};
