// External imports
import React, { useEffect } from 'react'
import { useStoreActions, useStoreState } from 'easy-peasy'

// Internal imports
import database from '../firebase/firebase'



const OrderedGroceriesList = () => {
    const otherUser = useStoreActions(actions => actions.newWeeks.otherUser)
    const week = useStoreState(state => state.newWeeks.week)
    const startWeekListener = useStoreActions(actions => actions.newWeeks.startWeekListener)
    const stopWeekListener = useStoreActions(actions => actions.newWeeks.stopWeekListener)

    useEffect(() => {
        startWeekListener()   
        return () => {
            stopWeekListener()
        }
    }, [])
    console.log(week)
    return (
        <div>
            List
            <button onClick={otherUser} >New database</button>
        </div>
    )
}

export default OrderedGroceriesList