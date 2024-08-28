import React, { useContext, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useHistory } from 'react-router-dom';

import { Stack, Grid, Paper, Box, Button, TableContainer, Table, TableHead, TableBody, TableRow, TableCell,Snackbar, SnackbarContent, useTheme, useMediaQuery, Typography, CircularProgress } from '@mui/material';
import { makeStyles } from '@material-ui/core/styles';

import api from '../../services/api';
import useAxios from '../../hooks/useAxios';

import Header from '../../components/Header';
import TableProject from './TableProject';
import FormInc from './FormInc';
import FormAddTransaction from './FormAddTransaction';

const useStyles = makeStyles( (mainTheme) => ({
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
    color:mainTheme.palette.tertiary.main,
  },
  circularTextStyle:{
    fontSize:13,
    color:mainTheme.palette.tertiary.main,
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
    color:mainTheme.palette.tertiary.main,
  },
  buttonStyle:{
    textTransform: 'none'
  },
  TableHeader:{
    color: "white",
    backgroundColor: mainTheme.palette.primary.main,
    fontSize: 11
  },
  TableTitle:{
    color: "white",
    backgroundColor: mainTheme.palette.primary.main,
    fontSize: 11
  },

  greenSnackbarContent: {
    backgroundColor: "#228B22",
  },
}));

export default function Proyectos (){
  const classes = useStyles();
  // const id="VDB";
  const { id } = useParams();  
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));//md
  const [ isEdit, setIsEdit] = useState(false); 
  const [ isAddTransaction, setIsAddTransaction] = useState(false); 
  const [ isSnackbarOpen, setIsSnackbarOpen]=useState(false);
  const [ snackbarMessage, setSnackbarMessage]=useState("");
  const [ transactions, setTransactions] = useState(null);
  const { axiosFetch: getProject, isLoading: isLoadingProject, error: isErrorProject } = useAxios();


  const handleAddTransaction=()=>{
    setIsAddTransaction(true);
  }

  const handleAddTransactionClose=()=>{
    setIsAddTransaction(false);
  }

  const getProjectSuccessCb=(apiData)=>{
    // alert("getProjectSuccessCb")
    setTransactions(apiData);
  }

  const handleEditClose=()=>{
    setIsEdit(false);
  }

  const handleSnackbarClose=()=>{
    setIsSnackbarOpen(false);
  }

  const getProjectErrorCb=()=>{
    setSnackbarMessage("Hubo un error en el servidor. No fue posible cargar las transacciones del proyecto");
    setIsSnackbarOpen(true);
  }

  useEffect(() => {
    if (id) {
      getProject({ axiosInstance: api, method: 'GET', url: `/transacciones/VDB`, requestConfig: { headers: {'Authorization': "id",},}},getProjectSuccessCb, getProjectErrorCb);
    } 
  }, []);

  return(
    <>
      { ! transactions ? <>
 
      <div className={classes.root}>
      <Header />  
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
      <Grid item xs={12} style = {{ minHeight: '69px'}} /> 

      {/* main container grid */}
      <Grid item container direction="row" spacing={1}   >

        { isMobile || isTablet ? // En caso de Mobile/Tablet, pasa al inicio de la pantalla...y no en el centro, como en el desktop
        <>
        <Grid item xs={12} >
        {/* className={classes.paperStyle} */}
          <Paper  elevation={3} > 
      
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
              <TableProject  transactions={transactions}/>

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
                  <Typography style={{fontSize:"14px"}}>Proyecto: Villa del Bosque</Typography>
                  <Typography style={{fontSize:"12px"}}>Construcción de 15 casas en Luque</Typography>
                  <Typography style={{fontSize:"12px"}}>2.400 metros cuadrados</Typography>
                  <Typography style={{fontSize:"12px"}}>Monto: Gs. 9.652 millones</Typography>
                  <Box sx={{height:"5px"}}/>
                </Box>
                <Box sx={{height:"5px"}}/>
                <TableContainer component={Paper} >

                  <Table className = {classes.table} size="small" aria-label="stycky header">

                    <TableHead className = {classes.TableHeader}>
                      <TableRow>
                        <TableCell className = {classes.TableTitle} style={{fontSize:"11px",width: "34%", padding:"4px",color:"whitesmoke" }} align="right">Total Ingresos</TableCell>
                        <TableCell className = {classes.TableTitle} style={{fontSize:"11px",width: "34%", padding:"4px",color:"whitesmoke"}} align="right">Total Egresos</TableCell>
                        <TableCell className = {classes.TableTitle} style={{fontSize:"11px",width: "34%", padding:"4px",color:"whitesmoke"}} align="right">Saldo</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      <TableRow>
                        <TableCell className = {classes.TableRows}  style={{fontSize:"10px", width: "34%", padding:"4px" }} align="right" >7.700.445.052</TableCell>
                        <TableCell className = {classes.TableRows} style={{ fontSize:"10px",width: "33%", paddingRight:"5px", padding:"2px" }}  align="right" >8.111.872.591 </TableCell>
                        <TableCell className = {classes.TableRows} style={{ fontSize:"10px",width: "33%", paddingRight:"5px", padding:"2px" }}  align="right" >-411.427.539 </TableCell>

                      </TableRow>  
                    </TableBody>
                  </Table>
                </TableContainer>
                <Box sx={{height:"5px"}}/>
                <Box style={{display:"flex", justifyContent:"center"}}>
                 {/* "#E4D00A" "#FFBF00" */}
                  <Button variant="contained" size="small" disableRipple onClick={handleAddTransaction} style={{margin:'2px', color:"#344955",backgroundColor:"#E1C16E",textTransform:"none"}} >Incluir</Button> 
                  <Button variant="contained" size="small"  style={{margin:'2px', color:"#344955",backgroundColor:"#E1C16E",textTransform:"none"}} >Editar</Button>             
                  <Button variant="contained" size="small" style={{margin:'2px', color:"#344955",backgroundColor:"#E1C16E",textTransform:"none"}}  >Excluir</Button>
                  <Button variant="contained" size="small"  style={{margin:'2px', color:"#344955",backgroundColor:"#E1C16E",textTransform:"none"}} >Imprimir</Button>

                </Box>
                <Box sx={{height:"15px"}}/>
                <Box style={{marginTop:"10px",marginLeft:"10px",marginBottom:"10px"}}> 
                  <Typography style={{fontSize:"12px"}}>Cuotas de inversion pendientes:</Typography>
                  <TableContainer component={Paper} >

<Table className = {classes.table} size="small" aria-label="stycky header">

  <TableHead className = {classes.TableHeader}>
    <TableRow>
      <TableCell className = {classes.TableTitle} style={{fontSize:"11px",width: "34%", padding:"4px",color:"whitesmoke" }} align="left">Inversionista</TableCell>
      <TableCell className = {classes.TableTitle} style={{fontSize:"11px",width: "34%", padding:"4px",color:"whitesmoke" }} align="right">Vencimiento</TableCell>
      <TableCell className = {classes.TableTitle} style={{fontSize:"11px",width: "34%", padding:"4px",color:"whitesmoke" }} align="right">Monto</TableCell>
    </TableRow>
  </TableHead>
  <TableBody>
    <TableRow>
      <TableCell className = {classes.TableRows}  style={{fontSize:"11px", width: "34%", padding:"4px" }} align="left" >Analia Toranzo</TableCell>
      <TableCell className = {classes.TableRows} style={{ fontSize:"11px",width: "33%", paddingRight:"5px", padding:"2px" }}  align="right" >05/Jun/2024</TableCell>
      <TableCell className = {classes.TableRows} style={{ fontSize:"11px",width: "33%", paddingRight:"5px", padding:"2px" }}  align="right" >162.500.000</TableCell>
      </TableRow>  
      <TableRow>
      <TableCell className = {classes.TableRows}  style={{fontSize:"11px", width: "34%", padding:"4px" }} align="left" >Lisandro Quaranta</TableCell>
      <TableCell className = {classes.TableRows} style={{ fontSize:"11px",width: "33%", paddingRight:"5px", padding:"2px" }}  align="right" >05/Jun/2024</TableCell>
      <TableCell className = {classes.TableRows} style={{ fontSize:"11px",width: "33%", paddingRight:"5px", padding:"2px" }}  align="right" >162.500.000</TableCell>
    </TableRow>  
    <TableRow>
      <TableCell className = {classes.TableRows} style={{fontSize:"11px",width: "34%", padding:"4px" }} align="left">Total</TableCell>
      <TableCell className = {classes.TableRows} style={{fontSize:"11px",width: "34%", padding:"4px" }} align="right"></TableCell>
      <TableCell className = {classes.TableRows} style={{fontSize:"11px",width: "34%", padding:"4px" }} align="right">325.000.000</TableCell>
    </TableRow>
  </TableBody>
</Table>
</TableContainer>
                  

                </Box>

                {/* <ChartFreeCashFlow
                  assumptions={assumptions} 
                  combinedFinancialData={combinedFinancialData} 
                  isCheckedShowPreviousYears={isCheckedShowPreviousYears} 
                  isCheckedDescOrder={isCheckedDescOrder} isEstimateFcffOnly={isEstimateFcffOnly}
                /> */}
              </Paper>
              
              {/* <Paper>
                <ShowComments
                  valuationId={valuationId} 
                />
              </Paper> */}
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
              {/* <DisclaimerText /> */}
              {/* <Box sx={{height:"5px"}}/>
              <Paper elevation={3}>
                <ChartRevenue
                  assumptions={assumptions} 
                  combinedFinancialData={combinedFinancialData} 
                  isCheckedShowPreviousYears={isCheckedShowPreviousYears} 
                  isCheckedDescOrder={isCheckedDescOrder} isEstimateFcffOnly={isEstimateFcffOnly}
                />
              </Paper>  */}
              {/* {isMobile ? 
              <>
              <Box sx={{height:"5px"}}/>
              <DisclaimerText />
              <Box sx={{height:"5px"}}/>
              <ShowComments 
                valuationId={valuationId}
              /> 
              </>
              : null} */}
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
  />
  <Snackbar
    open={isSnackbarOpen}
    autoHideDuration={2000} 
    onClose={handleSnackbarClose}
    >
    <SnackbarContent
      className={classes.greenSnackbarContent}
      message={snackbarMessage}
    />
  </Snackbar>  

    </>
  )
}