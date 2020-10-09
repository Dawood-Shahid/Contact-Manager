import firebase from 'firebase';

var Config = {
    apiKey: "AIzaSyDW8atDnZctKEuoR_0VgWCYex-sCLBVqD4",
    authDomain: "webmobilehybridapp.firebaseapp.com",
    databaseURL: "https://webmobilehybridapp.firebaseio.com",
    projectId: "webmobilehybridapp",
    storageBucket: "webmobilehybridapp.appspot.com",
    messagingSenderId: "1065788689805",
    appId: "1:1065788689805:web:85133a7e0e0465dbb801c4",
    measurementId: "G-7L9LNYJPH3"
};
  
const DB = firebase.initializeApp(Config);

export default DB;