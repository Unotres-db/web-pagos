import React from 'react';

import { Paper, Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, useMediaQuery } from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';

const useStyles = makeStyles( (mainTheme) => ({
  table: {
    minWidth: 360,
    height:"100%",
    // maxHeight: 900
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
    backgroundColor:"#d3d3d3",
  },
  dataColumnWhiteStyle:{
    fontSize: "9px",
    [mainTheme.breakpoints.down('xs')]: {
      fontSize: "9px"
    },
    paddingLeft:"4px",
    paddingRight:"8px",
    backgroundColor: "whitesmoke",
  },
  dataColumnGrayStyle:{
    fontSize: "9px",
    [mainTheme.breakpoints.down('xs')]: {
      fontSize: "9px"
    },
    paddingLeft:"4px",
    paddingRight:"8px",
    backgroundColor: "#d3d3d3",
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
  // }));
  // table: {
  //   minWidth: 300,
  //   maxHeight: 900
  // },
  // TableHeader: {
  //   color: "white",
  //   backgroundColor: mainTheme.palette.primary.main
  // },
  // TableTitle: {
  //   color: "white",
  //   fontSize: 11,
  //   [mainTheme.breakpoints.down('xs')]: {
  //     fontSize: "10px"
  //   },
  //   backgroundColor: mainTheme.palette.primary.main,
  // },
  // TableYears: {
  //   color: "white",
  //   fontSize: 11 //9
  // },
  // TableRows: {
  //   fontSize: 9,
  //   backgroundColor: "whitesmoke",
  // },
  // TableRowsSubtitle: {
  //   fontSize: 9,
  //   height: 16,
  //   backgroundColor: "#d3d3d3",//light gray d3d3d3   3C6E76
  // }  
  }));

export default function TableDCFIncomeStatement ({financialArray, assumptions, isCheckedShowPreviousYears, isCheckedDescOrder, isEstimateFcffOnly}){

  const classes = useStyles();
  const firstColWidth = "90px";
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('xs'));
  const firstColumnsRows = [
    { id: 0,
      columnText:"Revenue",
      columnMobileText:"Revenue",
      dataField: "totalRevenue" },
    { id: 1,
      columnText:"Cost of Revenue",
      columnMobileText:"Cost"},  
    { id: 2,
      columnText:"Gross Profit",
      columnMobileText:"Gross Profit"}, 
    { id: 3,
      columnText:"Gross Margin (%)",
      columnMobileText:"Margin (%)"},  
    { id: 4,
      columnText:"Operating Expenses",
      columnMobileText:"Op. Expenses"},
    { id: 5,
      columnText:"Depreciation",
      columnMobileText:"Depreciation"}, 
    { id: 6,
      columnText:"Interest Expense",
      columnMobileText:"Interest Exp."}, 
    { id: 7,
      columnText:"Other Income/(Expenses)",
      columnMobileText:"Other Inc./Exp."}, 
    { id: 8,
      columnText:"Pre-Tax Income",
      columnMobileText:"Pre-Tax Income"}, 
    { id: 9,
      columnText:"Income Taxes",
      columnMobileText:"Income Taxes"}, 
    { id: 10,
      columnText:"Net Income",
      columnMobileText:"Net Income"}
  ]

  function calcYearColumnWidth (){
    if (isCheckedShowPreviousYears){
      return (0.78/(+assumptions.cashFlowDiscretePeriod + 3)*100).toString + "%"
    } 
    return (0.78/(+assumptions.cashFlowDiscretePeriod)*100).toString + "%"
  }


  function defineTextColor(index){
    if (isCheckedShowPreviousYears){
      if (isCheckedDescOrder){
        if (index < assumptions.cashFlowDiscretePeriod){
          return theme.palette.secondary.main
        } return "whitesmoke"; 
      } if (index < 3){
          return "whitesmoke"; 
        } return theme.palette.secondary.main;
    } return theme.palette.secondary.main;
    }

function defineTextBackgroundColor(index){
  if (isCheckedShowPreviousYears){
    if (isCheckedDescOrder){
      if (index < assumptions.cashFlowDiscretePeriod) { 
        return theme.palette.primary.main;
      } return theme.palette.tertiary.main;
    } if (index < 3){
        return theme.palette.tertiary.main;
      } return theme.palette.primary.main;
  } return theme.palette.primary.main;
  }

  function defineNumberFormat ( number, index ){
    if (isEstimateFcffOnly){
      if (isCheckedShowPreviousYears){
        if (isCheckedDescOrder){
          if (index < assumptions.cashFlowDiscretePeriod){   //atualizar para discreteCashFlow > 5....
            return "";
          } else {
              return Intl.NumberFormat('en-US',{style:'decimal',minimumFractionDigits:1,maximumFractionDigits:1}).format(number);
          }
        } else {
          if (index > 2){  ///atualizar para quando historico for maior a 3 anos
            return "";
          } else {
              return Intl.NumberFormat('en-US',{style:'decimal',minimumFractionDigits:1,maximumFractionDigits:1}).format(number);
          }
        }
      } else {
        return "";
      }
    }
    return Intl.NumberFormat('en-US',{style:'decimal',minimumFractionDigits:1,maximumFractionDigits:1}).format(number);
  }

  return(
    <>
    <TableContainer component = {Paper}>
      <Table className = {classes.table} size="small" aria-label="stycky header">
      { financialArray  ? <> 
        <TableHead className = {classes.TableHeader}>
          <TableRow>
          <TableCell className={classes.tableTitle} align="left" >{isMobile || assumptions.cashFlowDiscretePeriod > 7 ? "Inc. Statement": "Income Statement"}</TableCell>  
          {financialArray.map ((currElement, index) => (
              <TableCell className={classes.yearColumnStyle} align="right" style={{color:defineTextColor(index), backgroundColor:defineTextBackgroundColor(index), width:calcYearColumnWidth()}}>{currElement.year}</TableCell>
            ))} 
          </TableRow>
        </TableHead>
        
        <TableBody>
        <TableRow>
            <TableCell align="left" className = {classes.firstColumnGrayStyle} >{isMobile  || assumptions.cashFlowDiscretePeriod > 7? firstColumnsRows[0].columnMobileText: firstColumnsRows[0].columnText}</TableCell>
            { financialArray.map ((currElement, index) => (
              <TableCell align="right" className = {classes.dataColumnGrayStyle} style = {{ width:calcYearColumnWidth()}} >{defineNumberFormat(currElement.totalRevenue, index)}</TableCell>
            ))} 
          </TableRow>
          <TableRow>
            <TableCell align="left" className = {classes.firstColumnWhiteStyle} >{isMobile ? firstColumnsRows[1].columnMobileText: firstColumnsRows[1].columnText}</TableCell>
            {financialArray.map ((currElement, index) => (
              <TableCell align="right" className = {classes.dataColumnWhiteStyle} style = {{ width:calcYearColumnWidth()}} >{defineNumberFormat(currElement.costOfRevenue, index)}</TableCell>
            ))}
          </TableRow>
          <TableRow>
            <TableCell align="left" className = {classes.firstColumnGrayStyle}  >{isMobile ? firstColumnsRows[2].columnMobileText: firstColumnsRows[2].columnText}</TableCell>
            {financialArray.map ((currElement, index) => (
              <TableCell align="right" className={classes.dataColumnGrayStyle} style = {{ width:calcYearColumnWidth()}} >{defineNumberFormat(currElement.grossProfit, index)}</TableCell>
            ))} 
          </TableRow>
          <TableRow>
            <TableCell align="left" className={classes.firstColumnGrayStyle} >{isMobile ? firstColumnsRows[3].columnMobileText: firstColumnsRows[3].columnText}</TableCell>
            {financialArray.map ((currElement, index) => (
              <TableCell align="right" className={classes.dataColumnGrayStyle} style = {{ width:calcYearColumnWidth()}} >{defineNumberFormat(currElement.totalRevenue > 0? (currElement.grossProfit/currElement.totalRevenue) : 0, index)}</TableCell>
            ))} 
          </TableRow>
          <TableRow>
            <TableCell align="left" className={classes.firstColumnWhiteStyle} >{isMobile ? firstColumnsRows[4].columnMobileText: firstColumnsRows[4].columnText}</TableCell>
            {financialArray.map ((currElement, index) => (
              <TableCell align="right" className={classes.dataColumnWhiteStyle} style = {{ width:calcYearColumnWidth()}} >{defineNumberFormat(currElement.operatingExpenses, index)}</TableCell>
            ))} 
          </TableRow>
          <TableRow>
            <TableCell align="left" className={classes.firstColumnWhiteStyle}  >{isMobile || assumptions.cashFlowDiscretePeriod > 7 ? firstColumnsRows[5].columnMobileText: firstColumnsRows[5].columnText}</TableCell>
            {financialArray.map ((currElement,index) => (
              <TableCell align="right" className={classes.dataColumnWhiteStyle} style = {{ width:calcYearColumnWidth()}} >{defineNumberFormat(currElement.depreciation, index)}</TableCell>
          ))}
          </TableRow>
          <TableRow>
            <TableCell align="left" className={classes.firstColumnWhiteStyle}  >{isMobile || assumptions.cashFlowDiscretePeriod > 7 ? firstColumnsRows[6].columnMobileText: firstColumnsRows[6].columnText}</TableCell>
            {financialArray.map ((currElement,index) => (
              <TableCell align="right" className={classes.dataColumnWhiteStyle} style = {{ width:calcYearColumnWidth()}} >{defineNumberFormat(currElement.interestExpense, index)}</TableCell>
          ))}
          </TableRow>
          <TableRow>
            <TableCell align="left" className={classes.firstColumnWhiteStyle}  >{isMobile || assumptions.cashFlowDiscretePeriod > 7 ? firstColumnsRows[7].columnMobileText: firstColumnsRows[7].columnText}</TableCell>
            {financialArray.map ((currElement,index) => (
              <TableCell align="right" className={classes.dataColumnWhiteStyle} style = {{ width:calcYearColumnWidth()}} >{defineNumberFormat(currElement.other, index)}</TableCell>
          ))}
          </TableRow>
          <TableRow>
            <TableCell align="left" className={classes.firstColumnGrayStyle}  >{isMobile || assumptions.cashFlowDiscretePeriod > 7 ? firstColumnsRows[8].columnMobileText: firstColumnsRows[8].columnText}</TableCell>
            {financialArray.map ((currElement,index) => (
              <TableCell align="right" className={classes.dataColumnGrayStyle} style = {{ width:calcYearColumnWidth()}} >{defineNumberFormat(currElement.incomeBeforeTax, index)}</TableCell>
          ))}
          </TableRow>
          <TableRow>
            <TableCell align="left" className={classes.firstColumnWhiteStyle}  >{isMobile || assumptions.cashFlowDiscretePeriod > 7 ? firstColumnsRows[9].columnMobileText: firstColumnsRows[9].columnText}</TableCell>
            {financialArray.map ((currElement,index) => (
              <TableCell align="right" className={classes.dataColumnWhiteStyle} style = {{ width:calcYearColumnWidth()}} >{defineNumberFormat(currElement.incomeTaxExpense, index)}</TableCell>
          ))}
          </TableRow>
          <TableRow>
            <TableCell align="left" className={classes.firstColumnGrayStyle}  >{isMobile || assumptions.cashFlowDiscretePeriod > 7 ? firstColumnsRows[10].columnMobileText: firstColumnsRows[10].columnText}</TableCell>
            {financialArray.map ((currElement,index) => (
              <TableCell align="right" className={classes.dataColumnGrayStyle} style = {{ width:calcYearColumnWidth()}} >{defineNumberFormat(currElement.netIncome, index)}</TableCell>
          ))}
          </TableRow>


          {/* <TableRow>
            <TableCell align="left" className={classes.TableRowsSubtitle} style={{minWidth:firstColWidth, paddingLeft:"6px", paddingRight:"0px"}} >Revenue</TableCell>
            {financialArray.map ((currElement, index) => (
              <TableCell align="right" className={classes.TableRowsSubtitle} style = {{width:calcYearColumnWidth(), paddingLeft:"4px", paddingRight:"8px"}}>{defineNumberFormat(currElement.totalRevenue, index)}</TableCell>
            ))}
          </TableRow>
          <TableRow>
            <TableCell align="left" className={classes.TableRows} style={{minWidth:firstColWidth,  paddingLeft:"6px", paddingRight:"0px"}} >Cost</TableCell>
            {financialArray.map ((currElement, index) => (
              <TableCell align="right" className={classes.TableRows} style = {{width:calcYearColumnWidth(),paddingLeft:"4px",paddingRight:"8px"}}  >{defineNumberFormat(currElement.costOfRevenue, index)}</TableCell>
            ))}
          </TableRow>
          <TableRow>
            <TableCell align="left" className={classes.TableRowsSubtitle} style={{minWidth:firstColWidth,  paddingLeft:"6px", paddingRight:"0px"}} >Gross Profit</TableCell>
            {financialArray.map ((currElement, index) => (
              <TableCell align="right" className={classes.TableRowsSubtitle} style = {{width:calcYearColumnWidth(),paddingLeft:"4px",paddingRight:"8px"}} >{defineNumberFormat(currElement.grossProfit, index)}</TableCell>
            ))}
          </TableRow>
          <TableRow>
            <TableCell align="left" className={classes.TableRowsSubtitle} style={{minWidth:firstColWidth,  paddingLeft:"6px", paddingRight:"0px"}} >Gross Margin %</TableCell>
            {financialArray.map ((currElement, index) => (
              <TableCell align="right" className={classes.TableRowsSubtitle} style = {{width:calcYearColumnWidth(),paddingLeft:"4px",paddingRight:"8px"}} >{Intl.NumberFormat('en-US',{style:'percent',minimumFractionDigits:1,maximumFractionDigits:1}).format(currElement.totalRevenue > 0? (currElement.grossProfit/currElement.totalRevenue) : 0)}</TableCell>
            ))}  
          </TableRow>
          <TableRow>
            <TableCell align="left" className={classes.TableRows} style={{minWidth:firstColWidth,  paddingLeft:"6px", paddingRight:"0px"}} >{isMobile? "Op. Expenses" :"Operating Expenses"}</TableCell>
            {financialArray.map ((currElement, index ) => (
              <TableCell align="right" className={classes.TableRows} style = {{width:calcYearColumnWidth(),paddingLeft:"4px",paddingRight:"8px"}} >{defineNumberFormat(currElement.operatingExpenses, index)}</TableCell>
            ))}
          </TableRow>
          <TableRow>
            <TableCell align="left" className={classes.TableRows} style={{minWidth:firstColWidth,  paddingLeft:"6px", paddingRight:"0px"}} >Depreciation</TableCell>
            {financialArray.map ((currElement, index ) => (
              <TableCell align="right" className={classes.TableRows} style = {{width:calcYearColumnWidth(),paddingLeft:"4px",paddingRight:"8px"}} >{defineNumberFormat(currElement.depreciation, index)}</TableCell>
            ))}
          </TableRow>
          <TableRow>
            <TableCell align="left" className={classes.TableRows} style={{minWidth:firstColWidth,  paddingLeft:"6px", paddingRight:"0px"}} >Interest Expense</TableCell>
            {financialArray.map ((currElement, index ) => (
              <TableCell align="right" className={classes.TableRows} style = {{width:calcYearColumnWidth(),paddingLeft:"4px",paddingRight:"8px"}} >{defineNumberFormat(currElement.interestExpense, index)}</TableCell>
            ))}
          </TableRow>
          <TableRow>
            <TableCell align="left" className={classes.TableRows} style={{minWidth:firstColWidth,  paddingLeft:"6px", paddingRight:"0px"}} >{isMobile ? "Other Inc./(Exp.":"Other Income/(Expenses)"}</TableCell>
            {financialArray.map ((currElement, index ) => (
              <TableCell align="right" className={classes.TableRows} style = {{width:calcYearColumnWidth(),paddingLeft:"4px",paddingRight:"8px"}} >{defineNumberFormat(currElement.other, index)}</TableCell>
            ))}
          </TableRow>
          <TableRow>
            <TableCell align="left" className={classes.TableRowsSubtitle} style={{minWidth:firstColWidth,  paddingLeft:"6px", paddingRight:"0px"}} >Pre-Tax Income</TableCell>
            {financialArray.map ((currElement, index ) => (
              <TableCell align="right" className={classes.TableRowsSubtitle} style = {{width:calcYearColumnWidth(),paddingLeft:"4px",paddingRight:"8px"}} >{defineNumberFormat(currElement.incomeBeforeTax, index)}</TableCell>
            ))}
          </TableRow>
          <TableRow>
            <TableCell align="left" className={classes.TableRows} style={{minWidth:firstColWidth,  paddingLeft:"6px", paddingRight:"0px"}} >Income Taxes</TableCell>
            {financialArray.map ((currElement, index ) => (
              <TableCell align="right" className={classes.TableRows} style = {{width:calcYearColumnWidth(),paddingLeft:"4px",paddingRight:"8px"}} >{defineNumberFormat(currElement.incomeTaxExpense, index)}</TableCell>
            ))}
          </TableRow>
          <TableRow>
            <TableCell align="left" className={classes.TableRowsSubtitle} style={{minWidth:firstColWidth,  paddingLeft:"6px", paddingRight:"0px"}} >Net Income</TableCell>
            {financialArray.map ((currElement, index ) => (
              <TableCell align="right" className={classes.TableRowsSubtitle} style = {{width:calcYearColumnWidth(),paddingLeft:"4px",paddingRight:"8px"}} >{defineNumberFormat(currElement.netIncome, index)}</TableCell>
            ))}
          </TableRow> */}

        </TableBody>
        </>: null}
    </Table>
  </TableContainer>
  <Box style = {{height: "5px"}}/>
  </>
  )
}