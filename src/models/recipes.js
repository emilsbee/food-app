// External imports
import { thunk, action } from "easy-peasy"


// Internal imports
import database from '../components/firebase/firebase'
import { store } from '../index'

const recipesModel = {
    currentRecipe: {},
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
        
    }),
    startGetRecipe: thunk(async (actions, payload) => {
        const uid = store.getState().auth.uid
        const recipe = await database.ref(`users/${uid}/recipes/${payload.recipeID}`).once('value')
        actions.setCurrentRecipe(recipe.val())
    }),
    setCurrentRecipe: action((state, payload) => {
        state.currentRecipe = payload
    }),
    updateRecipe: thunk(async (actions, payload) => {
        const uid = store.getState().auth.uid
        return database.ref(`users/${uid}/recipes/${payload.recipeID}`).update(payload.recipe)
    }),
    
}


export default recipesModel