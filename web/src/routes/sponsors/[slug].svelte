<script context="module">
	import * as db from '../mongoosehelpers';
	import { Announcement } from '../../dbschemas/announcement.js';

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

<h1>{post.title}</h1>

<div class='markdown-body'>
	{@html marked(post.content)}
</div>
