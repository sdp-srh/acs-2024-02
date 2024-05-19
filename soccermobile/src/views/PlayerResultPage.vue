<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Tippergebnis: {{ userid }}</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>

      <ion-card>
        <ion-card-header>
          <ion-card-title>Insgesamt: <b>{{ totalPoints }}</b> Punkte</ion-card-title>
        </ion-card-header>

      </ion-card>

      <ion-card>
        <ion-card-header>
          <ion-card-title>Details pro Mannschaft</ion-card-title>
        </ion-card-header>
        <table class="ionic-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Team</th>
              <th>Punkte</th>
              <th>Platzierung</th>
              <th>Unterschied</th>
              <th>Extra</th>
              <th>Grund</th>
              
            </tr>
          </thead>
          <tbody>
            <tr v-for="(result, index) in teamDetails" :key="result.team.teamId">
              <td>{{ index + 1 }}</td>
                <td>{{ result.team.teamName }}</td>
                <td><b>{{ result.points }}</b></td>
                <td>{{ result.position.points }}</td>
                <td>{{ result.position.difference }}</td>
                <td>{{ result.extra.points }}</td>
                <td>{{ getExtraTypeText(result.extra) }}</td>
            </tr>
          </tbody>
          
        </table>
      </ion-card>

    </ion-content>
  </ion-page>
</template>


<script setup>
import { onMounted, ref } from 'vue'
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
  IonText,
  IonCardTitle,
  IonCardContent,
  IonCardHeader
} from '@ionic/vue'
import { useRoute } from 'vue-router'

const route = useRoute();
const userid = ref(route.params.playerId)
const totalPoints = ref(0)
const teamDetails = ref([])

onMounted(() => {
  console.log('PlayerResultPage mounted')
  loadTippDetails()
})

const loadTippDetails = async () => {
  const response = await fetch(`/api/resultplayer/${userid.value}`)
  const data = await response.json()
  totalPoints.value = data.totalPoints
  console.log(totalPoints.value)
  teamDetails.value = data.results
}


const getExtraTypeText = extra => {
  if (extra.points > 0) {
    return extra.type
  }
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