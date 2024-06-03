import React from 'react';
import { BrowserRouter as Router , Route, Switch } from 'react-router-dom';

import Contact from './pages/Contact';
import CompetitionData from './pages/CompetitionData';
import Home from './pages/Home';
import Login from './pages/Login';
import Projects from './pages/Projects';

export default function Routes() {

  return (
  
    <Router>
      <Switch>
        <Route path = "/" exact component = {Home} />
        <Route path = "/home" component = {Home} />
        <Route path = "/project" component = {Projects} />
        <Route path = "/competition-data" component = {CompetitionData} />
        <Route path = "/contact" component = {Contact} />
        <Route path = "/login" component = {Login} />
      </Switch>
    </Router>

  );
}
