import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'
import './App.css'

import ProtectedRoute from './utils/ProtectedRoute'

// Pages
import Landing from './pages/Landing'
import Dashboard from './pages/Dashboard'
import Admin from './pages/Admin'

class App extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={Landing} />
        <ProtectedRoute path="/dashboard" component={Dashboard} />
        <ProtectedRoute path="/admin" component={Admin} admin />
      </Switch>
    )
  }
}

export default App
