<script context="module">
  export async function preload(page, session) {
    let getarticles = await this.fetch("/apiv1/announcements", {
      method: "GET",
    });
		let articles = await getarticles.json();
    return { articles };
  }
</script>

<script>
	export let articles;
</script>

<style>
  .table-row {										
    grid-template-columns: 1fr 3fr 1fr 1fr;
  }
</style>

<h1 style="text-align:center;">Article Dashboard</h1>
<div class="table">
  <div class="table-row">
    <p class="table-heading">Author</p>
		<p class="table-heading">Title</p>
		<p class="table-heading">Date</p>
  </div>
	{#each articles.documents as article}
		<div class='table-row'>
			<p class='table-content'>{article.author}</p>
			<p class='table-content'>{article.title}</p>
			<p class='table-content'>{(new Date(article.timestamp)).toLocaleDateString()}</p>
			<p class='table-content'>
				<a href={`/articledashboard/editarticle/${article._id}`}>Edit</a>
			</p>
		</div>
	{/each}
</div>
