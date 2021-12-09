import React, { useEffect, useState } from 'react';

import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core';
import { withStyles, makeStyles } from '@material-ui/core/styles';

import api from '../services/api';

const StyledTableCell = withStyles((mainTheme) => ({
  head: {
    backgroundColor: mainTheme.palette.secondary.main,
    color: mainTheme.palette.common.white,
  },
  body: {
    fontSize: 12,
  },
}))(TableCell);

const StyledTableRow = withStyles((mainTheme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: mainTheme.palette.action.hover,
    },
  },
}))(TableRow);

function createData(companyName, companyTicker, companyDiv1year, companyPrice, companyDivYield, companyPE) {
  return { companyName, companyTicker, companyDiv1year, companyPrice, companyDivYield, companyPE };
}
// Company, Ticker, Dividend, Price, DivYeld,PE
const rows = [
  createData('Apple computer', 'APPL', '30', "1000", "3%","80"),
  createData('Chevron', 'CVX', '60', "2000", "3%","10"),
  createData('Exxon', 'XOM', '20', "1000", "2%","10"),
  createData('Amazon', 'AMZ', '20', "1000", "2%","100"),,

];

const useStyles = makeStyles({
  table: {
    width: 670,
  },
});

export default function TableDividendYield() {
  const classes = useStyles();
  const [ companiesList, setCompaniesList ] = useState([]);
  
  useEffect ( ()=> {
    api.get('dividendyield').then (response => {
      setCompaniesList(response.data);
    }).catch (function (err){
      if (err.response) {
        const errorMsg = Object.values(err.response.data);
        alert("warning - Error en acceso a base de datos" + errorMsg)
      } else if(err.request) {
          alert("warning - Error en acceso a servidor")
        } else {
            alert("warning - Error en acceso a servidor")
          }
    });
  },[])

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Company</StyledTableCell>
            <StyledTableCell align="right">Symbol</StyledTableCell>
            <StyledTableCell align="left">Dividend </StyledTableCell>
            <StyledTableCell align="left">Price</StyledTableCell>
            <StyledTableCell align="left">Dividend Yield</StyledTableCell>
            {/* <StyledTableCell align="right">P/E Ratio</StyledTableCell> */}
          </TableRow>
        </TableHead>
        <TableBody>
          {companiesList.map((company) => (
            <StyledTableRow key={company.companyId}>
              <StyledTableCell   component="th" scope="row">
                {company.shortName}
              </StyledTableCell>
                <StyledTableCell align="right" >{company.companyId}</StyledTableCell>
                <StyledTableCell align="right" >{company.dividendYield}</StyledTableCell>
                <StyledTableCell align="right" >{company.regularMarketPrice}</StyledTableCell>
                <StyledTableCell align="right" >{company.dividendRate}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}