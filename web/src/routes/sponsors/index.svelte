<script context="module">
  export function preload({ params, query }) {
    return this.fetch(`sponsors.json`)
      .then(r => r.json())
      .then(posts => {
        return { posts };
      });
  }
</script>

<script>
  export let posts;

  import { fade, fly } from "svelte/transition";
  import { onMount } from "svelte";

  let sponsors = [
    { src: "austral.jpg", alt: "austral engineering" },
    { src: "ca.jpg", alt: "chartered accountants" },
    { src: "conoco.png", alt: "conocophillips" },
    { src: "gpa.jpg", alt: "gpa engineering" },
    { src: "wood&grieve.png", alt: "wood & grieve" },
    { src: "yara.png", alt: "yara" }
  ];
</script>

<style>
  .logo {
    height: 32pt;
  }
  .sponsors {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    justify-items: center;
    width: 100%;
    max-width: 500pt;
    margin: 0 auto;
    grid-row-gap: 12pt;
  }

  @media (max-width: 500pt) {
    .sponsors {
      grid-template-columns: 1fr 1fr 1fr;
    }
  }

  .announcement {
    width: 100%;
    max-width: 500pt;
    margin: 24pt auto;
  }

  .announcement .title {
    margin: 0;
	font-size: 1em;
  }

  .announcement .title .party {
    text-transform: none;
    font-weight: bold;
    text-decoration: underline;
  }
</style>

<svelte:head>
  <title>Sponsors 🙌</title>
</svelte:head>

<div transition:fade={{ duration: 120 }}>
  <h1 style="text-align:center; margin-bottom:24pt;">Sponsors</h1>
  <div class="sponsors">
    {#each sponsors as sponsor}
      <img class="logo" src="logos/{sponsor.src}" alt={sponsor.alt} />
    {/each}
  </div>
  <br />
  <h2 style="text-align:center; margin-top:24pt;">Announcements</h2>

  {#if posts}
    {#each posts as announcement}
      <div class="announcement">

        <p class="title">
          <span class="party">{announcement.author}</span>
          : {announcement.title}
        </p>
        <p class="sub">{announcement.timestamp}</p>
        <p>{announcement.content}</p>

      </div>
    {/each}
  {:else}
    <p style="text-align:center">No posts just yet...</p>
  {/if}

</div>
