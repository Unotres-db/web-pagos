import React, { useEffect } from 'react';

import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tooltip, Typography, useMediaQuery } from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { CurrencyExchange, JavascriptRounded } from '@mui/icons-material';

const useStyles = makeStyles( (mainTheme) => ({
  table: {
    minWidth: 360,
    height:"100%",
    // maxHeight: 900
  },
  TableHeader:{
    color: "white",
    backgroundColor: mainTheme.palette.primary.main
  },
  TableTitle:{
    color: "white",
    fontSize: 11,
    [mainTheme.breakpoints.down('xs')]: {
      fontSize: "9px"
    },
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

export default function TestTableCashFlow ({financialArray, isCheckedShowPreviousYears, isCheckedDescOrder, isEstimateFcffOnly}){ 
  const classes = useStyles();
  const firstColWidth = "22%";
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('xs'));
  const firstColumnsRows = [
    { id: 0,
      columnText:"EBIT",
      columnMobileText:"EBIT",
      columnData: "ebit",
      subtotal: false},
    { id: 1,
      columnText:"(-) Taxes",
      columnMobileText:"(-) Taxes",
      columnData:"incomeTaxExpense",
      subtotal: false},  
    { id: 2,
      columnText:"(+) Depreciation",
      columnMobileText:"(+) Depreciation",
      columnData: "depreciation",
      subtotal: false}, 
    { id: 3,
      columnText:"(-) Capex",
      columnMobileText:"(-) Capex",
      columnData: "capitalExpenditures",
      subtotal: false},  
    { id: 4,
      columnText:"(-) Net Working Capital Changes",
      columnMobileText:"(-) NWC Changes",
      columnData: "workingCapitalChanges",
      subtotal: false},
    { id: 5,
      columnText:"Free Cash Flow of the Firm",
      columnMobileText:"Free Cash Flow",
      columnData: "cashFlow",
      subtotal: true}, 
    { id: 6,
      columnText:"Discounted FCFF",
      columnMobileText:"Discounted FCFF",
      columnData: "discountedCashFlow",
      subtotal: true} 
]
  // console.count();

  function calcYearColumnWidth (){
    if (isCheckedShowPreviousYears){
      return "8%"
    } 
    return "15%"
  }


  function finddata(currElement, index){
    // console.count();
    for (let i = 0; i < firstColumnsRows.length ; i++){
      const { [firstColumnsRows[0].columnData]: data1 } = currElement
      const { [firstColumnsRows[1].columnData]: data2 } = currElement
      const { [firstColumnsRows[2].columnData]: data3 } = currElement
      const { [firstColumnsRows[3].columnData]: data4 } = currElement
      const { [firstColumnsRows[4].columnData]: data5 } = currElement
      const { [firstColumnsRows[5].columnData]: data6 } = currElement
      const { [firstColumnsRows[6].columnData]: data7 } = currElement
    }

    // const cashFlow = currElement[cashFlow]
    // console.log ( "1: "  + data1 )
    // console.log ( "2: "  + data2 )
    // console.log ( "3: "  + data3 )
    // console.log ( "4: "  + data4 )
    // console.log ( "5: "  + data5 )
    // console.log ( "6: "  + data6 )
    // console.log ( "7: "  + data7 )
  }

  function filterByColumnData (){

    for (let i = 0; i < firstColumnsRows.length ; i++){
      
      for (let j = 0; j < financialArray.length ; j++){
        let { [firstColumnsRows[i].columnData]: data } = financialArray[j];
        console.log(j);
      }  

    }  


  }



//   function filterByColumnData ( columnData){
//     // para cada item do array
//     for (let i = 0; i < financialArray.length ; i++){
//       // Checha se o object tem o campo buscado
//       Object.keys(financialArray[i]).forEach( (key) => {   // key es el nombre del key
//         if ( key.toString() === columnData ) {                     //values[key] es el contenido del key
//           return financialArray[i].values[key]
//         }
//       })
//   }
// }

  function defineColor( index ){
  if (isCheckedShowPreviousYears){
    if (isCheckedDescOrder){
      if (index < 5){
        return "#F9AA33";
      } else {
        return "whitesmoke"; 
      }
    } else {
      if (index < 3){
        return "whitesmoke"; 
      } else {
        return "#F9AA33";
      }
    }
  } else {
      return "#F9AA33";
    }
  }

  function defineTextBackgroundColor( index ){
  if (isCheckedShowPreviousYears){
    if (isCheckedDescOrder){
      if (index < 5) { return "#344955";} else { return "#3C6E76";}
    } else {
      if (index < 3){ return "#3C6E76";} else { return "#344955";}
    }
  } else { return "#344955";}
  }
  
  function defineNumberFormat ( number, index ){
    if (isEstimateFcffOnly){
      if (isCheckedShowPreviousYears){
        if (isCheckedDescOrder){
          if (index < 5){   //atualizar para discreteCashFlow > 5....
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

  return (
    <>
    <Paper>

      <TableContainer component = {Paper}>
      {/* {console.log(firstColumnsRows)}; */}
      <Table className = {classes.table} size="small" aria-label="stycky header">

        <TableHead className = {classes.TableHeader}>
          <TableRow>
            <TableCell className={classes.TableTitle} style={{width:firstColWidth, paddingLeft:"6px", paddingRight:"0px"}} align="left" >{isMobile ? "Free Cash Flow": "Free Cash Flow of the Firm"}</TableCell>
            {financialArray.map ((currElement, index) => (
              <TableCell className={classes.TableYears} align="right" style={{color:defineColor(index), backgroundColor:defineTextBackgroundColor(index), width:calcYearColumnWidth(),paddingLeft:"4px",paddingRight:"6px"}}>{currElement.year}</TableCell>
            ))} 
          </TableRow>
        </TableHead>

        <TableBody>
  
          <TableRow>
        
            <TableCell align="left" className = {classes.TableRows} style = {{width:firstColWidth, paddingLeft:"6px", paddingRight:"0px"}} >Earnings Before Interest and Taxes</TableCell>
            { financialArray.map ((currElement, index) => (
              <TableCell align="right" className = {classes.TableRows} style = {{ width:calcYearColumnWidth(),paddingLeft:"4px",paddingRight:"6px"}} >{defineNumberFormat(currElement.ebit, index)}</TableCell>
              // <TableCell align="right" className = {classes.TableRows} style = {{ width:calcYearColumnWidth(),paddingLeft:"4px",paddingRight:"6px"}} >{Intl.NumberFormat('en-US',{style:'decimal',minimumFractionDigits:1,maximumFractionDigits:1}).format(currElement.ebit)}</TableCell>
            ))} 
          </TableRow>

          {}
          {/* <TableRow>
            <TableCell align="left" className = {classes.TableRows} style = {{width:firstColWidth, paddingLeft:"6px", paddingRight:"0px"}} >(-) Taxes</TableCell>
            {financialArray.map ((currElement, index) => (
              <TableCell align="right" className = {classes.TableRows} style = {{ width:calcYearColumnWidth(),paddingLeft:"4px",paddingRight:"6px"}} >{defineNumberFormat(currElement.incomeTaxExpense, index)}</TableCell>
            ))}
          </TableRow>
          <TableRow>
            <TableCell align="left" className = {classes.TableRows} style = {{width:firstColWidth, paddingLeft:"6px", paddingRight:"0px"}} >(+) Depreciation</TableCell>
            {financialArray.map ((currElement, index) => (
              <TableCell align="right" className={classes.TableRows} style = {{ width:calcYearColumnWidth(),paddingLeft:"4px",paddingRight:"6px"}} >{defineNumberFormat(currElement.depreciation, index)}</TableCell>
            ))} 
          </TableRow>
          <TableRow>
            <TableCell align="left" className={classes.TableRows} style={{width:firstColWidth, paddingLeft:"6px", paddingRight:"0px"}} >(-) Capex</TableCell>
            {financialArray.map ((currElement, index) => (
              <TableCell align="right" className={classes.TableRows} style = {{ width:calcYearColumnWidth(),paddingLeft:"4px",paddingRight:"6px"}} >{defineNumberFormat(currElement.capitalExpenditures, index)}</TableCell>
            ))} 
          </TableRow>
          <TableRow>
            <TableCell align="left" className={classes.TableRows} style={{width:firstColWidth, paddingLeft:"6px", paddingRight:"0px"}} >{isMobile? "(-) NWC Changes":"(-) Net Working Capital Changes"}</TableCell>
            {financialArray.map ((currElement,index) => (
              <TableCell align="right" className={classes.TableRows} style = {{ width:calcYearColumnWidth(),paddingLeft:"4px",paddingRight:"6px"}} >{defineNumberFormat(currElement.workingCapitalChanges, index)}</TableCell>
          ))}
          </TableRow>
          <TableRow>
            <TableCell align="left" className={classes.TableRowsSubtitle} style={{width:firstColWidth, paddingLeft:"6px", paddingRight:"0px"}} >{isMobile ? "Free Cash Flow": "Free Cash Flow of the Firm"}</TableCell>
            {financialArray.map ((currElement) => (
              // <TableCell align="right" className={classes.TableRowsSubtitle} style = {{ width:calcYearColumnWidth(),paddingLeft:"4px",paddingRight:"6px"}} >{defineNumberFormat(currElement.cashFlow)}</TableCell>
              <TableCell align="right" className={classes.TableRowsSubtitle} style = {{ width:calcYearColumnWidth(),paddingLeft:"4px",paddingRight:"6px"}} >{Intl.NumberFormat('en-US',{style:'decimal',minimumFractionDigits:1,maximumFractionDigits:1}).format(currElement.cashFlow)}</TableCell>
            ))} 
          </TableRow>
          <TableRow>
            <TableCell align="left" className={classes.TableRowsSubtitle} style={{width:firstColWidth, paddingLeft:"6px", paddingRight:"0px"}} >{isMobile ? "Discounted FCFF": "Discounted Free Cash Flow of the Firm"}</TableCell>
            {financialArray.map ((currElement) => ( 
              <TableCell align="right" className={classes.TableRowsSubtitle} style = {{ width:calcYearColumnWidth(),paddingLeft:"4px",paddingRight:"6px"}} >{Intl.NumberFormat('en-US',{style:'decimal',minimumFractionDigits:1,maximumFractionDigits:1}).format(currElement.discountedCashFlow)}</TableCell> 
            ))}  
          </TableRow> */}
        </TableBody>
      </Table>
    </TableContainer>
  </Paper>

  </>
  )
}