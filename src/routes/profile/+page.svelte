<script lang="ts">
	import PlaylistGrid from '$lib/PlaylistGrid.svelte';

	export let data;

	const user = data.user;
	const playlists = data.playlists['items'];
</script>

<div>
	{#if user}
		<div class="m-10 flex items-center gap-10">
			<img src={user['images'][0]['url']} alt="user" class="h-20 w-20 rounded-full" />
			<h1 class="text-3xl font-bold">{user['display_name']}'s playlists</h1>
		</div>
		<div class="m-auto bg-black p-6">
			<PlaylistGrid {playlists} />
		</div>
	{/if}
</div>
