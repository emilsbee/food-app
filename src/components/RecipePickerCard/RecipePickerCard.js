// External imports
import React, { useEffect, useState } from 'react'
import LinesEllipsis from 'react-lines-ellipsis'

// Internal imports
import './recipe-picker-card.scss'

const RecipePickerCard = ({ recipeid, name, link, onClick, ingredients }) => {

    const [ingredientsString, setIngredientsString] = useState('')

    useEffect(() => {
        var ingredString = Object.keys(ingredients).join(', ')
        
        setIngredientsString(ingredString)
    }, [ingredients])

    
    
    return (
        <div  className="recipe-picker-card">
            <div id="recipe-picker-card-title">
                {name}
            </div>

            <LinesEllipsis 
                text={ingredientsString}
                id="recipe-picker-card-ingredients"
                maxLine='7'
                ellipsis='...'
                trimRight
                basedOn='letters'
            />
                
            

            <div id="recipe-picker-card-footer">
                {link && 
                    <a 
                        href={link} 
                        target="_blank" 
                        className="pick-recipe-button"
                    >   
                    <div>
                        View
                        </div>
                    </a>
                }
                
                <div 
                    onClick={() => onClick({recipeid, name})} 
                    className="pick-recipe-button"
                >
                    Pick
                </div>
            </div>    
        </div>
    )
}

export default RecipePickerCard