import React from 'react';
import { BrowserRouter as Router , Route, Switch } from 'react-router-dom';

import Blog from './pages/Blog.js';
import Books from './pages/Books';
import Contact from './pages/Contact.js';
import DiscCashFlow from './pages/DiscCashFlow.js';
import DividendYield from './pages/DividendYield.js';
import Graham from './pages/Graham.js';
import Home from './pages/Home.js';
import Login from './pages/Login.js';
// import Update from './pages/Update.js';
// import Updatebk from './pages/Updatebk.js';
import Whoweare from './pages/Whoweare.js';

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
        {/* <Route path = "/update" component = {Update} />
        <Route path = "/updatebk" component = {Updatebk} /> */}
        <Route path = "/whoweare" component = {Whoweare} />
      </Switch>
    </Router>  

  );
}
