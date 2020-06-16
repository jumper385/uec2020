<script>
    import { goto, stores } from "@sapper/app";
    const { session } = stores();
    let newschema = {}
    let buttonmessage = 'And we\'re done!'
    const onSubmit = async e => {
        let response = await fetch('apiv1/auth/profile', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            }, 
            body: JSON.stringify({
                ...newschema
            }),
        })
        if (response.status == 200){
            goto('/login')
            buttonmessage = 'Account Created!'
        }

        if (response.status != 200){
            let payload = await response.json()
            buttonmessage = payload.message
        }
    }
</script>

<style>
    .formcontainer {
        max-width:500pt;
        margin:0 auto;
    }
</style>

{#if $session.authenticated}
<p>You already have an account...</p>
{:else}
<form class='formcontainer' on:submit|preventDefault={onSubmit}>
    <h2>1. We want to know a little bit about you...</h2>
    <div class="inputcontainer">
      <p class="input_title">First Name</p>
      <input required={true} class="textinput" bind:value={newschema.firstname} name="firstname" />
    </div>
    <div class="inputcontainer">
      <p class="input_title">Last Name</p>
      <input required={true} class="textinput" bind:value={newschema.lastname} name="lastname" />
    </div>
    <div class="inputcontainer">
      <p class="input_title">Gender (optional)</p>
      <input class="textinput" bind:value={newschema.gender} name="gender" />
    </div>
    <div class="inputcontainer">
      <p class="input_title">Profession (optional)</p>
      <input class="textinput" bind:value={newschema.profession} name="profession" />
    </div>
    <h2>2. This is what we'll use to contact you...</h2>
    <div class="inputcontainer">
      <p class="input_title">email</p>
      <input required={true} class="textinput" bind:value={newschema.email} name="email" />
    </div>
    <div class="inputcontainer">
      <p class="input_title">username</p>
      <input required={true} class="textinput" bind:value={newschema.username} name="username" />
    </div>
    <h2>3. You'll want to remember this one...</h2>
    <div class="inputcontainer">
      <p class="input_title">password</p>
      <input required={true} type='password' class="textinput" bind:value={newschema.password} name="password" />
    </div>
    <input class = 'formsubmitbutton' type='submit' value={buttonmessage}/>
</form>
{/if}