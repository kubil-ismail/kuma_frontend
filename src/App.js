import React, { Fragment } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import store from 'store2'

// Use Redux
import { Provider } from 'react-redux'
import reduxStore from './redux/store'

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
import Genres from './pages/Genres';
import adminGenre from './pages/admin/adminGenre';
import adminAuthor from './pages/admin/adminAuthor';

function App() {
  const role = store('role')
  const adminLogin = store('adminLogin')
  return (
    <Provider store={reduxStore}>
      <Router>
        <Switch>
          <Route path='/' exact component={Home} />
          <Route path='/books/:genre' exact component={Genres} />
          <Route path='/profile' component={Profile} />
          
          {/* Auth */}
          <Route path='/login' component={Login} />
          <Route path='/sign-up' component={SignUp} />
          <Route path='/forget' component={Forget} />
        </Switch>
        <Switch>
          {adminLogin && role === 2
            ? (
              <Fragment>
                <Route path='/dashboard' exact component={Books} />
                <Route path='/books' exact component={adminBooks} />
                <Route path='/genres' exact component={adminGenre} />
                <Route path='/authors' exact component={adminAuthor} />
                <Route path='/detail/:bookName' component={adminDetail} />
              </Fragment>
            ) : (
              <Fragment>
                <Route path='/books' exact component={Books} />
                <Route path='/detail/:bookName' component={Detail} />
              </Fragment>
            )
          }
        </Switch>
      </Router>
    </Provider>
  )
}

export default App
