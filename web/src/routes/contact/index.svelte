<script context="module">
  export function preload({ params, query }) {
    return this.fetch(`contact.json`)
      .then(r => r.json())
      .then(positions => {
        return { positions };
      });
  }
</script>

<script>
  import { fade, fly } from "svelte/transition";
  export let positions;
  console.log(positions)
</script>

<style>
  .message {
    max-width: 500pt;
    width: 100%;
    margin: 0 auto;
  }
  .table {
    max-width: 500pt;
    box-sizing: border-box;
    margin: 0 auto;
  }
  .table .table-row {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    font-size: 10pt;
    width: 100%;
    box-sizing: border-box;
    row-gap: 4pt;
    border-bottom: 1px solid rgba(0, 0, 0, 0.12);
    padding: 4pt 8pt;
    border-radius: 8pt 8pt 0 0;
  }

  .table-row:first-child {
    background: #fcd703;
  }

  .table .table-heading {
    font-weight: 600;
    box-sizing: border-box;
    margin: 0;
    width: 100%;
  }

  .table .table-element {
    font-weight: 400;
    text-transform: capitalize;
    box-sizing: border-box;
    margin: 0;
    width: 100%;
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

<h1 style="text-align:center;">👋 to the Commitee</h1>

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
        <span>{position.title}</span>
      </p>

      <p class="table-element name">
        <span>{position.firstName} {position.lastName}</span>
      </p>

      <p class="table-element email" style="text-transform:lowercase">
        <a href="mailto:{position.position}@uec.org.au">
          <code>{position.position}@uec.org.au</code>
        </a>
      </p>
    </div>
  {/each}

</div>
