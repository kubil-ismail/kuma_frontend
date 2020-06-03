import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import './app.scss'

// Pages
import Home from './page/Home'
import Detail from './page/Detail'

export default class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Router path='/detail'>
            <Detail />
          </Router>
          <Router path='/'>
            <Home/>
          </Router>
        </Switch>
      </Router>
    )
  }
}
