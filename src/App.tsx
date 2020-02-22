import React from 'react';
import './Styles/css/main.scss'
import { BrowserRouter, HashRouter as Router, Switch, Route, Redirect } from "react-router-dom";
// import {Router } from 'react-router'
import { createBrowserHistory } from "history";
import { RootRoutes } from "./routes";
import { ThemeProvider } from '@material-ui/core/styles';
import theme from './theme';
import { Provider } from 'react-redux';
import { store } from './Store/Store';

export default function App(props: any) {
  const history = createBrowserHistory(props);
  return (
    <Provider store = {store}>
  <ThemeProvider theme={theme}>
    <Router basename="/">
      <Switch>
        {RootRoutes.map((route, i)=> (
            <Route key={'route'+i}  path={route.path} component={route.component} ></Route>
        ) )}
        <Redirect from='/' to='/home' ></Redirect>        
      </Switch>
    </Router>
  </ThemeProvider>
  </Provider>
  );
}
