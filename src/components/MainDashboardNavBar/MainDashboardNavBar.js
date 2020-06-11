// External imports
import React, { useState, useEffect } from 'react'
import { useStoreActions, useStoreState } from 'easy-peasy'
import moment from 'moment'

// Internal imports
import './main-dashboard-nav-bar.scss'
import { ReactComponent as BackArrow } from './utils/back.svg'
import { ReactComponent as NextArrow } from './utils/next.svg'
import MainDashboardNavBarTotal from '../MainDashboardNavBarTotal'
import YearDropdown from '../YearDropdown'
import WeekDropdown from '../WeekDropdown'

const MainDashboardNavBar = ({ weekNr, year, years, weeks, weekTotal, weekid }) => {
    const startWeekListener = useStoreActions(actions => actions.newWeeks.startWeekListener)
    const startYearWeekListener = useStoreActions(actions => actions.newWeeks.startYearWeekListener)
    const updateWeek = useStoreActions(actions => actions.newWeeks.updateWeek)
    const stopWeekListener = useStoreActions(actions => actions.newWeeks.stopWeekListener)
    
    const [localWeekTotal, setLocalWeekTotal] = useState('')
    
    const[isCurrentWeek, setIsCurrentWeek] = useState(true)

    useEffect(() => {
        if (weekNr !== moment().week() || year !== moment().year()) {
            setIsCurrentWeek(false)
        } else {
            setIsCurrentWeek(true)
        }
    }, [year, weekNr])



    const handleYearDropdown = (e) => {
        startWeekListener({type:'SPECIFIC_WEEK', year: e, weekNr: 1, weekid})
    }

    const handleWeekDropdown = (e) => {
        startWeekListener({type:'SPECIFIC_WEEK', year, weekNr: e, weekid})
    }       

    const handlePrevWeek = () => {
        startWeekListener({type: 'PREVIOUS_WEEK', weekNr, year, weekid})
    }

    const handleNextWeek = () => {
        startWeekListener({type: 'NEXT_WEEK', weekNr, year, weekid})
    }

    const handleCurrentWeek = () => {
        startWeekListener({type: 'CURRENT_WEEK'})
    }

    return (
        
            <div 
                id="banners" 
            >   
                <MainDashboardNavBarTotal total={weekTotal} weekid={weekid}/>
                
                {!isCurrentWeek && <button
                    id="to-current-week"
                    onClick={handleCurrentWeek}
                >
                    To current week
                </button>}

                <div
                    id="banners-nav"
                >
                    <BackArrow onClick={handlePrevWeek} id="previous-week" />
                        <h2 id="year-banner">{year},</h2>
                        <h2 id="week-banner">week {weekNr}</h2>
                    <NextArrow onClick={handleNextWeek} id="next-week" />
                </div>  

                <div
                    id="nav-bar-navigation"
                >   
                    <div id="year-dropdown-container">
                        <p id="year-dropdown-label">Go to year</p>
                        <YearDropdown list={years} title={year} onChange={handleYearDropdown}/>
                    </div>
                
                    <div id="week-dropdown-container">
                        <p id="week-dropdown-label" >Go to week</p>
                        <WeekDropdown list={weeks} title={weekNr} onChange={handleWeekDropdown}/>
                    </div>
                </div>
            </div>

    )
}   

export default MainDashboardNavBar