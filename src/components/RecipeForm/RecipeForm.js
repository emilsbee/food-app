// External imports
import React, { useState, useEffect } from 'react'


const RecipeForm = ({ recipe, onSubmit, recipeCategoryNames }) => {
    const [localCategory, setlocalCategory] = useState('')
    const [localName, setLocalName] = useState('')
    const [localLink, setLocalLink] =  useState('')
    const [localIngredients, setLocalIngredients] = useState([])
    const [ingredient, setIngredient] = useState('')
    const [error, setError] = useState(false)

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
        <div>
            {error && <p>Please include a name, at least one ingredient and a category for the recipe!</p>}   
            <form>
                Recipe name:
                <input type="text" value={localName} onChange={(e) => setLocalName(e.target.value)}/>
                Recipe link:
                <input  value={localLink} onChange={(e) => setLocalLink(e.target.value)}/>
                <select value={localCategory} onChange={(e) => setlocalCategory(e.target.value)}>
                    {localCategory === '' && <option value={localCategory}>Pick category</option>}
                    {recipeCategoryNames.map((categoryName, index) => {
                        return <option key={categoryName} value={categoryName}>{categoryName}</option>
                    })}
                </select>
            </form>
            <div>
                <form onSubmit={addIngredientToRecipe}>
                    Ingredients:
                    <input type="text" value={ingredient} onChange={(e) => setIngredient(e.target.value)}/>
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
    )
}

export default RecipeForm