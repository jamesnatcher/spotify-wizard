<script lang="ts">
	import { page } from '$app/stores';
	import { redirect_uri, redirect_wrote } from '../stores';

	$: home = $page.url.pathname == '/' || $page.url.pathname == '/login';
</script>

{#if home}
		<a href="/home" class="absolute mx-auto lg:mt-20 left-0 right-0 text-center flex justify-center items-center">
			<img
				class="h-40 w-40 m-2 lg:h-24 lg:w-24"
				alt="The project logo"
				src="/images/android-chrome-512x512.png"
			/>
			<h1 class="lg:text-8xl text-4xl m-2 font-bold font-major-mono">Spotify Wizard</h1>
		</a>
{:else}
		<a href="/home" class="flex justify-center items-center lg:mb-10">
			<img
				class="rounded-full w-20"
				alt="The project logo"
				src="/images/android-chrome-192x192.png"
			/>
			<h1 class="text-4xl font-bold font-major-mono">Spotify Wizard</h1>
		</a>
{/if}
