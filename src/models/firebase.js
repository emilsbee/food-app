// External imports
import { thunk, action } from "easy-peasy"


// Internal imports
import database, { firebase, googleAuthProvider } from '../components/firebase/firebase'



const firebaseModel = {
    uid: '',
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