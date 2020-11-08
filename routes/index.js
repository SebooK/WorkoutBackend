const express = require('express')
const router = express.Router()
const auth = require('../middleware/auth')
const authController = require('../controllers/auth/authController')
const userController = require('../controllers/user/userController')
const bodyStatsController = require('../controllers/bodyStats/bodyStatsController')
const exerciseCategoryController = require('../controllers/exercises/category/exercisesCategoryController')
const exerciseController = require('../controllers/exercises/exerciseController')
const workoutsController = require('../controllers/workout/workoutController')
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' })
})

router.get('/login',function (req,res) {
  res.render('login')
})
router.post('/login',authController.login)

router.get('/dashboard',auth.verify, function (req,res) {
res.render('dashboard')
})
router.post('/users',userController.create)
router.get('/users',userController.list)
router.get('/users/me',auth.verify,userController.getUserData)
router.get('/users/:id',userController.getById)
router.put('/users/:id',userController.update)
router.delete('/users/:id',userController.delete)

router.post('/bodyStats',bodyStatsController.create);
router.put('/bodyStats/:id',bodyStatsController.update);
router.delete('/bodyStats/:id',bodyStatsController.delete);

router.get('/exerciseCategory',exerciseCategoryController.list)
router.get('/exerciseCategory/:id',exerciseCategoryController.getById)
router.post('/exerciseCategory',exerciseCategoryController.create)
router.delete('/exerciseCategory/:id',exerciseCategoryController.delete)

router.get('/exercises',exerciseController.list)
router.get('/exercises/:id',exerciseController.getById)
router.post('/exercises',exerciseController.create)
router.delete('/exercises/:id',exerciseController.delete)

router.get('/workouts',auth.verify,workoutsController.list)
router.get('/workouts/:id',auth.verify,workoutsController.getById)
router.post('/workouts',auth.verify,workoutsController.create)
router.put('/workouts/:id',auth.verify,workoutsController.create)
router.delete('/workouts/:id',auth.verify,workoutsController.create)


module.exports = router
