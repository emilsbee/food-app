// External imports
import React, { useState } from 'react'
import onClickOutside from "react-onclickoutside";

// Internal imports
import './CategoryDropdown.scss'
import { ReactComponent as Up } from './utils/up.svg'
import { ReactComponent as Down } from './utils/down.svg'

function CategoryDropdown ({
    list, 
    title, 
    onChange,
    grocery
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
        <div id="unordered-dd-wrapper">
            <div id={`unordered-dd-header_${listOpen ? "is-open" : ''}`} onClick={() => setListOpen(!listOpen)}>
                <div id="unordered-dd-header-title">Pick a category</div>
                {listOpen 
                    ?   <Up id="unordered-dropdown-up"/>
                    :   <Down id="unordered-dropdown-down"/>
                }
            </div>
            {listOpen && <ul id="unordered-dd-list" style={{"marginTop":"0px"}}>
               {Object.keys(list).map((key) => {

                return ( <li key={key} id="unordered-dd-list-item" onClick={() => handleClick(key)}>
                     <p id="unordered-dd-list-text">{list[key]}</p>
                </li>
                )
                })}
                <li id="unordered-dd-list-item" onClick={() => handleClick('New category')} style={{"backgroundColor": 'whitesmoke'}}>
                    <p id="unordered-dd-list-text">
                        New category
                    </p>
                </li>
            </ul>}
    
        </div>
    )
};

const clickOutsideConfig = {
    handleClickOutside: () => CategoryDropdown.handleClickOutside
}

export default onClickOutside(CategoryDropdown, clickOutsideConfig)