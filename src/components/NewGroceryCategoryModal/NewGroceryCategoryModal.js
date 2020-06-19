// External imports
import React, { useState, useContext } from 'react'
import { useStoreActions, useStoreState } from 'easy-peasy'
import onClickOutside from "react-onclickoutside";

// Internal imports
import './new-grocery-category-modal.scss'
import NewGroceryCategoryModalForm from './NewGroceryCategoryModalForm'

function NewGroceryCategoryModal  ({grocery, handleModalSave, handleModalClose })  {
    const handleSubmit = (e) => {
        handleModalSave({category: e, grocery})
    }

    


    return (
        <div id="grocery-category-modal-outer-container">
            <NewGroceryCategoryModalForm 
                handleSubmit={handleSubmit}
                handleModalClose={handleModalClose}
            />
        </div>
    )
}


export default NewGroceryCategoryModal


