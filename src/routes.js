import React from 'react';
import { BrowserRouter as Router , Route, Switch } from 'react-router-dom';

import Blog from './pages/Blog';
import Books from './pages/Books';
import Contact from './pages/Contact';
import DiscCashFlow from './pages/DiscCashFlow';
import DividendYield from './pages/DividendYield';
import Graham from './pages/Graham';
import Home from './pages/Home';
import Login from './pages/Login';
import Update from './pages/Update';
import Updatebk from './pages/Updatebk';
import Whoweare from './pages/Whoweare';

export default function Routes() {

  return (
  
    <Router>
      <Switch>
        <Route path = "/" exact component = {Home} />
        <Route path = "/blog" component = {Blog} />
        <Route path = "/books" component = {Books} />
        <Route path = "/contact" component = {Contact} />
        <Route path = "/disccashflow" component = {DiscCashFlow} />
        <Route path = "/dividendyield" component = {DividendYield} />
        <Route path = "/graham" component = {Graham} />
        <Route path = "/home" component = {Home} />
        <Route path = "/login" component = {Login} />
        <Route path = "/update" component = {Update} />
        <Route path = "/updatebk" component = {Updatebk} />
        <Route path = "/whoweare" component = {Whoweare} />
      </Switch>
    </Router>  

  );
}
