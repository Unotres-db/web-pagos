import React, { useContext, useState, useEffect} from 'react';

import { Paper, Grid, Dialog, DialogActions, DialogContent, DialogContentText, Box, Tooltip, Button, Typography, TextField, Avatar, useTheme, useMediaQuery, InputAdornment, Snackbar, SnackbarContent } from '@mui/material'
import { makeStyles } from '@material-ui/core/styles';

import api from '../../services/api';
import useAxios from '../../hooks/useAxios'
import useForm from '../../hooks/useForm';

import DialogModal from '../../components/DialogModal';

const useStyles = makeStyles((mainTheme) => ({

  // root: {
  //   display: 'flex',
  //   alignItems: 'center',
  //   justifyContent: 'center',
  //   height: '100vh', 
  //   flexGrow: 1,
  // },
  paperStyle: {
    width: "100%",   
    marginLeft: "2px",
    marginRight: "2px",
    color: "white",
    // backgroundColor: "#f0f8ff",
    backgroundColor:"cyan",
    padding: "5px",
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
}));

export default function FormAddSupplier({ open, onClose}){
  const classes = useStyles();
  const [ isSnackbarOpen, setIsSnackbarOpen]= useState(false);
  const [ snackbarMessage, setSnackbarMessage] = useState("");
  const [ dialogOptions, setDialogOptions] = useState({severity:"",title:"",message:"",buttons:{}, action:""});
  const [ isDialogOpen, setIsDialogOpen] = useState(false);
  const { handleChange, handleChangeUserId, handleSubmit, chkBlankFormContact, chkBlankFormLogin, chkFormErrors, isValidName, isValidPhone, isValidEmail, noBlanks, isValidUser, isValidPassword, userId, values, transaccion, setTransaccion, proyecto, setProyecto, formErrors, setFormErrors } = useForm ();
  const { 
    nombre,
    ruc,
    direccion,
  } = proyecto //proveedor 

 const handleSnackbarClose=()=>{
   setIsSnackbarOpen(false);
  }

  function handleDialogClose(){
    setIsDialogOpen(false)
  }

  async function saveSupplier(proveedor)  {
   // revisar =ruta
    return api.post('/proveedores', proveedor)
      .then(response => {
        const { idTransaccion: id } = response.data;  
        setIsEdit(true);
        setSnackbarMessage("Proveedor grabado exitosamente en la base de datos")
        setIsSnackbarOpen(true);
      })
      .catch(function (err) {
        if (err.response) {
          const errorMsg = Object.values(err.response.data);
          alert("Hubo un error en el acceso a la base de datos. Por favor, inténtalo más tarde, gracias!");
        } else if (err.request) {
          alert("Hubo un error en el acceso a la base de datos. Por favor, inténtalo más tarde, gracias!");
        } else {
          alert("Hubo un error en el acceso a la base de datos. Por favor, inténtalo más tarde, gracias!");
        }
      });
  }

  const handleCancel=()=>{
    setProyecto(prevState => ({...prevState, 
      idProveedor: "",
      nombre: "",
      ruc:"",
      direccion:""
    }))
    onClose()
  }

  const handleKeyDown = (event) => {
    if (event.key === 'Escape') {
      handleCancel();
    }
  };

  const checkFormErrors=()=>{
    if (formErrors.nombre !==""){
      return true
    }
    return false
  }

  function checkRequiredFields(){
    if (nombre !==""){
      return true
    } 
    return false
  }

  const handleSaveChanges = async () => {
    if (! checkFormErrors() ) {
      saveProject(proyecto)
      setProyecto (prevState => ({...prevState, 
        idProyecto: "",
        nombre: "",
        descripcion:"",
        metrosCuadrados:"",
        margenEstimado: "",
      }))
      onClose();
    } else {
      console.log("Not saved in database")
    }
  };

  return (
    <>
      <Paper className={classes.paperStyle}>
        <Dialog 
          open={open}
          onClose={onClose}
          onKeyDown={handleKeyDown}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          fullWidth={true}
          maxWidth={"xs"}
          >
            <DialogContent style={{color:'white'}}>
              <DialogContentText id="alert-dialog-description">
                <Typography align='center'>{`Incluir Nuevo Proveedor`}</Typography>

                <Box sx={{height:"10px"}}/>
                <Grid container spacing={1}>

                <Grid item xs={12} >
                  <TextField variant ="outlined" margin="dense" size="small" fullWidth
                    label="Nombre del Proveedor"
                    name="nombre"
                    value={nombre}
                    autoComplete="nombre-proyecto"
                    onChange={ (e) => {
                      handleChange (e,setProyecto,[noBlanks]);
                    }}
                    error={formErrors.nombre}
                  />
                  {formErrors.nombre ? <div className="error-helper-text">{formErrors.nombre}</div> : null}
                </Grid>
               
                <Grid item xs={12} sm={12}>
                  <TextField variant ="outlined" margin="dense" size="small" fullWidth
                    label="Descripción del Proyecto"
                    name="descripcion"
                    value={descripcion}
                    autoComplete="descripcion"
                    multiline
                    rows={3}
                    onChange={ (e) => {
                      handleChange (e,setTransaccion,[noBlanks]);
                    }}
                    error={formErrors.descripcion}
                  />
                  {formErrors.descripcion ? <div className="error-helper-text">{formErrors.descripcion}</div> : null}
                </Grid>

                <Grid item xs={6} sm={6}>
                  <TextField variant ="outlined" margin="dense" size="small" fullWidth
                    label="RUC"
                    name="ruc"
                    value={ruc}
                    autoComplete="ruc"
                    onChange={ (e) => {
                      handleChange (e,setProyecto,[noBlanks]);
                    }}
                    error={formErrors.ruc}
                  />
                  {formErrors.ruc ? <div className="error-helper-text">{formErrors.ruc}</div> : null}
                </Grid>

                <Grid item xs={6} sm={6}>
                  <TextField variant ="outlined" margin="dense" size="small" fullWidth
                    label="Direccion"
                    name="direccion"
                    value={direccion}
                    autoComplete="compromargen-estimado"
                    onChange={ (e) => {
                      handleChange (e,setProyecto,[noBlanks]);
                    }}
                    error={formErrors.direccion}
                  />
                  {formErrors.direccion ? <div className="error-helper-text">{formErrors.direccion}</div> : null}
                </Grid>
                </Grid>
              </DialogContentText>
            </DialogContent>
            <DialogActions >
              <Grid container direction="row"  >
                <Grid item xs={6} style={{textAlign:'right'}} >
                  <Button disableRipple style={{margin:'2px', color:"#344955",backgroundColor:"#E1C16E",textTransform:"none",width:"75px"}}  onClick={handleCancel} variant="contained" size="small"  >
                    Cancelar</Button>
                </Grid>
                <Grid item xs={6} style={{textAlign:'left'}} >

                  <Button disableRipple sx={{
                    margin: '2px',
                    color: "#344955",
                    backgroundColor: "#E1C16E",
                    textTransform: "none",
                    width: "75px",
                    '&:hover': {
                      backgroundColor: '#E8C797', // Adjust the hover color as desired
                    },
                    '&:disabled': {
                      color: "black",
                      backgroundColor: '#BDBDBD', // Adjust the disabled color as desired
                      cursor: 'not-allowed', // Disable cursor interaction
                      opacity: 0.5, // Make the button appear disabled
                    },}} 
                    // disabled={checkFormErrors() || ! checkRequiredFields()} 
                    disabled
                    onClick={handleSaveChanges} 
                    variant="contained" size="small" >
                    Grabar</Button>
                </Grid>
              </Grid> 
              <Box style={{height: "60px"}}/>
            </DialogActions>
        </Dialog>
  </Paper>
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
  <DialogModal open={isDialogOpen} onClose={handleDialogClose} severity={dialogOptions.severity} title={dialogOptions.title} buttons={dialogOptions.buttons} action={dialogOptions.action}>
    {dialogOptions.message}
  </DialogModal>
  </>
  )
}