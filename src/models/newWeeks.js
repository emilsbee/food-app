// External imports 
import { thunk, action, computed } from 'easy-peasy';


// Internal imports 
import database from '../components/firebase/firebase'
import { store } from '../index'

const newWeeksModel = {
    week: null,
    otherUser: thunk(async (actions, payload) => {
        const uid = store.getState().auth.uid
        var totalRef = database.ref(`users/8OgwmTfNRlfoGe72fRiQ4yQRREX2/weeks/-M60vZ_yUSrsrZeZuNBS/total`)
        totalRef.on('value', function(snapshot) {
            console.log(snapshot)
        })
    }),
    startWeekListener: thunk( async(actions, payload) => {
        var weekRef = database.ref(`users/8OgwmTfNRlfoGe72fRiQ4yQRREX2/weeks/-M60vZ_yUSrsrZeZuNBS`)
        weekRef.on('value', function(snapshot) {
            var weekObj = snapshot.val()
            weekObj["weekid"] = snapshot.key
            actions.populateWeekRecipes(weekObj)
        })   
    }),
    stopWeekListener: thunk(async (actions, payload) => {
        await database.ref(`users/8OgwmTfNRlfoGe72fRiQ4yQRREX2/weeks/-M60vZ_yUSrsrZeZuNBS`).off()
        actions.setWeek(null)
    }),
    populateWeekRecipes: thunk(async(actions, payload) => {
        var recipeArr = []

        for(let [key, value] of Object.entries(payload.recipes)) {
            var recipe = await database.ref(`users/8OgwmTfNRlfoGe72fRiQ4yQRREX2/recipes/${value.recipeid}`).once('value')
            recipeArr.push({recipeid: value.recipeid, recipe: recipe.val(), day: key})
        }
        payload.recipes = recipeArr
        actions.setWeek(payload)
    }), 
    addGrocery: thunk(async (actions, payload) => {
        // await database.ref(`users/8OgwmTfNRlfoGe72fRiQ4yQRREX2/weeks/-M60vZ_yUSrsrZeZuNBS/groceries`)
        
    }),
    setWeek: action ((state, payload) => {
        state.week = payload
    })

}


export default newWeeksModel