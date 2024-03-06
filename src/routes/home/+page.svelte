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

<div class="flex min-h-screen flex-col items-center">
	<div class="m-5 text-2xl lg:text-5xl">
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
		} mt-8 items-center justify-center gap-2 text-2xl md:mt-16 md:gap-6 lg:text-5xl xl:gap-8`}
	>
		<a
			href="/createPlaylist"
			class="h-64 w-64 rounded-lg border border-green-600 p-5 hover:border-white hover:bg-rose-600 hover:text-white md:h-80 md:w-80 lg:h-96 lg:w-96"
			>Create a playlist by consulting the Wizard</a
		>
		{#if $user}
			<a
				href="/enhancePlaylist"
				class="h-64 w-64 rounded-lg border border-green-600 p-5 hover:border-white hover:bg-rose-600 hover:text-white md:h-80 md:w-80 lg:h-96 lg:w-96"
				>Enhance a playlist by consulting the Wizard</a
			>
		{/if}
		{#if $user}
			<a
				href="/profile"
				class="h-64 w-64 rounded-lg border border-green-600 p-5 hover:border-white hover:bg-rose-600 hover:text-white md:h-80 md:w-80 lg:h-96 lg:w-96"
				>View your playlists</a
			>
		{:else}
			<a
				href="/login"
				class="h-64 w-64 rounded-lg border border-green-600 p-5 hover:border-white hover:bg-rose-600 hover:text-white md:h-80 md:w-80 lg:h-96 lg:w-96"
				>Log in to your account</a
			>
		{/if}
		<a
			href="/openAI"
			class="h-64 w-64 rounded-lg border border-green-600 p-5 hover:border-white hover:bg-rose-600 hover:text-white md:h-80 md:w-80 lg:h-96 lg:w-96"
			>Talk to the wizard</a
		>
	</div>
</div>
