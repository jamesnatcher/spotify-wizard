<script lang="ts">
	import { resolve } from '$app/paths';
	import { PUBLIC_SPOTIFY_CLIENT_ID } from '$env/static/public';
	import type { PageData } from './$types';

	interface Props {
		data: PageData;
	}

	let { data }: Props = $props();

	const authorization_uri = 'https://accounts.spotify.com/authorize?';
	const redirect_uri = $derived(`${data.appURL}/home`);
	const loginLink = $derived.by(() => {
		const params = new URLSearchParams({
			response_type: 'code',
			client_id: PUBLIC_SPOTIFY_CLIENT_ID,
			scope:
				'user-read-private user-read-email user-top-read playlist-modify-public playlist-read-private',
			redirect_uri: redirect_uri,
			state: data.state
		});
		return `${authorization_uri}${params.toString()}`;
	});
</script>

<div class="flex h-screen items-center justify-center bg-black p-5 font-tech-mono text-green-600">
	<div class="grid gap-10">
		<h1 class="text-3xl font-bold">Choose how you would like to connect:</h1>
		<a
			href={loginLink}
			rel="external noopener noreferrer"
			class="group w-1/2 rounded-full border-2 border-green-600 bg-green-600 p-3 text-black transition duration-300"
		>
			&gt;Connect to Spotify
			<span
				class="block h-0.5 w-1/2 max-w-0 bg-black transition-all duration-500 group-hover:max-w-full"
			></span>
		</a>
		<a href={resolve('/home')} class="group transition duration-300">
			&gt;Log in as guest
			<span
				class="block h-0.5 max-w-0 bg-green-600 transition-all duration-500 group-hover:max-w-full"
			></span>
		</a>
	</div>
</div>
