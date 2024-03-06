<script lang="ts">
	import { playlistPageOffset } from '../stores';
	export let playlists: any[] = [];
	export let filteredPlaylists: any[] = [];
	export let selectedPlaylist: any = null;
	export let selectedStep: any = null;
	export let small = false;

	async function clickPlaylist(playlist: any) {
		selectedPlaylist = playlist;
		selectedStep = 'Settings';
	}

	let searchTerm = '';
	let previousPage = $playlistPageOffset - 1;
	let nextPage = $playlistPageOffset + 1;
	console.log(previousPage, nextPage);

	console.log(playlists);
	$: filteredPlaylists = playlists.filter((playlist) => {
		if (searchTerm == '') {
			return true;
		}

		return playlist.name.includes(searchTerm);
	});
</script>

<input
	class="w-full border border-green-600 rounded-xl pl-5 my-4 bg-black placeholder-green-600"
	type="text"
	placeholder="Search for a specific playlist..."
	bind:value={searchTerm}
/>
<!-- class="grid grid-cols-1 gap-2 lg:gap-8 items-start mt-8 md:mt-16 md:grid-cols-2 lg:grid-cols-8" -->
<a
	href="/enhancePlaylist/{previousPage}"
	class="bg-green-600 border-2 border-green-600 rounded-xl p-2 text-black">Previous page &lt&lt</a
>
<a
	href="/enhancePlaylist/{nextPage}"
	class="bg-green-600 border-2 border-green-600 rounded-xl p-2 text-black">Next page &gt&gt</a
>

<div
	class={`grid grid-cols-1 gap-2 lg:gap-8 items-start mt-8 md:mt-16 md:grid-cols-2 lg:grid-cols-5 ${
		small ? '2xl:grid-cols-8' : '2xl:grid-cols-8'
	}`}
>
	{#each filteredPlaylists as playlist}
		{#if playlist.public}
			<div class="flex lg:grid border border-green-600 truncate text-ellipsis">
				<img
					class=" object-cover h-28 w-28 lg:h-56 lg:w-56 xl:h-52 xl:w-52 2xl:h-60 2xl:w-60"
					src={playlist['images'][0]['url']}
					alt="playlist cover"
				/>

				<div class="flex flex-col items-start p-6 mx-5 lg:mx-0">
					<button
						on:click={async () => clickPlaylist(playlist)}
						class="text-xl font-semibold hover:underline text-ellipsis"
					>
						{playlist.name}
					</button>
					<div class="max-w-full truncate text-ellipsis">
						{#if playlist.description}
							<span class="text-sm text-gray-500 mr-5">{playlist.description}</span>
						{:else}
							<span class="text-sm italic text-gray-500 pr-5">No description</span>
						{/if}
					</div>
				</div>
			</div>
		{/if}
	{/each}
</div>
