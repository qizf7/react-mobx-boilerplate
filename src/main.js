/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './style.css';

ReactDOM.render(
  <App />,
  document.getElementById('app'),
);

/**
 * HMR
 */
if (process.env.NODE_ENV === 'development') {
  // eslint-disable-next-line
  const reactHotLoader = require('react-hot-loader');
  reactHotLoader.hot(module)(App);
}
