import React from 'react';

import { Paper, TableContainer, Table, TableHead, TableBody, TableRow, TableCell, useMediaQuery } from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';

import useTableStyling from '../../hooks/useTableStyling';

const useStyles = makeStyles( (mainTheme) => ({
  table: {
    minWidth: 360,
    height:"100%",
  },
  tableTitle:{
    width:"20%",
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
    backgroundColor:"white"
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
    paddingRight:"0px",
    fontSize: "9px",
    [mainTheme.breakpoints.down('xs')]: {
      fontSize: "9px"
    },
    backgroundColor: "white",
  },
  dataColumnGrayStyle:{
    paddingLeft:"4px",
    paddingRight:"0px",
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

export default function TablePL ({assumptions, financialData}){
  const classes = useStyles();
  const isEstimateFcffOnly = false;
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('xs'));
  const { defineYearsColWidth, defineYearsColColor, defineYearsColBackColor, defineNumberFormat } = useTableStyling();
  const dataRows = [
    { id: 0,
      rowText:"Ventas",
      rowMobileText:"Ventas",
      grayBackground:true,
      showAsBlankIfZero:true,  
      style:"decimal",
      dataField: "totalRevenue"},
    { id: 1,
      rowText:"Costo",
      rowMobileText:"Costo",
      grayBackground:false,
      showAsBlankIfZero:true,  
      style:"decimal",
      dataField: "costOfRevenue"},  
    { id: 2,
      rowText:"Margen Bruto",
      rowMobileText:"Margen",
      grayBackground:true,
      showAsBlankIfZero:true,  
      style:"decimal",
      dataField: "grossProfit"}, 
    { id: 3,
      rowText:"Margen Bruto (%)",
      rowMobileText:"Margen (%)",
      grayBackground:true,
      showAsBlankIfZero:true,  
      style:"percent",
      dataField: "grossProfitPercent"},  
    { id: 4,
      rowText:"Gastos",
      rowMobileText:"Op. Expenses",
      grayBackground:false,
      showAsBlankIfZero:true,  
      style:"decimal",
      dataField: "operatingExpenses"},
    // { id: 5,
    //   rowText:"Depreciacion",
    //   rowMobileText:"Depreciacion",
    //   grayBackground:false,
    //   showAsBlankIfZero:true,  
    //   style:"decimal",
    //   dataField: "depreciation"}, 
    { id: 6,
      rowText:"Intereses",
      rowMobileText:"Intereses",
      grayBackground:false,
      showAsBlankIfZero:true,  
      style:"decimal",
      dataField: "interestExpense"}, 
    // { id: 7,
    //   rowText:"Otros",
    //   rowMobileText:"Otros",
    //   grayBackground:false,
    //   showAsBlankIfZero:true,  
    //   style:"decimal",
    //   dataField: "other"}, 
    { id: 8,
      rowText:"Resultado antes IRE",
      rowMobileText:"Pre-Tax Income",
      grayBackground:true,
      showAsBlankIfZero:true,  
      style:"decimal",
      dataField: "incomeBeforeTax"}, 
    { id: 9,
      rowText:"Impuesto a la renta",
      rowMobileText:"IRE",
      grayBackground:false,
      showAsBlankIfZero:true,  
      style:"decimal",
      dataField: "incomeTaxExpense"}, 
    { id: 10,
      rowText:"Resultado",
      rowMobileText:"Resultado",
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
              <TableCell className = {classes.tableTitle} align = "left" >{isMobile  ? "P&L": "P&L Estado de Resultado"}</TableCell>  
              {financialData.map ((currElement, index) => ( 
                <TableCell className = {classes.tableTitle} align = "right" >
                  {currElement.year}
                </TableCell>
              ))} 
            </TableRow>
          </TableHead>

          <TableBody>
            {dataRows.map ((accountElement)=> (
              <TableRow>
                <TableCell align="left" className = {accountElement.grayBackground ? classes.firstColumnGrayStyle : classes.firstColumnWhiteStyle } >{isMobile || assumptions.cashFlowDiscretePeriod > 7 ? accountElement.rowMobileText: accountElement.rowText}</TableCell>
                {financialData.map ((yearElement) => ( 
                  <TableCell align="right" className = {accountElement.grayBackground ? classes.dataColumnGrayStyle : classes.dataColumnWhiteStyle}  > 
                    {defineNumberFormat([yearElement[accountElement.dataField]], [accountElement.style], [accountElement.showAsBlankIfZero],isEstimateFcffOnly) } 
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