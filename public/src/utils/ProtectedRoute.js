import React from 'react'
import { connect } from 'react-redux'
import { Route, Redirect } from 'react-router-dom'
import AsyncRedirect from './AsyncRedirect'

function isAdmin(user) {
  return user.roles.some(r => r.role === 'admin')
}

function ProtectedRoute(props) {
  if (props.user === null) {
    return <AsyncRedirect {...props} />
  } else if (props.admin && isAdmin(props.user)) {
    // There is already a user
    // This is an admin route and the user is an admin
    return <Route path={props.path} component={props.component} />
  } else if (props.admin && !isAdmin(props.user)) {
    // There is already a user
    // This is an admin route, but the user is not an admin
    return <Redirect to="/" />
  } else {
    // There is already a user
    // This is not an admin route
    return <Route path={props.path} component={props.component} />
  }
}

export default connect(state => ({ user: state.user }))(ProtectedRoute)
