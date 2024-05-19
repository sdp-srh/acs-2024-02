<template>
  <table class="ionic-table">
    <thead>
      <tr>
        <th>#</th>
        <th>Team</th>
        <th>Points</th>
        <th>Goals</th>
        <th>Matches</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="rank in ranks" :key="rank.teamInfoId">
        <td>{{ rank.rank }}</td>
        <td>
          <img :src="rank.teamIconUrl" class="team-icon" />&nbsp;{{ rank.teamName }}
        </td>
        <td>{{ rank.points }}</td>
        <td>{{ rank.goalDiff }}</td>
        <td>{{ rank.matches }}</td>
      </tr>
    </tbody>
  </table>
</template>

<script setup>
import { defineProps } from 'vue';
const props = defineProps({
  ranks: Array
})

</script>

<style scoped>
/* Add your component styles here */
.ionic-table {
  width: 100%;
  border-collapse: collapse;
}

.ionic-table th,
.ionic-table td {
  text-align: left;
  padding: 8px;
  border: 1px solid #e0e0e0;
}

.ionic-table th {
  background-color: #f0f0f0;
}

.gwtextsize img {
  height: 1.2em;
  /* Adjust this value as needed */
  width: auto;
  /* Keeps the aspect ratio intact */
  vertical-align: middle;
  /* Aligns the image vertically with the text */
}

.team-icon {
  height: 1.2em;
  /* Adjust this value as needed */
  width: auto;
  /* Keeps the aspect ratio intact */
  vertical-align: middle;
  /* Aligns the image vertically with the text */
}
</style>