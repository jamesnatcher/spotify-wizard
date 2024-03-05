<script lang="ts">
	import { onMount } from 'svelte';
	import { accessToken } from '../stores';
	import { get } from 'svelte/store';

	export let selectedPlaylist: any;

	let songs: any[] = [];

	async function getSongsFromPlaylist(next_url?: string) {
		console.log(selectedPlaylist);
		const res = await fetch(`/api/spotifyAPI/playlist/${selectedPlaylist['id']}`);

		if (res.ok) {
			const data = await res.json();
			songs = data['items'];
		}
	}

	$: console.log(songs);

	onMount(getSongsFromPlaylist);
</script>

<div
	class="bg-green-400 text-black grid lg:flex justify-center border border-green-600 rounded-lg p-2"
>
	<div class="flex gap-4 py-5 px-10">
		<img
			class=" object-cover h-28 w-28 lg:h-56 lg:w-56 xl:h-52 xl:w-52 2xl:h-60 2xl:w-60"
			src={selectedPlaylist['images'][0]['url']}
			alt="playlist cover"
		/>
		<h3 class="text-lg font-bold">{selectedPlaylist.name}</h3>
		<p class="truncate">{selectedPlaylist.description}</p>
	</div>
	<div class="w-1/2 overflow-auto h-52">
		{#each songs as song}
			<div class="flex cursor-pointer my-1 hover:bg-blue-lightest rounded">
				<div class="w-20 h-20 text-center py-1">
					<img src={song['track']['album']['images'][0]['url']} alt="song cover" />
				</div>
				<div class="w-4/5 h-10 py-3 px-2">
					<p class="hover:text-blue-dark">{song['track']['name']}</p>
				</div>
				<div class="w-3/5 h-10 text-right p-3">
					<p class="text-sm text-grey-dark">By {song['track']['artists'][0]['name']}</p>
				</div>
			</div>
		{/each}
	</div>
</div>
