// External imports
import { thunk, action } from "easy-peasy"


// Internal imports
import database, { firebase } from '../components/firebase/firebase'
import { store } from '../index'

const recipesModel = {
    week: {},
    
    // INITIAL WEEK POPULATE ACTION
    populateWeek: thunk(async (actions, payload) => {
        const uid = store.getState().auth.uid
        return database.ref('users/' + uid).once('value').then((snapshot) => {
            if (snapshot.val() === null) {
                database.ref('users/' + uid).set({
                    weeks: {}
                })
            }
        })
        
    }),

    addRecipe: thunk(async (actions, payload) => {
        const uid = store.getState().auth.uid
        await database.ref(`users/${uid}/recipes`).push(payload).then((ref) => {
            console.log(ref)
        })
    }),
    userRecipes: [],
    setUserRecipes: action((state, payload) => {
        var arr = []
        for(var rec in payload) {
            arr.push({
                recipeID: rec,
                ...payload[rec]
            })
        }
        state.userRecipes = arr
    }),
    startSetUserRecipes: thunk(async (actions, payload) => {
        const uid = store.getState().auth.uid
        const recipes = await database.ref(`users/${uid}/recipes`).once('value')
        actions.setUserRecipes(recipes.val())
        
    })
}


export default recipesModel