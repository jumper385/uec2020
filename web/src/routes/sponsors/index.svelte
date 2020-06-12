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
    padding: 0 12pt;
    box-sizing: border-box;
    border-left: solid 3px yellow;
  }

  .announcement .primary .title {
    margin:0;
  }

  .announcement .primary .handle {
    margin:0;
    font-size: 0.8em;
    font-weight:bold;
    color:rgba(0,0,0,.36);
  }
  

  .announcement .content {
    
  }

  .announcement .metainfo {
    margin:0;
    font-size:0.8em;
    display: flex;
    align-items: center;
    color:rgba(0,0,0,.36);
    font-weight: bold;
  }

  .announcement .metainfo span{
    font-size:1.5em;
    color:rgba(0,0,0,.36);
    margin-right: 6pt;
    display: flex;
    align-content: center;
    justify-content: center;
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
  <h2 style="text-align:center; margin-top:24pt;">Announcements</h2>

  {#if posts}
    {#each posts as announcement}
      <div class="announcement">

        <div class='primary'>
          <h3 style='font-weight:bold' class="title">{announcement.title}</h3>
          <p class='handle'>@{announcement.author}</p>
        </div>

        <p class='content'>{announcement.summary || 'A summary is not available...'}</p>

        <div>
          <p class='metainfo'><span class='material-icons'>corporate_fare</span>{announcement.company || 'Company Unvavailable'}</p>
          <p class='metainfo'><span class='material-icons'>link</span><a href='{announcement.content ? `sponsors/${announcement.shortid}` : announcement.link || null}'>{announcement.content ? `sponsors/${announcement.shortid}` : announcement.link || 'Link Unavailable...'}</a></p>
        </div>
        
        <!-- <a href='sponsors/{announcement._id}'>Read More...</a> -->
      </div>
    {/each}
  {:else}
    <p style="text-align:center">No posts just yet...</p>
  {/if}

</div>
