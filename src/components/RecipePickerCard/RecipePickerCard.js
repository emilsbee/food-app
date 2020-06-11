// External imports
import React from 'react'


// Internal imports
import './recipe-picker-card.scss'

const RecipePickerCard = ({ recipeid, name, link, onClick }) => {

    return (
        <div  className="recipe-picker-card">
            <div id="recipe-picker-card-title">
                {name}
            </div>

            <div id="recipe-picker-card-footer">
                {link && 
                    <a 
                        href={link} 
                        target="_blank" 
                        className="pick-recipe-button"
                    >
                        View
                    </a>
                }
                
                <button 
                    onClick={() => onClick({recipeid, name})} 
                    className="pick-recipe-button"
                >
                    Pick
                </button>
            </div>    
        </div>
    )
}

export default RecipePickerCard