'use strict'

import { Sequelize } from 'sequelize'
import { Config } from '../config/config.js'
import User from '../models/user.js'
/*
import Workouts from '../models/workouts.js'
import BodyStats from '../models/bodystats.js'
import Exercises from '../models/exercises.js'
import ExerciseCategory from '../models/exercisecategory.js'
*/
const development = Config.development
let db = {}

let sequelize = new Sequelize(
  development.database,
  development.username,
  development.password, {
    dialect: development.dialect
  })
const models = {
  user: User.init(sequelize, Sequelize),
  /*
  bodyStats: BodyStats.init(sequelize,Sequelize),
  exercises: Exercises.init(sequelize,Sequelize),
  exerciseCategory: ExerciseCategory.init(sequelize,Sequelize),
  workouts: Workouts.init(sequelize,Sequelize),
*/
}

Object.values(models)
  .filter(model => typeof model.associate === 'function')
  .forEach(modelName => {
    modelName.associate(models)
  })

sequelize.authenticate()
  .then(() => console.log('Connection has been established successfully.'))
  .catch(err => console.error('Unable to connect to the database:', err))

db = {
  ...models,
  sequelize
}

export default db


