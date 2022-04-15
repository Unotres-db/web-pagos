import React from 'react';

import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tooltip, Typography, useMediaQuery } from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';

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
    [mainTheme.breakpoints.down('xs')]: {
      fontSize: "10px"
    },
    color: "white",
  }
  }));

export default function TableDCFCashFlow ({financialArray, assumptions, isCheckedShowPreviousYears, isCheckedDescOrder, isEstimateFcffOnly}){ 
  const classes = useStyles();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('xs'));

  const dataRows = [
    { id: 0,
      rowText:"Earnings Before Interest & Taxes",
      rowMobileText:"EBIT",
      grayBackground:true,
      showAsBlankIfZero:true,  
      style:"decimal",
      dataField:"ebit" },
    { id: 1,
      rowText:"(-) Income Taxes",
      rowMobileText:"(-) Taxes",
      grayBackground:false,
      showAsBlankIfZero:true,
      style:"decimal",
      dataField:"incomeTaxExpense" },  
    { id: 2,
      rowText:"(+) Depreciation",
      rowMobileText:"(+) Depreciation",
      grayBackground:false,
      showAsBlankIfZero:true,
      style:"decimal",
      dataField:"depreciation"}, 
    { id: 3,
      rowText:"(-) Capex",
      rowMobileText:"(-) Capex",
      grayBackground:false,
      showAsBlankIfZero:true,
      style:"decimal",
      dataField:"capitalExpenditures"},  
    { id: 4,
      rowText:"(-) Net Working Capital Changes",
      rowMobileText:"(-) NWC Changes",
      grayBackground:false,
      showAsBlankIfZero:true,
      style:"decimal",
      dataField:"workingCapitalChanges"},
    { id: 5,
      rowText:"Free Cash Flow of the Firm",
      rowMobileText:"Free Cash Flow",
      grayBackground:true,
      showAsBlankIfZero:false,
      style:"decimal",
      dataField: "cashFlow"}, 
    { id: 6,
      rowText:"Discounted FCFF",
      rowMobileText:"Discounted FCFF",
      grayBackground:true,
      showAsBlankIfZero:true,
      style:"decimal",
      dataField: "discountedCashFlow"} 
  ]

  function defineYearsColWidth (){
    if (isCheckedShowPreviousYears){
      return (0.78/(+assumptions.cashFlowDiscretePeriod + 3)*100).toString + "%"
    } 
    return (0.78/(+assumptions.cashFlowDiscretePeriod)*100).toString + "%"
  }

  function defineYearsColColor( index ){
  if (isCheckedShowPreviousYears){
    if (isCheckedDescOrder){
      if (index < assumptions.cashFlowDiscretePeriod){
        return theme.palette.secondary.main
      } 
      return "whitesmoke"; 
    } if (index < 3){
        return "whitesmoke"; 
      } 
      return theme.palette.secondary.main;
  } 
    return theme.palette.secondary.main;
  }

  function defineYearsColBackColor( index ){
  if (isCheckedShowPreviousYears){
    if (isCheckedDescOrder){
      if (index < assumptions.cashFlowDiscretePeriod) { 
        return theme.palette.primary.main;
      } 
      return theme.palette.tertiary.main;
    } if (index < 3){
        return theme.palette.tertiary.main;
      } 
      return theme.palette.primary.main;
  } return theme.palette.primary.main;
  }

  function defineNumberFormat(number, style, showAsBlankIfZero){
    if (isEstimateFcffOnly && showAsBlankIfZero[0])  {
      if (number[0] === 0.00 ) {
        return ""
      }
      return Intl.NumberFormat('en-US',{style:style,minimumFractionDigits:1,maximumFractionDigits:1}).format(number);
    } 
    if (number[0] === 0.00 ) {
      return ""
    }
    return Intl.NumberFormat('en-US',{style:style,minimumFractionDigits:1,maximumFractionDigits:1}).format(number); 
  } 


  return (
    <>
    <Paper>
      <TableContainer component = {Paper}>
      <Table className = {classes.table} size="small" aria-label="stycky header">

        <TableHead >
          <TableRow>
            <TableCell className={classes.tableTitle} align="left" >{isMobile || assumptions.cashFlowDiscretePeriod > 7 ? "Free Cash Flow": "Free Cash Flow of the Firm"}</TableCell>  
            {financialArray.map ((currElement, index) => ( 
              <TableCell className={classes.yearColumnStyle} align="right" style={{color:defineYearsColColor(index), backgroundColor:defineYearsColBackColor(index), width:defineYearsColWidth()}}>{currElement.year}</TableCell>
            ))} 
          </TableRow>
        </TableHead>

        <TableBody>
        {dataRows.map ((accountElement)=> (
          <TableRow>
            <TableCell align="left" className = {accountElement.grayBackground ? classes.firstColumnGrayStyle : classes.firstColumnWhiteStyle } >{isMobile || assumptions.cashFlowDiscretePeriod > 7 ? accountElement.rowMobileText: accountElement.rowText}</TableCell>
            {financialArray.map ((yearElement) => ( 
              <TableCell align="right" className = {accountElement.grayBackground ? classes.dataColumnGrayStyle : classes.dataColumnWhiteStyle} style = {{ width:defineYearsColWidth()}} >{defineNumberFormat([yearElement[accountElement.dataField]], [accountElement.style], [accountElement.showAsBlankIfZero]) }</TableCell>
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