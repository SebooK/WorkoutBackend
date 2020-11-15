import dotenv from 'dotenv'
import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import logger from 'morgan'
import  db  from './models/index.js'
import indexRouter from './routes/index.js'

const app = express()
const port = process.env.PORT || 8000
const corsOption = {
  origin: 'http://localhost:8080'
}

dotenv.config()

// BodyParser
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

// view engine setup
app.set('views', './views')
app.set('view engine', 'jade')
app.use(express.static('./public'))

app.use(cors(corsOption))
app.use(logger('dev'))
app.use(express.json())

app.use(cookieParser())

app.use('/', indexRouter)

// catch 404 and forward to error handler
app.use(function (err, req, res, next) {
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
  res.send({ 'error': err })
})
db.sequelize.sync()
app.listen(port, () => console.log(`Listening on port ${port}`))

export default app
