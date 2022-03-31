import React, {useState, useEffect} from 'react';

import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tooltip } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import TableDCFIncomeStatement from './TableDCFIncomeStatement';
import TableDCFCashFlow from './TableDCFCashFlow';

const useStyles = makeStyles( (mainTheme) => ({
  table: {
    minWidth: 300,
    maxHeight: 900
  },
  TableHeader:{
    color: "white",
    backgroundColor: mainTheme.palette.primary.main
  },
  TableTitle:{
    color: "white",
    fontSize: 9
  },
  TableYears:{
    color: "white",
    fontSize: 11 //9  //11
  },
  TableRows : {
    fontSize: 9,
    backgroundColor: "whitesmoke",
    },
  TableRowsSubtitle : {
    fontSize: 9,
    height: 16,
    backgroundColor: "#d3d3d3",//light gray d3d3d3   3C6E76
    }  
  }));

export default function TableDCFFinancials ({historicalFinancialData, forecastedFinancialData,  isCheckedDescOrder,isCheckedShowIncStatement, isCheckedShowPreviousYears, isEstimateFcffOnly}){
  const classes = useStyles()
  let combinedArray = [];
  const [financialArray, setFinancialArray] = useState([]);
  // const {calcValuation} = useValuation(freeCashFlow, setFreeCashFlow, valuation, setValuation);
  // console.log(historicalFinancialData);

  // function defineColor(index){
  //   if (isCheckedShowPreviousYears){
  //     if (isCheckedDescOrder){
  //       if (index < 4){
  //         return "orange";
  //       } else {
  //         return "whitesmoke";//"#55757A";
  //       }
  //     } else {
  //       if (index < 4){
  //         return "whitesmoke"; //"darkgray"
  //       } else {
  //         return "orange";
  //       }
  //     }
  //   } else {
  //       return "orange";
  //   }
  // }

  // function defineFontColor(index){
  //   // cor dos elementos da tabela...
  //   if (isCheckedShowPreviousYears){
  //     if (isCheckedDescOrder){
  //       if (index < 5){
  //         return "black";
  //       } else {
  //         return "#55757A";
  //       }
  //     } else {
  //       if (index < 4){
  //         return "#55757A"; //"darkgray"
  //       } else {
  //         return "black";
  //       }
  //     }
  //   }
  // }

  useEffect (()=> {
    if (isCheckedDescOrder){
      for (let i = 0; i < 5 ; i++){
        combinedArray[i] = forecastedFinancialData[i];
      }; 
      if (isCheckedShowPreviousYears) {
        for (let j = 0; j < 4 ; j++){    //j < 3
          combinedArray[j+5] = historicalFinancialData[j];
          combinedArray[j+5].discountedCashFlow = 0;
        };
      }
    } 
    else {
      if (isCheckedShowPreviousYears) {
        for (let k = 3; k >= 0 ; k--){      // k = 2
          combinedArray[Math.abs(k-3)] = historicalFinancialData[k];
          combinedArray[Math.abs(k-3)].discountedCashFlow = 0;
        };
      }
      for (let k = 4; k >= 0 ; k--){
        combinedArray[Math.abs(k-4)+4] = forecastedFinancialData[k];
      };
    }
    setFinancialArray(combinedArray);
  },[forecastedFinancialData, isCheckedDescOrder, isCheckedShowPreviousYears, historicalFinancialData])

  return (
    <>
    { historicalFinancialData ? <div>
      { isCheckedShowIncStatement ? //{ ! isEstimateFcffOnly && isCheckedShowIncStatement ? 
        <TableDCFIncomeStatement financialArray = {financialArray} isCheckedShowPreviousYears={isCheckedShowPreviousYears} isCheckedDescOrder={isCheckedDescOrder} />
      : ""} 
      <TableDCFCashFlow financialArray = {financialArray} isCheckedShowPreviousYears = {isCheckedShowPreviousYears} isCheckedDescOrder = {isCheckedDescOrder} />

  {/* <TableContainer component={Paper}>
    <Table className={classes.table} size="small" aria-label="stycky header">
    
      <TableHead className={classes.TableHeader}>
        <TableRow>
          <TableCell className={classes.TableTitle} align="left" >Free Cash Flow</TableCell>
          {financialArray.map ((currElement, index) => (
            <TableCell className={classes.TableYears} align="right" style={{color:defineColor(index)}}>{currElement.year}</TableCell>
          ))} 
        </TableRow>
      </TableHead>
      <TableBody>
          <TableRow>
            <TableCell align="left" className={classes.TableRows}>EBIT</TableCell>
            {financialArray.map ((currElement) => (
              <TableCell align="right" className={classes.TableRows} >{Intl.NumberFormat('en-US',{style:'decimal',minimumFractionDigits:1,maximumFractionDigits:1}).format(currElement.ebit)}</TableCell>
            ))} 
          </TableRow>

          <TableRow>
            <TableCell align="left" className={classes.TableRows}>(-) Taxes</TableCell>
            {financialArray.map ((currElement) => (
              <TableCell align="right" className={classes.TableRows} >{Intl.NumberFormat('en-US',{style:'decimal',minimumFractionDigits:1,maximumFractionDigits:1}).format(currElement.incomeTaxExpense)}</TableCell>
            ))}
          </TableRow>

          <TableRow>
            <TableCell align="left" className={classes.TableRows}>(+) Depreciation</TableCell>
            {financialArray.map ((currElement) => (
              <TableCell align="right" className={classes.TableRows} >{Intl.NumberFormat('en-US',{style:'decimal',minimumFractionDigits:1,maximumFractionDigits:1}).format(currElement.depreciation *-1)}</TableCell>
            ))} 
          </TableRow>

          <TableRow>
            <TableCell align="left" className={classes.TableRows}>(-) Capex</TableCell>
            {financialArray.map ((currElement) => (
              <TableCell align="right" className={classes.TableRows} >{Intl.NumberFormat('en-US',{style:'decimal',minimumFractionDigits:1,maximumFractionDigits:1}).format(currElement.capitalExpenditures)}</TableCell>
            ))} 
          </TableRow>

          <TableRow>
            <TableCell align="left" className={classes.TableRows}>(-) NWC Changes</TableCell>
            {financialArray.map ((currElement) => (
              <TableCell align="right" className={classes.TableRows} >{Intl.NumberFormat('en-US',{style:'decimal',minimumFractionDigits:1,maximumFractionDigits:1}).format(currElement.workingCapitalChanges)}</TableCell>
            ))}
          </TableRow>
          <TableRow>
            <TableCell align="left" className={classes.TableRowsSubtitle}>Free Cash Flow to Firm</TableCell>
            {financialArray.map ((currElement) => (
              <TableCell align="right" className={classes.TableRowsSubtitle} >{Intl.NumberFormat('en-US',{style:'decimal',minimumFractionDigits:1,maximumFractionDigits:1}).format(currElement.cashFlow)}</TableCell>
            ))} 
          </TableRow>
          <TableRow>
            <Tooltip title="Discounted Free Cash Flow of the Firm">
              <TableCell align="left" className={classes.TableRowsSubtitle}>Discounted FCFF</TableCell>
            </Tooltip>
            {financialArray.map ((currElement) => ( 
              <TableCell align="right" className={classes.TableRowsSubtitle} >{Intl.NumberFormat('en-US',{style:'decimal',minimumFractionDigits:1,maximumFractionDigits:1}).format(currElement.discountedCashFlow)}</TableCell> 
            ))}  
          </TableRow>
        </TableBody>
    </Table>
  </TableContainer>  */}


  </div>: "" }
  </>
  )
}