// External imports
import React, { useState, useEffect } from 'react'
import { useStoreActions } from 'easy-peasy'

// Internal imports


const MainDashboardNavBar = ({ addWeek, startPreviousWeek, startNextWeek, addYear, week, updateWeek }) => {
    
    const [total, setTotal] = useState((week.total / 100).toString())
    const [isDisabled, setIsDisabled] = useState('')
    const startUpdateWeek = useStoreActions(actions => actions.weeks.startUpdateWeek)
    
    useEffect(() => {
        setTotal((week.total / 100).toString())
    }, [week])

    const onTotalChange = (e) => {
        const amount = e.target.value;
        if (!amount || amount.match(/^\d{1,}(\.\d{0,2})?$/)) {
            setTotal(amount)
        }
    }
    
    const onTotalSubmit = (e) => {
        e.preventDefault()
        setIsDisabled('disabled')
        startUpdateWeek({total: parseFloat(total, 10) * 100, week}).then(() => {
            setIsDisabled('')
        })
    }
    return (
        <div className="main-dashboard-nav-bar">
            <button onClick={addWeek}>Add week</button>   
            <button onClick={addYear}>Add year</button> 
            <button onClick={startPreviousWeek}>Previous week</button>
            <button onClick={startNextWeek}>Next week</button>
            <form onSubmit={onTotalSubmit} >
                <input disabled={isDisabled} className="total" type="text" size="3" value={total} onChange={onTotalChange}/>€
            </form>
        </div>
    )
}   

export default MainDashboardNavBar