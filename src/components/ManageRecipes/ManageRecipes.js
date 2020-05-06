// External imports
import React,{ useEffect } from 'react'
import { useStoreActions, useStoreState } from 'easy-peasy'
import {Link} from 'react-router-dom'

// Internal imports
import RecipeCard from '../RecipeCard/RecipeCard'

const ManageRecipes = () => {

    const startRecipeNamesListener = useStoreActions(actions => actions.recipes.startRecipeNamesListener)
    const stopRecipeNamesListener = useStoreActions(actions => actions.recipes.stopRecipeNamesListener)
    const recipes = useStoreState(state => state.recipes.recipes)

    useEffect(() => {
        startRecipeNamesListener()
        return () => {
            stopRecipeNamesListener()
        }
    }, [])
    
    
    return (
        <div>
            <Link to={`/new-recipe`}>Add recipe</Link>
            <div className="recipe-manager_card-list">
                  {recipes && recipes.map((recipe) => {
                    return <RecipeCard key={recipe.recipeid} name={recipe.recipeName} link={recipe.link} recipeid={recipe.recipeid}/>
                  }) 
                 }  
            </div>
        </div>
    )
}   

export default ManageRecipes