import React, { Component } from 'react'
import { BrowserRouter as Router, Switch } from 'react-router-dom'
import './app.scss'

// Pages
import Home from './page/Home'
import Detail from './page/Detail'
import Login from './page/Login'
import Regist from './page/Regist'

export default class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Router path='/login'>
            <Login />
          </Router>
          <Router path='/regist'>
            <Regist />
          </Router>
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
