import { weekStructure } from "../../../utils/structure"
import uniqid from 'uniqid'

export const addIngredientToGroceries = ({
    week,
    setWeek,
    data
}) => {
    var groceries = week.groceries
    var weekGroceryKeys = Object.keys(groceries)

    const emptyIndex = weekGroceryKeys.findIndex(key => groceries[key].product.trim() === '' && groceries[key].amount.trim() === '')
    
    if (emptyIndex !== -1) {
        groceries[weekGroceryKeys[emptyIndex]]['product'] = data
        setWeek({
            type: 'UPDATE_GROCERY_PRODUCT',
            groceryid: weekGroceryKeys[emptyIndex],
            product: data
        })
    } else {
        var groceryid = uniqid()
        groceries[groceryid] = {
            product: data,
            amount: ''
        }
        setWeek({
            type: 'NEW_GROCERY',
            groceryid,
            product: data,
            amount: ''
        })
    }
} 