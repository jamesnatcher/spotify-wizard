import type { PageServerLoad } from './$types';
import { accessToken } from '../../stores';
import { get } from 'svelte/store';
import { redirect } from '@sveltejs/kit';
export const load: PageServerLoad = async (event) => {
	const $accessToken = get(accessToken);

	if (!$accessToken){
		throw redirect(301, '/');
	}
	let user;
	const res = await fetch('https://api.spotify.com/v1/me', {
		headers: {
			Authorization: `Bearer ${$accessToken}`
		}
	});

	if (res.ok) {
		user = await res.json();
	} else {
		throw redirect(308, '/');
	}

	return { user };
};
