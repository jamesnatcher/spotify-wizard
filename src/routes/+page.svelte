<script lang="ts">
	import { user, token, code, tokenExpired, client_id, redirect_uri } from '../stores';
	import { redirect } from '@sveltejs/kit';
	import { page } from '$app/stores';
	import { PUBLIC_SPOTIFY_CLIENT_SECRET } from '$env/static/public';
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
		const user_code: any = $code;
		const header_string = btoa($client_id + ':' + PUBLIC_SPOTIFY_CLIENT_SECRET);

		const params = new URLSearchParams();
		params.append('client_id', $client_id);
		params.append('grant_type', 'authorization_code');
		params.append('code', $code);
		params.append('redirect_uri', $redirect_uri);

		if (user_code) {
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
		const page_url = $page.url.href
		redirect_uri.set(page_url)
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
			<div>
				<img alt="The project logo" src="/images/android-chrome-192x192.png" />
				<h1 class="text-7xl font-bold font-major-mono">Spotify Wizard</h1>
			</div>
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
