<script context='module'>
export const preload = async(page, session) => {
	const { token } = session;
	return {authenticated:!!token}
}
</script>

<script>
	import Nav from '../components/Nav.svelte';
	import Footer from '../components/Footer.svelte';
	import { goto, stores } from "@sapper/app";
	const { session } = stores();
	export let segment;
</script>

<style>

	main {
		position: relative;
		background-color: white;
		padding: 2em;
		margin: 0 auto;
		box-sizing: border-box;
	}

	@media (max-width: 500pt) {
        main{
			padding:8pt;
		}
    }

</style>

<Nav {segment}/>

<main>
	<slot></slot>
</main>

<Footer {segment}/>