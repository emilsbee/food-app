// External imports 
import { thunk, action, computed, thunkOn, actionOn } from 'easy-peasy';
import uniqid from 'uniqid'
import moment from 'moment'

// Internal imports 
import database from '../components/firebase/firebase'
import { store } from '../index'
import {weekStructure} from '../utils/structure'

const groceriesModel = {
    categoryNames: false,
    unsortedGroceries: false,
    startWeekGroceriesListener: thunk(async (actions, payload) => {
        const uid = store.getState().auth.uid

        var weekid;

        if (payload.weekid === null) {
            var weekNr = moment().isoWeek()
            var year = moment().year()

            weekid = await database.ref(`users/${uid}/yearWeekNumbers/${year}_${weekNr}`).once('value')
        }


        if (weekid !== null) {
            var weekGroceriesRef = database.ref(`users/${uid}/weeks/${payload.weekid}/groceries`)
            weekGroceriesRef.on('value', function(snapshot) {
                if (snapshot.val()) {
                    var groceries = snapshot.val()
                    var nonEmptyGroceries = []
    
                    Object.keys(groceries).forEach((groceryid) => {
                        if (groceries[groceryid].product.trim() !== '') {
                            var groceryObj = {}
                            groceryObj[groceryid] = groceries[groceryid]
                            nonEmptyGroceries.push(groceryObj)
                        }
                    })
    
                    if (nonEmptyGroceries.length !== 0) {
                        actions.setGroceries({type: 'UNSORTED_ALL', groceries: nonEmptyGroceries})
                    }
                } 
            })
        }
    }),
    stopWeekGroceriesListener: thunk(async (actions, payload) => {
        const uid = store.getState().auth.uid
        await database.ref(`users/${uid}/weeks`).off()
        actions.setGroceries({type: 'EMPTY'})
    }),
    setGroceries: action((state, payload) => {
        switch(payload.type) {
            case 'UNSORTED': 
                state.unsortedGroceries.push(payload.grocery)
                break;
            case 'UNSORTED_ALL': 
                state.unsortedGroceries = payload.groceries
            case 'SORTED':
                if (payload.category && state.sortedGroceries[payload.category]) {
                    state.sortedGroceries[payload.category].push(payload.grocery)
                }
                
                break;
            case 'EMPTY':
                state.categoryNames = false
                state.unsortedGroceries = false
                break;
        }
    }),
    startCategoryNameListener: thunk(async (actions, payload) => {
        const uid = store.getState().auth.uid
  
        var categoryNameRef = database.ref(`users/${uid}/groceryCategories`)
        categoryNameRef.on('value', function(snapshot) {
            if (snapshot.val() !== null) {
                actions.setSortedGroceryCategoryNames(snapshot.val())
            }
        })
    }),
    stopCategoryNameListener: thunk(async (actions, payload) => {
        const uid = store.getState().auth.uid
        await database.ref(`users/${uid}/groceryCategoryNames`).off()
        actions.setGroceries({type: 'EMPTY'})
    }),
    setSortedGroceryCategoryNames: action((state, payload) => {
        state.categoryNames = payload
    }),
    onAddGrocery: thunkOn(
        actions => actions.addGrocery,

        async (actions, target) => {
            
        }
    ),
    addGrocery: thunk(async (actions, payload) => {
        const uid = store.getState().auth.uid
        
        const groceryCategoryid = Object.keys(payload.grocery)[0]
        const product = payload.grocery[groceryCategoryid].product
        const amount = payload.grocery[groceryCategoryid].amount        
        
        var updates = {}
        
        var categoryid;
        if (payload.type === 'NEW_CATEGORY') {
            categoryid = uniqid()
            updates[`users/${uid}/groceryCategories/${categoryid}`] = payload.category
        } else {
            categoryid = payload.category
        }

        updates[`users/${uid}/groceries/${product}`] = categoryid
        updates[`users/${uid}/groceryCategoryList/${categoryid}/${product}`] = true

        return await database.ref().update(updates)
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