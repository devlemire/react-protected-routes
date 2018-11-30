import React from 'react'
import { connect } from 'react-redux'
import './Landing.css'

import { Link } from 'react-router-dom'

import axios from 'axios'
import api from '../../utils/api'

import { login } from '../../reducers/authReducer'

class Landing extends React.Component {
  async componentDidMount() {
    if (this.props.user === null) {
      try {
        const { data: user } = await axios.get(api.auth.me)
        this.props.login(user)
      } catch (err) {}
    } else if (this.props.user !== null) {
      this.props.history.push('/dashboard')
    }
  }

  render() {
    return (
      <section id="Landing-section">
        <div className="card">
          <p>You are currently not logged in. Please log in or register.</p>

          <div id="Landing-actions">
            <Link to="/login">
              <button className="btn-action">Login</button>
            </Link>

            <Link to="/register">
              <button className="btn-action">Register</button>
            </Link>
          </div>
        </div>
      </section>
    )
  }
}

export default connect(
  state => state,
  { login }
)(Landing)
