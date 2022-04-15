import React, { useState, useEffect } from 'react';

import useDataHandling from '../hooks/useDataHandling';
import TableIncomeStatement from '../pages/Valuation/TableIncomeStatement';
import TableDCFIncomeStatement from './TableDCFIncomeStatement';
import TableDCFCashFlow from './TableDCFCashFlow';

export default function TableDCFFinancials ({historicalFinancialData, assumptions, forecastedFinancialData,  isCheckedDescOrder,isCheckedShowIncStatement, isCheckedShowPreviousYears, isEstimateFcffOnly}){
  
  const [ financialArray, setFinancialArray ] = useState([]);
  const { changeArrayOrder } = useDataHandling ({ historicalFinancialData, forecastedFinancialData, isCheckedShowPreviousYears, isCheckedDescOrder });
  
  useEffect (()=> {
    setFinancialArray(changeArrayOrder());
  },[forecastedFinancialData, isCheckedDescOrder, isCheckedShowPreviousYears, historicalFinancialData, assumptions])

  return (
    <>
    {/* { console.log(isEstimateFcffOnly)} */}
    { historicalFinancialData ? <>
      { isCheckedShowIncStatement ? <>
        {/* <TableDCFIncomeStatement financialArray = {financialArray} assumptions={assumptions} isCheckedShowPreviousYears={isCheckedShowPreviousYears} isCheckedDescOrder={isCheckedDescOrder} isEstimateFcffOnly={isEstimateFcffOnly}/> */}
        <TableIncomeStatement financialArray = {financialArray} assumptions={assumptions} isCheckedShowPreviousYears={isCheckedShowPreviousYears} isCheckedDescOrder={isCheckedDescOrder} isEstimateFcffOnly={isEstimateFcffOnly}/>

      </> : null} 
      <TableDCFCashFlow financialArray = {financialArray} assumptions={assumptions} isCheckedShowPreviousYears = {isCheckedShowPreviousYears} isCheckedDescOrder = {isCheckedDescOrder} isEstimateFcffOnly={isEstimateFcffOnly}/>
    </>: null }
    </>
  )
}