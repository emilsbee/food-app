// External imports
import { thunk } from "easy-peasy"
import moment from 'moment'
import uniqid from 'uniqid'

// Internal imports
import { store } from '../index'
import database from '../components/firebase/firebase'
import { weekStructure, initRecipeCategoryNames } from '../utils/structure'



const initialiser = {
    initialiseUser: thunk( async (actions, payload) => {
        const uid = store.getState().auth.uid

        const hasData = await database.ref(`users/${uid}/years/${moment().year()}`).once('value')

        if (hasData.val() === null) {
            var updates = {}
            
            const weekNr = moment().isoWeek()
            const year = moment().year()
        
            const newWeekid = await database.ref(`users/${uid}/weeks`).push({
                ...weekStructure,
                weekNr,
                year,
                year_weekNr: `${year}_${weekNr}`
            }).key
    
    
            updates[`users/${uid}/yearWeekNumbers/${year}_${weekNr}`] = newWeekid
            updates[`users/${uid}/yearWeeks/${year}/${weekNr}`] = newWeekid
            updates[`users/${uid}/years/${year}`] = true

            for (var categoryIndex in initRecipeCategoryNames) {        
                    updates[`users/${uid}/recipeCategoryNames/${uniqid()}`] = initRecipeCategoryNames[categoryIndex]
            }
            
        

            await database.ref().update(updates)
        } else {
            return
        }
        
    }) 
    
}


export default initialiser