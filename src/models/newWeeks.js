// External imports 
import { thunk, action, computed } from 'easy-peasy';


// Internal imports 
import database from '../components/firebase/firebase'
import { store } from '../index'
import {weekStructure} from '../utils/structure'

const newWeeksModel = {
    yearWeeks: [],
    years: [],
    week: null,
    otherUser: thunk(async (actions, payload) => {
        const uid = store.getState().auth.uid
        // await database.ref(`users/${uid}/recipeCategories`).set({"-M60uTdyxDK5wgF7XSZN":{"Vegetarian": true}})
        await database.ref(`users/${uid}/categoryRecipes`).set({"Vegetarian": {"Shakshuka": "-M60uTdyxDK5wgF7XSZN"}})
        // await database.ref(`users/${uid}/recipeCategoryNames`).set({"Vegetarian": true})
    }),
    startWeekListener: thunk( async(actions, payload) => {
        const uid = store.getState().auth.uid
        var weekid;

        switch (payload.type) {
            case 'LATEST_WEEK': 
                if (payload.year) {
                    var latestWeekid = await database.ref(`users/${uid}/yearWeeks/${payload.year}`).orderByKey().limitToLast(1).once('value')
                } else {
                    var latestWeekid = await database.ref(`users/${uid}/yearWeekNumbers`).orderByKey().limitToLast(1).once('value')
                }
                weekid = latestWeekid.val()[Object.keys(latestWeekid.val())]
                break;
                
            case 'NEXT_WEEK':
                var nextWeek = await database.ref(`users/${uid}/yearWeekNumbers/${payload.year}_${payload.weekNr+1}`).once('value')
                if (nextWeek.val() !== null) {
                    weekid = nextWeek.val()
                } else {
                    weekid = payload.weekid
                }
                break;
            case 'SPECIFIC_WEEK': 
                var week = await database.ref(`users/${uid}/yearWeeks/${payload.year}/${payload.weekNr}`).once('value')
                if(week.val() !== null) {
                    weekid = week.val()
                } else {
                    weekid = payload.weekid
                }
                break;
            case 'PREVIOUS_WEEK':
                var nextWeek = await database.ref(`users/${uid}/yearWeekNumbers/${payload.year}_${payload.weekNr-1}`).once('value')  
                if (nextWeek.val() !== null) {
                    weekid = nextWeek.val() 
                    
                } else {
                    weekid = payload.weekid
                }
                break;
                
        }
        var weekRef = database.ref(`users/${uid}/weeks/${weekid}`)
        weekRef.on('value', function(snapshot) {
            var weekObj = snapshot.val()
            weekObj["weekid"] = snapshot.key
            
            actions.populateWeekRecipes(weekObj)
        })   
    }),
    stopWeekListener: thunk(async (actions, payload) => {
        const uid = store.getState().auth.uid
        await database.ref(`users/${uid}/weeks/`).off()
        actions.setWeek(null)
    }),
    populateWeekRecipes: thunk(async(actions, payload) => {
        const uid = store.getState().auth.uid
        var recipeArr = []
        for(let [key, value] of Object.entries(payload.recipes)) {
            if (value.recipeid !== "") {
                var recipe = await database.ref(`users/${uid}/recipes/${value.recipeid}`).once('value')
                recipeArr.push({recipeid: value.recipeid, recipe: recipe.val(), day: key})
            } else {
                recipeArr.push({day: key, recipe:"", recipeid: ""})
            }
        }
        payload.recipes = recipeArr
        actions.setWeek(payload)
    }), 
    updateWeek: thunk(async (actions, payload) => {
        const uid = store.getState().auth.uid

        switch(payload.type) {
            case "GROCERY_UPDATE": 
                await database.ref(`users/${uid}/weeks/${payload.weekid}/groceries/${payload.groceryid}`).set(payload.nextValue)
                break;
            case 'GROCERY_ADD':
                await database.ref(`users/${uid}/weeks/${payload.weekid}/groceries`).push({product: "", amount: ""})
                break;
            case 'TOTAL_UPDATE':
                await database.ref(`users/${uid}/weeks/${payload.weekid}`).update({total: payload.total})
                break;
            case 'RECIPE_UPDATE':
                await database.ref(`users/${uid}/weeks/${payload.weekid}/recipes/${payload.day}`).update({recipeName: payload.recipeName, recipeid: payload.recipeid})
                break;
        }
    }),
    newWeek: thunk(async (actions, payload) => {
        const uid = store.getState().auth.uid
        var latestWeekInYear = await database.ref(`users/${uid}/yearWeeks/${payload.year}`).orderByKey().limitToLast(1).once('value')
        
        const newWeekid = await database.ref(`users/${uid}/weeks`).push({
            ...weekStructure,
            weekNr: parseInt(Object.keys(latestWeekInYear.val())[0]) + 1,
            year: payload.year,
            year_weekNr: `${payload.year}_${parseInt(Object.keys(latestWeekInYear.val())[0]) + 1}`
        }).key

        var updates = {}
        updates[`users/${uid}/yearWeekNumbers/${payload.year}_${parseInt(Object.keys(latestWeekInYear.val())[0]) + 1}`] = newWeekid
        updates[`users/${uid}/yearWeeks/${payload.year}/${parseInt(Object.keys(latestWeekInYear.val())[0]) + 1}`] = newWeekid
        await database.ref().update(updates)

        actions.startWeekListener({type: 'SPECIFIC_WEEK', year: payload.year, weekNr: parseInt(Object.keys(latestWeekInYear.val())[0]) + 1})
    }),
    newYear: thunk(async (actions, payload) => {
        const uid = store.getState().auth.uid
        var latestYear = Math.max(...store.getState().newWeeks.years)

        const newWeekid = await database.ref(`users/${uid}/weeks`).push({
            ...weekStructure,
            weekNr: 1,
            year: latestYear+1,
            year_weekNr: `${latestYear+1}_1`
        }).key

        var updates = {}
        updates[`users/${uid}/yearWeekNumbers/${latestYear+1}_1`] = newWeekid
        updates[`users/${uid}/yearWeeks/${latestYear+1}/1`] = newWeekid
        updates[`users/${uid}/years/${latestYear+1}`] = true
        await database.ref().update(updates)
        
        actions.startWeekListener({type: 'SPECIFIC_WEEK', year: latestYear+1, weekNr: 1})
    }),
    startYearListener: thunk(async (actions, payload) => {
        const uid = store.getState().auth.uid

        var yearRef = database.ref(`users/${uid}/years`)
        yearRef.on('value', function(snapshot) {
            var years = snapshot.val()
            var parsedYears = Object.keys(years).map((year) => parseInt(year)).sort((a,b) => b - a)
            actions.setYears(parsedYears)
        }) 
    }),
    stopYearListener: thunk(async (actions, payload) => {
        const uid = store.getState().auth.uid
        await database.ref(`users/${uid}/years`).off()
        actions.setYears([])
    }),
    startYearWeekListener: thunk(async (actions, payload) => {
        const uid = store.getState().auth.uid
        var year = payload.year ? payload.year : ''
        
        switch (payload.type) {
            case 'LATEST_YEAR': 
                const latestYear = await database.ref(`users/${uid}/years`).orderByKey().limitToLast(1).once('value')
                year = Object.keys(latestYear.val())[0]
                break;
            
        }
        
        var yearWeekRef = database.ref(`users/${uid}/yearWeeks/${year}`)
        yearWeekRef.on('value', function(snapshot) {
            var yearWeeks = snapshot.val()
            var parsedYearWeeks = Object.keys(yearWeeks).map((yearWeek) => parseInt(yearWeek)).sort((a,b) => b - a)
            actions.setYearWeeks(parsedYearWeeks)
        }) 
    }),
    stopYearWeekListener: thunk(async (actions, payload) => {
        const uid = store.getState().auth.uid
        await database.ref(`users/${uid}/yearWeeks`).off()
        actions.setYearWeeks([])
    }),
    setYearWeeks: action((state,payload) => {
        state.yearWeeks = payload
    }),
    setYears: action((state, payload) => {
        state.years = payload
    }),
    setWeek: action ((state, payload) => {
        state.week = payload
    })

}


export default newWeeksModel