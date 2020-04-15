<script>
	export let segment;
</script>

<style>

	nav {
		height: 36pt;
		display:flex;
		align-items: center;
		justify-content: space-between;
		padding: 0 32pt;
		padding-top:12pt;
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

</style>

<nav>
	<img class='logo' src='logo.png' alt='uec logo'/>

	<div class='link-holder'>
		<a class='link' href='.'>home</a>
		<a class='link' href='about'>about</a>
		<a class='link' href='sponsorship'>sponsorship</a>
		<a class='link' href='contact'>contact</a>
	</div>

</nav>
