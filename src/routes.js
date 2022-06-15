import React from 'react';
import { BrowserRouter as Router , Route, Switch } from 'react-router-dom';

import Blog from './pages/Blog';
// import Books from './pages/Books';
import CompanyData from './pages/CompanyData';
import Contact from './pages/Contact';
import Valuation from './pages/Valuation';
import Test from './pages/Valuation/Test';
import DividendYield from './pages/DividendYield';
import Graham from './pages/Graham';
import Home from './pages/Home';
import Login from './pages/Login';
// import { RenderingTest } from './pages/RenderingTest';
// import Update from './pages/Update';
import Pricing from './pages/Pricing';
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
        <Route path = "/books" component = {Test} />
        {/* <Route path = "/blog" component = {Blog} /> */}
        <Route path = "/pricing" component = {Pricing} />
        <Route path = "/who-we-are" component = {Whoweare} />
        <Route path = "/contact" component = {Contact} />
        <Route path = "/login" component = {Login} />
        {/* <Route path = "/update" component = {Update} /> */}
        <Route path = "/updatebk" component = {Updatebk} />
      </Switch>
    </Router>  

  );
}
