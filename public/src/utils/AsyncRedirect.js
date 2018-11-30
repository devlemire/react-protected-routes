import React from 'react'
import axios from 'axios'
import api from './api'
import { connect } from 'react-redux'
import { login } from '../reducers/authReducer'
import { Redirect } from 'react-router-dom'

class AsyncRedirect extends React.Component {
  state = {
    whatToRender: null
  }

  async componentDidMount() {
    // No user was found in the Redux store
    // Attempt to fetch the user from the server
    try {
      const { data: user } = await axios.get(api.auth.me)
      // A user is already logged in on the server
      // Add the user to the redux store
      this.props.login(user)
    } catch (err) {
      // No user was in the Redux store or the server
      this.setState({ whatToRender: <Redirect to="/" /> })
    }
  }

  render() {
    return this.state.whatToRender
  }
}

export default connect(
  state => state,
  { login }
)(AsyncRedirect)
