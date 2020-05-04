// External imports
import React, { useState, useEffect } from 'react'
import { useStoreActions, useStoreState } from 'easy-peasy'

// Internal imports


const MainDashboardNavBar = ({ weekNr, year, years, weeks, weekTotal, weekid }) => {
    const startWeekListener = useStoreActions(actions => actions.newWeeks.startWeekListener)
    const startYearWeekListener = useStoreActions(actions => actions.newWeeks.startYearWeekListener)
    const updateWeek = useStoreActions(actions => actions.newWeeks.updateWeek)

    const [localWeekTotal, setLocalWeekTotal] = useState('')

    useEffect(() => {
        setLocalWeekTotal((weekTotal / 100).toString())

        return () => {
            setLocalWeekTotal('')
        }
    }, [weekTotal])

    const handleYearDropdown = (e) => {
        startWeekListener({type:'LATEST_WEEK', year: e.target.value})
        startYearWeekListener({year: e.target.value})
    }

    const handleWeekDropdown = (e) => {
        startWeekListener({type:'SPECIFIC_WEEK', year, weekNr: parseInt(e.target.value)})
    }       

    const handleTotalSubmit = (e) => {
        e.preventDefault()
        updateWeek({type: 'TOTAL_UPDATE', total: parseFloat(localWeekTotal, 10) * 100, weekid})
    }

    const handleTotalChange = (e) => {
        const amount = e.target.value;

        if (!amount || amount.match(/^\d{1,}(\.\d{0,2})?$/)) {
            setLocalWeekTotal(amount)
        }
    }
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

            <div>
            Total 
            <form onSubmit={handleTotalSubmit} onBlur={handleTotalSubmit}>
                <input value={localWeekTotal} onChange={handleTotalChange}/>
            </form>
            </div>
        </div>
    )
}   

export default MainDashboardNavBar