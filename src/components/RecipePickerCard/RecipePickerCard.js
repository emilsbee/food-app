// External imports
import React from 'react'


// Internal imports


const RecipePickerCard = ({ recipeID, title, link, onClick }) => {


    return (
        <div  className="recipe-picker-card">
            <div id={recipeID ? recipeID : null} className="recipe-picker-card__container">
                <h4>{title}</h4>
                <a href={link} target="_blank" className="pick-recipe-button">View</a>
                <button onClick={() => onClick(recipeID)} className="pick-recipe-button">Pick</button>
            </div>
        </div>
    )
}

export default RecipePickerCard