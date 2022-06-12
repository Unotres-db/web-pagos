import React, { useState }  from 'react';

import { Paper, Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TableFooter, TablePagination, TableSortLabel, Button, IconButton, Tooltip } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import DeleteIcon from '@mui/icons-material/Delete';
import PublishIcon from '@mui/icons-material/Publish';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import AddCircleIcon from '@mui/icons-material/AddCircle';


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
    fontSize: "11px",
    textTransform:"none",
    "&:hover": {
      color:mainTheme.palette.secondary.main,
      backgroundColor:"whitesmoke"
    },
  },
  buttonStyle: {
    color: mainTheme.palette.primary.main,
    fontSize: "11px",
    height:"20px",
    width:"60px",
    [mainTheme.breakpoints.down('xs')]: {
      fontSize: "10px"
    },
    backgroundColor: mainTheme.palette.secondary.main,
    textTransform: "none",
    marginTop: "2px",
    marginLeft:"2px",
    "&:hover": {
      backgroundColor: "#F49506ed"
    },
    grow:{
      flexGrow: 1
    },
  },
  iconButtonStyle: {
    color: mainTheme.palette.primary.main,
    // fontSize: "11px",
    // [mainTheme.breakpoints.down('xs')]: {
    //   fontSize: "10px"
    // },
    backgroundColor: mainTheme.palette.secondary.main,
    textTransform: "none",
    marginTop: "2px",
    marginLeft:"2px",
    "&:hover": {
      backgroundColor: "#F49506ed"
    },
  },
  TableRows : {
    fontSize: 11
  }
}));

function descendingComparator(a, b, orderBy) {
  if (typeof a[orderBy] === 'string' || a instanceof String ) {
    // console.log("entrou com Lowercase Test")
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
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

export default function TableMyValuationsList ({valuationsList}) {
  const classes = useStyles();
  const [ page, setPage ] = useState(0);
  const [ rowsPerPage, setRowsPerPage ] = useState(12);
  const [ orderDirection, setOrderDirection ] = useState('desc');
  const [ orderBy, setOrderBy ] = useState('updated_at');

  const handleRequestSort = (event, property) => {
    const isAscending = (orderBy === property && orderDirection === 'asc');
    setOrderDirection(isAscending ? 'desc' : 'asc');
    setOrderBy(property);
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

  const handleButton = (id) => {
    alert ("Button was clicked "+ id);
  };

  const dataRows = [
    { id: 0,
      rowText:"Date",
      rowMobileText:"Date",
      isGrayBackground:false,
      isShowAsBlankIfZero:false,  
      isTableSortColumn: true,
      style:"string",
      dataField: "updated_at"},
    { id: 1,
      rowText:"Cost of Revenue",
      rowMobileText:"Cost",
      grayBackground:false,
      showAsBlankIfZero:true,  
      style:"decimal",
      dataField: "costOfRevenue"}  
    ]

  return (
    <TableContainer component={Paper} >
      <Table className={classes.table} size="small" aria-label="stycky header" >
        <TableHead className={classes.TableHeader}>
          <TableRow >
            <TableCell className={classes.TableTitle} style={{width:"18%",position:"sticky", left:0, zIndex:2}}  align="left" key="updated_at">
              <TableSortLabel 
                active={orderBy==="updated_at"} 
                // style={{width:"46%", paddingLeft:"0px", paddingRight:"2px"}}
                direction={orderBy==="updated_at" ? orderDirection : 'desc'} 
                onClick={createSorthandler("updated_at")}
                >Valuation Date</TableSortLabel>
            </TableCell>
            <TableCell className={classes.TableTitle} style={{width:"24%", paddingLeft:"5px", paddingRight:"0px"}} align="left" key="shortName" >
              <TableSortLabel 
                active={orderBy==="shortName"} 
                // style={{width:"100px", paddingLeft:"0px", paddingRight:"2px"}}
                direction={orderBy==="shortName" ? orderDirection : 'asc'} 
                onClick={createSorthandler("shortName")}
                >Company</TableSortLabel>
            </TableCell>
      
            {/* <Tooltip title="Free Cash Flow to the Firm average growth in the discrete period">
              <TableCell className={classes.TableTitle} style={{width:"16%", paddingLeft:"5px", paddingRight:"5px"}} align="right">FCFF Avg. Growth</TableCell>
            </Tooltip> */}
              <TableCell className={classes.TableTitle} style={{width:"12%", paddingLeft:"5px", paddingRight:"5px"}} align="left">Status</TableCell>
              <TableCell className={classes.TableTitle} style={{width:"12%", paddingLeft:"5px", paddingRight:"5px"}} align="right">Target Price</TableCell>
              <TableCell className={classes.TableTitle} style={{width:"14%", paddingLeft:"5px", paddingRight:"15px"}} align="right">Equity Value ($ b)</TableCell>
              <TableCell className={classes.TableTitle} style={{width:"14%", paddingLeft:"5px", paddingRight:"5px"}} align="right">Cost of Capital</TableCell>
              {/* <TableCell className={classes.TableTitle} style={{width:"16%", paddingLeft:"20px", paddingRight:"20px"}} align="center">Actions</TableCell> */}

          </TableRow>
        </TableHead>
        
        <TableBody>
          
          {(rowsPerPage > 0 ? 
          
            valuationsList.slice().sort(getComparator(orderDirection, orderBy)).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : valuationsList
          ).map((currValuation) => (
            <TableRow key={currValuation.valuationId}>
              <TableCell align="left"  className={classes.TableRows}  >
                <Button onClick={(e) => (handleButton (currValuation.valuationId))} className={classes.ButtonTable} style={{fontSize:9}} disableRipple>{currValuation.updated_at}</Button>
              </TableCell>
              <TableCell align="left" className={classes.TableRows}  style={{fontSize: 11, width:"16%", paddingLeft:"5px", paddingRight:"5px"}}>
                <Button onClick={(e) => (handleButton (currValuation.valuationId))} className={classes.ButtonTable} style={{fontSize:9}} disableRipple>{currValuation.shortName}</Button>
              </TableCell>
              <TableCell align="left" className={classes.TableRows} style={{width:"12%", paddingLeft:"5px", paddingRight:"5px"}}>
                {/* <Button onClick={(e) => (handleButton (currValuation.valuationId))} className={classes.ButtonTable} disableRipple>{Intl.NumberFormat('en-US',{style:'percent', minimumFractionDigits:2}).format(currValuation.cashFlowAvgGrowth/100)}</Button> */}
                <Button onClick={(e) => (handleButton (currValuation.valuationId))} className={classes.ButtonTable} disableRipple>{currValuation.published ? "Public": "Private"}</Button>
              </TableCell>
              <TableCell align="right" className={classes.TableRows} style={{width:"12%", paddingLeft:"5px", paddingRight:"5px"}} >
                <Button onClick={(e) => (handleButton (currValuation.valuationId))} className={classes.ButtonTable} disableRipple>{Intl.NumberFormat('en-US',{style:'currency',currency:'USD'}).format(currValuation.targetStockPrice)}</Button>
              </TableCell>
              <TableCell align="right" className={classes.TableRows} style={{width:"14%", paddingLeft:"5px", paddingRight:"15px"}}>
                <Button onClick={(e) => (handleButton (currValuation.valuationId))} className={classes.ButtonTable} disableRipple>{Intl.NumberFormat('en-US',{style:'decimal', minimumFractionDigits:1,maximumFractionDigits:1}).format(currValuation.equityValue)}</Button>
              </TableCell>
              <TableCell align="right" className={classes.TableRows} style={{width:"16%", paddingLeft:"5px", paddingRight:"5px"}}>
                <Button onClick={(e) => (handleButton (currValuation.valuationId))} className={classes.ButtonTable} disableRipple>{Intl.NumberFormat('en-US',{style:'percent', minimumFractionDigits:2}).format(currValuation.costOfCapital/100)}</Button>
              </TableCell>   
              {/* <TableCell align="right" className={classes.TableRows} style={{width:"16%", paddingLeft:"5px", paddingRight:"5px"}}> 
                <Button disableRipple fullWidth="false" className = {classes.buttonStyle}  startIcon={<DeleteIcon />} >Delete</Button>
              </TableCell> */}
              {/* <Box className={classes.grow} style={{justifyContent:"right"}}>
                <Tooltip title={`Publish this ${currValuation.shortName} Valuation`}>
                  <IconButton className={classes.iconButtonStyle} disabled={currValuation.published} size="small" aria-label="delete">
                    <PublishIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
                <Tooltip title={`Print this ${currValuation.shortName} Valuation`}>
                  <IconButton className={classes.iconButtonStyle}  size="small" aria-label="delete">
                    <PictureAsPdfIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
                <Tooltip title={`Delete this ${currValuation.shortName} Valuation`}>
                  <IconButton className={classes.iconButtonStyle}  size="small" aria-label="delete">
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
                <Tooltip title={`Create another ${currValuation.shortName} Valuation`}>
                  <IconButton className={classes.iconButtonStyle} edge="end" size="small" aria-label="delete">
                    <AddCircleIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
              </Box> */}
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