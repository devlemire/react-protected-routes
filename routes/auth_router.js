const Router = require('express').Router()
const auth_controller = require('../controllers/auth_controller')
const auth_middleware = require('../middlewares/auth_middleware')

Router.get('/me', auth_controller.me)
Router.get('/logout', auth_controller.logout)

Router.post('/register', auth_middleware.register, auth_controller.register)
Router.post('/login', auth_middleware.login, auth_controller.login)

module.exports = Router
