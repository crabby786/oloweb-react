import React from 'react';
import Container from '@material-ui/core/Container';
import HomePage from "./Pages/Home";
import  './Styles/css/main.scss'
import {  BrowserRouter, HashRouter as Router} from "react-router-dom";
// import {Router } from 'react-router'
import { createBrowserHistory } from "history";

export default function App(props:any) {
  const history = createBrowserHistory(props);
  return (
    
      <Router basename = "/">      
       <HomePage />
       </Router>
  );
}
