import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import firebase from "firebase";
import {BrowserRouter} from "react-router-dom";
import {ThemeProvider} from '@material-ui/core/styles';
import Theme from "./theme/Theme";
import {Provider} from "react-redux";
import Store from "./store/Store";

require('dotenv').config();

const firebaseConfig = {
    apiKey: process.env["REACT_APP_API_KEY"],
    authDomain: process.env["REACT_AUTH_DOMAIN"],
    databaseURL: process.env["REACT_APP_DATABASE"],
    projectId:  process.env["REACT_APP_PROJECT_ID "],
    storageBucket: process.env["REACT_APP_STORAGE_BUCKET "],
    messagingSenderId: process.env["REACT_APP_MESSAGESENDER"],
    appId:process.env["REACT_APP_APP_ID "]
};

firebase.initializeApp(firebaseConfig);

ReactDOM.render(
    <React.StrictMode>
        <Provider store={Store}>
            <ThemeProvider theme={Theme}>
                <BrowserRouter>
                    <App/>
                </BrowserRouter>
            </ThemeProvider>
        </Provider>
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
