// External imports 
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useStoreActions, useStoreState } from 'easy-peasy'

// Internal imports 
import RecipeForm from '../RecipeForm/RecipeForm'

const RecipeEdit= (props) => {
    const [isLoading, setIsLoading] = useState(true)
    const startGetRecipe = useStoreActions(actions => actions.recipes.startGetRecipe)
    const currentRecipe = useStoreState(state => state.recipes.currentRecipe)
    const updateRecipe = useStoreActions(actions => actions.recipes.updateRecipe)
    const setCurrentRecipe = useStoreActions(actions => actions.recipes.setCurrentRecipe)
    const recipeID = useParams().id

    useEffect(() => {
        startGetRecipe({recipeID}).then(() => {
            setIsLoading(false)
        })
    }, [startGetRecipe, recipeID])

    const startUpdateRecipe = (recipe) => {
        updateRecipe({recipeID, recipe}).then(() => {
            setCurrentRecipe({})
            props.history.push('/manage-recipes')
        })

    }

    return (
        <div>
            {isLoading ? 
            <p>Loading...</p>
            :
            <RecipeForm recipe={currentRecipe} onSubmit={startUpdateRecipe}/>
            }
        </div>
    )
}

export default RecipeEdit