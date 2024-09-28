<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Admin Tipps</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-card>
        <ion-text>
          <h3>
            Setze oder lösche die Tipps für einen Spieler
          </h3>
        </ion-text>
      </ion-card>
      <ion-card>


        <ion-list>
          <!-- The reorder gesture is disabled by default, enable it to drag and drop items -->
          <ion-reorder-group :disabled="false" @ionItemReorder="handleReorder($event)">
            <ion-reorder v-for="(team, index) in teams" :key="team.teamId" :value="team.teamId">
              <ion-item>
                <ion-label>{{ `${index + 1}.` }}&nbsp;&nbsp;&nbsp;<img :src="team.teamIconUrl" class="team-icon" />&nbsp;{{ team.teamName }} </ion-label>
              </ion-item>
            </ion-reorder>
          </ion-reorder-group>
          <ion-item>
            <ion-item>
              <ion-label position="floating">Secret</ion-label>
              <ion-input v-model="secret" type="text"></ion-input>
            </ion-item>
          </ion-item>
          <!-- save and cancel button -->
          <ion-item>
            <ion-button @click="save">Speichern</ion-button>

            <ion-button @click="delete">Löschen</ion-button>
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


const teams = ref([])
const secret = ref('')
const players = ref([])

onMounted(async () => {
  if (teams.value.length === 0) {
    loadTipps()
  }
  if (players.value.length === 0) {
    loadPlayers()
  }
})

const loadTipps = async () => {
  // TODO check do we get all tipps from all players
  const response = await fetch('/api/tipp')
  const data = await response.json()
  players.value = []
  teams.value = []
}



const handleReorder = (event) => {
  const fromIndex = event.detail.from
  const toIndex = event.detail.to
  // The `from` and `to` properties contain the index of the item
  // when the drag started and ended, respectively
  console.log('Dragged from index', event.detail.from, 'to', event.detail.to)

  // Finish the reorder and position the item in the DOM based on
  // where the gesture ended. This method can also be called directly
  // by the reorder group
  event.detail.complete()
  const [item] = teams.value.splice(fromIndex, 1)
  teams.value.splice(toIndex, 0, item)
}

const save = async () => {
  console.log('saving tipps')
  console.log(teams.value)
  const response = await fetch('/api/mytipp', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(teams.value)
  })

  const message = await response.json()
  showMessage(message.msg)
  /*
  fetch('/api/tipp', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(teams.value)
  })
  */
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
