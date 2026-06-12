import { redirect } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { clearAccessTokenCookie, clearOAuthStateCookie } from '$lib/server/spotify';

export const POST: RequestHandler = async ({ cookies }) => {
	clearAccessTokenCookie(cookies);
	clearOAuthStateCookie(cookies);
	throw redirect(303, '/');
};
