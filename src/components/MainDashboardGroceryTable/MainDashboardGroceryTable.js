// External imports
import React, { useEffect, useState } from 'react'
import { useStoreActions, useStoreState } from 'easy-peasy'

// Internal imports
import GroceryListInput from '../GroceryListInput/GroceryListInput'
import './MainDashboardGroceryTable.scss'



const MainDashboardGroceryTable = ({ groceries, weekid, cardAnimationName }) => {
    const updateWeek = useStoreActions(actions => actions.newWeeks.updateWeek)
    

    const startUpdateGrocery = (data) => {
        updateWeek({
            type: data.type,
            product: data.product,
            nextValue: data.nextValue,
            weekid,
            groceryid: data.groceryid
        })
    }

    const onClick = () => {
        updateWeek({weekid, type:"GROCERY_ADD"})
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
                                    onSubmit={(data) => startUpdateGrocery({type: 'GROCERY_UPDATE', product: groceries[groceryid].product, nextValue: {product: data, amount: groceries[groceryid].amount}, groceryid})}
                                    item={groceries[groceryid].product}
                                    type={'product'}
                                />
                                
                            
                            
                                <GroceryListInput 
                                    type={'amount'}
                                    onSubmit={(data) => startUpdateGrocery({type: 'GROCERY_UPDATE', product: groceries[groceryid].product, nextValue: {product: groceries[groceryid].product, amount: data}, groceryid})}
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