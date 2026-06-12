import type { PageServerLoad } from './$types';
import { fetchUserPlaylists, parsePageOffset, requireAuthenticatedUser } from '$lib/server/spotify';

export const load: PageServerLoad = async ({ params, cookies }) => {
	const pageOffset = parsePageOffset(params.page);
	const { accessToken, user } = await requireAuthenticatedUser(cookies);
	const playlists = await fetchUserPlaylists(accessToken, user.id, pageOffset);

	return { offset: pageOffset, user, playlists };
};
