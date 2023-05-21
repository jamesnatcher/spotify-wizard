<script lang="ts">
	import { onMount } from 'svelte';
	import { user, token, tokenExpired } from '../../stores';

	let playlists: any[] = [];

	async function getPlaylists(next_url?: string) {
		const current_user: any = $user;
		const access_token = $token;

		console.log(current_user);

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
			console.log('Triggering for url ', url);
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
	onMount(getPlaylists);
</script>

<div class="h-screen flex justify-center bg-black font-tech-mono text-green-600">
	<div class="grid">
		{#if $user}
			<h1 class="text-3xl font-bold">{$user['display_name']}'s playlists</h1>
		{/if}
	</div>
</div>
ew
