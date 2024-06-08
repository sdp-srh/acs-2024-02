const axios = require('axios')
const { Firestore } = require('@google-cloud/firestore')
require('dotenv').config(); 

const league = process.env.LEAGUE || 'bl1'
const season = process.env.SEASON || '2024'
let firestore = null


const getFirestore = () => {
  if (!firestore) {
    firestore = new Firestore()
  }
  return firestore
}

const importAllData = async () => {
  const start = Date.now()
  console.log('load openliga data called')
  const [teamsCount, matchesCount, rankingsCount] = await Promise.all([importTeams(), importMatches(), importRankings()]);
  // const [teamsCount, matchesCount, rankingsCount, olStatus] = await Promise.all([importTeams(), importMatches(), importRankings(), loadStatusData()]);
  const end = Date.now()
  let message = `Loaded matches (${matchesCount}), teams (${teamsCount}), rankings (${rankingsCount}) in ${end-start} ms`
  // let message = `Loaded matches (${matchesCount}), teams (${teamsCount}), rankings (${rankingsCount}), lastUpate (${olStatus.lastUpdate}), currentMatchDay (${olStatus.groupOrderID}) in ${end-start} ms`
  return message
}

const importTeams = async () => {
  console.log('load team data called')
  const teamResponse = await axios.get(`https://www.openligadb.de/api/getavailableteams/${league}/${season}`)
  const teams = teamResponse.data
  const teamsCollection = await getFirestore().collection(`teams`)
  const batch = getFirestore().batch()
  for (const team of teams) {
    const teamDocRef = teamsCollection.doc('' + team.teamId);
    batch.set(teamDocRef, team)
  }
  await batch.commit()
  console.log(`${teams.length} teams stored to firestore`)
  return teams.length
}

const deleteTeams = async () => {
  const teamsCollection = await getFirestore().collection(`teams`)
  const snapshot = await teamsCollection.get()
  const batch = getFirestore().batch()
  snapshot.docs.forEach(doc => {
    batch.delete(doc.ref)
  })
  await batch.commit()
  console.log(`teams deleted`)
}

const importMatches = async () => {
  const matchResponse = await axios.get(`https://www.openligadb.de/api/getmatchdata/${league}/${season}`)
  const matches = matchResponse.data
  const matchCollection = await getFirestore().collection(`matches`)
  const batch = getFirestore().batch()
  for (const match of matches) {
    const matchDocRef = matchCollection.doc('' + match.matchID)
    batch.set(matchDocRef, match)
  }
  await batch.commit()
  return matches.length
}


const deleteMatches = async () => {
  const matchesCollection = await getFirestore().collection(`matches`)
  const snapshot = await matchesCollection.get()
  const batch = getFirestore().batch()
  snapshot.docs.forEach(doc => {
    batch.delete(doc.ref)
  })
  await batch.commit()
  console.log(`matches deleted`)
}

const importRankings = async () => {
  const tableResponse = await axios.get(`https://www.openligadb.de/api/getbltable/${league}/${season}`)
  const entries = tableResponse.data
  const tableCollection = await getFirestore().collection(`ranking`)
  const batch = getFirestore().batch()
  let count = 0
  for (const entry of entries) {
    await tableCollection.doc('rank_' + count).set(entry)
    const docRef = tableCollection.doc('rank_' + count)
    batch.set(docRef, entry)
    count++
  }
  return entries.length
}


const deleteRankings = async () => {
  const collection = await getFirestore().collection(`ranking`)
  const snapshot = await collection.get()
  const batch = getFirestore().batch()
  snapshot.docs.forEach(doc => {
    batch.delete(doc.ref)
  })
  await batch.commit()
  console.log(`rankings deleted`)
}


const loadStatusData = async () => {
  const currentMatchDayResponse = await axios.get(`https://www.openligadb.de/api/getcurrentgroup/${league}`)
  const currentMatchDay = currentMatchDayResponse.data
  const lastUpdateResponse = await axios.get(`https://www.openligadb.de/api/getlastchangedate/${league}/${season}/${currentMatchDay.groupOrderID}`)
  const lastUpdate = lastUpdateResponse.data
  const openLigaStatus = await getFirestore().collection(`olstatus`)
  const data = {
    ...currentMatchDay,
    lastUpdate: lastUpdate
  }
  await openLigaStatus.doc('current').set(data)
  console.log(`openliga status stored to firestore`)
  return data
}

module.exports = { importAllData, importTeams, importMatches, importRankings, loadStatusData, deleteTeams, deleteMatches, deleteRankings }
