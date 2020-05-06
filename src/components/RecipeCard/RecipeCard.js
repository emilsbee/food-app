// External imports
import React, { useState } from 'react'
import { Link } from 'react-router-dom'


const RecipeCard = ({ name, link, recipeid, history }) => {
    const [viewHiddenButton, setViewHiddenButton] = useState(true)


    return (    
        <div>
            <div className="recipe-card" onMouseEnter={() => setViewHiddenButton(!viewHiddenButton)} onMouseLeave={() => setViewHiddenButton(!viewHiddenButton)}>
                <div className="recipe-card__container">
                        <div className="recipe-card__header"> 
                            <h4>{name}</h4>  
                        </div>
                        {link ? <a target="_blank" href="https://reacttraining.com/react-router/web/api/history"><button hidden={viewHiddenButton} >View</button></a> : null}
                        <Link to={`edit/${recipeid}`}><button hidden={viewHiddenButton}>Edit</button></Link>
                </div>
            </div> 
        </div>
    )
}

export default RecipeCard