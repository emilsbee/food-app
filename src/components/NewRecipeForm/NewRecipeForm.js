// External imports
import React, { useState, useEffect } from 'react'


// Internal imports
import './NewRecipeForm.scss'
import { addIngredientToRecipe, startUpdateRecipe, removeIngredient } from './utils'
import IngredientInput from './IngredientInput'
import { ReactComponent as LeftArrow } from '../RecipePicker/utils/left-arrow.svg'
import { useHistory } from 'react-router-dom'
import CategoryDropdown from '../CategoryDropdown/CategoryDropdown'

const NewRecipeForm = ({weekid, onSubmit, recipeCategoryNames }) => {
   
    const [localCategory, setlocalCategory] = useState('')
    const [localName, setLocalName] = useState('')
    const [localLink, setLocalLink] =  useState('')
    const [localIngredients, setLocalIngredients] = useState([])
    const [ingredient, setIngredient] = useState('')
    const [error, setError] = useState(false)
    const [backBanner, setBackBanner] = useState(false)

    const [ingredientInput, setIngredientInput] = useState(true)

    const [categorySelected, setCategorySelected] = useState(false)

    var history = useHistory()

    const handleReturn = () => {
        history.push(`/manage-recipes/${weekid}`)
      }

    const handleAddIngredientToRecipe = (e) => {
        addIngredientToRecipe({localIngredients,ingredient,setIngredient,e,setLocalIngredients})
    }

    const handleRemoveIngredient = (e) => {
        removeIngredient({ingredient: e.target.innerText,localIngredients, setLocalIngredients})
    }

    const handleStartUpdateRecipe = () => {
        startUpdateRecipe({localName,localIngredients,localCategory,setError,onSubmit,localLink})
    }



    return (
        <div id="new-recipe-form-container">
            <div id="new-recipe-form-title-container">
                <div id="new-recipe-form-title-back-container">
                    <div id="new-recipe-form-title-back-inner-container">
                      <LeftArrow id="new-recipe-form-title-back-icon" onClick={handleReturn} onMouseOver={() => setBackBanner(true)} onMouseLeave={() => setBackBanner(false)}/>
                      {backBanner ? 'Back to recipe manager' : null}
                    </div>
                </div>
                <h2 id="new-recipe-form-title-text">
                    Create new recipe
                    <div 
                        onClick={handleStartUpdateRecipe}
                        id="new-recipe-form-save-recipe"
                    >
                        Save recipe
                    </div>
                </h2>
            </div>
            <div id="new-recipe-form-inner-container">
                
                {error && <p>Please include a name, at least one ingredient and a category for the recipe!</p>}   
                
                <div id="new-recipe-form-item-container">
                    <div id="new-recipe-form-label">
                        Recipe name
                    </div>
                    <form>
                        <input
                            style={{"borderBottom": categorySelected === 'name' && 'solid 1px hsl(0, 0%, 40%)'}}
                            onFocus={() => setCategorySelected('name')}
                            onBlur={() => setCategorySelected(false)}
                            value={localName}
                            onChange={(e) => setLocalName(e.target.value)}
                            id="new-recipe-from-input"
                            maxLength="65"
                        />
                    </form>
                </div>

                <div id="new-recipe-form-item-container">
                    <div id="new-recipe-form-label">
                        Link to recipe
                    </div>
                    <form>
                        <input
                            style={{"borderBottom": categorySelected === 'link' && 'solid 1px hsl(0, 0%, 40%)'}}
                            onFocus={() => setCategorySelected('link')}
                            onBlur={() => setCategorySelected(false)}
                            value={localLink}
                            onChange={(e) => setLocalLink(e.target.value)}
                            id="new-recipe-from-input"
                        />
                    </form>
                </div>

                <div id="new-recipe-form-item-container">
                    <div id="new-recipe-form-label">
                        Recipe category
                    </div>
                    <CategoryDropdown 
                        onChange={(e) => setlocalCategory(e)}
                        title={localCategory}
                        list={recipeCategoryNames}
                    />
                </div>
            <div id="new-recipe-form-ingredients-container">
                <div id="new-recipe-form-label">
                    Ingredients
                </div>
                
                <div id="new-recipe-form-ingredient-content">
                    {localIngredients.map((ingredient) => {
                        return (
                            <p 
                                key={ingredient} 
                                id="new-recipe-form-ingredient-text"
                                onClick={handleRemoveIngredient}
                            >
                                {ingredient}
                            </p>
                        )
                    })}
                    <div 
                        id="new-recipe-form-add-ingredient"
                        onClick={() => setIngredientInput(false)}
                    >
                        <div id="new-recipe-form-add-ingredient-plus">
                            +
                        </div>
                        {!ingredientInput && <IngredientInput 
                            addIngredientToRecipe={handleAddIngredientToRecipe}
                            setHidden={setIngredientInput}
                            setIngredient={setIngredient}
                            ingredient={ingredient}
                        />}
                    </div>
                 </div>
            </div>
            
            </div>
        </div>
    )
}

export default NewRecipeForm