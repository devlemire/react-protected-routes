// Get environment variables
require('dotenv').config({ path: `${__dirname}/.env` })

// Server Dependencies
const express = require('express')
const morgan = require('morgan')
const session = require('express-session')
const RedisStore = require('connect-redis')(session)
const path = require('path')

// Utilities
const init_lowdb = require('./utils/init_lowdb')

// Environment Variables
const { PORT, NODE_ENV, SESSION_SECRET, REDIS_HOST, REDIS_PORT } = process.env

// Create an express instance
const app = express()

// Read JSON from request body
app.use(express.json())

// Log all incoming requests with the morgan package
app.use(morgan('dev'))

// Use persisting sessions with express-session and connect-redis
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

// Specifiy all the available routes under /api
app.use('/api', require('./routes'))

app.use(express.static(`${__dirname}/public/build`))
app.get('*', (req, res) => {
  res.sendFile(path.resolve(`${__dirname}/public/build/index.html`))
})

// Initialize lowdb with defaults
init_lowdb()

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`)
  console.log(`Server using NODE_ENV ${NODE_ENV}`)
})
