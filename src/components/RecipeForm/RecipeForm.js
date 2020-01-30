// External imports
import React, { useState } from 'react'


const RecipeForm = (props) => {
    

    const [name, setName] = useState(props.recipe ? props.recipe.name : '')
    const [link, setLink] =  useState(props.recipe ? props.recipe.link : '')
    const [ingredients, setIngredients] = useState(props.recipe ? props.recipe.ingredients : [])
    const [ingredient, setIngredient] = useState('')

    const addIngredientToRecipe = (e) => {
        e.preventDefault()
        if (!ingredients.includes(ingredient)) {
            setIngredients([...ingredients, ingredient])
            setIngredient('')
        }
    }

    const startUpdateRecipe = () => {
        props.onSubmit({
                name, 
                link,
                ingredients
        })

    }

    return (
        <div>
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
                    null
                )}
            </div>
        </div>
    )
}

export default RecipeForm