<template>
    <ion-page>
        <ion-header>
            <ion-toolbar>
                <ion-title>Matches Page</ion-title>
            </ion-toolbar>
        </ion-header>

        <ion-content>
            <ion-grid>
            <ion-row>
                <ion-col size="12">
                <table class="ionic-table">
                    <thead>
                    <tr>
                        <th>Team 1</th>
                        <th>Result</th>
                        <th>Teams 2</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="match in matches" :key="match.matchID">
                        <td>{{ match.team1.teamName }}</td>
                        <td>{{ getMatchResult(match) }}</td>
                        <td>{{ match.team2.teamName }}</td>
                    </tr>
                    </tbody>
                </table>
                </ion-col>
            </ion-row>
            </ion-grid>
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
    IonCol
} from '@ionic/vue';

import { onMounted, ref } from 'vue'
const matches = ref([])
onMounted(async () => {
  console.log('loading teams')
  if (matches.value.length === 0) {
    loadMatches()
  }
})

const loadMatches = async () => {
    const response = await fetch('/api/match')
    const data = await response.json()
    matches.value = data

}

const getMatchResult = (match) => {
    let resultText = ''
    const finalResult = match.matchResults.find(m => m.resultTypeID == 2)
    if (finalResult) {
        resultText = finalResult.pointsTeam1 + ' : ' + finalResult.pointsTeam2
    }
    return resultText
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
</style>