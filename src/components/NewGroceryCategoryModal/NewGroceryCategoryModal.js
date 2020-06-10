// External imports
import React, { useState, useContext } from 'react'
import { useStoreActions, useStoreState } from 'easy-peasy'

// Internal imports


const NewGroceryCategoryModal = ({handleModalClose, grocery, handleModalSave }) => {
    const [categoryName, setCategoryName] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()
        handleModalSave({category: categoryName, grocery})
    }


    return (
        <div className="modal display-block">
            <section className="modal-main">``
                <button onClick={handleModalClose}>close</button>
                <button onClick={() => handleModalSave(categoryName)}>Save</button>
                <form onSubmit={handleSubmit}>
                    <input value={categoryName} onChange={(e) => setCategoryName(e.target.value)} />
                </form>
            </section>
        </div>
    )
}


export default NewGroceryCategoryModal


