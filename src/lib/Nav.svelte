<script lang="ts">
	import { page } from '$app/stores';

	$: home = $page.url.pathname == '/' || $page.url.pathname == '/login';
</script>

{#if home}
	<a
		href="/home"
		class="absolute left-0 right-0 mx-auto flex items-center justify-center text-center lg:mt-20"
	>
		<img
			class="m-2 h-40 w-40 lg:h-24 lg:w-24"
			alt="The project logo"
			src="/images/android-chrome-512x512.png"
		/>
		<h1 class="m-2 font-major-mono text-4xl font-bold lg:text-8xl">Spotify Wizard</h1>
	</a>
{:else}
	<a href="/home" class="flex items-center justify-center lg:mb-10">
		<img
			class="w-20 rounded-full"
			alt="The project logo"
			src="/images/android-chrome-192x192.png"
		/>
		<h1 class="font-major-mono text-4xl font-bold">Spotify Wizard</h1>
	</a>
{/if}
