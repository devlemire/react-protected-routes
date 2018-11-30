import React from 'react'
import './Login.css'

import { connect } from 'react-redux'
import { login } from '../../reducers/authReducer'

import { Link } from 'react-router-dom'

import api from '../../utils/api'
import axios from 'axios'

class Login extends React.Component {
  state = {
    username: '',
    password: ''
  }

  async login(e) {
    e.preventDefault()
    const { username, password } = this.state

    try {
      const { data: user } = await axios.post(api.auth.login, {
        username,
        password
      })
      this.props.login(user)
      this.props.history.push('/dashboard')
    } catch (err) {}
  }

  updateState(prop, val) {
    this.setState({ [prop]: val })
  }

  render() {
    return (
      <section id="Login-section">
        <div className="card">
          <form onSubmit={e => this.login(e)}>
            <p>Username</p>
            <input
              name="username"
              type="text"
              placeholder="username"
              required
              onChange={e => this.updateState('username', e.target.value)}
            />

            <p>Password</p>
            <input
              name="password"
              type="password"
              placeholder="password"
              required
              onChange={e => this.updateState('password', e.target.value)}
            />

            <div id="Login-actions">
              <button type="submit" className="btn-action">
                Submit
              </button>

              <Link to="/" className="link">
                Cancel
              </Link>
            </div>
          </form>
        </div>
      </section>
    )
  }
}

export default connect(
  state => state,
  { login }
)(Login)
