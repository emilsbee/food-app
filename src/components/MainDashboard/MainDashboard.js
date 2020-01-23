// External imports
import React, { useRef, useEffect, useState } from 'react'
import { useStoreActions } from 'easy-peasy'
import { Link } from 'react-router-dom'


// Internal imports



const MainDashboard = () => {
    const [focused, setFocused] = useState(false)
    const startLogout = useStoreActions(actions => actions.auth.startLogout)

    const beginLogout = () => {
        startLogout()
    }

    const myInput = useRef()
    

    const changeFocus = () => {
        setFocused(!focused)
    }

    return (
        <div>
            Main MainDashboard
            <button 
            onClick={beginLogout}
            className="logout-button"
            >
            Log out
            </button>
            <input
            ref={myInput}
            onBlur={changeFocus}
            onFocus={changeFocus}
            className={['input', focused && 'input-focused'].join(' ')}
            />
            <Link to="/manage-recipes">
                Manage recipes
            </Link>
        </div>
    )
}

export default MainDashboard