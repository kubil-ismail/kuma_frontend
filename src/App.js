import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

// Pages
import Home from './pages/Home';
import Detail from './pages/Detail';

export default function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/book" exact />
        <Route path="/book/:id" component={Detail} />
      </Switch>
    </Router>
  );
}
