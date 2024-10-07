import React, { useContext, useState, useEffect} from 'react';

// import { PatternFormat } from 'react-number-format';
import { NumericFormat } from 'react-number-format';

import { Paper, Grid, Dialog, DialogActions, DialogContent, DialogContentText, Box, Tooltip, Button, Typography, TextField, Avatar, useTheme, useMediaQuery, InputAdornment, Snackbar, SnackbarContent } from '@mui/material'
import { makeStyles } from '@material-ui/core/styles';

import api from '../../services/api';
import useAxios from '../../hooks/useAxios'
import useForm from '../../hooks/useForm';
import { LoginContext } from '../../helpers/Context';

import DialogModal from '../../components/DialogModal';


const useStyles = makeStyles((mainTheme) => ({
  paperStyle: {
    width: "100%",   
    marginLeft: "2px",
    marginRight: "2px",
    color: "white",
    // backgroundColor: "#f0f8ff",
    backgroundColor:"cyan",
    padding: "5px",
  },
  greenSnackbarContent: {
    backgroundColor: "#228B22"
  },
}));

export default function FormAddSupplier({ open, onClose}){
  const classes = useStyles();
  const { suppliers, setSuppliers}= useContext(LoginContext);
  const [ isSnackbarOpen, setIsSnackbarOpen]= useState(false);
  const [ snackbarMessage, setSnackbarMessage] = useState("");
  const [ dialogOptions, setDialogOptions] = useState({severity:"",title:"",message:"",buttons:{}, action:""});
  const [ isDialogOpen, setIsDialogOpen] = useState(false);
  const { handleChange, handleChangeUserId, handleSubmit, chkBlankFormContact, chkBlankFormLogin, chkFormErrors, isValidName, isValidPhone, isValidEmail, noBlanks, isValidUser, isValidPassword, userId, values, transaccion, setTransaccion, proyecto, setProyecto, formErrors, setFormErrors, proveedor, setProveedor } = useForm ();
  const { nombre, ruc, direccion } = proveedor 
  // const muiRucProps = { required: false, fullWidth: true, variant :"outlined", margin:"dense", size:"small", label: "Numero de RUC", name: "ruc" };
  const [ isEdit, setIsEdit] = useState(true)// eliminar?
  const { axiosFetch: postSupplier} = useAxios(); 

  const handleSnackbarClose=()=>{
    setProveedor (prevState => ({...prevState, 
      idProveedor: "",
      nombre: "",
      razonSocial: "",
      ruc: "",
      direccion: "",
    }))
    setIsSnackbarOpen(false);
    }

    function handleDialogClose(){
      setIsDialogOpen(false)
    }

    // UseAxios catch error useAxios:Cannot read properties of undefined (reading 'localeCompare')
    const handleAddSuplier = (newSupplier) => {
      const newRegister={id:newSupplier.idProveedor, label:newSupplier.nombre, ruc:newSupplier.ruc}
      const updatedSuppliers = [...suppliers, newRegister];
      updatedSuppliers.sort((a, b) => a.label.localeCompare(b.label));
      setSuppliers(updatedSuppliers);
    };


  const supplierSuccessCb=(apiData)=>{
    const { id } = apiData
    setProveedor (prevState => ( {...prevState, idProveedor: id}));
    handleAddSuplier(proveedor)
    setIsEdit(true);
    setSnackbarMessage("Proveedor grabado exitosamente en la base de datos")
    setIsSnackbarOpen(true);
  }  

  const supplierErrorCb=()=>{
    alert("Hubo un error en el acceso a la base de datos. Por favor, inténtalo más tarde, gracias!");
  }

  function saveSupplier(proveedor)  {
    postSupplier({ axiosInstance: api, method: 'POST', url: '/proveedores', data: proveedor, requestConfig: { headers: {'Authorization': "martincsl@hotmail.com",},}},supplierSuccessCb, supplierErrorCb);
  }

  const handleCancel=()=>{
    setProveedor(prevState => ({...prevState, 
      idProveedor: "",
      nombre: "",
      razonSocial: "",
      ruc: "",
      direccion: "",
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
    // alert("entrou em handleSaveChanges")
    // alert(proveedor.nombre + " " + proveedor.ruc+ " "+proveedor.idProveedor)
    // console.log("proveedor")
    // console.log(proveedor);
    if (! checkFormErrors()) {   //&& checkRequiredFields()
      saveSupplier(proveedor)
    } else {
      alert("! checkFormErrors() &&  checkRequiredFields()")
      console.log("Not saved in database")
    }
    onClose();
  };

  useEffect(() => {
    setProveedor({idProveedor: "", nombre: "", razonSocial: "", ruc: "", direccion: ""})
    setFormErrors(prevState => ({...prevState, 
      idProveedor: "",
      nombre: "",
      razonSocial: "",
      ruc: "",
      direccion: "",
    }))
  }, [ open ]);

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
                    label="Nombre del Proveedor *"
                    name="nombre"
                    value={nombre}
                    autoComplete="nombre-proveedor"
                    onChange={ (e) => {
                      handleChange (e,setProveedor,[]);
                    }}
                    error={formErrors.nombre}
                  />
                  {formErrors.nombre ? <div className="error-helper-text">{formErrors.nombre}</div> : null}
                </Grid>
                <Grid item xs={6} >
                  <TextField variant ="outlined" margin="dense" size="small" fullWidth
                    label="RUC"
                    name="ruc"
                    value={ruc}
                    autoComplete="ruc-proveedor"
                    onChange={ (e) => {
                      handleChange (e,setProveedor,[]);
                    }}
                    error={formErrors.ruc}
                  />
                  {formErrors.ruc ? <div className="error-helper-text">{formErrors.ruc}</div> : null}
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
                    // disabled={checkFormErrors()} 
                    disabled={checkFormErrors() || ! checkRequiredFields()}
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
      // className={classes.greenSnackbarContent}
      style={{backgroundColor:"#228B22"}}
      message={snackbarMessage}
    />
  </Snackbar>   
  <DialogModal open={isDialogOpen} onClose={handleDialogClose} severity={dialogOptions.severity} title={dialogOptions.title} buttons={dialogOptions.buttons} action={dialogOptions.action}>
    {dialogOptions.message}
  </DialogModal>
  </>
  )
}