<script context="module">
  export async function preload(page, session) {
    let credentials;

    let res = await this.fetch("apiv1/auth/verify", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${session.token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        permissions: ["committee"],
      }),
    });

    if (res.status == 401) this.redirect(302, "login");
    if (res.status == 500) this.error(res.status, await res.message);
    if (res.status == 201) {
      credentials = await res.json();
      console.log(credentials)
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
  export let credentials;

  const deleteAnnouncement = async () => {
    console.log(query);

    let deletion = await fetch("apiv1/announcements", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session.token}`,
      },
      body: JSON.stringify({
        _id: "fdafdsadfa",
      }),
    });
  };
</script>

<h2>Account Functions</h2>
{#if credentials.role.includes('committee')}
<p><a class='link' href='articledashboard/newarticle'>Create Announcement</a></p>
<p><a class='link' href='articledashboard/editarticle'>Edit Articles</a></p>
{/if}