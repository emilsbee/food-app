// External imports
import React, { useEffect } from 'react'
import { useStoreActions, useStoreState } from 'easy-peasy'

// Internal imports
import OrderedGroceriesTable from '../OrderedGroceriesTable/OrderedGroceriesTable'
import UnorderedGroceryTable from '../UnorderedGroceryTable/UnorderedGroceryTable'

const OrderedGroceries = (props) => {
    const startGrocerySorting = useStoreActions(actions => actions.groceries.startGrocerySorting) 
    const startCategoryNameListener = useStoreActions(actions => actions.groceries.startCategoryNameListener) 
    const stopCategoryNameListener = useStoreActions(actions => actions.groceries.stopCategoryNameListener) 
    const startWeekGroceriesListener = useStoreActions(actions => actions.groceries.startWeekGroceriesListener) 
    const stopWeekGroceriesListener = useStoreActions(actions => actions.groceries.stopWeekGroceriesListener) 
    const sortedGroceries = useStoreState(state => state.groceries.sortedGroceries)
    const unsortedGroceries = useStoreState(state => state.groceries.unsortedGroceries)
    const categoryNames = useStoreState(state => state.groceries.categoryNames)
   
    useEffect(() => {
        startCategoryNameListener()
        return () => {
            stopCategoryNameListener()
        }
    }, [])

    useEffect(() => {
        startWeekGroceriesListener({weekid: props.match.params.weekid, key: 'ORDERED_GROCERIES'})
        
        return () => {
            stopWeekGroceriesListener()
        }
    },[])


    return (
        <div className="ordered-groceries-container">
            <div className="ordered-groceries-tables">
                {unsortedGroceries.length !== 0 && <UnorderedGroceryTable categoryNames={categoryNames}  unsortedGroceries={unsortedGroceries}/>}
                <div className="ordered-groceries-table">
                    {sortedGroceries && <OrderedGroceriesTable  sortedGroceries={sortedGroceries}/>}
                </div>
            </div>
        </div>
    )
}


export default OrderedGroceries