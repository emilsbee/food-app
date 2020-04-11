// External imports
import React, { useEffect, useState } from 'react'
import { useStoreActions, useStoreState } from 'easy-peasy'


// Internal imports
import MainDashboardRecipeCard from '../MainDashboardRecipeCard/MainDashboardRecipeCard'
import MainDashboardNavBar from '../MainDashboardNavBar/MainDashboardNavBar'
import GroceryList from '../GroceryList/GroceryList'

const MainDashboard = () => {
    const [isLockedButton, setIsLockedButton] = useState('')

    const previousWeek = useStoreActions(actions => actions.weeks.previousWeek)
    const nextWeek = useStoreActions(actions => actions.weeks.nextWeek)
    const populateLatestWeek = useStoreActions(actions => actions.weeks.populateLatestWeek)
    const startAddWeek = useStoreActions(actions => actions.weeks.startAddWeek)
    const startAddYear = useStoreActions(actions => actions.weeks.startAddYear)
    const week = useStoreState(state => state.weeks.week)
    const startUpdateWeek = useStoreActions(actions => actions.weeks.startUpdateWeek)

    const beginFirstWeek = useStoreActions(actions => actions.weeks.beginFirstWeek)

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

    const startBeginFirstWeek = () => {
        setIsLockedButton('disabled')
        beginFirstWeek().then(() => {
            setIsLockedButton('')
        })
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
            <div>
            <p>No weeks. You should add a week!</p>
            <button disabled={isLockedButton} onClick={startBeginFirstWeek}>Add first week!</button> 
            </div>
            :
            <div className="recipe-list">
            {week.recipes ? week.recipes.map((recipe) => {
                return <MainDashboardRecipeCard key={recipe.day} recipe={recipe.recipeID} day={recipe.day} week={week}/>
            })
            :
            null
            }
            </div>
            } 
            {
            week.groceries ? 
            week.groceries.length !== 0 ? 
                <GroceryList groceries={week.groceries} week={week}/>
                :
                <h2>Grocery List</h2>
                :
                null
            }
            
        </div>
    )
}

export default MainDashboard