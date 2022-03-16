import React, {useState, useEffect} from 'react';

import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tooltip } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import useValuation from '../hooks/useValuation';

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
    fontSize: 9  //11
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

export default function TableDCFFinancials ({historicalFinancialData, forecastedFinancialData,  isCheckedDescOrder,isCheckedShowIncStatement, isCheckedShowPreviousYears}){
  const classes = useStyles()
  let combinedArray = [];
  const [financialArray, setFinancialArray] = useState([]);
  // const {calcValuation} = useValuation(freeCashFlow, setFreeCashFlow, valuation, setValuation);
  console.log(historicalFinancialData);

  function defineColor(index){
    if (isCheckedShowPreviousYears){
      if (isCheckedDescOrder){
        if (index < 5){
          return "orange";
        } else {
          return "whitesmoke";//"#55757A";
        }
      } else {
        if (index < 3){
          return "whitesmoke"; //"darkgray"
        } else {
          return "orange";
        }
      }
    } else {
        return "orange";
    }
  }

  function defineFontColor(index){
    // cor dos elementos da tabela...
    if (isCheckedShowPreviousYears){
      if (isCheckedDescOrder){
        if (index < 5){
          return "black";
        } else {
          return "#55757A";
        }
      } else {
        if (index < 3){
          return "#55757A"; //"darkgray"
        } else {
          return "black";
        }
      }
    }
  }

  useEffect (()=> {
    
    if (isCheckedDescOrder){
      for (let i = 0; i < 5 ; i++){
        combinedArray[i] = forecastedFinancialData[i];
      }; 
      if (isCheckedShowPreviousYears) {
        for (let j = 0; j < 3 ; j++){    //j < 3
          combinedArray[j+5] = historicalFinancialData[j];
          combinedArray[j+5].discountedFcff = 0;
        };
      }
    } 
    else {
      if (isCheckedShowPreviousYears) {
        for (let k = 2; k >= 0 ; k--){      // k = 2
          combinedArray[Math.abs(k-2)] = historicalFinancialData[k];
          combinedArray[Math.abs(k-2)].discountedFcff = 0;
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
    <TableContainer component={Paper}>
      <Table className={classes.table} size="small" aria-label="stycky header">
        <TableHead className={classes.TableHeader}>
          <TableRow>
            <TableCell className={classes.TableTitle}  style={{ width: "30%" }} align="left">Income Statement</TableCell>
            {financialArray.map ((currElement, index) => (
              <TableCell className={classes.TableYears} style={{color:defineColor(index)}} align="right">{currElement.year}</TableCell>
              ))}
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell align="left" className={classes.TableRowsSubtitle} >Revenue</TableCell>
            {financialArray.map ((currElement, index) => (
              <TableCell align="right" className={classes.TableRowsSubtitle} >{Intl.NumberFormat('en-US',{style:'decimal',minimumFractionDigits:1,maximumFractionDigits:1}).format(currElement.totalRevenue)}</TableCell>
            ))}
          </TableRow>
          <TableRow>
            <TableCell align="left" className={classes.TableRows}>Cost</TableCell>
            {financialArray.map ((currElement) => (
              <TableCell align="right" className={classes.TableRows} >{Intl.NumberFormat('en-US',{style:'decimal',minimumFractionDigits:1,maximumFractionDigits:1}).format(currElement.costOfRevenue)}</TableCell>
            ))}
          </TableRow>
          <TableRow>
            <TableCell align="left" className={classes.TableRowsSubtitle}>Gross Profit</TableCell>
            {financialArray.map ((currElement) => (
              <TableCell align="right" className={classes.TableRowsSubtitle} >{Intl.NumberFormat('en-US',{style:'decimal',minimumFractionDigits:1,maximumFractionDigits:1}).format(currElement.grossProfit)}</TableCell>
            ))}
          </TableRow>
          <TableRow>
            <TableCell align="left" className={classes.TableRowsSubtitle}>Margin %</TableCell>
            {financialArray.map ((currElement) => (
              <TableCell align="right" className={classes.TableRowsSubtitle} >{Intl.NumberFormat('en-US',{style:'percent',minimumFractionDigits:1,maximumFractionDigits:1}).format(currElement.totalRevenue > 0? (currElement.grossProfit/currElement.totalRevenue) : 0)}</TableCell>
            ))}  
          </TableRow>
          <TableRow>
            <TableCell align="left" className={classes.TableRows}>Operating Expenses</TableCell>
            {financialArray.map ((currElement) => (
              <TableCell align="right" className={classes.TableRows} >{Intl.NumberFormat('en-US',{style:'decimal',minimumFractionDigits:1,maximumFractionDigits:1}).format(currElement.totalOperatingExpenses)}</TableCell>
            ))}
          </TableRow>
          <TableRow>
            <TableCell align="left" className={classes.TableRows}>Depreciation</TableCell>
            {financialArray.map ((currElement) => (
              <TableCell align="right" className={classes.TableRows} >{Intl.NumberFormat('en-US',{style:'decimal',minimumFractionDigits:1,maximumFractionDigits:1}).format(currElement.depreciation)}</TableCell>
            ))}
          </TableRow>
          <TableRow>
            <TableCell align="left" className={classes.TableRows}>Interest Expense</TableCell>
            {financialArray.map ((currElement) => (
              <TableCell align="right" className={classes.TableRows} >{Intl.NumberFormat('en-US',{style:'decimal',minimumFractionDigits:1,maximumFractionDigits:1}).format(currElement.interestExpense)}</TableCell>
            ))}
          </TableRow>
          <TableRow>
            <TableCell align="left" className={classes.TableRows}>Other Income/(Exp.)</TableCell>
            {financialArray.map ((currElement) => (
              <TableCell align="right" className={classes.TableRows} >{Intl.NumberFormat('en-US',{style:'decimal',minimumFractionDigits:1,maximumFractionDigits:1}).format(currElement.other)}</TableCell>
            ))}
          </TableRow>
          <TableRow>
            <TableCell align="left" className={classes.TableRowsSubtitle}>Pre-Tax Income</TableCell>
            {financialArray.map ((currElement) => (
              <TableCell align="right" className={classes.TableRowsSubtitle} >{Intl.NumberFormat('en-US',{style:'decimal',minimumFractionDigits:1,maximumFractionDigits:1}).format(currElement.incomeBeforeTax)}</TableCell>
            ))}
          </TableRow>
          <TableRow>
            <TableCell align="left" className={classes.TableRows}>Income Taxes</TableCell>
            {financialArray.map ((currElement) => (
              <TableCell align="right" className={classes.TableRows} >{Intl.NumberFormat('en-US',{style:'decimal',minimumFractionDigits:1,maximumFractionDigits:1}).format(currElement.incomeTaxExpense)}</TableCell>
            ))}
          </TableRow>
          <TableRow>
            <TableCell align="left" className={classes.TableRowsSubtitle}>Net Income</TableCell>
            {financialArray.map ((currElement) => (
              <TableCell align="right" className={classes.TableRowsSubtitle} >{Intl.NumberFormat('en-US',{style:'decimal',minimumFractionDigits:1,maximumFractionDigits:1}).format(currElement.netIncome)}</TableCell>
            ))}
          </TableRow>

        </TableBody>
    </Table>
  </TableContainer>
  <TableContainer component={Paper}>
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
              <TableCell align="right" className={classes.TableRowsSubtitle} >{Intl.NumberFormat('en-US',{style:'decimal',minimumFractionDigits:1,maximumFractionDigits:1}).format(currElement.ebit+currElement.incomeTaxExpense-currElement.depreciation+currElement.capitalExpenditures+currElement.workingCapitalChanges)}</TableCell>
            ))}
          </TableRow>
          <TableRow>
            <Tooltip title="Discounted Free Cash Flow of the Firm">
              <TableCell align="left" className={classes.TableRowsSubtitle}>Discounted FCFF</TableCell>
            </Tooltip>
            {financialArray.map ((currElement) => ( 
              <TableCell align="right" className={classes.TableRowsSubtitle} >{Intl.NumberFormat('en-US',{style:'decimal',minimumFractionDigits:1,maximumFractionDigits:1}).format(currElement.discountedFcff)}</TableCell> 
            ))} 
          </TableRow>
        </TableBody>
    </Table>
  </TableContainer> 
  </div>: 0 }
  </>
  )
}