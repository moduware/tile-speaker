import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

/*global Moduware */

if (window.ModuwareAPIIsReady) {
  console.log('moduware detected')
  // ApiReadyActions();
} else {
  console.log('no moduware detected');
  document.addEventListener('WebViewApiReady', () => ApiReadyActions(), { once: true });
}

function ApiReadyActions() {
  console.log('API ready actions fired!');
  if(Moduware) {
    console.log(Moduware.Arguments.language);
  }
}