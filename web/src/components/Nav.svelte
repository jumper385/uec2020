<script context='module'>
	export async function preload(page, session) {
    const res = await this.fetch("http://localhost:3003/verify", {
      method: "GET",
      headers: { Authorization: `Bearer ${session.token}` },
    });
    const credentials = await res.json()
    return {credentials}
  }
</script>

<script>
	import { fade, fly } from 'svelte/transition';
	let banner = {}
	let closed = false;
	export let credentials;
</script>

<svelte:head>
	<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
</svelte:head>

<style>

	nav {
		height: 36pt;
		display:flex;
		align-items: center;
		justify-content: space-between;
		padding: 0 32pt;
		padding-top:12pt;
		margin-bottom: 12pt;
	}

	nav .logo {
		height:30pt;
	}

	nav .link-holder {
		margin:0;
	}

	nav .link {
		color: rgb(0,100,200);
		text-decoration: none;
		padding: 0 6pt;
		text-transform: capitalize
	}

	nav .link:hover {
		text-decoration: underline;
	}

	nav .link:visited {
		color: rgb(0,100,150);
	}

	.banner {
		background:#2ed573;
		width:100vw;
		text-align:center;
		font-weight: 600;
		font-size:8pt;
		padding:0 16pt;
		display: flex;
		align-items: center;
		justify-content: space-between;
		box-sizing: border-box;
	}

	.banner-close{
		border-radius:32pt;
		font-size:10pt;
		display:flex;
		align-items: center;
		justify-content: center;
		color:white;
		cursor: pointer;
	}

	 @media (max-width: 500pt){
		 nav {
			 display:flex;
			 flex-direction: column;
			 align-items: center;
			 height:auto;
		 }

		 nav .link-holder {
			 margin-top:8pt;
			 display: grid;
			 grid-template-columns: 1fr 1fr 1fr 1fr;
		 }
	 }

</style>

<nav>
	<a href='.'>
		<img class='logo' src='logo96.png' alt='uec logo'/>
		<p>hey {credentials ? credentials.firstname : 'stranger'}</p>
	</a>

	<div class='link-holder'>
		<a class='link' href='.'>home</a>
		<a class='link' href='about'>about</a>
		<a class='link' href='sponsors'>sponsors</a>
		<a class='link' href='contact'>contact</a>
	</div>
</nav>

{#if !closed}
<div transition:fade="{{duration:120}}" class='banner' style={banner.message ? null : 'display: None'}>
<p style='color:white; text-align:left;'>{banner.message ? null : 'display: None'}</p>
<span on:click={() => closed = true} class="banner-close material-icons"> check_box </span>
</div>
{/if}