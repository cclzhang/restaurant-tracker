import firebase from 'firebase';


  // Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyD4Ovgdxhj-ZdoIxf2P3PW8etBnRpMLnsc",
    authDomain: "ccl-restaurant-tracker.firebaseapp.com",
    databaseURL: "https://ccl-restaurant-tracker.firebaseio.com",
    projectId: "ccl-restaurant-tracker",
    storageBucket: "ccl-restaurant-tracker.appspot.com",
    messagingSenderId: "221018574164",
    appId: "1:221018574164:web:f6bab51aab45495413ccc1",
    measurementId: "G-5572PJX23Z"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;