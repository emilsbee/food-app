import React, { useState, useEffect } from 'react'
import { useStoreActions, useStoreState } from 'easy-peasy'


const ManageRecipes = () => {
    const [recipeName, setRecipeName] = useState('')
    const [recipeLink, setRecipeLink] = useState('')
    const [ingredients, addIngredient] = useState([])
    const [ingredient, setIngredient] = useState('')

    const addRecipe = useStoreActions(actions => actions.recipes.addRecipe)
    const startSetUserRecipes = useStoreActions(actions => actions.recipes.startSetUserRecipes)
    const userRecipes = useStoreState(state => state.recipes.userRecipes)

    useEffect(() => {
        startSetUserRecipes()
    }, [startSetUserRecipes])
    
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
        startSetUserRecipes()
    }
    const addIngredientToRecipe = (e) => {
        e.preventDefault()
        addIngredient([...ingredients, ingredient])
        setIngredient('')
    }
    return (
        <div>
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
                {ingredients ? ingredients.map((ingredient) => {
                    return <p key={ingredient} >{ingredient}</p>
                }) : (
                    null
                ) }
            </div>
            <div>
                  {userRecipes ? userRecipes.map((recipe) => {
                    return <p key={recipe.recipeID}>{recipe.name}</p>
                  }) 
                  :
                  null}  
            </div>
        </div>
    )
}   

export default ManageRecipes