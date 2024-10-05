
const maintainUser = async (userData) => {
  console.log(userData)
  if (userData.id === 'NEW') {
    console.log('Creating new user')
  }
  else {
    console.log('Updating user')
  }
  // TODO save/update tipps
  return 'User updated'
}

const maintainTipps = async (tippData, playerData) => {
  console.log('Updating tipps')
  console.log(tippData)
  console.log(playerData)
  // TODO save/update tipps
  return 'Tipps updated'
  
}


module.exports = { maintainUser, maintainTipps }