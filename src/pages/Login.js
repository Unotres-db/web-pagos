import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';

import { Grid, Paper, Typography, TextField, Button, Box, Grow, Snackbar, SnackbarContent } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import LoginIcon from '@mui/icons-material/Login';

import { LoginContext } from '../helpers/Context.js';
import api from '../services/api';
import useForm from '../hooks/useForm.js';
import useUnsavedWarning from '../hooks/useUnsavedWarning.js';

import Header from '../components/Header.js';
// import AlertMessage from '../components/modals/AlertMessage.js';
// import AlertMessage from '../components/modals/AlertMessage.js';
import DialogModal from '../components/DialogModal.jsx'
// import DialogModal from '../components/DialogModal.jsx'
const useStyles = makeStyles((mainTheme) => ({
  contentStyle: {
    position: 'absolute',
    top: '65px'
  },
  paperStyle: {
    margin: 'auto',
    padding:'10px',
    minWidth: 350,
    maxWidth: 500,
    backgroundColor:"#E1C16E",
    // backgroundColor:mainTheme.palette.secondary.main,  
  },
  titleStyle:{
    color: "#344955",
  },
  buttonStyle: {
    textTransform:"none",
    fontSize:"13px",
    backgroundColor: "#bda25c", // "#E1C16E"
    color: '#344955',           // #344955
    '&:hover': {
      backgroundColor: '#bda25c', 
      color: 'white', 
    },
    '&:disabled': {
      backgroundColor: "gray", //"#F49506ed",
      color: '#344955', 
    },
  },

  iconBox:{
    width:'100%',
    textAlign: 'center',
    AlignItems: 'center',
  },
  iconStyle:{
    color:"#344955", 
  },
  inputStyle: {
    background: "white",
  },
  formStyle:{
    backgroundColor:'white'
  },
  forgotPasswordStyle:{
    fontSize:11,
    color:"blue"
  },
  greenSnackbarContent: {
    backgroundColor: "#228B22"
  },
}))

  export default function Login () {

    const classes = useStyles();  
    const { userData, setUserData } = useContext (LoginContext);
    const { handleChange, handleChangeUserId, handleSubmit, chkBlankFormLogin, noBlanks, values, formErrors, inputData, setInputData } = useForm (submit);
    const { inputId, inputPassword}= inputData
    const { userPassword } = values;
    const [ isAlertOpen, setIsAlertOpen ] = useState(false);
    const [ isSnackbarOpen, setIsSnackbarOpen]=useState(false);
    const [ snackbarMessage, setSnackbarMessage]=useState("");
    const [ alertMessage, setAlertMessage ] = useState({severity:"", title:"", message:""});
    const [ Prompt, setIsDirty, setIsPristine ] = useUnsavedWarning();
    const history = useHistory();

    function handleSnackbarClose(){
      setIsSnackbarOpen(false)
      history.push("/home");
    }
    async function submit () {

    if (chkBlankFormLogin ()){
      setAlertMessage({severity:"warning", title: "Error en entrada de datos", message:"Favor completar los dados marcados como requeridos, gracias !"});
      setIsAlertOpen(true);
    } 
      else {
        setIsPristine();
        try {
          const data = { id: inputId.trim(), password: inputPassword } ;
          const res = await api.post('/session', data );
          setUserData({userId:res.data.id, userProduct:res.data.product, userFirstName:res.data.firstName, userLastName:res.data.lastName})
          // setAlertMessage (prevState => ({...prevState, severity:"success", title: "Sesión iniciada con exito", message: "Iniciando la sesión en la plataforma de Unotres S.A." }));
          // setIsAlertOpen (true);
          setSnackbarMessage("Iniciando la sesión en la plataforma de Unotres S.A." );
          setIsSnackbarOpen(true)
          localStorage.setItem('userId',res.data.id);
          localStorage.setItem('userName',res.data.firstName);
     
        } catch (err) {
          if (err.response) {
            const errorMsg = Object.values(err.response.data);
            setAlertMessage(prevState => ({...prevState, severity:"warning", title: "Error en inicio de sessión", message: errorMsg }));
            setIsAlertOpen(true);
          } else if(err.request) {
              setAlertMessage(prevState => ({...prevState, severity:"warning", title: "Error en inicio de sessión", message: "Servidor no disponible. Favor intentar nuevamente en unos minutos." }));
              setIsAlertOpen(true);
            } else {
                setAlertMessage(prevState => ({...prevState, severity:"warning", title: "Error en inicio de sessión", message: "Servidor no disponible. Favor intentar nuevamente en unos minutos." }));
                setIsAlertOpen(true);
              }
          }
      }
    }
 
  const handleAlertClose = () => {
    setAlertMessage(prevState => ({...prevState, severity:"", title: "", message: "" }));
    setIsAlertOpen(false);
    if ( alertMessage.severity === "success" ) {
      history.push('/home');
    }
  };

  return (
    <>
    <Header />

    <Grid container alignItems="center" justify="center" className={classes.contentStyle} style={{ minHeight:'85vh', backgroundColor:"white"}}>
      <Grid />
      <Grow in timeout = {1000}>
      <Grid item container className={classes.formStyle}>
        <Paper elevation={6} spacing={2} className={classes.paperStyle}>
        
          <form onSubmit={handleSubmit} noValidate>

            <Typography align="center" variant="subtitle1" className={classes.titleStyle} gutterBottom>Iniciar Sesión</Typography>
            <Box className={classes.iconBox} >
              <LoginIcon className={classes.iconStyle} style={{ fontSize: 40 }}/>
            </Box>
          
            <Grid item xs={12} md={12} spacing={1}> 
            <TextField id="inputId" label="Su E-mail" 
              variant ="filled" margin="dense" size="small" fullWidth  
              name="inputId" 
              value= { inputId } 
              onChange={ (e) => {
                handleChange (e,setInputData,[noBlanks]);
                setIsDirty ();
              }}
              inputProps={{style: {fontSize: 14, backgroundColor: 'whitesmoke'}}} 
              error={formErrors.inputId} >
            </TextField>
            {formErrors.inputId ? <div className="error-helper-text">{formErrors.inputId}</div> : null}
          </Grid>

          <Grid item xs={12} md={9} spacing={1}> 
             <TextField id="inputPassword" label="Contraseña *"
                 variant ="filled" margin="dense" size="small" type="password" fullWidth
                 name="inputPassword" 
                 value={inputPassword} 
                 onChange={ (e) => {
                   handleChange (e,setInputData,[noBlanks]);
                   setIsDirty ();
               }}
              //  sx={{ backgroundColor: 'lightblue' }}
               inputProps={{style: {fontSize: 14, backgroundColor: 'whitesmoke'}}} 
               error={formErrors.inputPassword}>
             </TextField>
               {formErrors.inputPassword ? <div className="error-helper-text">{formErrors.inputPassword}</div> : null}
               <Typography className={classes.forgotPasswordStyle}><a href="/reset">¿Olvidaste tu contraseña? Ingresa aquí</a></Typography>
               {/* <Typography className={classes.forgotPasswordStyle}>¿Olvidaste tu contraseña? Ingresa aquí</Typography> */}

           </Grid>
           <Box style={{height:"15px"}}/>
            <Grid container direction="row" alignItems="center" justify="center"> 
              <Button type="submit" className={classes.buttonStyle} variant="outlined" disableRipple >Login</Button>
            </Grid>
            <Box style={{height:"15px"}}/>
          </form>
        </Paper>
      </Grid>
      </Grow>
      <Grid />
    </Grid>
    {Prompt}
    {/* <AlertMessage open={isAlertOpen} onClose={handleAlertClose} severity={alertMessage.severity} title={alertMessage.title}>
      {alertMessage.message}
    </AlertMessage> */}
    <DialogModal open={isAlertOpen} onClose={handleAlertClose} severity={alertMessage.severity} title={alertMessage.title}>
      {alertMessage.message}
    </DialogModal>
    <Snackbar
    open={isSnackbarOpen}
    autoHideDuration={3000} 
    onClose={handleSnackbarClose}
    anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
    >
    <SnackbarContent
      className={classes.greenSnackbarContent}
      message={snackbarMessage}
    />
    </Snackbar>  
    </>
  )
}