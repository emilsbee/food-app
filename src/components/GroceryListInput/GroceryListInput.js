// External imports
import React, { useState, useEffect } from 'react'


// Internal imports




const GroceryListInput = ({grocery, onSubmit, groceryID, type }) => {
    const [item, setItem] = useState(grocery)
    
    useEffect(() => {
        setItem(grocery)
    }, [grocery])

    const handleOnSubmit = (e) => {
        e.preventDefault()
        onSubmit({item, groceryID, type})
    }
    return (
        <div>
            <form onBlur={handleOnSubmit} onSubmit={handleOnSubmit}>
                <input className="grocery-list-input" type="text" value={item} onChange={(e) => setItem(e.target.value)}/>
            </form>
        </div>
    )
}

export default GroceryListInput