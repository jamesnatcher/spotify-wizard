<script lang="ts">
	export let data;
	let user = data.user;
</script>

<div class="min-h-screen flex flex-col items-center">
	<div class="text-2xl lg:text-5xl m-5">
		{#if user === null}
			<p>Welcome visitor, click on what you would like to do!</p>
		{:else}
			<p>
				Welcome {user['display_name']}, click on what you would like to do!
			</p>
		{/if}
	</div>
	<div
		class={`grid ${
			user
				? 'grid-cols-1 md:grid-cols-2 2xl:grid-cols-4'
				: 'grid-cols-1 md:grid-cols-2 2xl:grid-cols-3'
		} gap-2 md:gap-6 xl:gap-8 justify-center items-center mt-8 md:mt-16 text-2xl lg:text-5xl`}
	>
		<a
			href="/createPlaylist"
			class="border border-green-600 hover:border-white rounded-lg h-64 w-64 md:h-80 md:w-80 lg:h-96 lg:w-96 hover:bg-rose-600 p-5 hover:text-white"
			>Create a playlist by consulting the Wizard</a
		>
		{#if user}
			<a
				href="/enhancePlaylist"
				class="border border-green-600 hover:border-white rounded-lg h-64 w-64 md:h-80 md:w-80 lg:h-96 lg:w-96 hover:bg-rose-600 p-5 hover:text-white"
				>Enhance a playlist by consulting the Wizard</a
			>
		{/if}
		{#if user}
			<a
				href="/profile"
				class="border border-green-600 hover:border-white rounded-lg h-64 w-64 md:h-80 md:w-80 lg:h-96 lg:w-96 hover:bg-rose-600 p-5 hover:text-white"
				>View your playlists</a
			>
		{:else}
			<a
				href="/login"
				class="border border-green-600 hover:border-white rounded-lg h-64 w-64 md:h-80 md:w-80 lg:h-96 lg:w-96 hover:bg-rose-600 p-5 hover:text-white"
				>Log in to your account</a
			>
		{/if}
		<a
			href="/openAI"
			class="border border-green-600 hover:border-white rounded-lg h-64 w-64 md:h-80 md:w-80 lg:h-96 lg:w-96 hover:bg-rose-600 p-5 hover:text-white"
			>Talk to the wizard</a
		>
	</div>
</div>
