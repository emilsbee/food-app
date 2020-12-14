// External imports
import { thunk, action } from "easy-peasy"

// Internal imports
import database, { firebase, googleAuthProvider } from '../components/firebase/firebase'

var validator = require("email-validator");



const firebaseModel = {
    uid: '',
    errorMessage: false,
    addUser: thunk(async (actions, payload) => {
        return database.ref('users/' + payload.userId).set({
            username: payload.name,
            email: payload.email,
        })
    }),
    readUser: thunk(async (actions, payload) => {
        return database.ref('users/' + payload.userId)
            .once('value')
    }),
    startLogin: thunk(async (actions, payload) => {
        await firebase.auth().signInWithPopup(googleAuthProvider)
    }),
    startLoginAnonymously: thunk(async (actions, payload) => {
        firebase.auth().signInAnonymously().catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // ...
        });
          
    }),
    startSignUpWithEmailAndPassword: thunk(async (actions, payload) => {
        if (validator.validate(payload.email)) {
            await firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password).catch(function(error) {
                // Handle Errors here.
                var errorMessage = error.message;
                actions.setErrorMessage(errorMessage)
            })
        } else {
            actions.setErrorMessage('The email address is badly formated.')
        }
    }),
    startLoginWithEmailAndPassword: thunk(async (actions, payload) => {
        if (validator.validate(payload.email)) {
            await firebase.auth().signInWithEmailAndPassword(payload.email, payload.password).catch(function(error) {
                // Handle Errors here.
                var errorMessage = error.message;
                actions.setErrorMessage(errorMessage)
            })
        } else {
            actions.setErrorMessage('The email address is badly formated.')
        }
    }),
    setErrorMessage: action((state, payload) => {
        state.errorMessage = payload
    }),
    login: action((state, payload) => {
        state.uid = payload
    }),
    startLogout: thunk(async (actions, payload) => {
        await firebase.auth().signOut()
    }),
    logout: action((state, payload) => {
        state.uid = ''
    })
    
}


export default firebaseModel