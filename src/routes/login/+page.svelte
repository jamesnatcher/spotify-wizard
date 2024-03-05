<script lang="ts">
</script>

<div class="h-screen p-5 flex items-center justify-center bg-black font-tech-mono text-green-600">
	<div class="grid gap-10">
		<h1 class="text-3xl font-bold">Choose how you would like to connect:</h1>
		<form method="POST">
			<button
				type="submit"
				formaction="?/login"
				class="group transition duration-300 w-1/2 bg-green-600 border-2 border-green-600 rounded-full p-3 text-black"
			>
				&gtConnect to Spotify
				<span
					class="block max-w-0 w-1/2 group-hover:max-w-full transition-all duration-500 h-0.5 bg-black"
				/>
			</button>
		</form>
		<a href="/home" class="group transition duration-300">
			&gtLog in as guest
			<span
				class="block max-w-0 group-hover:max-w-full transition-all duration-500 h-0.5 bg-green-600"
			/>
		</a>
	</div>
</div>
