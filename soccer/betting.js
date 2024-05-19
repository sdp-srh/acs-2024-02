const { readLeagueTable, readTipps, readTippsForUser, readUsers } = require('./db')

const calculatePointsForAll = async () => {
    const leagueTable = await readLeagueTable()
    const players = await readUsers()
    const tipps = await readTipps()
    const results = []
    players.forEach(player => {
        const playerTipps = tipps.find(tipp => tipp.player === player.id)
        const points = calculatePoints(leagueTable, playerTipps.tipp)
        console.log(`Player: ${player.id} has ${points} points`)
        results.push({player: player.id, points: points})
    })
    return results
}

const calculateResultDetailForPlayer = async (playerId) => {
    const leagueTable = await readLeagueTable()
    const tipps = await readTippsForUser(playerId)
    const points = calculatePoints(leagueTable, tipps)
    // add here the details point and differences between the bets and current table
    const result = {
        points: points,
        tipps: tipps
    }
    return result
}

const calculatePoints = (table, tipp) => {
    let points = 0
    // todo add complex logic
    table.forEach((team,index) => {
        if (tipp[index].teamId === team.teamId) {
            points += 1
        }
    })
    return points
}

// TODO get the detailled results for table compared to tipp per user

module.exports = { calculatePointsForAll, calculatePoints,calculateResultDetailForPlayer }