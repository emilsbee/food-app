// External imports
import React, { useState } from 'react'
import onClickOutside from "react-onclickoutside";

// Internal imports
import './CategoryDropdown.scss'
import { ReactComponent as Up } from './utils/up.svg'
import { ReactComponent as Down } from './utils/down.svg'
 

function CategoryDropdown  ({
    list,
    title,
    onChange
})  {
    const [listOpen, setListOpen] = useState(false)
    
    CategoryDropdown.handleClickOutside = () => {
        setListOpen(false)
    }

    const handleClick = (e) => {
        onChange(e)
        setListOpen(false)
    }
    
    return (
        <div id="category-dd-wrapper">
            <div id={`category-dd-header_${listOpen ? "is-open" : ''}`} onClick={() => setListOpen(!listOpen)}>
                <div id="category-dd-header-title">{title === '' ? 'Pick a category' : list[title]}</div>
                {listOpen 
                    ?   <Up id="category-dropdown-up"/>
                    :   <Down id="category-dropdown-down"/>
                }
            </div>
            {listOpen && <ul id="category-dd-list" style={{"marginTop":"0px"}}>
               {Object.keys(list).map((key) => {
                
                return ( <li key={key} id="category-dd-list-item" onClick={() => handleClick(key)}>
                     <p id="category-dd-list-text">{list[key]}</p>
                </li>
                )
                })}
            </ul>}
    
        </div>
    )
}   

const clickOutsideConfig = {
    handleClickOutside: () => CategoryDropdown.handleClickOutside
}

export default onClickOutside(CategoryDropdown, clickOutsideConfig) 