<script context="module">

  export async function preload(page, session) {

    const res = await this.fetch(`http://${session.authserver}/verify`, {
      method: "GET",
      headers: { Authorization: `Bearer ${session.token}` },
    });

    if (res.status == 401) this.redirect(302, '/login')
    if (res.status == 500) this.error(res.status, "Internal Auth Error")
    if (res.status == 201) {
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
{/if}