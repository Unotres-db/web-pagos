import React, { useState }  from 'react';
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

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

// This method is created for cross-browser compatibility, if you don't
// need to support IE11, you can use Array.prototype.sort() directly
function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}


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
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(15);

  const [order, setOrder] = useState('desc');
  const [orderBy, setOrderBy] = useState('dividendYield');
  const [selected, setSelected] = useState([]);


  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - companiesList.length) : 0;

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
            <TableCell className={classes.TableTitle} align="left">
              <TableSortLabel active={false} direction={'asc'} >Company</TableSortLabel>
            </TableCell>
            <TableCell className={classes.TableTitle} align="right">Symbol</TableCell>
            <TableCell className={classes.TableTitle} align="right">Dividend </TableCell>
            <TableCell className={classes.TableTitle} align="right">Price</TableCell>
            <TableCell className={classes.TableTitle} align="right" >
              <TableSortLabel active={true} direction={'desc'} >Dividend Yield</TableSortLabel>
            </TableCell>

          </TableRow>
        </TableHead>
        <TableBody>
          {(rowsPerPage > 0
            ? companiesList.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
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