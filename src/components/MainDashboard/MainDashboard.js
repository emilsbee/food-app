// External imports
import React, { useEffect } from 'react'


// Internal imports
import MainDashboardRecipeCard from '../MainDashboardRecipeCard/MainDashboardRecipeCard'
import { useStoreActions, useStoreState } from 'easy-peasy'
import MainDashboardNavBar from '../MainDashboardNavBar/MainDashboardNavBar'

const MainDashboard = () => {
    const previousWeek = useStoreActions(actions => actions.weeks.previousWeek)
    const nextWeek = useStoreActions(actions => actions.weeks.nextWeek)
    const populateLatestWeek = useStoreActions(actions => actions.weeks.populateLatestWeek)
    const startAddWeek = useStoreActions(actions => actions.weeks.startAddWeek)
    const week = useStoreState(state => state.weeks.week)

    useEffect(() => {
        populateLatestWeek()
    }, [populateLatestWeek])

    
    const addYear = () => {

    }

    const addWeek = () => {
        startAddWeek({year: week.year})
    }
    
    const startPreviousWeek = () => {
        previousWeek({weekNr: week.weekNr})
    }

    const startNextWeek = () => {
        nextWeek({weekNr: week.weekNr})
    }
    return (
        <div>   
            <MainDashboardNavBar addWeek={addWeek} addYear={addYear} startPreviousWeek={startPreviousWeek} startNextWeek={startNextWeek}/>
            {Object.entries(week).length === 0 && week.constructor === Object ? 
            <p>No weeks. You should add a week!</p>
            :
            <div className="recipe-list">
            {week.recipes ? week.recipes.map((recipe) => {
                return <MainDashboardRecipeCard key={recipe.day} recipe={recipe.recipe} day={recipe.day}/>
            })
            :
            null
            }
            </div>
            } 
        </div>
    )
}

export default MainDashboard