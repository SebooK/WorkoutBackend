const User = require('../../models').User

module.exports = {
  async create (req, res) {
    let user = await User.findOne({
      where: { username: req.body.username }
    })
    if (user) {
      return res.status(400).json({ errors: 'Worker already registered with this username' })
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
          console.error(error)
          res.status(400).send(error)
        })
    }
  }
}
