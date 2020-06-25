<script context="module">
  export async function preload(page, session) {
      const res = await this.fetch('apiv1/auth/verify', {
          method:'GET',
          headers: {Authorization: `Bearer ${session.token}`}
      })
      if (res.status == 404) this.error(res.status, 'Not found')
      if (res.status == 505) this.error(res.status, 'Internal Server Error');
      if (res.status == 201) {
          let credentials = await res.json()
          return {credentials}
      }
  }
</script>

<script>
    export let credentials;
</script>

<p>{credentials.username}</p>