<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Gewette</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content>
      <ion-card>
        <ion-card-header>
          <ion-card-title>Tipp Ergebnisse</ion-card-title>
        </ion-card-header>
        <table class="ionic-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Spieler</th>
              <th>Punkte</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(result, index) in results" :key="result.player.id">
              <td>{{ index + 1 }}</td>
              <td><router-link :to="{ path: `/result/${result.player.id}` }">{{ result.player.id }}</router-link></td>
              <td>{{ result.points }}</td>
            </tr>
          </tbody>
        </table>
      </ion-card>

      <ion-card>
        <ion-card-header>
          <ion-card-title>Aktuelle Tabelle</ion-card-title>
        </ion-card-header>
        <LeagueTable :ranks="ranks" />
      </ion-card>

    </ion-content>
  </ion-page>
</template>

<script setup>
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonGrid,
  IonRow,
  IonCol,
  IonCard,
  IonCardHeader,
  IonCardTitle
} from '@ionic/vue';
import LeagueTable from '@/components/LeagueTable.vue'
import { onMounted, ref } from 'vue'
const ranks = ref([])
const results = ref([])
onMounted(async () => {
  console.log('loading ranking')
  if (ranks.value.length === 0) {
    loadRanking()
  }
  if (results.value.length === 0) {
    loadResults()
  }
})

const loadRanking = async () => {
  const response = await fetch('/api/leaguetable')
  const data = await response.json()
  ranks.value = data
}

const loadResults = async () => {
  const response = await fetch('/api/result')
  const data = await response.json()
  results.value = data
}
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