import React from 'react';

import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tooltip } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles( (mainTheme) => ({
  table: {
    minWidth: 300,
    maxHeight: 900
  },
  TableHeader:{
    color: "white",
    backgroundColor: mainTheme.palette.primary.main
  },
  TableTitle:{
    color: "white",
    fontSize: 11
  },
  TableYears:{
    color: "white",
    fontSize: 11 //9
  },
  TableRows : {
    fontSize: 9,
    backgroundColor: "whitesmoke",
    },
  TableRowsSubtitle : {
    fontSize: 9,
    height: 16,
    backgroundColor: "#d3d3d3",//light gray d3d3d3   3C6E76
    }  
  }));

export default function TableDCFCashFlow ({financialArray, isCheckedShowPreviousYears, isCheckedDescOrder}){
  const classes = useStyles();
  const firstColWidth = "20%";

  function calcYearColumnWidth (){
    if (isCheckedShowPreviousYears){
      return "8%"
    } else
    return "15%"
  }

  function defineColor(index){
  if (isCheckedShowPreviousYears){
    if (isCheckedDescOrder){
      if (index < 5){
        return "#F9AA33";
      } else {
        return "whitesmoke"; //"#55757A";
      }
    } else {
      if (index < 4){
        return "whitesmoke"; //"darkgray"
      } else {
        return "#F9AA33";
      }
    }
  } else {
      return "#F9AA33";
    }
  }

  return (
    <>
    <TableContainer component={Paper}>
      <Table className={classes.table} size="small" aria-label="stycky header">
    
        <TableHead className={classes.TableHeader}>
          <TableRow>
            <TableCell className={classes.TableTitle} style={{width:firstColWidth, paddingLeft:"6px", paddingRight:"0px"}} align="left" >Free Cash Flow to the Firm</TableCell>
            {financialArray.map ((currElement, index) => (
              <TableCell className={classes.TableYears} align="right" style={{color:defineColor(index), width:calcYearColumnWidth(),paddingLeft:"4px",paddingRight:"6px"}}>{currElement.year}</TableCell>
            ))} 
          </TableRow>
        </TableHead>

        <TableBody>
          <TableRow>
            <TableCell align="left" className={classes.TableRows} style={{width:firstColWidth, paddingLeft:"6px", paddingRight:"0px"}} >EBIT</TableCell>
            {financialArray.map ((currElement) => (
              <TableCell align="right" className={classes.TableRows} style = {{ width:calcYearColumnWidth(),paddingLeft:"4px",paddingRight:"6px"}} >{Intl.NumberFormat('en-US',{style:'decimal',minimumFractionDigits:1,maximumFractionDigits:1}).format(currElement.ebit)}</TableCell>
            ))} 
          </TableRow>
          <TableRow>
            <TableCell align="left" className={classes.TableRows} style={{width:firstColWidth, paddingLeft:"6px", paddingRight:"0px"}} >(-) Taxes</TableCell>
            {financialArray.map ((currElement) => (
              <TableCell align="right" className={classes.TableRows} style = {{ width:calcYearColumnWidth(),paddingLeft:"4px",paddingRight:"6px"}} >{Intl.NumberFormat('en-US',{style:'decimal',minimumFractionDigits:1,maximumFractionDigits:1}).format(currElement.incomeTaxExpense)}</TableCell>
            ))}
          </TableRow>
          <TableRow>
            <TableCell align="left" className={classes.TableRows} style={{width:firstColWidth, paddingLeft:"6px", paddingRight:"0px"}} >(+) Depreciation</TableCell>
            {financialArray.map ((currElement) => (
              <TableCell align="right" className={classes.TableRows} style = {{ width:calcYearColumnWidth(),paddingLeft:"4px",paddingRight:"6px"}} >{Intl.NumberFormat('en-US',{style:'decimal',minimumFractionDigits:1,maximumFractionDigits:1}).format(currElement.depreciation *-1)}</TableCell>
            ))} 
          </TableRow>
          <TableRow>
            <TableCell align="left" className={classes.TableRows} style={{width:firstColWidth, paddingLeft:"6px", paddingRight:"0px"}} >(-) Capex</TableCell>
            {financialArray.map ((currElement) => (
              <TableCell align="right" className={classes.TableRows} style = {{ width:calcYearColumnWidth(),paddingLeft:"4px",paddingRight:"6px"}} >{Intl.NumberFormat('en-US',{style:'decimal',minimumFractionDigits:1,maximumFractionDigits:1}).format(currElement.capitalExpenditures)}</TableCell>
            ))} 
          </TableRow>
          <TableRow>
            <TableCell align="left" className={classes.TableRows} style={{width:firstColWidth, paddingLeft:"6px", paddingRight:"0px"}} >(-) Net Working Capital Changes</TableCell>
            {financialArray.map ((currElement) => (
              <TableCell align="right" className={classes.TableRows} style = {{ width:calcYearColumnWidth(),paddingLeft:"4px",paddingRight:"6px"}} >{Intl.NumberFormat('en-US',{style:'decimal',minimumFractionDigits:1,maximumFractionDigits:1}).format(currElement.workingCapitalChanges)}</TableCell>
            ))}
          </TableRow>
          <TableRow>
            <TableCell align="left" className={classes.TableRowsSubtitle} style={{width:firstColWidth, paddingLeft:"6px", paddingRight:"0px"}} >Free Cash Flow to the Firm</TableCell>
            {financialArray.map ((currElement) => (
              <TableCell align="right" className={classes.TableRowsSubtitle} style = {{ width:calcYearColumnWidth(),paddingLeft:"4px",paddingRight:"6px"}} >{Intl.NumberFormat('en-US',{style:'decimal',minimumFractionDigits:1,maximumFractionDigits:1}).format(currElement.cashFlow)}</TableCell>
            ))} 
          </TableRow>
          <TableRow>
            <TableCell align="left" className={classes.TableRowsSubtitle} style={{width:firstColWidth, paddingLeft:"6px", paddingRight:"0px"}} >Discounted FCFF</TableCell>
            {financialArray.map ((currElement) => ( 
              <TableCell align="right" className={classes.TableRowsSubtitle} style = {{ width:calcYearColumnWidth(),paddingLeft:"4px",paddingRight:"6px"}} >{Intl.NumberFormat('en-US',{style:'decimal',minimumFractionDigits:1,maximumFractionDigits:1}).format(currElement.discountedCashFlow)}</TableCell> 
            ))}  
          </TableRow>
        </TableBody>

    </Table>
  </TableContainer>
  </>
  )
}