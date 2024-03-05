<script lang="ts">
	import Playlist from '$lib/Playlist.svelte';
	import PlaylistGrid from '$lib/PlaylistGrid.svelte';

	export let data;

	const user = data.user;
	const playlists = data.playlists['items'];

	const steps = ['Select playlist', 'Settings', 'Result'];

	let first_select = false;

	let selectedStep: any = steps[0];

	let selectedPlaylist: any = null;

	$: {
		if (selectedPlaylist != null && !first_select) {
			console.log('trigger');
			selectedStep = steps[1];
			first_select = true;
		}
	}
</script>

{#if user !== null}
	<div class="max-h-screen flex flex-col gap-4 justify-center items-center p-5 lg:p-10">
		<!-- tabs -->

		<h1 class="text-3xl font-bold">Enhance a new playlist</h1>

		<div class="grid w-full grid-cols-3 space-x-2 border border-green-600 rounded-xl p-2">
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
{:else}
	No user, please login first
{/if}
