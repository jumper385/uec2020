<script>
  import { goto, stores } from "@sapper/app";
  const { session } = stores();

  let username, password = null;
  $: button = "Login";

  const onSubmit = async (e) => {
    let response = await fetch("http://localhost:3003/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    });

    if (response.status == 201) {
      $session.token = await response.json()
      $session.authenticated = true
      goto('.')
    } else {
      $session.authenticated = false
    }

  };

</script>

{#if $session.authenticated}
<p>You are already logged in</p>
{:else}

<form on:submit|preventDefault={onSubmit}>
  <p>
    Username
    <input bind:value={username} />
  </p>
  <p>
    Password
    <input bind:value={password} type="password" />
  </p>

  <input type="submit" bind:value={button} />
</form>

{/if}

