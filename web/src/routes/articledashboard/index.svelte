<script context="module">
  export async function preload(page, session) {
    let credentials;

    let verify = await this.fetch("apiv1/auth/verify", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${session.token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        permissions: ["committee"],
      }),
    });

    if (verify.status == 401) this.redirect(302, "login");
    if (verify.status == 500) this.error(verify.status, await verify.message);
    if (verify.status == 201) {
      credentials = await verify.json();
    }

    const getArticles = await this.fetch("apiv1/announcements", {
      method: "GET",
    });

    console.log(getArticles.status);

    if (getArticles.status == 500)
      this.error(getArticles.status, await getArticles.message);

    let { documents, _ } = await getArticles.json();

    return { documents, credentials };
  }
</script>

<script>
	export let documents;
	
	import { goto, stores } from "@sapper/app";
  const { session } = stores();

  export const deletearticle = async (deletequery) => {
    let data = await fetch("/apiv1/announcements", {
      method: "DELETE",
      headers: {
				"Content-Type": "application/json",
        Authorization: `Bearer ${$session.token}`,
      },
      body: JSON.stringify({...deletequery}),
		});
		if (data.status == 200) {
			documents = documents.filter(article => article._id != deletequery._id)
		}
  };
</script>

<style>
  .table-row {
    grid-template-columns: 1fr 3fr 1fr 1fr;
  }
</style>

<h1 style="text-align:center;">Article Dashboard</h1>
{#if documents.length != 0}
<div class="table">
  <div class="table-row">
    <p class="table-heading">Author</p>
    <p class="table-heading">Title</p>
    <p class="table-heading">Date</p>
  </div>
  {#each documents as article}
    <div class="table-row">
      <p class="table-content">{article.author}</p>
      <p class="table-content">{article.title}</p>
      <p class="table-content">
        {new Date(article.timestamp).toLocaleDateString()}
      </p>
      <p class="table-content">
        <a href={`/articledashboard/editarticle/${article._id}`}>Edit</a>
        <span
          style="color:red; margin-left:16pt"
          on:click={() => deletearticle({ _id: article._id })}>
          Delete
        </span>
      </p>
    </div>
  {/each}
</div>
{:else}
Articles do not exist
{/if}