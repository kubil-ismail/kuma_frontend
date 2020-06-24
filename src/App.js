/* eslint-disable import/no-named-as-default */
import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

// Use Redux
import { Provider } from 'react-redux';
import store from './redux/store';

// Pages
import Home from './pages/Home';
import Books from './pages/Books';
import Detail from './pages/Detail';
import Genre from './pages/Genre';

import Profile from './pages/member/Profile';
import Favorite from './pages/member/Favorite';
import Review from './pages/member/Review';

import Login from './pages/auth/Login';
import SignUp from './pages/auth/SignUp';
import Activate from './pages/auth/Activate';

export default function App() {
  return (
    <Provider store={store}>
      <Router>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/book" exact component={Books} />
          <Route path="/book/:id" component={Detail} />
          <Route path="/genre/:id" component={Genre} />

          {/* Profile */}
          <Route path="/profile" component={Profile} />
          <Route path="/favorite" component={Favorite} />
          <Route path="/review" component={Review} />

          {/* Auth */}
          <Route path="/login" component={Login} />
          <Route path="/sign-up" component={SignUp} />
          <Route path="/activate" component={Activate} />
        </Switch>
      </Router>
    </Provider>
  );
}
