<script>
  let positions = [
    {
      title: "president",
      role: "president",
      name: "alex shearer",
      email: "president@uec.org.au"
    },
    {
      title: "treasurer",
      role: "treasurer",
      name: "alexandra crier",
      email: "treasurer@uec.org.au"
    },
    {
      title: "secretary",
      role: "secretary",
      name: "emma lathbury",
      email: "president@uec.org.au"
    },
    {
      title: "Education Vice President",
      role: "edvp",
      name: "emma zandi",
      email: "education@uec.org.au"
    },
    {
      title: "Social Vice President",
      role: "socialvp",
      name: "liv kerr",
      email: "social@uec.org.au"
    },
    {
      title: "Careers Vice President",
      role: "careersvp",
      name: "matthew jongenelis",
      email: "careers@uec.org.au"
    },
    {
      title: "Welfare Vice President",
      role: "welfarevp",
      name: "Nikki Olver",
      email: "welfare@uec.org.au"
    },
    {
      title: "Postgraduage Education",
      role: "postgradrep",
      name: "Steffen Remvik",
      email: "postgradeducation@uec.org.au"
    },
    {
      title: "Undergraduate Education",
      role: "undergradrep",
      name: "Sachio Ingrilli",
      email: "undergradeducation@uec.org.au"
    },
    {
      title: "Comp-Sci Representative",
      role: "computersciencerep",
      name: "James Oakey",
      email: "computersciencerep@uec.org.au"
    },
    {
      title: "Physics Representative",
      role: "physicsrep",
      name: "Connor Winter",
      email: "physics@uec.org.au"
    },
    {
      title: "Math Representative",
      role: "mathrep",
      name: "James Oakey",
      email: "mathsrep@uec.org.au"
    }
  ];
</script>

<style>

    .message {
        max-width:500pt;
        width:100%;
        margin:0 auto;
    }

    table {
        margin: 0 auto;
        text-align:center;
        max-width:500pt;
        width:100%;
    }

    td, th {
        border-bottom: 1px solid #ddd;
        font-size:10pt;
        margin:0;
        padding:2pt;
        text-align: left;
    }
    
    span {
        margin:0;
        height:100%;
        width:100%;
        display:flex;
        align-items: center;
    }

    .role, .name {
        text-transform:capitalize;
    }

    .email{
        margin:0;
        display:flex;
        align-items:center;
        justify-content:flex-end;
        height:100%;
        width:100%;
    }

    tr:first-of-type:hover {
        background:none;
    }

    tr:hover {
        background:#F9D403;
    }

</style>

<svelte:head>
  <title>Contact Us</title>
</svelte:head>

<h1 style='text-align:center;'>👋 to the Commitee</h1>

<p style='margin-bottom:24pt;' class='message'>Feel free to say hi to us! We'd love to hear from you - any questions, complaints or even stories! As we're in direct contact with the faculty office, we speak on behalf of the student body. If there are any pressing concerns that you want sorted out, do let us know!</p>

<table class='sortable'>
  <tr>
    <th class="table-heading role">Role</th>
    <th class="table-heading name">Name</th>
    <th class="table-heading email">Email</th>
  </tr>

  {#each positions as position}
    <tr>

      <td class="table-element role"><span>{position.title}</span></td>
      <td class="table-element name"><span>{position.name}</span></td>
      <td class="table-element email" style="text-transform:lowercase">
        <a href="mailto:{position.email}">
          <code>{position.email}</code>
        </a>
      </td>

    </tr>
  {/each}

</table>
