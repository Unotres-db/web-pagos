import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import { Grid, Paper, Box, Typography, TextField, Button, Grow } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import ContactMailIcon from '@material-ui/icons/ContactMail';

import Header from '../components/Header.js';
// import AlertMessage from '../components/modals/AlertMessage';
import AlertDialog from '../components/modals/AlertDialog';
import api from '../services/api';
import useForm from '../hooks/useForm.js';
import useUnsavedWarning from '../hooks/useUnsavedWarning';

const useStyles = makeStyles( (mainTheme) => ({
  contentStyle: {
    position: 'absolute',
    top: '65px'
  },
  paperStyle: {
    margin: 'auto',
    padding:'10px',
    minWidth: 350,
    maxWidth: 500,
    backgroundColor:mainTheme.palette.secondary.main,  
  },
  buttonStyle:{
    color: "white",
    backgroundColor:mainTheme.palette.primary.main,
    textTransform:"none",
    fontSize:12,
    margin: "10px",
    //marginTop: "15px",
    "&:hover": {
      color:mainTheme.palette.secondary.main,
      backgroundColor:mainTheme.palette.primary.main,
    },
  },
  iconBox:{
    width:'100%',
    textAlign: 'center',
    AlignItems: 'center',
  },
  iconStyle:{
    color: mainTheme.palette.primary.main, 
  },
  formStyle:{
    backgroundColor:'white'
  }
}))

export default function Contact (){
  
  const classes = useStyles();  
  const { handleChange, handleSubmit, chkBlankFormContact, chkFormErrors, isValidName, isValidPhone, isValidEmail, noBlanks, isValidUser, isValidPassword,values, formErrors} = useForm (handleContact);
  const { contactName, contactMobile, contactEmail, contactMsg, userId, userPassword } = values;
  const [ isAlertOpen, setIsAlertOpen ] = useState(false);
  const [ alertMessage, setAlertMessage ] = useState({severity:"",title:"",message:""});
  const [ Prompt, setIsDirty, setIsPristine ] = useUnsavedWarning();
  const history = useHistory();

  const handleAlertClose = () => {
    setIsAlertOpen(false);
    if (alertMessage.severity==="success"){
      history.push('/main');  
    }
  };

  async function handleContact() {
    if (chkBlankFormContact ()){
      setAlertMessage(prevState => ( {...prevState, severity:"warning", title: "Error en entrada de datos", message:"Favor completar los dados marcados como requeridos, gracias!"}));
      setIsAlertOpen(true);
    }  else if (chkFormErrors()) {
        setAlertMessage(prevState => ( {...prevState, severity:"warning", title: "Error en entrada de datos", message:"Favor corregir los dados marcados como incorrectos, gracias!"}));
        setIsAlertOpen(true);
       }  
       else {
        setIsPristine();
        try {
          const data = { contactName, contactMobile, contactEmail, contactMsg } ;
          const response = await api.post('/messages', data );
          setAlertMessage(prevState => ( {...prevState, severity:"success", title: "Mensaje enviado con exito", message: "En la brevedad nos comunicaremos con usted" }));
          setIsAlertOpen(true);
      
        } catch (err) {
            const errorMsg = Object.values(err.response.data);
            setAlertMessage(prevState => ( {...prevState, severity:"warning", title: "Error en inicio de sessión", message: errorMsg }));
            setIsAlertOpen(true);
          }
      }
  }

  return (
    <>
    <Header />

    <Grid container direction="row" alignItems="center" justify="center" className={classes.contentStyle} style={{ minHeight:'85vh'}}>
      <Grid />
      <Grow in timeout = {1000}>
      <Grid item container className={classes.formStyle}>
        <Paper elevation={6} spacing={2} className={classes.paperStyle}>
            <form onSubmit={handleSubmit} noValidate>
              
            <Typography align="center" variant="subtitle1" style={{color:'white'}} gutterBottom>Contact Us</Typography>
            <Box className={classes.iconBox} >
              <ContactMailIcon className={classes.iconStyle} style={{ fontSize: 40 }}/>
            </Box>
            <Grid item xs={12}> 
              <TextField id="contactName" label="Name *" 
                variant ="filled" margin="dense" size="small" fullWidth  
                name="contactName" value={contactName} 
                onChange={ (e) => {
                  handleChange (e,[noBlanks]);
                  setIsDirty();
                }}
                error={formErrors.contactName} ></TextField>
                {formErrors.contactName ? <div className="error-helper-text">{formErrors.contactName}</div> : null}
            </Grid>
            <Grid item xs={12} md={9}> 
              <TextField id="contactMobile" label="Phone"
                variant ="filled" margin="dense" size="small" fullWidth
                name="contactMobile" value={values.contactMobile} 
                onChange={ (e) => {
                  handleChange (e,[noBlanks]);
                  setIsDirty();
                }}
                error={formErrors.contactMobile}></TextField>
                {formErrors.contactMobile ? <div className="error-helper-text">{formErrors.contactMobile}</div> : null}
            </Grid>  
            <Grid item xs={12}>
            <TextField id="contactEmail" label="E-mail *" 
              variant ="filled" margin="dense" size="small" fullWidth 
              name="contactEmail" value={values.contactEmail} 
              onChange={ (e) => {
                handleChange (e,[noBlanks]);
                setIsDirty();
              }}
              onBlur = { (e) => { handleChange (e,[isValidEmail])}}
              error={formErrors.contactEmail}></TextField>
              {formErrors.contactEmail ? <div className="error-helper-text">{formErrors.contactEmail}</div> : null}
            </Grid>
            <Grid item xs={12}>
              <Typography align="left" variant="subtitle1" style={{color:'white'}} gutterBottom>Message *</Typography>
              <div>
                <textarea name="contactMsg" placeholder="Write your message" rows="4" 
                  onChange={ (e) => {
                    handleChange (e,[noBlanks]);
                    setIsDirty();
                  }}
                ></textarea>
                {formErrors.contactMsg ? <div className="error-helper-text">{formErrors.contactMsg}</div> : null}
              </div>
            </Grid>
            <Grid container direction="row" alignItems="center" justify="center"> 
              <Button type="submit" className={classes.buttonStyle} variant="outlined" disableRipple >Send Message</Button>
            </Grid>
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
    <AlertDialog open={isAlertOpen} onClose={handleAlertClose} severity={alertMessage.severity} title={alertMessage.title}>
      {alertMessage.message}
    </AlertDialog>
    </>
  )
}