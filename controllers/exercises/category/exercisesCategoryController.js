const ExerciseCategory = require('../../../models').exercisesCategory
const Exercise = require('../../../models').exercises
module.exports = {
  list (req, res) {
    return ExerciseCategory
      .findAll({
        include: [{
          model: Exercise,
          as: 'exerciseCategory'
        }],
        attributes: {
          exclude:['workoutId','createdAt','updatedAt']
        },
      })
      .then(exerciseCategory => {
        if (!exerciseCategory) {
          return res.status(404).send({ message: 'No exerciseCategory' })
        }
        res.status(200).json(exerciseCategory)
      })
      .catch(error => {
        res.status(400).send({ errorMessage: error.message })
      })
  },
  getById (req, res) {
    return ExerciseCategory
      .findByPk(req.param.id, {
        include: [{
          model: Exercise,
          as: 'exercises'
        }]
      })
      .then(exercises => {
        if (!exercises) {
          return res.status(404).send({ message: 'exercises not found' })
        }
        return res.status(200).send(exercises)
      }).catch(error => {
        return res.status(500).send({ errorMessage: error.message })
      })

  },

 async create (req, res) {
    let category = await ExerciseCategory.findOne({
      where: { categoryName: req.body.categoryName}
    })
        if (category) {
          console.log(category)
          return res.status(400).send({ message: 'Category already exist' })
        } else {
          ExerciseCategory
            .create({
              categoryName: req.body.categoryName
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

        ExerciseCategory
          .destroy()
          .then(category => {
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
