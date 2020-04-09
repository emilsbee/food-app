// External imports 
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useStoreActions, useStoreState } from 'easy-peasy'

// Internal imports 
import RecipeForm from '../RecipeForm/RecipeForm'

const NewRecipe= (props) => {
    const setCurrentRecipe = useStoreActions(actions => actions.recipes.setCurrentRecipe)
    const newRecipe = useStoreActions(actions => actions.recipes.newRecipe)

    

    const startNewRecipe = (recipe) => {
        newRecipe(recipe).then(() => {
            setCurrentRecipe({})
            props.history.push('/manage-recipes')
        })
    }

    return (
        <div>
            <RecipeForm recipe={{}} onSubmit={startNewRecipe}/>
        </div>
    )
}

export default NewRecipe