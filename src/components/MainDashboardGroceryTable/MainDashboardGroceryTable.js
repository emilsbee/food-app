// External imports
import React, { useEffect, useState } from 'react'
import { useStoreActions, useStoreState } from 'easy-peasy'

// Internal imports
import GroceryListInput from '../GroceryListInput/GroceryListInput'
import './MainDashboardGroceryTable.scss'


const MainDashboardGroceryTable = ({ groceries, weekid }) => {
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

    return (
        <div>
            {groceries ?
            <table>   
            <thead>
            <tr>
                <th>Product</th>
                <th>Amount</th>
            </tr>
            </thead>
            <tbody>
                {Object.keys(groceries).map((groceryid) => {
                    
                    return (
                    <tr key={groceryid}>
                        <td>
                            <GroceryListInput 
                                onSubmit={(data) => startUpdateGrocery({type: 'GROCERY_UPDATE', product: groceries[groceryid].product, nextValue: {product: data, amount: groceries[groceryid].amount}, groceryid})}
                                item={groceries[groceryid].product}
                            />
                        </td>
                        <td>
                            <GroceryListInput 
                                onSubmit={(data) => startUpdateGrocery({type: 'GROCERY_UPDATE', product: groceries[groceryid].product, nextValue: {product: groceries[groceryid].product, amount: data}, groceryid})}
                                item={groceries[groceryid].amount}
                            />
                        </td>
                    </tr>
                    )
                }) }     
               
            </tbody>
            <tfoot>
                <tr>

                    <td><button onClick={onClick} >+</button></td>
                </tr>
            </tfoot>
        </table>
        : <button onClick={onClick} >+</button> 
            }
            
        </div>
    )
}


export default MainDashboardGroceryTable