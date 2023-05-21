<script lang="ts">
	import { page } from '$app/stores';
	import { redirect_uri, redirect_wrote } from '../stores';

	$: home = ($page.url.pathname == '/');

</script>

<nav class="bg-black font-tech-mono text-green-600">
	{#if home}
		<div class="flex justify-center items-center pt-28">
			<img alt="The project logo" src="/images/android-chrome-192x192.png" />
			<h1 class="text-8xl font-bold font-major-mono">Spotify Wizard</h1>
		</div>
	{:else}
		<div class="grid justify-center items-center">
			<img
				class="rounded-full w-20"
				alt="The project logo"
				src="/images/android-chrome-192x192.png"
			/>
			<h1 class="text-4xl font-bold font-major-mono">Spotify Wizard</h1>
		</div>
	{/if}
</nav>
