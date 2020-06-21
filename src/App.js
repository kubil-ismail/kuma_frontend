import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

// Pages
import Home from './pages/Home';
import Books from './pages/Books';
import Detail from './pages/Detail';
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

        {/* Auth */}
        <Route path="/login" component={Login} />
        <Route path="/sign-up" component={SignUp} />
        <Route path="/activate" component={Activate} />
      </Switch>
    </Router>
  );
}
