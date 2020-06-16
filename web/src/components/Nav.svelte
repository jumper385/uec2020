<script>
	import { fade, fly } from 'svelte/transition';
	import { goto, stores } from "@sapper/app";
	const { session } = stores();
	let banner = {}
	let closed = false;
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
		padding: 0 16pt;
		padding-top:12pt;
		margin-bottom: 12pt;
	}

	nav .logo {
		height:30pt;
		margin-right:32pt;
	}

	nav .link-holder {
		margin:0;
		/* background:pink; */
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
		font-size:10pt;
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

	.link-agg {
		width:100%;
		display:flex;
		justify-content: space-between;
		align-items: center;
	}

	button.link {
		border:none;
		font-size:1em;
		background:none;
		color: rgb(0,100,200);
		text-decoration: none;
		text-transform: capitalize;
		cursor: pointer;
	}

	 @media (max-width: 500pt){
		 nav {
			 display:flex;
			 flex-direction: column;
			 align-items: center;
			 height:auto;
		 }

		 nav .link-agg {
			 display:flex;
			 flex-direction: column;
		 }

		 nav .link {
			 font-size: 0.8em;
		 }

		 nav .logo {
			margin-right:0pt;
		}

		 nav .link-holder {
			 margin-top:8pt;
		 }
	 }

</style>

<nav>
	<a href='.'>
		<img class='logo' src='logo96.png' alt='uec logo'/>
	</a>
	<div class='link-agg'>
		<div class='link-holder'>
			<a class='link' href='.'>home</a>
			<a class='link' href='about'>about</a>
			<a class='link' href='sponsors'>sponsors</a>
			<a class='link' href='contact'>contact</a>
		</div>
		<div class='link-holder'>
			{#if $session.token}
			<a class='link' href='profile'>profile</a>
			<button class='link' style='color:#ff4757' on:click={e => $session.token = null}>logout</button>
			{:else}
			<a class='link' href='login'>login</a>
			<a class='link' href='signup'>signup</a>
			{/if}
		</div>
	</div>
</nav>

{#if !closed}
<div transition:fade="{{duration:120}}" class='banner' style={banner.message ? null : 'display: None'}>
<p style='color:white; text-align:left;'>{banner.message ? null : 'display: None'}</p>
<span on:click={() => closed = true} class="banner-close material-icons"> check_box </span>
</div>
{/if}