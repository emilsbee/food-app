// External imports
import React, { useEffect, useState } from 'react'
import { useStoreActions, useStoreState } from 'easy-peasy'

// Internal imports
import { sortGroceries } from './utils/utils'
import OrderedGroceriesNavBar from '../OrderedGroceriesNavBar'
import OrderedGroceriesTable from '../OrderedGroceriesTable/OrderedGroceriesTable'
import OrderedGroceriesTableHeader from '../OrderedGroceriesTableHeader'
import UnorderedGroceryTable from '../UnorderedGroceryTable/UnorderedGroceryTable'
import './ordered-groceries.scss'

const OrderedGroceries = (props) => {    
    const startCategoryNameListener = useStoreActions(actions => actions.groceries.startCategoryNameListener) 
    const stopCategoryNameListener = useStoreActions(actions => actions.groceries.stopCategoryNameListener) 
    const categoryNames = useStoreState(
        state => state.groceries.categoryNames,
        (prev, next) => {
            return false
        }
    )
    
    const startWeekGroceriesListener = useStoreActions(actions => actions.groceries.startWeekGroceriesListener) 
    const stopWeekGroceriesListener = useStoreActions(actions => actions.groceries.stopWeekGroceriesListener) 
    const unsortedGroceries = useStoreState(
        state => state.groceries.unsortedGroceries,

        (prev, next) => {
            return false
        }
    )

    const [localUnsorted, setLocalUnsorted] = useState([])
    const [localSorted, setLocalSorted] = useState([])
    const [localCategoryNames, setLocalCategoryNames] = useState(false)
    const [activeHeader, setActiveHeader] = useState(false)

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
        setLocalCategoryNames(categoryNames)
        if (unsortedGroceries && categoryNames) {
            sortGroceries({unsortedGroceries, categoryNames, setLocalUnsorted, setLocalSorted})
        } 
        if (localUnsorted.length > 0) {
            setActiveHeader('unsorted')
        } else {
            setActiveHeader('sorted')
        }
    }, [unsortedGroceries, categoryNames])

    useEffect(() => {
        if (localUnsorted.length > 0) {
            setActiveHeader('unsorted')
        } else if (localUnsorted.length > 0) {
            setActiveHeader('sorted')
        }
    }, [localUnsorted, localSorted])

    const handleSortGroceries = () => {
        if (unsortedGroceries && categoryNames) {
            sortGroceries({unsortedGroceries, categoryNames, setLocalUnsorted, setLocalSorted, setLocalCategoryNames})
        }
    }


    return (
        <div className="ordered-groceries-container">
            <OrderedGroceriesNavBar />
            
            { 
                <div id="ordered-groceries-content">
                    <OrderedGroceriesTableHeader setActiveHeader={setActiveHeader} activeHeader={activeHeader}/>

                    {activeHeader === 'unsorted' &&  
                        <UnorderedGroceryTable 
                            categoryNames={categoryNames}  
                            unsortedGroceries={localUnsorted}
                            sortGroceries={handleSortGroceries}
                        />
                    }   

                    {activeHeader === 'sorted' && 
                        <OrderedGroceriesTable  
                            sortedGroceries={localSorted}
                        />
                    }
                </div>
            }

            
            
            
            
            
        </div>
    )
}


export default OrderedGroceries