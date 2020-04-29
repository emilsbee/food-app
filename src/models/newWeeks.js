// External imports 
import { thunk, action, computed } from 'easy-peasy';


// Internal imports 
import database from '../components/firebase/firebase'
import { store } from '../index'

const newWeeksModel = {
    week: null,
    otherUser: thunk(async (actions, payload) => {
        const uid = store.getState().auth.uid
        var totalRef = await database.ref(`users/${uid}/weeks/-M60vZ_yUSrsrZeZuNBS/groceries/`).push({product: "Beef", amount: "500g"})
        // totalRef.on('value', function(snapshot) {
        //     console.log(snapshot)
        // })
    }),
    startWeekListener: thunk( async(actions, payload) => {
        const uid = store.getState().auth.uid
        var weekRef = database.ref(`users/${uid}/weeks/-M60vZ_yUSrsrZeZuNBS`)
        weekRef.on('value', function(snapshot) {
            var weekObj = snapshot.val()
            weekObj["weekid"] = snapshot.key
            actions.populateWeekRecipes(weekObj)
        })   
    }),
    stopWeekListener: thunk(async (actions, payload) => {
        const uid = store.getState().auth.uid
        await database.ref(`users/${uid}/weeks/-M60vZ_yUSrsrZeZuNBS`).off()
        actions.setWeek(null)
    }),
    populateWeekRecipes: thunk(async(actions, payload) => {
        const uid = store.getState().auth.uid
        var recipeArr = []

        for(let [key, value] of Object.entries(payload.recipes)) {
            var recipe = await database.ref(`users/${uid}/recipes/${value.recipeid}`).once('value')
            recipeArr.push({recipeid: value.recipeid, recipe: recipe.val(), day: key})
        }
        payload.recipes = recipeArr
        actions.setWeek(payload)
    }), 
    addGrocery: thunk(async (actions, payload) => {
        const uid = store.getState().auth.uid

        switch(payload.type) {
            case "GROCERY_UPDATE": 
                await database.ref(`users/${uid}/weeks/${payload.weekid}/groceries/${payload.groceryid}`).set(payload.nextValue)
                break;
            case 'GROCERY_ADD':
                await database.ref(`users/${uid}/weeks/${payload.weekid}/groceries`).push({product: "", amount: ""})
                break;
        }
    }),
    setWeek: action ((state, payload) => {
        state.week = payload
    })

}


export default newWeeksModel