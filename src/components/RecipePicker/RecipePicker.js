// External imports
import React, {useEffect, useState} from 'react'; 
import { useStoreActions, useStoreState } from 'easy-peasy'

// Internal imports
import RecipePickerCard from '../RecipePickerCard/RecipePickerCard'


const RecipePicker = (props) => {
    const startSetUserRecipes = useStoreActions(actions => actions.recipes.startSetUserRecipes)
    const userRecipes = useStoreState(state => state.recipes.userRecipes)
    const startUpdateWeek = useStoreActions(actions => actions.weeks.startUpdateWeek)

    useEffect(() => {
        startSetUserRecipes()
    }, [startSetUserRecipes])

    const pickRecipe = (data) => {
        startUpdateWeek({
            type: 'RECIPE',
            recipeID: data,
            id: props.match.params.id,
            day: props.match.params.day
        }).then(() => {
            props.history.push('/dashboard')
        })
    }
    

    return (
        <div>
            <h2>Pick a recipe for {props.match.params.day}</h2>
            <div className="recipe-manager_card-list">
                  {userRecipes ? userRecipes.map((recipe) => {
                    return <RecipePickerCard 
                                key={recipe.recipeID} 
                                title={recipe.name} 
                                link={recipe.link} 
                                recipeID={recipe.recipeID} 
                                onClick={pickRecipe}
                            />
                  }) 
                  :
                  null}  
            </div>   
        </div>
    )
}

export default RecipePicker