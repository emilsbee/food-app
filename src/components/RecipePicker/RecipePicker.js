// External imports
import React, {useEffect, useState} from 'react'; 
import { useStoreActions, useStoreState } from 'easy-peasy'

// Internal imports
import RecipePickerCard from '../RecipePickerCard/RecipePickerCard'
import './RecipePicker.scss'
import { ReactComponent as LeftArrow } from './utils/left-arrow.svg'

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
      <div id="recipe-picker-outer-container">
          <div id="recipe-picker-title">
            <div id="recipe-picker-title-back-container">
              <div id="recipe-picker-title-back-inner-container">
                <LeftArrow id="recipe-picker-title-back-icon"/>
              </div>
            </div>
            <h2 id="recipe-picker-title-text">Pick a recipe for {props.match.params.day}</h2>
          </div>
          <div id="recipe-picker-container">
              <div id="recipe-manager_card-list">
                    {recipes ? recipes.map((recipe) => {
                      return <RecipePickerCard 
                                  key={recipe.recipeid} 
                                  name={recipe.recipeName} 
                                  link={recipe.link} 
                                  recipeid={recipe.recipeid} 
                                  onClick={pickRecipe}
                              />
                    })
                  :
                  <p>No recipes</p>
                  }  
              </div>   
          </div>
        </div>
    )
}

export default RecipePicker