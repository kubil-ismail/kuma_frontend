import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

// Pages
import Home from './pages/Home';
import Books from './pages/Books';
import Detail from './pages/Detail';
import Genre from './pages/Genre';

import Favorite from './pages/member/Favorite';

import Login from './pages/auth/Login';
import SignUp from './pages/auth/SignUp';
import Activate from './pages/auth/Activate';

export default function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/book" exact component={Books} />
        <Route path="/book/:id" component={Detail} />
        <Route path="/genre/:id" component={Genre} />

        {/* Profile */}
        <Route path="/profile" component={Favorite} />

        {/* Auth */}
        <Route path="/login" component={Login} />
        <Route path="/sign-up" component={SignUp} />
        <Route path="/activate" component={Activate} />
      </Switch>
    </Router>
  );
}
