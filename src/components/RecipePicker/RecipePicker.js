// External imports
import React, {useEffect, useState} from 'react'; 
import { useStoreActions, useStoreState } from 'easy-peasy'

// Internal imports
import RecipePickerCard from '../RecipePickerCard/RecipePickerCard'


const RecipePicker = (props) => {
    const startRecipeNamesListener = useStoreActions(actions => actions.recipes.startRecipeNamesListener)
    const stopRecipeNamesListener = useStoreActions(actions => actions.recipes.stopRecipeNamesListener)
    const updateWeek = useStoreActions(actions => actions.newWeeks.updateWeek)
    const recipes = useStoreState(state => state.recipes.recipes)

    useEffect(() => {
        startRecipeNamesListener()
        return () => {
            stopRecipeNamesListener()
        }
    }, [])

    const pickRecipe = ({ recipeid, name }) => {
        updateWeek({
            type: 'RECIPE_UPDATE',
            recipeid,
            recipeName: name,
            weekid: props.match.params.id,
            day: props.match.params.day
        }).then(() => {
            props.history.push(`/dashboard`)
        })
    }
    
    return (
        <div>
            <h2>Pick a recipe for {props.match.params.day}</h2>
            <div className="recipe-manager_card-list">
                  {recipes && recipes.map((recipe) => {
                    return <RecipePickerCard 
                                key={recipe.recipeid} 
                                name={recipe.recipeName} 
                                link={recipe.link} 
                                recipeid={recipe.recipeid} 
                                onClick={pickRecipe}
                            />
                  })}  
            </div>   
        </div>
    )
}

export default RecipePicker