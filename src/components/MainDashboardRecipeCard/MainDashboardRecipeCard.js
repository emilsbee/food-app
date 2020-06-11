// External imports
import React, { useState } from 'react'
import { Link } from 'react-router-dom'

import './main-dashboard-recipe-card.scss'

const MainDashboardRecipeCard = ({ recipe, day, week, onClick }) => {
    const [viewHiddenButton, setViewHiddenButton] = useState(true)

    return (    
        <div>
            {recipe === "" ? 
            <div className="main-dashboard-recipe-card">

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
            <div className="main-dashboard-recipe-card" onMouseEnter={() => setViewHiddenButton(!viewHiddenButton)} onMouseLeave={() => setViewHiddenButton(!viewHiddenButton)}>
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