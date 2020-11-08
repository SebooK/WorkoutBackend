const Exercise = require('../../models').exercises
const ExerciseCategory = require('../../models').exercisesCategory
module.exports = {
  list (req, res) {
    return Exercise
      .findAll({
        include: [{
          model: ExerciseCategory,
          as: 'categoryOfExercise'
        }],
        attributes: {
          exclude: ['exerciseCategory','workoutId']
        }
      })
      .then(exercises => {
        if (!exercises) return res.status(404).send({ message: 'Exercises not found' })
        return res.status(200).json(exercises)
      })
      .catch(error => {
        return res.status(400).send({ errorMessage: error.message })
      })
  },

  getById (req, res) {
    return Exercise
      .findByPk(req.param.id, {
        include: [{
          model: ExerciseCategory,
          as: 'categoryOfExercise'
        }]
      })
      .then(exercise => {
        if (!exercise) {return res.status(404).send(exercise)}
        return res.status(200).send(exercise)
      })
      .catch(error => {
        return res.status(500).send({ errorMessage: error.message })
      })
  },
  async create (req, res) {
    let exercise = await Exercise
      .findOne({
        where: { exerciseName: req.body.exerciseName }
      })
      .catch(error => res.json(error.message))
    if (exercise) {
      return res.status(400).send({ message: 'Exercise already exist' })
    } else {
      Exercise
        .create({
          exerciseName: req.body.exerciseName,
          exerciseCategory: req.body.exerciseCategory,
          exerciseDescription: req.body.exerciseDescription,
          exerciseImg: req.body.exerciseImg,
          workoutId: req.body.workoutId,
        })
        .then(exercise => {
          return res.status(201).send(exercise)
        })
        .catch(error => {
          return res.status(400).send({ errorMessage: error.message })
        })
    }
  },
  delete (req, res) {
    return Exercise
      .findByPk(req.params.id)
      .then(category => {
        if (!category) {return res.status(404).send({ errorMessage: 'Category not found' })}

        Exercise
          .destroy()
          .then(exercise => {
            return res.status(204).send({ message: 'Category deleted' })
          })
          .catch(error => {
            return res.status(400).send({ errorMessage: error.message })
          })
      })
      .catch(error => {
        return res.status(500).send({ errorMessage: error.message })
      })
  }
}
