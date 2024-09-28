<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Admin User</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-card>
        <ion-text>
          <h3>
            Erstelle einen neuen Benutzer
          </h3>
        </ion-text>
      </ion-card>
      <ion-card>
        <ion-list>
          <ion-item>
            <ion-label position="floating">Nickname</ion-label>
            <ion-input v-model="userid" type="text"></ion-input>
          </ion-item>
          <ion-item>
            <ion-label position="floating">Passwort</ion-label>
            <ion-input v-model="password" type="text"></ion-input>
          </ion-item>
          <ion-item>
            <ion-label position="floating">Name</ion-label>
            <ion-input v-model="fullname" type="text"></ion-input>
          </ion-item>
          <ion-item>
            <ion-label position="floating">Email</ion-label>
            <ion-input v-model="email" type="text"></ion-input>
          </ion-item>
          <ion-item>
            <ion-label position="floating">Secret</ion-label>
            <ion-input v-model="secret" type="password"></ion-input>
          </ion-item>
          <!-- save and cancel button -->
          <ion-item>
            <ion-button @click="save">Speichern</ion-button>
            <ion-button @click="reset">Reset</ion-button>
          </ion-item>
        </ion-list>
      </ion-card>
    </ion-content>
  </ion-page>
</template>

<script setup>
import { IonItem, IonLabel, IonInput, IonList, IonReorder, IonReorderGroup, IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonCard, IonText } from '@ionic/vue'
import { onMounted, ref } from 'vue'
import { toastController } from '@ionic/vue';


const user = ref({ userid: '', password: '', fullname: '', email: '', secret: '' })
onMounted(async () => {
})

const save = async () => {
  console.log('saving new user')
  const response = await fetch('/api/admin/user', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(user.value)
  })
  const message = await response.json()
  showMessage(message.msg)
}

const reset = async () => {
    user.value = { userid: '', password: '', fullname: '', email: '', secret: '' }
  }

const showMessage = async (message, color = "light", duration = 2000) => {
  const toast = await toastController
    .create({
      message: message,
      duration: duration,
      color: color,
      position: 'bottom',
    });
  toast.present();
}

</script>

<style scoped>
.team-icon {
  height: 1.2em;
  /* Adjust this value as needed */
  width: auto;
  /* Keeps the aspect ratio intact */
  vertical-align: middle;
  /* Aligns the image vertically with the text */
}
</style>
