<script lang="ts">
	import { onMount } from 'svelte';
	import { accessToken } from '../stores';
	import { get } from 'svelte/store';

	export let selectedPlaylist: any;

	let songs: any[] = [];

	async function getSongsFromPlaylist(next_url?: string) {
		let url = `https://api.spotify.com/v1/playlists/${selectedPlaylist['id']}/tracks?`;

		const urlParams = new URLSearchParams();
		urlParams.append('market', 'ES');
		url += urlParams;

		if ($accessToken) {
			const res = await fetch(url, {
				method: 'GET',
				headers: {
					Authorization: 'Bearer ' + $accessToken
				}
			});
			if (res.ok) {
				const data = await res.json();
				songs = data['items'];
			}
		}
	}

	onMount(getSongsFromPlaylist);
</script>

<div
	class="grid justify-center rounded-lg border border-green-600 bg-green-400 p-2 text-black lg:flex"
>
	<div class="flex gap-4 px-10 py-5">
		<img
			class=" h-28 w-28 object-cover lg:h-56 lg:w-56 xl:h-52 xl:w-52 2xl:h-60 2xl:w-60"
			src={selectedPlaylist['images'][0]['url']}
			alt="playlist cover"
		/>
		<h3 class="text-lg font-bold">{selectedPlaylist.name}</h3>
		<p class="truncate">{selectedPlaylist.description}</p>
	</div>
	<div class="h-52 w-1/2 overflow-auto">
		{#each songs as song}
			<div class="hover:bg-blue-lightest my-1 flex cursor-pointer rounded">
				<div class="h-20 w-20 py-1 text-center">
					<img src={song['track']['album']['images'][0]['url']} alt="song cover" />
				</div>
				<div class="h-10 w-4/5 px-2 py-3">
					<p class="hover:text-blue-dark">{song['track']['name']}</p>
				</div>
				<div class="h-10 w-3/5 p-3 text-right">
					<p class="text-grey-dark text-sm">By {song['track']['artists'][0]['name']}</p>
				</div>
			</div>
		{/each}
	</div>
</div>
