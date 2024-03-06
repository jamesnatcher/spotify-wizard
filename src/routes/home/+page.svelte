<script lang="ts">
	import { accessToken, user } from '../../stores.js';
	import { onMount } from 'svelte';
	export let data;

	if (!$accessToken) {
		accessToken.set(data.access_token);
	}

	onMount(async () => {
		if ($accessToken) {
			const res = await fetch('https://api.spotify.com/v1/me', {
				headers: {
					Authorization: `Bearer ${$accessToken}`
				}
			});

			if (res.ok) {
				const data = await res.json();
				user.set(data);
			}
		}
		window.history.pushState('object or string', 'Title', '/home');
	});
</script>

<div class="min-h-screen flex flex-col items-center">
	<div class="text-2xl lg:text-5xl m-5">
		{#if $user === null}
			<p>Welcome visitor, click on what you would like to do!</p>
		{:else}
			<p>
				Welcome {$user['display_name']}, click on what you would like to do!
			</p>
		{/if}
	</div>
	<div
		class={`grid ${
			$user
				? 'grid-cols-1 md:grid-cols-2 2xl:grid-cols-4'
				: 'grid-cols-1 md:grid-cols-2 2xl:grid-cols-3'
		} gap-2 md:gap-6 xl:gap-8 justify-center items-center mt-8 md:mt-16 text-2xl lg:text-5xl`}
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
