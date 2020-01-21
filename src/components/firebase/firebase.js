import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'

var firebaseConfig = {
    apiKey: "AIzaSyAmqjpLIFBhgeQydFqzdVCWPMcT7AWi1Oc",
    authDomain: "food-app-development.firebaseapp.com",
    databaseURL: "https://food-app-development.firebaseio.com",
    projectId: "food-app-development",
    storageBucket: "food-app-development.appspot.com",
    messagingSenderId: "379431356232",
    appId: "1:379431356232:web:e39f8991ce7f860749157d",
    measurementId: "G-MTB8F64T9J"
};

firebase.initializeApp(firebaseConfig)

const database = firebase.database()
const googleAuthProvider = new firebase.auth.GoogleAuthProvider()

export { firebase, googleAuthProvider, database as default }