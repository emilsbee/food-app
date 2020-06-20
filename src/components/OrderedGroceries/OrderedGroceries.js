// External imports
import React, { useEffect, useState } from 'react'
import { useStoreActions, useStoreState } from 'easy-peasy'

// Internal imports
import { sortGroceries } from './utils/utils'
import OrderedGroceriesNavBar from '../OrderedGroceriesNavBar'
import OrderedGroceriesTable from '../OrderedGroceriesTable/OrderedGroceriesTable'
import UnorderedGroceryTable from '../UnorderedGroceryTable/UnorderedGroceryTable'
import './ordered-groceries.scss'

const OrderedGroceries = (props) => {    
    const startCategoryNameListener = useStoreActions(actions => actions.groceries.startCategoryNameListener) 
    const stopCategoryNameListener = useStoreActions(actions => actions.groceries.stopCategoryNameListener) 
    const categoryNames = useStoreState(state => state.groceries.categoryNames)
    
    const startWeekGroceriesListener = useStoreActions(actions => actions.groceries.startWeekGroceriesListener) 
    const stopWeekGroceriesListener = useStoreActions(actions => actions.groceries.stopWeekGroceriesListener) 
    const unsortedGroceries = useStoreState(state => state.groceries.unsortedGroceries)

    const [localUnsorted, setLocalUnsorted] = useState(false)
    const [localSorted, setLocalSorted] = useState(false)
    const [localCategoryNames, setLocalCategoryNames] = useState(false)
    

    useEffect(() => {
        startCategoryNameListener()
        startWeekGroceriesListener({weekid: props.match.params.weekid, key: 'ORDERED_GROCERIES'})
        return () => {
            stopCategoryNameListener()
            stopWeekGroceriesListener()
            setLocalSorted(false)
            setLocalUnsorted(false)
            setLocalCategoryNames(false)
        }
    }, [])

    useEffect(() => {
        if (unsortedGroceries && categoryNames) {
            sortGroceries({unsortedGroceries, categoryNames, setLocalUnsorted, setLocalSorted, setLocalCategoryNames})
        }
    }, [unsortedGroceries, categoryNames])

    const handleSortGroceries = () => {
        if (unsortedGroceries && categoryNames) {
            sortGroceries({unsortedGroceries, categoryNames, setLocalUnsorted, setLocalSorted, setLocalCategoryNames})
        }
    }

    

    return (
        <div className="ordered-groceries-container">
            <OrderedGroceriesNavBar />
            
            {localUnsorted.length > 0 && 
                <UnorderedGroceryTable 
                    categoryNames={localCategoryNames}  
                    unsortedGroceries={localUnsorted}
                    sortGroceries={handleSortGroceries}
                />
            }
            
            {localSorted && <OrderedGroceriesTable  sortedGroceries={localSorted}/>}
            
            
        </div>
    )
}


export default OrderedGroceries