import React from 'react';

import './OrderedGroceriesTableHeader.scss'

const OrderedGroceriesTableHeader = ({
  activeHeader,
  setActiveHeader
}) => {

  return (
    <div id="ordered-groceries-header-container">
      <div 
          id="ordered-groceries-header-organised"
      >   
          <div
              id="ordered-groceries-header-organised-text"
              style={{
                  "boxShadow": activeHeader === 'sorted' && "0 4px 8px 0 rgba(0,0,0,0.2)"
              }}
              onClick={() => setActiveHeader('sorted')}
          >
              Categorised
          </div>
      </div>

      <div id="ordered-groceries-header-separ" />                        

      <div 
          id="ordered-groceries-header-unorganised"
      >   
          <div
              id="ordered-groceries-header-unorganised-text"
              style={{
                  "boxShadow": activeHeader === 'unsorted' && "0 4px 8px 0 rgba(0,0,0,0.2)"
              }}
              onClick={() => setActiveHeader('unsorted')}
          >
              Uncategorised
          </div>
      </div>
    </div>
  )
};

export default OrderedGroceriesTableHeader;
