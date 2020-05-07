// External imports
import React, { useState } from 'react'
import { Link } from 'react-router-dom'


const MainDashboardRecipeCard = ({ recipe, day, week, onClick }) => {
    const [viewHiddenButton, setViewHiddenButton] = useState(true)

    return (    
        <div>
            {recipe === "" ? 
            <div className="main-dashboard-recipe-card">
                <div className="main-dashboard-recipe-card__container">
                        <h4>{day}</h4>  
                        <Link to={`/recipe-picker/${week.weekid}/${day}`} day={day}><p>Add recipe</p></Link>
                </div>
            </div>    
            :
            <div className="main-dashboard-recipe-card" onMouseEnter={() => setViewHiddenButton(!viewHiddenButton)} onMouseLeave={() => setViewHiddenButton(!viewHiddenButton)}>
                <div className="main-dashboard-recipe-card__container">
                        <div className="main-dashboard-recipe-card__header"> 
                        <h4>{day}</h4>  
                        </div>
                        <Link to={`/recipe-picker/${week.weekid}/${day}`} day={day}><p>{recipe.name}</p></Link>
                        <button onClick={() => onClick(recipe.ingredients)} hidden={viewHiddenButton}>Ingredients</button>
                        {recipe.link && <a href={recipe.link} target="_blank"><button hidden={viewHiddenButton}>View recipe</button></a>}
                </div>
            </div> 
            }

        </div>
    )
}

export default MainDashboardRecipeCard