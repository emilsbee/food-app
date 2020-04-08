// External imports
import React, { useEffect } from 'react'
import { useStoreActions, useStoreState } from 'easy-peasy'


// Internal imports
import MainDashboardRecipeCard from '../MainDashboardRecipeCard/MainDashboardRecipeCard'
import MainDashboardNavBar from '../MainDashboardNavBar/MainDashboardNavBar'

const MainDashboard = () => {
    const previousWeek = useStoreActions(actions => actions.weeks.previousWeek)
    const nextWeek = useStoreActions(actions => actions.weeks.nextWeek)
    const populateLatestWeek = useStoreActions(actions => actions.weeks.populateLatestWeek)
    const startAddWeek = useStoreActions(actions => actions.weeks.startAddWeek)
    const startAddYear = useStoreActions(actions => actions.weeks.startAddYear)
    const week = useStoreState(state => state.weeks.week)
    const startUpdateWeek = useStoreActions(actions => actions.weeks.startUpdateWeek)

    useEffect(() => {
        populateLatestWeek()
    }, [populateLatestWeek])

    
    const addYear = () => {
        startAddYear({week})
    }

    const addWeek = () => {
        startAddWeek({year: week.year})
    }
    
    const startPreviousWeek = () => {
        previousWeek({week})
    }

    const startNextWeek = () => {
        nextWeek({week})
    }


    return (
        <div>    
            {week.total !== undefined ? 
                <MainDashboardNavBar 
                    addWeek={addWeek} 
                    addYear={addYear} 
                    startPreviousWeek={startPreviousWeek} 
                    startNextWeek={startNextWeek}
                    week={week}
                />
                :
                null
            }
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
            <div>
                {week ? `Week: ${week.weekNr} Year: ${week.year}` : ''}
            </div>
        </div>
    )
}

export default MainDashboard