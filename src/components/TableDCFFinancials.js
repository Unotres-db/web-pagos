import React from 'react';

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

export default function TableDCFFinancials ({historyFinancialData, freeCashFlow, discountedFreeCashFlow}){
  // {historyFinYear0, historyFinYear1, historyFinYear2, historyFinYear3}
  const classes = useStyles()
  console.log(freeCashFlow);
  return (
    <>
    <TableContainer component={Paper}>
      <Table className={classes.table} size="small" aria-label="stycky header">
        <TableHead className={classes.TableHeader}>
          <TableRow>
            <TableCell className={classes.TableTitle} align="left">Income Statement</TableCell>
            {historyFinancialData.map ((currElement) => (
              <TableCell className={classes.TableTitle} align="right">{currElement.year}</TableCell>
              ))}
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell align="left" className={classes.TableRows}>Revenue</TableCell>
              {historyFinancialData.map ((currElement) => (
                // <TableCell align="right" className={classes.TableRows} >{Intl.NumberFormat('en-US',{style:'currency',currency:'USD'}).format(currElement.totalRevenue)}</TableCell>
                <TableCell align="right" className={classes.TableRows} >{Intl.NumberFormat('en-US',{style:'decimal',minimumFractionDigits:1}).format(currElement.totalRevenue)}</TableCell>
              ))}
          </TableRow>
          <TableRow>
            <TableCell align="left" className={classes.TableRows}>Cost</TableCell>
              {historyFinancialData.map ((currElement) => (
                <TableCell align="right" className={classes.TableRows} >{Intl.NumberFormat('en-US',{style:'decimal',minimumFractionDigits:1}).format(currElement.costOfRevenue)}</TableCell>
              ))}
          </TableRow>
          <TableRow>
            <TableCell align="left" className={classes.TableRowsSubtitle}>Gross Profit</TableCell>
              {historyFinancialData.map ((currElement) => (
                <TableCell align="right" className={classes.TableRowsSubtitle} >{Intl.NumberFormat('en-US',{style:'decimal',minimumFractionDigits:1}).format(currElement.grossProfit)}</TableCell>
              ))}
          </TableRow>
          <TableRow>
            <TableCell align="left" className={classes.TableRows}>Operating Expenses</TableCell>
              {historyFinancialData.map ((currElement) => (
                <TableCell align="right" className={classes.TableRows} >{Intl.NumberFormat('en-US',{style:'decimal',minimumFractionDigits:1}).format(currElement.totalOperatingExpenses)}</TableCell>
              ))}
          </TableRow>
          <TableRow>
            <TableCell align="left" className={classes.TableRows}>Depreciation</TableCell>
              {historyFinancialData.map ((currElement) => (
                <TableCell align="right" className={classes.TableRows} >{Intl.NumberFormat('en-US',{style:'decimal',minimumFractionDigits:1}).format(currElement.depreciation)}</TableCell>
              ))}
          </TableRow>
          <TableRow>
            <TableCell align="left" className={classes.TableRows}>Interest Expense</TableCell>
              {historyFinancialData.map ((currElement) => (
                <TableCell align="right" className={classes.TableRows} >{Intl.NumberFormat('en-US',{style:'decimal',minimumFractionDigits:1}).format(currElement.interestExpense)}</TableCell>
              ))}
          </TableRow>
          <TableRow>
            <TableCell align="left" className={classes.TableRows}>Other Income(Expense)</TableCell>
              {historyFinancialData.map ((currElement) => (
                <TableCell align="right" className={classes.TableRows} >{Intl.NumberFormat('en-US',{style:'decimal',minimumFractionDigits:1}).format(currElement.other)}</TableCell>
              ))}
          </TableRow>
          <TableRow>
            <TableCell align="left" className={classes.TableRowsSubtitle}>Pre-Tax Income</TableCell>
              {historyFinancialData.map ((currElement) => (
                <TableCell align="right" className={classes.TableRowsSubtitle} >{Intl.NumberFormat('en-US',{style:'decimal',minimumFractionDigits:1}).format(currElement.incomeBeforeTax)}</TableCell>
              ))}
          </TableRow>
          <TableRow>
            <TableCell align="left" className={classes.TableRows}>Income Taxes</TableCell>
            {historyFinancialData.map ((currElement) => (
              <TableCell align="right" className={classes.TableRows} >{Intl.NumberFormat('en-US',{style:'decimal',minimumFractionDigits:1}).format(currElement.incomeTaxExpense)}</TableCell>
            ))}
          </TableRow>
          <TableRow>
            <TableCell align="left" className={classes.TableRowsSubtitle}>Net Income</TableCell>
            {historyFinancialData.map ((currElement) => (
              <TableCell align="right" className={classes.TableRowsSubtitle} >{Intl.NumberFormat('en-US',{style:'decimal',minimumFractionDigits:1}).format(currElement.netIncome)}</TableCell>
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
            {historyFinancialData.map ((currElement) => (
              <TableCell className={classes.TableTitle} align="right">{currElement.year}</TableCell>
              ))}
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell align="left" className={classes.TableRows}>EBIT</TableCell>
              {historyFinancialData.map ((currElement) => (
                // <TableCell align="right" className={classes.TableRows} >{Intl.NumberFormat('en-US',{style:'currency',currency:'USD'}).format(currElement.totalRevenue)}</TableCell>
                <TableCell align="right" className={classes.TableRows} >{Intl.NumberFormat('en-US',{style:'decimal',minimumFractionDigits:2}).format(currElement.ebit)}</TableCell>
              ))}
          </TableRow>
          <TableRow>
            <TableCell align="left" className={classes.TableRows}>(-) Taxes</TableCell>
              {historyFinancialData.map ((currElement) => (
                <TableCell align="right" className={classes.TableRows} >{Intl.NumberFormat('en-US',{style:'decimal',minimumFractionDigits:2}).format(currElement.incomeTaxExpense)}</TableCell>
              ))}
          </TableRow>
          <TableRow>
            <TableCell align="left" className={classes.TableRows}>(+) Depreciation</TableCell>
              {historyFinancialData.map ((currElement) => (
                <TableCell align="right" className={classes.TableRows} >{Intl.NumberFormat('en-US',{style:'decimal',minimumFractionDigits:2}).format(currElement.depreciation)}</TableCell>
              ))}
          </TableRow>
          <TableRow>
            <TableCell align="left" className={classes.TableRows}>(-) Capex</TableCell>
              {historyFinancialData.map ((currElement) => (
                <TableCell align="right" className={classes.TableRows} >{Intl.NumberFormat('en-US',{style:'decimal',minimumFractionDigits:2}).format(currElement.capitalExpenditures)}</TableCell>
              ))}
          </TableRow>
          <TableRow>
            <TableCell align="left" className={classes.TableRows}>(-) Working Cap. Chngs.</TableCell>
              {historyFinancialData.map ((currElement) => (
                <TableCell align="right" className={classes.TableRows} >{Intl.NumberFormat('en-US',{style:'decimal',minimumFractionDigits:2}).format(currElement.workingCapitalChanges)}</TableCell>
              ))}
          </TableRow>
          <TableRow>
            <TableCell align="left" className={classes.TableRowsSubtitle}>Free Cash Flow</TableCell>
            {historyFinancialData.map ((currElement) => (
              <TableCell align="right" className={classes.TableRowsSubtitle} >{Intl.NumberFormat('en-US',{style:'decimal',minimumFractionDigits:2}).format(currElement.ebit+currElement.incomeTaxExpense-currElement.depreciation+currElement.capitalExpenditures+currElement.workingCapitalChanges)}</TableCell>
            ))}
          </TableRow>
        </TableBody>
    </Table>
  </TableContainer> 
  <TableContainer component={Paper}>
      <Table className={classes.table} size="small" aria-label="stycky header">
        <TableHead className={classes.TableHeader}>
          <TableRow>
            <TableCell  width="20%" className={classes.TableTitle} align="left">Estimated FCFF</TableCell>
            {freeCashFlow.map ((currElement) => (
              <TableCell width="8%" className={classes.TableTitle} align="right">{currElement.year}</TableCell>
              ))}
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell align="left" className={classes.TableRows}>Free Cash Flow</TableCell> 
              {freeCashFlow.map ((currElement) => (
                <TableCell align="right" className={classes.TableRows} >{Intl.NumberFormat('en-US',{style:'decimal',minimumFractionDigits:2}).format(currElement.fcff)}</TableCell>
              ))}

          </TableRow>
          <TableRow>
          <TableCell align="left" className={classes.TableRows}>DCF</TableCell> 
          {discountedFreeCashFlow.map ((currElement) => (
                <TableCell align="right" className={classes.TableRows} >{Intl.NumberFormat('en-US',{style:'decimal',minimumFractionDigits:2}).format(currElement.fcff)}</TableCell>
              ))}
          </TableRow>
  
        </TableBody>
    </Table> 
  </TableContainer>
  </>
  )
}