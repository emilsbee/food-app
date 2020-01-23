// External imports
import { thunk, action } from "easy-peasy"


// Internal imports
import database, { firebase } from '../components/firebase/firebase'
import { store } from '../index'

const recipesModel = {
    week: {},
    populateWeek: thunk(async (actions, payload) => {
        const uid = store.getState().auth.uid
        return database.ref('users/' + uid).once('value').then((snapshot) => {
            if (snapshot.val() === null) {
                database.ref('users/' + uid).set({
                    weeks: {}
                })
            }
        })
        
    })
}


export default recipesModel