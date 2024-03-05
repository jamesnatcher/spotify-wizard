<script lang="ts">
	import { onMount } from 'svelte';
	import { user, token, tokenExpired } from '../stores';

	export let selectedPlaylists: any;
	console.log(selectedPlaylists);

	let songs: any[] = [];

	async function getSongsFromPlaylist(next_url?: string) {
		const current_user: any = $user;
		const access_token = $token;

		if (!current_user) {
			return;
		}

		let url;

		if (next_url) {
			url = next_url;
		} else {
			url = selectedPlaylists['tracks'].href + '?';
			const params = new URLSearchParams();
			params.append('market', 'ES');
			params.append('limit', '50');
			params.append('offset', '0');

			url += params;
		}

		console.log(url);
		console.log(access_token);

		if (access_token) {
			const res = await fetch(url, {
				method: 'GET',
				headers: {
					Authorization: 'Bearer ' + access_token
				}
			});

			if (res.ok) {
				const data = await res.json();

				songs = songs.concat(data.items);

				if (data.next) {
					getSongsFromPlaylist(data.next);
				}
			} else {
				tokenExpired.set(true);
			}
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
			src={selectedPlaylists['images'][0]['url']}
			alt="playlist cover"
		/>
		<h3 class="text-lg font-bold">{selectedPlaylists.name}</h3>
		<p class="truncate">{selectedPlaylists.description}</p>
	</div>
	<div class="w-1/2 overflow-auto h-52">
		{#each songs as song}
			<div class="flex cursor-pointer my-1 hover:bg-blue-lightest rounded">
				<div class="w-8 h-10 text-center py-1">
					<p class="text-3xl p-0 text-green-dark">&bull;</p>
				</div>
				<div class="w-4/5 h-10 py-3 px-1">
					<p class="hover:text-blue-dark">Kevin Durant</p>
				</div>
				<div class="w-1/5 h-10 text-right p-3">
					<p class="text-sm text-grey-dark">Member</p>
				</div>
			</div>
		{/each}
	</div>
</div>
