import React from 'react';
import Container from '@material-ui/core/Container';
import HomePage from "./Pages/Home";
import './Styles/css/main.scss'
import { BrowserRouter, HashRouter as Router, Switch, Route, Redirect } from "react-router-dom";
// import {Router } from 'react-router'
import { createBrowserHistory } from "history";
import Dashboard from './Pages/Dashboard';
import Home from './Pages/Home';
import MerchantList from './Pages/MerchantList';
import { RootRoutes } from "./routes";

export default function App(props: any) {
  const history = createBrowserHistory(props);
  return (

    <Router basename="/">
      <Switch>
        {RootRoutes.map((route, i)=> (
            <Route key={'route'+i}  path={route.path} component={route.component} ></Route>
        ) )}
        <Redirect from='/' to='/home' exact={true} ></Redirect>        
      </Switch>
    </Router>
  );
}
