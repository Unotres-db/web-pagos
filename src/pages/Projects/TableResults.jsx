import React from 'react';

import { Paper, TableContainer, Table, TableHead, TableBody, TableRow, TableCell, Tooltip } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((mainTheme) => ({
table: {
  // minWidth: 300,
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
  backgroundColor: mainTheme.palette.contrast.main, //light gray
  }, 
TableValuationPrice:{
  color: "white",
  backgroundColor: mainTheme.palette.primary.main,
  fontSize: 11
},
TableCurrentPrice:{
  color: "white",
  backgroundColor: mainTheme.palette.tertiary.main, //mainTheme.palette.primary.main,
  fontSize: 11,
},
}));

export default function TableResults (){

  const classes = useStyles();

  return (
  <>
  <TableContainer component={Paper}>
    <Table className={classes.table} size="small" aria-label="stycky header">
      <TableHead className={classes.TableHeader}>
        <TableRow>
          <TableCell className={classes.TableValuationPrice} style={{fontSize: 12}}align="left">Resultados del Proyecto</TableCell>
          <TableCell className={classes.TableValuationPrice} align="right"></TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
      <TableRow>
          <TableCell align="left" className={classes.TableRows}>Total de Ventas</TableCell>
          <TableCell align="right" className={classes.TableRows} >{Intl.NumberFormat('en-US',{style:'decimal', minimumFractionDigits:0,maximumFractionDigits:0}).format(5692170)}</TableCell>
        </TableRow>
      <TableRow>
          <TableCell align="left" className={classes.TableRows}>Resultado antes de IRE</TableCell>
          <TableCell align="right" className={classes.TableRows} >{Intl.NumberFormat('en-US',{style:'decimal', minimumFractionDigits:0,maximumFractionDigits:0}).format(877828)}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell align="left" className={classes.TableRows}>Valor Actual Neto @9,83 anual</TableCell>
          <TableCell align="right" className={classes.TableRows} >{Intl.NumberFormat('en-US',{style:'decimal', minimumFractionDigits:0,maximumFractionDigits:0}).format(844116)}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell align="left" className={classes.TableRows}>{`Payback (meses)`}</TableCell>
          <TableCell align="right" className={classes.TableRows} >{Intl.NumberFormat('en-US',{style:'decimal', minimumFractionDigits:0,maximumFractionDigits:0}).format(23)}</TableCell>
        </TableRow>
        {/* <TableRow>
          <TableCell align="left" className={classes.TableRows}>TIR Mensual </TableCell>
          <TableCell align="right" className={classes.TableRows} >{Intl.NumberFormat('en-US',{style:'percent', minimumFractionDigits:2,maximumFractionDigits:2}).format(0.012)}</TableCell>
        </TableRow> */}
        <TableRow>
          <TableCell align="left" className={classes.TableRows}>TIR Efectiva Anual</TableCell>
          <TableCell align="right" className={classes.TableRows} >{Intl.NumberFormat('en-US',{style:'percent', minimumFractionDigits:2,maximumFractionDigits:2}).format(0.1533)}</TableCell>
        </TableRow>

      </TableBody>
    </Table>
  </TableContainer>
  </>
  )
}