<script>
	let visible = false
	import { fade, fly } from 'svelte/transition';

	const toggleVisibility = () => {
		visible = visible ? false : true
	}

</script>


<style>

	* {
		color:rgba(0,0,0,.86);
	}

	h1 {
		font-weight: bold;
		font-size:36pt;
		margin:0;
		margin-bottom:12pt;
	}

	.date {
		font-size:10pt;
		margin:0;
		color:rgba(0,0,0,.45);
		font-weight: 700;
		font-family: 'Roboto Mono', monospace;
	}

	.container {
		height:80vh;
		display:flex;
		align-items:flex-end;
		box-sizing:border-box;
		padding:24pt;
		/* background:rgb(252,215,3); */
		border-radius:8pt;
	}

	.cta-button {
		height:32pt;
		background:rgb(252,215,3);
		font-weight:600;
		padding:0 12pt;
		box-sizing: border-box;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		text-transform: uppercase;
		text-decoration: none;
		border-radius: 2pt;
	}

	.cta-button .material-icons{
		height:32pt;
		width:32pt;
		display: flex;
		align-items: center;
		justify-content: flex-end;
	}

	.textHolder {
		width:500pt;
	}


</style>

<svelte:head>
	<title>University Engineers Club</title>
	<link href="https://fonts.googleapis.com/css?family=Roboto+Mono&display=swap" rel="stylesheet">
</svelte:head>

<div in:fade class='container'>

	<div class='textHolder'>
		<h1>

		The <mark style='background:#27348b; color:white'>University of Western Australia</mark> <mark style='background:rgb(252,215,3)'>Engineers Club</mark>
		</h1>

		<p class='date'>8th September 1921 - Present</p>
		<p>The University of Western Australia Engineers Club is the <b>flagship faculty club</b> of UWA. Symbolic to the engineering mindset, our crest's moto "<em>non loqui, sed facere</em>" translates to <b>"Not words, but actions"</b>...</p>
		<a class='cta-button' style='margin-top:8pt;' href='about'>More about our History<span class="material-icons">chevron_right</span></a>
	</div>

</div>