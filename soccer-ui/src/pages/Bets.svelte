<script>
  import { onMount } from 'svelte';
  import PageLayout from '../components/PageLayout.svelte'

  let teams = [];

  onMount(async () => {
    const response = await fetch('/api/dummyteams');
    teams = await response.json();
  });

  let draggedIndex = null;

  function handleDragStart(event, index) {
    draggedIndex = index;
  }

  function handleDrop(event, targetIndex) {
    event.preventDefault();
    
    // Perform the swap
    let temp = teams[draggedIndex];
    teams[draggedIndex] = teams[targetIndex];
    teams[targetIndex] = temp;

    // This is to refresh the UI after swap
    teams = teams.slice();

    draggedIndex = null; // Reset draggedIndex
  }

  function handleDragOver(event) {
    event.preventDefault(); // Necessary to allow dropping
  }
</script>


<PageLayout title="Bets" route="bets">
  <div>
    <h1>Bitte wähle die Tabelle nach dem 34. Spieltag</h1>
    {#each teams as team, index}
      <div class="drag-div"
          draggable="true"
          on:dragstart={event => handleDragStart(event, index)}
          on:drop={event => handleDrop(event, index)}
          on:dragover={handleDragOver}>
        <p>{team.shortName}</p>
      </div>
    {/each}
  </div>
</PageLayout>

<style>
  .drag-div {
    border: 1px solid black;
    padding: 10px;
    margin-bottom: 10px;
    cursor: move;
  }
</style>



<!--
<script>
  import { onMount } from 'svelte'
  import PageLayout from '../components/PageLayout.svelte'
  let teams = []
  onMount(async () => {
    const response = await fetch('/api/dummyteams')
    teams = await response.json()
  })
</script>

<div>
  <h1>Bitte wähle die Tabelle nach dem 34. Spieltag</h1>
  {#each teams as team}
    <div class="drag-div"><p>{team.shortName}</p></div>
  {/each}
</div>

<style>
  .drag-div {
    border: 1px solid black;
    padding: 10px;
    margin-bottom: 10px;
    cursor: move;
  }
  
</style>
-->