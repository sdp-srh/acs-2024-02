<template>
    <ion-page>
      <ion-header>
        <ion-toolbar>
          <ion-title>Inpressum</ion-title>
        </ion-toolbar>
      </ion-header>
      <ion-content>
        <ion-card>
        <ion-grid>
          <ion-row>
            <ion-col size="12">
                <ion-text>Das ist sehr sehr wichtig!</ion-text>
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
    IonText
} from '@ionic/vue';
</script>