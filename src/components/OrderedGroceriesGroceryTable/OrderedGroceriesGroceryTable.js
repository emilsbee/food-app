// External imports
import React, { useEffect, useState } from 'react'
import { useStoreActions, useStoreState } from 'easy-peasy'

// Internal imports




const OrderedGroceriesGroceryTable = ({ groceries, onSubmit }) => {
    const [item, setItem] = useState('')

    const handleSubmit = (data) => {
        data.e.preventDefault()
        console.log(data)
    }

    return (
        <div>
            <table>   
                <thead>
                <tr>
                    <th>Product</th>
                    <th>Amount</th>
                </tr>
                </thead>
                <tbody>
                    {Object.keys(groceries).map((groceryKey) => {
                        return (
                        <tr key={groceryKey}>
                            <td>
                                <form 
                                    onSubmit={(e) => handleSubmit({type: 'GROCERY_UPDATE', prevValue: groceryKey, nextValue: {product: item, amount: groceries[groceryKey]}, e})} 
                                    onBlur={(e) => handleSubmit({type: 'GROCERY_UPDATE', prevValue: groceryKey, nextValue: {product: item, amount: groceries[groceryKey]}, e})}
                                >
                                    <input type="text" value={groceryKey} onChange={(e) => setItem(e.target.value)}></input>
                                </form>
                            </td>
                            <td>
                                <form
                                    onSubmit={(e) => handleSubmit({type: 'GROCERY_UPDATE', prevValue: {groceryKey:groceries[groceryKey]}, e})} 
                                    onBlur={(e) => handleSubmit({type: 'GROCERY_UPDATE', prevValue: {groceryKey:groceries[groceryKey]}, e})}
                                >
                                    <input defaultValue={groceries[groceryKey]}></input>
                                </form>
                            </td>
                        </tr>
                        )
                    }) }     
                   
                </tbody>
            </table>
        </div>
    )
}


export default OrderedGroceriesGroceryTable