import type { PageServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';
import {
	clearAccessTokenCookie,
	clearOAuthStateCookie,
	exchangeAuthorizationCode,
	fetchUserProfile,
	getAccessTokenFromCookie,
	setAccessTokenCookie
} from '$lib/server/spotify';

export const load: PageServerLoad = async ({ url, cookies }) => {
	const code = url.searchParams.get('code');
	const state = url.searchParams.get('state');
	const isSecure = url.protocol === 'https:';

	if (code !== null || state !== null) {
		const expectedState = cookies.get('spotify_oauth_state');
		clearOAuthStateCookie(cookies);

		if (!code || !state || !expectedState || state !== expectedState) {
			throw redirect(303, '/login');
		}

		try {
			const redirectUri = `${url.origin}/home`;
			const tokenFromSpotify = await exchangeAuthorizationCode(code, redirectUri);
			setAccessTokenCookie(cookies, tokenFromSpotify, isSecure);
		} catch {
			clearAccessTokenCookie(cookies);
			throw redirect(303, '/');
		}

		throw redirect(303, '/home');
	}

	const accessToken = getAccessTokenFromCookie(cookies);
	let user = null;

	if (accessToken) {
		user = await fetchUserProfile(accessToken);
		if (!user) {
			clearAccessTokenCookie(cookies);
		}
	}

	return { user };
};
