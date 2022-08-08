import React from 'react';
import { BrowserRouter as Router , Route, Switch } from 'react-router-dom';

import Blog from './pages/Blog';
import Books from './pages/Books';
import CompanyData from './pages/CompanyData';
import Contact from './pages/Contact';
import Valuation from './pages/Valuation';
// import Valuation from './pages/Valuation';
// import Test from './pages/Valuation/Test';
import DividendYield from './pages/DividendYield';
import Graham from './pages/Graham';
import Home from './pages/Home';
import Jokes from './pages/Jokes';
import Login from './pages/Login';
import { RenderingTest } from './pages/RenderingTest';
// import Update from './pages/Update';
import Pricing from './pages/Pricing';
import RenderingDerivedState from './pages/RenderingDerivedState';
import TestApi from './pages/TestApi';
import TestDateFormats from './pages/TestDateFormats';
import TestHistorical from './pages/TestHistorical';
import Updatebk from './pages/Updatebk';
import Whoweare from './pages/Whoweare';

export default function Routes() {

  return (
  
    <Router>
      <Switch>
        <Route path = "/" exact component = {Home} />
        <Route path = "/home" component = {Home} />
        <Route path = "/company-data" component = {CompanyData} />
        <Route path = "/dividend-yield" component = {DividendYield} />
        <Route path = "/graham" component = {Graham} />
        <Route path = "/valuation" component = {Valuation} />
        <Route path = "/books" component = {Books} />
        {/* <Route path = "/blog" component = {Blog} /> */}
        <Route path = "/pricing" component = {TestHistorical} />
        <Route path = "/who-we-are" component = {Whoweare} />
        <Route path = "/contact" component = {Contact} />
        <Route path = "/login" component = {Login} />
        {/* <Route path = "/update" component = {Update} /> */}
        <Route path = "/updatebk" component = {Updatebk} />
      </Switch>
    </Router>  

  );
}
