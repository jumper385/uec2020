<script context="module">
    export async function preload(page, session) {
      let credentials;
  
      let verify = await this.fetch("apiv1/auth/verify", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${session.token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          permissions: ["committee"],
        }),
      });
  
      if (verify.status == 401) this.redirect(302, "login");
      if (verify.status == 500) this.error(verify.status, await verify.message);
      if (verify.status == 201) {
        credentials = await verify.json();
      }
  
      return { credentials };
    }
  </script>

<script>
    import csv from 'csvtojson';
    export let credentials;
    import { goto, stores } from "@sapper/app";
    const { session } = stores();

    let data = '';
    console.log(credentials)
    const onSubmit = async e => {
        const converter = csv({noheader:false,output:"json"})
        let rows = await converter.fromString(data)
        
        let res = await fetch('apiv1/committee', {
            method: "POST",
            headers: {
                "Content-Type":'application/json',
                Authorization: `Bearer ${$session.token}`
            },
            body: JSON.stringify(rows),
        })
        console.log(res);
    }

</script>

<form on:submit|preventDefault={onSubmit}>
    <p>Paste RAW CSV Here. Open up comittee Spreadsheet using Notepad or any other text editor.</p>
    <textarea style='width:100%; height:100pt; resize: none; font-size:8pt; font-family: monospace' bind:value={data}/>
    <input type='submit'/>
</form>

