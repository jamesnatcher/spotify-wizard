<script lang="ts">
	import Playlist from '$lib/Playlist.svelte';
import PlaylistGrid from '$lib/PlaylistGrid.svelte';
	import { user } from '../../stores';

	const steps = ['Select playlist', 'Settings', 'Result'];

	let first_select = false;

	let selected_step: any = steps[0];

	let selected_playlist: any = null;
	$: {
		if (selected_playlist != null && !first_select) {
			selected_step = steps[1];
			first_select = true;
		}
	}
</script>

{#if $user}
	<div class="max-h-screen flex flex-col gap-4 justify-center items-center p-10">
		<!-- tabs -->

		<h1 class="text-3xl font-bold">Enhance a new playlist</h1>

		<div
			class="grid w-full grid-cols-1 md:grid-cols-2 lg:grid-cols-3 space-x-2 border border-green-600 rounded-xl p-2"
		>
			{#each steps as step, id}
				<div>
					<input
						type="radio"
						name="option"
						id={id.toString()}
						value={step}
						class="peer hidden"
						on:click={() => (selected_step = step)}
						checked={selected_step == step}
						disabled={selected_playlist ? false : true}
					/>
					<label
						for={id.toString()}
						class={`block cursor-pointer select-none rounded-xl p-2 text-center ${
							selected_playlist || selected_step == step ? 'underline' : 'line-through'
						} peer-checked:bg-rose-600 peer-checked:font-bold peer-checked:text-white`}
						>{step}</label
					>
				</div>
			{/each}
		</div>

		{#if selected_step == steps[0]}
			<div class="h-screen w-full overflow-auto border border-green-600 rounded-lg p-2 lg:p-10">
				<PlaylistGrid small={true} bind:selected_playlist />
			</div>
		{:else if selected_step == steps[1]}
			<div class="h-screen w-full overflow-auto border border-green-600 rounded-lg p-10">
				STEP 
				<Playlist selected_playlist={selected_playlist}/>
			</div>
		{:else}
			<div class="h-screen w-full overflow-auto border border-green-600 rounded-lg p-10">
				STEP 3
			</div>
		{/if}
	</div>
{:else}
	No user, please login first
{/if}
