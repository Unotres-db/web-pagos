import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import { Grid, Paper, Box, Button, Typography, Tooltip, Snackbar, SnackbarContent, CircularProgress } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import AddCircleIcon from '@mui/icons-material/AddCircle';

// import api from '../../services/api';
// import valuationsWebApi from '../../services/valuationsWebApi';
// import useAxios from '../../hooks/useAxios';

import Header from '../../components/Header';
import DialogModal from '../../components/modals/DialogModal';
import MyProfile from './MyProfile';
import TableMyValuationsList from './TableMyValuationsList';
// import TableRollingForecast from './TableLatestRollForecast';
import TableRollingForecast from './TableRollingForecast';
import TableValuationCashFlow from './TableValuationCashFlow';
import TableValuationResults from './TableValuationResults';
import CurrencyOptions from './CurrencyOptions';
import ChartValuation from './ChartValuation';

const useStyles = makeStyles( (mainTheme) => ({
  contentStyle: {
    position: 'absolute',
    top: '65px',
  },
  buttonStyle: {
    backgroundColor:"#7b7d7b",
    [mainTheme.breakpoints.down('xs')]: {
      fontSize: "10px"
    },
  },
  sectionTitleStyle:{
    fontSize: mainTheme.sectionTitle.fontSize,
    color: mainTheme.palette.primary.main,
    // color: mainTheme.sectionTitle.color
  },
  titleStyle: {
    width: "100%",
    padding: "15px",
    color: mainTheme.palette.secondary.main,
    backgroundColor: "white",
    marginBottom: "10px",
  },
  boxStyle: {
    width: "100%",
    padding: "1px",
    color: "white",
    backgroundColor: mainTheme.palette.secondary.main,
    marginBottom: "1px",
  },
  paperStyle: {
    width: "100%",   
    minHeight:"565px", // vai ser do tamanho do conteudo da tabela
    marginLeft:"3px",
    marginRight:"0px",
    color: mainTheme.palette.primary.main,
    backgroundColor: "whitesmoke",
    padding: "5px",
  },
  TableContainerStyle: {
    width: "100%",   
    height:"800px", // vai ser do tamanho do conteudo da tabela
    marginLeft:"3px",
    marginRight:"0px",
    color: "white",
    backgroundColor: mainTheme.palette.secondary.main,
    padding: "10px",
  },
  iconStyle: {
    textAlign: "center",
    display: "block",
    justifyContent: "center",
    alignItems: "center",
    margin: "auto",
    marginTop: "10px",
  }
})) 

export default function Home (){
  const classes = useStyles();
  const [ valuationsList, setValuationsList ] = useState([
  {
    ProjectDate:"2022-03-25 18:13:34",
    projectId:"VDB",
    projectName:"Villa del Bosque",
    projectStatus:"En Ejecución",
    projectBudget:1340556,
    projectRevenue:1069506,
    projectCost:1126649,
    projectMargin:-57143,
  },
  {
    ProjectDate:"2022-03-25 18:13:34",
    projectId:"VA2",
    projectName:"Villa Adela 2",
    projectStatus:"En Ejecución",
    projectBudget:680278,
    projectRevenue:147412,
    projectCost:65779,
    projectMargin:81634,
  },
  {
    ProjectDate:"2022-03-25 18:13:34",
    projectId:"3KD",
    projectName:"Edificio Tres Kandu",
    projectStatus:"En Ejecución",
    projectBudget:3300000,
    projectRevenue:300000,
    projectCost:119011,
    projectMargin:185876,
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
    projectCost:8005,
    projectMargin:-8005,
  },
  {
    ProjectDate:"2024-04-05 18:13:34",
    projectId:"TU2",
    projectName:"Tuyuti 2",
    projectStatus:"En Ejecución",
    projectBudget:170000,
    projectRevenue:30765,
    projectCost:9939,
    projectMargin:20826,
  },
  {
    ProjectDate:"2024-04-05 18:13:34",
    projectId:"RA2",
    projectName:"Ramos Alfaro",
    projectStatus:"En Ejecución",
    projectBudget:170000,
    projectRevenue:30765,
    projectCost:12119,
    projectMargin:18647,
  },
  {
    ProjectDate:"2024-04-05 18:13:34",
    projectId:"PA2",
    projectName:"Picuiba 2",
    projectStatus:"Aprobado",
    projectBudget:196483,
    projectRevenue:0,
    projectCost:0,
    projectMargin:0,
  },
  {
    ProjectDate:"2024-04-05 18:13:34",
    projectId:"MAD",
    projectName:"Madero",
    projectStatus:"Aprobado",
    projectBudget:200010,
    projectRevenue:30708,
    projectCost:15894,
    projectMargin:14814,
  }
  
  ]);
  const [ isDialogOpen, setIsDialogOpen ] = useState(false);
  const [ dialogOptions, setDialogOptions ] = useState({severity:"",title:"",message:"",buttons:{},action:""});
  const [ isEditProfile, setIsEditProfile ] = useState(false);
  const [ isSnackbarOpen, setIsSnackbarOpen]=useState(false);
  const [ snackbarMessage, setSnackbarMessage]=useState("");
  const isLoadingValuations=false;
  // const { loading: isLoadingValuations, axiosFetch: getUserValuations} = useAxios();
  const history = useHistory();


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

  // function userValuationsSuccessCallback(apiData){
  //   const allValuations = apiData;
  //   setValuationsList(allValuations);
  // }

  // function errorCallback(errorMessage){
  //   setDialogOptions({severity:"error", title:"Oops", message:errorMessage,buttons:{button1:"Ok"}})
  //   setIsDialogOpen (true);
  // }
  
  // useEffect ( ()=> {
  //   getUserValuations({ axiosInstance: valuationsWebApi, method: 'GET', url: '/valuations', }, userValuationsSuccessCallback, errorCallback);
  // },[]) 
  
  return (
    <>
    <Header />
    <Grid container direction="column" alignItems="center" style = {{ minHeight: '80vh'}} >

      <Grid item xs={12} style = {{ minHeight: '69px'}} /> 

      <Grid item container direction="row" spacing={1}  >

        <Grid item xs={12} md={2} >
          <Paper className={classes.paperStyle} >
            <MyProfile isEditProfile={isEditProfile} setIsEditProfile={setIsEditProfile}/>
      
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
              <Grid item xs={2}>
                <Typography className={classes.sectionTitleStyle}>Proyectos</Typography>
              </Grid>
              <Grid item xs={3} >
                <Box style={{height:"5px"}}/>
                <Tooltip title="Crear un nuevo Proyecto">
                {/* variant="contained" size="small" disableRipple style={{margin:'2px', color:"#344955",backgroundColor:"#E1C16E",textTransform:"none"}} */}
                  <Button 
                    variant = "contained" 
                    startIcon = {<AddCircleIcon />} 
                    disableRipple
                    style={{margin:'2px', color:"#344955",backgroundColor:"#E1C16E",textTransform:"none"}}
                    // onClick = {handleNewValuation} 
                    className = {classes.buttonStyle}
                    >Nuevo Proyecto
                  </Button>
                </Tooltip>
              </Grid>
              <Grid item xs={7}>
                <CurrencyOptions />
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
            <Box style={{height:"5px"}}/>
            <Paper>
              <TableRollingForecast/>
            </Paper>
          </Paper>
        </Grid>

      </Grid>
    </Grid>
    <DialogModal open={isDialogOpen} onClose={handleDialogClose} severity={dialogOptions.severity} title={dialogOptions.title} buttons={dialogOptions.buttons} action={dialogOptions.action}>
      {dialogOptions.message}
    </DialogModal>
    </>
  )
}