<script>
	export let status;
	export let error;
	import { fade, fly } from 'svelte/transition';

	const dev = process.env.NODE_ENV === 'development';
</script>

<style>
	h1, p {
		margin: 0 auto;
	}

	h1 {
		font-size: 2.8em;
		font-weight: 700;
		margin: 0 0 0.5em 0;
	}

	p {
		margin: 1em auto;
	}

	@media (min-width: 480px) {
		h1 {
			font-size: 4em;
		}
	}
</style>

<svelte:head>
	<title>Error {status}! </title>
</svelte:head>

<h1 in:fade>Error: {status}</h1>

<p in:fade>{error.message}</p>

{#if dev && error.stack}
	<pre in:fade>{error.stack}</pre>
{/if}
