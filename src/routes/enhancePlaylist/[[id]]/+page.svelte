<script lang="ts">
	import { run } from 'svelte/legacy';

	import Playlist from '$lib/Playlist.svelte';
	import PlaylistGrid from '$lib/PlaylistGrid.svelte';
	import type { PageData } from './$types';
	import type { SpotifyPlaylist } from '$lib/types/spotify';

	interface Props {
		data: PageData;
	}

	let { data }: Props = $props();
	const user = $derived(data.user);
	const playlists = $derived(data.playlists);

	const steps = ['Select playlist', 'Settings', 'Result'];

	let first_select = $state(false);
	let selectedStep = $state(steps[0]);
	let selectedPlaylist = $state<SpotifyPlaylist | null>(null);

	run(() => {
		if (selectedPlaylist !== null && !first_select) {
			selectedStep = steps[1];
			first_select = true;
		}
	});
</script>

{#if user !== null && playlists !== null}
	<div class="flex max-h-screen flex-col items-center justify-center gap-4 p-5 lg:p-10">
		<h1 class="text-3xl font-bold">Enhance a new playlist</h1>

		<div class="grid w-full grid-cols-3 space-x-2 rounded-xl border border-green-600 p-2">
			{#each steps as step, id (step)}
				<div>
					<input
						type="radio"
						name="option"
						id={id.toString()}
						value={step}
						class="peer hidden"
						onclick={() => (selectedStep = step)}
						checked={selectedStep === step}
						disabled={!selectedPlaylist}
					/>
					<label
						for={id.toString()}
						class={`block cursor-pointer select-none rounded-xl p-2 text-center ${
							selectedPlaylist || selectedStep === step ? 'underline' : 'line-through'
						} peer-checked:bg-rose-600 peer-checked:font-bold peer-checked:text-white`}
						>{step}</label
					>
				</div>
			{/each}
		</div>

		<div class="h-screen w-full overflow-auto p-2 lg:p-10">
			{#if selectedStep === steps[0]}
				<PlaylistGrid
					{playlists}
					{selectedStep}
					offset={data.offset}
					small={true}
					bind:selectedPlaylist
				/>
			{:else if selectedStep === steps[1] && selectedPlaylist}
				<Playlist {selectedPlaylist} />
			{:else}
				STEP 3
			{/if}
		</div>
	</div>
{/if}
