const User = require('../../models').User
const bodyStats = require('../../models').bodyStats
const workouts = require('../../models').workouts
module.exports = {
  list (req, res) {
    return User
      .findAll()
      .then((user) => res.status(200).json(user))
      .catch((error) => {
        res.status(400).send(error)

      })
      .catch(error => {
        res.status(500).json(error)
      })

  },

  getById (req, res) {
    return User
      .findByPk(req.params.id)
      .then((user) => {
        if (!user) {
          return res.status(400).send({
            message: 'User Not Found',
          })
        }
        return res.status(200).send(user)
      })
      .catch((error) => {
        res.status(400).send(error)
        console.log(error)
      })
  },

  async create (req, res) {
    let user = await User.findOne({
      where: { username: req.body.username }
    })
    if (user) {
      return res.status(400).json({ errors: 'User already registered with this username' })
    } else {
      User
        .create({
          username: req.body.username,
          password: req.body.password,
          email: req.body.email,
          firstName: req.body.firstName
        })
        .then(user => {
          res.status(201).send(user)
        })
        .catch(error => {
          console.log(error)
          res.status(400).send(error)
        })
    }
  },

  async update (req, res) {
    let userByEmail = await User.findOne({
      where: { email: req.body.email }
    })
    let username = await User.findOne({
      where: { username: req.body.username }
    })

    if (userByEmail || username) {
      console.log(userByEmail)
      console.log(username)
      return res.status(400).json({ errors: 'User already registered with this username or email' })
    } else {
      return User
        .findByPk(req.params.id)
        .then(user => {
          if (!user) return res.status(400).send({ message: 'User not found' })
          return user
            .update({
              username: req.body.username,
              password: req.body.password,
              email: req.body.email,
              firstName: req.body.firstName,
            })
            .then(user => {
              const jwtToken = user.generateAuthToken()
              res.cookie('jwt', jwtToken)
                .json(user)
            })
            .catch(error => {
              console.error(error)
              res.status(400).send({ error: error })
            })
        })
        .catch(error => {
          console.error(error)
          res.status(400).send({ error: error })
        })

    }
  },
  delete (req, res) {
    return User
      .findByPk(req.params.id)
      .then(user => {
        if (!user) {
          return res.status(400).send({
            message: 'User Not Found'
          })
        }
        return user
          .destroy()
          .then(() => res.status(204).send('User deleted'))
          .catch((error) => {
            res.status(400).send(error)
            console.log(error)
          })
      })
      .catch((error) => {
        res.status(400).send(error)
        console.log(error)
      })
  },

  async getUserData (req, res, next) {
    return User
      .findByPk(req.user.id, {
        include: [{
          model: bodyStats,
          as: 'bodyStats',

        },
          {
            model:workouts,
            as:'workout',
            attributes: {
              exclude: ['userId','createdAt','updatedAt']
            }
          }],
        attributes: {
          exclude: ['password']
        }
      })
      .then(user => {
        return res.status(200).send(user)
      })
      .catch(error => {
        console.log(error)
        return res.status(400).send({errorMessage:error.message})
      })
  },

}
