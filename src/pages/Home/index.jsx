import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';

import { Grid, Paper, Box, Button, Typography, Tooltip, Snackbar, SnackbarContent, CircularProgress } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import AddCircleIcon from '@mui/icons-material/AddCircle';

// import api from '../../services/api';
// import valuationsWebApi from '../../services/valuationsWebApi';
import useAxios from '../../hooks/useAxios';

import { LoginContext } from '../../helpers/Context';
import api from '../../services/api';

import Header from '../../components/Header';
import DialogModal from '../../components/modals/DialogModal';


import BankAccounts from './BankAccounts';
import ExchangeRate from './ExchangeRate';
import FormAddProject from './FormAddProject';
import MyProfile from './MyProfile';
import TableMyValuationsList from './TableMyValuationsList';
// import TableRollingForecast from './TableLatestRollForecast';
import TableRollingForecast from './TableRollingForecast';
import TableValuationCashFlow from './TableValuationCashFlow';
import TableValuationResults from './TableValuationResults';
import CurrencyOptions from './CurrencyOptions';
import ChartValuation from './ChartValuation';

const useStyles = makeStyles( () => ({
  contentStyle: {
    position: 'absolute',
    top: '65px',
  },
  buttonStyle: {
    textTransform:"none",
    fontSize:"12px",
    backgroundColor: "#E1C16E", 
    color: '#344955', 
    '&:hover': {
      backgroundColor: '#bda25c', 
      color: '#34495', 
    },
    '&:disabled': {
      backgroundColor: "gray", //"#F49506ed",
      color: '#344955', 
    },
  },
  sectionTitleStyle:{
    fontSize: 14,
    color: '#344955',
    // color: mainTheme.sectionTitle.color
  },
  paperStyle: {
    width: "100%",   
    // minHeight:"565px", // vai ser do tamanho do conteudo da tabela
    height:"100%",
    marginLeft:"3px",
    marginRight:"0px",
    color:"#344955",
    backgroundColor: "whitesmoke",
    padding: "5px",
  },
})) 

export default function Home (){
  const classes = useStyles();
  const { userData } = useContext(LoginContext)
  const { userId }= userData
  const [ isAddProject, setIsAddProject] = useState(false); 
  const [ isEdit, setIsEdit]=useState(false);
  const [ dialogOptions, setDialogOptions] = useState({severity:"",title:"",message:"",buttons:{}, action:""});
  const [ isDialogOpen, setIsDialogOpen] = useState(false);
  const [ valuationsList, setValuationsList ] = useState([
  {
    ProjectDate:"2022-03-25 18:13:34",
    projectId:"VDB",
    projectName:"Villa del Bosque",
    projectStatus:"En Ejecución",
    projectBudget:1340556,
    projectRevenue:0,
    projectCost:0,
    projectMargin:0,
  },
  {
    ProjectDate:"2022-03-25 18:13:34",
    projectId:"VA2",
    projectName:"Villa Adela 2",
    projectStatus:"En Ejecución",
    projectBudget:680278,
    projectRevenue:0,
    projectCost:0,
    projectMargin:0,
  },
  {
    ProjectDate:"2022-03-25 18:13:34",
    projectId:"3KD",
    projectName:"Edificio Tres Kandu",
    projectStatus:"En Ejecución",
    projectBudget:3300000,
    projectRevenue:0,
    projectCost:0,
    projectMargin:0,
  },
  {
    ProjectDate:"2024-05-03 18:13:34",
    projectId:"TNO",
    projectName:"Edificio Torre Narciso",
    projectStatus:"En Ejecución",
    projectBudget:3000000,
    projectRevenue:0,
    projectCost:0,
    projectMargin:0,
  },
  {
    ProjectDate:"2022-03-25 18:13:34",
    projectId:"TSA",
    projectName:"Edificio Torre Solana",
    projectStatus:"En Ejecución",
    projectBudget:3000000,
    projectRevenue:0,
    projectCost:0,
    projectMargin:0,
  },
  {
    ProjectDate:"2024-04-05 18:13:34",
    projectId:"TU2",
    projectName:"Tuyuti 2",
    projectStatus:"En Ejecución",
    projectBudget:170000,
    projectRevenue:0,
    projectCost:0,
    projectMargin:0,
  },
  {
    ProjectDate:"2024-04-05 18:13:34",
    projectId:"RA2",
    projectName:"Ramos Alfaro",
    projectStatus:"En Ejecución",
    projectBudget:170000,
    projectRevenue:0,
    projectCost:0,
    projectMargin:0,
  },
  {
    ProjectDate:"2024-04-05 18:13:34",
    projectId:"PA2",
    projectName:"Picuiba 2",
    projectStatus:"En Ejecución",
    projectBudget:196483,
    projectRevenue:0,
    projectCost:0,
    projectMargin:0,
  },
  {
    ProjectDate:"2024-04-05 18:13:34",
    projectId:"MAD",
    projectName:"Madero",
    projectStatus:"En Ejecución",
    projectBudget:200010,
    projectRevenue:0,
    projectCost:0,
    projectMargin:0,
  }
  
  ]);

  const [ isEditProfile, setIsEditProfile ] = useState(false);
  const [ projectTransactions, setProjectTransactions]= useState([]);
  const [ isSnackbarOpen, setIsSnackbarOpen]=useState(false);
  const { axiosFetch: getProject, isLoading: isLoadingProject, error: isErrorProject } = useAxios();
  const [ snackbarMessage, setSnackbarMessage]=useState("");
  // const { axiosFetch: getProject, isLoading: isLoadingProject, error: isErrorProject } = useAxios();
  const isLoadingValuations=false;
  // const { loading: isLoadingValuations, axiosFetch: getUserValuations} = useAxios();
  const history = useHistory();

  const handleAddProject=()=>{
    setIsAddProject(true); 
  }

  const handleAddTransactionClose=()=>{
    setIsAddProject(false);
  }
  const handleSnackbarClose=()=>{
    setIsSnackbarOpen(false);
  }
  
  function handleDialogClose(){
    setIsDialogOpen(false);
    setDialogOptions({severity:"",title:"",message:"",buttons:{},action:""});
  }

  function handleNewValuation(){
    history.push('/project')
  }

  const getProjectSuccessCb=(apiData)=>{
    if (apiData){
      // alert("getProjectSuccessCb")
      setProjectTransactions(apiData);
      const ingresos = projectTransactions.filter(transaction => transaction.idTipoFlujo === "0").reduce((subtotal, transaction) => subtotal + parseInt(transaction.montoFactura), 0)/7700;
      const egresos = projectTransactions.filter(transaction => transaction.idTipoFlujo === "1").reduce((subtotal, transaction) => subtotal + parseInt(transaction.montoFactura), 0)/7700;
      const saldo = ingresos - egresos
      // alert("saldo: " + saldo)
      // setValuationsList(valuationsList.map(valuation => {
      //   if (valuation.projectId === '3KD') {
      //     return {
      //       ...valuation,
      //       projectRevenue:ingresos,
      //       projectCost:egresos,
      //       projectMargin:saldo,
      //     };
      //   }
      //   return valuation;
      // }));
    }
  }

  const getProjectErrorCb=()=>{

  }

  // function userValuationsSuccessCallback(apiData){
  //   const allValuations = apiData;
  //   setValuationsList(allValuations);
  // }

  // function errorCallback(errorMessage){
  //   setDialogOptions({severity:"error", title:"Oops", message:errorMessage,buttons:{button1:"Ok"}})
  //   setIsDialogOpen (true);
  // }

  useEffect(() => {
    setIsEdit(false);
    // getProject({ axiosInstance: api, method: 'GET', url: `/proyectos`, requestConfig: { headers: {'Authorization': "martincsl@hotmail.com",},}},getProjectSuccessCb, getProjectErrorCb);
  }, [isEdit]);

  
  useEffect ( ()=> {
    if (! userId){
      history.push("/login")
    } 
    getProject({ axiosInstance: api, method: 'GET', url: `/transacciones/3KD`, requestConfig: { headers: {'Authorization': "martincsl@hotmail.com",},}},getProjectSuccessCb, getProjectErrorCb);
    // else { 
    //   getProject({ axiosInstance: api, method: 'GET', url: `/proyectos`, requestConfig: { headers: {'Authorization': "martincsl@hotmail.com",},}},getProjectSuccessCb, getProjectErrorCb);
    // }
  },[]) 
  
  return (
    <>
    <Header />
    { userData ? <>
      <Grid container direction="column" alignItems="center" style = {{ minHeight: '95vh'}} >

<Grid item xs={12} style = {{ minHeight: '69px'}} /> 

<Grid item container direction="row" spacing={1}  >

  <Grid item xs={12} md={2} >
    <Paper className={classes.paperStyle} >
      <MyProfile isEditProfile={isEditProfile} setIsEditProfile={setIsEditProfile}/>
      {/* <Box style={{height:"5px"}}/>
      <ExchangeRate /> */}
      <Box style={{height:"5px"}}/>
      <BankAccounts />

      <Box style={{height:"2px"}}/>
      {/* <Paper style={{height:"110px"}} elevation={6}> */}
        {/* <ChartValuation /> */}
      {/* </Paper> */}
      <Box style={{height:"10px"}}/>
           {/* <TableValuationResults />  */}
    </Paper>
  </Grid>

  <Grid item xs={12} md={7} > 
    <Paper className={classes.paperStyle} >
      <Grid container>
        <Grid item xs={6} md={2} >
          <Typography className={classes.sectionTitleStyle}>Proyectos (En USD)</Typography>
        </Grid>
        <Grid item xs={6} md={3}  >
          <Box style={{height:"5px"}}/>
          <Tooltip title="Crear un nuevo Proyecto">
          {/* variant="contained" size="small" disableRipple style={{margin:'2px', color:"#344955",backgroundColor:"#E1C16E",textTransform:"none"}} */}
          <Box style={{display:"flex", alignItems:"center", justifyContent:"center"}}>
            <Button 
              variant = "contained" 
              startIcon = {<AddCircleIcon />} 
              disableRipple
              onClick = {handleAddProject} 
              className = {classes.buttonStyle}
              >Nuevo Proyecto
            </Button>
            </Box>
          </Tooltip>
        </Grid>
        <Grid item xs={12} md={7}>
          {/* <CurrencyOptions /> */}
        </Grid>
        
      </Grid>
      <Box style={{height:"15px"}}/>
      { isEditProfile ? 
        <>
      
        </> : 
        <>
        { ! isLoadingValuations ? 
          <>
            { valuationsList ? <>
                <TableMyValuationsList valuationsList = {valuationsList} setValuationsList={setValuationsList} />
              </>: 
                <Typography style={{fontSize:14, marginTop:"15px"}}>You don't have any saved valuation</Typography>
            }
          </>: 
          <CircularProgress variant = "indeterminate" /> }  
        </>
      }
      {/* <Box style={{height:"5px"}}/>
      <Typography className={classes.sectionTitleStyle} gutterBottom>Valoración Actual de Civilia</Typography>
      <TableValuationCashFlow /> */}
      {/* <Typography>Total Flujo de Caja Descontado</Typography> */}
      
    </Paper>
  </Grid>

  <Grid item xs={12} md={3} > 
    <Paper className={classes.paperStyle} >
      <Typography className={classes.sectionTitleStyle} >Ultimo Rolling Forecast: 5&7 2024</Typography>
      {/* <Box style={{height:"5px"}}/> */}
      <Paper>
        <TableRollingForecast/>
         <Box style={{height:"10px"}}/>
        <ChartValuation />
      </Paper>
    </Paper>
  </Grid>

</Grid>
</Grid> 
<FormAddProject 
    open={isAddProject}
    onClose={handleAddTransactionClose}
    isEdit={isEdit}
    setIsEdit={setIsEdit}
  />   
    </>: null}
    
    <DialogModal open={isDialogOpen} onClose={handleDialogClose} severity={dialogOptions.severity} title={dialogOptions.title} buttons={dialogOptions.buttons} action={dialogOptions.action}>
      {dialogOptions.message}
    </DialogModal>
    </>
  )
}