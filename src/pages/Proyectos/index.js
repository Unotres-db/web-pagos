import React, { useContext, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useHistory } from 'react-router-dom';

import { Stack, Grid, Paper, Box, Button, TableContainer, Table, TableHead, TableBody, TableRow, TableCell,Snackbar, SnackbarContent, useTheme, useMediaQuery, Typography, CircularProgress } from '@mui/material';
import { makeStyles } from '@material-ui/core/styles';
import AddCircleIcon from '@mui/icons-material/AddCircle';


import api from '../../services/api';
import { LoginContext } from '../../helpers/Context';
import useAxios from '../../hooks/useAxios';

import Header from '../../components/Header';
import SuppliersAutocomplete from '../../components/SuppliersAutocomplete';
import SuppliersListByProject from '../../components/SuppliersListByProject';
import TypesListByProjecy from '../../components/TypesListByProject';
import TableProject from './TableProject';
import FormInc from './FormInc';
import FormAddTransaction from './FormAddTransaction';
import FormEditTransaction from './FormEditTransaction';
import Subtotal from './Subtotal';

const useStyles = makeStyles( () => ({
  contentStyle: {
    position: 'absolute',
    top: '65px',
  },
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh', // Set the height of the container to full viewport height
    // flexGrow: 1,
  },
  circularProgressStyle:{
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh', 
    color:'#344955',
  },
  circularTextStyle:{
    fontSize:13,
    color:'#344955',
  },
  paperStyle: {
    width: "100%",   
    marginLeft: "2px",
    marginRight: "2px",
    color: "white",
    backgroundColor: "#f0f8ff",
    padding: "5px",
  },
  boxSelectStyle:{
    height: "30px",
    width: "100%",
  },
  textStyle:{
    fontSize:"11px", 
    marginLeft:"5px",
    marginTop:"0px",
    paddingTop:"5px",
    paddingLeft:"5px",
    color:'#344955',
  },
  buttonStyle:{
    textTransform: 'none'
  },
  TableHeader:{
    color: "white",
    backgroundColor: '#344955',
    fontSize: 11
  },
  TableTitle:{
    color: "white",
    backgroundColor: '#344955',
    fontSize: 11
  },

  greenSnackbarContent: {
    backgroundColor: "#228B22",
  },
}));

export default function Proyectos (){
  const classes = useStyles();
  const { id } = useParams();  
  const { transactions, setTransactions, suppliers, setSuppliers } = useContext(LoginContext);
  const { allTransactions, setAllTransactions } = useState(null);
  const [ filteredTransactions, setFilteredTransactions]=useState([])
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));//md
  const [ supplierSearchId, setSuppliersSearchId]= useState("");
  const [ isEditField, setIsEditField] = useState(true)// eliminar?
  const [ isEdit, setIsEdit] = useState(false); 
  const [ isDelete, setIsDelete] = useState(false); 
  const [ isAddTransaction, setIsAddTransaction] = useState(false); 
  const [ isEditTransaction, setIsEditTransaction] = useState(false); 
  const [ isSnackbarOpen, setIsSnackbarOpen]=useState(false);
  const [ snackbarMessage, setSnackbarMessage]=useState("");
  // const [ transactions, setTransactions] = useState(null);
  const { axiosFetch: getProject, isLoading: isLoadingProject, error: isErrorProject } = useAxios();
  const { axiosFetch: delTransaction, isLoading: isLoadingDeletion, error: isErrorDeletion } = useAxios();
  const objetoRubro = {idRubro: "0", nombreRubro: ""}
  const supplierObject = {id: "0", label: ""}
  const paymentObject = {id: "0", label: ""}
  // let filteredTransactions=null
  let projectSuppliersList = transactions ? [
    { id: "0", label: "Todos" },
    ...
    transactions
    .map(transaction => ({
        id: transaction.idProveedor,
        label: transaction.proveedor
    }))
    .reduce((acc, cur) => {
        const existing = acc.find(item => item.id === cur.id);
        if (!existing) {
            acc.push(cur);
        }
        return acc;
    }, [].sort((a, b) => a.label.localeCompare(b.label)))]:[];

    let projectTypesList = transactions ? [
      { id: "0", label: "Todos" },
      ...
      transactions
      .map(transaction => ({
          id: transaction.idRubro,
          label: transaction.rubro
      }))
      .reduce((acc, cur) => {
          const existing = acc.find(item => item.id === cur.id);
          if (!existing) {
              acc.push(cur);
          }
          return acc;
      }, [].sort((a, b) => a.label.localeCompare(b.label)))]:[];


  const handleAddTransaction=()=>{
    setIsAddTransaction(true);
  }

  const handleEditTransaction=()=>{
    setIsEditTransaction(true);
  }

  const handleAddTransactionClose=()=>{
    setIsAddTransaction(false);
  }

  const handleEditTransactionClose=()=>{
    setIsEditTransaction(false);
  }

  const getProjectSuccessCb=(apiData)=>{
    if(apiData){
      // alert("setTransactions(apiData)")
      setTransactions(apiData);
    }
  }

  const getProjectErrorCb=()=>{
    // alert("Hubo un error en el servidor. No fue posible cargar las transacciones del proyecto")
    // setSnackbarMessage("Hubo un error en el servidor. No fue posible cargar las transacciones del proyecto");
    // setIsSnackbarOpen(true);
  }

  const handleEditClose=()=>{
    setIsEdit(false);
  }

  const handleSnackbarClose=()=>{
    setIsSnackbarOpen(false);
  }

  const filterFunction=(supplierId)=>{
    if (supplierId !=="" && supplierId!==undefined && supplierId!==null){

      if (supplierId==="0"){
        return transactions
      }
      const filtered = transactions.filter((list) => (list.idProveedor === supplierId ))  
      console.log(filtered)
      // alert("filtered.length"+filtered.length)
      if (filtered.length > 0){
        return filtered
      }
    }
    // alert("retorna transactions en filterFunction")
    return transactions
  }

  // const deleteTransactionSuccessCb=(apiData)=>{
  //   if (apiData){
  //     setSnackbarMessage("Transaccion eliminada con exito")
  //     setIsSnackbarOpen(true)
  //   }
  //   alert("Continua em deleteTransactionSuccessCb apos snackbar")
  //   setDeletionId("");
  //   getProject({ axiosInstance: api, method: 'GET', url: `/transacciones/${id}`, requestConfig: { headers: {'Authorization': "martincsl@hotmail.com",},}},getProjectSuccessCb, getProjectErrorCb);
  //  }
  
  //  const deleteTransactionErrorCb=()=>{
  //   setDeletionId("");
  //   alert("Transaccion no pudo ser eliminada, favor intentar mas tarde")
  //  }


  // useEffect(() => {
  //   if (isDelete){
  //     setIsDelete(false);
  //   }
  //   delTransaction({ axiosInstance: api, method: 'DELETE', url: `/transacciones/${deletionId}`, requestConfig: { headers: {'Authorization': "martincsl@hotmail.com",},}},deleteTransactionSuccessCb, deleteTransactionErrorCb);
    
  // }, [isDelete]);

  useEffect(() => {
    // alert("useEffect [supplierSearchId]")
    // alert(supplierSearchId.idProveedor)
    // if (supplierSearchId.idProveedor!==""){
    //   if (supplierSearchId.idProveedor!=="0"){
    //     alert("!==0")
    //     setFilteredTransactions(transactions.filter((list) => (list.idProveedor === supplierSearchId.idProveedor )))
    //   } else {
    //     alert("===0, todos")
    //     setFilteredTransactions (transactions)
    //   }
    // } else {
    //   alert("===''")
    //   setFilteredTransactions (transactions)
    // }
    setFilteredTransactions(filterFunction(supplierSearchId.idProveedor))
  }, [supplierSearchId]);


  useEffect(() => {
    setIsEdit(false);
    if (id) {
      getProject({ axiosInstance: api, method: 'GET', url: `/transacciones/${id}`, requestConfig: { headers: {'Authorization': "martincsl@hotmail.com",},}},getProjectSuccessCb, getProjectErrorCb);
    } 
  }, [isEdit]);

  useEffect(() => {
    if (id) {
      // alert("llama getProject: "+id)
      getProject({ axiosInstance: api, method: 'GET', url: `/transacciones/${id}`, requestConfig: { headers: {'Authorization': "martincsl@hotmail.com",},}},getProjectSuccessCb, getProjectErrorCb);
    } 
  }, []);

  return(
    <>
    {/* {alert("index id: "+id)} */}
      { ! transactions ? 
      
      <>
      {console.log(" proyectos-index transactions")}
      {console.log(transactions)}
      {console.log(" proyectos-index filteredTransactions")}
      {console.log(filteredTransactions)}
      <div className={classes.root}>
      {/* <Header />   */}
      <Grid container> 
        <Grid item xs={12}>
          <Typography align="center" className={classes.circularTextStyle}>Cargando proyecto de la base de datos</Typography>
        </Grid>
        <Box style={{height:"10px"}}/>
        <Grid item xs={12}>
          <Box style={{display:"flex", alignItems:"center", justifyContent:"center"}}>
            <CircularProgress className={classes.circularProgressStyle} />
          </Box>
        </Grid>
        </Grid>   
      </div>
      </>
    
  : <>

    { transactions.length > 0? 
    <>
   
    <Grid container item direction="column" alignItems="center" style = {{minHeight: '80vh'}}  >
      
      {/* Grid para ocupar el heigth del app bar */}
      {/* style = {{ minHeight: '69px'}} */}
      <Grid item xs={12} style = {{ minHeight: '69px'}}  /> 

      {/* main container grid */}
      <Grid item container direction="row" spacing={1}   >

        { isMobile || isTablet ? // En caso de Mobile/Tablet, pasa al inicio de la pantalla...y no en el centro, como en el desktop
        <>
        <Grid item xs={12} >
        {/* className={classes.paperStyle} */}
          <Paper  elevation={3} > 
            <TableProject 
              id={id}
              // transactions={transactions} 
              transactions={filteredTransactions}
              setTransactions={setTransactions} 
              isEdit={isEdit}
              setIsEdit={setIsEdit}
              isDelete={isDelete} 
              setIsDelete={setIsDelete}/>
          </Paper>
          <Box sx={{height:"5px"}}/> 

          <Paper>
            {/* <AssumptionsText assumptionsText={assumptions.assumptionsText}/> */}
          </Paper>
        </Grid> 
        </>
        : null }
            {/* isMobile || isTablet ? */}

        {/* center grid */}
        <Grid item xs={12} md={9}  >
          <Paper className={classes.paperStyle} elevation={3}  > 
            { ! isMobile && ! isTablet? 
              <>
              <TableProject 
                id={id}
                // transactions={transactions} 
                transactions={filteredTransactions}
                setTransactions={setTransactions} 
                isEdit={isEdit}
                setIsEdit={setIsEdit}
                isDelete={isDelete} 
                setIsDelete={setIsDelete}
              />

              <Box sx={{height:"5px"}}/>
              </>
            : null }
                    {/* ! isMobile && ! isTablet? */}
                    { isTablet && ! isMobile? 
          <Grid container>
            <Box style={{height:"5px"}}/>
            <Grid item sx={12} sm={6}>
              <Paper elevation={3} style={{marginRight:"5px"}}>

              </Paper>
            </Grid>
            <Box sx={{height:"5px"}}/>
            <Grid item sx={12} sm={6}>
              <Paper elevation={3} style={{marginLeft:"5px"}}>

              </Paper>
            </Grid>


          </Grid>  
        : null }
          <Box sx={{height:"5px"}}/>

          </Paper>
        </Grid>  

        {/* rigth side grid ...Obs.: en veridon Mobile y tablet no hay right side grid*/}
        { ! isTablet || isMobile ? // 
          <>
          <Grid item xs={12} sm={6} md={3}  >
            <Paper className={classes.paperStyle} elevation={0}  > 

              <>
              <Box sx={{height:"5px"}}/>
              <Paper elevation={3} >
                <Box style={{marginTop:"10px",marginLeft:"10px",marginBottom:"10px"}}> 
                  <Typography style={{fontSize:"14px"}}>Proyecto: Edificio Tres Kandu</Typography>
                  <Typography style={{fontSize:"12px"}}>Construcción edificio en San Lorenzo</Typography>
                  {/* <Typography style={{fontSize:"12px"}}>2.400 metros cuadrados</Typography> */}
                  <Typography style={{fontSize:"12px"}}>Monto Presupuestado Us$ 3.300.000</Typography>
                  <Box sx={{height:"5px"}}/>
                </Box>
                <Box sx={{height:"5px"}}/>
                <Subtotal transactions={transactions}/>
                <Box sx={{height:"5px"}}/>
                <Box style={{display:"flex", justifyContent:"start"}}>
                 {/* "#E4D00A" "#FFBF00" */}
                  <Button startIcon = {<AddCircleIcon />} variant="contained" size="small" disableRipple onClick={handleAddTransaction} style={{margin:'2px', color:"#344955",backgroundColor:"#E1C16E",textTransform:"none", fontSize:"11px"}} >Factura/Pago</Button> 
                  {/* <Button startIcon = {<AddCircleIcon />} variant="contained" size="small" disabled style={{margin:'2px', color:"#344955",backgroundColor:"#E1C16E",textTransform:"none"}} >Pago</Button> */}
                  <Button startIcon = {<AddCircleIcon />} variant="contained" size="small" disableRipple style={{margin:'2px', color:"#344955",backgroundColor:"#E1C16E",textTransform:"none", fontSize:"11px"}} >Proveedor</Button>
                  <Button startIcon = {<AddCircleIcon />} variant="contained" size="small" disableRipple style={{margin:'2px', color:"#344955",backgroundColor:"#E1C16E",textTransform:"none", fontSize:"11px"}} >Rubro</Button>  
                  {/* <Button variant="contained" size="small"  style={{margin:'2px', color:"#344955",backgroundColor:"#E1C16E",textTransform:"none"}} >Editar</Button>              */}
                  {/* <Button variant="contained" size="small" style={{margin:'2px', color:"#344955",backgroundColor:"#E1C16E",textTransform:"none"}}  >Excluir</Button> */}
                  {/* <Button variant="contained" size="small" disabled style={{margin:'2px', color:"#344955",backgroundColor:"#E1C16E",textTransform:"none"}} >Imprimir</Button> */}

                </Box>
                <Box sx={{height:"15px"}}/>


                <Paper elevation={6} >
                  <Typography style={{fontSize:"13px", marginLeft:"5px"}}>Filtrar datos</Typography>
                  <Box style={{height:"5px"}}/>
                  <Box style={{display:"flex", justifyContent:"center",margin:"5px"}}>
                    <Grid container>
                      <Grid item xs={12} spacing={3}>
                        <SuppliersAutocomplete
                          supplierObject={supplierObject} 
                          setterFunction={setSuppliersSearchId} 
                          suppliersList={projectSuppliersList}
                        />
                      </Grid>
                      <Grid item xs={12} >
                      <Box style={{height:"5px"}}/>  
                      <TypesListByProjecy
                        supplierObject={supplierObject} 
                        setterFunction={setSuppliersSearchId} 
                        projectSuppliersList={projectTypesList}
                      />
                        
                      </Grid>


                    </Grid>
                    {/* <SuppliersAutocomplete 
                      supplierObject={supplierObject}
                      setterFunction={setSuppliersSearchId}///
                      isEditField={isEditField}
                      setIsEditField={setIsEditField}
                      variant="filled"
                    /> */}

                 

                  </Box>
                  <Box style={{height:"15px"}}/>

                </Paper>
 
              </Paper>
              <Box sx={{height:"5px"}}/>
              {/* <Paper elevation={3}>
                <ChartRevenue
                  assumptions={assumptions} 
                  combinedFinancialData={combinedFinancialData} 
                  isCheckedShowPreviousYears={isCheckedShowPreviousYears} 
                  isCheckedDescOrder={isCheckedDescOrder} isEstimateFcffOnly={isEstimateFcffOnly}
                />
              </Paper>  */}
              <Box sx={{height:"5px"}}/> 
 
              </>

                  {/* combinedFinancialData ? */}
            </Paper>
          </Grid>  
          </> 
          : null }
              {/* !isMobile && ! isTablet ?  */}
      </Grid> 
    </Grid>

    </>
    : 
    <Stack alignItems="center">
      <CircularProgress  variant="indeterminate" className={classes.circularProgressStyle} />
    </Stack>
  } 
  </>
}
  <FormAddTransaction 
    open={isAddTransaction}
    onClose={handleAddTransactionClose}
    id={id}
    isEdit={isEdit}
    setIsEdit={setIsEdit}
  />
  {/* <FormEditTransaction 
      open={isEditTransaction}
      onClose={handleEditTransactionClose}
      id={id}
      isEdit={isEdit}
      setIsEdit={setIsEdit}
  /> */}
  <Snackbar
    open={isSnackbarOpen}
    autoHideDuration={2000} 
    onClose={()=>handleSnackbarClose()}
    >
    <SnackbarContent
      className={classes.greenSnackbarContent}
      message={snackbarMessage}
    />
  </Snackbar>  

    </>
  )
}