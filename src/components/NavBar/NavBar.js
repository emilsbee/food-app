// External imports
import React from 'react'
import { Link } from 'react-router-dom'
import { useStoreActions, useStoreState } from 'easy-peasy'

// Internal imports


const NavBar = () => {
    const startLogout = useStoreActions(actions => actions.auth.startLogout)
    const week = useStoreState(state => state.weeks.week)

    const beginLogout = () => {
        startLogout()
    }

    return (
        <div className="nav-bar">
            <Link className="navigation-link" to="/dashboard">Dashboard</Link>
            <Link className="navigation-link" to="/manage-recipes">Recipe manager</Link>
            <Link className="navigation-link" to={`/ordered-groceries/${week.id}`}>Ordered groceries</Link>
            <button 
            onClick={beginLogout}
            className="logout-button"
            >
            Log out
            </button>
        </div>
    )
}

export default NavBar