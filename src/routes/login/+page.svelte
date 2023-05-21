<script lang="ts">
	import Nav from '$lib/Nav.svelte';
	import { redirect_uri, client_id } from '../../stores';

	function generateRandomString(length: number) {
		let text = '';
		let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

		for (let i = 0; i < length; i++) {
			text += possible.charAt(Math.floor(Math.random() * possible.length));
		}
		return text;
	}

	let state = generateRandomString(16);
	let scope = 'user-read-private user-read-email user-top-read playlist-modify-public';
	let authorization_uri = 'https://accounts.spotify.com/authorize?';

	$: params = new URLSearchParams({
		response_type: 'code',
		client_id: $client_id,
		scope,
		redirect_uri: $redirect_uri,
		state
	});
	$: loginLink = authorization_uri + params;
</script>

<div class="h-screen flex items-center justify-center bg-black font-tech-mono text-green-600">
	<div class="grid gap-10">
		<h1 class="text-3xl font-bold underline">Choose how you would like to connect!</h1>
		<a href={loginLink} class="group transition duration-300">
			<button class="bg-green-600 border-2 border-green-600 rounded-full p-3 text-black">
				>Connect to Spotify
				<span
					class="block max-w-0 group-hover:max-w-full transition-all duration-500 h-0.5 bg-black"
				/>
			</button>
		</a>
		<a href="/" class="group transition duration-300">
			<button>
				>Log in as guest
				<span
					class="block max-w-0 group-hover:max-w-full transition-all duration-500 h-0.5 bg-green-600"
				/>
			</button>
		</a>
		<a href="/" class="text-lg group transition duration-300">
			<button> >I changes my mind, take me back </button>
			<span
				class="block max-w-0 group-hover:max-w-full transition-all duration-500 h-0.5 bg-green-600"
			/>
		</a>
	</div>
</div>
