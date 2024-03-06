<script lang="ts">
	import { PUBLIC_SPOTIFY_CLIENT_ID } from '$env/static/public';

	export let data;

	const authorization_uri = 'https://accounts.spotify.com/authorize?';
	const redirect_uri = data.appURL + '/home';
	let params = new URLSearchParams({
		response_type: 'code',
		client_id: PUBLIC_SPOTIFY_CLIENT_ID,
		scope:
			'user-read-private user-read-email user-top-read playlist-modify-public playlist-read-private',
		redirect_uri: redirect_uri,
		state: data.state
	});
	let loginLink = authorization_uri + params;
</script>

<div class="flex h-screen items-center justify-center bg-black p-5 font-tech-mono text-green-600">
	<div class="grid gap-10">
		<h1 class="text-3xl font-bold">Choose how you would like to connect:</h1>
		<a
			href={loginLink}
			class="group w-1/2 rounded-full border-2 border-green-600 bg-green-600 p-3 text-black transition duration-300"
		>
			&gtConnect to Spotify
			<span
				class="block h-0.5 w-1/2 max-w-0 bg-black transition-all duration-500 group-hover:max-w-full"
			/>
		</a>
		<a href="/home" class="group transition duration-300">
			&gtLog in as guest
			<span
				class="block h-0.5 max-w-0 bg-green-600 transition-all duration-500 group-hover:max-w-full"
			/>
		</a>
	</div>
</div>
