import React, { useState }  from 'react';

import { Paper, TableContainer, Table, TableHead, TableBody, TableRow, TableCell, TableFooter, TablePagination, TableSortLabel, Button, IconButton, Tooltip } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import DeleteIcon from '@mui/icons-material/Delete';
// import PublishIcon from '@mui/icons-material/Publish';
// import PublishedWithChangesIcon from '@mui/icons-material/PublishedWithChanges';
// import UnpublishedIcon from '@mui/icons-material/Unpublished';
// import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
// import AddCircleIcon from '@mui/icons-material/AddCircle';

import { format, parseISO } from 'date-fns';

import api from '../../services/api';
import useTest from '../../hooks/useTest';
import useTableSorting from '../../hooks/useTableSorting';

import DialogModal from '../../components/modals/DialogModal';
import TablePaginationActions from '../../components/TablePaginationActions';


const useStyles = makeStyles( (mainTheme) => ({
  table:{
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
  TableTitleCurrMarketValue:{
    fontSize: 11,
    color: "white",
    backgroundColor: mainTheme.palette.tertiary .main
  },
  ButtonTable:{
    display: 'inline-block',
    padding:0,
    minHeight: 0,
    minWidth: 0,
    color: mainTheme.palette.primary.main,
    backgroundColor:"white",
    fontSize: "11px",
    textTransform:"none",
    "&:hover": {
      color:mainTheme.palette.secondary.main,
      backgroundColor:"white"
    },
  },
  grow:{
      flexGrow: 1
    },
  iconButtonStyle:{
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
  TableRows:{
    fontSize: 11
  }
}));

export default function TableMyValuationsList ({valuationsList, setValuationsList}) {
  const classes = useStyles();
  const [ page, setPage ] = useState(0);
  const [ rowsPerPage, setRowsPerPage ] = useState(12);
  const [ orderDirection, setOrderDirection ] = useState('desc');
  const [ orderBy, setOrderBy ] = useState('updated_at');
  const [ isDialogOpen, setIsDialogOpen ] = useState(false);
  const [ dialogOptions, setDialogOptions ] = useState({severity:"",title:"",message:"",buttons:{},action:""});
  const [ deleteValuationId, setDeleteValuationId ] = useState("")
  const { deleteValuation } = useTest();
  const { getComparator, handleRequestSort } = useTableSorting();

  var emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - valuationsList.length) : 0; // Avoid a layout jump when reaching the last page with empty rows.
  
  function handleDelete (valuationId){
    setDeleteValuationId(valuationId);
    setDialogOptions({severity:"warning", title:"Alert", message:"Are you sure you want to delete this valuation ?",buttons:{button1:"Cancel",button2:"Confirm"}, action:"delete"})
    setIsDialogOpen (true);
  }

  function handleDialogClose (value, action) { 
    setIsDialogOpen (false);
    setDialogOptions({severity:"",title:"",message:"",buttons:{},action:""});
    if (value === "Confirm" && action ==="delete"){  
      deleteValuation(deleteValuationId,deleteSuccessCallback, errorCallback);
      // FetchData(api.delete (`valuations/${deleteValuationId}`,{ headers : { Authorization: "martincsl",}}),deleteSuccessCallback, errorCallback)
    } 
  }

  function deleteSuccessCallback(){
    setValuationsList(valuationsList.filter(currValuation => currValuation.valuationId !== deleteValuationId));
    setDialogOptions({severity:"success", title:"Thank You", message:"Your Valuation was sucessfully deleted.",buttons:{button1:"Ok"}, action:"delete"})
    setIsDialogOpen (true);
  }

  function errorCallback(errorMessage){
    setDialogOptions({severity:"error", title:"Oops", message:errorMessage,buttons:{button1:"Ok"}})
    setIsDialogOpen (true);
  }

  const createSorthandler=(property) => (event) => {
    handleRequestSort(event, property, orderDirection, setOrderDirection, orderBy, setOrderBy);
  }

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

  return (
    <>
    <TableContainer component={Paper} >
      <Table className={classes.table} size="small" aria-label="stycky header" >
        <TableHead className={classes.TableHeader}>
          <TableRow >
            <TableCell className={classes.TableTitle} style={{width:"16%",position:"sticky", paddingRight:"0px", left:0, zIndex:2}}  align="left" key="updated_at">
              <TableSortLabel 
                active={orderBy==="updated_at"} 
                // style={{width:"46%", paddingLeft:"0px", paddingRight:"2px"}}
                direction={orderBy==="updated_at" ? orderDirection : 'desc'} 
                onClick={createSorthandler("updated_at")}
                >Date</TableSortLabel>
            </TableCell>
            <TableCell className={classes.TableTitle} style={{width:"24%", paddingLeft:"5px", paddingRight:"0px"}} align="left" key="shortName" >
              <TableSortLabel 
                active={orderBy==="shortName"} 
                // style={{width:"100px", paddingLeft:"0px", paddingRight:"2px"}}
                direction={orderBy==="shortName" ? orderDirection : 'asc'} 
                onClick={createSorthandler("shortName")}
                >Company</TableSortLabel>
            </TableCell>
              <TableCell className={classes.TableTitle} style={{width:"9%", paddingLeft:"5px", paddingRight:"5px"}} align="left">Status</TableCell>
              {/* <TableCell className={classes.TableTitle} style={{width:"7%", paddingLeft:"5px", paddingRight:"5px"}} align="right"></TableCell> */}
              <TableCell className={classes.TableTitle} style={{width:"10%", paddingLeft:"5px", paddingRight:"5px"}} align="right">Target Price</TableCell>
              <TableCell className={classes.TableTitle} style={{width:"14%", paddingLeft:"5px", paddingRight:"5px"}} align="right">Equity Value</TableCell>
              <TableCell className={classes.TableTitle} style={{width:"14%", paddingLeft:"5px", paddingRight:"5px"}} align="right">Cost of Capital</TableCell>
              <TableCell className={classes.TableTitle} style={{width:"7%", paddingLeft:"5px", paddingRight:"5px"}} align="right"></TableCell>

          </TableRow>
        </TableHead>
        
        <TableBody>
          
          {(rowsPerPage > 0 ? 
          
            valuationsList.slice().sort(getComparator(orderDirection, orderBy)).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : valuationsList
            
            ).map((currValuation) => (
            <TableRow key={currValuation.valuationId}>
              <TableCell align="left"  className={classes.TableRows}  >
                <Button onClick={(e) => (handleButton (currValuation.valuationId))} className={classes.ButtonTable} style={{fontSize:9}} disableRipple>{format(parseISO(currValuation.updated_at),"yyyy MMMM,dd")}</Button>
              </TableCell>
              <TableCell align="left" className={classes.TableRows}  style={{fontSize: 11, width:"16%", paddingLeft:"5px", paddingRight:"5px"}}>
                <Button onClick={(e) => (handleButton (currValuation.valuationId))} className={classes.ButtonTable} style={{fontSize:9}} disableRipple>{currValuation.shortName}</Button>
              </TableCell>
              <TableCell align="left" className={classes.TableRows} style={{width:"9%", paddingLeft:"5px", paddingRight:"5px"}}>
                <Button onClick={(e) => (handleButton (currValuation.valuationId))} className={classes.ButtonTable} disableRipple>{currValuation.published ? "Public": "Private"}</Button>
              </TableCell>
              {/* { ! currValuation.published ? <>
                <TableCell>
                  <Tooltip title={`Turn this this ${currValuation.shortName} Valuation public`}>
                    <IconButton className={classes.iconButtonStyle} 
                      onClick={(e) => (publicate (currValuation.valuationId))} 
                      disableRipple size="small" aria-label="delete">
                      <PublishedWithChangesIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </>:
              <>
                <TableCell>
                  <Tooltip title={`Turn this ${currValuation.shortName} Valuation private`}>
                    <IconButton className={classes.iconButtonStyle} 
                        disableRipple size="small" aria-label="delete">
                      <UnpublishedIcon fontSize="small"  />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </>} */}

              <TableCell align="right" className={classes.TableRows} style={{width:"10%", paddingLeft:"5px", paddingRight:"5px"}} >
                <Button onClick={(e) => (handleButton (currValuation.valuationId))} className={classes.ButtonTable} disableRipple>{Intl.NumberFormat('en-US',{style:'currency',currency:'USD'}).format(currValuation.targetStockPrice)}</Button>
              </TableCell>
              <TableCell align="right" className={classes.TableRows} style={{width:"14%", paddingLeft:"5px", paddingRight:"15px"}}>
                <Button onClick={(e) => (handleButton (currValuation.valuationId))} className={classes.ButtonTable} disableRipple>{Intl.NumberFormat('en-US',{style:'decimal', minimumFractionDigits:1,maximumFractionDigits:1}).format(currValuation.equityValue)}</Button>
              </TableCell>
              <TableCell align="right" className={classes.TableRows} style={{width:"16%", paddingLeft:"5px", paddingRight:"5px"}}>
                <Button onClick={(e) => (handleButton (currValuation.valuationId))} className={classes.ButtonTable} disableRipple>{Intl.NumberFormat('en-US',{style:'percent', minimumFractionDigits:2}).format(currValuation.costOfCapital/100)}</Button>
              </TableCell>  
              <TableCell>
                <Tooltip title={`Delete this ${currValuation.shortName} Valuation`}>
                  <IconButton className={classes.iconButtonStyle} onClick={(e) => (handleDelete (currValuation.valuationId))} disableRipple size="small" aria-label="delete">
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
              </TableCell>  

            </TableRow>
          ))}
          {emptyRows > 0 && (
            <TableRow style={{ height: 19.25 * emptyRows }}>
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
    <DialogModal open={isDialogOpen} onClose={handleDialogClose} severity={dialogOptions.severity} title={dialogOptions.title} buttons={dialogOptions.buttons} action={dialogOptions.action}>
      {dialogOptions.message}
    </DialogModal> 
    </>
  );
}

  // function deleteValuation (valuationId) {
  //   api.delete (`valuations/${valuationId}`,{   
  //     headers : {
  //       Authorization: "martincsl",
  //     }
  //   })
  //   .then (response => {
  //     const deletedId = response.data;
  //     setValuationsList(valuationsList.filter(currValuation => currValuation.valuationId !== valuationId));

  //   }).catch (function (err){
  //     if (err.response) {
  //       const errorMsg = Object.values(err.response.data);
  //       alert("Warning - Database access error" + errorMsg)
  //     } else if (err.request) {
  //         alert("Warning - Server access error")
  //       } else {
  //           alert("Warning - Unexpected error")
  //         }
  //   }).finally (() => {
  //       setDialogOptions({severity:"success", title:"Thank You", message:"Your Valuation was deleted with success",buttons:{button1:"Ok"}})
  //       setIsDialogOpen (true);
  //   });
  // }

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