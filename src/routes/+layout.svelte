<script>
	import '../app.css';
	import Nav from './../lib/Nav.svelte';
	/** @type {{children?: import('svelte').Snippet}} */
	let { children } = $props();
</script>

<div class="min-h-screen bg-black font-tech-mono text-green-600">
	<Nav />
	{@render children?.()}
</div>
