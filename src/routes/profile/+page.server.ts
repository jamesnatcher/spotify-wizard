import type { PageServerLoad } from './$types';
import { accessToken, playlistPageOffset } from '../../stores';
import { get } from 'svelte/store';
import { redirect, type Actions } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ params }) => {
	const $accessToken = get(accessToken);
	const $playlistPageOffset = get(playlistPageOffset);
	let user, playlists;
	const res = await fetch('https://api.spotify.com/v1/me', {
		headers: {
			Authorization: `Bearer ${$accessToken}`
		}
	});

	if (res.ok) {
		user = await res.json();

		let playlistsURL = `https://api.spotify.com/v1/users/${user['id']}/playlists?`;
		const params = new URLSearchParams();
		params.append('limit', '50');
		params.append('offset', ($playlistPageOffset * 50).toString());
		playlistsURL += params;

		const playlistsRes = await fetch(playlistsURL, {
			method: 'GET',
			headers: {
				Authorization: `Bearer ${$accessToken}`
			}
		});

		if (playlistsRes.ok) {
			const data = await playlistsRes.json();
			playlists = data;
		}
	} else {
		throw redirect(308, '/');
	}

	return { user, playlists };
};

export const actions = {
	nextPage: async (event) => {
		let $playlistPageOffset = get(playlistPageOffset);
		playlistPageOffset.set($playlistPageOffset + 1);
		throw redirect(301, '/enhancePlaylist');
	},
	previousPage: async (event) => {
		let $playlistPageOffset = get(playlistPageOffset);
		playlistPageOffset.set($playlistPageOffset - 1);
		throw redirect(301, '/enhancePlaylist');
	}
} satisfies Actions;
