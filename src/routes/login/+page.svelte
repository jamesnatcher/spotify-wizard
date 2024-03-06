<script lang="ts">
	import { PUBLIC_SPOTIFY_CLIENT_ID } from '$env/static/public';

	export let data;
	console.log(data);

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

<div class="h-screen p-5 flex items-center justify-center bg-black font-tech-mono text-green-600">
	<div class="grid gap-10">
		<h1 class="text-3xl font-bold">Choose how you would like to connect:</h1>
		<a
			href={loginLink}
			class="group transition duration-300 w-1/2 bg-green-600 border-2 border-green-600 rounded-full p-3 text-black"
		>
			&gtConnect to Spotify
			<span
				class="block max-w-0 w-1/2 group-hover:max-w-full transition-all duration-500 h-0.5 bg-black"
			/>
		</a>
		<a href="/home" class="group transition duration-300">
			&gtLog in as guest
			<span
				class="block max-w-0 group-hover:max-w-full transition-all duration-500 h-0.5 bg-green-600"
			/>
		</a>
	</div>
</div>
