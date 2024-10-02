import React, {useContext, useState, useEffect} from 'react';
import { useHistory } from 'react-router-dom';
import format from 'date-fns/format';
import parseISO from 'date-fns/parseISO';

import { Paper, TableContainer, Table, TableHead, TableBody, TableRow, TableCell, TableFooter, TablePagination, TableSortLabel, Button, IconButton, Tooltip, Typography, Snackbar, SnackbarContent } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import DeleteIcon from '@mui/icons-material/Delete';
import UpdateIcon from '@mui/icons-material/Update';
import PaidIcon from '@mui/icons-material/Paid';

import api from '../../services/api';
import { LoginContext } from '../../helpers/Context';
import useAxios from '../../hooks/useAxios';
import useTableSorting from '../../hooks/useTableSorting';
import useFetch from '../../hooks/useFetch';
import TablePaginationActions from '../../components/TablePaginationActions';

import DialogModal from '../../components/DialogModal';
import Header from '../../components/Header'

import FormEditTransaction from './FormEditTransaction';

const useStyles = makeStyles( () => ({
  table:{
    minWidth: 370,
    maxHeight: 900
  },
  TableHeader:{
    color: "white",
    backgroundColor: '#344955'
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
    color: '#344955',
    backgroundColor:"white",
    fontSize: "9px",
    textTransform:"none",
    "&:hover": {
      color:'#344955',
      backgroundColor:"white"
    },
  },
  grow:{
      flexGrow: 1
    },
  iconButtonStyle:{
    color: '#344955',
    backgroundColor:"#E1C16E",
    
    // fontSize: "11px",
    // [mainTheme.breakpoints.down('xs')]: {
    //   fontSize: "10px"
    // },
    // backgroundColor: "whitesmoke",//mainTheme.palette.secondary.main,
    textTransform: "none",
    marginTop: "2px",
    marginLeft:"2px",
    "&:hover": {
      backgroundColor: "#437a9f" //"#F49506ed"
    },
  },
  TableRows:{
    fontSize: 12
  },
  greenSnackbarContent: {
    backgroundColor: "#228B22"
  },
}));

export default function TableProject({id, transactions,setTransactions, isEdit, setIsEdit,isDelete, setIsDelete}){
  const classes = useStyles();
  // const { deletionId, setDeletionId, updateId, setUpdateId}= useContext(LoginContext);
  const [ deletionId, setDeletionId ] = useState("")
  const [ page, setPage ] = useState(0);
  const [ rowsPerPage, setRowsPerPage ] = useState(20);
  const [ orderDirection, setOrderDirection ] = useState('desc');
  const [ orderBy, setOrderBy ] = useState('fechaFactura');
  const [ dialogOptions, setDialogOptions ] = useState({severity:"",title:"",message:"",buttons:{}, action:""});
  const [ isDialogOpen, setIsDialogOpen ] = useState(false);
  const [ isSnackbarOpen, setIsSnackbarOpen]=useState(false);
  const [ isEditTable, setIsEditTable] = useState(false); 
  // const [ isDelete, setIsDelete] = useState(false); 
  const [ editMode, setEditMode ]=useState("");
  const [ isEditTransaction, setIsEditTransaction] = useState(false); 
  const [ transaccionEditar, setTransaccionEditar] = useState(null);
  const [ snackbarMessage, setSnackbarMessage]=useState("");
  const [ transactionDeleteId,setTransactionDeleteId ] = useState("");
  const { axiosFetch: getProject, isLoading: isLoadingProject, error: isErrorProject } = useAxios();
  const { axiosFetch: delTransaction, isLoading: isLoadingDeletion, error: isErrorDeletion } = useAxios();
  // const { handleDeleteTransaction }  = useFetch({setEditMode});
  const { getComparator, handleRequestSort } = useTableSorting();
  var emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - transactions.length) : 0; // Avoid a layout jump when reaching the last page with empty rows.
  const history = useHistory();
  

  const handleUpdate=(param)=>{
    // setUpdateId(param)
    console.log("parametro recibido por handleUpdate: ")
    console.log(param)
    setTransaccionEditar(param)
    setIsEditTransaction(true)
  }

  const handleEditTransaction=(param)=>{
    setIsEditTransaction(true);
  }

  const handleEditTransactionClose=()=>{
    setIsEditTransaction(false);
  }

const handleSnackbarClose=()=>{
  // setIsDelete(true);
  setIsSnackbarOpen(false)
  getProject({ axiosInstance: api, method: 'GET', url: `/transacciones/${id}`, requestConfig: { headers: {'Authorization': "martincsl@hotmail.com",},}},getProjectSuccessCb, getProjectErrorCb);
}

 const deleteTransactionSuccessCb=(apiData)=>{
  if (apiData){
    const updatedTransactions = transactions.filter(
      (transaction) => transaction.idTransaccion !== deletionId
    );
    setTransactions(updatedTransactions);
    // actulizar es state the transactions con deletionId
    setSnackbarMessage("Transaccion eliminada con exito")
    setIsSnackbarOpen(true)
  }
 }

  const deleteTransactionErrorCb=()=>{
    alert("Transaccion no pudo ser eliminada, favor intentar mas tarde")
  }

  function deleteTransaction(){
    // alert("Llama delTransaction")
    delTransaction({ axiosInstance: api, method: 'DELETE', url: `/transacciones/${deletionId}`, requestConfig: { headers: {'Authorization': "martincsl@hotmail.com",},}},deleteTransactionSuccessCb, deleteTransactionErrorCb);
  }

  const handleDialogClose=(value, action)=>{
    setIsDialogOpen(false);
    if (value==="Si"){
      // setIsDelete(true)
      // handleDeleteTransaction(deletionId)
      deleteTransaction(deletionId)
      // deleteTransactionTest(transactionDeleteId)
    }
  }

  function handleDelete(param){
    setDeletionId(param)
    setDialogOptions({severity:"warning", title:"Alerta", message:"Confirma eliminación de la factura?",buttons:{button1:"No",button2:"Si"}, action:"delete"})
    setIsDialogOpen(true);

  }

  function convertTimestampToDate(timestamp) {
    const seconds = timestamp / 1000; // Convert milliseconds to seconds
    const date = new Date(seconds * 1000); // Create a Date object from seconds
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
  
    return `${day}/${month}/${year}`;
  }

  function formatDateToDDMMYY(numericDate) {
  // Check for valid timestamp (optional)
  let parsedDate;
  try {
    parsedDate = parseISO(numericDate.toString()); // Ensure it's a string
  } catch (error) {
    return <div>Invalid date format</div>;
  }

  const formattedDate = format(parsedDate, 'dd/MM/yy');
  return formattedDate
  }

  function convertToDateString(milliseconds) {
    const date = new Date(milliseconds*1000);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }

  function formatDate(isoDate) {
    const date = new Date(isoDate);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2,  '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }  

  function convertDate(numericDate){
    var date = new Date(numericDate * 1000);
    // return date.toUTCString()
    return format(date,"dd/mm/yy")
  }

  // const formatAmount=(value)={
  //   const amount = Intl.NumberFormat('en-US',{style:'decimal', minimumFractionDigits:0,maximumFractionDigits:0}).format(value)
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
    // alert ("Transaccion "+ id);
  };

  const getProjectSuccessCb=(apiData)=>{
    if(apiData){
      // alert("getProjectSuccessCb-setTransactions(apiData)")
      setTransactions(apiData);
    }
  }

  const getProjectErrorCb=()=>{
    // alert("Hubo un error en el servidor. No fue posible cargar las transacciones del proyecto")
    // setSnackbarMessage("Hubo un error en el servidor. No fue posible cargar las transacciones del proyecto");
    // setIsSnackbarOpen(true);
  }

  useEffect(() => {
    if (transactions[0].idProyecto) {
      getProject({ axiosInstance: api, method: 'GET', url: `/transacciones/${transactions[0].idProyecto}`, requestConfig: { headers: {'Authorization': "martincsl@hotmail.com",},}},getProjectSuccessCb, getProjectErrorCb);
    } 
  }, []);

  return (
    <>

    {/* <Header/> */}
    { transactions ? <>
      {/* {alert("renderizacion de tableProject")} */}
      {transaccionEditar? console.log("transaccionEditar: "+ transaccionEditar.idTransaccion + " " + transaccionEditar.numeroFactura + " " + transaccionEditar.montoFactura): null}
      {console.log("tableProject: transactions")}
      {console.log(transactions)}
      {/* {console.log(transaccionEditar)} */}
    
     
    <TableContainer component={Paper} >
      <Table className={classes.table} size="small" aria-label="stycky header" >

        <TableHead className={classes.TableHeader}>
          <TableRow >
          {/* width:"16%" */}
            <TableCell className={classes.TableTitle} style={{width:"10%",position:"sticky", paddingRight:"0px", left:0, zIndex:2}}  align="left" key="fechaFactura">
              Fecha
              {/* <TableSortLabel 
                active={orderBy==="fechaFactura"} 
                // style={{width:"46%", paddingLeft:"0px", paddingRight:"2px"}}
                direction={orderBy==="fechaFactura" ? orderDirection : 'desc'} 
                onClick={createSorthandler("fechaFactura")}
                >Fecha</TableSortLabel> */}
            </TableCell>
            <TableCell className={classes.TableTitle} style={{width:"10%", paddingLeft:"5px", paddingRight:"0px"}} align="left" key="numeroFactura" >
              Factura
              {/* <TableSortLabel 
                active={orderBy==="numeroFactura"} 
                // style={{width:"100px", paddingLeft:"0px", paddingRight:"2px"}}
                direction={orderBy==="numeroFactura" ? orderDirection : 'asc'} 
                onClick={createSorthandler("numeroFactura")}
                >Factura</TableSortLabel> */}
            </TableCell>
             <TableCell className={classes.TableTitle} style={{width:"7%", paddingLeft:"5px", paddingRight:"5px"}} align="left">
                Rubro</TableCell>
              <TableCell className={classes.TableTitle} style={{width:"12%", paddingLeft:"5px", paddingRight:"5px"}} align="left">
                Proveedor</TableCell>
              {/* <TableCell className={classes.TableTitle} style={{width:"7%", paddingLeft:"5px", paddingRight:"5px"}} align="right"></TableCell> */}
              <TableCell className={classes.TableTitle} style={{width:"27%", paddingLeft:"5px", paddingRight:"5px"}} align="left">
                Descripcion</TableCell>
              {/* width:"14%" */}
              <TableCell className={classes.TableTitle} style={{width:"6%", paddingLeft:"5px", paddingRight:"5px"}} align="right">
                Ingresos</TableCell>
              {/* width:"14%" */}
              <TableCell className={classes.TableTitle} style={{width:"6%", paddingLeft:"5px", paddingRight:"5px"}} align="right">
                Egresos</TableCell>
              <TableCell className={classes.TableTitle} style={{width:"15%", paddingLeft:"5px", paddingRight:"5px"}} align="right">
                Pago</TableCell>
              <TableCell className={classes.TableTitle} style={{width:"7%", paddingLeft:"5px", paddingRight:"5px"}} align="right">
                Comprob.</TableCell>
              <TableCell></TableCell>  
              <TableCell></TableCell>  
          </TableRow>
        </TableHead>

        <TableBody>
          {(rowsPerPage > 0 ? 
            transactions.slice().sort(getComparator(orderDirection, orderBy)).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : transactions
            ).map((transactions) => (<>
            
              {/* {console.log( (convertDate(transactions.fechaFactura)))} */}
              <TableRow key={transactions.valuationId}>
                <TableCell align="left"  className={classes.TableRows}  >
                  {/* <Button onClick={(e) => (handleButton (transactions.fechaFactura))} className={classes.ButtonTable} style={{fontSize:11}} disableRipple></Button> */}
                  {/* <Button onClick={(e) => (handleButton (transactions.valuationId))} className={classes.ButtonTable} style={{fontSize:9}} disableRipple>{transactions.updated_at}</Button> */}
                  <Typography style={{fontSize:"11px"}}>{transactions.fechafactura}</Typography>
                  {/* {transactions.fechaFactura} */}
                  {/* <Typography style={{fontSize:11}}>{convertToDateString(transactions.fechaFactura)}</Typography> */}

                </TableCell>
                <TableCell align="left" className={classes.TableRows}  style={{fontSize: 11, width:"16%", paddingLeft:"5px", paddingRight:"5px"}}>
                  {/* <Button onClick={(e) => (handleButton (transactions.valuationId))} className={classes.ButtonTable} style={{fontSize:9}} disableRipple>{transactions.shortName}</Button> */}
                  {/* <Button onClick={(e) => (handleSavedValuation (transactions.valuationId))} className={classes.ButtonTable} style={{fontSize:9}} disableRipple>{transactions.shortName}</Button> */}
                  {/* <Button  className={classes.ButtonTable} style={{fontSize:12}} disableRipple>{transactions.numeroFactura}</Button> */}
                  <Typography style={{fontSize:12}}>{transactions.numeroFactura}</Typography>
                </TableCell>

                <TableCell align="left" className={classes.TableRows} style={{width:"16%", paddingLeft:"5px", paddingRight:"5px"}}>
                  <Button  className={classes.ButtonTable} disableRipple>{transactions.rubro}</Button>
                </TableCell>  

                <TableCell align="left" className={classes.TableRows} style={{width:"9%", paddingLeft:"5px", paddingRight:"5px"}}>
                  {/* <Button onClick={(e) => (handeButton (transactions.valuationId))} className={classes.ButtonTable} disableRipple>{transactions.published ? "Public": "Private"}</Button> */}
                  {/* <Button className={classes.ButtonTable} disableRipple>{transactions.idProveedor}</Button> */}
                  <Typography style={{fontSize:"10px"}}>{transactions.proveedor}</Typography>
                </TableCell>
                <TableCell align="left" className={classes.TableRows} style={{width:"10%", paddingLeft:"5px", paddingRight:"5px"}} >
                  {/* <Button className={classes.ButtonTable} disableRipple>{Intl.NumberFormat('en-US',{style:'decimal', minimumFractionDigits:0,maximumFractionDigits:0}).format(transactions.descripcion)}</Button> */}
                  <Typography style={{fontSize:"9px"}}>{transactions.descripcion}</Typography>
                </TableCell>
                <TableCell align="right" className={classes.TableRows} style={{width:"14%", paddingLeft:"5px", paddingRight:"5px"}}>
                  {/* <Button className={classes.ButtonTable} disableRipple>{Intl.NumberFormat('en-US',{style:'decimal', minimumFractionDigits:0,maximumFractionDigits:0}).format(transactions.montoFactura)}</Button> */}
                  {/* <Typography style={{fontSize:"11px"}}>{Intl.NumberFormat('en-US',{style:'decimal', minimumFractionDigits:0,maximumFractionDigits:0}).format(transactions.montoFactura)}</Typography> */}
                  <Typography style={{fontSize:"11px"}}>{transactions.idTipoFlujo==="0"?Intl.NumberFormat('es-PY',{style:'decimal', minimumFractionDigits:0,maximumFractionDigits:0}).format(transactions.montoFactura):""}</Typography>

                </TableCell>
                <TableCell align="right" className={classes.TableRows} style={{width:"14%", paddingLeft:"5px", paddingRight:"5px"}}>
                  {/* <Button className={classes.ButtonTable} disableRipple>{Intl.NumberFormat('en-US',{style:'decimal', minimumFractionDigits:0,maximumFractionDigits:0}).format(transactions.montoFactura)}</Button> */}
                  {/* <Typography style={{fontSize:"11px"}}>{Intl.NumberFormat('en-US',{style:'decimal', minimumFractionDigits:0,maximumFractionDigits:0}).format(transactions.montoFactura)}</Typography> */}
                  <Typography style={{fontSize:"11px"}}>{transactions.idTipoFlujo==="1"?Intl.NumberFormat('es-PY',{style:'decimal', minimumFractionDigits:0,maximumFractionDigits:0}).format(transactions.montoFactura):""}</Typography>
                </TableCell>
                <TableCell align="right" className={classes.TableRows} style={{width:"16%", paddingLeft:"5px", paddingRight:"5px"}}>
                  {/* <Button  className={classes.ButtonTable} disableRipple>{Intl.NumberFormat('en-US',{style:'decimal', minimumFractionDigits:0,maximumFractionDigits:0}).format(transactions.fechaPago)}</Button> */}
                  <Typography style={{fontSize:"11px"}}>{transactions.fechapago}</Typography>
                  {/* {transactions.fechaPago} */}
                  {/* <Typography style={{fontSize:11}}>{convertToDateString(transactions.fechaPago)}</Typography> */}
                </TableCell>  
                <TableCell align="right" className={classes.TableRows} style={{width:"16%", paddingLeft:"5px", paddingRight:"5px"}}>
                  {/* <Button  className={classes.ButtonTable} disableRipple>{Intl.NumberFormat('en-US',{style:'decimal', minimumFractionDigits:0,maximumFractionDigits:0}).format(transactions.fechaPago)}</Button> */}
                  <Typography style={{fontSize:"11px"}}>{transactions.comprobantePago}</Typography>
                </TableCell>  
                <TableCell>
                  <Tooltip title={`Eliminar datos de la factura ${transactions.numeroFactura?transactions.numeroFactura:""}`}    >  
                    <IconButton className={classes.iconButtonStyle} onClick={()=> handleDelete(transactions.idTransaccion)} disableRipple size="small" aria-label="delete">
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                </TableCell>  
                <TableCell>
                  <Tooltip title={`Corregir datos de la factura ${transactions.numeroFactura?transactions.numeroFactura:""}`}>
                    <IconButton className={classes.iconButtonStyle} onClick={()=> handleUpdate(transactions)} disableRipple size="small" aria-label="delete">
                      <UpdateIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                </TableCell>  
             
              </TableRow>
              </>
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
              count={transactions.length}
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
    <FormEditTransaction 
      open={isEditTransaction}
      onClose={handleEditTransactionClose}
      transaccionEditar={transaccionEditar}
      isEditTable={isEditTable}
      setIsEditTable={setIsEditTable}
    />
    <DialogModal open={isDialogOpen} onClose={handleDialogClose} severity={dialogOptions.severity} title={dialogOptions.title} buttons={dialogOptions.buttons} action={dialogOptions.action}>
      {dialogOptions.message}
    </DialogModal> 
    <Snackbar
      open={isSnackbarOpen}
      autoHideDuration={3000} 
      onClose={()=>handleSnackbarClose()}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
      >
      <SnackbarContent
        className={classes.greenSnackbarContent}
        message={snackbarMessage}
      />
    </Snackbar>  
    </>: null}
    
    </>
  )
}