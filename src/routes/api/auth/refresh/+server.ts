import { redirect } from '@sveltejs/kit';
import { accessToken, refreshToken, tokenExpired } from '../../../../stores';
import { PUBLIC_APP_URL } from '$env/static/public';
import { PRIVATE_SPOTIFY_CLIENT_ID, PRIVATE_SPOTIFY_CLIENT_SECRET } from '$env/static/private';
export const GET = async (event: { url: any }) => {
	throw redirect(303, '/');
};
