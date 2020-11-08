
const User = require('../../models/').User
const bcrypt = require('bcrypt')

module.exports = {
  login (req, res, next) {
    return User.findOne({
      where: {
        username: req.body.username
      }
    }).then(user => {
      if (!user) return res.send('User not found')
      const validPassword = bcrypt.compare(req.body.password, user.password)
      if (!validPassword) return res.send({ message: 'Invalid password' })
      const jwtToken = user.generateAuthToken()
      res.cookie('jwt', jwtToken)

      res.send()
      next(res.redirect('/dashboard'))

    }).catch(err => {
      console.log(err)
      return res.send({ message: err })
    })


  },
}
