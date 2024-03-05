<script lang="ts">
	import PlaylistGrid from '$lib/PlaylistGrid.svelte';

	export let data;

	const user = data.user;
	const playlists = data.playlists['items'];
</script>

<div>
	{#if user}
		<div class="flex items-center gap-10 m-10">
			<img src={user['images'][0]['url']} alt="user" class="rounded-full w-20 h-20" />
			<h1 class="text-3xl font-bold">{user['display_name']}'s playlists</h1>
		</div>
		<div class="p-6 m-auto bg-black">
			<PlaylistGrid {playlists} />
		</div>
	{/if}
</div>
