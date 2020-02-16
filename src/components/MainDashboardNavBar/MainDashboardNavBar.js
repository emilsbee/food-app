// External imports
import React from 'react'


// Internal imports


const MainDashboardNavBar = ({ addWeek, startPreviousWeek, startNextWeek }) => {

    return (
        <div>
            <button onClick={addWeek}>Add week</button>   
            <button>Add year</button> 
            <button onClick={startPreviousWeek}>Previous week</button>
            <button onClick={startNextWeek}>Next week</button>
        </div>
    )
}   

export default MainDashboardNavBar