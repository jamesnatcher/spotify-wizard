<script lang="ts">
	import { resolve } from '$app/paths';
</script>

<div class="flex min-h-screen items-center justify-center text-5xl">
	<div class="grid">
		<a href={resolve('/login')} class="group transition duration-300">
			<button class="login-btn"
				>Click here to get started!
				<span
					class="block h-0.5 max-w-0 bg-green-600 transition-all duration-500 group-hover:max-w-full"
				></span>
			</button>
		</a>
	</div>
</div>
