<script context="module">
  export async function preload({ params, query }) {
    console.log(params);
    let { slug } = params;

    let response = await this.fetch("/apiv1/announcements", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        _id: slug,
      }),
		});
		
		let originaldata = (await response.json()).documents[0]
    return { originaldata };
  }
</script>

<script>
  export let originaldata;
</script>

<h1>Edit "{originaldata.title}"</h1>
