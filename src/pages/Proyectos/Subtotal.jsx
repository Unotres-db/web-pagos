import React from 'react';

import { Paper, TableContainer, Table, TableHead, TableBody, TableRow, TableCell } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles( () => ({
  tableStyle:{
    minWidth: 300,
    maxHeight: 900
  },
  tableHeaderStyle:{
    color: "white",
    backgroundColor: '#344955'
  },
  tableTitleStyle:{
    color: "white",
    fontSize: 11
  },
  tableRowsStyle:{
    fontSize: 12
  }
}));

// function formatNumber(number){
//   return {Intl.NumberFormat('"de-DE"',{style:'decimal', minimumFractionDigits:0,maximumFractionDigits:0}).format(number)}
// }


export default function Subtotal ({ transactions }){
    const classes = useStyles();
    // const [ subtotal, setSubTotal] = useState({ingresos:0, egresos:0})
    const ingresos = transactions.filter(transaction => transaction.idTipoFlujo === "0").reduce((subtotal, transaction) => subtotal + parseInt(transaction.montoFactura), 0);
    const egresos = transactions.filter(transaction => transaction.idTipoFlujo === "1").reduce((subtotal, transaction) => subtotal + parseInt(transaction.montoFactura), 0);
    const saldo = ingresos - egresos
    return (
      <>
      { transactions ? <>
      
        <TableContainer component={Paper} >

          <Table className = {classes.tableStyle} size="small" aria-label="stycky header">

            <TableHead className = {classes.tableHeaderStyle}>
              <TableRow>
                <TableCell className = {classes.tableTitleStyle} style={{fontSize:"11px",width: "34%", padding:"4px",color:"whitesmoke" }} align="right">Total Ingresos</TableCell>
                <TableCell className = {classes.tableTitleStyle} style={{fontSize:"11px",width: "34%", padding:"4px",color:"whitesmoke"}} align="right">Total Egresos</TableCell>
                <TableCell className = {classes.tableTitleStyle} style={{fontSize:"11px",width: "34%", padding:"4px",color:"whitesmoke"}} align="right">Saldo</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              <TableRow>
                <TableCell className = {classes.tableRowsStyle} style={{fontSize:"11px", width: "34%", padding:"4px" }} align="right" >{Intl.NumberFormat("de-DE",{style:'decimal', minimumFractionDigits:0,maximumFractionDigits:0}).format(ingresos)}</TableCell>
                <TableCell className = {classes.tableRowsStyle} style={{ fontSize:"11px",width: "33%", paddingRight:"5px", padding:"2px" }}  align="right" >{Intl.NumberFormat("de-DE",{style:'decimal', minimumFractionDigits:0,maximumFractionDigits:0}).format(egresos)}</TableCell>
                <TableCell className = {classes.tableRowsStyle} style={{ fontSize:"11px",width: "33%", paddingRight:"5px", padding:"2px" }}  align="right" >{Intl.NumberFormat("de-DE",{style:'decimal', minimumFractionDigits:0,maximumFractionDigits:0}).format(saldo)}</TableCell>
              </TableRow>  
            </TableBody>
          </Table>
        </TableContainer>
      </>: null }
      </>
    )
}