import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

// Pages
import Home from './pages/Home'
import Login from './pages/Login'
import Forget from './pages/Forget'
import NotFound from './pages/NotFound'
import SignUp from './pages/SignUp';

function App() {
  return (
    <Router>
      <Switch>
        <Route path='/' exact component={Home} />

        {/* Auth */}
        <Route path='/login' component={Login} />
        <Route path='/sign-up' component={SignUp} />
        <Route path='/forget' component={Forget} />

        {/* Not Found */}
        <Route path='*' exact component={NotFound} />
      </Switch>
    </Router>
  );
}

export default App;
