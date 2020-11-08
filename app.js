require('dotenv').config()
const createError = require('http-errors'),
  express = require('express'),
  bodyParser = require('body-parser'),
  path = require('path'),
  cors = require('cors'),
  cookieParser = require('cookie-parser'),
  logger = require('morgan'),
  session = require('express-session')




const app = express()
const port = process.env.PORT || 8000
const corsOption = {
  origin: 'http://localhost:8080'
}

const db = require('./models')

const indexRouter = require('./routes/index')
// BodyParser
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
// Passport
app.use(session({
  secret: 'keyboard cat',
  resave: true,
  saveUninitialized: true
})) // session secret

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'jade')
app.use(express.static(path.join(__dirname, 'public')))

app.use(cors(corsOption))
app.use(logger('dev'))
app.use(express.json())

app.use(cookieParser())

app.use('/', indexRouter)


// catch 404 and forward to error handler
app.use(function (err,req, res, next) {
  console.log(err)
  res.status(404).json(err)
})

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  console.log(err)
 res.send({'error':err})
})
db.sequelize.sync()
app.listen(port, () => console.log(`Listening on port ${port}`))

module.exports = app
