<script>
  import { goto, stores } from "@sapper/app";
  const { session } = stores();

  let username,
    password = null;
  $: button = "Login";

  let errorcount = 0;
  $: success = !!$session.token;

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
      success = $session.token && true;
      goto("/profile");
    }

    if (response.status != 201) {
      button = "Try Again...";
      errorcount += 1;
    }
  };
</script>

<style>
  .container {
    width: 250pt;
    margin: 0 auto;
  }

  .container h1 {
    text-align: center;
  }

  .container .inputbutton {
    -webkit-appearance: none;
    width: 100%;
    border: 0;
    padding: 8pt 0;
    background: #fcd703;
    border-radius: 6pt;
    margin-top: 8pt;
  }

  .container .inputbutton:disabled {
    background: #fff8cf;
    color: rgba(0, 0, 0, 0.36);
  }

  .container .loginerror {
    background: #ff4757;
    color: white;
  }
</style>

<svelte:head>
  <title>Login</title>
</svelte:head>
<div class="container">
  <h1>Login</h1>

  <form on:submit|preventDefault={onSubmit}>

    <div class="inputcontainer">
      <p class="input_title">Username</p>
      <input class="textinput" bind:value={username} name="username" />
    </div>

    <div class="inputcontainer">
      <p class="input_title">Password</p>
      <input
        class="textinput"
        bind:value={password}
        type="password"
        name="password" />
    </div>
    {#if errorcount == 0}
      <input
        disabled={!username}
        class="inputbutton"
        type="submit"
        style={success && 'background:#2ecc71; color:white;'}
        bind:value={button} />
    {:else}
      <input
        disabled={!username}
        class="inputbutton loginerror"
        style={success && 'background:#2ecc71;'}
        type="submit"
        bind:value={button} />
    {/if}
  </form>

</div>
