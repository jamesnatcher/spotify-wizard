<script lang="ts">
	import { resolve } from '$app/paths';
	import type { PageData } from './$types';

	interface Props {
		data: PageData;
	}

	let { data }: Props = $props();
	const user = $derived(data.user);
</script>

<div class="flex min-h-screen flex-col items-center">
	<div class="m-5 text-2xl lg:text-5xl">
		{#if user === null}
			<p>Welcome visitor, click on what you would like to do!</p>
		{:else}
			<p>Welcome {user.display_name}, click on what you would like to do!</p>
		{/if}
	</div>
	<div
		class={`grid ${
			user
				? 'grid-cols-1 md:grid-cols-2 2xl:grid-cols-4'
				: 'grid-cols-1 md:grid-cols-2 2xl:grid-cols-3'
		} mt-8 items-center justify-center gap-2 text-2xl md:mt-16 md:gap-6 lg:text-5xl xl:gap-8`}
	>
		<a
			href={resolve('/createPlaylist')}
			class="h-64 w-64 rounded-lg border border-green-600 p-5 hover:border-white hover:bg-rose-600 hover:text-white md:h-80 md:w-80 lg:h-96 lg:w-96"
			>Create a playlist by consulting the Wizard</a
		>
		{#if user}
			<a
				href={resolve('/enhancePlaylist')}
				class="h-64 w-64 rounded-lg border border-green-600 p-5 hover:border-white hover:bg-rose-600 hover:text-white md:h-80 md:w-80 lg:h-96 lg:w-96"
				>Enhance a playlist by consulting the Wizard</a
			>
		{/if}
		{#if user}
			<a
				href={resolve('/profile')}
				class="h-64 w-64 rounded-lg border border-green-600 p-5 hover:border-white hover:bg-rose-600 hover:text-white md:h-80 md:w-80 lg:h-96 lg:w-96"
				>View your playlists</a
			>
			<form method="POST" action={resolve('/logout')}>
				<button
					type="submit"
					class="h-64 w-64 rounded-lg border border-green-600 p-5 hover:border-white hover:bg-rose-600 hover:text-white md:h-80 md:w-80 lg:h-96 lg:w-96"
				>
					Log out
				</button>
			</form>
		{:else}
			<a
				href={resolve('/login')}
				class="h-64 w-64 rounded-lg border border-green-600 p-5 hover:border-white hover:bg-rose-600 hover:text-white md:h-80 md:w-80 lg:h-96 lg:w-96"
				>Log in to your account</a
			>
		{/if}
		<a
			href={resolve('/openAI')}
			class="h-64 w-64 rounded-lg border border-green-600 p-5 hover:border-white hover:bg-rose-600 hover:text-white md:h-80 md:w-80 lg:h-96 lg:w-96"
			>Talk to the wizard</a
		>
	</div>
</div>
