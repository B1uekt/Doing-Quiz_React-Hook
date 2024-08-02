import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/global.scss';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from "react-router-dom";
import WebLayout from './routes/WebLayout';
import { Provider } from 'react-redux';
import { store, persistor } from './redux/store';
import { PersistGate } from 'redux-persist/integration/react'
import 'react-perfect-scrollbar/dist/css/styles.css';
import 'nprogress/nprogress.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import "react-awesome-lightbox/build/style.css";
import './utils/i18n'



const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <BrowserRouter>
        <WebLayout />
      </BrowserRouter>
    </PersistGate>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
