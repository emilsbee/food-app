// External imports
import React, { useState } from 'react'
import onClickOutside from "react-onclickoutside";

// Internal imports
import './NewGroceryCategoryModalForm.scss'

function NewGroceryCategoryModalForm  ({
    handleSubmit,
    handleModalClose
})  {
    const [categoryName, setCategoryName] = useState('')
    
    NewGroceryCategoryModalForm.handleClickOutside = () => {
        if (categoryName.trim() !== '') {
            handleSubmit(categoryName)
        } else {
            handleModalClose()
        }
    }

    const handleSubmitForm = (e) => {
        e.preventDefault()
        if (categoryName.trim() !== '') {

            handleSubmit(categoryName)
        } else {
            handleModalClose()
        }
    }

    const handleKeyDown = (e) => {
        if (e.which === 27) {
            if (categoryName.trim() !== '') {
                handleSubmit(categoryName)
            } else {
                handleModalClose()
            }
        }
    }

    

    return (
        <div id="grocery-category-modal-container">       
            <div id="grocery-category-modal-label">
                Category name
            </div>

            <form onSubmit={handleSubmitForm} onKeyDown={handleKeyDown}>
                <input 
                    autoFocus
                    value={categoryName} 
                    onChange={(e) => setCategoryName(e.target.value)} 
                    id="grocery-category-modal-input"
                />
            </form>
        </div>
    )
}

const clickOutsideConfig = {
    handleClickOutside: () => NewGroceryCategoryModalForm.handleClickOutside
}

export default onClickOutside(NewGroceryCategoryModalForm, clickOutsideConfig)


