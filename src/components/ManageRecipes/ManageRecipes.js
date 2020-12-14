// External imports
import React,{ useEffect, useState } from 'react'
import { useStoreActions, useStoreState } from 'easy-peasy'
import {Link} from 'react-router-dom'

// Internal imports
import RecipeCard from '../RecipeCard/RecipeCard'
import './manage-recipes.scss'
import LoadingPage from '../LoadingPage/LoadingPage'


const ManageRecipes = (props) => {

    const startRecipeNamesListener = useStoreActions(actions => actions.recipes.startRecipeNamesListener)
    const stopRecipeNamesListener = useStoreActions(actions => actions.recipes.stopRecipeNamesListener)
    const recipes = useStoreState(state => state.recipes.recipes)

    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(false)
        startRecipeNamesListener().then(() => {
            setLoading(true)
        })
        return () => {
            stopRecipeNamesListener()
        }
    }, [])
    
    
    return (
        <div id="manage-recipes-container">
            {loading ? 
            <div id="manage-recipes-container">
            <div id="manage-recipes-title">
                <div style={{"flexGrow": 1}}/>
                
              <h2 id="manage-recipes-title-text">Recipe manager</h2>
              <div id="manage-recipes-add-recipe-container">
                <Link 
                    id="manage-recipes-add-recipe" 
                    to={`/new-recipe/${props.match.params.weekid}`}
                >
                    +
                </Link>
              </div>
            </div>
            <div className="recipe-manager_card-list">
                  {recipes && recipes.map((recipe) => {
                    return <RecipeCard 
                                key={recipe.recipeid} 
                                name={recipe.recipeName} 
                                link={recipe.link} 
                                recipeid={recipe.recipeid}
                                weekid={props.match.params.weekid}
                            />
                  }) 
                 } 
            </div>
            {recipes.length === 0 && <div id="recipe-manager-add-recipe-container">
                <h2 id="recipe-manager-no-recipes">You have no recipes :(</h2>
                <Link 
                    id="recipe-manager-add-recipe" 
                    to={`/new-recipe/${props.match.params.weekid}`}
                >
                    Add a recipe
                </Link>
              </div>} 
            </div>
            :
            <div id="recipe-manager-loading">
                <LoadingPage />
            </div>
            
            }
        </div>
    )
}   

export default ManageRecipes