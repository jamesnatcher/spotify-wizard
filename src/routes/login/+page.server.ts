import type { PageServerLoad } from './$types';

function generateRandomString(length: number) {
	let text = '';
	const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

	for (let i = 0; i < length; i++) {
		text += possible.charAt(Math.floor(Math.random() * possible.length));
	}
	return text;
}

export const load: PageServerLoad = async ({ url, cookies }) => {
	const state = generateRandomString(16);
	const isSecure = url.protocol === 'https:';

	// Persist OAuth state so callback can validate against CSRF.
	// Keep maxAge short because this value is one-time use.
	cookies.set('spotify_oauth_state', state, {
		path: '/',
		httpOnly: true,
		sameSite: 'lax',
		secure: isSecure,
		maxAge: 60 * 10
	});

	return { appURL: url.origin, state: state };
};
