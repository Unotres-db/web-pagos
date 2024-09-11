import React, { useState }  from 'react';
import { useHistory } from 'react-router-dom';

import { Paper, TableContainer, Table, TableHead, TableBody, TableRow, TableCell, TableFooter, TablePagination, TableSortLabel, Button, IconButton, Tooltip } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import PublishIcon from '@mui/icons-material/Publish';
import DeleteIcon from '@mui/icons-material/Delete';

import { format, parseISO } from 'date-fns';

// import valuationsWebApi from '../../services/valuationsWebApi';
// import useAxios from '../../hooks/useAxios';
import useTableSorting from '../../hooks/useTableSorting';
// import useFetch from '../../hooks/useFetch';

import DialogModal from '../../components/modals/DialogModal';
import TablePaginationActions from '../../components/TablePaginationActions';

const useStyles = makeStyles( (mainTheme) => ({
  table:{
    minWidth: 370,
    maxHeight: 900
  },
  TableHeader:{
    color: "white",
    backgroundColor:'#344955', 
  },
  TableTitle:{
    color: "white",
    fontSize: 13
  },
  ButtonTable:{
    display: 'inline-block',
    padding:0,
    minHeight: 0,
    minWidth: 0,
    color:'#344955',
    backgroundColor:"white",
    fontSize: "12px",
    textTransform:"none",
    "&:hover": {
      color:'#344955',
      backgroundColor:"light gray"
    },
  },
  grow:{
      flexGrow: 1
    },
  iconButtonStyle:{
    color: '#344955',
    // fontSize: "11px",
    // [mainTheme.breakpoints.down('xs')]: {
    //   fontSize: "10px"
    // },
    backgroundColor: "whitesmoke",//mainTheme.palette.secondary.main,
    textTransform: "none",
    marginTop: "2px",
    marginLeft:"2px",
    "&:hover": {
      backgroundColor: "#437a9f" //"#F49506ed"
    },
  },
  TableRows:{
    fontSize: 12
  }
}));

export default function TableMyValuationsList ({valuationsList, setValuationsList}) {
  const classes = useStyles();
  const [ page, setPage ] = useState(0);
  const [ rowsPerPage, setRowsPerPage ] = useState(10);
  const [ orderDirection, setOrderDirection ] = useState('desc');
  const [ orderBy, setOrderBy ] = useState('updated_at');
  // const { handlePublish, handleDelete, handleDialogClose, dialogOptions, isDialogOpen}  = useFetch({valuationsList, setValuationsList});
  const { getComparator, handleRequestSort } = useTableSorting();
  var emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - valuationsList.length) : 0; // Avoid a layout jump when reaching the last page with empty rows.
  const history = useHistory();

  // function handleSavedValuation (valuationId) {
  //   history.push(`/saved-valuation/${valuationId}`)
  // }

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
    if (id==="VDB"){
      history.push(`/project/${id}`)
      // history.push(`/products/${productId}`)
    } else {
      alert ("Transacciones del proyecto todavia no cargadas: "+id);
    }
  };

  return (
    
    <>
    { console.log(valuationsList)}
    <TableContainer component={Paper} >
      <Table className={classes.table} size="small" aria-label="stycky header" >

        <TableHead className={classes.TableHeader}>
          <TableRow >
          {/* width:"16%" */}
            {/* <TableCell className={classes.TableTitle} style={{width:"10%",position:"sticky", paddingRight:"0px", left:0, zIndex:2}}  align="left" key="updated_at">
                Fecha
            </TableCell> */}
            <TableCell className={classes.TableTitle} style={{width:"30%", paddingLeft:"5px", paddingRight:"0px"}} align="left" key="shortName" >
              <TableSortLabel 
                active={orderBy==="shortName"} 
                // style={{width:"100px", paddingLeft:"0px", paddingRight:"2px"}}
                direction={orderBy==="shortName" ? orderDirection : 'asc'} 
                onClick={createSorthandler("shortName")}
                >Proyecto</TableSortLabel>
            </TableCell>
              <TableCell className={classes.TableTitle} style={{width:"12%", paddingLeft:"5px", paddingRight:"5px"}} align="left">Status</TableCell>
              {/* <TableCell className={classes.TableTitle} style={{width:"7%", paddingLeft:"5px", paddingRight:"5px"}} align="right"></TableCell> */}
              <TableCell className={classes.TableTitle} style={{width:"10%", paddingLeft:"5px", paddingRight:"5px"}} align="right">Presupuesto</TableCell>
              {/* width:"14%" */}
              <TableCell className={classes.TableTitle} style={{width:"10%", paddingLeft:"5px", paddingRight:"5px"}} align="right">Ingresos</TableCell>
              {/* width:"14%" */}
              <TableCell className={classes.TableTitle} style={{width:"10%", paddingLeft:"5px", paddingRight:"5px"}} align="right">Egresos</TableCell>
              <TableCell className={classes.TableTitle} style={{width:"14%", paddingLeft:"5px", paddingRight:"5px"}} align="right">Saldo</TableCell>
              {/* <TableCell className={classes.TableTitle} style={{width:"7%", paddingLeft:"5px", paddingRight:"5px"}} align="right"></TableCell>
              <TableCell className={classes.TableTitle} style={{width:"7%", paddingLeft:"5px", paddingRight:"5px"}} align="right"></TableCell> */}

          </TableRow>
        </TableHead>

        <TableBody>
          {(rowsPerPage > 0 ? 
            valuationsList.slice().sort(getComparator(orderDirection, orderBy)).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : valuationsList
            ).map((currValuation) => (
              <TableRow key={currValuation.valuationId}>
                {/* <TableCell align="left"  className={classes.TableRows}  >
                  <Button onClick={(e) => (handleButton (currValuation.projectId))} className={classes.ButtonTable} style={{fontSize:12}} disableRipple></Button>

                </TableCell> */}
                <TableCell align="left" className={classes.TableRows}  style={{fontSize: 11, width:"16%", paddingLeft:"5px", paddingRight:"5px"}}>
                  {/* <Button onClick={(e) => (handleButton (currValuation.valuationId))} className={classes.ButtonTable} style={{fontSize:9}} disableRipple>{currValuation.shortName}</Button> */}
                  {/* <Button onClick={(e) => (handleSavedValuation (currValuation.valuationId))} className={classes.ButtonTable} style={{fontSize:9}} disableRipple>{currValuation.shortName}</Button> */}
                  <Button  className={classes.ButtonTable} style={{fontSize:12}} disableRipple>{currValuation.projectName}</Button>

                </TableCell>
                <TableCell align="left" className={classes.TableRows} style={{width:"9%", paddingLeft:"5px", paddingRight:"5px"}}>
                  {/* <Button onClick={(e) => (handeButton (currValuation.valuationId))} className={classes.ButtonTable} disableRipple>{currValuation.published ? "Public": "Private"}</Button> */}
                  <Button className={classes.ButtonTable} style={{fontSize:"9px"}}disableRipple>{currValuation.projectStatus}</Button>

                </TableCell>
                <TableCell align="right" className={classes.TableRows} style={{width:"10%", paddingLeft:"5px", paddingRight:"5px"}} >
                  <Button onClick={(e) => (handleButton (currValuation.projectId))} className={classes.ButtonTable} disableRipple>{Intl.NumberFormat('en-US',{style:'decimal', minimumFractionDigits:0,maximumFractionDigits:0}).format(currValuation.projectBudget)}</Button>
                </TableCell>
                <TableCell align="right" className={classes.TableRows} style={{width:"14%", paddingLeft:"5px", paddingRight:"5px"}}>
                  <Button onClick={(e) => (handleButton (currValuation.projectId))} className={classes.ButtonTable} disableRipple>{Intl.NumberFormat('en-US',{style:'decimal', minimumFractionDigits:0,maximumFractionDigits:0}).format(currValuation.projectRevenue)}</Button>
                </TableCell>
                <TableCell align="right" className={classes.TableRows} style={{width:"14%", paddingLeft:"5px", paddingRight:"5px"}}>
                  <Button onClick={(e) => (handleButton (currValuation.projectId))} className={classes.ButtonTable} disableRipple>{Intl.NumberFormat('en-US',{style:'decimal', minimumFractionDigits:0,maximumFractionDigits:0}).format(currValuation.projectCost)}</Button>
                </TableCell>
                <TableCell align="right" className={classes.TableRows} style={{width:"16%", paddingLeft:"5px", paddingRight:"5px"}}>
                  <Button onClick={(e) => (handleButton (currValuation.projectId))} className={classes.ButtonTable} disableRipple>{Intl.NumberFormat('en-US',{style:'decimal', minimumFractionDigits:0,maximumFractionDigits:0}).format(currValuation.projectRevenue-currValuation.projectCost)}</Button>
                </TableCell>  
                {/* <TableCell>
                 
                    <Tooltip title="Exportar a Excel">
                    <IconButton className={classes.iconButtonStyle}  disableRipple size="small" aria-label="delete">
                      <PublishIcon fontSize="small" />
                    </IconButton>
                    </Tooltip>
                 
                </TableCell>   */}
                {/* <TableCell>
                  
                    <IconButton className={classes.iconButtonStyle}  disableRipple size="small" aria-label="delete">
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                
                </TableCell>   */}
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
    {/* <DialogModal open={isDialogOpen} onClose={handleDialogClose} severity={dialogOptions.severity} title={dialogOptions.title} buttons={dialogOptions.buttons} action={dialogOptions.action}>
      {dialogOptions.message}
    </DialogModal>  */}
  </>

  );
}