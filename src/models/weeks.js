// External imports 
import { thunk, action, computed } from 'easy-peasy';


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

                    for (var i = 0; i < weekObj.recipes.length; i++) {
                        if (weekObj.recipes[i].recipeID !== '') {
                            var recipe = await database.ref(`users/${uid}/recipes/${weekObj.recipes[i].recipeID}`).once('value')
                            weekObj.recipes[i]["recipeID"] = recipe.val()
                            weekObj.recipes[i]["recipeID"].recipeID = recipe.key
                        }
                    }

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

            for (var j = 0; j < weekObj.recipes.length; j++) {
                if (weekObj.recipes[j].recipeID !== '') {
                    var recipe = await database.ref(`users/${uid}/recipes/${weekObj.recipes[j].recipeID}`).once('value')
                    weekObj.recipes[j]["recipeID"] = recipe.val()
                    weekObj.recipes[j]["recipeID"].recipeID = recipe.key
                }
            }

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

            for (var i = 0; i < weekObj.recipes.length; i++) {
                if (weekObj.recipes[i].recipeID !== '') {
                    var recipe = await database.ref(`users/${uid}/recipes/${weekObj.recipes[i].recipeID}`).once('value')
                    weekObj.recipes[i]["recipeID"] = recipe.val()
                    weekObj.recipes[i]["recipeID"].recipeID = recipe.key
                }
            }

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
                week_year: `1_${new Date().getFullYear()}`,
                groceries: [{product: '', amount: ''},{product: '', amount: ''},{product: '', amount: ''},{product: '', amount: ''},{product: '', amount: ''},{product: '', amount: ''},{product: '', amount: ''},{product: '', amount: ''},{product: '', amount: ''},{product: '', amount: ''}]
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
                week_year: `${newWeekNr}_${payload.year}`,
                groceries: [{product: '', amount: ''},{product: '', amount: ''},{product: '', amount: ''},{product: '', amount: ''},{product: '', amount: ''},{product: '', amount: ''},{product: '', amount: ''},{product: '', amount: ''},{product: '', amount: ''},{product: '', amount: ''}]
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
                week_year: `1_${new Date().getFullYear()}`,
                groceries: [{product: '', amount: ''},{product: '', amount: ''},{product: '', amount: ''},{product: '', amount: ''},{product: '', amount: ''},{product: '', amount: ''},{product: '', amount: ''},{product: '', amount: ''},{product: '', amount: ''},{product: '', amount: ''}]
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
                week_year: `1_${latestYear}`,
                groceries: [{product: '', amount: ''},{product: '', amount: ''},{product: '', amount: ''},{product: '', amount: ''},{product: '', amount: ''},{product: '', amount: ''},{product: '', amount: ''},{product: '', amount: ''},{product: '', amount: ''},{product: '', amount: ''}]
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

        switch (payload.type) {
            case 'TOTAL':
                await database.ref(`users/${uid}/weeks/${payload.id}`).update({total: payload.total})
                var weekObj = store.getState().weeks.week
                weekObj.total = payload.total
                actions.setWeek(weekObj)
                break;
            case 'RECIPE': 
                var dayIndex;

                switch (payload.day) {
                    case 'Monday':
                        dayIndex = 0;
                        break;
                    case 'Tuesday':
                        dayIndex = 1;
                        break;
                    case 'Wednesday':
                        dayIndex = 2;
                        break;
                    case 'Thursday':
                        dayIndex = 3;
                        break;    
                    case 'Friday':
                        dayIndex = 4;
                        break;
                    case 'Saturday':
                        dayIndex = 5;
                        break;
                    case 'Sunday':
                        dayIndex = 6;
                        break;
                }   
                await database.ref(`users/${uid}/weeks/${payload.id}/recipes/${dayIndex}`).update({recipeID: payload.recipeID})
                var recipe = await database.ref(`users/${uid}/recipes/${payload.recipeID}`).once('value')
                var weekObj = store.getState().weeks.week
                weekObj.recipes[dayIndex].recipeID = recipe.val()
                weekObj.recipes[dayIndex]["recipeID"].recipeID = payload.recipeID
                actions.setWeek(weekObj)
                break;
        }

        
        
        // const newWeek = await database.ref(`users/${uid}/weeks/${payload.id}`).once('value')

        // // Add the firebase week id to the redux store week object
        // if (newWeek.val() === null) {
        //     return 
        // } else {
        //     const weekObj = newWeek.val()
        //     weekObj["id"] = payload.id
            
        //     actions.setWeek(weekObj)
        // }
    }),
    beginFirstWeek: thunk(async (actions, payload) => {
        const uid = store.getState().auth.uid
        var weekObj = {
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
            week_year: `1_${new Date().getFullYear()}`,
            groceries: [{product: '', amount: ''},{product: '', amount: ''},{product: '', amount: ''},{product: '', amount: ''},{product: '', amount: ''},{product: '', amount: ''},{product: '', amount: ''},{product: '', amount: ''},{product: '', amount: ''},{product: '', amount: ''}]
        }

        // The new week object is added to user's weeks 
        database.ref(`users/${uid}/weeks`).push(weekObj).then((data) => {
            // The weeks id (from firebase) is added as a property when stored in the redux store's state
            weekObj["id"] = data.getKey()
             actions.setWeek(weekObj)
        })     
    }),
    addGrocery: thunk(async (actions, payload) => {
        const uid = store.getState().auth.uid
        const groceryID = parseInt(payload.groceryID)
        
        var weekObj = store.getState().weeks.week

        switch (payload.type) {
            case 'PRODUCT_UPDATE':
                await database.ref(`users/${uid}/weeks/${payload.id}/groceries/${groceryID}`).update({product: payload.item})
                weekObj.groceries[groceryID].product = payload.item
                break;
            case 'PRODUCT_ADD':
                break;
            case 'AMOUNT_UPDATE':
                await database.ref(`users/${uid}/weeks/${payload.id}/groceries/${groceryID}`).update({amount: payload.item})
                weekObj.groceries[groceryID].amount = payload.item
                break;
            case 'AMOUNT_ADD':
                break;
            case 'RECIPE_INGREDIENT_PRODUCT_ADD':
                if (groceryID === -1) {
                    
                } else {
                    await database.ref(`users/${uid}/weeks/${payload.id}/groceries/${groceryID}`).update({product: payload.item})
                    weekObj.groceries[groceryID].product = payload.item
                }
                break;
        }

        actions.setWeek(weekObj)    
    }),
    fetchWeek: thunk(async (actions, payload) => {
        var categorisedGroceries; 
        const uid = store.getState().auth.uid
        const week = await database.ref(`users/${uid}/weeks/${payload.id}`).once('value')
        var tempWeek = week.val()
        tempWeek["id"] = week.key
        actions.setWeek(tempWeek)

        
        return tempWeek
    }),
    addCategory: thunk(async (actions, payload) => {
        const uid = store.getState().auth.uid
        // const category = await database.ref(`users/${uid}/categories/Meat`).once('value')
        // console.log(category.val().groceries[1])
        // await database.ref(`users/${uid}/categories/-M6-UMpPA6uXRbsaOSvE/groceries`).push({name: 'Beef'}) 
    })
}


export default weeksModel