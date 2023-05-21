<script lang="ts">
    import { page } from '$app/stores';

	export let home = false;
</script>

{#if home}
	<!-- content here -->
{:else}
	<nav class="bg-black font-tech-mono text-green-600">
		<div class="flex justify-center items-center">
			<img
				class="rounded-full w-20"
				alt="The project logo"
				src="/images/android-chrome-192x192.png"
			/>
			<h1 class="text-4xl font-bold font-major-mono">Spotify Wizard {$page.url}</h1>
		</div>
	</nav>
{/if}
