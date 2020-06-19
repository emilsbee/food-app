import database from '../../firebase/firebase'
import {store} from '../../../index'

export const sortGroceries = ({
    unsortedGroceries, 
    categoryNames,
    
    setLocalUnsorted,
    setLocalSorted,
    setLocalCategoryNames
}) => {

    var ordered = []
    var unordered = []

    unsortedGroceries.forEach( async (weekGroceryObj, index) => {
        const uid = store.getState().auth.uid
        var product = Object.values(weekGroceryObj)[0].product
        var groceryCategoryid = await database.ref(`users/${uid}/groceries/${product}`).once('value')

        if (groceryCategoryid.val() !== null) {
            ordered.push({
                ...weekGroceryObj,
                category: categoryNames[groceryCategoryid.val()],
                categoryid: groceryCategoryid.val()
            })
        } else {
            
            unordered.push(weekGroceryObj)
        }

        if (index === unsortedGroceries.length-1) {
            setLocalUnsorted(unordered)
            setLocalSorted(ordered)
            setLocalCategoryNames(categoryNames) 
        }
    })

}