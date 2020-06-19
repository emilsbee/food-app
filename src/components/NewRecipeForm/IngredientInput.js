// External imports
import React, { useState, useEffect } from 'react'
import onClickOutside from "react-onclickoutside";

import './IngredientInput.scss'

function IngredientInput ({
    setHidden,
    addIngredientToRecipe,
    setIngredient,
    ingredient
}) {
    

    

    IngredientInput.handleClickOutside = () => {
        setIngredient('')
        setHidden(true)
    }

    return (
        <div id="ingredient-input-container">
            <form 
                onSubmit={addIngredientToRecipe} 
                onBlur={addIngredientToRecipe}
            >
                <input 
                maxLength="28"
                    autoFocus
                    id="ingredient-input"
                    type="text" 
                    value={ingredient} 
                    onChange={(e) => setIngredient(e.target.value.toLowerCase())}
                    
                />
                
            </form>
        </div>
    )
}

const clickOutsideConfig = {
    handleClickOutside: () => IngredientInput.handleClickOutside
}

export default onClickOutside(IngredientInput, clickOutsideConfig) 

