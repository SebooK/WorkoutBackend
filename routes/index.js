import express from 'express'
import authController from '../controllers/auth/authController.js'
const router = express.Router()
import  auth  from '../middleware/auth.js'
/*
import userController from '../controllers/user/userController.js'

import bodyStatsController from '../controllers/bodyStats/bodyStatsController.js'
import exerciseCategoryController from '../controllers/exercises/category/exercisesCategoryController.js'
import exerciseController from '../controllers/exercises/exerciseController.js'
import workoutsController from '../controllers/workout/workoutController.js'
*/
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' })
})

router.get('/login', function (req, res) {
  res.render('login')
})
router.post('/login', authController.login)

router.get('/dashboard',auth.verify, function (req, res) {
  res.render('dashboard')
})
/*
router.post('/users', userController.create)
router.get('/users', userController.list)
router.get('/users/me', verify, userController.getUserData)
router.get('/users/:id', userController.getById)
router.put('/users/:id', userController.update)
router.delete('/users/:id', userController.delete)

router.post('/bodyStats', bodyStatsController.create)
router.put('/bodyStats/:id', bodyStatsController.update)
router.delete('/bodyStats/:id', bodyStatsController.delete)

router.get('/exerciseCategory', exerciseCategoryController.list)
router.get('/exerciseCategory/:id', exerciseCategoryController.getById)
router.post('/exerciseCategory', exerciseCategoryController.create)
router.delete('/exerciseCategory/:id', exerciseCategoryController.delete)

router.get('/exercises', exerciseController.list)
router.get('/exercises/:id', exerciseController.getById)
router.post('/exercises', exerciseController.create)
router.delete('/exercises/:id', exerciseController.delete)

router.get('/workouts', verify, workoutsController.list)
router.get('/workouts/:id', verify, workoutsController.getById)
router.post('/workouts', verify, workoutsController.create)
router.put('/workouts/:id', verify, workoutsController.create)
router.delete('/workouts/:id', verify, workoutsController.create)
*/
export default router
