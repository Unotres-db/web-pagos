import React from 'react';

import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core';
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
  fontSize: 12
},
TableRows : {
  fontSize: 11
  },
TableRowsSubtitle : {
  fontSize: 11,
  height: 16,
  backgroundColor: "#d3d3d3",//light gray
  }, 
TableCurrentPrice:{
  color: "white",
  backgroundColor: mainTheme.palette.primary.main,
  fontSize: 11
},
}));


export default function TableDCFValuation ({valuation, historicalFinancialData}){
  console.log(historicalFinancialData);
  const classes = useStyles();
  return (
  <>
  <TableContainer component={Paper}>
    <Table className={classes.table} size="small" aria-label="stycky header">
      <TableHead className={classes.TableHeader}>
        <TableRow>
          <TableCell className={classes.TableTitle} align="left">Valuation</TableCell>
          <TableCell className={classes.TableTitle} align="right"></TableCell>
        </TableRow>
      </TableHead>
        <TableBody>
          <TableRow>
            <TableCell align="left" className={classes.TableRows}>Cash Flow Present Value </TableCell>
            <TableCell align="right" className={classes.TableRows} >{Intl.NumberFormat('en-US',{style:'decimal', minimumFractionDigits:2}).format(valuation.discreteNPV)}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell align="left" className={classes.TableRows}>Perpetuity Value </TableCell>
            <TableCell align="right" className={classes.TableRows} >{Intl.NumberFormat('en-US',{style:'decimal', minimumFractionDigits:2}).format(valuation.perpetuityValue)}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell align="left" className={classes.TableRows}>Perpetuity Present Value </TableCell>
            <TableCell align="right" className={classes.TableRows} >{Intl.NumberFormat('en-US',{style:'decimal', minimumFractionDigits:2}).format(valuation.perpetuityPresentValue)}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell align="left" className={classes.TableRowsSubtitle}>Enterprise Value </TableCell>
            <TableCell align="right" className={classes.TableRowsSubtitle} >{Intl.NumberFormat('en-US',{style:'decimal', minimumFractionDigits:2}).format(valuation.enterpriseValue)}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell align="left" className={classes.TableRows}>(+) Cash</TableCell>
            <TableCell align="right" className={classes.TableRows} >{Intl.NumberFormat('en-US',{style:'decimal', minimumFractionDigits:2}).format(historicalFinancialData[0].cash)}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell align="left" className={classes.TableRows}>(-) Debt</TableCell>
            <TableCell align="right" className={classes.TableRows} >{Intl.NumberFormat('en-US',{style:'decimal', minimumFractionDigits:2}).format(historicalFinancialData[0].longTermDebt+historicalFinancialData[0].shortLongTermDebt)}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell align="left" className={classes.TableRowsSubtitle}>Equity Value</TableCell>
            <TableCell align="right" className={classes.TableRowsSubtitle} >{Intl.NumberFormat('en-US',{style:'decimal', minimumFractionDigits:2}).format(valuation.equityValue)}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell align="left" className={classes.TableRows}>Total shares</TableCell>
            <TableCell align="right" className={classes.TableRows} >{Intl.NumberFormat('en-US',{style:'decimal', minimumFractionDigits:0}).format(13545)}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell align="left" className={classes.TableCurrentPrice}>Valuation Target Price </TableCell>
            <TableCell align="right" className={classes.TableCurrentPrice} >{Intl.NumberFormat('en-US',{style:'currency',currency:'USD'}).format(valuation.equityValue*1000/13545)}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className={classes.TableCurrentPrice} align="left">Current Stock Price</TableCell>
            <TableCell align="right" className={classes.TableCurrentPrice} >{Intl.NumberFormat('en-US',{style:'currency',currency:'USD'}).format(70.89)}</TableCell>
          </TableRow>
        </TableBody>
    </Table>
  </TableContainer>
  </>
  )
}