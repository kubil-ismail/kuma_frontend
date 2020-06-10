import React, { Fragment } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import store from 'store2'

// Pages
import Home from './pages/Home'
import Books from './pages/Books'
import Detail from './pages/Detail'
import Profile from './pages/Profile'
import Login from './pages/Login'
import Forget from './pages/Forget'
// import NotFound from './pages/NotFound'
import SignUp from './pages/SignUp'
import adminBooks from './pages/admin/adminBooks';
import adminDetail from './pages/admin/adminDetail';

function App() {
  const hasLogin = store('login')
  const role = store('role')
  const adminLogin = store('adminLogin')
  return (
    <Router>
      <Switch>
        <Route path='/' exact component={Home} />

        {/* Auth */}
        {hasLogin
          ? (
            <Route path='/profile' component={Profile} />
          ) : (
            <Fragment>
              <Route path='/login' component={Login} />
              <Route path='/sign-up' component={SignUp} />
              <Route path='/forget' component={Forget} />
            </Fragment>
          )}
      </Switch>
      <Switch>
        {adminLogin && role === 2
          ? (
            <Fragment>
              <Route path='/books' component={adminBooks} />
              <Route path='/detail/:bookName' component={adminDetail} />
            </Fragment>
          ) : (
            <Fragment>
              <Route path='/books' component={Books} />
              <Route path='/detail/:bookName' component={Detail} />
            </Fragment>
          )
        }
      </Switch>
    </Router>
  );
}

export default App;
