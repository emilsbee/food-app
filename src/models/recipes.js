// External imports
import { thunk, action } from "easy-peasy"


// Internal imports
import database from '../components/firebase/firebase'
import { store } from '../index'

const recipesModel = {
    currentRecipe: false,
    recipeCategories: [],
    recipes: [],
    recipeCategoryNames: [],
    startRecipeCategoryNamesListener: thunk(async (actions, payload) => {
        const uid = store.getState().auth.uid

        const recipeCategoryNamesRef = await database.ref(`users/${uid}/recipeCategoryNames`)
        recipeCategoryNamesRef.on('value', function (snapshot) {
            actions.setRecipeCategoryNames(Object.keys(snapshot.val()))
        })
    }),
    stopRecipeCategoryNamesListener: thunk(async (actions, payload) => {
        const uid = store.getState().auth.uid
        await database.ref(`users/${uid}/recipeCategoryNames`).off()
        actions.setRecipeCategoryNames([])
    }),
    setRecipeCategoryNames: action((state, payload) => {
        state.recipeCategoryNames = payload
    }),
    addRecipe: thunk(async (actions, payload) => {
        const uid = store.getState().auth.uid
        await database.ref(`users/${uid}/recipes`).push(payload).then((ref) => {
            console.log(ref)
        })
    }),
    setRecipes: action((state, payload) => {
        state.recipes = payload
    }),
    startRecipeNamesListener: thunk(async (actions, payload) => {
        const uid = store.getState().auth.uid
        var recipesArr = []

        const recipeNamesRef = await database.ref(`users/${uid}/recipeNames`)
        recipeNamesRef.on('value', function(snapshot) {
            var recipesObj;
            Object.keys(snapshot.val()).forEach((key) => {
                recipesObj = snapshot.val()[key]
                recipesObj["recipeid"] = key
                recipesArr.push(recipesObj)
            })
            actions.setRecipes(recipesArr)
        })
        
        
    }),
    stopRecipeNamesListener: thunk(async (actions, payload) => {
        const uid = store.getState().auth.uid
        await database.ref(`users/${uid}/recipeNames`).off()
        actions.setRecipes([])
    }),
    startRecipeListener: thunk(async (actions, payload) => {
        const uid = store.getState().auth.uid

        const recipeRef = await database.ref(`users/${uid}/recipes/${payload.recipeid}`)
        recipeRef.on('value', function(snapshot) {
            var recipeObj = snapshot.val()
            recipeObj["recipeid"] = snapshot.key
            actions.setCurrentRecipe(recipeObj)
        })
    
    }),
    stopRecipeListener: thunk(async (actions, payload) => {
        const uid = store.getState().auth.uid

        await database.ref(`users/${uid}/recipes`).off()
        actions.setCurrentRecipe(false)
    }),
    setCurrentRecipe: action((state, payload) => {
        state.currentRecipe = payload
    }),
    updateRecipe: thunk(async (actions, payload) => {
        const uid = store.getState().auth.uid

        var recipeCategoryObj = {}
        recipeCategoryObj[payload.recipeObj.category] = true

        var updates = {}
        updates[`users/${uid}/recipes/${payload.recipeid}`] = payload.recipeObj
        updates[`users/${uid}/recipeNames/${payload.recipeid}`] = payload.recipeNamesObj
        updates[`users/${uid}/recipeCategories/${payload.recipeid}`] = recipeCategoryObj

        return database.ref().update(updates)
    }),
    newRecipe: thunk(async (actions, payload) => {
        const uid = store.getState().auth.uid
        const newRecipe = await database.ref(`users/${uid}/recipes`).push(payload.recipeObj)

        var recipeCategoryObj = {}
        recipeCategoryObj[payload.recipeObj.category] = true

        var updates = {}
        updates[`users/${uid}/recipeNames/${newRecipe.key}`] = payload.recipeNamesObj
        updates[`users/${uid}/recipeCategories/${newRecipe.key}`] = recipeCategoryObj

        return database.ref().update(updates)
    })
}


export default recipesModel