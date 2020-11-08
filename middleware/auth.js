const jwt = require('jsonwebtoken')

module.exports = {
  verify (req, res, next) {
    console.log(req.cookies.jwt)
    let accessToken = req.cookies.jwt

    if (!accessToken) {
      res.redirect('/')
      return res.status(403).send({ message: 'Unauthorized' });

    }
    let payload
    try {
      payload = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET)
      req.user = payload
      res.locals.user = req.user
      next()
    } catch (e) {
      if (e instanceof jwt.JsonWebTokenError) {
        console.log(e)
        return res.send({ message: e })
      }
    }
  },
  refresh(req,res) {

  }
}

