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

    let originaldata = (await response.json()).documents[0];
    return { originaldata, slug };
  }
</script>

<script>
  export let originaldata;
  export let slug;
  import marked from "marked";
  import { goto, stores } from "@sapper/app";
  const { session } = stores();
  const exportChanges = async () => {
    let makechange = await fetch("/apiv1/announcements", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${$session.token}`,
      },
      body: JSON.stringify({
        query: { _id: slug },
        delta: { ...originaldata },
      }),
    });

    if(makechange.status == 200) goto('articledashboard') 
  };
</script>

<h1>Edit "{originaldata.title}"</h1>

<div class="container">

  <form on:submit|preventDefault={exportChanges}>
    <div class="inputcontainer">
      <p class="input_title">title</p>
      <input class="textinput" bind:value={originaldata.title} name="title" />
    </div>
    <div class="inputcontainer">
      <p class="input_title">company</p>
      <input class="textinput" bind:value={originaldata.company} name="title" />
    </div>
    <div class="inputcontainer">
      <p class="input_title">summary</p>
      <input
        class="textinput"
        bind:value={originaldata.summary}
        name="summary" />
    </div>
    <div class="inputcontainer">
      <p class="input_title">content</p>
      <textarea
        class="textinput"
        bind:value={originaldata.content}
        name="content" />
    </div>
    <input class="formsubmitbutton" type="submit" value={'Update'} />
  </form>

  <div class="preview">
    <h1 style="text-align:center">{originaldata.title}</h1>
    <p style="text-align:center">by {originaldata.company}</p>
    <p style="width:250pt; margin: 0 auto">TLDR: {originaldata.summary}</p>
    <br />
    <div class="markdown-body" style="max-width:500pt; margin: 0 auto;">
      {@html marked(originaldata.content || 'no content right now...')}
    </div>
  </div>

</div>
