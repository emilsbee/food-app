// External imports
import React, { useState, useEffect } from 'react'
import { useStoreActions, useStoreState } from 'easy-peasy'


// Internal imports
import RecipeCard from '../RecipeCard/RecipeCard'

const ManageRecipes = () => {
    const [recipeName, setRecipeName] = useState('')
    const [recipeLink, setRecipeLink] = useState('')
    const [ingredients, addIngredient] = useState([])

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

    return (
        <div>
            <div className="recipe-manager_card-list">
                  {userRecipes ? userRecipes.map((recipe) => {
                    return <RecipeCard key={recipe.recipeID} title={recipe.name} link={recipe.link} recipeID={recipe.recipeID}/>
                  }) 
                  :
                  null}  
            </div>
            <button onClick={startAddRecipe}>Add recipe</button>
        </div>
    )
}   

export default ManageRecipes