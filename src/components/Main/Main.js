import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from 'views/Home/Home.js';
import Archived from 'views/Archived/Archived.js';
import Project from 'views/Project/Project.js';
import Single from 'views/Single/Single.js';
import Screen from 'views/Screen/Screen.js';
import Login from 'views/Login/Login.js';
import Register from 'views/Register/Register.js';
import Forgot from 'views/Forgot/Forgot.js';
import Reset from 'views/Reset/Reset.js';
import Account from 'views/Account/Account.js';
import Team from 'views/Team/Team.js';
import Sitemap from 'views/Sitemap/Sitemap.js';
import Sitemapedit from 'views/Sitemapedit/Sitemapedit.js';
import Subscribe from 'views/Subscribe/Subscribe.js';
import Pricing from 'views/Pricing/Pricing.js';
import Features from 'views/Features/Features.js';
import withAuth from 'components/withAuth/withAuth.js';
import Support from 'views/Support/Support.js';
import Invoices from 'views/Invoices/Invoices.js';

export default function Main() {
  return (
    <main>
      <Switch>
        <Route exact path='/' component={Home}/>
        <Route path='/p/:id' component={Project}/>
        <Route path='/singles' component={Single}/>
        <Route path='/projects' component={Home}/>
        <Route path='/archived' component={Archived}/>
        <Route path='/login' component={Login}/>
        <Route path='/forgot' component={Forgot}/>
        <Route path='/reset/:hash' component={Reset}/>
        <Route path='/register' component={Register}/>
        <Route path='/team' component={Team}/>
        <Route path='/sitemap' component={Sitemap}/>
        <Route path='/sitemapedit' component={Sitemapedit}/>
        <Route path='/pro/new_plans' component={Subscribe}/>
        <Route path='/pro/pricing' component={Pricing}/>
        <Route path='/features' component={Features}/>
        <Route path='/account' component={Account}/>
        <Route path='/support' component={Support}/>
        <Route path='/invoices' component={Invoices}/>
        <Route path='/:id/:version' component={Screen}/>
        <Route path='/:id' component={Screen}/>
        
      </Switch>
    </main>
  );
}