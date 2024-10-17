import React, { useState, useEffect} from 'react';

import { Paper, Box, TableContainer, Table, TableHead, TableBody, TableRow, TableCell, useMediaQuery } from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';

import useTableStyling from '../../hooks/useTableStyling';

const useStyles = makeStyles( (mainTheme) => ({
  table: {
    // minWidth: 360,
    minWidth: 280,
    height:"100%",
  },
  tableTitle:{
    width:"30%",
    paddingLeft:"6px",
    paddingRight:"0px",
    fontSize: 11,
    [mainTheme.breakpoints.down('xs')]: {
      fontSize: "11px"
    },
    color: "white",
    backgroundColor: '#344955',
  },  
  firstColumnWhiteStyle: {
    // minWidth:"145px",
    // width:"45px",
    [mainTheme.breakpoints.down('xs')]: {
      minWidth: "90px"
    },
    paddingLeft:"6px",
    paddingRight:"0px",
    fontSize:"11px",
    color:'#344955',
    backgroundColor:"white"
  },  
  firstColumnGrayStyle: {
    // minWidth:"145px",
    // width:"90px",
    width:"45%",
    [mainTheme.breakpoints.down('xs')]: {
      minWidth: "90px"
    },
    paddingLeft:"6px",
    paddingRight:"0px",
    fontSize:"11px",
    color:'#344955',
    backgroundColor: "#D3D3D3"
  },
  dataColumnWhiteStyle:{
    paddingLeft:"4px",
    paddingRight:"0px",
    fontSize: "11px",
    [mainTheme.breakpoints.down('xs')]: {
      fontSize: "11px"
    },
    color:'#344955',
    backgroundColor: "white",
  },
  dataColumnGrayStyle:{
    paddingLeft:"4px",
    paddingRight:"0px",
    fontSize: "11px",
    [mainTheme.breakpoints.down('xs')]: {
      fontSize: "11px"
    },
    color:'#344955',
    backgroundColor: "#D3D3D3"

  },
  yearColumnStyle:{
    paddingLeft:"4px",
    paddingRight:"8px",
    fontSize: "11px",
    height: '36px',
    [mainTheme.breakpoints.down('xs')]: {
      fontSize: "11px"
    },
    color: "white",
  },
  textFieldStyle:{
    "& .MuiFilledInput-root":{
      fontSize:"11px",
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

export default function TableRollingForecast (){
  const classes = useStyles();
  const isEstimateFcffOnly = false;
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('xs'));
  const [ financialData, setFinancialData] = useState((Array.from({ length:2 }, (a,b) => ({ year:2023 + b , period:0, month:0, salesRevenue:0,reDevFees:0,totalRevenue:0, costOfLand:0, constructionCost:0, costOfRevenue: 0, grossProfit: 0, grossProfitPercent:0, projectExpenses:0, operatingExpenses: 0, investorShare:0, depreciation: 0, interestExpense: 0, other: 0, incomeBeforeTax: 0, incomeTaxExpense: 0, netIncome: 0, netMarginPercent:0, ebit: 0, capitalExpenditures: 0, cash: 0, shortLongTermDebt:0, longTermDebt:0, workingCapitalChanges:0, cashFlow:0, discountedCashFlow:0 }))));
  const { defineYearsColWidth, defineYearsColColor, defineYearsColBackColor, defineNumberFormat } = useTableStyling();
  const dataRows = [
    { id: 0,
      rowText:"Facturación Total",
      rowMobileText:"Facturación",
      grayBackground:true,
      showAsBlankIfZero:true,  
      style:"decimal",
      dataField: "totalRevenue"},
    { id: 1,
      rowText:"Ventas",
      rowMobileText:"Ventas",
      grayBackground:false,
      showAsBlankIfZero:true,  
      style:"decimal",
      dataField: "salesRevenue"},
    // { id: 2,
    //   rowText:"Honorarios de Desarrollo",
    //   rowMobileText:"Honorarios",
    //   grayBackground:false,
    //   showAsBlankIfZero:true,  
    //   style:"decimal",
    //   dataField: "reDevFees"},
    { id: 3,
      rowText:"Costo Total",
      rowMobileText:"Costo Total",
      grayBackground:true,
      showAsBlankIfZero:true,  
      style:"decimal",
      dataField: "costOfRevenue"},  

    // { id: 4,
    //   rowText:"Dev. Costo de Construcción",
    //   rowMobileText:"Deveng. Costo de Construcción",
    //   grayBackground:false,
    //   showAsBlankIfZero:true,  
    //   style:"decimal",
    //   dataField: "constructionCost"},
    { id: 5,
      rowText:"Margen Bruto",
      rowMobileText:"Margen",
      grayBackground:true,
      showAsBlankIfZero:true,  
      style:"decimal",
      dataField: "grossProfit"}, 
    { id: 6,
      rowText:"Margen Bruto (%)",
      rowMobileText:"Margen (%)",
      grayBackground:true,
      showAsBlankIfZero:true,  
      style:"percent",
      dataField: "grossProfitPercent"}, 

    { id: 7,
      rowText:"Gastos Administrativos",
      rowMobileText:"Gastos Administrativos",
      grayBackground:false,
      showAsBlankIfZero:true,  
      style:"decimal",
    dataField: "operatingExpenses"},
    { id: 8,
      rowText:"Participación en Proyectos",
      rowMobileText:"Particip. en Proyectos",
      grayBackground:false,
      showAsBlankIfZero:true,  
      style:"decimal",
      dataField: "investorShare"},
    // { id: 9,
    //   rowText:"Depreciación",
    //   rowMobileText:"Depreciación",
    //   grayBackground:false,
    //   showAsBlankIfZero:true,  
    //   style:"decimal",
    //   dataField: "depreciation"}, 
    { id: 10,
      rowText:"Intereses Devengados",
      rowMobileText:"Intereses Devengados",
      grayBackground:false,
      showAsBlankIfZero:true,  
      style:"decimal",
      dataField: "interestExpense"}, 
    { id: 11,
      rowText:"Resultado antes IRE",
      rowMobileText:"Resultado antes IRE",
      grayBackground:true,
      showAsBlankIfZero:true,  
      style:"decimal",
      dataField: "incomeBeforeTax"}, 
    { id: 12,
      rowText:"Provisión IRE",
      rowMobileText:"Provisión IRE",
      grayBackground:false,
      showAsBlankIfZero:true,  
      style:"decimal",
      dataField: "incomeTaxExpense"}, 
    { id: 13,
      rowText:"Resultado Neto",
      rowMobileText:"Resultado Neto",
      grayBackground:true,
      showAsBlankIfZero:true,  
      style:"decimal",
      dataField: "netIncome"},
    { id: 14,
      rowText:"Margen Neto (%)",
      rowMobileText:"Margen (%)",
      grayBackground:true,
      showAsBlankIfZero:true,  
      style:"percent",
      dataField: "netMarginPercent"}
  ]

  useEffect(() => {
    setFinancialData([
      {year:2024, period:1, salesRevenue:  4093570, reDevFees:0, totalRevenue: 4093570, costOfLand:0, constructionCost: 3413625, costOfRevenue: 3413625, grossProfit: 679945, grossProfitPercent: 16.6, projectExpenses:0, operatingExpenses:300642 , investorShare:58074, depreciation: 0, interestExpense: 4807, other: 0, incomeBeforeTax: 432570, incomeTaxExpense: 43257, netIncome: 389313, netMarginPercent:9.5, ebit: 0, capitalExpenditures: 0, cash: 0, shortLongTermDebt:0, longTermDebt:0, workingCapitalChanges:0, cashFlow:0, discountedCashFlow:0},
      {year:2025, period:2, salesRevenue:6427085, reDevFees:0, totalRevenue: 6427085, costOfLand:0, constructionCost:5345454, costOfRevenue: 5345454, grossProfit: 1081631, grossProfitPercent: 16.8, projectExpenses:0, operatingExpenses:325277 , investorShare:170000, depreciation: 0, interestExpense: 6244, other:0, incomeBeforeTax: 920110, incomeTaxExpense: 92011, netIncome: 828099, netMarginPercent:12.9,ebit: 0, capitalExpenditures: 0, cash: 0, shortLongTermDebt:0, longTermDebt:0, workingCapitalChanges:0, cashFlow:0, discountedCashFlow:0},
    ])
  }, []);
  
  return (
    <>
    <Paper >
      {/* <Box style={{height:"30px"}}/> */}
      <TableContainer component = {Paper} >
        <Table className = {classes.table} size = "small" aria-label = "stycky header">

          <TableHead>
            <TableRow>
              <TableCell className = {classes.tableTitle} align = "left" >{isMobile  ? "P&L (en USD)": "P&L (en USD)"}</TableCell>  
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
                <TableCell align="left" className = {accountElement.grayBackground ? classes.firstColumnGrayStyle : classes.firstColumnWhiteStyle } >{isMobile ? accountElement.rowMobileText: accountElement.rowText}</TableCell>
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