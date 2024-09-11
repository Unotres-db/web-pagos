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
    fontSize:"10px",
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
    fontSize:"10px",
    color:'#344955',
    backgroundColor: "#D3D3D3"
  },
  dataColumnWhiteStyle:{
    paddingLeft:"4px",
    paddingRight:"0px",
    fontSize: "10px",
    [mainTheme.breakpoints.down('xs')]: {
      fontSize: "9px"
    },
    color:'#344955',
    backgroundColor: "white",
  },
  dataColumnGrayStyle:{
    paddingLeft:"4px",
    paddingRight:"0px",
    fontSize: "10px",
    [mainTheme.breakpoints.down('xs')]: {
      fontSize: "9px"
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
      fontSize: "10px"
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
    { id: 2,
      rowText:"  Honorarios Desarrollo",
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
      rowText:"Deveng. Costo de Construcción",
      rowMobileText:"Costo Cosntruc.",
      grayBackground:false,
      showAsBlankIfZero:true,  
      style:"decimal",
      dataField: "constructionCost"},
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
      rowText:"Gastos Administrativos (coba)",
      rowMobileText:"Gastos Adm",
      grayBackground:false,
      showAsBlankIfZero:true,  
      style:"decimal",
    dataField: "operatingExpenses"},
    { id: 8,
      rowText:"Participación en Proyectos",
      rowMobileText:"Particip. Proyectos",
      grayBackground:false,
      showAsBlankIfZero:true,  
      style:"decimal",
      dataField: "investorShare"},
    { id: 9,
      rowText:"Depreciación",
      rowMobileText:"Depreciación",
      grayBackground:false,
      showAsBlankIfZero:true,  
      style:"decimal",
      dataField: "depreciation"}, 
    { id: 10,
      rowText:"Intereses Devengados",
      rowMobileText:"Deveng. Intereses",
      grayBackground:false,
      showAsBlankIfZero:true,  
      style:"decimal",
      dataField: "interestExpense"}, 
    { id: 11,
      rowText:"Resultado antes IRE",
      rowMobileText:"Resultado a/ IRE",
      grayBackground:true,
      showAsBlankIfZero:true,  
      style:"decimal",
      dataField: "incomeBeforeTax"}, 
    { id: 12,
      rowText:"Provision Impuesto a la Renta",
      rowMobileText:"IRE",
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
      {year:2024, period:1, salesRevenue: 4848856, reDevFees:0, totalRevenue: 4848856, costOfLand:0, constructionCost: 4161298 , costOfRevenue: 4161298, grossProfit: 687558, grossProfitPercent: 14.2, projectExpenses:0, operatingExpenses:197075 , investorShare:300000, depreciation: 0, interestExpense: 5069, other: 0, incomeBeforeTax: 785714, incomeTaxExpense: 78541, netIncome: 706862, netMarginPercent:14.6, ebit: 0, capitalExpenditures: 0, cash: 0, shortLongTermDebt:0, longTermDebt:0, workingCapitalChanges:0, cashFlow:0, discountedCashFlow:0},
      {year:2025, period:2, salesRevenue:5478483, reDevFees:0, totalRevenue: 5478483, costOfLand:0, constructionCost:4880169, costOfRevenue: 4880169, grossProfit: 598314, grossProfitPercent: 10.9, projectExpenses:0, operatingExpenses:215124 , investorShare:0, depreciation: 0, interestExpense: 0, other:0, incomeBeforeTax: 383190, incomeTaxExpense: 38319, netIncome: 344871, netMarginPercent:6.3,ebit: 0, capitalExpenditures: 0, cash: 0, shortLongTermDebt:0, longTermDebt:0, workingCapitalChanges:0, cashFlow:0, discountedCashFlow:0},
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
              <TableCell className = {classes.tableTitle} align = "left" >{isMobile  ? "P&L": "P&L (en Us$)"}</TableCell>  
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