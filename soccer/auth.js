

const verifyUser = async (req, res, next) => {
    // TODO implement functionality
    // const regex = /Bearer (.+)/i;
    next()
    /*
    try {
      const idToken = getToken(req)
      req.token = await getAuth().verifyIdToken(idToken)
      next()
    } catch (err) {
      res.status(401).json({ error: { code: 'unauthenticated' } })
      console.log(err)
      console.log('verify', 'failed')
    }
    */
  }

  const registerUser = async (user, data) => {
    // TODO implement functionality
  }

  module.exports = { verifyUser }