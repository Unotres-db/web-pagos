import React from 'react';
import { Paper, TableContainer, Table, TableHead, TableBody, TableRow, TableCell, TableFooter, TablePagination, TableSortLabel, Button, IconButton, Tooltip } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles( (mainTheme) => ({
  tableTitle: {
    fontSize: '11px',
    color: 'white',
    backgroundColor: mainTheme.palette.primary.main,
  },
  tableCell: {
    fontSize: '10px',
    color:mainTheme.palette.primary.main,
  },
  grayStyle:{    
    color:mainTheme.palette.primary.main,
    backgroundColor: mainTheme.palette.contrast.main
  }
}));

const TableValuationResults = () => {
  // Sample data with the specified lines
  const data = {
    totalFreeCashFlow: 6389,
    g:4,
    perpetuityValue: 43633,
    wacc:19.94,
    presentValue: 17530,
    cash: 60,
    debt: 1182,
    valueOfEquity: 16408,
  };

  const classes = useStyles();

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell className={classes.tableTitle} style={{padding:"5px", paddingLeft:"10px"}}>Valuation (en Gs. millones)</TableCell>
            <TableCell className={classes.tableTitle} style={{padding:"5px"}}></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell className={classes.tableCell} style={{padding:"5px"}}>Flujo de Caja Libre 2023-27</TableCell>
            <TableCell align="right"  className={classes.tableCell} style={{padding:"5px"}}>{Intl.NumberFormat('en-US',{style:'decimal', minimumFractionDigits:0,maximumFractionDigits:0}).format(data.totalFreeCashFlow)}</TableCell>
          </TableRow>
          {/* <TableRow>
            <TableCell className={classes.tableCell} style={{padding:"5px"}}>Crecimiento en Perpetuidad</TableCell>
            <TableCell align="right" className={classes.tableCell} style={{padding:"5px"}}>4.00%</TableCell>
          </TableRow> */}
          <TableRow>
            <TableCell className={classes.tableCell} style={{padding:"5px"}}>Valor Terminal</TableCell>
            <TableCell align="right" className={classes.tableCell} style={{padding:"5px"}}>{Intl.NumberFormat('en-US',{style:'decimal', minimumFractionDigits:0,maximumFractionDigits:0}).format(data.perpetuityValue)}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className={classes.tableCell} style={{padding:"5px"}}>Costo de Capital (WACC)</TableCell>
            <TableCell align="right" className={classes.tableCell} style={{padding:"5px"}}>17.94%</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className={`${classes.tableCell} ${classes.grayStyle}`} style={{padding:"5px"}}>Valor Actual Neto</TableCell>
            <TableCell align="right" className={`${classes.tableCell} ${classes.grayStyle}`} style={{padding:"5px"}}>{Intl.NumberFormat('en-US',{style:'decimal', minimumFractionDigits:0,maximumFractionDigits:0}).format(data.presentValue)}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className={classes.tableCell} style={{padding:"5px"}}>(+) Caja Actual</TableCell>
            <TableCell align="right" className={classes.tableCell} style={{padding:"5px"}}>{Intl.NumberFormat('en-US',{style:'decimal', minimumFractionDigits:0,maximumFractionDigits:0}).format(data.cash)}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className={classes.tableCell} style={{padding:"5px"}}>(-) Deuda Actual</TableCell>
            <TableCell align="right" className={classes.tableCell} style={{padding:"5px"}}>{Intl.NumberFormat('en-US',{style:'decimal', minimumFractionDigits:0,maximumFractionDigits:0}).format(data.debt)}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className={`${classes.tableCell} ${classes.grayStyle}`} style={{padding:"5px"}}>Valor de las Acciones</TableCell>
            <TableCell align="right" className={`${classes.tableCell} ${classes.grayStyle}`} style={{padding:"5px"}}>{Intl.NumberFormat('en-US',{style:'decimal', minimumFractionDigits:0,maximumFractionDigits:0}).format(data.valueOfEquity)}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TableValuationResults;
