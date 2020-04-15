<script>
    export let segment;
    let dt = new Date();
    $: year = dt.getFullYear()
</script>

<style>
*{
    text-align: center;
    color:rgba(0,0,0,.6);
}
</style>

<footer>
    <p> © University of Western Australia Engineers Club - {year}</p>
    <p>"<em>non loqui, sed facere"</em></p>
</footer>
