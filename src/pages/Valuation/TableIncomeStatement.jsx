import React from 'react';

import { Paper, TableContainer, Table, TableHead, TableBody, TableRow, TableCell, Typography, Tooltip, TextField, useMediaQuery } from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';

import useTableStyling from '../../hooks/useTableStyling';

const useStyles = makeStyles( (mainTheme) => ({
  table: {
    minWidth: 360,
    height:"100%",
  },
  tableTitle:{
    width:"22%",
    paddingLeft:"6px",
    paddingRight:"0px",
    fontSize: 11,
    [mainTheme.breakpoints.down('xs')]: {
      fontSize: "9px"
    },
    color: "white",
    backgroundColor: mainTheme.palette.primary.main,
  },  
  firstColumnWhiteStyle: {
    minWidth:"145px",
    [mainTheme.breakpoints.down('xs')]: {
      minWidth: "90px"
    },
    paddingLeft:"6px",
    paddingRight:"0px",
    fontSize:"9px",
    backgroundColor:"whitesmoke"
  },  
  firstColumnGrayStyle: {
    minWidth:"145px",
    [mainTheme.breakpoints.down('xs')]: {
      minWidth: "90px"
    },
    paddingLeft:"6px",
    paddingRight:"0px",
    fontSize:"9px",
    backgroundColor: mainTheme.palette.contrast.main
  },
  dataColumnWhiteStyle:{
    paddingLeft:"4px",
    paddingRight:"8px",
    fontSize: "9px",
    [mainTheme.breakpoints.down('xs')]: {
      fontSize: "9px"
    },
    backgroundColor: "whitesmoke",
  },
  dataColumnGrayStyle:{
    paddingLeft:"4px",
    paddingRight:"8px",
    fontSize: "9px",
    [mainTheme.breakpoints.down('xs')]: {
      fontSize: "9px"
    },
    backgroundColor: mainTheme.palette.contrast.main
  },
  yearColumnStyle:{
    paddingLeft:"4px",
    paddingRight:"8px",
    fontSize: "11px",
    height: '36px',
    [mainTheme.breakpoints.down('xs')]: {
      fontSize: "10px"
    },
    color: "white",
  },
  textFieldStyle:{
    "& .MuiFilledInput-root":{
      fontSize:"9px",
      color: "black",
      backgroundColor:"whitesmoke",
      height: "25px",
    },
    "& .MuiFormControl-root": {
      height: '25px',
    },
    "& .MuiInputBase-root": {
      height: '25px',
    },
  },
  }));

export default function TableIncomeStatement ({ combinedFinancialData, assumptions, isCheckedShowPreviousYears, isCheckedDescOrder, isEstimateFcffOnly }){
  const classes = useStyles();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('xs'));
  const { defineYearsColWidth, defineYearsColColor, defineYearsColBackColor, defineNumberFormat } = useTableStyling();
  const dataRows = [
    { id: 0,
      rowText:"Revenue",
      rowMobileText:"Revenue",
      grayBackground:true,
      showAsBlankIfZero:true,  
      style:"decimal",
      dataField: "totalRevenue"},
    { id: 1,
      rowText:"Cost of Revenue",
      rowMobileText:"Cost",
      grayBackground:false,
      showAsBlankIfZero:true,  
      style:"decimal",
      dataField: "costOfRevenue"},  
    { id: 2,
      rowText:"Gross Profit",
      rowMobileText:"Gross Profit",
      grayBackground:true,
      showAsBlankIfZero:true,  
      style:"decimal",
      dataField: "grossProfit"}, 
    { id: 3,
      rowText:"Gross Margin (%)",
      rowMobileText:"Margin (%)",
      grayBackground:true,
      showAsBlankIfZero:true,  
      style:"percent",
      dataField: "grossProfitPercent"},  
    { id: 4,
      rowText:"Operating Expenses",
      rowMobileText:"Op. Expenses",
      grayBackground:false,
      showAsBlankIfZero:true,  
      style:"decimal",
      dataField: "operatingExpenses"},
    { id: 5,
      rowText:"Depreciation",
      rowMobileText:"Depreciation",
      grayBackground:false,
      showAsBlankIfZero:true,  
      style:"decimal",
      dataField: "depreciation"}, 
    { id: 6,
      rowText:"Interest Expense",
      rowMobileText:"Interest Exp.",
      grayBackground:false,
      showAsBlankIfZero:true,  
      style:"decimal",
      dataField: "interestExpense"}, 
    { id: 7,
      rowText:"Other Income/(Expenses)",
      rowMobileText:"Other Inc./Exp.",
      grayBackground:false,
      showAsBlankIfZero:true,  
      style:"decimal",
      dataField: "other"}, 
    { id: 8,
      rowText:"Pre-Tax Income",
      rowMobileText:"Pre-Tax Income",
      grayBackground:true,
      showAsBlankIfZero:true,  
      style:"decimal",
      dataField: "incomeBeforeTax"}, 
    { id: 9,
      rowText:"Income Taxes",
      rowMobileText:"Income Taxes",
      grayBackground:false,
      showAsBlankIfZero:true,  
      style:"decimal",
      dataField: "incomeTaxExpense"}, 
    { id: 10,
      rowText:"Net Income",
      rowMobileText:"Net Income",
      grayBackground:true,
      showAsBlankIfZero:true,  
      style:"decimal",
      dataField: "netIncome"}
  ]

  return (
    <>
    <Paper>
      <TableContainer component = {Paper}>
        <Table className = {classes.table} size = "small" aria-label = "stycky header">

          <TableHead>
            <TableRow>
              <TableCell className = {classes.tableTitle} align = "left" >{isMobile || assumptions.cashFlowDiscretePeriod > 7 ? "Inc. Statement": "Income Statement"}</TableCell>  
              {combinedFinancialData.map ((currElement, index) => ( 
                <TableCell className = {classes.yearColumnStyle} align = "right" style = {{color:defineYearsColColor(index, assumptions, isCheckedShowPreviousYears, isCheckedDescOrder), backgroundColor:defineYearsColBackColor(index, assumptions, isCheckedShowPreviousYears, isCheckedDescOrder), width:defineYearsColWidth(assumptions, isCheckedShowPreviousYears)}} >
                  {/* <TextField className ={classes.textFieldStyle} size="small" variant="filled" fullWidth InputProps={{ disableUnderline: true }}
                      value={currElement.year} /> */}
                  {currElement.year}
                </TableCell>
              ))} 
            </TableRow>
          </TableHead>

          <TableBody>
            {dataRows.map ((accountElement)=> (
              <TableRow>
                <TableCell align="left" className = {accountElement.grayBackground ? classes.firstColumnGrayStyle : classes.firstColumnWhiteStyle } >{isMobile || assumptions.cashFlowDiscretePeriod > 7 ? accountElement.rowMobileText: accountElement.rowText}</TableCell>
                {combinedFinancialData.map ((yearElement) => ( 
                  <TableCell align="right" className = {accountElement.grayBackground ? classes.dataColumnGrayStyle : classes.dataColumnWhiteStyle} style = {{ width:defineYearsColWidth(assumptions, isCheckedShowPreviousYears)}} > 
                    {defineNumberFormat([yearElement[accountElement.dataField]], [accountElement.style], [accountElement.showAsBlankIfZero],isEstimateFcffOnly) } 
                    {/* <TextField className ={classes.textFieldStyle} margin="none" size="small" variant="filled" fullWidth InputProps={{ disableUnderline: true }} 
                      value={[yearElement[accountElement.dataField]]} /> */}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
    </>
  )
}