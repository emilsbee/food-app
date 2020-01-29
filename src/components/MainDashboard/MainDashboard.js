// External imports
import React, { useRef, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'


// Internal imports



const MainDashboard = () => {
    const [focused, setFocused] = useState(false)

    

    const myInput = useRef()

    const changeFocus = () => {
        setFocused(!focused)
    }

    return (
        <div>
            <div className="recipe-card-empty" >
                <div className="recipe-card-empty__container">
                    <h4>Monday</h4>
                    <p>Add recipe</p>
                </div>
                
            </div>
            <div  className="recipe-card">
                <div className="recipe-card__container">
                    <h4>Monday</h4>
                    <p>Recipe name</p>
                </div>
            </div>
        </div>
    )
}

export default MainDashboard