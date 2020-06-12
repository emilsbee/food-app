// External imports
import React, {useEffect, useState} from 'react'; 
import { useStoreActions, useStoreState } from 'easy-peasy'

// Internal imports
import LoadingPage from '../LoadingPage/LoadingPage'
import RecipePickerCard from '../RecipePickerCard/RecipePickerCard'
import './RecipePicker.scss'
import { ReactComponent as LeftArrow } from './utils/left-arrow.svg'

const RecipePicker = (props) => {
    const startRecipeListListener = useStoreActions(actions => actions.recipes.startRecipeListListener)
    const stopRecipeListListener = useStoreActions(actions => actions.recipes.stopRecipeListListener)
    const updateWeek = useStoreActions(actions => actions.newWeeks.updateWeek)
    const recipes = useStoreState(state => state.recipes.currentRecipeList)

    const [backBanner, setBackBanner] = useState(false)

    useEffect(() => {
        startRecipeListListener()
        return () => {
            stopRecipeListListener()
        }
    }, [])

    const pickRecipe = ({ recipeid, name }) => {
        updateWeek({
            type: 'RECIPE_UPDATE',
            recipeid,
            recipeName: name,
            weekid: props.match.params.weekid,
            day: props.match.params.day
        }).then(() => {
            props.history.push(`/dashboard/${props.match.params.weekid}`)
        })
    }

    const handleReturn = () => {
      props.history.push(`/dashboard/${props.match.params.weekid}`)
    }
    
    return (
      <div id="recipe-picker-outer-container">

          {recipes ? 
          <div id="recipe-picker-outer-container">
          <div id="recipe-picker-title">
                  <div id="recipe-picker-title-back-container">
                    <div id="recipe-picker-title-back-inner-container">
                      <LeftArrow id="recipe-picker-title-back-icon" onClick={handleReturn} onMouseOver={() => setBackBanner(true)} onMouseLeave={() => setBackBanner(false)}/>
                      {backBanner ? 'Back to dashboard' : null}
                    </div>
                  </div>
                  <h2 id="recipe-picker-title-text">Pick a recipe for {props.match.params.day}</h2>
                </div>
                <div id="recipe-picker-container">
                    <div id="recipe-manager_card-list">
                          {recipes.map((recipe) => {
                            return <RecipePickerCard 
                                        key={recipe.recipeid} 
                                        name={recipe.name} 
                                        link={recipe.link} 
                                        recipeid={recipe.recipeid} 
                                        ingredients={recipe.ingredients}
                                        onClick={pickRecipe}
                                    />
                          })}  
                    </div>   
                </div>
                </div>
            :
            <div id="recipe-picker-loading">
              <LoadingPage/>
            </div>
          }
        </div>
    )
}

export default RecipePicker