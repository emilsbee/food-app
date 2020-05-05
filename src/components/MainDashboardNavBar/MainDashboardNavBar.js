// External imports
import React, { useState, useEffect } from 'react'
import { useStoreActions, useStoreState } from 'easy-peasy'

// Internal imports


const MainDashboardNavBar = ({ weekNr, year, years, weeks, weekTotal, weekid }) => {
    const startWeekListener = useStoreActions(actions => actions.newWeeks.startWeekListener)
    const startYearWeekListener = useStoreActions(actions => actions.newWeeks.startYearWeekListener)
    const updateWeek = useStoreActions(actions => actions.newWeeks.updateWeek)
    const newWeek = useStoreActions(actions => actions.newWeeks.newWeek)
    const newYear = useStoreActions(actions => actions.newWeeks.newYear)

    const [localWeekTotal, setLocalWeekTotal] = useState('')
    

    useEffect(() => {
        setLocalWeekTotal((weekTotal / 100).toString())

        return () => {
            setLocalWeekTotal('')
        }
    }, [weekTotal])

    const handleYearDropdown = (e) => {
        startWeekListener({type:'LATEST_WEEK', year: e.target.value, weekid})
        startYearWeekListener({year: e.target.value})
    }

    const handleWeekDropdown = (e) => {
        startWeekListener({type:'SPECIFIC_WEEK', year, weekNr: parseInt(e.target.value), weekid})
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
            <button onClick={() => startWeekListener({type: 'PREVIOUS_WEEK', weekNr, year, weekid})}>Previous week</button>
            <button onClick={() => startWeekListener({type: 'NEXT_WEEK', weekNr, year, weekid})}>Next week</button>
            <button onClick={() => newWeek({year})}>New week</button>
            <button onClick={() => newYear()} >New year</button>
            <label>
                Year
                <select onChange={handleYearDropdown} value={year}>
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
            <h4>Week: {weekNr}</h4>
            <h4>Year: {year}</h4>
        </div>
    )
}   

export default MainDashboardNavBar