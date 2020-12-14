// External imports
import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'

// Internal imports
import './recipe-card.scss'

const RecipeCard = ({ name, link, recipeid, weekid }) => {
    const [viewHiddenButton, setViewHiddenButton] = useState(true)


    return (    
        <div>
            <div className="recipe-card" onMouseEnter={() => setViewHiddenButton(!viewHiddenButton)} onMouseLeave={() => setViewHiddenButton(!viewHiddenButton)}>
                <div className="recipe-card__container">
                        <div className="recipe-card__header"> 
                            <h4 id="recipe-card__header-text">{name}</h4>  
                        </div>
                        <div id="recipe-card-button-container">
                            {link &&
                                <a  
                                    id="recipe-card-link"
                                    target="_blank" 
                                    href={link}
                                    hidden={viewHiddenButton}
                                >
                                    View
                                </a>
                            }
                            
                            <NavLink 
                                to={`/edit/${recipeid}/${weekid}`} 
                                id="recipe-card-link"
                                hidden={viewHiddenButton}
                            >
                                Edit
                            </NavLink>
                        </div>
                        
                </div>
            </div> 
        </div>
    )
}

export default RecipeCard