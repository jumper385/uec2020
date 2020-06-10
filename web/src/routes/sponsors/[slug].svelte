<script context="module">
	import * as db from '../mongoosehelpers';
	import { Announcement } from '../../dbschemas/announcement.js';

	export async function preload({ params, query }) {
		// the `slug` parameter is available because
		// this file is called [slug].svelte
		// 5ee115b9935107260781a561
		const article = await db.queryCollection(Announcement, {_id:params.slug})
		const status = article ? 200 : None
		console.log(article)
		if (status === 200) {
			return { post: article[0] };
		} else {
			this.error(res.status, data.message);
		}
	}
</script>

<script>
	export let post;
</script>

<svelte:head>
	<title>{post.title}</title>
</svelte:head>

<h1>{post.title}</h1>

<div class='content'>
	{@html post.content}
</div>
