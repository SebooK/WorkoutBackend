const BodyStats = require('../../models').bodyStats

module.exports = {
  create (req, res) {
    return BodyStats
      .create({
        date: req.body.date,
        weight: req.body.weight,
        neck: req.body.neck,
        chest: req.body.chest,
        wrist: req.body.wrist,
        upperarm: req.body.upperarm,
        forearm: req.body.forearm,
        waist: req.body.waist,
        hip: req.body.hip,
        thigh: req.body.thigh,
        calf: req.body.calf,
        userId: req.body.userId,
      })
      .then(bodyStats => {
        return res.status(200).send(bodyStats)
      })
      .catch(error => {
        console.log(error)
        return res.status(200).send(error)
      })
  },
  async update (req, res) {

    return BodyStats
      .update({
        date: req.body.date,
        weight: req.body.weight,
        neck: req.body.neck,
        chest: req.body.chest,
        wrist: req.body.wrist,
        upperarm: req.body.upperarm,
        forearm: req.body.forearm,
        waist: req.body.waist,
        hip: req.body.hip,
        thigh: req.body.thigh,
        calf: req.body.calf
      })
      .then(bodyStats => {
        return res.status(200).send(bodyStats)
      })
      .catch(error => {
        console.log(error)
        return res.status(200).send(error)
      })
  },
  delete (req, res) {
    return BodyStats
      .findByPk(req.params.id)
      .then(user => {
        if (!user) return res.status(404).send({ message: 'User not found' })
        return user
          .destroy()
          .then(() => {
            return res.status(204).send({ message: 'User deleted' })
          })
          .catch(error => {
            res.status(400).send({ errorMessage: error.message })
          })
      })
      .catch(error => {
        return res.status(500).send({errorMessage:error.message})
      })
  }

}
