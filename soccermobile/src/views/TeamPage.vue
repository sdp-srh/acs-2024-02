<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>{{ team?.teamName }}</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <ion-card>
      <ion-grid>
        <ion-row>
          <ion-col size="12">
            <MatchesComponent :matches="matches" display="full" />
          </ion-col>
        </ion-row>
      </ion-grid>
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
    IonCard
  } from '@ionic/vue'
import MatchesComponent from '@/components/MatchesComponent.vue';

  import { useRoute } from 'vue-router'

const route = useRoute();
const teamId = ref(route.params.teamId)
console.log(teamId.value)

const matches = ref([])
const team = ref(null)

onMounted(async () => {
  loadTeam()
  loadMatches()
})



const loadTeam = async () => {
  const response = await fetch(`/api/team/${teamId.value}`)	
  const data = await response.json()
  team.value = data
  
}

const loadMatches = async () => {
  const response = await fetch(`/api/matchesforteam/${teamId.value}`)	
  const data = await response.json()
  matches.value = data
}

/*
{
  "teamName": "Werder Bremen",
  "teamGroupName": null,
  "teamId": 134,
  "teamIconUrl": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/be/SV-Werder-Bremen-Logo.svg/681px-SV-Werder-Bremen-Logo.svg.png",
  "shortName": "Bremen"
}
*/
</script>