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

export default function BalanceSheet ({ combinedFinancialData, assumptions, isCheckedShowPreviousYears, isCheckedDescOrder, isEstimateFcffOnly }){
  const classes = useStyles();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('xs'));
  const dataRows = [
    { id: 0,
      rowText:"Total Current Assets",
      rowMobileText:"Curr Assets",
      grayBackground:true,
      showAsBlankIfZero:true,  
      style:"decimal",
      dataField: "totalCurrentAssets"},
    { id: 1,
      rowText:"Cash",
      rowMobileText:"Cash",
      grayBackground:false,
      showAsBlankIfZero:true,  
      style:"decimal",
      dataField: "cash"},  
    { id: 2,
      rowText:"Short Term Investments",
      rowMobileText:"Short Term Inv.",
      grayBackground:false,
      showAsBlankIfZero:true,  
      style:"decimal",
      dataField: "shortTermInvestments"},  
    { id: 3,
      rowText:"Inventory",
      rowMobileText:"Tnventory",
      grayBackground:false,
      showAsBlankIfZero:true,  
      style:"decimal",
      dataField: "inventory"},  
    { id: 4,
      rowText:"Net Receivables",
      rowMobileText:"Receivables",
      grayBackground:false,
      showAsBlankIfZero:true,  
      style:"decimal",
      dataField: "netReceivables"},  
    { id: 5,
      rowText:"Other Current Assets",
      rowMobileText:"Other Curr Assets",
      grayBackground:false,
      showAsBlankIfZero:true,  
      style:"decimal",
      dataField: "otherCurrentAssets"},  
    { id: 6,
      rowText:"Property Plant & Equipment",
      rowMobileText:"PP&E",
      grayBackground:false,
      showAsBlankIfZero:true,  
      style:"decimal",
      dataField: "propertyPlantEquipment"},  
    { id: 7,
      rowText:"Long Term Investments",
      rowMobileText:"Lontg Term Inv.",
      grayBackground:false,
      showAsBlankIfZero:true,  
      style:"decimal",
      dataField: "longTermInvestments"},  
    { id: 8,
      rowText:"GoodWill",
      rowMobileText:"GoodWill",
      grayBackground:false,
      showAsBlankIfZero:true,  
      style:"decimal",
      dataField: "goodWill"},  
    { id: 9,
      rowText:"Intangible Assets",
      rowMobileText:"Intang. Assets",
      grayBackground:false,
      showAsBlankIfZero:true,  
      style:"decimal",
      dataField: "intangibleAssets"},  
    { id: 10,
      rowText:"Net Tangible Assets",
      rowMobileText:"Tangbl. Assets",
      grayBackground:false,
      showAsBlankIfZero:true,  
      style:"decimal",
      dataField: "netTangibleAssets"},  
    { id: 11,
      rowText:"Other Assets",
      rowMobileText:"Other Assets",
      grayBackground:false,
      showAsBlankIfZero:true,  
      style:"decimal",
      dataField: "otherAssets"},  
    { id: 12,
      rowText:"Total Assets",
      rowMobileText:"Total Assets",
      grayBackground:false,
      showAsBlankIfZero:true,  
      style:"decimal",
      dataField: "totalAssets"},  
    { id: 13,
      rowText:"",
      rowMobileText:"",
      grayBackground:false,
      showAsBlankIfZero:true,  
      style:"decimal",
      dataField: ""},  
    { id: 14,
      rowText:"",
      rowMobileText:"",
      grayBackground:false,
      showAsBlankIfZero:true,  
      style:"decimal",
      dataField: ""},  
    { id: 15,
      rowText:"",
      rowMobileText:"",
      grayBackground:false,
      showAsBlankIfZero:true,  
      style:"decimal",
      dataField: ""},  
    { id: 16,
      rowText:"",
      rowMobileText:"",
      grayBackground:false,
      showAsBlankIfZero:true,  
      style:"decimal",
      dataField: ""},  
    { id: 17,
      rowText:"",
      rowMobileText:"",
      grayBackground:false,
      showAsBlankIfZero:true,  
      style:"decimal",
      dataField: ""},  
    { id: 18,
      rowText:"",
      rowMobileText:"",
      grayBackground:false,
      showAsBlankIfZero:true,  
      style:"decimal",
      dataField: ""},  
    { id: 19,
      rowText:"",
      rowMobileText:"",
      grayBackground:false,
      showAsBlankIfZero:true,  
      style:"decimal",
      dataField: ""},  
    { id: 20,
      rowText:"",
      rowMobileText:"",
      grayBackground:false,
      showAsBlankIfZero:true,  
      style:"decimal",
      dataField: ""},  
    { id: 21,
      rowText:"",
      rowMobileText:"",
      grayBackground:false,
      showAsBlankIfZero:true,  
      style:"decimal",
      dataField: ""},  
    { id: 22,
      rowText:"",
      rowMobileText:"",
      grayBackground:false,
      showAsBlankIfZero:true,  
      style:"decimal",
      dataField: ""},  
    { id: 23,
      rowText:"",
      rowMobileText:"",
      grayBackground:false,
      showAsBlankIfZero:true,  
      style:"decimal",
      dataField: ""},  
    { id: 24,
      rowText:"",
      rowMobileText:"",
      grayBackground:false,
      showAsBlankIfZero:true,  
      style:"decimal",
      dataField: ""},  
    { id: 25,
      rowText:"",
      rowMobileText:"",
      grayBackground:false,
      showAsBlankIfZero:true,  
      style:"decimal",
      dataField: ""},  
  ]

  function defineYearsColWidth () {
    if (isCheckedShowPreviousYears){
      return (0.78/(+assumptions.cashFlowDiscretePeriod + 3)*100).toString + "%"
    } 
    return (0.78/(+assumptions.cashFlowDiscretePeriod)*100).toString + "%"
  }

  function defineYearsColColor( index ) {
  if (isCheckedShowPreviousYears){
    if (isCheckedDescOrder) {
      if (index < assumptions.cashFlowDiscretePeriod){
        return theme.palette.secondary.main
      } 
      return "whitesmoke"; 
    } if (index < 3) {
        return "whitesmoke"; 
      } 
      return theme.palette.secondary.main;
  } 
    return theme.palette.secondary.main;
  }

  function defineYearsColBackColor( index ) {
  if (isCheckedShowPreviousYears){
    if (isCheckedDescOrder) {
      if (index < assumptions.cashFlowDiscretePeriod) { 
        return theme.palette.primary.main;
      } 
      return theme.palette.tertiary.main;
    } if (index < 3) {
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
      if (style[0] === "percent") {
        return Intl.NumberFormat('en-US',{style:"percent", minimumFractionDigits:1,maximumFractionDigits:1}).format(number/100);
      } else {
          return Intl.NumberFormat('en-US',{style:"decimal", minimumFractionDigits:1,maximumFractionDigits:1}).format(number);
        }
    } 
    if (number[0] === 0.00 ) {
      return ""
    }
    if (style[0] === "percent") {
        return Intl.NumberFormat('en-US',{style:"percent", minimumFractionDigits:1,maximumFractionDigits:1}).format(number/100); 
    } else { 
        return Intl.NumberFormat('en-US',{style:"decimal", minimumFractionDigits:1,maximumFractionDigits:1}).format(number); 
      }
  }

  return (
    <>
    <Paper>
      <TableContainer component = {Paper}>
        <Table className = {classes.table} size = "small" aria-label = "stycky header">

          <TableHead>
            <TableRow>
              <TableCell className = {classes.tableTitle} align = "left" >{isMobile || assumptions.cashFlowDiscretePeriod > 7 ? "Inc. Statement": "Income Statement"}</TableCell>  
              {combinedFinancialData.map ((currElement, index) => ( 
                <TableCell className = {classes.yearColumnStyle} align = "right" style = {{color:defineYearsColColor(index), backgroundColor:defineYearsColBackColor(index), width:defineYearsColWidth()}} >{currElement.year}</TableCell>
              ))} 
            </TableRow>
          </TableHead>

          <TableBody>
          {dataRows.map ((accountElement)=> (
            <TableRow>
              <TableCell align="left" className = {accountElement.grayBackground ? classes.firstColumnGrayStyle : classes.firstColumnWhiteStyle } >{isMobile || assumptions.cashFlowDiscretePeriod > 7 ? accountElement.rowMobileText: accountElement.rowText}</TableCell>
              {combinedFinancialData.map ((yearElement) => ( 
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