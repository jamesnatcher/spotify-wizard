<script lang="ts">
	import PlaylistGrid from '$lib/PlaylistGrid.svelte';
	import type { PageData } from './$types';

	interface Props {
		data: PageData;
	}

	let { data }: Props = $props();

	const user = $derived(data.user);
	const playlists = $derived(data.playlists);
</script>

<div>
	{#if user}
		<div class="m-10 flex items-center gap-10">
			{#if user.images[0]?.url}
				<img src={user.images[0].url} alt="user" class="h-20 w-20 rounded-full" />
			{/if}
			<h1 class="text-3xl font-bold">{user.display_name}'s playlists</h1>
		</div>
		<div class="m-auto bg-black p-6">
			<PlaylistGrid {playlists} offset={data.offset} paginationBasePath="/profile" />
		</div>
	{/if}
</div>
