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

export default function TableCashFlow ({assumptions, financialData}){
  const classes = useStyles();
  const isEstimateFcffOnly = false;
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('xs'));
  const { defineYearsColWidth, defineYearsColColor, defineYearsColBackColor, defineNumberFormat } = useTableStyling();
  const dataRows = [
    { id: 0,
      rowText:"EBIT",
      rowMobileText:"EBIT",
      grayBackground:true,
      showAsBlankIfZero:true,  
      style:"decimal",
      dataField:"ebit" },
    // { id: 1,
    //   rowText:"(-) IRE",
    //   rowMobileText:"(-) IRE",
    //   grayBackground:false,
    //   showAsBlankIfZero:true,
    //   style:"decimal",
    //   dataField:"incomeTaxExpense" },  
    // { id: 2,
    //   rowText:"(+) Depreciacion",
    //   rowMobileText:"(+) Depreciacion",
    //   grayBackground:false,
    //   showAsBlankIfZero:true,
    //   style:"decimal",
    //   dataField:"depreciation"}, 
    { id: 3,
      rowText:"(-) Inversion (Capex)",
      rowMobileText:"(-) Inversion (Capex)",
      grayBackground:false,
      showAsBlankIfZero:true,
      style:"decimal",
      dataField:"capitalExpenditures"},  
    { id: 4,
      rowText:"(-) Var. Capital de Trabajo",
      rowMobileText:"(-) var. Cap. Trab.",
      grayBackground:false,
      showAsBlankIfZero:true,
      style:"decimal",
      dataField:"workingCapitalChanges"},
    { id: 5,
      rowText:"Flujo de Caja Libre",
      rowMobileText:"FCFF",
      grayBackground:true,
      showAsBlankIfZero:false,
      style:"decimal",
      dataField: "cashFlow"}, 
    // { id: 6,
    //   rowText:"FCFF Descontado",
    //   rowMobileText:"FCFF Descontado",
    //   grayBackground:true,
    //   showAsBlankIfZero:true,
    //   style:"decimal",
    //   dataField: "discountedCashFlow"} 
  ]

  return (
    <>
    <Paper>
      <TableContainer component = {Paper}>
        <Table className = {classes.table} size = "small" aria-label = "stycky header">

          <TableHead>
            <TableRow>
              <TableCell className = {classes.tableTitle} align = "left" >{isMobile  ? "FCFF": "Flujo de Caja Libre"}</TableCell>  
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