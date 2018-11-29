require('dotenv').config({ path: `${__dirname}/.env` })
const express = require('express')
const morgan = require('morgan')
const session = require('express-session')
const RedisStore = require('connect-redis')(session)

const { PORT, NODE_ENV, SESSION_SECRET, REDIS_HOST, REDIS_PORT } = process.env

const app = express()
app.use(morgan('dev'))
app.use(
  session({
    store: new RedisStore({
      host: REDIS_HOST,
      port: REDIS_PORT,
      logErrors: true
    }),
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
      // Cookie Expires in 2 days
      maxAge: 1000 * 60 * 60 * 24 * 2,
      secure: NODE_ENV === 'production' ? true : false,
      httpOnly: NODE_ENV !== 'production' ? true : false
    }
  })
)

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`)
  console.log(`Server using NODE_ENV ${NODE_ENV}`)
})
