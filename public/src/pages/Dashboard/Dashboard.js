import React from 'react'
import { connect } from 'react-redux'
import { logout } from '../../reducers/authReducer'
import axios from 'axios'
import api from '../../utils/api'

class Dashboard extends React.Component {
  logout = async () => {
    try {
      await axios.get(api.auth.logout)
      this.props.logout()
    } catch (err) {
      console.error('logout failed in Dashboard.js:', err)
    }
  }

  render() {
    return (
      <section id="Dashboard-section">
        <div className="card">
          <p>Welcome to the Dashboard. You are successfully logged in.</p>

          <button className="btn-action" onClick={this.logout}>
            Logout
          </button>
        </div>
      </section>
    )
  }
}

export default connect(
  state => state,
  { logout }
)(Dashboard)
