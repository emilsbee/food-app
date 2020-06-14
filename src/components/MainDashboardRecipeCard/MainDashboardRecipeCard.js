// External imports
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'


// Internal imports
import './main-dashboard-recipe-card.scss'


const MainDashboardRecipeCard = ({ recipe, day, week, onClick, cardAnimationName, setCardAnimationName }) => {
    const [viewHiddenButton, setViewHiddenButton] = useState(true)
    const [localRecip, setLocalRecip] = useState(true)
    const [animName, setAnimName] = useState('fadeIn')
    
    useEffect(() => {

        if (!cardAnimationName) {

            setAnimName('fadeIn')
            setLocalRecip(false)
            setLocalRecip(true)
            
        } else {
            setAnimName('fadeOut')
            setLocalRecip(false)
            setLocalRecip(true)
            
        }


    }, [cardAnimationName])

    useEffect(() => {
        setAnimName('fadeIn')
        setLocalRecip(false)
        setLocalRecip(true)
    }, [week.weekid])

    return (    
        <div>
            {localRecip && recipe === "" ? 
            <div className="main-dashboard-recipe-card" style={{"animationName": animName}}>
                
                <div className="main-dashboard-recipe-card__container">
                    <div className="main-dashboard-recipe-card__header">
                        <h4 id="main-dashboard-recipe-card__header-text">{day}</h4>  
                    </div>

                    <div id="main-dashboard-recipe-card-content-container-norecipe">
                        <Link 
                            id="main-dashboard-recipe-card-content_recipe"
                            to={`/recipe-picker/${week.weekid}/${day}`} 
                            day={day}
                        >
                            Add recipe
                        </Link>
                    </div>
                </div>
            </div>    
            :
            <div style={{"animationName": animName}} className="main-dashboard-recipe-card" onMouseEnter={() => setViewHiddenButton(!viewHiddenButton)} onMouseLeave={() => setViewHiddenButton(!viewHiddenButton)}>
                <div className="main-dashboard-recipe-card__container">
                        <div className="main-dashboard-recipe-card__header"> 
                            <h4 id="main-dashboard-recipe-card__header-text">{day}</h4>  
                        </div>

                                        
                        <div 
                            id="main-dashboard-recipe-card-content-container"

                            day={day}>
                                <Link 
                                    id="main-dashboard-recipe-card-content_recipe"
                                    style={{"textDecoration":"none"}}
                                    to={`/recipe-picker/${week.weekid}/${day}`} 
                                >
                                    {recipe.name}
                                </Link>
                        </div>

                        <div id="main-dashboard-recipe-card-footer">
                            <div 
                                onClick={() => onClick(recipe.ingredients)} 
                                hidden={viewHiddenButton}
                                id="main-dashboard-recipe-card-footer_ingredients"
                            >
                                Ingredients
                            </div>
                            {recipe.link && 
                                <a 
                                    id="main-dashboard-recipe-card-footer_recipe"
                                    href={recipe.link} 
                                    target="_blank"
                                >
                                    <div 
                                        hidden={viewHiddenButton} 
                                        id="main-dashboard-recipe-card-footer_recipe-div"
                                    >   
                                        View recipe
                                    </div>
                                </a>
                            }
                        </div>
                </div>
            </div> 
            }
        </div>
    )
}

export default MainDashboardRecipeCard