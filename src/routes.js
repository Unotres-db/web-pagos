import React from 'react';
import { BrowserRouter as Router , Route, Switch } from 'react-router-dom';

import Header from './components/Header';
import Contact from './pages/Contact';
import CompetitionData from './pages/CompetitionData';
import Home from './pages/Home';
import Inversionistas from './pages/Inversionistas';
import Logout from './pages/Logout';
import Login from './pages/Login';

// import ResetPassword from './pages/ResetPassword.jsx';
// import Projects from './pages/Projects';
import Proyectos from './pages/Proyectos';
import Reset from './pages/Reset';
import RollingForecast from './pages/RollingForecast';


export default function Routes() {

  return (
  
    <Router>
      <Header />
      <Switch>
        <Route path = "/" exact component = {Home} />
        <Route path = "/home" component = {Home} />
        <Route path = "/inversionistas" component = {Inversionistas} />
        <Route path = "/logout" component = {Logout} /> 
        <Route path = "/project/:id?" component = {Proyectos} />
        <Route path = "/competition-data" component = {CompetitionData} />
        <Route path = "/contact" component = {Contact} />
        <Route path = "/login" component = {Login} />
        <Route path = "/reset" component = {Reset} />
        <Route path = "/rolling-forecast" component = {RollingForecast} />
      </Switch>
    </Router>

  );
}
