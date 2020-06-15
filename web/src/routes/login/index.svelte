<script>
  import { goto, stores } from "@sapper/app";
  const { session } = stores();

  let username,
    password = null;
  $: button = "Login";

  const onSubmit = async (e) => {
    let response = await fetch(`apiv1/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username.toLowerCase(),
        password: password,
      }),
    });
    if (response.status == 201) {
      $session.token = await response.json();
      button = $session.token && "Success!";
      goto("/profile");
    }

    if (response.status != 201) button = "Wrong Password - try again";
  };
</script>

<svelte:head>
  <title>Login</title>
</svelte:head>

<style>
  .container {
    width:250pt;
    margin:0 auto;
  }

  .container h1 {
    text-align:center;
  }

  .container .inputbutton {
    -webkit-appearance: none;
    width:100%;
    border:0;
    padding: 8pt 0;
    background: #fcd703;
    border-radius: 6pt;
  }

  .inputcontainer .input_title {
    text-align:left;
    margin:0;
    margin-left:6pt;
  }

  .inputcontainer .textinput {
    -webkit-appearance: none;
    width:100%;
    box-sizing:border-box;
    margin-bottom:8pt;
  }

</style>

<div class='container'>
  <h1>Login</h1>
  <form on:submit|preventDefault={onSubmit}>
    <div class='inputcontainer'>
      <p class='input_title'>Username</p>
      <input class='textinput' bind:value={username} name="username" />
    </div>
    <div class='inputcontainer'>
      <p class='input_title'>Password</p>
      <input class='textinput' bind:value={password} type="password" name="password" />
    </div>
    <input class='inputbutton' type="submit" bind:value={button} />
  </form>
</div>
