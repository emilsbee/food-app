// External imports
import React,{ useEffect } from 'react'
import { useStoreActions, useStoreState } from 'easy-peasy'
import {Link} from 'react-router-dom'

// Internal imports
import RecipeCard from '../RecipeCard/RecipeCard'

const ManageRecipes = () => {

    const startSetUserRecipes = useStoreActions(actions => actions.recipes.startSetUserRecipes)
    const userRecipes = useStoreState(state => state.recipes.userRecipes)

    useEffect(() => {
        startSetUserRecipes()
    }, [startSetUserRecipes])
    

    return (
        <div>
            <Link to={`/new-recipe`}>Add recipe</Link>
            <div className="recipe-manager_card-list">
                  {userRecipes ? userRecipes.map((recipe) => {
                    return <RecipeCard key={recipe.recipeID} title={recipe.name} link={recipe.link} recipeID={recipe.recipeID}/>
                  }) 
                  :
                  null}  
            </div>
        </div>
    )
}   

export default ManageRecipes