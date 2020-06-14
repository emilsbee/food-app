// External imports
import React, { useState, useEffect } from 'react'
import { useStoreActions } from 'easy-peasy'


// Internal imports
import './recipe-form.scss'
import IngredientInput from './utils/IngredientInput'
import { updateName, updateLink, updateCategory, addIngredientToRecipe, removeIngredient } from './utils/utils'
import { ReactComponent as LeftArrow } from '../RecipePicker/utils/left-arrow.svg'
import { ReactComponent as Trash } from './utils/trash.svg'
import { useHistory } from 'react-router-dom'
import CategoryDropdown from '../CategoryDropdown/CategoryDropdown'

const RecipeForm = ({weekid, recipe, onSubmit, recipeCategoryNames, deleteRecipe }) => {
    const updateRecipe = useStoreActions(actions => actions.recipes.updateRecipe)

    const [localCategory, setlocalCategory] = useState('')
    const [localName, setLocalName] = useState('')
    const [localLink, setLocalLink] =  useState('')
    const [localIngredients, setLocalIngredients] = useState([])
    const [ingredient, setIngredient] = useState('')
    const [error, setError] = useState(false)

    const [backBanner, setBackBanner] = useState(false)

    const [categorySelected, setCategorySelected] = useState(false)
    const [ingredientInput, setIngredientInput] = useState(true)


    var history = useHistory()

    const handleReturn = () => {
        history.push(`/manage-recipes/${weekid}`)
      }



    useEffect(() => {
        if (recipe.name) {
            setLocalName(recipe.name)
        }

        if(recipe.link) {
            setLocalLink(recipe.link)
        }

        if(recipe.ingredients) {
            setLocalIngredients(Object.keys(recipe.ingredients))
        }

        if(recipe.category) {
            setlocalCategory(recipe.category)
        }
        
        if (localName.trim() !== ''  && localIngredients.length !== 0) {
            setError(false)
        }
        return () => {
            setLocalName('')
            setLocalLink('')
            setLocalIngredients([])
            setlocalCategory('')
        }
    }, [recipe])

    const handleAddIngredientToRecipe = (e) => {
        addIngredientToRecipe({e,ingredient, ingredients: localIngredients, setIngredient, updateRecipe, recipeid: recipe.recipeid})
    }

    const handleDeleteRecipe = () => {
        deleteRecipe(recipe.recipeid)
    }

    const handleUpdateName = (e) => {
        if (localName.trim() !== '' && localLink.trim() !== '' && localIngredients.length !== 0) {
            setError(false)
        }
        updateName({e,recipeid: recipe.recipeid,name: localName, updateRecipe, setError})
    }

    const handleUpdateLink = (e) => {
        if (localName.trim() !== '' && localLink.trim() !== '' && localIngredients.length !== 0) {
            setError(false)
        }
        updateLink({e, recipeid: recipe.recipeid, link: localLink, updateRecipe, setError})
    }

    const hanldeUpdateCategory = (e) => {
        updateCategory({recipeid: recipe.recipeid, categoryid: e, updateRecipe})
    }

    const handleRemoveIngredient = (e) => {
        removeIngredient({recipeid: recipe.recipeid, ingredient: e.target.innerText, ingredients: localIngredients, updateRecipe, setLocalIngredients})
    }

    return (
        <div id="recipe-form-container">

            <div id="recipe-form-title-container">
                <div id="recipe-form-title-back-container">
                    <div id="recipe-form-title-back-inner-container">
                      <LeftArrow id="recipe-form-title-back-icon" onClick={handleReturn} onMouseOver={() => setBackBanner(true)} onMouseLeave={() => setBackBanner(false)}/>
                      {backBanner ? 'Back to recipe manager' : null}
                    </div>
                </div>
                <h2 id="recipe-form-title-text">
                    Edit recipe
                    <Trash id="recipe-form-trash" onClick={handleDeleteRecipe}/>
                </h2>
            </div>
            <div id="recipe-form-inner-container">
                
                <div  
                    id="recipe-picker-form-error"
                >
                        {error && 'Please include a name, at least one ingredient and a category for the recipe!'}
                </div>
                        
                <div id="recipe-form-item-container" >
                    <div id="recipe-form-label">
                        Recipe name
                    </div>
                    <form
                        onSubmit={handleUpdateName}
                        onBlur={handleUpdateName}
                    >
                        <input
                            style={{"borderBottom": categorySelected === 'name' && 'solid 1px hsl(0, 0%, 40%)'}}
                            onFocus={() => setCategorySelected('name')}
                            onBlur={() => setCategorySelected(false)}
                            value={localName}
                            onChange={(e) => setLocalName(e.target.value)}
                            id="recipe-from-input"
                            maxLength="65"
                        />
                    </form>
                </div>

                <div id="recipe-form-item-container">
                    <div id="recipe-form-label">
                        Link to recipe
                    </div>
                    <form
                       onSubmit={handleUpdateLink}
                       onBlur={handleUpdateLink}
                    >
                        <input
                            style={{"borderBottom": categorySelected === 'link' && 'solid 1px hsl(0, 0%, 40%)'}}
                            onFocus={() => setCategorySelected('link')}
                            onBlur={() => setCategorySelected(false)}
                            value={localLink}
                            onChange={(e) => setLocalLink(e.target.value)}
                            id="recipe-from-input"
                        />
                    </form>
                </div>

                <div id="recipe-form-item-container">
                    <div id="recipe-form-label">
                        Recipe category
                    </div>
                    <CategoryDropdown 
                        onChange={hanldeUpdateCategory}
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

export default RecipeForm