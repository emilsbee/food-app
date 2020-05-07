// External imports
import React from 'react'


// Internal imports


const RecipePickerCard = ({ recipeid, name, link, onClick }) => {

    return (
        <div  className="recipe-picker-card">
            <div id={recipeid ? recipeid : null} className="recipe-picker-card__container">
                <h4>{name}</h4>
                {link && <a href={link} target="_blank" className="pick-recipe-button"><button>View</button></a>}
                <button onClick={() => onClick({recipeid, name})} className="pick-recipe-button">Pick</button>
            </div>
        </div>
    )
}

export default RecipePickerCard