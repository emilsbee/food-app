// External imports
import React, { useState, useEffect } from 'react'


// Internal imports
import './recipe-form.scss'
import { ReactComponent as LeftArrow } from '../RecipePicker/utils/left-arrow.svg'
import { useHistory } from 'react-router-dom'

const RecipeForm = ({weekid, recipe, onSubmit, recipeCategoryNames }) => {
    const [localCategory, setlocalCategory] = useState('')
    const [localName, setLocalName] = useState('')
    const [localLink, setLocalLink] =  useState('')
    const [localIngredients, setLocalIngredients] = useState([])
    const [ingredient, setIngredient] = useState('')
    const [error, setError] = useState(false)

    const [backBanner, setBackBanner] = useState(false)

    var history = useHistory()

    const handleReturn = () => {
        history.push(`/manage-recipes/${weekid}`)
      }

    useEffect(() => {
        if (recipe.name) {
            setLocalName(recipe.name)
        }
        return () => {
            setLocalName('')
        }
    }, [recipe.name])

    useEffect(() => {
        if(recipe.link) {
            setLocalLink(recipe.link)
        }
        
        return () => {
            setLocalLink('')
        }
    }, [recipe.link])

    useEffect(() => {
        if(recipe.ingredients) {
            setLocalIngredients(Object.keys(recipe.ingredients))
        }

        return () => {
            setLocalIngredients([])
        }
    }, [recipe.ingredients])

    useEffect(() => {
        if(recipe.category) {
            setlocalCategory(recipe.category)
        }

        return () => {
            setlocalCategory('')
        }
    }, [recipe.category])

    const addIngredientToRecipe = (e) => {
        e.preventDefault()
        if (!localIngredients.includes(ingredient)) {
            setLocalIngredients([...localIngredients, ingredient])
            setIngredient('')
        }
    }

    const startUpdateRecipe = () => {
        if (localName === '' || !localIngredients || localCategory === '') {
            return setError(true)
        } 

        
        var ingredientObj = {}
        localIngredients.forEach((ingredient) => {
            ingredientObj[ingredient] = true
        })

        onSubmit({
                name: localName, 
                link: localLink,
                ingredients: ingredientObj,
                category: localCategory
        })

    }
    return (
        <div id="recipe-form-container">
            <div id="recipe-form-title">
            <div id="recipe-picker-title-back-container">
                    <div id="recipe-picker-title-back-inner-container">
                      <LeftArrow id="recipe-picker-title-back-icon" onClick={handleReturn} onMouseOver={() => setBackBanner(true)} onMouseLeave={() => setBackBanner(false)}/>
                      {backBanner ? 'Back to dashboard' : null}
                    </div>
                  </div>
                <h2 id="recipe-form-title-text">
                    Edit recipe
                </h2>
                </div>
            <div id="recipe-form-inner-container">
                
                {error && <p>Please include a name, at least one ingredient and a category for the recipe!</p>}   
                
                <div id="recipe-form-name-container">
                    <div id="recipe-form-name-label">
                        Recipe name
                    </div>
                    <form>
                        <input

                        />
                    </form>
                </div>

                <div id="recipe-form-link-container">
                    <div id="recipe-form-link-label">
                        Link to recipe
                    </div>
                    <form>
                        <input

                        />
                    </form>
                </div>

                <div id="recipe-form-category-container">
                    <div id="recipe-form-category-label">
                        Recipe category
                    </div>
                    <select value={localCategory} onChange={(e) => setlocalCategory(e.target.value)}>
                        {localCategory === '' && <option value={localCategory}>Pick category</option>}
                        {recipeCategoryNames.map((categoryName, index) => {
                            return <option key={categoryName} value={categoryName}>{categoryName}</option>
                        })}
                    </select>
                </div>
            <div>
                <form onSubmit={addIngredientToRecipe}>
                    Ingredients:
                    <input type="text" value={ingredient} onChange={(e) => setIngredient(e.target.value.toLowerCase())}/>
                </form>
            </div>
            <button onClick={startUpdateRecipe}>Save recipe</button>
            <div>
                {localIngredients ? localIngredients.map((ingredient) => {
                    return <p key={ingredient}>{ingredient}</p>
                })
                : (
                    <p>Add ingredients!</p>
                )}
            </div>
            </div>
        </div>
    )
}

export default RecipeForm