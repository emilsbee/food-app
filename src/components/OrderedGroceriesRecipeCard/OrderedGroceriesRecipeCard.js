// External imports
import React from 'react'
import { Link } from 'react-router-dom'


const OrderedGroceriesRecipeCard = ({ recipe, day, week }) => {

    return (    
        <div>
            {recipe === "" ? 
            <div className="ordered-groceries-recipe-card">
                <div className="ordered-groceries-recipe-card__container">
                        <h4>{day}</h4>  
                        <Link to={`/recipe-picker/${week.id}/${day}`} day={day}><p>Add recipe</p></Link>
                </div>
            </div>    
            :
            <div className="ordered-groceries-recipe-card">
                <div className="ordered-groceries-recipe-card__container">
                        <div className="ordered-groceries-recipe-card__header"> 
                        <h4>{day}</h4>  
                        <button  className="view-ingredients-card">View</button>
                        </div>
                        <Link to={`/recipe-picker/${week.id}/${day}`} day={day}><p>{recipe.name}</p></Link>
                </div>
            </div> 
            }

        </div>
    )
}

export default OrderedGroceriesRecipeCard