import { redirect } from '@sveltejs/kit';
import { accessToken, refreshToken, tokenExpired } from '../../../../stores';
import {
	PUBLIC_SPOTIFY_CLIENT_SECRET,
	PUBLIC_SPOTIFY_CLIENT_ID,
	PUBLIC_APP_URL
} from '$env/static/public';

export const GET = async (event: { url: any }) => {
	throw redirect(303, '/');
};
