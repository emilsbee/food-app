// External imports 
import { thunk, action, computed } from 'easy-peasy';


// Internal imports 
import database from '../components/firebase/firebase'
import { store } from '../index'
import {weekStructure} from '../utils/structure'

const groceriesModel = {
    categoryNames: [],
    unsortedGroceries: [],
    sortedGroceries: {},
    startWeekGroceriesListener: thunk(async (actions, payload) => {
        const uid = store.getState().auth.uid
        var weekGroceriesRef = await database.ref(`users/${uid}/weeks/${payload.weekid}/groceries`).once('value')

        if(weekGroceriesRef.val() !== null) {
            var groceryids = Object.keys(weekGroceriesRef.val())
            var groceries = weekGroceriesRef.val()

            groceryids.forEach(async (groceryid) => {
                // Check whether the product field is an empty string. This is possible 
                // because a user might leave a row empty in grocery table on main dashboard.
                if (groceries[groceryid].product !== "") {
                    var productCategory = await database.ref(`users/${uid}/groceries/${groceries[groceryid].product}`).once('value')
                    if (productCategory.val() === null) {
                        var unsortedGroceryObj = {}
                        unsortedGroceryObj[groceryid] = groceries[groceryid]
                        actions.setGroceries({type: 'UNSORTED', grocery: unsortedGroceryObj})
    
                    } else {
                        actions.setGroceries({
                            type: 'SORTED',
                            grocery: {
                                ...groceries[groceryid], groceryid
                            },
                            category: productCategory.val()
                        })
                    }
                }
            })
        }
    }),
    stopWeekGroceriesListener: thunk(async (actions, payload) => {
        const uid = store.getState().auth.uid
        await database.ref(`users/${uid}/weeks`).off()
    }),
    setGroceries: action((state, payload) => {
        switch(payload.type) {
            case 'UNSORTED': 
                state.unsortedGroceries.push(payload.grocery)
                break;
            case 'SORTED':
                if (payload.category) {
                    state.sortedGroceries[payload.category].push(payload.grocery)
                }
                
                break;
            case 'EMPTY':
                state.sortedGroceries = {}
                state.unsortedGroceries = []
                break;
        }
    }),
    startCategoryNameListener: thunk(async (actions, payload) => {
        const uid = store.getState().auth.uid

        var categoryNameRef = database.ref(`users/${uid}/groceryCategoryNames`)
        categoryNameRef.on('value', function(snapshot) {
            actions.setSortedGroceryCategoryNames(Object.keys(snapshot.val()))
        })
    }),
    stopCategoryNameListener: thunk(async (actions, payload) => {
        const uid = store.getState().auth.uid
        await database.ref(`users/${uid}/groceryCategoryNames`).off()
        actions.setGroceries({type: 'EMPTY'})
    }),
    setSortedGroceryCategoryNames: action((state, payload) => {
        var sortedGroceriesObj = {}
        payload.forEach((category) => {
            sortedGroceriesObj[category] = []
        })
        state.sortedGroceries = sortedGroceriesObj
        state.categoryNames = payload
    }),
    addGrocery: thunk(async (actions, payload) => {
        const uid = store.getState().auth.uid
        const unsortedGroceries = store.getState().groceries.unsortedGroceries
        const sortedGroceries = store.getState().groceries.sortedGroceries
        
        var updates = {}

        if (payload.type === 'NEW_CATEGORY') {
            updates[`users/${uid}/groceryCategoryNames/${payload.category}`] = true
        }

        var groceriesObj = {}
        groceriesObj[Object.values(payload.grocery)[0].product] = payload.category
        
        updates[`users/${uid}/groceries/${Object.values(payload.grocery)[0].product}`] = payload.category
        updates[`users/${uid}/groceryCategories/${payload.category}/${Object.values(payload.grocery)[0].product}`] = true

        await database.ref().update(updates)
        actions.setAddGrocery({grocery: payload.grocery, category: payload.category, unsortedGroceries, type: payload.type && payload.type, sortedGroceries})


    }),
    setAddGrocery: action((state, payload) => {
        payload.unsortedGroceries.forEach((unsortedGrocery, index) => {
            
            if (Object.keys(unsortedGrocery)[0] === Object.keys(payload.grocery)[0]) {
                state.unsortedGroceries.splice(index, 1)

                if (payload.type) {
                    var groceryObj = {}
                    groceryObj[payload.category] = [{product: Object.values(payload.grocery)[0].product, amount: Object.values(payload.grocery)[0].amount, groceryid: Object.keys(payload.grocery)[0]}]
                    state.sortedGroceries = {...payload.sortedGroceries, ...groceryObj}
                } else {
                    state.sortedGroceries[payload.category].push({product: Object.values(payload.grocery)[0].product, amount: Object.values(payload.grocery)[0].amount, groceryid: Object.keys(payload.grocery)[0]})    
                }
                
            }
        })
    })
}

export default groceriesModel