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
	:global(.markdown img){
		width:100%;
		height:auto;
	}
</style>

<svelte:head>
	<title>{post.title}</title>
</svelte:head>

<h1>{post.title}</h1>

<div class='markdown'>
	{@html marked(post.content)}
</div>
