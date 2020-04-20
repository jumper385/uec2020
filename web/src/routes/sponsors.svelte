<script context="module">

import axios from 'axios'

export const preload = async(page) => {
  const {data} = await axios.get('http://web:3000/apiv1');
  return {res:data};
}

</script>

<script>

  export let res
  console.log(res.documents)

  import { fade, fly } from "svelte/transition";
  import { onMount } from "svelte";
  import FetchBoi from '../components/FetchBoi.svelte'

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
      grid-template-columns: 1fr 1fr;
    }
  }

  .announcement {
    width: 100%;
    max-width: 500pt;
    margin: 24pt auto;
  }

  .announcement .title {
    margin: 0;
  }

  .announcement .title .party {
    text-transform: none;
    font-weight: bold;
    font-size: 12pt;
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

  {#each res.documents as announcement}
    <div class="announcement">

      <p class="title">
        <span class="party">{announcement.author}</span>
        : {announcement.title}
      </p>
      <p class="sub">{announcement.timestamp}</p>
      <p>{announcement.content}</p>

      <a href="/">Read More...</a>

    </div>
  {/each}

  <FetchBoi />

</div>
