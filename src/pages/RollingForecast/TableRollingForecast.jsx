import React from 'react';

import { Paper, TableContainer, Table, TableHead, TableBody, TableRow, TableCell, Tooltip,Typography, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';

import makeStyles from '@mui/styles/makeStyles';

import useTableStyling from '../../hooks/useTableStyling';

const useStyles = makeStyles( () => ({
  mobileTextTitleStyle:{
    marginLeft:"5px",
    fontSize:"11px",
    color: "#344955"
    },
  table: {
    minWidth: 360,
    height:"100%",
  },
  tableTitle: {
    width:"22%",
    paddingLeft:"6px",
    paddingRight:"0px",
    fontSize: 11,
    [mainTheme.breakpoints.down('sm')]: {
      fontSize: "9px"
    },
    color: "white",
    backgroundColor: "#344955",
  },  
  firstColumnWhiteStyle: {
    minWidth:"145px",
    [mainTheme.breakpoints.down('sm')]: {
      minWidth: "90px"
    },
    paddingLeft:"6px",
    paddingRight:"0px",
    fontSize:"9px",
    color:"#344955",
    backgroundColor:"whitesmoke"
  },  
  firstColumnGrayStyle: {
    minWidth:"145px",
    [mainTheme.breakpoints.down('sm')]: {
      minWidth: "90px"
    },
    paddingLeft:"6px",
    paddingRight:"0px",
    fontSize:"9px",
    color:"#344955",
    backgroundColor: "light gray"
  },
  dataColumnWhiteStyle:{
    paddingLeft:"4px",
    paddingRight:"8px",
    fontSize: "9px",
    [mainTheme.breakpoints.down('sm')]: {
      fontSize: "9px"
    },
    color:"#344955",
    backgroundColor: "whitesmoke",
  },
  dataColumnGrayStyle:{
    paddingLeft:"4px",
    paddingRight:"8px",
    fontSize: "9px",
    [mainTheme.breakpoints.down('sm')]: {
      fontSize: "9px"
    },
    color:"#344955",
    backgroundColor: "light gray"
  },
  yearColumnStyle:{
    paddingLeft:"4px",
    paddingRight:"8px",
    fontSize: "11px",
    [mainTheme.breakpoints.down('sm')]: {
      fontSize: "10px"
    },
    color: "white",
  }
  }));

export default function TableRollingForecast ({rollingForecast}){ 
  const classes = useStyles();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const { defineYearsColWidth, defineYearsColColor, defineYearsColBackColor, defineNumberFormat } = useTableStyling();
  const cashFlowDiscretePeriod= { assumptions }

  const dataRows = [
    { id: 0,
      rowText:"Facturacion (con IVA)",
      rowMobileText:"Facturacion",
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
      rowMobileText:"Gross Margin (%)",
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
      showAsBlankIfZero:false,  
      style:"decimal",
      dataField: "depreciation"}, 
    { id: 6,
      rowText:"Interest Expense",
      rowMobileText:"Interest Expense",
      grayBackground:false,
      showAsBlankIfZero:false,  
      style:"decimal",
      dataField: "interestExpense"}, 
    { id: 7,
      rowText:"Other Income/(Expenses)",
      rowMobileText:"Other Inc.(Exp.)",
      grayBackground:false,
      showAsBlankIfZero:false,  
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

  function tableTitleText (isMobile, cashFlowDiscretePeriod ) {
    if (isMobile){
      return ""
    }
    if (cashFlowDiscretePeriod < 8){
      return "Income Statement"
    }
      return "Income Statement" // "Inc. Statement"
  }


  return (
    <>
    <Paper>
      {isMobile? <Typography gutterBottom className={classes.mobileTextTitleStyle} style={{fontSize:"12px"}}><b>Income Statement (in USD billions)</b></Typography> : null}
      <TableContainer component = {Paper}>
      <Table className = {classes.table} size="small" aria-label="stycky header">

        <TableHead >
          <TableRow>
            <Tooltip title="Income Statements by year">
            <TableCell className={classes.tableTitle} align="left" >{tableTitleText(isMobile, assumptions.cashFlowDiscretePeriod)}</TableCell>  
            </Tooltip>
            {combinedFinancialData.map ((currElement, index) => ( 
              <TableCell className={classes.yearColumnStyle} align="right" style={{color:defineYearsColColor(index, assumptions, isCheckedShowPreviousYears, isCheckedDescOrder), backgroundColor:defineYearsColBackColor(index, assumptions, isCheckedShowPreviousYears, isCheckedDescOrder), width:defineYearsColWidth(assumptions, isCheckedShowPreviousYears)}}>{currElement.year}</TableCell>
            ))} 
          </TableRow>
        </TableHead>

        <TableBody>
    
        {dataRows.map ((accountElement)=> (
    
          <TableRow>
            <TableCell align="left" className = {accountElement.grayBackground ? classes.firstColumnGrayStyle : classes.firstColumnWhiteStyle } >{isMobile ? accountElement.rowMobileText: accountElement.rowText}</TableCell>
            {combinedFinancialData.map ((yearElement) => ( 
               // <>                                                                                                                                                                                                                                  number, style, showAsBlankIfZero, dataField, isEstimateFcffOnly 
              <>
              <TableCell align="right" className = {accountElement.grayBackground ? classes.dataColumnGrayStyle : classes.dataColumnWhiteStyle} style = {{ width:defineYearsColWidth(assumptions, isCheckedShowPreviousYears)}} >{defineNumberFormat([yearElement[accountElement.dataField]], [accountElement.style], [accountElement.showAsBlankIfZero],[accountElement.dataField],isEstimateFcffOnly, assumptions.cashFlowDiscretePeriod) }</TableCell>
              {/* <TableCell align="right" className = {accountElement.grayBackground ? classes.dataColumnGrayStyle : classes.dataColumnWhiteStyle} style = {{ width:defineYearsColWidth(assumptions, isCheckedShowPreviousYears)}} >{defineNumberFormat([yearElement[accountElement.dataField]], [accountElement.style], [accountElement.showAsBlankIfZero],[accountElement.dataField],isEstimateFcffOnly, 1, 1) }</TableCell> */}

              </>
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