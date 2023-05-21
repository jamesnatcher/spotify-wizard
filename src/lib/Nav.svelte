<script lang="ts">
	import { onMount } from 'svelte';
	import { token, tokenExpired, appUrl } from '../stores';
	import { slide } from 'svelte/transition';

	let user: any;

	async function getUserData() {
		const accessToken = $token;
		if (accessToken) {
			const res = await fetch('https://api.spotify.com/v1/me', {
				headers: {
					Authorization: 'Bearer ' + accessToken
				}
			});
			if (res.ok) {
				const data = await res.json();
				user = data;
				console.log(user);
			} else {
				tokenExpired.set(true);
			}
		}
	}

	onMount(getUserData);
	let showMenu = false;

	function toggleNavbar() {
		showMenu = !showMenu;
	}
</script>

<div>
	<div>
		<nav class="container px-6 py-8 mx-auto md:flex md:justify-between md:items-center">
			<div class="flex items-center justify-between">
				{#if user}
					<a class="text-xl font-bold text-gray-800 md:text-2xl hover:text-blue-400" href="/"
						>{user.display_name}
					</a>
					<!-- Mobile menu button -->
					<!-- svelte-ignore a11y-click-events-have-key-events -->

					<img alt="The project logo" src={user.images.url} />
				{:else}
					<a class="text-xl font-bold text-gray-800 md:text-2xl hover:text-blue-400" href="/">
						LOGO
					</a>
				{/if}
			</div>

			<!-- Mobile Menu open: "block", Menu closed: "hidden" -->
			<div
				class="flex-col mt-8 space-y-4 md:flex md:space-y-0 md:flex-row md:items-center md:space-x-10 md:mt-0 {showMenu
					? 'flex'
					: 'hidden'}"
			>
				<a class="text-gray-800 hover:text-blue-400" href="/home">Home</a>
				<a class="text-gray-800 hover:text-blue-400" href="/blog">Blogs</a>
				<a class="text-gray-800 hover:text-blue-400" href="/contact">Contact US</a>
				<a class="text-gray-800 hover:text-blue-400" href="/about">About Us</a>
			</div>
		</nav>
	</div>
</div>
