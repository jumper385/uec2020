<script>
  import { goto, stores } from "@sapper/app";
  const { session } = stores();

  let username,
    password = null;
  $: button = "Login";

  const onSubmit = async e => {
    let response = await fetch(`apiv1/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username: username,
        password: password
      })
    });
    if (response.status == 201) {
      $session.token = await response.json();
      button = $session.token && "Success!";
      goto("/profile");
    }

    if (response.status != 201) button = "Wrong Password - try again";
  };
</script>

<form on:submit|preventDefault={onSubmit}>
  <p>
    Username
    <input bind:value={username} name="username" />
  </p>
  <p>
    Password
    <input bind:value={password} type="password" name="password" />
  </p>

  <input type="submit" bind:value={button} />
</form>
