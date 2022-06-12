import React, { useState, useEffect }  from 'react';

import { Paper, Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TableFooter, TablePagination, TableSortLabel, Button, Tooltip } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
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

// function descendingComparator(a, b, orderBy) {
//   if (b[orderBy] < a[orderBy]) {
//     return -1;
//   }
//   if (b[orderBy] > a[orderBy]) {
//     return 1;
//   }
//   return 0;
// }

function descendingComparator(a, b, orderBy) {
  if (typeof a[orderBy] === 'string' || a instanceof String ) {
    var stringA = a[orderBy].toLowerCase(), stringB = b[orderBy].toLowerCase()
    if (stringB < stringA) {
      return -1;
    }
    if (stringB > stringA) {
      return 1;
    }
    return 0;
  } else {
      if (b[orderBy] < a[orderBy]) {
        return -1;
      }
      if (b[orderBy] > a[orderBy]) {
        return 1;
      }
      return 0;
    }
}

function getComparator(order, orderBy) {
  return order === 'desc' ? (a, b) => descendingComparator(a, b, orderBy): (a, b) => -descendingComparator(a, b, orderBy);
}

export default function TableMyValuationsList ({valuationsList}) {
  const classes = useStyles();
  const [ page, setPage ] = useState(0);
  const [ rowsPerPage, setRowsPerPage ] = useState(15);
  const [ orderDirection, setOrderDirection ] = useState('asc');
  const [ orderBy, setOrderBy ] = useState('shortName');
  // var options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' };

  const handleRequestSort = (event, property) => {
    const isAscending = (orderBy === property && orderDirection === 'asc');
    setOrderDirection(isAscending ? 'desc' : 'asc');
    setOrderBy(property);
    console.log(property + isAscending)
  };

  const createSorthandler=(property) => (event) => {
    handleRequestSort(event, property);
  }
  
  // Avoid a layout jump when reaching the last page with empty rows.
  var emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - valuationsList.length) : 0;

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
          <TableCell className={classes.TableTitle} style={{width:"18%", paddingLeft:"5px", paddingRight:"5px"}} align="left">Date</TableCell>

            {/* <TableCell className={classes.TableTitle} style={{width:"18%"}} align="left" key="updated_at">
              <TableSortLabel 
                active={orderBy==="updated_at"} 
                // style={{width:"10%", paddingLeft:"0px", paddingRight:"2px"}}
                direction={orderBy==="updated_at" ? orderDirection : 'desc'} 
                onClick={createSorthandler("updated_at")}
                >Date</TableSortLabel>
            </TableCell> */}
            <TableCell className={classes.TableTitle} style={{width:"20%", paddingLeft:"5px", paddingRight:"5px"}} align="left" key="shortName" >
              <TableSortLabel 
                active={orderBy==="shortName"} 
                // style={{width:"100px", paddingLeft:"0px", paddingRight:"2px"}}
                direction={orderBy==="shortName" ? orderDirection : 'asc'} 
                onClick={createSorthandler("shortName")}
                >Company</TableSortLabel>
            </TableCell>
{/* 
            <TableCell className={classes.TableTitle} style={{width:"16%"}} align="right">Valuation</TableCell>
            <TableCell className={classes.TableTitle} style={{width:"16%"}} align="right">Equity Value</TableCell>
            <TableCell className={classes.TableTitle} style={{width:"16%"}} align="right">Cost of Capital</TableCell>
            <TableCell className={classes.TableTitle} style={{width:"16%", paddingLeft:"3px", paddingRight:"3px"}} align="center">Target Price</TableCell> */}

            {/* <TableCell className={classes.TableTitle}  align="right">Valuation</TableCell> */}
            <TableCell className={classes.TableTitle} style={{width:"18%", paddingLeft:"5px", paddingRight:"5px"}} align="right">Equity Value (Us$ B)</TableCell>
            <TableCell className={classes.TableTitle} style={{width:"16%", paddingLeft:"5px", paddingRight:"5px"}} align="right">Cost of Capital</TableCell>
            <TableCell className={classes.TableTitle} style={{width:"16%", paddingLeft:"5px", paddingRight:"5px"}} align="right">Target Price</TableCell>


          </TableRow>
        </TableHead>
        <TableBody>
          {(valuationsList.slice().sort(getComparator(orderDirection, orderBy))
          ).map((currValuation) => (
            <TableRow key={currValuation.companyId}>
              <TableCell align="left"  className={classes.TableRows}  >{currValuation.updated_at}</TableCell>  
              <TableCell align="left" className={classes.TableRows}  style={{fontSize: 9, width:"16%", paddingLeft:"5px", paddingRight:"5px"}}>{currValuation.shortName}</TableCell>
              <TableCell align="right" className={classes.TableRows} style={{width:"16%", paddingLeft:"5px", paddingRight:"5px"}}>{Intl.NumberFormat('en-US',{style:'decimal', minimumFractionDigits:1,maximumFractionDigits:1}).format(currValuation.equityValue)}</TableCell>
              <TableCell align="right" className={classes.TableRows} style={{width:"16%", paddingLeft:"5px", paddingRight:"5px"}}>{Intl.NumberFormat('en-US',{style:'percent', minimumFractionDigits:2}).format(currValuation.costOfCapital/100)}</TableCell>
              <TableCell align="right" className={classes.TableRows} style={{width:"16%", paddingLeft:"5px", paddingRight:"5px"}} >{Intl.NumberFormat('en-US',{style:'currency',currency:'USD'}).format(currValuation.targetStockPrice)}</TableCell>
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
              count={valuationsList.length}
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