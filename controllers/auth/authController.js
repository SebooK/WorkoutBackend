import User from '../../models/user.js'
import * as bcrypt from 'bcrypt'

export default class authController {
  static login (req, res, next) {
    console.log(req.body.username)
    return User.findOne({
      where: {
        username: req.body.username
      }

    }).then(user => {
      console.log(user)
      if (!user) return res.send('User not found')
      const validPassword = bcrypt.compare(req.body.password, user.password)
      if (!validPassword) return res.send({ message: 'Invalid password' })
      const jwtToken = user.generateAuthToken()
      res.cookie('jwt', jwtToken)
      res.redirect(302, '/dashboard')

    }).catch(err => {
      console.log(err)
      return res.send({ message: err.message })
    })
  }

}

