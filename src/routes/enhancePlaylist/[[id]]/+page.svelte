<script lang="ts">
	import Playlist from '$lib/Playlist.svelte';
	import PlaylistGrid from '$lib/PlaylistGrid.svelte';
	import { onMount } from 'svelte';
	import { accessToken, playlistPageOffset } from '../../../stores.js';

	export let data;

	if (Number.isNaN(data.offset)) {
		playlistPageOffset.set(0);
	} else {
		playlistPageOffset.set(data.offset);
	}

	let user: any | null = null;
	let playlists: any | null = null;

	const steps = ['Select playlist', 'Settings', 'Result'];

	let first_select = false;

	let selectedStep: any = steps[0];

	let selectedPlaylist: any = null;

	$: {
		if (selectedPlaylist != null && !first_select) {
			selectedStep = steps[1];
			first_select = true;
		}
	}

	async function getPlaylists(offset: number, userID: any) {
		let playlistsURL = `https://api.spotify.com/v1/users/${userID}/playlists?`;

		const params = new URLSearchParams();
		params.append('limit', '50');
		params.append('offset', (offset * 50).toString());
		playlistsURL += params;

		const playlistsRes = await fetch(playlistsURL, {
			method: 'GET',
			headers: {
				Authorization: `Bearer ${$accessToken}`
			}
		});
		if (playlistsRes.ok) {
			const data = await playlistsRes.json();
			playlists = data['items'];
		}
	}

	onMount(async () => {
		const res = await fetch('https://api.spotify.com/v1/me', {
			headers: {
				Authorization: `Bearer ${$accessToken}`
			}
		});

		if (res.ok) {
			user = await res.json();

			await getPlaylists($playlistPageOffset, user['id']);
		}
	});
</script>

{#if user !== null && playlists !== null}
	<div class="flex max-h-screen flex-col items-center justify-center gap-4 p-5 lg:p-10">
		<!-- tabs -->

		<h1 class="text-3xl font-bold">Enhance a new playlist</h1>

		<div class="grid w-full grid-cols-3 space-x-2 rounded-xl border border-green-600 p-2">
			{#each steps as step, id}
				<div>
					<input
						type="radio"
						name="option"
						id={id.toString()}
						value={step}
						class="peer hidden"
						on:click={() => (selectedStep = step)}
						checked={selectedStep == step}
						disabled={selectedPlaylist ? false : true}
					/>
					<label
						for={id.toString()}
						class={`block cursor-pointer select-none rounded-xl p-2 text-center ${
							selectedPlaylist || selectedStep == step ? 'underline' : 'line-through'
						} peer-checked:bg-rose-600 peer-checked:font-bold peer-checked:text-white`}
						>{step}</label
					>
				</div>
			{/each}
		</div>

		<div class={`h-screen w-full overflow-auto p-2 lg:p-10`}>
			{#if selectedStep == steps[0]}
				<PlaylistGrid {playlists} {selectedStep} small={true} bind:selectedPlaylist />
			{:else if selectedStep == steps[1]}
				<Playlist {selectedPlaylist} />
			{:else}
				STEP 3
			{/if}
		</div>
	</div>
{/if}
