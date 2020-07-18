<script context="module">
  export async function preload(page, session) {
    const res = await this.fetch(`apiv1/auth/profile`, {
      method: "GET",
      headers: { Authorization: `Bearer ${session.token}` },
    });

    if (res.status == 401) this.redirect(302, "/login");
    if (res.status == 500) this.error(res.status, "Internal Auth Error");
    if (res.status == 200) {
      let credentials = await res.json();
      return { credentials };
    }
  }
</script>

<script>
  export let credentials;
  import { goto, stores } from "@sapper/app";
  const { session } = stores();

  let editing = false;
  let editvalues = { ...credentials };

  let submitchanges = async () => {
    let uploadDelta = await fetch("/apiv1/auth/profile", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${$session.token}`,
      },
      body: JSON.stringify({
        ...editvalues,
      }),
    });
    
    if (uploadDelta.status == 401) this.redirect(302, "/login");
    if (uploadDelta.status == 200) editing = false;
  };
</script>

{#if credentials != undefined}
  {#if !editing}
    <h1 style="text-align:center">{credentials.firstname}'s Profile</h1>
    <p>username: {credentials.username}</p>
    <p>email: {credentials.email}</p>
    <button on:click={() => (editing = editing == false ? true : false)}>
      Edit Profile
    </button>
  {:else}
    <h1 style="text-align:center">Edit Profile</h1>
    <form
      style="max-width:300pt; margin:0 auto"
      on:submit|preventDefault={submitchanges}>
      <div class="inputcontainer">
        <p class="input_title">First Name</p>
        <input
          class="textinput"
          bind:value={editvalues.firstname}
          name="firstname" />
      </div>

      <div class="inputcontainer">
        <p class="input_title">Last Name</p>
        <input
          class="textinput"
          bind:value={editvalues.lastname}
          name="lastname" />
      </div>

      <div class="inputcontainer">
        <p class="input_title">Gender</p>
        <select class="textinput" bind:value={editvalues.gender} name="gender">
          <option value={null}>None</option>
          <option value={'male'}>Male</option>
          <option value={'female'}>Female</option>
          <option value={'other'}>Other</option>
        </select>
      </div>

      <div class="inputcontainer">
        <p class="input_title">Profession</p>
        <input
          class="textinput"
          bind:value={editvalues.profession}
          name="profession" />
      </div>

      <input class="formsubmitbutton" type="submit" value="Submit Changes" />

    </form>
    <pre>{JSON.stringify(editvalues, null, 2)}</pre>
  {/if}
{/if}
