// External imports 
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useStoreActions, useStoreState } from 'easy-peasy'

// Internal imports 
import NewRecipeForm from '../NewRecipeForm'
import LoadingPage from '../LoadingPage/LoadingPage'

const NewRecipe= (props) => {
    const newRecipe = useStoreActions(actions => actions.recipes.newRecipe)
    const startRecipeCategoryNamesListener = useStoreActions(actions => actions.recipes.startRecipeCategoryNamesListener)
    const stopRecipeCategoryNamesListener = useStoreActions(actions => actions.recipes.stopRecipeCategoryNamesListener)
    const recipeCategoryNames = useStoreState(state => state.recipes.recipeCategoryNames)

    const [loading, setLoading] = useState(false)

    useEffect(() => {
        startRecipeCategoryNamesListener()
        return () => {
            stopRecipeCategoryNamesListener()
        }
    }, [])

    const startNewRecipe = (recipe) => {
        setLoading(true)
        newRecipe({
            type: 'FULL_UPDATE',
            recipeObj: recipe,
            recipeNamesObj: {
                link: recipe.link,
                recipeName: recipe.name
            }
        }).then(() => {
            props.history.push(`/manage-recipes/${props.match.params.weekid}`)
        })
    }

    return (
        <div>
            {recipeCategoryNames && !loading && <NewRecipeForm weekid={props.match.params.weekid} recipe={{}} onSubmit={startNewRecipe} recipeCategoryNames={recipeCategoryNames}/>}
            {loading && <LoadingPage />}
        </div>
    )
}

export default NewRecipe