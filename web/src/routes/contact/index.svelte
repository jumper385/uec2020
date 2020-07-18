<script context="module">
  export function preload({ params, query }) {
    return this.fetch(`/apiv1/contacts`, {
      method:'GET'
    })
      .then(r => r.json())
      .then(positions => {
        return { positions };
      });
  }
</script>

<script>
  import { fade, fly } from "svelte/transition";
  export let positions;
</script>

<style>
  .message {
    max-width: 500pt;
    width: 100%;
    margin: 0 auto;
  }
  .role,
  .name {
    text-align: left;
  }

  .email {
    text-align: right;
  }

  @media (max-width: 500pt) {
    .role {
      display: none !important;
    }
    .table .table-row {
      grid-template-columns: 1fr 1fr !important;
    }
  }
</style>

<svelte:head>
  <title>Contact Us 👋</title>
</svelte:head>

<h1 style="text-align:center;">👋 to the Committee</h1>

<p style="margin-bottom:24pt;" class="message">
  Feel free to say hi to us! We'd love to hear from you - any questions,
  complaints or even stories! As we're in direct contact with the faculty
  office, we speak on behalf of the student body. If there are any pressing
  concerns that you want sorted out, do let us know!
</p>

<div class="table" transition:fade={{ duration: 120 }}>

  <div class="table-row">
    <p class="table-heading role">Role</p>
    <p class="table-heading name">Name</p>
    <p class="table-heading email">Email</p>
  </div>

  {#each positions as position}
    <div class="table-row">
      <p class="table-element role">
        <span>{position.role}</span>
      </p>

      <p class="table-element name">
        <span>{position.firstname} {position.lastname}</span>
      </p>

      <p class="table-element email" style="text-transform:lowercase">
        <a href="mailto:{position.position}@uec.org.au">
          <code>{position.email}</code>
        </a>
      </p>
    </div>
  {/each}

</div>
