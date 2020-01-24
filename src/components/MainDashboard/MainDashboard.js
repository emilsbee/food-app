// External imports
import React, { useRef, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'


// Internal imports



const MainDashboard = () => {
    const [focused, setFocused] = useState(false)

    

    const myInput = useRef()

    const changeFocus = () => {
        setFocused(!focused)
    }

    return (
        <div>
            Main MainDashboard
            <input
            ref={myInput}
            onBlur={changeFocus}
            onFocus={changeFocus}
            className={['input', focused && 'input-focused'].join(' ')}
            />
        </div>
    )
}

export default MainDashboard