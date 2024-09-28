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
          <h3>Spieler anlegen oder ändern</h3>
        </ion-text>
      </ion-card>
      <ion-card>
        <ion-list>
          <ion-item>
            <ion-label position="floating">Spieler</ion-label>
            <ion-select :value="selectedPlayerId" @ionChange="handlePlayerChange" interface="popover">
              <ion-select-option v-for="player in players" :key="player.id" :value="player.id">
                {{ player.name }}
              </ion-select-option>
            </ion-select>
          </ion-item>
          <ion-item>
            <ion-label position="floating">Nickname</ion-label>
            <ion-input :value="nickname" type="text" @ionInput="nickname = $event.target.value"></ion-input>
          </ion-item>
          <ion-item>
            <ion-label position="floating">Passwort</ion-label>
            <ion-input :value="password" type="text" @ionInput="password = $event.target.value"></ion-input>
          </ion-item>
          <ion-item>
            <ion-label position="floating">Name</ion-label>
            <ion-input :value="fullname" type="text" @ionInput="fullname = $event.target.value"></ion-input>
          </ion-item>
          <ion-item>
            <ion-label position="floating">Email</ion-label>
            <ion-input :value="mail" type="text" @ionInput="mail = $event.target.value"></ion-input>
          </ion-item>
          <ion-item>
            <ion-label position="floating">Secret</ion-label>
            <ion-input :value="scode" type="text"  @ionInput="scode = $event.target.value" ></ion-input>
          </ion-item>
          <ion-item>
            <h3>{{ scode  }}</h3>
          </ion-item>
          <!-- Save and reset buttons -->
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
import { ref, onMounted } from 'vue'
import { toastController } from '@ionic/vue'

const nickname = ref('') // Nickname field
const password = ref('') // Password field
const fullname = ref('') // Full name field
const mail = ref('') // Email field
const scode = ref('') // Secret field (not bound to the form, for security reasons)

const players = ref([]) // Players array
const selectedPlayerId = ref('NEW') // Default to 'NEW' (Neuer Spieler)

// Fetch players data when the component is mounted
onMounted(async () => {
  await loadPlayers()
})

// Load players and add "Neuer Spieler" to the list
const loadPlayers = async () => {
  const response = await fetch('/api/player')
  const data = await response.json()
  const newPlayer = { id: 'NEW', name: 'Neuer Spieler', nickname: '' }
  players.value = [newPlayer, ...data]
}

// Handle player selection change
const handlePlayerChange = (event) => {
  selectedPlayerId.value = event.detail.value
  updateFormWithSelectedPlayer(selectedPlayerId.value)
}

// Update form based on selected player
const updateFormWithSelectedPlayer = (newId) => {
  if (newId === 'NEW') {
    // Reset form for a new player
    resetForm()
  } else {
    // Load existing player data into the form
    const selectedPlayer = players.value.find(player => player.id === newId)
    if (selectedPlayer) {
      // Directly update the properties of the `user` object to ensure reactivity

      nickname.value = selectedPlayer.nickname || ''
      password.value = selectedPlayer.password || '' // Default empty if not provided
      fullname.value = selectedPlayer.fullname || ''
      mail.value = selectedPlayer.mail || ''
    }
  }
}

// Save user data (you can modify this to fit your API)
const save = async () => {
  
  console.log('secret:', scode.value)
  const playerObJ = {
    id: selectedPlayerId.value,
    nickname: nickname.value,
    password: password.value,
    fullname: fullname.value,
    mail: mail.value,
    scode: scode.value
  }
  
  const response = await fetch('/api/admin/user', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-admin-secret': scode.value
    },
    body: JSON.stringify(user.value)
  })
  const message = await response.json()
  showMessage(message.msg)
  
}

// Reset form to blank fields and reset selected player to 'NEW'
const reset = () => {
  selectedPlayerId.value = 'NEW'
  resetForm()
}

// Reset form fields
const resetForm = () => {
  nickname.value = ''
  password.value = ''
  fullname.value = ''
  mail.value = ''
}

// Show a message using Ionic's toast
const showMessage = async (message, color = "light", duration = 2000) => {
  const toast = await toastController.create({
    message: message,
    duration: duration,
    color: color,
    position: 'bottom'
  })
  toast.present()
}
</script>

<style scoped>
/* Optional: Add any specific styles here */
</style>
