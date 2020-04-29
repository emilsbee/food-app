// External imports
import React, { useEffect } from 'react'
import { useStoreActions, useStoreState } from 'easy-peasy'

// Internal imports
import database from '../firebase/firebase'
import OrderedGroceriesRecipeCard from '../OrderedGroceriesRecipeCard/OrderedGroceriesRecipeCard'
import OrderedGroceriesGroceryTable from '../OrderedGroceriesGroceryTable/OrderedGroceriesGroceryTable'


const OrderedGroceries = () => {
    const otherUser = useStoreActions(actions => actions.newWeeks.otherUser)
    const week = useStoreState(state => state.newWeeks.week)
    const startWeekListener = useStoreActions(actions => actions.newWeeks.startWeekListener)
    const stopWeekListener = useStoreActions(actions => actions.newWeeks.stopWeekListener)
    const addGrocery = useStoreActions(actions => actions.newWeeks.addGrocery)

    useEffect(() => {
        startWeekListener()   
        return () => {
            stopWeekListener()
        }
    }, [])

    const startAddGrocery = (data) => {
        data.e.preventDefault()
        addGrocery({
            type: data.type,
            prevValue: data.prevValue
        })
    }

    return (
        <div>
            <button onClick={otherUser} >New database</button>

            <p>Total: {week && week.total}</p>

            <div className='recipe-list'>
                {week && week.recipes.map((recipe) => {
                    return <OrderedGroceriesRecipeCard recipe={recipe.recipe} day={recipe.day} week={week} key={recipe.day}/>
                })}
            </div>
            
            {week && <OrderedGroceriesGroceryTable onSubmit={startAddGrocery} groceries={week.groceries}/>}
        
        </div>
    )
}


export default OrderedGroceries