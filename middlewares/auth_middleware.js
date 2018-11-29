module.exports = {
  register: (req, res, next) => {
    const required_properties = ['username', 'password', 'confirm_password']

    required_properties.forEach(p => {
      if (req.body[p] === undefined)
        return res.status(406).send({
          error_message: `Request body missing required property of ${p}: string`
        })
    })

    const { password, confirm_password } = req.body

    if (password !== confirm_password)
      return res
        .status(406)
        .send({ error_message: 'The passwords did not match.' })

    next()
  },

  login: (req, res, next) => {
    const required_properties = ['username', 'password']

    required_properties.forEach(p => {
      if (req.body[p] === undefined)
        return res.status(406).send({
          error_message: `Request body missing required property of ${p}: string`
        })
    })

    next()
  }
}
