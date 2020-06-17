// External imports
import React, { useState, useEffect } from 'react'


// Internal imports
import './grocery-list-input.scss'



const GroceryListInput = ({item, onSubmit, type,  }) => {
    const [localItem, setLocalItem] = useState("")

    const [focused, setFocused] = useState(false)

    useEffect(() => {
        setLocalItem(item)
    }, [item])

    const handleOnSubmit = (e) => {
        e.preventDefault()
        onSubmit(localItem)
    }
    return (
        <div 
            id="dashboard-grocery-table-input-container"
            style={{
                "borderRight": focused && '1px solid hsl(89, 68%, 28%)',
                "borderRight": type === 'product' ? !focused ?  '1px solid hsla(0, 6%, 90%)' : '1px solid hsl(89, 68%, 28%)' : focused && '1px solid hsl(89, 68%, 28%)',
                "borderLeft": focused && '1px solid hsl(89, 68%, 28%)',
                "borderTop": focused && '1px solid hsl(89, 68%, 28%)',
                "borderBottom": focused && '1px solid hsl(89, 68%, 28%)',
            }}
        >
            <form  onBlur={handleOnSubmit} onSubmit={handleOnSubmit} id="dashboard-grocery-table-input">
                <input 
                    onFocus={() => setFocused(true)}
                    onBlur={() => setFocused(false)}
                    maxLength="28"
                    spellCheck={false}
                    id="dashboard-grocery-table-input"
                    type="text"  
                    onChange={(e) => setLocalItem(e.target.value)}
                    contentEditable={true}
                    value={localItem}
                />
            </form>
        </div>
    )
}

export default GroceryListInput