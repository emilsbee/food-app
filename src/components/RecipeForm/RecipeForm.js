// External imports
import React, { useState } from 'react'


const RecipeForm = (props) => {
    

    const [name, setName] = useState(props.recipe.name ? props.recipe.name : '')
    const [link, setLink] =  useState(props.recipe ? props.recipe.link : '')
    const [ingredients, setIngredients] = useState(props.recipe.ingredients ? props.recipe.ingredients : [])
    const [ingredient, setIngredient] = useState('')
    const [error, setError] = useState(false)

    const addIngredientToRecipe = (e) => {
        e.preventDefault()
        if (!ingredients.includes(ingredient)) {
            setIngredients([...ingredients, ingredient])
            setIngredient('')
        }
    }

    const startUpdateRecipe = () => {
        if (name === '' || !ingredients) {
            return setError(true)
        } 
        
        props.onSubmit({
                name, 
                link,
                ingredients: ingredients !== undefined ? ingredients : {}
        })

    }
   
    return (
        <div>
            {error ? <p>Please add a recipe name and at least one ingredient</p>
            :
            null
            }   
            <form>
                Recipe name:
                <input type="text" value={name} onChange={(e) => setName(e.target.value)}/>
                Recipe link:
                <input type="text" value={link} onChange={(e) => setLink(e.target.value)}/>
            </form>
            <div>
                <form onSubmit={addIngredientToRecipe}>
                    Ingredients:
                    <input type="text" value={ingredient} onChange={(e) => setIngredient(e.target.value)}/>
                </form>
            </div>
            <button onClick={startUpdateRecipe}>Save recipe</button>
            <div>
                {ingredients ? ingredients.map((ingredient) => {
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