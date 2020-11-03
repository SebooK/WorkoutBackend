const express = require('express')
const router = express.Router()
const authController = require('../controllers/auth/authController')
passport = require('passport')
const User = require('../models').User
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' })
})

router.get('/login',function (req,res) {
  res.render('login')
})



module.exports = router
