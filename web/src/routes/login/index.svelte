<script>
  import { goto, stores } from "@sapper/app";
  const { session } = stores();

  let username = "";
  let password = "";
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
    if (response.status == 401) button = "Wrong login - try again...";
    else if (response.status == 200) {
      button = "Success";
      let payload = await response.json();
      $session.token = payload.jwt;
      goto('/profile')
    } else button = "Internal error...";
  };
</script>

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
