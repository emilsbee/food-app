// External imports
import React, { useEffect, useState } from 'react'
import { useStoreActions, useStoreState } from 'easy-peasy'

// Internal imports
import './ordered-groceries-table.scss'
import { sortGroceries } from '../OrderedGroceries/utils/utils'
import { formatData } from './utils/utils'

const OrderedGroceriesTable = ({sortedGroceries}) => {
    const [localData, setLocalData] = useState(false)
    
    useEffect(() => {   
        setLocalData(formatData({sortedGroceries}))
    }, [sortedGroceries])
    
    return (
        <div id="ordered-grocery-table-container">
            {localData && 
                <div id="ordered-grocery-table">
                    <div id="ordered-grocery-table-title">
                        <div id="ordered-grocery-table-title-text">
                            Categorised groceries
                        </div>
                    </div> 

                    <div id="ordered-grocery-table">
                        {localData.map((groceryObj) => {
                            return (
                                <div 
                                    id="ordered-grocery-container"
                                    key={groceryObj.categoryid}
                                >
                                    <div id="ordered-grocery-category-title">
                                        {groceryObj.category}
                                    </div>

                                    <div id="ordered-grocery-table-grocery-container">
                                        {groceryObj.groceries.map((grocery => {
                                            var groceryid = Object.keys(grocery)[0]
                                            var product = grocery[groceryid].product
                                            var amount = grocery[groceryid].amount
                                            return (
                                                <div id="ordered-grocery-table-grocery" key={groceryid}>
                                                    <div id="ordered-grocery-table-grocery-product">
                                                        {product}
                                                    </div>
                                                    <div id="ordered-grocery-table-grocery-separator">
                                                            
                                                    </div>
                                                    <div id="ordered-grocery-table-grocery-amount">
                                                        {amount}
                                                    </div>
                                                </div>
                                            )
                                        }))}
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            }
        </div>
    )
}


export default OrderedGroceriesTable