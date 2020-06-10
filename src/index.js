import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

const firebase = require('firebase');
require('firebase/firestore')

const firebaseConfig = {
  apiKey: "AIzaSyCd9SI3fMZxxZg8Y53Rt69r2OSBKEK5H-4",
  authDomain: "evernote-clone-one.firebaseapp.com",
  databaseURL: "https://evernote-clone-one.firebaseio.com",
  projectId: "evernote-clone-one",
  storageBucket: "evernote-clone-one.appspot.com",
  messagingSenderId: "242726794196",
  appId: "1:242726794196:web:537f5307bd472b93c85c41",
  measurementId: "G-4N1LKGP43V"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
