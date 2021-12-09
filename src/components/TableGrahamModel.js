import React, { useEffect } from 'react';

import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core';
import { withStyles, makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    table: {
      width: 670,
    },
  });

  function createData(companyName, companyTicker, companyDiv1year, companyPrice, companyDivYield, companyPE) {
    return { companyName, companyTicker, companyDiv1year, companyPrice, companyDivYield, companyPE };
  }
  // Company, Ticker, Dividend, Price, DivYeld,PE
  const rows = [
    createData('Apple Inc.', 'APPL', '0.88', "149.99", "0.6%","26.74"),
    createData('Chevron Corporation', 'CVX', '5.36', "114.23", "4.7%","22.08"),
    createData('Exxon Mobil Corporation', 'XOM', '3.52', "63.82", "5.47%","NA"),
    createData('The Coca-Cola Company ', 'KO', '1.68', "56.61", "2.96%","27.87"),
    createData('Verizon Communications Inc.', 'VC', '2.56', "63.82", "5.47%","5.32"),
    createData('JPMorgan Chase & Co. ', 'JPM', '4.00 ', "166.86", "2.39%","15.81"),
    createData('The Goldman Sachs Group, Inc.', 'GS', '8.00', "404.91", "1.99%","6.68"),
    createData('Bank of America Corporation', 'BAC', '0.84 ', "46.91", "1.77%","14.04"),
    createData('The Procter & Gamble Company', 'PG', '3.48', "146,56", "2.38%","26.78"),
    createData('Johnson & Johnson', 'JNJ', '4.24', "165.01", "2.6%","24.66"),,
  
  ];

export default function TableGrahamModel () {
    const classes = useStyles();

    
    return (
      <TableContainer component={Paper}>
          {/* className={classes.table} */}
        <Table  size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell>Company</TableCell>
              <TableCell align="center">Ticker</TableCell>
              <TableCell align="right">Dividend </TableCell>
              <TableCell align="right">Price</TableCell>
              <TableCell align="right">Dividend Yield</TableCell>
              {/* <TableCell align="right">P/E Ratio</TableCell> */}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.companyName}>
                <TableCell width="30%"  component="th" scope="row" style={{fontSize:12}}>
                  {row.companyName}
                </TableCell>
                  <TableCell align="center" width="10%" style={{fontSize:12}}>{row.companyTicker}</TableCell>
                  <TableCell align="right" width="10%" >{row.companyDiv1year}</TableCell>
                  <TableCell align="right" width="15%" >{row.companyPrice}</TableCell>
                  <TableCell align="right" width="10%" >{row.companyDivYield}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  }