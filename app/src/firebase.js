import firebase from 'firebase/app';
import 'firebase/firestore';

  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyB0PFi5QD8boB4cVndIEK6Fhk7980isR7c",
    authDomain: "micropayment-store.firebaseapp.com",
    databaseURL: "https://micropayment-store.firebaseio.com",
    projectId: "micropayment-store",
    storageBucket: "micropayment-store.appspot.com",
    messagingSenderId: "224075873109",
    appId: "1:224075873109:web:d65658f5f79615e722cddc"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

export default firebase

