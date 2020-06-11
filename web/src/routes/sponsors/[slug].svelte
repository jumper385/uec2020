<script context="module">
	export async function preload({ params, query }) {
		const res = await this.fetch(`sponsors/${params.slug}.json`);
		const data = await res.json();

		if (res.status === 200) {
			return { post: data };
		} else {
			this.error(res.status, data.message);
		}
	}
</script>

<script>
	export let post;
	import marked from 'marked';
</script>

<style>

</style>

<svelte:head>
	<title>{post.title}</title>
</svelte:head>

<h1>{post.title}</h1>

<div class='content'>
	{@html marked(post.content)}
</div>
