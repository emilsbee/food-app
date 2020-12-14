import React, { useState, useEffect } from 'react';
import { useStoreActions } from 'easy-peasy'
import CurrencyInput from 'react-currency-input';

import './MainDashboardNavBarTotal.scss'

const MainDashboardNavBarTotal = ({ total, weekid }) => {
  const updateWeek = useStoreActions(actions => actions.newWeeks.updateWeek)

  const [localTotal, setLocalTotal] = useState('')


  useEffect(() => {
    setLocalTotal((total / 100).toString())
  }, [total])

  const handleTotalChange = (e) => {
    const amount = e.target.value;

    if (!amount || amount.match(/^\d{1,}(\.\d{0,2})?$/)) {
        setLocalTotal(amount)
    }
  }

  const handleTotalSubmit = (e) => {
    e.preventDefault()
    updateWeek({type: 'TOTAL_UPDATE', total: parseFloat(localTotal, 10) * 100, weekid})
  }
  
  return (
    <div id="nav-bar-total">
      <div id="nav-bar-total-label">
        Total
      </div> 
      <form onSubmit={handleTotalSubmit} onBlur={handleTotalSubmit}>
          <CurrencyInput 
            decimalSeparator="."
            precision="2"
            id="nav-bar-total-input"
            onChangeEvent={handleTotalChange}
            value={localTotal}
          />
      </form>
    </div>
  )
};

export default MainDashboardNavBarTotal;
