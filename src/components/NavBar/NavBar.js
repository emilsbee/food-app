// External imports
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useStoreActions, useStoreState } from 'easy-peasy'

// Internal imports


const NavBar = () => {
    const startLogout = useStoreActions(actions => actions.auth.startLogout)
    const week = useStoreState(state => state.newWeeks.week)
    const [currentWeekid, setCurrentWeekid] = useState('')

    useEffect(() => {
        if (week) {
            if (!week.weekid || week.weekid === currentWeekid) {
                return 
            } else {
                setCurrentWeekid(week.weekid)
            }
        } 
    }, [week])

    const beginLogout = () => {
        startLogout()
    }
    return (    
        <div className="nav-bar">
            <Link className="navigation-link" to="/dashboard">Dashboard</Link>
            <Link className="navigation-link" to="/manage-recipes">Recipe manager</Link>
            <Link className="navigation-link" to={`/ordered-groceries/${currentWeekid}`}>Ordered groceries</Link>
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