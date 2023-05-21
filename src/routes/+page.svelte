<script lang="ts">
	import { user, token, code, tokenExpired, client_id, redirect_uri, redirect_wrote } from '../stores';
	import { redirect } from '@sveltejs/kit';
	import { page } from '$app/stores';
	import { PUBLIC_APP_URL, PUBLIC_SPOTIFY_CLIENT_SECRET } from '$env/static/public';
	import { onMount } from 'svelte';

	let access_token = $token;

	async function getUserData() {
		const access_token = $token;
		if (access_token) {
			const res = await fetch('https://api.spotify.com/v1/me', {
				headers: {
					Authorization: 'Bearer ' + access_token
				}
			});
			if (res.ok) {
				const data = await res.json();
				user.set(data);
			} else {
				tokenExpired.set(true);
			}
		}
	}

	async function getAccessToken() {
		const header_string = btoa($client_id + ':' + PUBLIC_SPOTIFY_CLIENT_SECRET);

		const params = new URLSearchParams();
		params.append('client_id', $client_id);
		params.append('grant_type', 'authorization_code');
		params.append('code', $code);
		params.append('redirect_uri', $redirect_uri);
		console.log($code)
		console.log($redirect_uri)

		if ($code.length > 0) {
			const res = await fetch('https://accounts.spotify.com/api/token', {
				method: 'POST',
				headers: {
					Authorization: 'Basic ' + header_string
				},
				body: params
			});
			if (res.ok) {
				const data = await res.json();
				token.set(data.access_token);
			} else {
				tokenExpired.set(true);
			}
		}
	}

	async function credentials() {
		console.log("App url", PUBLIC_APP_URL)
		if ($code.length > 0) {
			await getAccessToken();
			await getUserData();
		}
	}

	onMount(credentials);
</script>

<div class="min-h-screen flex items-center justify-center bg-black font-tech-mono text-green-600">
	{#if $code.length > 0}
		<div class="grid">
			<a href="/profile">
				<button on:click={() => getUserData()} class="login-btn"
					>Welcome click here to get started!</button
				>
			</a>
		</div>
	{:else}
		<div class="grid">
			<a href="/login" class="group transition duration-300">
				<button class="login-btn"
					>Click here to log in!
					<span
						class="block max-w-0 group-hover:max-w-full transition-all duration-500 h-0.5 bg-green-600"
					/>
				</button>
			</a>
		</div>
	{/if}
</div>
