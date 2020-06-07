import React, { Fragment } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import store from 'store2'

// Pages
import Home from './pages/Home'
import Detail from './pages/Detail'
import Books from './pages/Books'
import Login from './pages/Login'
import Forget from './pages/Forget'
import NotFound from './pages/NotFound'
import SignUp from './pages/SignUp'

function App() {
  const hasLogin = store('login')
  return (
    <Router>
      <Switch>
        <Route path='/' exact component={Home} />
        <Route path='/books' component={Books} />
        <Route path='/detail' component={Detail} />

        {/* Auth */}
        {hasLogin
          ? (<Redirect to="/" />)
          : (
            <Fragment>
              <Route path='/login' component={Login} />
              <Route path='/sign-up' component={SignUp} />
              <Route path='/forget' component={Forget} />
            </Fragment>
          )}

        {/* Not Found */}
        <Route path='*' exact component={NotFound} />
      </Switch>
    </Router>
  );
}

export default App;
