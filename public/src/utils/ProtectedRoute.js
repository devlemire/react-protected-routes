import React from 'react'
import { connect } from 'react-redux'
import { Route, Redirect } from 'react-router-dom'
import axios from 'axios'
import api from './api'
import { login } from '../reducers/authReducer'

function isAdmin(user) {
  return user.roles.some(r => r.role === 'admin')
}

function ProtectedRoute(props) {
  if (props.user === null) {
    // No user was found in the Redux store
    // Attempt to fetch the user from the server

    axios
      .get(api.auth.me)
      .then(({ data: user }) => {
        // A user is already logged in on the server
        // Add the user to the redux store
        props.login(user)

        if (props.admin && isAdmin) {
          // This is an admin route and the user is an admin
          return <Route path={props.path} component={props.component} />
        } else if (props.admin && !isAdmin) {
          // This is an admin route and the user is not an admin
          return <Redirect to="/" />
        }

        // This is not an admin route
        return <Route path={props.path} component={props.component} />
      })
      .catch(err => {
        // No user was found in the Redux store or on the server
        console.log('No user, returning a redirect component')
        return <Redirect to="/" />
      })
  } else if (props.admin && isAdmin) {
    // There is already a user
    // This is an admin route and the user is an admin
    return <Route path={props.path} component={props.component} />
  } else if (props.admin && !isAdmin) {
    // There is already a user
    // This is an admin route, but the user is not an admin
    return <Redirect to="/" />
  } else {
    // There is already a user
    // This is not an admin route
    return <Route path={props.path} component={props.component} />
  }
}

export default connect(
  state => ({ user: state.user }),
  { login }
)(ProtectedRoute)
