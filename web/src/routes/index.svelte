<script>
  let visible = false;
  import { fade, fly } from "svelte/transition";

  const toggleVisibility = () => {
    visible = visible ? false : true;
  };
</script>

<style>
  h1 {
    font-weight: bold;
    font-size: 36pt;
    margin: 0;
    margin-bottom: 12pt;
  }

  .container {
    height: 80vh;
    display: grid;
    grid-template-columns: 1fr 1fr;
    align-items: center;
    box-sizing: border-box;
    padding: 24pt;
    border-radius: 8pt;
  }

  .textHolder {
    width: 500pt;
  }

  @media (max-width: 600pt) {
    .textHolder {
      width: 100%;
    }

    .container {
      padding: 8pt;
      grid-template-columns: 1fr 1fr;
    }
  }

  @media (max-height: 800px) {
    .container {
      align-items: center;
      grid-template-columns: 1fr;
    }
  }
</style>

<svelte:head>
  <title>University Engineers' Club</title>
  <link
    href="https://fonts.googleapis.com/css?family=Roboto+Mono&display=swap"
    rel="stylesheet" />
  <link
    href="https://fonts.googleapis.com/icon?family=Material+Icons"
    rel="stylesheet" />
  <link rel="stylesheet" href="github-markdown.css"/>
</svelte:head>

<div transition:fade={{ duration: 120 }} class="container">

  <div class="textHolder">
    <h1>
      The
      <mark style="background:rgb(252,215,3)">
        The University Engineers' Club
      </mark>
      of the
      <mark style="background:#27348b; color:white">
        University of Western Australia
      </mark>
    </h1>

    <p class="sub">8th September 1921 - Present</p>
    <p>
      The University of Western Australia Engineers Club is the
      <b>flagship faculty society</b>
      of UWA. Symbolic to the engineering mindset, our crest's motto "
      <em>non loqui, sed facere</em>
      " translates to
      <b>"Not words, but actions"</b>
      ...
    </p>

    <a class="cta-button" style="margin-top:8pt;" href="about">
      More about our History
      <span class="material-icons">chevron_right</span>
    </a>
  </div>

</div>
