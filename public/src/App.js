import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'
import './App.css'

import ProtectedRoute from './utils/ProtectedRoute'

// Pages
import Landing from './pages/Landing/Landing'
import Login from './pages/Login/Login'
import Dashboard from './pages/Dashboard/Dashboard'
import Admin from './pages/Admin/Admin'

class App extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={Landing} />
        <Route path="/login" component={Login} />
        <ProtectedRoute path="/dashboard" component={Dashboard} />
        <ProtectedRoute path="/admin" component={Admin} admin />
        <Route path="*" render={() => '404 not found'} />
      </Switch>
    )
  }
}

export default App
