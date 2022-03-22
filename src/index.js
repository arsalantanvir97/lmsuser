import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Provider } from "react-redux";
import store from "./store";
import "react-datepicker/dist/react-datepicker.css";
import 'react-phone-number-input/style.css'
import HttpsRedirect from "react-https-redirect";

import { ToastContainer } from "react-toastify";

ReactDOM.render(
  <Provider store={store}>
     <HttpsRedirect>
  <ToastContainer />
  <App />
  </HttpsRedirect>
</Provider>,
  document.getElementById('root')
);

