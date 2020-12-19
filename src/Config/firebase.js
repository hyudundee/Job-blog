import firebase from 'firebase'
import 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyCHh1jWZ5BuFO3HKiPG-_WCGZEmdUL0uJg",
  authDomain: "jobblog-b9681.firebaseapp.com",
  databaseURL: "https://jobblog-b9681.firebaseio.com",
  projectId: "jobblog-b9681",
  storageBucket: "jobblog-b9681.appspot.com",
  messagingSenderId: "366138346701",
  appId: "1:366138346701:web:ff74b886729b4c0f27ad84"
};

firebase.initializeApp(firebaseConfig)
firebase.firestore()

export default firebase
