// External imports 
import { thunk, action, computed } from 'easy-peasy';


// Internal imports 
import database from '../components/firebase/firebase'
import { store } from '../index'

const newWeeksModel = {
    yearWeeks: [],
    years: [],
    week: null,
    otherUser: thunk(async (actions, payload) => {
        const uid = store.getState().auth.uid
        
        var latestWeekid = await database.ref(`users/${uid}/yearWeeks/${payload.year}`).orderByKey().limitToLast(1).once('value')
        console.log(Object.values(latestWeekid.val())[0])
         
    }),
    startWeekListener: thunk( async(actions, payload) => {
        const uid = store.getState().auth.uid
        var weekid = payload.weekid ? payload.weekid : '';

        switch (payload.type) {
            case 'LATEST_WEEK': 
                if (payload.year) {
                    var latestWeekid = await database.ref(`users/${uid}/yearWeeks/${payload.year}`).orderByKey().limitToLast(1).once('value')
                } else {
                    var latestWeekid = await database.ref(`users/${uid}/yearWeekNumbers`).orderByKey().limitToLast(1).once('value')
                }
                
                weekid = latestWeekid.val()[Object.keys(latestWeekid.val())]
                
            case 'NEXT_WEEK':
                var nextWeek = await database.ref(`users/${uid}/yearWeekNumbers/${payload.year}_${payload.weekNr+1}`).once('value')
                if (nextWeek.val() !== null) {
                    weekid = nextWeek.val()
                } 
            case 'SPECIFIC_WEEK': 
                var week = await database.ref(`users/${uid}/yearWeeks/${payload.year}/${payload.weekNr}`).once('value')
                if(week.val() !== null) {
                    weekid = week.val()
                }
                break;
            case 'PREVIOUS_WEEK':
                var nextWeek = await database.ref(`users/${uid}/yearWeekNumbers/${payload.year}_${payload.weekNr-1}`).once('value')  
                if (nextWeek.val() !== null) {
                    weekid = nextWeek.val()
                    
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
        await database.ref(`users/${uid}/weeks/${payload.weekid}`).off()
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
        }
    }),
    newWeek: thunk(async (actions, payload) => {
        const uid = store.getState().auth.uid
        var weekRef = await database.ref(`users/${uid}/weeks`).push({
            groceries: {

            },
            recipes: {
                Monday: {
                    recipeName: "",
                    recipeid: ""
                },
                Tuesday: {
                    recipeName: "",
                    recipeid: ""
                },
                Wednesday: {
                    recipeName: "",
                    recipeid: ""
                },
                Thursday: {
                    recipeName: "",
                    recipeid: ""
                },
                Friday: {
                    recipeName: "",
                    recipeid: ""
                },
                Saturday: {
                    recipeName: "",
                    recipeid: ""
                },
                Sunday: {
                    recipeName: "",
                    recipeid: ""
                },
            },
            total: 0,
            weekNr: 1,
            year: 2020,
            year_weekNr: "2020_2"
        })
        await database.ref(`users/${uid}/weeks/${weekRef.key}/groceries`).push({product: "", amount: ""})
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
        console.log('here')
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