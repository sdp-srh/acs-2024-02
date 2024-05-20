/**
 * this module handles all http request to our soccer app
 * It returns the data as json
 */

// include libraries for microservices and file handling
const express = require('express')

require('dotenv').config(); 

const fs = require('fs')
const path = require('path')

const { Firestore } = require('@google-cloud/firestore')
const { readMatches, getMatchesForTeam, readTeams, readLeagueTable, readStatus, readTipps, setTipps, readTippsForUser, readUsers, getUser  } = require('./db')
const { verifyUser } = require('./auth')
const { calculatePointsForAll, calculateResultDetailForPlayer } = require('./betting')


// start express app
const app = express()
const port = process.env.PORT || 3000
// include body parser for easier handling of json in the request
app.use(express.json())

// serve static html files and images from the public folder
app.use(express.static(path.join(__dirname, 'public')))

// setup error and user handling
const asyncHandler = fn => (req, res, next) =>  Promise.resolve(fn(req, res, next)).catch(next)


// set the correct header information
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
})

// eslint-disable-next-line no-unused-vars
app.use(async (err, req, res, next) => {
  console.error(err) // Log the error information for debugging
  res.status(500).send('Internal Server Error')
})


// formatting of the responses
app.set('json spaces', 2);

app.post('/api/register', asyncHandler(async (req, res) => {
  // TODO implement functionality
  res.send({ msg: 'You are now registered' })
}))



// gets all teams
app.get('/api/team', asyncHandler(async (req, res) => {
    const teams = await readTeams()
    res.send(teams)
}))

// find a team with an ID
app.get('/api/team/:id', asyncHandler(async (req, res) => {
  const id = req.params.id
  console.log(`Looking for Team with id: ${id}`)
  const teams = await readTeams()
  const result = teams.find(team => team.teamId == id)
  res.send(result)
}))

// get the status of the app
app.get('/api/status', asyncHandler(async (req, res) => {
  const status = await readStatus()
  const result = {
    status: status,
    tippsUntil: process.env.TIPPSUNTIL
  }
  res.send(result)
}))

app.get('/api/leaguetable', asyncHandler(async (req, res) => {
  const entries = await readLeagueTable()
  res.send(entries)
}))


app.get('/api/match', asyncHandler(async (req,res) => {
  const matches = await readMatches()
  //const matches = await readMatches()
  res.send(matches)
}))


// find a team with an ID
app.get('/api/match/:id', asyncHandler(async (req, res) => {
  const requestId = req.params.id
  console.log(`Looking for Match with id: ${requestId}`)
  const matches = await readMatches()
  const result = matches.find(match => match.id === requestId)
  res.send(result)
}))

app.get('/api/matchesforteam/:teamId', asyncHandler(async (req,res) => {
  const teamId = req.params.teamId
  const matches = await getMatchesForTeam(teamId)

  res.send(matches)
}))


app.get('/api/mytipp', verifyUser, asyncHandler(async (req, res) => {
  // TODO read from logon info
  const user = await getUser('donald')
  // TODO handle no tipps available and send shuffled teams
  const myTipps = await readTippsForUser(user.id)
  
  if (myTipps) {
    res.send(myTipps)
  }
  else {
    // get the teams in random order
    const teams = readTeams()
    // shuffle the teams array
    const shuffledTeams = teams.sort(() => Math.random() - 0.5)
    res.send(shuffledTeams)
  }
}))

app.post('/api/mytipp', verifyUser, asyncHandler(async (req, res) => {
  // read from logon info
  const user = await getUser('donald')
  const tipps = req.body
  // TODO check last date and add the tipps
  const result = await setTipps(user.id, tipps )
  const message = { status: 'ok', msg: 'Deine Tipps sind gespeichert. Viel Erfolg!'}
  res.send(message)
}))

app.get('/api/tipp', asyncHandler(async (req, res) => {
  const tipps = await readTipps()
  res.send(tipps)
}))

app.get('/api/playertipp/:userid', asyncHandler(async (req, res) => {
  const userid = req.params.userid
  const tipps = await readTippsForUser(userid)
  res.send(tipps)
}))

app.get('/api/currentuser', verifyUser, asyncHandler(async (req, res) => {
  res.send(await getUser('donald'))
}))

app.get('/api/player', asyncHandler(async (req, res) => {
  res.send(await readUsers())
}))

app.get('/api/result', asyncHandler(async (req, res) => {
  const points = await calculatePointsForAll()
  res.send(points)
}))

app.get('/api/resultplayer/:playerid', asyncHandler(async (req, res) => {
  const playerId = req.params.playerid
  const details = await calculateResultDetailForPlayer(playerId)
  res.send(details)
}))


/**
 * initializing app
 */
app.listen(port, () => {
  console.log(`Soccer app is starting at ${port}`)
  // setup some stuff in the beginning
  console.log('Soccer app running')
})


