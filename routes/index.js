const Router = require('express').Router()

// Specifiy all the routes available under /api/auth
Router.use('/auth', require('./auth_router'))

module.exports = Router
