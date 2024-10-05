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
          <ion-item>
            <ion-label position="fixed">Spieler</ion-label>
            <ion-select :value="selectedPlayerId" @ionChange="handlePlayerChange" interface="popover">
              <ion-select-option v-for="player in players" :key="player.id" :value="player.id">
                {{ player.name }}
              </ion-select-option>
            </ion-select>
          </ion-item>
          <ion-item>
            <!-- The reorder gesture is disabled by default, enable it to drag and drop items -->
            <ion-reorder-group :disabled="false" @ionItemReorder="handleReorder($event)" class="w100">
              <ion-reorder v-for="(team, index) in displayedTipps.tipp" :key="team.teamId" :value="team.teamId">
                <ion-item>
                  <ion-label>{{ `${index + 1}.` }}&nbsp;&nbsp;&nbsp;<img :src="team.teamIconUrl"
                      class="team-icon" />&nbsp;{{ team.teamName }} </ion-label>
                </ion-item>
              </ion-reorder>
            </ion-reorder-group>
          </ion-item>
          <ion-item>
            <ion-item>
              <ion-label position="floating">Secret</ion-label>
              <ion-input v-model="scode" type="text"></ion-input>
            </ion-item>
          </ion-item>
          <!-- save and cancel button -->
          <ion-item>
            <ion-button @click="save">Speichern</ion-button>

            <!-- <ion-button @click="delete">Reset</ion-button> -->
          </ion-item>
        </ion-list>
      </ion-card>
    </ion-content>
  </ion-page>
</template>

<script setup>
import { IonItem, IonLabel, IonInput, IonList, IonSelect, IonSelectOption, IonReorder, IonReorderGroup, IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonCard, IonText } from '@ionic/vue'
import { onMounted, ref } from 'vue'
import { toastController } from '@ionic/vue';
// stores the default teams in alphbetical order
let originalTeams = []
const scode = ref('')
const players = ref([])
const allTipps = ref([])
const displayedTipps = ref([])

const selectedPlayerId = ref(null) // Default to 'NEW' (Neuer Spieler)

onMounted(async () => {
  await loadData()
})

// Load players and add "Neuer Spieler" to the list
const loadPlayers = async () => {
  const response = await fetch('/api/player')
  const data = await response.json()
  players.value = data
  selectedPlayerId.value = players.value[0].id
}


const loadData = async () => {
  await loadPlayers()
  const teamsResponse = await fetch('/api/team')
  const teamsJson = await teamsResponse.json()
  originalTeams = teamsJson
  // TODO check do we get all tipps from all players
  const tippsResponse = await fetch('/api/tipp')
  const tippsData = await tippsResponse.json()
  
  allTipps.value = tippsData
  updateDisplayedTipps(players.value[0].id)
}


// Handle player selection change
const handlePlayerChange = (event) => {
  selectedPlayerId.value = event.detail.value
  updateDisplayedTipps(selectedPlayerId.value)
}

const updateDisplayedTipps = (playerId) => {
  console.log('updateDisplayedTipps', playerId)
  const playerTipps = allTipps.value.find(tipp => tipp.player === playerId)
  displayedTipps.value = playerTipps
  
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
  const [item] = displayedTipps.value.tipp.splice(fromIndex, 1)
  displayedTipps.value.tipp.splice(toIndex, 0, item)
}

const save = async () => {

  console.log('saving tipps')
  const player = players.value.find(player => player.id === selectedPlayerId.value)
  const playerData = {
    id: selectedPlayerId.value,
    nickname: player.nickname
  }
  const saveObj = {
    player: playerData,
    tipp: displayedTipps.value.tipp
  }
  const response = await fetch('/api/admin/tipp', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-admin-secret': scode.value
    },
    body: JSON.stringify(saveObj)
  })

  const message = await response.json()
  await loadData()
  updateDisplayedTipps(saveObject.player)
  showMessage(message.msg)
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
.w100 {
  width: 100%;
}

</style>
