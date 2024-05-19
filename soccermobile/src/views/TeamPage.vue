<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Team Page {{ teamId }}</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <ion-card>
      <ion-grid>
        <ion-row>
          <ion-col size="12">
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
    IonCard,
    IonText,
    IonCardTitle,
    IonCardContent,
    IonCardHeader
  } from '@ionic/vue'
  import { useRoute } from 'vue-router'

const route = useRoute();
const teamId = ref(route.params.teamId)
console.log(teamId.value)
</script>