const { readLeagueTable, readTipps, readTippsForUser, readUsers } = require('./db')

const calculatePointsForAll = async () => {
    const leagueTable = await readLeagueTable()
    const players = await readUsers()
    const tipps = await readTipps()
    const results = []
    players.forEach(player => {
        const playerTipps = tipps.find(tipp => tipp.player === player.id)
        const details = calculateDetails(leagueTable, playerTipps.tipp)
        // console.log(`Player: ${player.id} has ${details.totalPoints} points`)
        const cleanPlayer = {id: player.id, name: player.name}
        results.push({player: cleanPlayer, points: details.totalPoints})
    })
    return results
}

const calculateResultDetailForPlayer = async (playerId) => {
    const leagueTable = await readLeagueTable()
    const tipps = await readTippsForUser(playerId)
    const results = calculateDetails(leagueTable, tipps)
    // add here the details point and differences between the bets and current table
    return results
}


const calculateDetails = (table, tipps) => {
    const details = {}
    const results = []
    let totalPoints = 0
    // todo add complex logic
    tipps.forEach((tipp, index) => {
        const leagueIndex = table.findIndex(team => team.teamInfoId === tipp.teamId)
        const position = calculateDifferencePoints(index, leagueIndex)
        const extra = calculateExtraPoints(index, leagueIndex)
        const points = position.points + extra.points
        const result = {
            team: tipp,
            teamId: tipp.teamId,
            points: points,
            position: position,
            extra: extra
        }
        totalPoints += points
        results.push(result)
    })
    details.results = results
    details.totalPoints = totalPoints
    return details
}

const calculateDifferencePoints = (tippIndex, leagueIndex) => {
    const difference = Math.abs(tippIndex - leagueIndex)
    const realDifference = tippIndex - leagueIndex
    let points = 0
    if (difference === 0) {
        points += 5
    }
    if (difference === 1) {
        points += 3
    }
    if (difference === 2) {
        points += 1
    }
    const result = {
        points: points,
        difference: realDifference,
        type: 'Platzierung'

    }
    return result
}


const calculateExtraPoints = (tippIndex, leagueIndex) => {
    // meister
    if (tippIndex === 0 && leagueIndex === 0) {
        return { points: 4, type: 'Meister' }
    }
    // champions league
    if (tippIndex <4 && leagueIndex <4) {
        return { points: 2, type: 'Champions League' }
    }
    // euro league
    if (tippIndex >=4 && tippIndex <6 && leagueIndex <6) {
        return { points: 2, type: 'Euro League' }
    }
    // abstieg
    if (tippIndex > 14 && leagueIndex > 14) {
        return { points: 2, type: 'Abstieg' }
    }
    return { points: 0, type: 'Keine Extrapunkte' }
}




// TODO get the detailled results for table compared to tipp per user

module.exports = { calculatePointsForAll, calculateResultDetailForPlayer }