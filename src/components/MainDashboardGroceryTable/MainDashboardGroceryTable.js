// External imports
import React, { useEffect, useState } from 'react'
import { useStoreActions, useStoreState } from 'easy-peasy'
import uniqid from 'uniqid'

// Internal imports
import GroceryListInput from '../GroceryListInput/GroceryListInput'
import './MainDashboardGroceryTable.scss'



const MainDashboardGroceryTable = ({ groceries, weekid, cardAnimationName }) => {
    const setWeek = useStoreActions(actions => actions.newWeeks.setWeek)

    const handleUpdateGroceries = ({ data, type, groceryid }) => {
        if (type === 'PRODUCT') {
            setWeek({ type: 'UPDATE_GROCERY_PRODUCT', groceryid, product: data })
        } else if (type === 'AMOUNT') {
            setWeek({ type: 'UPDATE_GROCERY_AMOUNT', groceryid, amount: data })
        }
    }

    const onClick = () => {
        setWeek({weekid, type:"NEW_GROCERY_SLOT", groceryid: uniqid()})
    }

    const [localTable, setLocalTable] = useState(true)
    const [animName, setAnimName] = useState('fadeIn')
    
    useEffect(() => {

        if (!cardAnimationName) {

            setAnimName('fadeIn')
            setLocalTable(false)
            setLocalTable(true)
            
        } else {
            setAnimName('fadeOut')
            setLocalTable(false)
            setLocalTable(true)
            
        }


    }, [cardAnimationName])

    useEffect(() => {
        setAnimName('fadeIn')
        setLocalTable(false)
        setLocalTable(true)
    }, [weekid])

    return (
        <div id="dashboard-grocery-table-container">
            <div id="dashboard-grocery-table-container-label">
                Week's grocery list
            </div>
            {localTable && groceries &&
            <div id="dashboard-grocery-table" style={{"animationName": animName}}>   
                
                <div id="dashboard-grocery-header-container">
                    <div id="dashboard-grocery-header">Product</div>
                    <div id="dashboard-grocery-header">Amount</div>
                </div>
                
                <div>
                    {Object.keys(groceries).map((groceryid) => {
                        
                        return (
                        <div key={groceryid} id="dashboard-grocery-input-container">
                                <GroceryListInput 
                                    onSubmit={(data) => handleUpdateGroceries({type: 'PRODUCT', data, groceryid})}
                                    item={groceries[groceryid].product}
                                    type={'product'}
                                />
                                
                            
                            
                                <GroceryListInput 
                                    type={'amount'}
                                    onSubmit={(data) => handleUpdateGroceries({type: 'AMOUNT', data, groceryid})}
                                    item={groceries[groceryid].amount}
                                />
                            
                        </div>
                        )
                    }) }     
                
                </div>
                <div id="dashboard-grocery-add-button-container">
                    <button 
                        onClick={onClick}
                        id="dashboard-grocery-add-button"
                    >
                        +
                    </button>
                </div>    
            </div>
            }
            
        </div>
    )
}


export default MainDashboardGroceryTable