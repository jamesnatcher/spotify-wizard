<script lang="ts">
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import { user, token, tokenExpired, playlist_page_target } from '../stores';

	let playlists: any[] = [];
	export let selected_playlist: any = null;

	export let small = false;

	async function getPlaylists(next_url?: string) {
		const current_user: any = $user;
		const access_token = $token;

		if (!$user) {
			return;
		}

		let url;

		if (next_url) {
			url = next_url;
		} else {
			url = `https://api.spotify.com/v1/users/${current_user.id}/playlists?`;

			const params = new URLSearchParams();
			params.append('limit', '50');
			params.append('offset', '0');

			url += params;
		}

		if (access_token) {
			const res = await fetch(url, {
				method: 'GET',
				headers: {
					Authorization: 'Bearer ' + access_token
				}
			});

			if (res.ok) {
				const data = await res.json();

				playlists = playlists.concat(data.items);

				if (data.next) {
					getPlaylists(data.next);
				}
			} else {
				tokenExpired.set(true);
			}
		}
	}

	async function clickPlaylist(playlist: any) {
		selected_playlist = playlist;
		console.log($playlist_page_target);
		playlist_page_target.set(playlist);
		$page.url.pathname = '/playlistPage';
	}

	let searchTerm = '';

	$: selected_playlists = playlists.filter((playlist) => {
		return playlist.name.includes(searchTerm);
	});

	onMount(getPlaylists);
</script>

<input
	class="w-full border border-green-600 rounded-xl pl-5 bg-black placeholder-green-600"
	type="text"
	placeholder="Search for a specific playlist..."
	bind:value={searchTerm}
/>
<!-- class="grid grid-cols-1 gap-2 lg:gap-8 items-start mt-8 md:mt-16 md:grid-cols-2 lg:grid-cols-8" -->

<div
	class={`grid grid-cols-1 gap-2 lg:gap-8 items-start mt-8 md:mt-16 md:grid-cols-2 lg:grid-cols-5 ${
		small ? '2xl:grid-cols-8' : '2xl:grid-cols-8'
	}`}
>
	{#each selected_playlists as playlist}
		{#if playlist.public}
			<div class="flex lg:grid border border-green-600 truncate text-ellipsis">
				<img
					class=" object-cover h-28 w-28 lg:h-56 lg:w-56 xl:h-52 xl:w-52 2xl:h-60 2xl:w-60"
					src={playlist['images'][0]['url']}
					alt="playlist cover"
				/>

				<div class="flex flex-col items-start p-6 mx-5 lg:mx-0">
					<button
						on:click={() => clickPlaylist(playlist)}
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
