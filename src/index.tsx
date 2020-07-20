import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import 'material-design-icons/iconfont/material-icons.css'
import './Styles/css/fontAwesome.min.css'
import './Styles/css/bootstrap.css';
import './Styles/css/style1.css';
import './Styles/css/main.scss'
import { store } from './Store/Store';

declare global {
  interface Window {
    ReactNativeWebView;
    store:any
  }
}

ReactDOM.render(
  <App />
  ,
  document.querySelector('#root'),
);

window.store = store;

