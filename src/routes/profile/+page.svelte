<script lang="ts">
	import { onMount } from 'svelte';
	import { user, token, tokenExpired } from '../../stores';

	let data: any;

	async function getPlaylists() {
		const current_user:any = $user;
		const access_token = $token;

		const url = `https://api.spotify.com/v1/users/${current_user.id}/playlists`;
		const limit = '50';
		const offset = '0';

		const params = new URLSearchParams({
			limit,
			offset
		});

		if (access_token) {
			console.log(access_token)	
			const res = await fetch(url + params, {
				headers: {
					Authorization: 'Bearer ' + access_token,
				},
			});

			if (res.ok) {
				const data = await res.json();
				console.log(data)
			} else {
				tokenExpired.set(true);
			}
		}
	}

	onMount(getPlaylists);
</script>

<div class="h-screen flex items-center justify-center bg-green-100">
	<div class="grid">
		<h1 class="text-3xl font-bold underline">Main page!</h1>
		<button on:click={() => console.log(data)}>show playlists</button>
	</div>
</div>
ew
