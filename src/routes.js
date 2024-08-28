import React from 'react';
import { BrowserRouter as Router , Route, Switch } from 'react-router-dom';

import Contact from      './pages/Contact';
import CompetitionData from './pages/CompetitionData';
import Home from          './pages/Home';
import Login from         './pages/Login';

// import ResetPassword from './pages/ResetPassword.jsx';
// import Projects from './pages/Projects';
import Proyectos from './pages/Proyectos';
import Reset from './pages/Reset';


export default function Routes() {

  return (
  
    <Router>
      <Switch>
        <Route path = "/" exact component = {Home} />
        <Route path = "/home" component = {Home} />
        <Route path = "/project/:id?" component = {Proyectos} />
        <Route path = "/competition-data" component = {CompetitionData} />
        <Route path = "/contact" component = {Contact} />
        <Route path = "/login" component = {Login} />
        <Route path = "/reset" component = {Reset} />
      </Switch>
    </Router>

  );
}
