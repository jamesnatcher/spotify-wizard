import { redirect } from '@sveltejs/kit';
import type { Cookies } from '@sveltejs/kit';
import { PRIVATE_SPOTIFY_CLIENT_ID, PRIVATE_SPOTIFY_CLIENT_SECRET } from '$env/static/private';
import type {
	SpotifyPaginatedPlaylists,
	SpotifyPlaylist,
	SpotifyUserProfile
} from '$lib/types/spotify';

export const SPOTIFY_ACCESS_TOKEN_COOKIE = 'spotify_access_token';
export const SPOTIFY_OAUTH_STATE_COOKIE = 'spotify_oauth_state';

const PLAYLIST_PAGE_SIZE = 50;

function cookieOptions(secure: boolean) {
	return {
		path: '/',
		httpOnly: true,
		sameSite: 'lax' as const,
		secure
	};
}

export function setOAuthStateCookie(cookies: Cookies, state: string, secure: boolean) {
	cookies.set(SPOTIFY_OAUTH_STATE_COOKIE, state, {
		...cookieOptions(secure),
		maxAge: 60 * 10
	});
}

export function setAccessTokenCookie(cookies: Cookies, accessToken: string, secure: boolean) {
	cookies.set(SPOTIFY_ACCESS_TOKEN_COOKIE, accessToken, {
		...cookieOptions(secure),
		maxAge: 60 * 60
	});
}

export function clearAccessTokenCookie(cookies: Cookies) {
	cookies.delete(SPOTIFY_ACCESS_TOKEN_COOKIE, { path: '/' });
}

export function clearOAuthStateCookie(cookies: Cookies) {
	cookies.delete(SPOTIFY_OAUTH_STATE_COOKIE, { path: '/' });
}

export function getAccessTokenFromCookie(cookies: Cookies): string | undefined {
	return cookies.get(SPOTIFY_ACCESS_TOKEN_COOKIE);
}

export function requireAccessToken(cookies: Cookies): string {
	const accessToken = getAccessTokenFromCookie(cookies);
	if (!accessToken) {
		throw redirect(303, '/login');
	}
	return accessToken;
}

export function parsePageOffset(rawOffset: string | undefined): number {
	const offset = Number(rawOffset);
	if (Number.isNaN(offset) || offset < 0) {
		return 0;
	}
	return offset;
}

export async function exchangeAuthorizationCode(
	code: string,
	redirectUri: string
): Promise<string> {
	const params = new URLSearchParams();
	const credentials = globalThis.btoa(
		`${PRIVATE_SPOTIFY_CLIENT_ID}:${PRIVATE_SPOTIFY_CLIENT_SECRET}`
	);

	params.append('grant_type', 'authorization_code');
	params.append('code', code);
	params.append('redirect_uri', redirectUri);
	params.append('client_secret', PRIVATE_SPOTIFY_CLIENT_SECRET);
	params.append('client_id', PRIVATE_SPOTIFY_CLIENT_ID);

	const res = await fetch('https://accounts.spotify.com/api/token', {
		method: 'POST',
		headers: {
			Authorization: `Basic ${credentials}`,
			'Content-Type': 'application/x-www-form-urlencoded'
		},
		body: params
	});

	if (!res.ok) {
		throw new Error('Failed to exchange authorization code');
	}

	const data = (await res.json()) as { access_token?: string };
	if (!data.access_token) {
		throw new Error('Spotify token response missing access_token');
	}

	return data.access_token;
}

export async function fetchCurrentUser(accessToken: string): Promise<Response> {
	return fetch('https://api.spotify.com/v1/me', {
		headers: { Authorization: `Bearer ${accessToken}` }
	});
}

export async function fetchUserProfile(accessToken: string): Promise<SpotifyUserProfile | null> {
	const res = await fetchCurrentUser(accessToken);
	if (!res.ok) {
		return null;
	}
	return (await res.json()) as SpotifyUserProfile;
}

export async function fetchUserPlaylists(
	accessToken: string,
	userId: string,
	pageOffset: number
): Promise<SpotifyPlaylist[]> {
	const url = new URL(`https://api.spotify.com/v1/users/${userId}/playlists`);
	url.searchParams.set('limit', String(PLAYLIST_PAGE_SIZE));
	url.searchParams.set('offset', String(pageOffset * PLAYLIST_PAGE_SIZE));

	const res = await fetch(url, {
		headers: { Authorization: `Bearer ${accessToken}` }
	});

	if (!res.ok) {
		return [];
	}

	const data = (await res.json()) as SpotifyPaginatedPlaylists;
	return data.items ?? [];
}

export async function requireAuthenticatedUser(
	cookies: Cookies
): Promise<{ accessToken: string; user: SpotifyUserProfile }> {
	const accessToken = requireAccessToken(cookies);
	const res = await fetchCurrentUser(accessToken);

	if (!res.ok) {
		clearAccessTokenCookie(cookies);
		throw redirect(303, '/login');
	}

	const user = (await res.json()) as SpotifyUserProfile;
	return { accessToken, user };
}
