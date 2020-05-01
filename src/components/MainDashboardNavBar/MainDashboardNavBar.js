// External imports
import React from 'react'
import { useStoreActions, useStoreState } from 'easy-peasy'

// Internal imports


const MainDashboardNavBar = ({ weekNr, year, years, weeks }) => {
    const startWeekListener = useStoreActions(actions => actions.newWeeks.startWeekListener)
    const startYearWeekListener = useStoreActions(actions => actions.newWeeks.startYearWeekListener)

    const handleYearDropdown = (e) => {
        startWeekListener({type:'LATEST_WEEK', year: e.target.value})
        startYearWeekListener({year: e.target.value})
    }

    const handleWeekDropdown = (e) => {
        startWeekListener({type:'SPECIFIC_WEEK', year, weekNr: parseInt(e.target.value)})
    }   

    console.log(weeks)
    return (
        <div>
            <button onClick={() => startWeekListener({type: 'PREVIOUS_WEEK', weekNr, year})}>Previous week</button>
            <button onClick={() => startWeekListener({type: 'NEXT_WEEK', weekNr, year})}>Next week</button>

            <label>
                Year
                <select onChange={handleYearDropdown}>
                    {years.map((year) => {
                        return <option key={year} value={year}>{year}</option>
                    })}
                </select>
            </label>
            
            <label>
                Week
                <select onChange={handleWeekDropdown} value={weekNr}>
                    {weeks.map((week) => {
                        return <option key={week} value={week}>{week}</option>
                    })}
                </select>
            </label>

        </div>
    )
}   

export default MainDashboardNavBar