// External imports 
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useStoreActions, useStoreState } from 'easy-peasy'

// Internal imports 
import RecipeForm from '../RecipeForm/RecipeForm'


const RecipeEdit= (props) => {
    const startRecipeListener = useStoreActions(actions => actions.recipes.startRecipeListener)
    const stopRecipeListener = useStoreActions(actions => actions.recipes.stopRecipeListener)
    const currentRecipe = useStoreState(state => state.recipes.currentRecipe)
    const startRecipeCategoryNamesListener = useStoreActions(actions => actions.recipes.startRecipeCategoryNamesListener)
    const stopRecipeCategoryNamesListener = useStoreActions(actions => actions.recipes.stopRecipeCategoryNamesListener)
    const updateRecipe = useStoreActions(actions => actions.recipes.updateRecipe)
    const recipeCategoryNames = useStoreState(state => state.recipes.recipeCategoryNames)
    const recipeid = useParams().id

    
    useEffect(() => {
        startRecipeListener({recipeid})
        startRecipeCategoryNamesListener()
        return () => {
            stopRecipeListener()
            stopRecipeCategoryNamesListener()
        }
    }, [])
    const startUpdateRecipe = (recipe) => {
        updateRecipe({
                type: 'FULL_UPDATE',
                recipeid: currentRecipe.recipeid,
                recipeObj: recipe,
                recipeNamesObj: {
                    link: recipe.link,
                    recipeName: recipe.name
                }
            }).then(() => {
            props.history.push(`/manage-recipes/${props.match.params.weekid}`)
        })
    }

    const handleDeleteRecipe = (recipeid) => {
        updateRecipe({
            type: 'RECIPE_DELETE',
            recipeid
        }).then(() => {
            props.history.push(`/manage-recipes/${props.match.params.weekid}`)
        })
    }

    return (
        <div>
            {/* <button onClick={() => updateRecipe({type: 'RECIPE_CATEGORY', recipeid: '-M9nvR8-gGP0bc7Ws9ny'})}>pres me</button> */}
            {(currentRecipe && recipeCategoryNames) && 
                <RecipeForm 
                    weekid={props.match.params.weekid} 
                    recipe={currentRecipe} 
                    onSubmit={startUpdateRecipe} 
                    recipeCategoryNames={recipeCategoryNames}
                    deleteRecipe={handleDeleteRecipe}
                />
            }
        </div>
    )
}

export default RecipeEdit