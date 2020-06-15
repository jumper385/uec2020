<script>
    import { goto, stores } from "@sapper/app";
    const { session } = stores();
    let newschema = {}
</script>

{#if $session.authenticated}
<p>You already have an account...</p>
{:else}
<form on:submit|preventDefault>
    <h2>1. We want to know a little bit about you...</h2>
    First Name <input name='firstname'/>
    Last Name <input name='lastname'/>
    Gender <input name='gender'/>
    Profession <input name='profession'/>
    <h2>2. This is what we'll use to contact you...</h2>
    E-mail <input name='email'/>
    Username <input name='username'/>
    <h2>3. You'll want ot this one...</h2>
    Password <input name='password' type='password'/>
    Confirm Password <input name='confirm' type='password'/>
    <input type='submit' value={'And we\'re done!'}/>
</form>
{/if}