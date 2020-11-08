const Workout = require('../../models').workouts
const Exercises = require('../../models').exercises
module.exports = {
  list (req, res) {
    return Workout
      .findAll(
        {
          include: [{
            model: Exercises,
            as: 'Exercises'
          }]
        })
      .then(workouts => {
        if (!workouts) return res.status(404).send('Workout not Found')
        return res.status(200).send(workouts)
      })
      .catch(error => {
        return res.status(500).send({ errorMessage: error.message })
      })
  },
  getById (req, res) {
    return Workout
      .findByPk(req.params.id)
      .then(workout => {
        if (!workout) return res.status(404).send({ errorMessage: 'Workout not Found' })
        return res.status(200).send(workout)
      })
      .catch(error => {
        return res.status(500).send({ errorMessage: error.message })
      })
  },
  async create (req, res) {
    let workout = await Workout.findOne({
      where: { workoutName: req.body.workoutName }
    })
    if (workout) {
      return res.status(400).json({ error: 'Workout already exist' })
    } else {
      Workout
        .create({
          workoutName: req.body.workoutName,
          workoutCategory: req.body.workoutCategory,
          workoutDescription: req.body.workoutDescription,
          userId: req.user.id
        })
        .then(workout => {
          res.status(201).send(workout)
        })
        .catch(error => {
          res.status(500).send({ errorMessage: error.message })
        })
    }
  },

  async update (req, res) {
    let workout = await Workout.findByPk(req.params.id)
    if (!workout) return res.status(400).send({ message: 'Workout not found' })
    else {
      return workout
        .update({
          workoutName: req.body.workoutName,
          workoutCategory: req.body.workoutCategory,
          workoutDescription: req.body.workoutDescription,
          userId: req.user.id
        })
        .then(workout => {
          res.status(201).json(workout)
        })
        .catch(error => {
          console.error(error)
          res.status(400).send({ error: error })
        })
    }
  },
  delete (req, res) {
    return Workout
      .findByPk(req.params.id)
      .then(workout => {
        if (!workout) {
          return res.status(400).send({
            message: 'Workout Not Found'
          })
        }
        return workout
          .destroy()
          .then(() => res.status(204).send('Workout deleted'))
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
}
