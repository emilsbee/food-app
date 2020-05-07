// External imports
import React, { useState } from 'react'
import { useStoreActions, useStoreState } from 'easy-peasy'

// Internal imports
import NewGroceryCategoryModal from '../NewGroceryCategoryModal/NewGroceryCategoryModal'

const UnorderedGroceryTable = ({ unsortedGroceries, categoryNames }) => {
    const addGrocery = useStoreActions(actions => actions.groceries.addGrocery)
    const [modalState, setModalState] = useState(false)

    const handleSelect = ({ grocery, category }) => {
        if (category === 'New category') {
            setModalState(grocery)
            return 
        } else if (category === 'Choose category') {
            return 
        } else {
            addGrocery({grocery, category})
        }
    }

    const handleModalClose = () => {
        setModalState(false)
    }

    const handleModalSave = ({ category, grocery }) => {
        addGrocery({grocery, category, type: 'NEW_CATEGORY'})
        setModalState(false)
    }
    

    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th>Uncategorised</th>
                    </tr>
                </thead>
                <tbody>
                {unsortedGroceries.map((grocery) => {
                    return ( 
                        <tr key={Object.keys(grocery)[0]} >
                            <td>{Object.values(grocery)[0].product}</td>
                            <td>{Object.values(grocery)[0].amount}</td>
                            <td >
                                <select onChange={(e) => handleSelect({grocery, category:e.target.value})}>
                                    <option defaultValue={true}>Choose category</option>
                                    {categoryNames.map((category) => {
                                        return <option key={category}>{category}</option>
                                    })}
                                    <option>New category</option>
                                </select>
                            </td>
                        </tr>
                    )
                })}
                </tbody>
            </table>
        
            {modalState && <NewGroceryCategoryModal handleModalClose={handleModalClose} grocery={modalState} handleModalSave={handleModalSave} />}
        </div>
    )
}


export default UnorderedGroceryTable


