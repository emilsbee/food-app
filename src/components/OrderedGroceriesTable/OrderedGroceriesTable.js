// External imports
import React, { useEffect } from 'react'
import { useStoreActions, useStoreState } from 'easy-peasy'

// Internal imports


const OrderedGroceriesTable = ({sortedGroceries}) => {
    return (
        <div>
            <table className="ordered-table">
                <thead>
                    <tr>
                        <th>Product</th>
                        <th>Amount</th>
                    </tr>
                </thead>
                
                {Object.keys(sortedGroceries).map((category) => {
                    if (sortedGroceries[category].length !== 0) {
                    return (
                        <tbody key={category}>
                        <tr>
                            <th>{category}</th>
                        </tr>
                        {sortedGroceries[category].map((grocery) => {
                            return (
                                <tr className="strikout" key={grocery.groceryid}>
                                    <td className="ordered-data">{grocery.product}</td>
                                    <td className="ordered-data" >{grocery.amount}</td>
                                </tr>
                            )
                        })}
                        </tbody>
                    )
                    }
                })}
                
            </table>
        </div>
    )
}


export default OrderedGroceriesTable