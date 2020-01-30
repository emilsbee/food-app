// External imports
import React from 'react'


// Internal imports
import RecipeCard from '../RecipeCard/RecipeCard'


const MainDashboard = () => {

    return (
        <div>
            <RecipeCard title="Monday" body="Add recipe" />
            <RecipeCard title="Tuesday" body="Potatoes" />
        </div>
    )
}

export default MainDashboard