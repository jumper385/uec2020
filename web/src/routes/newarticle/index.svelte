<script context='module'>

  export async function preload(page, session){
    
    const res = await this.fetch('/apiv1/auth/profile', {
      method:'GET',
      headers: {
        Authorization: `Bearer ${session.token}`,
      }
    })

    if (res.status == 401) this.redirect(302, '/login')
    if (res.status == 500) this.error(res.status, "Internal Auth Error")
    if (res.status == 200) {
      let credentials = await res.json()
      return {credentials}
    }
  }
</script>

<script>
  export let credentials;
  console.log(credentials)
  let post = {};
  import marked from "marked";
  import { goto, stores } from "@sapper/app";
  const { session } = stores();

  const exportAnnouncement = async e => {
    
    let request = await fetch('/apiv1/announcements', {
      method:'POST', 
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${$session.token}`,
      },
      body:JSON.stringify(post)
    })

    if (request.status == 200) goto('/sponsors')
  }
</script>

<style>
  .container {
    display: grid;
    grid-template-columns: 1fr 2fr;
    grid-column-gap: 12pt;
  }

  @media (max-width: 800px) {
    .container {
      align-items: center;
      grid-template-columns: 1fr;
    }
  }
</style>

<div class="container">

  <form on:submit|preventDefault={exportAnnouncement}>
    <div class="inputcontainer">
      <p class="input_title">title</p>
      <input class="textinput" bind:value={post.title} name="title" />
    </div>
    <div class="inputcontainer">
      <p class="input_title">company</p>
      <input class="textinput" bind:value={post.company} name="title" />
    </div>
    <div class="inputcontainer">
      <p class="input_title">summary</p>
      <input class="textinput" bind:value={post.summary} name="summary" />
    </div>
    <div class="inputcontainer">
      <p class="input_title">content</p>
      <textarea class="textinput" bind:value={post.content} name="content" />
    </div>
    <input class="formsubmitbutton" type="submit" value={'Publish'} />
  </form>

  <div class="preview">
    <h1 style="text-align:center">{post.title}</h1>
    <p style="text-align:center">by {post.company}</p>
    <p style="width:250pt; margin: 0 auto">TLDR: {post.summary}</p>
    <br/>
    <div class="markdown-body" style="max-width:500pt; margin: 0 auto;">
      {@html marked(post.content || 'no content right now...')}
    </div>
  </div>

</div>
