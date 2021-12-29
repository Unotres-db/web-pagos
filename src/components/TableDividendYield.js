import React from 'react';

import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core';
import { withStyles, makeStyles } from '@material-ui/core/styles';

const StyledTableCell = withStyles((mainTheme) => ({
  head: {
    backgroundColor: mainTheme.palette.primary.main, 
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

const useStyles = makeStyles({
  table: {
    minWidth: 370,
    maxHeight: 500
  },
});

export default function TableDividendYield({companiesList}) {
  const classes = useStyles();
  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} size="small" aria-label="stycky header">
        <TableHead>
          <TableRow>
            <StyledTableCell>Company</StyledTableCell>
            <StyledTableCell align="right">Symbol</StyledTableCell>
            <StyledTableCell align="right">Dividend </StyledTableCell>
            <StyledTableCell align="right">Price</StyledTableCell>
            <StyledTableCell align="right">Dividend Yield</StyledTableCell>
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
                <StyledTableCell align="right" >{Intl.NumberFormat('en-US',{style:'currency',currency:'USD'}).format(company.dividendRate)}</StyledTableCell>
                <StyledTableCell align="right" >{Intl.NumberFormat('en-US',{style:'currency',currency:'USD'}).format(company.regularMarketPrice)}</StyledTableCell>
                <StyledTableCell align="right" >{Intl.NumberFormat('en-US',{style:'percent', minimumFractionDigits:2}).format(company.dividendYield)}</StyledTableCell>

            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}