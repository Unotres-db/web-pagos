import React, { useState, useEffect }  from 'react';
import PropTypes from 'prop-types';

import { Paper, Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TableFooter, TablePagination, TableSortLabel } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useTheme } from '@material-ui/core/styles';

import IconButton from '@mui/material/IconButton';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';

const useStyles = makeStyles( (mainTheme) => ({
  table: {
    minWidth: 370,
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
    fontSize: 12
  }

}));

function TablePaginationActions(props) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (event) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  );
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};

export default function TableGrahamModel({companiesList}) {
  const classes = useStyles();
  const [ page, setPage ] = useState(0);
  const [ rowsPerPage, setRowsPerPage ] = useState(15);
  const [ orderDirection, setOrderDirection ] = useState('desc');
  const [ orderBy, setOrderBy ] = useState('dividendYield');
  console.log(companiesList);
  
  useEffect ( ()=> {
  
    // changeOrder();
    // let arrayOfCompanies = companiesList;
    // alert ("--entrou em useEffect " + orderBy + " " + orderDirection);
    let arrayOfCompanies = companiesList;
    if (orderBy === "dividendYield"){
      if (orderDirection === 'asc') {
        companiesList.sort(function (a, b) {
          if (a.dividendYield > b.dividendYield) {
            return 1;
          }
          if (a.dividendYield < b.dividendYield) {
            return -1;
          }
          return 0;
        });
      } else if (orderDirection === 'desc'){
        companiesList.sort(function (a, b) {
          if (a.dividendYield < b.dividendYield) {
            return 1;
          }
          if (a.dividendYield > b.dividendYield) {
            return -1;
          }
          return 0;
          });
        }
      // console.log(companiesList);  
    }
    else {
      if (orderDirection === 'asc') {
        companiesList.sort(function (a, b) {
          if (a.shortName > b.shortName) {
            return 1;
          }
          if (a.shortName < b.shortName) {
            return -1;
          }
          return 0;
        });
      } else if (orderDirection === 'desc'){
        companiesList.sort(function (a, b) {
          if (a.shortName < b.shortName) {
            return 1;
          }
          if (a.shortName > b.shortName) {
            return -1;
          }
          return 0;
          });
        }
    }
    // setCompaniesList(arrayOfCompanies);
  },[orderDirection, orderBy])

  const handleRequestSort = (event, property) => {
    alert ("handleSort");
    const isAscending = (orderBy === property && orderDirection === 'asc');
    setOrderDirection(isAscending ? 'desc' : 'asc');
    setOrderBy(property);
    console.log(orderDirection);
  };

  const createSorthandler=(property) => (event) => {
    handleRequestSort(event, property);
  }
  
  // Avoid a layout jump when reaching the last page with empty rows.
  var emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - companiesList.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  }; 

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} size="small" aria-label="stycky header">
        <TableHead className={classes.TableHeader}>
          <TableRow >
            {/* <TableCell className={classes.TableTitle} align="left" key="company">
              <TableSortLabel 
                active={orderBy==="company"} 
                direction={orderBy==="company" ? orderDirection : 'asc'} 
                onClick={createSorthandler("company")}
                >Company</TableSortLabel>
            </TableCell> */}
            <TableCell className={classes.TableTitle} align="left">Company</TableCell>
            <TableCell className={classes.TableTitle} align="right">Symbol</TableCell>
            <TableCell className={classes.TableTitle} align="right">Dividend</TableCell>
            <TableCell className={classes.TableTitle} align="right">Stock Price</TableCell>
            <TableCell className={classes.TableTitle} align="right" key="dividendYield" >
              <TableSortLabel 
                active={orderBy==="dividendYield"} 
                direction={orderBy==="dividendYield" ? orderDirection : 'desc'} 
                onClick={createSorthandler("dividendYield")}
                >Dividend Yield</TableSortLabel>
            </TableCell>

          </TableRow>
        </TableHead>
        <TableBody>
          {(rowsPerPage > 0 ? 
            companiesList.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : companiesList
          ).map((company) => (
            <TableRow key={company.companyId}>
              <TableCell component="th" scope="row" className={classes.TableRows}>
                {company.shortName}
              </TableCell>
              <TableCell align="right" className={classes.TableRows} >{company.companyId}</TableCell>
              <TableCell align="right" className={classes.TableRows} >{Intl.NumberFormat('en-US',{style:'currency',currency:'USD'}).format(company.dividendRate)}</TableCell>
              <TableCell align="right" className={classes.TableRows} >{Intl.NumberFormat('en-US',{style:'currency',currency:'USD'}).format(company.regularMarketPrice)}</TableCell>
              <TableCell align="right" className={classes.TableRows} >{Intl.NumberFormat('en-US',{style:'percent', minimumFractionDigits:2}).format(company.dividendYield)}</TableCell>
            </TableRow>
          ))}
          {/* {emptyRows > 0 && (
            <TableRow style={{ height: 53 * emptyRows }}>
              <TableCell colSpan={6} />
            </TableRow>
          )} */}

        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              // rowsPerPageOptions={[15, { label: 'All', value: -1 }]}
              rowsPerPageOptions={[]}
              colSpan={3}
              count={companiesList.length}
              rowsPerPage={rowsPerPage}
              page={page}
              SelectProps={{
                inputProps: {
                  'aria-label': 'rows per page',
                },
                native: true,
              }}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              ActionsComponent={TablePaginationActions}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  );
}