<script context="module">
  export async function preload(page, session) {
    const res = await this.fetch("http://localhost:3003/verify", {
      method: "GET",
      headers: { Authorization: `Bearer ${session.token}` },
    });
    if (res.status != 200) this.redirect(302, '/login')
    const credentials = await res.json()
    return {credentials}
  }
</script>

<script>
    export let credentials;
</script>

<h1>Hello {credentials.firstname}</h1>
<pre>{JSON.stringify(credentials)}</pre>
