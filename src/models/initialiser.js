// External imports
import { thunk } from "easy-peasy"
import uniqid from 'uniqid'

// Internal imports
import { store } from '../index'
import database from '../components/firebase/firebase'
import { initRecipeCategoryNames, initGroceryCategoryNames } from '../utils/structure'



const initialiser = {
    initialiseUser: thunk( async (actions, payload) => {
        const uid = store.getState().auth.uid
        const history = payload.history
        const renderApp = payload.renderApp

        database.ref(`users/${uid}/settings/init`).once('value').then(async (hasData) => {
            if (hasData.val() === null) {
                var updates = {}
    
                for (var categoryNameid in initGroceryCategoryNames) {
                    updates[`users/${uid}/groceryCategories/${uniqid()}`] = initGroceryCategoryNames[categoryNameid]
                }    
    
                for (var categoryIndex in initRecipeCategoryNames) {        
                        var recipeid = uniqid()
                        updates[`users/${uid}/recipeCategoryNames/${recipeid}`] = initRecipeCategoryNames[categoryIndex]
                }

                updates[`users/${uid}/settings/init`] = true
    
    
                database.ref().update(updates, function() {
                    renderApp()
                    if (history.location.pathname === '/' || history.location.pathname === '/sign-up') {
                        history.push(`/dashboard`)
                    }
                })
                
            } else {
                renderApp()
                if (history.location.pathname === '/' || history.location.pathname === '/sign-up') {
                    history.push(`/dashboard`)
                }
            }

        })

        
    }) 
    
}


export default initialiser