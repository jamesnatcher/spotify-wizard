<script lang="ts">
	import {
		user,
		token,
		code,
		tokenExpired,
		client_id,
		redirect_uri,
	} from '../../stores';
	import { PUBLIC_APP_URL, PUBLIC_SPOTIFY_CLIENT_SECRET } from '$env/static/public';
	import { onMount } from 'svelte';

	async function getUserData() {
		const access_token = $token;
		if (access_token) {
			const res = await fetch('https://api.spotify.com/v1/me', {
				headers: {
					Authorization: 'Bearer ' + access_token
				}
			});
			if (res.ok) {
				const data = await res.json();
				user.set(data);
			} else {
				tokenExpired.set(true);
			}
		}
	}

	async function getAccessToken() {
		const header_string = btoa($client_id + ':' + PUBLIC_SPOTIFY_CLIENT_SECRET);

		const params = new URLSearchParams();
		params.append('client_id', $client_id);
		params.append('grant_type', 'authorization_code');
		params.append('code', $code);
		params.append('redirect_uri', $redirect_uri);
		console.log($code);
		console.log($redirect_uri);

		if ($code.length > 0) {
			const res = await fetch('https://accounts.spotify.com/api/token', {
				method: 'POST',
				headers: {
					Authorization: 'Basic ' + header_string
				},
				body: params
			});
			if (res.ok) {
				const data = await res.json();
				token.set(data.access_token);
			} else {
				tokenExpired.set(true);
			}
		}
	}

	async function credentials() {
		console.log('App url', PUBLIC_APP_URL);
		console.log('App url', $redirect_uri);

		if ($code.length > 0) {
			await getAccessToken();
			await getUserData();
		}
	}

	onMount(credentials);
</script>

<div class="min-h-screen flex flex-col items-center">
	<div class="text-2xl lg:text-5xl m-5">
		{#if $user}
			<p>
				Welcome {$user['display_name']}, click on what you would like to do!
			</p>
		{:else}
			<p>Welcome visitor, click on what you would like to do!</p>
		{/if}
	</div>
	<div
		class="grid grid-cols-1 gap-2 md:gap-6 xl:gap-8 justify-center items-center mt-8 md:mt-16 md:grid-cols-2 2xl:grid-cols-4 text-2xl lg:text-5xl"
	>
		<a
			href="/createPlaylist"
			class="border border-green-600 hover:border-white rounded-lg h-64 w-64 md:h-80 md:w-80 lg:h-96 lg:w-96 hover:bg-rose-600 p-5 hover:text-white"
			>Create a playlist by consulting the Wizard</a
		>
		{#if $user}
			<a
				href="/enhancePlaylist"
				class="border border-green-600 hover:border-white rounded-lg h-64 w-64 md:h-80 md:w-80 lg:h-96 lg:w-96 hover:bg-rose-600 p-5 hover:text-white"
				>Enhance a playlist by consulting the Wizard</a
			>
		{/if}
		{#if $user}
			<a
				href="/profile"
				class="border border-green-600 hover:border-white rounded-lg h-64 w-64 md:h-80 md:w-80 lg:h-96 lg:w-96 hover:bg-rose-600 p-5 hover:text-white"
				>View your playlists</a
			>
		{:else}
			<a
				href="/login"
				class="border border-green-600 hover:border-white rounded-lg h-64 w-64 md:h-80 md:w-80 lg:h-96 lg:w-96 hover:bg-rose-600 p-5 hover:text-white"
				>Log in to your account</a
			>
		{/if}
		<a
			href="/openAI"
			class="border border-green-600 hover:border-white rounded-lg h-64 w-64 md:h-80 md:w-80 lg:h-96 lg:w-96 hover:bg-rose-600 p-5 hover:text-white"
			>Talk to the wizard</a
		>
	</div>
</div>
