import React, { useState, useEffect} from 'react';

import { Paper, TableContainer, Table, TableHead, TableBody, TableRow, TableCell, useMediaQuery } from '@material-ui/core';
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
      fontSize: "9px"
    },
    color: "white",
    backgroundColor: mainTheme.palette.primary.main,
  },  
  firstColumnWhiteStyle: {
    // minWidth:"145px",
    // width:"45px",
    [mainTheme.breakpoints.down('xs')]: {
      minWidth: "90px"
    },
    paddingLeft:"6px",
    paddingRight:"0px",
    fontSize:"9px",
    color:mainTheme.palette.primary.main,
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
    fontSize:"9px",
    color:mainTheme.palette.primary.main,
    backgroundColor: mainTheme.palette.contrast.main
  },
  dataColumnWhiteStyle:{
    paddingLeft:"4px",
    paddingRight:"0px",
    fontSize: "10px",
    [mainTheme.breakpoints.down('xs')]: {
      fontSize: "9px"
    },
    color:mainTheme.palette.primary.main,
    backgroundColor: "white",
  },
  dataColumnGrayStyle:{
    paddingLeft:"4px",
    paddingRight:"0px",
    fontSize: "10px",
    [mainTheme.breakpoints.down('xs')]: {
      fontSize: "9px"
    },
    color:mainTheme.palette.primary.main,
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
    { id: 2,
      rowText:"  Honorarios Civilia",
      rowMobileText:"  Honorarios Civilia",
      grayBackground:false,
      showAsBlankIfZero:true,  
      style:"decimal",
      dataField: "reDevFees"},
    { id: 3,
      rowText:"Costo Total",
      rowMobileText:"Costo Total",
      grayBackground:true,
      showAsBlankIfZero:true,  
      style:"decimal",
      dataField: "costOfRevenue"},  
    { id: 4,
      rowText:"Deveng. Costo del Terreno",
      rowMobileText:"Costo Terreno",
      grayBackground:false,
      showAsBlankIfZero:true,  
      style:"decimal",
      dataField: "costOfLand"},
    { id: 5,
      rowText:"Deveng. Costo de Construcción",
      rowMobileText:"Costo Cosntruc.",
      grayBackground:false,
      showAsBlankIfZero:true,  
      style:"decimal",
      dataField: "constructionCost"},
    { id: 6,
      rowText:"Margen Bruto",
      rowMobileText:"Margen",
      grayBackground:true,
      showAsBlankIfZero:true,  
      style:"decimal",
      dataField: "grossProfit"}, 
    { id: 7,
      rowText:"Margen Bruto (%)",
      rowMobileText:"Margen (%)",
      grayBackground:true,
      showAsBlankIfZero:true,  
      style:"percent",
      dataField: "grossProfitPercent"}, 
    { id: 8,
      rowText:"Gastos de Proyectos",
      rowMobileText:"Gastos Projs.",
      grayBackground:false,
      showAsBlankIfZero:true,  
      style:"decimal",
      dataField: "projectExpenses"},
    { id: 9,
      rowText:"Gastos Administrativos (coba)",
      rowMobileText:"Gastos Adm",
      grayBackground:false,
      showAsBlankIfZero:true,  
      style:"decimal",
    dataField: "operatingExpenses"},
    { id: 10,
      rowText:"Participación de Inversores",
      rowMobileText:"Particip. Inversores",
      grayBackground:false,
      showAsBlankIfZero:true,  
      style:"decimal",
      dataField: "investorShare"},
    { id: 11,
      rowText:"Depreciación",
      rowMobileText:"Depreciación",
      grayBackground:false,
      showAsBlankIfZero:true,  
      style:"decimal",
      dataField: "depreciation"}, 
    { id: 12,
      rowText:"Intereses Devengados",
      rowMobileText:"Deveng. Intereses",
      grayBackground:false,
      showAsBlankIfZero:true,  
      style:"decimal",
      dataField: "interestExpense"}, 
    { id: 13,
      rowText:"Crédito Fiscal IVA",
      rowMobileText:"Crédito Fiscal IVA",
      grayBackground:false,
      showAsBlankIfZero:true,  
      style:"decimal",
      dataField: "other"}, 
    { id: 14,
      rowText:"Resultado antes IRE",
      rowMobileText:"Resultado a/ IRE",
      grayBackground:true,
      showAsBlankIfZero:true,  
      style:"decimal",
      dataField: "incomeBeforeTax"}, 
    { id: 15,
      rowText:"Provision Impuesto a la Renta",
      rowMobileText:"IRE",
      grayBackground:false,
      showAsBlankIfZero:true,  
      style:"decimal",
      dataField: "incomeTaxExpense"}, 
    { id: 16,
      rowText:"Resultado Neto",
      rowMobileText:"Resultado Neto",
      grayBackground:true,
      showAsBlankIfZero:true,  
      style:"decimal",
      dataField: "netIncome"},
    { id: 17,
      rowText:"Margen Neto (%)",
      rowMobileText:"Margen (%)",
      grayBackground:true,
      showAsBlankIfZero:true,  
      style:"percent",
      dataField: "netMarginPercent"}
  ]

  useEffect(() => {
    setFinancialData([
      {year:2024, period:1, salesRevenue:4700966.56509615, reDevFees:0, totalRevenue: 4700966.56509615, costOfLand:0, constructionCost:318, costOfRevenue: 4028253, grossProfit: 672713, grossProfitPercent: 14.13, projectExpenses:0, operatingExpenses:1375 , investorShare:0, depreciation: 0, interestExpense: 167, other: 268, incomeBeforeTax: -1789, incomeTaxExpense: 0, netIncome: -1789, netMarginPercent:-161.14, ebit: 0, capitalExpenditures: 0, cash: 0, shortLongTermDebt:0, longTermDebt:0, workingCapitalChanges:0, cashFlow:0, discountedCashFlow:0},
      {year:2025, period:2, salesRevenue:21382, reDevFees:1972, totalRevenue: 23354, costOfLand:4105, constructionCost:7351, costOfRevenue: 11456, grossProfit: 11898, grossProfitPercent: 50.94, projectExpenses:2592, operatingExpenses:1724 , investorShare:1724, depreciation: 0, interestExpense: 662, other: 898, incomeBeforeTax: 428, incomeTaxExpense: 430, netIncome: 3868, netMarginPercent:16.56,ebit: 0, capitalExpenditures: 0, cash: 0, shortLongTermDebt:0, longTermDebt:0, workingCapitalChanges:0, cashFlow:0, discountedCashFlow:0},
    ])
  }, []);
  
  return (
    <>
    <Paper >
      <TableContainer component = {Paper} >
        <Table className = {classes.table} size = "small" aria-label = "stycky header">

          <TableHead>
            <TableRow>
              <TableCell className = {classes.tableTitle} align = "left" >{isMobile  ? "P&L": "P&L (en Gs. millones)"}</TableCell>  
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