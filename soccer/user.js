const isValidUserData = (userData) => {
  // Check if the user data is valid
  if (!userData.nickname || !userData.email || !userData.password) {
    return false
  }
  return true
}

module.exports = { isValidUserData }

