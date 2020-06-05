import React, { Component } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import './app.scss'

// Pages
import Home from './page/Home'
import Detail from './page/Detail'
import Login from './page/Login'
import Regist from './page/Regist'
import ListData from './page/ListData'

export default class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route path='/login' component={Login} />
          <Route path='/regist' component={Regist} />
          <Route path='/detail' component={Detail} />
          <Route path='/list' component={ListData} />
          <Route path='/' component={Home} />
        </Switch>
      </Router>
    )
  }
}
