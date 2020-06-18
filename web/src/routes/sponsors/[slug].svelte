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

<svelte:head>
	<title>{post.title}</title>
	<link rel='stylesheet' href='github-markdown.css'>
</svelte:head>

<div class="preview">
	<p style='text-align:center; font-size:8pt; font-weight:600; color:rgba(0,0,0,.36)'>{post.timestamp}</p>
    <h1 style="text-align:center">{post.title}</h1>
    <p style="text-align:center">by {post.company}</p>
    <p style="width:250pt; margin: 0 auto; text-align:center">TLDR: {post.summary}</p>
    <br/>
    <div class="markdown-body" style="max-width:500pt; margin: 0 auto;">
      {@html marked(post.content || 'no content right now...')}
    </div>
  </div>
