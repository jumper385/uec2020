<script>

    import { fade, fly } from 'svelte/transition';

    let sponsors = [
        {src:'austral.jpg',alt:'austral engineering'},
        {src:'ca.jpg',alt:'chartered accountants'},
        {src:'conoco.png',alt:'conocophillips'},
        {src:'gpa.jpg',alt:'gpa engineering'},
        {src:'wood&grieve.png',alt:'wood & grieve'},
        {src:'yara.png',alt:'yara'},
    ]

    let announcements = [
        {id:'123a4', title:'2021 Graduate Recruitment Programme', date:'24th Febuary 2020', teaser:'This is some small teaser text. It\'s interesting ot see this kind of description 😇', party:'Conoco Phillips'},
        {id:'123a4', title:'Vacation Workers 🎓', date:'12th Febuary 2020', teaser:'Rio is looking to recruit you! if you think you have what it takes apply at http://riotinto.org/recuitment/vacation', party:'Rio Tinto'},
        {id:'123a4', title:'A sample announcement', date:'24th Febuary 2020', teaser:'this is a small peice of text!', party:'Conoco Phillips'},
    ]

</script>

<style>
    .logo {
        height:32pt;
    }
    .sponsors {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        justify-items: center;
        width:100%;
        max-width:500pt;
        margin:0 auto;
        grid-row-gap: 12pt;
    }

    @media (max-width: 500pt) {
        .sponsors {
            grid-template-columns: 1fr 1fr;
        }
    }

    .announcement {
        width:100%;
        max-width:500pt;
        margin:24pt auto;
    }

    .announcement .title {
        margin:0;
    }

    .announcement .title .party {
        text-transform: none;
        font-weight:bold;
        font-size:12pt;
        text-decoration: underline;
    }

</style>

<svelte:head>
    <title>Sponsorship</title>
</svelte:head>

<div in:fade>
    <h1 style="text-align:center; margin-bottom:24pt;">Sponsorship</h1>

    <div class='sponsors'>
    {#each sponsors as sponsor}
        <img class='logo' src='logos/{sponsor.src}' alt={sponsor.alt}/>
    {/each}
    </div>
    <br>
    <h2 style='text-align:center; margin-top:24pt;'>Announcements</h2>

    {#each announcements as announcement}
        <div class='announcement'>
        
            <p class='title'><span class='party'>{announcement.party}</span>: {announcement.title}</p>
            <p class='sub'>DATE: {announcement.date}</p>
            <p>{announcement.teaser}</p>

            <a href='/'>Read More...</a>

        </div>
    {/each}

</div>