// External imports 
import { thunk, action } from 'easy-peasy';


// Internal imports 
import database from '../components/firebase/firebase'
import { store } from '../index'

const weeksModel = {
    week: {},
    year: 0,
    populateLatestWeek: thunk(async (actions, payload) => {
        // Get user idea from redux store. This also makes sure that the user is authenticated.
        const uid = store.getState().auth.uid

        // Get reference in the database to the specific users weeks
        const weekRef = database.ref(`users/${uid}/weeks`)

        // Get weeks
        const weeks = await weekRef.once('value')

        // Check whether user has any existing weeks already
        if (weeks.val() === null) {
            return 
        } else {
            // Find the latest year in the user's weeks. 
            var yearValues = []
            for ( var i in weeks.val()) {
                yearValues.push(weeks.val()[i].year)
            }
            const latestYear = Math.max(...yearValues)

            // Get latest year weeks
            const latestYearWeeks = await weekRef.orderByChild('year').equalTo(latestYear).once('value')
            
    
            // Find the latest weekNr in the latest year. 
            var weekNrValues = []
            for ( var i in latestYearWeeks.val()) {
                weekNrValues.push(latestYearWeeks.val()[i].weekNr)
            }
            const latestWeekNr = Math.max(...weekNrValues) 
            
            // Find the latest week object, add it's firebase id to the object, and add it to the redux store state
            for ( var j in latestYearWeeks.val()) {
                if (latestYearWeeks.val()[j].weekNr === latestWeekNr) {
                    const weekObj = latestYearWeeks.val()[j]
                    weekObj["id"] = j
                    actions.setWeek(weekObj)
                }
            }
        }
    }),
    previousWeek: thunk(async (actions, payload) => {
        const uid = store.getState().auth.uid
        const weekRef = database.ref(`users/${uid}/weeks`)
        const previousWeek = await weekRef.orderByChild('week_year').equalTo(`${payload.week.weekNr - 1}_${payload.week.year}`).once('value')
        
        if (previousWeek.val() === null) {
            return  
        } else {
            var weekObj = Object.values(previousWeek.val())[0]
            weekObj.id =  Object.keys(previousWeek.val())[0]
            actions.setWeek(weekObj)
        }
    }),
    nextWeek: thunk(async (actions, payload) => {
        const uid = store.getState().auth.uid
        const weekRef = database.ref(`users/${uid}/weeks`)
        const previousWeek = await weekRef.orderByChild('week_year').equalTo(`${payload.week.weekNr + 1}_${payload.week.year}`).once('value')
        if (previousWeek.val() === null) {
            return 
        } else {
            var weekObj = Object.values(previousWeek.val())[0]
            weekObj.id =  Object.keys(previousWeek.val())[0]
            actions.setWeek(weekObj)
        }
    }),
    startAddWeek: thunk(async (actions, payload) => {
        // Get user idea from redux store. This also makes sure that the user is authenticated.
        const uid = store.getState().auth.uid

        // Check whether the user already has any weeks in database by looking if payload contains anything. 
        // It should contain the current week's year if the user has weeks, otherwise it's undefined. 
        if (payload.year === undefined) {
            // Create the new week's empty object 
            const weekObj = {
                note: '',
                recipes: [
                    {
                        day: 'Monday',
                        recipeID: ''
                    },
                    {
                        day: 'Tuesday',
                        recipeID: ''
                    },
                    {
                        day: 'Wednesday',
                        recipeID: ''
                    },
                    {
                        day: 'Thursday',
                        recipeID: ''
                    },
                    {
                        day: 'Friday',
                        recipeID: ''
                    },
                    {
                        day: 'Saturday',
                        recipeID: ''
                    },
                    {
                        day: 'Sunday',
                        recipeID: ''
                    }
                ],
                total: 0,
                weekNr: 1,
                year: new Date().getFullYear(),
                week_year: `1_${new Date().getFullYear()}`
            }

            // The new week object is added to user's weeks 
            database.ref(`users/${uid}/weeks`).push(weekObj).then((data) => {
                // The weeks id (from firebase) is added as a property when stored in the redux store's state
                weekObj["id"] = data.getKey()
                actions.setWeek(weekObj)

            })
        } else {

            // Get reference in the database to the specific users weeks
            const weekRef = database.ref(`users/${uid}/weeks`)

            // Find the weeks in the year that is specified in payload when calling this function 
            const latestWeek = await weekRef.orderByChild('year').equalTo(payload.year).once('value')

            // Find the latest weekNr in the specified year 
            var weekNrValues = []
            for ( var i in latestWeek.val()) {
                weekNrValues.push(latestWeek.val()[i].weekNr)
            }
            const newWeekNr = Math.max(...weekNrValues) + 1
            

            // Create the new week's empty object 
            const weekObj = {
                note: '',
                recipes: [
                    {
                        day: 'Monday',
                        recipeID: ''
                    },
                    {
                        day: 'Tuesday',
                        recipeID: ''
                    },
                    {
                        day: 'Wednesday',
                        recipeID: ''
                    },
                    {
                        day: 'Thursday',
                        recipeID: ''
                    },
                    {
                        day: 'Friday',
                        recipeID: ''
                    },
                    {
                        day: 'Saturday',
                        recipeID: ''
                    },
                    {
                        day: 'Sunday',
                        recipeID: ''
                    }
                ],
                total: 0,
                weekNr: newWeekNr,
                year: payload.year,
                week_year: `${newWeekNr}_${payload.year}`
            }

            // The new week object is added to user's weeks 
            database.ref(`users/${uid}/weeks`).push(weekObj).then((data) => {
                // The weeks id (from firebase) is added as a property when stored in the redux store's state
                weekObj["id"] = data.getKey()
                actions.setWeek(weekObj)
            })
        }
    }),
    startAddYear: thunk(async(actions, payload) => {
        const uid = store.getState().auth.uid

         // Check whether the user already has any weeks in database by looking if payload contains anything. 
        // It should contain the current week's year if the user has weeks, otherwise it's undefined. 
        if (payload.week.year === undefined) {
            // Create the new week's empty object 
            const weekObj = {
                note: '',
                recipes: [
                    {
                        day: 'Monday',
                        recipeID: ''
                    },
                    {
                        day: 'Tuesday',
                        recipeID: ''
                    },
                    {
                        day: 'Wednesday',
                        recipeID: ''
                    },
                    {
                        day: 'Thursday',
                        recipeID: ''
                    },
                    {
                        day: 'Friday',
                        recipeID: ''
                    },
                    {
                        day: 'Saturday',
                        recipeID: ''
                    },
                    {
                        day: 'Sunday',
                        recipeID: ''
                    }
                ],
                total: 0,
                weekNr: 1,
                year: new Date().getFullYear(),
                week_year: `1_${new Date().getFullYear()}`
            }

            // The new week object is added to user's weeks 
            database.ref(`users/${uid}/weeks`).push(weekObj).then((data) => {
                // The weeks id (from firebase) is added as a property when stored in the redux store's state
                weekObj["id"] = data.getKey()
                actions.setWeek(weekObj)

            })
        } else {
             // Get reference in the database to the specific users weeks
            const weekRef = database.ref(`users/${uid}/weeks`)

            // Find all the weeks from years after the one recieved in payload
            const latestYears = await weekRef.orderByChild('year').startAt(payload.week.year).once('value')
        
            // // Find the latest year in the latestYears 
            var years = []
            for ( var i in latestYears.val()) {
                years.push(latestYears.val()[i].year)
            }
            const latestYear = Math.max(...years) + 1

            // // Create the new week's empty object 
            const weekObj = {
                note: '',
                recipes: [
                    {
                        day: 'Monday',
                        recipeID: ''
                    },
                    {
                        day: 'Tuesday',
                        recipeID: ''
                    },
                    {
                        day: 'Wednesday',
                        recipeID: ''
                    },
                    {
                        day: 'Thursday',
                        recipeID: ''
                    },
                    {
                        day: 'Friday',
                        recipeID: ''
                    },
                    {
                        day: 'Saturday',
                        recipeID: ''
                    },
                    {
                        day: 'Sunday',
                        recipeID: ''
                    }
                ],
                total: 0,
                weekNr: 1,
                year: latestYear,
                week_year: `1_${latestYear}`
            }

            // // The new week object is added to user's weeks 
            database.ref(`users/${uid}/weeks`).push(weekObj).then((data) => {
                // The weeks id (from firebase) is added as a property when stored in the redux store's state
                weekObj["id"] = data.getKey()
                actions.setWeek(weekObj)

            })
             
        }
    }),
    setWeek: action((state, payload) => {
        state.week = payload
    }),
    startUpdateWeek: thunk( async(actions, payload) => {
        const uid = store.getState().auth.uid
        
        await database.ref(`users/${uid}/weeks/${payload.week.id}`).update({total: payload.total})
        
        const newWeek = await database.ref(`users/${uid}/weeks/${payload.week.id}`).once('value')

        // Add the firebase week id to the redux store week object
        const weekObj = newWeek.val()
        weekObj["id"] = payload.week.id

        actions.setWeek(weekObj)
    })
}


export default weeksModel