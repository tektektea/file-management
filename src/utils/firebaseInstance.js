import firebase from "firebase";
import 'firebase/firestore';
require('dotenv').config();

const firebaseConfig = {
    apiKey: process.env["REACT_APP_API_KEY"],
    authDomain: process.env["REACT_APP_AUTH_DOMAIN"],
    databaseURL: process.env["REACT_APP_DATABASE"],
    projectId:  process.env["REACT_APP_PROJECT_ID"],
    storageBucket: process.env["REACT_APP_STORAGE_BUCKET"],
    messagingSenderId: process.env["REACT_APP_MESSAGESENDER"],
    appId:"92909716262:web:415bc0cfa057736f10b7e7"
};
firebase.initializeApp(firebaseConfig);

export default {firebase};
