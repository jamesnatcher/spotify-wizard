<script lang="ts">
	import type { SpotifyPaginatedPlaylistTracks, SpotifyPlaylist } from '$lib/types/spotify';

	interface Props {
		selectedPlaylist: SpotifyPlaylist;
	}

	let { selectedPlaylist }: Props = $props();

	let songs = $state<SpotifyPaginatedPlaylistTracks['items']>([]);

	$effect(() => {
		const playlistId = selectedPlaylist.id;

		void (async () => {
			const res = await fetch(`/api/playlist/${playlistId}/tracks`);
			if (res.ok) {
				const data = (await res.json()) as SpotifyPaginatedPlaylistTracks;
				songs = data.items ?? [];
			}
		})();
	});
</script>

<div
	class="grid justify-center rounded-lg border border-green-600 bg-green-400 p-2 text-black lg:flex"
>
	<div class="flex gap-4 px-10 py-5">
		{#if selectedPlaylist.images[0]?.url}
			<img
				class=" h-28 w-28 object-cover lg:h-56 lg:w-56 xl:h-52 xl:w-52 2xl:h-60 2xl:w-60"
				src={selectedPlaylist.images[0].url}
				alt="playlist cover"
			/>
		{/if}
		<h3 class="text-lg font-bold">{selectedPlaylist.name}</h3>
		<p class="truncate">{selectedPlaylist.description}</p>
	</div>
	<div class="h-52 w-1/2 overflow-auto">
		{#each songs as song, index (song.track?.id ?? index)}
			{#if song.track}
				<div class="hover:bg-blue-lightest my-1 flex cursor-pointer rounded">
					<div class="h-20 w-20 py-1 text-center">
						{#if song.track.album.images[0]?.url}
							<img src={song.track.album.images[0].url} alt="song cover" />
						{/if}
					</div>
					<div class="h-10 w-4/5 px-2 py-3">
						<p class="hover:text-blue-dark">{song.track.name}</p>
					</div>
					<div class="h-10 w-3/5 p-3 text-right">
						<p class="text-grey-dark text-sm">
							By {song.track.artists[0]?.name ?? 'Unknown artist'}
						</p>
					</div>
				</div>
			{/if}
		{/each}
	</div>
</div>
