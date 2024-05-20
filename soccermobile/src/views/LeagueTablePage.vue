<template>
    <ion-page>
        <ion-header>
            <ion-toolbar>
                <ion-title>1. Bundesliga Page</ion-title>
            </ion-toolbar>
        </ion-header>

        <ion-content>
          <ion-card>
            <ion-grid>
            <ion-row>
                <ion-col size="12">
                  <LeagueTable :ranks="ranks" />

                </ion-col>
            </ion-row>
            </ion-grid>
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

} from '@ionic/vue';
import LeagueTable from '@/components/LeagueTable.vue'


import { onMounted, ref } from 'vue'
const ranks = ref([])
onMounted(async () => {
  console.log('loading ranking')
  if (ranks.value.length === 0) {
    loadRanking()
  }
})

const loadRanking = async () => {
    const response = await fetch('/api/leaguetable')
    const data = await response.json()
    ranks.value = data
}
</script>


<style scoped>
/* Add your component styles here */
.ionic-table {
  width: 100%;
  border-collapse: collapse;
}

.ionic-table th, .ionic-table td {
  text-align: left;
  padding: 8px;
  border: 1px solid #e0e0e0;
}

.ionic-table th {
  background-color: #f0f0f0;
}

.gwtextsize img {
  height: 1.2em;  /* Adjust this value as needed */
  width: auto;  /* Keeps the aspect ratio intact */
  vertical-align: middle; /* Aligns the image vertically with the text */
}

.team-icon {
  height: 1.2em;  /* Adjust this value as needed */
  width: auto;  /* Keeps the aspect ratio intact */
  vertical-align: middle; /* Aligns the image vertically with the text */
}
</style>