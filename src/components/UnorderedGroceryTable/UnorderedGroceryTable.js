// External imports
import React, { useState, useEffect } from 'react'
import { useStoreActions, useStoreState } from 'easy-peasy'

// Internal imports
import CategoryDropdown from './CategoryDropdown'
import NewGroceryCategoryModal from '../NewGroceryCategoryModal/NewGroceryCategoryModal'
import './UnorderedGroceries.scss'

const UnorderedGroceryTable = ({ unsortedGroceries, categoryNames, sortGroceries }) => {
    const addGrocery = useStoreActions(actions => actions.groceries.addGrocery)
    const [modalState, setModalState] = useState(false)


    const handleSelect = ({ grocery, category }) => {
        if (category === 'New category') {
            setModalState(grocery)
            return 
        }  else {
            addGrocery({grocery, category}).then(() => {
                sortGroceries()
            })
        }
    }

    const handleModalClose = () => {
        setModalState(false)
    }

    const handleModalSave = ({ category, grocery }) => {
        setModalState(false)
        
        addGrocery({grocery, category, type: 'NEW_CATEGORY'})
    }
    

    return (
        <div id="unordered-grocery-table-container">
            <div id="unordered-grocery-table">
                <div id="unordered-grocery-table-title">

                </div>                 
                <div id="unordered-grocery-table">
                {unsortedGroceries.length > 0 ? unsortedGroceries.map((grocery) => {
                    return ( 
                        <div 
                            key={Object.keys(grocery)[0]} 
                            id="unordered-grocery-container"
                        >
                            <div id="unordered-grocery-product">
                                {Object.values(grocery)[0].product}
                            </div>
                            <div id="unordered-grocery-amount">
                                {Object.values(grocery)[0].amount}
                            </div>
                            <div id="unordered-grocery-category">
                                <CategoryDropdown 
                                    onChange={(e) => handleSelect({grocery, category:e})} 
                                    title='Choose category'
                                    list={categoryNames}
                                    grocery={grocery}
                                />
                                
                            </div>
                        </div>
                    )
                })
                :
                <div id="unordered-grocery-empty">
                    All groceries categorised!
                </div>
                }
                </div>
            </div>
        
            {modalState && 
                <NewGroceryCategoryModal 
                    handleModalClose={handleModalClose} 
                    grocery={modalState} 
                    handleModalSave={handleModalSave} />}
        </div>
    )
}


export default UnorderedGroceryTable


