import React, { useState } from 'react'
import { useStoreActions } from 'easy-peasy'


const ManageRecipes = () => {
    const [recipeName, setRecipeName] = useState('')
    const [recipeLink, setRecipeLink] = useState('')
    const [ingredients, addIngredient] = useState([])
    const [ingredient, setIngredient] = useState('')

    const addRecipe = useStoreActions(actions => actions.recipes.addRecipe)

    const startAddRecipe = () => {
        addRecipe({
            name: recipeName,
            link: recipeLink,
            ingredients,
            category: ''
        })
        setRecipeName('')
        setRecipeLink('')
        addIngredient([])
    }
    const addIngredientToRecipe = (e) => {
        e.preventDefault()
        addIngredient([...ingredients, ingredient])
        setIngredient('')
    }
    return (
        <div>
            Manage recipes page
            <div>
                <form>
                     <label>
                         Recipe name:
                         <input type="text" value={recipeName} onChange={(e) => setRecipeName(e.target.value)}/>
                     </label>
                     <div>
                     <label>
                         Recipe link: 
                         <input type="text" value={recipeLink} onChange={(e) => setRecipeLink(e.target.value)}/>
                     </label>
                     </div>
                </form>
                <div>
                    <form onSubmit={addIngredientToRecipe}>
                    Ingredients:
                    <input type="text" value={ingredient} onChange={(e) => setIngredient(e.target.value)}/>
                    </form>
                </div>
                <button onClick={startAddRecipe}>Add recipe</button>
            </div>
            <div>
                {ingredients.map((ingredient) => {
                    return <p key={ingredient} >{ingredient}</p>
                })}
            </div>
        </div>
    )
}   

export default ManageRecipes