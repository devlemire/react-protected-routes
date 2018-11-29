const get_db = require('../utils/db')
const bcrypt = require('bcrypt')
const shortid = require('shortid')
const saltRounds = 10

module.exports = {
  me: (req, res) => {
    // If there is a user, send it
    if (req.session.user) {
      return res.send(req.session.user)
    }

    // No user found, send an unauthorized status code
    res.sendStatus(401)
  },

  login: async (req, res) => {
    if (req.session.user) return res.send(req.session.user)

    const db = get_db()
    const { username, password } = req.body

    let user = db
      .get('users')
      .find({ username })
      .value()

    if (user === undefined)
      return res.status(406).send({ error_message: 'Username not found.' })

    const password_match = await bcrypt.compare(password, user.password)

    if (password_match === false)
      return res.status(406).send({
        error_message: 'Username and password combination was incorrect.'
      })

    delete user.password
    req.session.user = user

    res.send(user)
  },

  register: async (req, res) => {
    try {
      if (req.session.user)
        return res.status(406).send({
          error_message: 'User already has an account and is logged into it.'
        })

      const db = get_db()
      const { username, password } = req.body

      const user = db
        .get('users')
        .find({ username })
        .value()

      if (user !== undefined)
        return res
          .status(406)
          .send({ error_message: 'Username is already taken.' })

      const salt = await bcrypt.genSalt(saltRounds)
      const hashed_password = await bcrypt.hash(password, salt)

      db.get('users')
        .push({ id: shortid.generate(), username, password: hashed_password })
        .write()

      res.sendStatus(200)
    } catch (err) {
      console.error('register failed in auth_controller.js:', err)
      res.status(500).send({
        error_message:
          'The API could not register you at this time. Please try again later.'
      })
    }
  },

  logout: (req, res) => {
    req.session.destroy()
    res.sendStatus(200)
  }
}
