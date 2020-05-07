// External imports
import React, { useState, useEffect } from 'react'


// Internal imports




const GroceryListInput = ({item, onSubmit }) => {
    const [localItem, setLocalItem] = useState("")
    
    useEffect(() => {
        setLocalItem(item)
    }, [item])

    const handleOnSubmit = (e) => {
        e.preventDefault()
        onSubmit(localItem)
    }
    return (
        <div>
            <form  onBlur={handleOnSubmit} onSubmit={handleOnSubmit}>
                <input type="text" value={localItem} onChange={(e) => setLocalItem(e.target.value)}/>
            </form>
        </div>
    )
}

export default GroceryListInput