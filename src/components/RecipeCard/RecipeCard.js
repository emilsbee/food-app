// External imports
import React from 'react'
import { Link } from 'react-router-dom'


// Internal imports

const RecipeCard = ({ recipeID, title, link, body}) => {
        
    return (
        <Link to={`/edit/${recipeID}`} className="recipe-card">
            <div id={recipeID ? recipeID : null} className="recipe-card__container">
                <h4>{title}</h4>
                <p>{body? body : null}</p>
            </div>
        </Link>
    )
}

export default RecipeCard