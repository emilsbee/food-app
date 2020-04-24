// External imports
import React, { useEffect, useState } from 'react'
import { useStoreActions, useStoreState } from 'easy-peasy'


// Internal imports
import GroceryListInput from "../GroceryListInput/GroceryListInput"



const GroceryList = ({groceries, week}) => {
    const addGrocery = useStoreActions(actions => actions.weeks.addGrocery)
    // Add the index from firebase as a property to the grocery object to use as the key for rendering the grocery
    for (var i = 0; i < groceries.length; i++) {
        groceries[i].id = Object.keys(groceries)[i]
    }
   
    const onSubmit = (data) => {
        addGrocery({id: week.id, groceryID: data.groceryID, item: data.item, type: data.type})
    }

    return (
        <div>
                <h3>Grocery list</h3>
                
                    <div className="grocery-list-product-column">
                    <p>Products</p>
                    {groceries.map((grocery) => {
                        return <GroceryListInput type="PRODUCT_UPDATE" key={grocery.id} groceryID={grocery.id} grocery={grocery.product} onSubmit={onSubmit}/>
                    })}
                    </div>
                
                    <div className="grocery-list-amount-column">
                    <p>Amount</p>
                    {groceries.map((grocery) => {
                        return <GroceryListInput type="AMOUNT_UPDATE" key={grocery.id} groceryID={grocery.id} grocery={grocery.amount} onSubmit={onSubmit}/>
                    })}
                    </div>
        
        </div>
    )
}

export default GroceryList