import React, { useState }  from 'react';

import { Paper, Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TableFooter, TablePagination, TableSortLabel, Button, Tooltip } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import useTableSorting from '../../hooks/useTableSorting';
import TablePaginationActions from '../../components/TablePaginationActions';

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
    fontSize: 11
  },
  ButtonTable:{
    display: 'inline-block',
    padding:0,
    minHeight: 0,
    minWidth: 0,
    color: mainTheme.palette.primary.main,
    fontSize: "9px",
    textTransform:"none",
    "&:hover": {
      color:mainTheme.palette.secondary.main,
      backgroundColor:"whitesmoke"
    },
  },
  TableRows : {
    fontSize: 11
  }
}));



export default function TableDividendYield ({companiesList}) {
  const classes = useStyles();
  const [ page, setPage ] = useState(0);
  const [ rowsPerPage, setRowsPerPage ] = useState(15);
  const [ orderDirection, setOrderDirection ] = useState('desc');
  const [ orderBy, setOrderBy ] = useState('dividendYield');
  const { getComparator, handleRequestSort } = useTableSorting();

  const createSorthandler=(property) => (event) => {
    handleRequestSort(event, property, orderDirection, setOrderDirection, orderBy, setOrderBy);
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
    <TableContainer component={Paper} >
      <Table className={classes.table} size="small" aria-label="stycky header" >
        <TableHead className={classes.TableHeader}>
          <TableRow >
            <TableCell className={classes.TableTitle} style={{width:"50%",position:"sticky", left:0, zIndex:2}}  align="left" key="shortName">
              <TableSortLabel 
                active={orderBy==="shortName"} 
                style={{width:"46%", paddingLeft:"0px", paddingRight:"2px"}}
                direction={orderBy==="shortName" ? orderDirection : 'asc'} 
                onClick={createSorthandler("shortName")}
                >Company</TableSortLabel>
            </TableCell>
            <TableCell className={classes.TableTitle} style={{width:"6%"}} align="right">Symbol</TableCell>
            <TableCell className={classes.TableTitle} style={{width:"6%"}} align="right">Dividend</TableCell>
            <TableCell className={classes.TableTitle} style={{width:"6%", paddingLeft:"3px", paddingRight:"3px"}} align="center">Stock Price</TableCell>
            <TableCell className={classes.TableTitle} style={{width:"16%", paddingLeft:"0px", paddingRight:"0px"}} align="right" key="dividendYield" >
              <TableSortLabel 
                active={orderBy==="dividendYield"} 
                style={{width:"100px", paddingLeft:"0px", paddingRight:"2px"}}
                direction={orderBy==="dividendYield" ? orderDirection : 'desc'} 
                onClick={createSorthandler("dividendYield")}
                >Dividend Yield</TableSortLabel>
            </TableCell>
            {/* <Tooltip title="Average Five Years Dividend Yield: Average divided by current stock price"> */}
            <TableCell className={classes.TableTitle} style={{width:"16%",paddingLeft:"0px", paddingRight:"0px"}} padding="none" align="right" key="fiveYearAvgDividendYield" >
              <TableSortLabel 
                active={orderBy==="fiveYearAvgDividendYield"} 
                style={{width:"106px", paddingLeft:"0px", paddingRight:"4px"}}
                direction={orderBy==="fiveYearAvgDividendYield" ? orderDirection : 'desc'} 
                onClick={createSorthandler("fiveYearAvgDividendYield")}
                >5 Years D.Yield</TableSortLabel>
            </TableCell>
            {/* </Tooltip> */}
          </TableRow>
        </TableHead>
        
        <TableBody>
          
          {(rowsPerPage > 0 ? 
          
            companiesList.slice().sort(getComparator(orderDirection, orderBy)).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : companiesList
          ).map((company) => (
            <TableRow key={company.companyId}>
              <TableCell align="left" className={classes.TableRows} style={{width:"50%",position:"sticky", left:0,  paddingLeft:"6px", paddingRight:"0px", backgroundColor:"white"}} >{company.shortName}</TableCell>  
              <TableCell align="right" className={classes.TableRows} >{company.companyId}</TableCell>
              <TableCell align="right" className={classes.TableRows} >{Intl.NumberFormat('en-US',{style:'currency',currency:'USD'}).format(company.dividendRate)}</TableCell>
              <TableCell align="right" className={classes.TableRows} >{Intl.NumberFormat('en-US',{style:'currency',currency:'USD'}).format(company.regularMarketPrice)}</TableCell>
              <TableCell align="right" className={classes.TableRows} >{Intl.NumberFormat('en-US',{style:'percent', minimumFractionDigits:2}).format(company.dividendYield)}</TableCell>
              <TableCell align="right" className={classes.TableRows} >{Intl.NumberFormat('en-US',{style:'percent', minimumFractionDigits:2}).format(company.fiveYearAvgDividendYield/100)}</TableCell>
            </TableRow>
          ))}
          {emptyRows > 0 && (
            <TableRow style={{ height: 28.72 * emptyRows }}>
              <TableCell colSpan={6} />
            </TableRow>
          )}

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

// function descendingComparator(a, b, orderBy) {
//   if (typeof a[orderBy] === 'string' || a instanceof String ) {
//     // console.log("entrou com Lowercase Test")
//     var stringA = a[orderBy].toLowerCase(), stringB = b[orderBy].toLowerCase()
//     if (stringB < stringA) {
//       return -1;
//     }
//     if (stringB > stringA) {
//       return 1;
//     }
//     return 0;
//   } else {
//       if (b[orderBy] < a[orderBy]) {
//         return -1;
//       }
//       if (b[orderBy] > a[orderBy]) {
//         return 1;
//       }
//       return 0;
//     }
// }

// function getComparator(order, orderBy) {
//   return order === 'desc'
//     ? (a, b) => descendingComparator(a, b, orderBy)
//     : (a, b) => -descendingComparator(a, b, orderBy);
// }

  // const handleRequestSort = (event, property) => {
  //   const isAscending = (orderBy === property && orderDirection === 'asc');
  //   setOrderDirection(isAscending ? 'desc' : 'asc');
  //   setOrderBy(property);
  // };

  // const createSorthandler=(property) => (event) => {
  //   handleRequestSort(event, property);
  // }