import React, { useState, useContext, useEffect,  useRef } from 'react';
import { useHistory } from 'react-router-dom';

import {Grid, Paper, Box, Stepper, Step, StepLabel, Typography, TextField, Button, Snackbar, Grow } from '@mui/material';
import { makeStyles } from '@material-ui/core/styles';
import LockResetIcon from '@mui/icons-material/LockReset';

import { LoginContext } from '../helpers/Context';
import api from '../services/api';
import useForm from '../hooks/useForm';
import useFetch from '../hooks/useFetch';

import useAxios from '../hooks/useAxios';
import DialogModal from '../components/modals/DialogModal';

const useStyles = makeStyles((mainTheme) => ({
  gridContainerStyle:{
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '85vh', 
    [mainTheme.breakpoints.down('lg')]: {
      minHeight:"85vh",
    },
    marginTop: "64px",
    padding:"0px",
  },
  paperStyle: {
    // display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: 350,
    // width:"100%",
    height: 420,
    margin: '10px',
    backgroundColor:mainTheme.palette.secondary.main,
    padding: mainTheme.spacing(2),
  },
  customLabelStyle: {
    fontSize: "12px"
  },
  iconBox:{
    width:'100%',
    textAlign: 'center',
    AlignItems: 'center',
  },
  iconStyle:{
    color:mainTheme.palette.primary.main,
  },
  textStyle:{
    // color:mainTheme.palette.primary.main,
    color:"black"
  },
  buttonStyle:{
    color: "white", //mainTheme.palette.primary.main,
    textTransform:"none",
    fontSize: 12,
    margin: "3px",
    backgroundColor:mainTheme.palette.primary.main,
    "&:hover": {
      color:mainTheme.palette.secondary.main,
      backgroundColor:mainTheme.palette.primary.main,
    },
    "&:disabled": {
      color:"gray",
      backgroundColor:mainTheme.palette.primary.main,
    },
  },
  loginLinkStyle:{
    marginTop:"5px",
    marginLeft:"5px",
    fontSize:12,
    color:"blue"
  }
  }));

export default function Reset(){
  const classes = useStyles();
  const { userData, setUserData } = useContext(LoginContext);
  const { userId } = userData;
  const steps = ['Indique su e-mail', 'Incluya el codigo enviado', 'Crea su nueva contrasena'];
  const [activeStep, setActiveStep] = useState(0);
  const [code, setCode] = useState({generatedCode:"", inputCode:""});
  const [ isDialogOpen, setIsDialogOpen ] = useState(false);
  const [ dialogOptions, setDialogOptions ] = useState({severity:"",title:"",message:"",buttons:{},action:""});
  const [codeError, setCodeError]=useState("");
  const { axiosFetch: postResetEmail } = useAxios();   
  const [isEmailSent, setIsEmailSent] = useState(false);
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);
  const [snackbarText, setSnackbarMessage] = useState("");
  const {handleChange, noBlanks, isValidCurrUser,registerData, setRegisterData, formErrors, setFormErrors } = useForm ();
  const { updatePassword, createSession } = useFetch({setIsSnackbarOpen, setSnackbarMessage})
  const idTextFieldRef = useRef(null);
  const codeTextFieldRef = useRef(null);
  const passwordTextFieldRef = useRef(null);
  const history = useHistory();

  const focusOnTextField = (step) => {
    switch (step) {
      case 0:
        idTextFieldRef.current.focus();
        break;
      case 1:
        codeTextFieldRef.current.focus();
        break;
      case 2:
        passwordTextFieldRef.current.focus();
        break;
      default:
        break;
    }
  };

  const checkFormErrors=()=>{
    if (formErrors.id !=="" || formErrors.password !=="" ){
      return true
    }
    return false
  }
  
  const handleSnackbarClose=()=>{
    setIsSnackbarOpen(false);
    setSnackbarMessage("")
  }

  const handleDialogClose=()=>{
    setDialogOptions({severity:"",title:"",message:"",buttons:{},action:""});
    setIsDialogOpen(false);
  }

  const postResetSuccessCb=()=>{
    setIsEmailSent(true);
  }

  const postResetErrorCb=(error)=>{
    setIsEmailSent(false);
    setDialogOptions({severity:"error", title:"Error", message:"Hubo un problema al enviar el código a tu cuenta de correo electrónico. Por favor, inténtalo más tarde.",buttons:{button1:"Ok"}})
    setIsDialogOpen (true);
  }

  const handleSendEmailToUser=()=>{
    const code = generateCode();
    postResetEmail({ axiosInstance: api, method: 'POST', url: '/reset-email', data: { userId: registerData.id, code : code  }, requestConfig: { headers: {'Authorization': userId,},}},postResetSuccessCb, postResetErrorCb);
  }

  const generateShortHash=()=> {
    const min = 100000; 
    const max = 999999; 
    const randomHash = Math.floor(Math.random() * (max - min + 1)) + min;
    return randomHash.toString(); 
  }

  const generateCode=()=>{
    const hash = generateShortHash()
    setCode (prevState => ({...prevState, generatedCode:hash }))
    return hash
  }

  const handleChangeInputCode=(e)=>{
    const currentCode = e.target.value;
    setCode (prevState => ({...prevState, inputCode:currentCode }));
    if (code.inputCode === code.generatedCode){
      setCodeError("");
    } else {
        if (currentCode.length === 6 && (currentCode !== code.generatedCode)){
          setCodeError("El código que proporcionaste no es el mismo enviado a tu email");  
        } else {
          if (currentCode.length > 6){
            setCodeError("El código que proporcionaste tiene más de 6 dígitos");  
          } else {
            if (currentCode.length <= 6){
              setCodeError("")
            }
          }
        }
      }
  }

  const handleInputCode=()=>{
    if (code.inputCode === code.generatedCode){
      setCodeError("");
    } else {
      if (code.inputCode.length < 6){
        setCodeError("El código que proporcionaste no tiene 6 dígitos");  
      } else {
        if (code.inputCode.length > 6){
          setCodeError("El código que proporcionaste tiene más de 6 dígitos");  
        } else {
          setCodeError("El código que proporcionaste no es el mismo enviado a tu email");
        } 
      }
    }
  }

  const checkRequiredFields=()=>{
    if (registerData.id !=="" && registerData.password !=="" && registerData.confirmPassword !==""){
      return true
    }
    return false
  }

  const checkRequiredEmail=()=>{
    if (userId!==""){
      return true
    }
    return false
  }

  const validatePasswords=()=>{
    if (registerData.password !=="" && registerData.confirmPassword !=="" && registerData.password !== registerData.confirmPassword) {
      setFormErrors (prevState => ({...prevState, password:'Contraseñas no coinciden', confirmPassword:"Contraseñas no coinciden"} ))
    } else {
      setFormErrors (prevState => ({...prevState, password:"", confirmPassword:""}))
    }
  };

  const handleFinish=()=>{
    const dataToProcess = {id: registerData.id, password: registerData.password }
    createSession(dataToProcess)
    setRegisterData({ id:"", password:"", confirmPassword:"", product:"",firstName:"",lastName:"", country:"", countryName:"", phone:"", birthday:null, occupation:"", company:"",email:"", city:"", description:"", website:"", twitter:"", linkedin:"", facebook:"", instagram:"", youtube:"", tiktok:"", photo:"", banner:""})
  }

  const handleNext=()=>{
    if (activeStep===2){
      handleUpdate()
    }
    setActiveStep((prevStep) => prevStep + 1);
  };

  const handleBack=()=>{
    setActiveStep((prevStep) => prevStep - 1);
  };

  const handleIdBlur=(e)=>{
    handleChange (e,setRegisterData,[isValidCurrUser]);
  }

  const handleCancel=()=>{
    history.goBack()
  }

  const handleUpdate=()=>{
    if (! checkFormErrors() && checkRequiredFields()) {
      const {id, password} = registerData
      updatePassword(id, password); 
    } else {
      setDialogOptions({severity:"error", title:"Error", message:"Hubo un problema al guardar los datos en el servidor. Por favor, inténtalo más tarde",buttons:{button1:"Ok"}})
      setIsDialogOpen (true);
      // console.log("Not saved in database")
    }
  };

  useEffect(() => {
    focusOnTextField(activeStep);
  }, [activeStep]);

  useEffect(() => {
    if (userId !=="" && userId!==null && userId!==undefined){
      setUserData (prevState => ( {...prevState, id: userId}));
      // setActiveStep(1);
      // const code = generateCode();
      // postResetEmail({ axiosInstance: valuationsWebApi, method: 'POST', url: '/reset-email', data: { userId: registerData.id, code : code  }, requestConfig: { headers: {'Authorization': userId,},}},postResetSuccessCb, postResetErrorCb);
    }
  }, []);


  const renderStepContent=(step)=>{
    switch (step) {
      case 0:
        return (
          <Grid container spacing={1}>
            <Grid item xs={12}>
              { userId? 
              <Typography align ="center" gutterBottom className={classes.textStyle} sx={{marginTop:"10px",marginBottom:"10px", fontSize:"12px"}}>
                {/* We are going to send you an email to your e-mail account, with a code to create a new password</Typography> */}
                Le enviaremos un e-mail a su cuenta registrada en breve. Contendrá un código único que puede usar para configurar una nueva contraseña.</Typography>
              : 
              
              <Typography align ="center" gutterBottom className={classes.textStyle} sx={{marginTop:"10px",marginBottom:"10px", fontSize:"12px"}}>
                {/* Please provide your registered e-mail account, so we can send you a code to create a new password</Typography> */}
                Por favor, proporcione su dirección de correo electrónico registrada, para que podamos enviarle rápidamente un código para generar una nueva contraseña</Typography>
              }
               {userId? <>
                <TextField 
                variant ="filled" margin="dense" size="small" fullWidth 
                // disabled
                // variant ="outlined" margin="dense" size="small" fullWidth
                label="E-mail *"
                name="userId"
                value={userId}
                autofocus
                autoComplete="email"
                // onChange={ (e) => {handleChange (e,setRegisterData,[noBlanks])}}
                // onBlur={(e) => handleIdBlur(e)}
                inputProps={{style: {fontSize: 14}}} 
                error={formErrors.userId}
                inputRef={idTextFieldRef}
              />
              {/* {formErrors.id ? <div className="error-helper-text">{formErrors.id}</div> : null}                */}
              </>
              :<>
              <TextField 
                variant ="filled" margin="dense" size="small" fullWidth  
                // variant ="outlined" margin="dense" size="small" fullWidth
                label="E-mail *"
                name="userId"
                value={userData.userId}
                autofocus
                autoComplete="email"
                onChange={ (e) => {handleChange (e,userData,[noBlanks])}}
                onBlur={(e) => handleIdBlur(e)}
                inputProps={{style: {fontSize: 14}}} 
                error={formErrors.userId}
                inputRef={idTextFieldRef}
              />
              {formErrors.userId ? <div className="error-helper-text">{formErrors.userId}</div> : null}
              </>
              }

            </Grid>
            <Box sx={{display:"flex", alignItems:"left", justifyContent:"flex-start", width:"100%", marginLeft:"2px" }}>
              <Button disableRipple className={classes.buttonStyle} disabled={checkFormErrors() || ! checkRequiredEmail() || isEmailSent} onClick={handleSendEmailToUser}>
                Send the code to my E-mail
              </Button>
            </Box>
            <Box sx={{display:"flex", alignItems:"center", justifyContent:"center", width:"100%" }}>
              { isEmailSent && registerData.id !==""? 
                <Typography align ="center" gutterBottom className={classes.textStyle} sx={{marginTop:"5px",marginBottom:"5px", fontSize:"11px"}}>
                  {`El código fue enviado a ${registerData.id}. i no lo encuentra, por favor revise también su bandeja de e-mail no deseado..`}</Typography> : null}
            </Box>
          </Grid>
        );
      case 1:
        return (
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12}>
              <Typography align ="center" gutterBottom className={classes.textStyle} sx={{marginTop:"10px",marginBottom:"0px", fontSize:"13px"}} >
                {`Por favor, incluya el código de 6 dígitos que le hemos enviado por ce-mail a ${userId}`}</Typography>
            </Grid> 
            {/* { code.generatedCode? <p>{code.generatedCode}</p> : null}    */}
            <Grid item xs={12} sm={12}>
              <TextField 
                autoFocus 
                variant ="filled" margin="dense" size="small"  
                // variant ="outlined" margin="dense" size="small" 
                fullWidth
                label="Ingrese el código"
                name="code.inputCode"
                value={code.inputCode}
                autofocus
                autoComplete="code"
                onChange={ (e) => {handleChangeInputCode (e) }}
                onBlur={(e) => handleInputCode(e)}
                inputProps={{style: {fontSize: 14}}} 
                inputRef={codeTextFieldRef}
                error={codeError}
              />
              {codeError ? <div className="error-helper-text">{codeError}</div> : null}
            </Grid>
          </Grid>
        );
      case 2:
        return (
          <Grid container spacing={2} > 
            <Grid item xs={12}>
              <Typography align ="center" gutterBottom className={classes.textStyle} sx={{marginTop:"10px",marginBottom:"10px", fontSize:"12px"}}>
                  Now you can choose a new password </Typography>
              <TextField 
              variant ="filled" margin="dense" size="small" 
                // variant ="outlined" margin="dense" size="small" 
                fullWidth
                label="Cree su contraseña *"
                name="userPassword"
                type="password"
                value={userData.userPassword}
                autoComplete="new-password"
                onChange={(e) => { handleChange (e,setUserData,[noBlanks])}}
                onBlur={validatePasswords}
                inputProps={{style: {fontSize: 14}}} 
                inputRef={passwordTextFieldRef}
                error={formErrors.userPassword}
              />
              {formErrors.userPassword ? <div className="error-helper-text">{formErrors.userPassword}</div> : null}
            </Grid>

          <Grid item xs={12}>
            <TextField 
            variant ="filled" margin="dense" size="small"  
              // variant ="outlined" margin="dense" size="small" 
              fullWidth
              label="Confirme su contraseña *"
              name="confirmPassword"
              type="password"
              value={registerData.confirmPassword}
              autoComplete="confirm-password"
              onChange={ (e) => {handleChange (e,setRegisterData,[noBlanks])}}
              onBlur={validatePasswords}
              inputProps={{style: {fontSize: 14}}} 
              error={formErrors.confirmPassword}
            />
            {formErrors.confirmPassword ? <div className="error-helper-text">{formErrors.confirmPassword}</div> : null}
          </Grid>
        </Grid>
        );
      default:
        return null;
    }
  };
  return(
    <>
     <Grid container alignItems="center" justifyContent="center" spacing={1}  className={classes.gridContainerStyle}  >
    {/* <Container maxWidth="xs">   */}
    <Grid item>
      <Grow in timeout = {1000}>
        <Paper elevation={12} className={classes.paperStyle} style={{paddingBottom: "10px"}} >
          <Box style={{display:"flex", flexDirection:"column", height:"100%", justifyContent:"space-between"}}>
            <Box>
            <Typography align='center' gutterBottom className={classes.textStyle} >Restablecer contraseña</Typography>  
            <Box className={classes.iconBox} >
              <LockResetIcon className={classes.iconStyle} style={{ fontSize: 40 }}/>
            </Box>
              <Stepper activeStep={activeStep} alternativeLabel  > 
                {steps.map((label) => (
                  <Step key={label} >
                    <StepLabel classes={{label: classes.customLabelStyle}} >{label}</StepLabel>
                  </Step>
                ))}
              </Stepper>
              <Box style={{height:"5px"}}/>
              {activeStep === steps.length ? (
                <Grid container spacing={1}>
                  <Grid item container display="flex" alignItems="center" justifyContent="center" xs={12} style={{marginBottom:"8px"}}>
                  {/* <CheckCircleOutlineIcon className={classes.iconStyle} style={{ fontSize: 40 }} /> */}
                    <Typography variant="body2" align="center" gutterBottom className={classes.textStyle} sx={{marginTop:"15px"}}><b>Su contraseña ha sido restablecida.</b></Typography>
                    <Typography variant="caption" align="justify" paragraph className={classes.textStyle} >
                    Ahora puede iniciar sesión en su cuenta usando su nueva contraseña. Si tiene más preguntas o encuentra algún problema, no dude en ponerse en contacto con nuestro equipo de soporte.
                    </Typography>
                  </Grid>
                  <Grid item xs={12} display="flex" alignItems="center" justifyContent="center" style={{paddingTop:"0px"}}>
                    <Button variant="contained" className={classes.buttonStyle} disableRipple color="primary" onClick={handleFinish}>
                      Ir a la pagina principal
                    </Button>
                  </Grid>
                </Grid>
              ) : (
                <>
                <form>
                  {renderStepContent(activeStep)}
                </form>
                </>
              )}
            </Box>
            {activeStep !== steps.length ? ( 
              <Box>
                <Grid container item direction="row" alignItems="flex-end" justifyContent="flex-end" >
                  {activeStep > 0 ?
                    <Button disableRipple className={classes.buttonStyle} disabled={activeStep === 0} onClick={handleBack} >
                      Volver
                    </Button>
                  : 
                    <Button disableRipple className={classes.buttonStyle} onClick={handleCancel} >
                      Cancelar
                    </Button>
                  }
                  <Button disableRipple className={classes.buttonStyle} disabled={checkFormErrors() || registerData.id==="" || ! isEmailSent || (activeStep===1 && (codeError!=="" || code.inputCode.length < 6 || code.inputCode.length > 6) ) } onClick={handleNext}>
                    {activeStep === steps.length - 1 ? 'Finalizar' : 'Proximo'}
                  </Button>
                </Grid> 
              </Box>
            ): null}
          </Box>
        </Paper>
      </Grow>
    </Grid>
    {/* </Container> */}
    </Grid>
    <DialogModal open={isDialogOpen} onClose={handleDialogClose} severity={dialogOptions.severity} title={dialogOptions.title} buttons={dialogOptions.buttons} action={dialogOptions.action}>
      {dialogOptions.message}
    </DialogModal> 
    <Snackbar
      open={isSnackbarOpen}
      autoHideDuration={3000}
      onClose={handleSnackbarClose}
      message={snackbarText}
    />
    </>
  )
}