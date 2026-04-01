<script lang="ts">
	export let playlists: any[] = [];
	export let filteredPlaylists: any[] = [];
	export let selectedPlaylist: any = null;
	export let selectedStep: any = null;
	export let small = false;
	export let offset = 0;

	async function clickPlaylist(playlist: any) {
		selectedPlaylist = playlist;
		selectedStep = 'Settings';
	}

	let searchTerm = '';
	$: previousPage = Math.max(0, offset - 1);
	$: nextPage = offset + 1;

	$: filteredPlaylists = playlists.filter((playlist) => {
		if (searchTerm === '') {
			return true;
		}

		return playlist.name.includes(searchTerm);
	});
</script>

<input
	class="my-4 w-full rounded-xl border border-green-600 bg-black pl-5 placeholder-green-600"
	type="text"
	placeholder="Search for a specific playlist..."
	bind:value={searchTerm}
/>
{#if small}
	<!-- class="grid grid-cols-1 gap-2 lg:gap-8 items-start mt-8 md:mt-16 md:grid-cols-2 lg:grid-cols-8" -->
	<a
		href="/enhancePlaylist/{previousPage}"
		class="rounded-xl border-2 border-green-600 bg-green-600 p-2 text-black">Previous page &lt&lt</a
	>
	<a
		href="/enhancePlaylist/{nextPage}"
		class="rounded-xl border-2 border-green-600 bg-green-600 p-2 text-black">Next page &gt&gt</a
	>
{/if}

<div
	class={`mt-8 grid grid-cols-1 items-start gap-2 md:mt-16 md:grid-cols-2 lg:grid-cols-5 lg:gap-8 ${
		small ? '2xl:grid-cols-8' : '2xl:grid-cols-8'
	}`}
>
	{#each filteredPlaylists as playlist}
		{#if playlist.public}
			<div class="flex truncate text-ellipsis border border-green-600 lg:grid">
				<img
					class=" h-28 w-28 object-cover lg:h-56 lg:w-56 xl:h-52 xl:w-52 2xl:h-60 2xl:w-60"
					src={playlist['images'][0]['url']}
					alt="playlist cover"
				/>

				<div class="mx-5 flex flex-col items-start p-6 lg:mx-0">
					<button
						on:click={async () => clickPlaylist(playlist)}
						class="text-ellipsis text-xl font-semibold hover:underline"
					>
						{playlist.name}
					</button>
					<div class="max-w-full truncate text-ellipsis">
						{#if playlist.description}
							<span class="mr-5 text-sm text-gray-500">{playlist.description}</span>
						{:else}
							<span class="pr-5 text-sm italic text-gray-500">No description</span>
						{/if}
					</div>
				</div>
			</div>
		{/if}
	{/each}
</div>
