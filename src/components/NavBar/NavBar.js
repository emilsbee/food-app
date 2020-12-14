// External imports
import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { useStoreActions, useStoreState } from 'easy-peasy'

// Internal imports
import './nav-bar.scss'
import { ReactComponent as LogoutIcon } from './utils/logout.svg'


const NavBar = (props) => {
    const startLogout = useStoreActions(actions => actions.auth.startLogout)
    const week = useStoreState(state => state.newWeeks.week)
    const [currentWeekid, setCurrentWeekid] = useState(week && week.weekid)

    const [logoutBanner, setLogoutBanner] = useState(false)
    const [logoutClass, setLogoutClass] = useState('slideInRight')

    useEffect(() => {
        if (week) {
            if (!week.weekid || week.weekid === currentWeekid) {
                setCurrentWeekid(currentWeekid)
            } else {
                setCurrentWeekid(week.weekid)
            }
        } 
    }, [week])

    const beginLogout = () => {
        startLogout()
    }

    const handleLogoutBanner = ({type}) => {
        if (type === 'ON') {
            setLogoutBanner(true)
            setLogoutClass('slideInRight')
        } else {
            setLogoutClass('slideInLeft')
            setTimeout(() => {

                setLogoutBanner(false)
            }, 500)
        }
    }

    return (   
        <div id="nav-bar-container">
            <div className="nav-bar">
                <div id="nav-bar-link-container">
                    <NavLink 
                        style={{
                            "borderBottom": `${props.match.path.includes('/dashboard') && '1px solid white'}`
                        }}
                        className="navigation-link" 
                        to={`/dashboard/${currentWeekid}`}
                    >
                        Dashboard
                    </NavLink>

                    <NavLink 
                        style={{
                            "borderBottom": `${props.match.path.includes('/manage-recipes') && '1px solid white'}`
                        }}
                        className="navigation-link" 
                        to={`/manage-recipes/${currentWeekid}`}
                    >
                        Recipe manager
                    </NavLink>
                    
                    <NavLink 
                        style={{
                            "borderBottom": `${props.match.path.includes('/ordered-groceries') && '1px solid white'}`
                        }}
                        className="navigation-link" 
                        to={`/ordered-groceries/${currentWeekid}`}
                    >
                        Grocery list
                    </NavLink>
                </div>
               
                <div 
                    onMouseOver={() => handleLogoutBanner({type: 'ON'})}
                    onMouseLeave={() => handleLogoutBanner({type: 'OFF'})}
                    onClick={beginLogout}
                    id="logout-button"
                >
                        {logoutBanner &&  
                    <p  
                        style={{"animationName" : logoutClass}}
                        className="logout-text"
                    >
                        Log out
                    </p>
                }
                    <LogoutIcon id="logout-icon"/>
                </div>
                
            </div>
        </div> 
    )
}

export default NavBar