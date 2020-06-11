// External imports
import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { useStoreActions, useStoreState } from 'easy-peasy'

// Internal imports
import './nav-bar.scss'
import { ReactComponent as LogoutIcon } from './utils/logout.svg'

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
        <div id="nav-bar-container">
            <div className="nav-bar">
                <div id="nav-bar-link-container">
                    <NavLink 
                        activeClassName="nav-bar-link-active"
                        className="navigation-link" 
                        to="/dashboard"
                    >
                        Dashboard
                    </NavLink>

                    <NavLink 
                        activeClassName="nav-bar-link-active"
                        className="navigation-link" 
                        to="/manage-recipes"
                    >
                        Recipe manager
                    </NavLink>
                    
                    <NavLink 
                        activeClassName="nav-bar-link-active"
                        className="navigation-link" 
                        to={`/ordered-groceries/${currentWeekid}`}
                    >
                        Ordered groceries
                    </NavLink>
                </div>
                <div 
                    onClick={beginLogout}
                    id="logout-button"
                >
                    Log out
                    <LogoutIcon id="logout-icon"/>
                </div>
            </div>
        </div> 
    )
}

export default NavBar