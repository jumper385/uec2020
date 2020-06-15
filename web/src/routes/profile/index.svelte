<script context="module">

  export async function preload(page, session) {

    const res = await this.fetch(`apiv1/auth/profile`, {
      method: "GET",
      headers: { Authorization: `Bearer ${session.token}` },
    });

    console.log(res.status)

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
</script>

{#if credentials != undefined}
<h1 style='text-align:center'>{credentials.firstname}'s Profile</h1>
<p>username: {credentials.username}</p>
<p>email: {credentials.email}</p>
{/if}