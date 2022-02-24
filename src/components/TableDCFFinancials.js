import React, {useState, useEffect} from 'react';

import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

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
    fontSize: 11
  },
  TableRows : {
    fontSize: 9,
    backgroundColor: "whitesmoke",
    },
  TableRowsSubtitle : {
    fontSize: 9,
    height: 16,
    backgroundColor: "#d3d3d3",//light gray
    }  
  }));

export default function TableDCFFinancials ({historyFinancialData, freeCashFlow, discountedFreeCashFlow, isCheckedDescOrder}){
  const classes = useStyles()
  let combinedArray = [];
  let emptyFcff = [{year:0,fcff:0},{year:0,fcff:0},{year:0,fcff:0}] // ---gambiarra.com
  const [financialArray, setFinancialArray] = useState([]);

  useEffect (()=> {
    if (isCheckedDescOrder){
      for (let i = 0; i < 5 ; i++){
        combinedArray[i] = freeCashFlow[i];
      }; 
      for (let j = 0; j < 3 ; j++){
        combinedArray[j+5] = historyFinancialData[j];
      };
    } 
    else {
      for (let k = 2; k >= 0 ; k--){
        combinedArray[Math.abs(k-2)] = historyFinancialData[k];
      };
      for (let k = 4; k >= 0 ; k--){
        combinedArray[Math.abs(k-4)+4] = freeCashFlow[k];
      };
    }
    setFinancialArray(combinedArray);
  },[freeCashFlow, isCheckedDescOrder])

  return (
    <>
    <TableContainer component={Paper}>
      <Table className={classes.table} size="small" aria-label="stycky header">
        <TableHead className={classes.TableHeader}>
          <TableRow>
            <TableCell className={classes.TableTitle} align="left">Inc. Statement</TableCell>
  
            {financialArray.map ((currElement) => (
              <TableCell className={classes.TableTitle} align="right">{currElement.year}</TableCell>
              ))}
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell align="left" className={classes.TableRowsSubtitle} style={{ width: "30%" }}>Revenue</TableCell>
            {financialArray.map ((currElement) => (
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
            <TableCell align="left" className={classes.TableRows}>Other Income(Exp.)</TableCell>
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
            <TableCell className={classes.TableTitle} align="left">Free Cash Flow</TableCell>
            {financialArray.map ((currElement) => (
              <TableCell className={classes.TableTitle} align="right">{currElement.year}</TableCell>
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
            <TableCell align="left" className={classes.TableRowsSubtitle}>Free Cash Flow</TableCell>
            {financialArray.map ((currElement) => (
              <TableCell align="right" className={classes.TableRowsSubtitle} >{Intl.NumberFormat('en-US',{style:'decimal',minimumFractionDigits:1,maximumFractionDigits:1}).format(currElement.ebit+currElement.incomeTaxExpense-currElement.depreciation+currElement.capitalExpenditures+currElement.workingCapitalChanges)}</TableCell>
            ))}
          </TableRow>
          <TableRow>
            <TableCell align="left" className={classes.TableRowsSubtitle}>Discounted CF</TableCell>
            {discountedFreeCashFlow.map ((currElement) => (
              <TableCell align="right" className={classes.TableRowsSubtitle} >{Intl.NumberFormat('en-US',{style:'decimal',minimumFractionDigits:1,maximumFractionDigits:1}).format(currElement.fcff)}</TableCell>
            ))}
            {emptyFcff.map((currElement) =>(
              <TableCell align="right" className={classes.TableRowsSubtitle} >{Intl.NumberFormat('en-US',{style:'decimal',minimumFractionDigits:0,maximumFractionDigits:0}).format(currElement.fcff)}</TableCell>
            ))}
          </TableRow>
        </TableBody>
    </Table>
  </TableContainer> 
 
  </>
  )
}