// External imports
import React from 'react'

const MainDashboardRecipeCard = ({ recipe, day }) => {

    return (
        <div className="recipe-card">
            <div className="recipe-card__container">
                {recipe ? 
                    <div>
                        <h4>{day}</h4>
                        <p>{recipe.name}</p>
                    </div>
                    :
                    <h4>{day}</h4>
                    
                }   
            </div>
        </div>
    )
}

export default MainDashboardRecipeCard