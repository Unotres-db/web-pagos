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

export default function FormAddCategory({ open, onClose}){
  const classes = useStyles();
  const { categories, setCategories}= useContext(LoginContext);
  const [ isSnackbarOpen, setIsSnackbarOpen]= useState(false);
  const [ snackbarMessage, setSnackbarMessage] = useState("");
  const [ dialogOptions, setDialogOptions] = useState({severity:"",title:"",message:"",buttons:{}, action:""});
  const [ isDialogOpen, setIsDialogOpen] = useState(false);
  const { handleChange, handleChangeUserId, handleSubmit, chkBlankFormContact, chkBlankFormLogin, chkFormErrors, isValidName, isValidPhone, isValidEmail, noBlanks, isValidUser, isValidPassword, userId, values, transaccion, setTransaccion, proyecto, setProyecto, formErrors, setFormErrors, proveedor, setProveedor, rubro, setRubro } = useForm ();
  const { idRubro, nombre } = rubro 
  const [ isEdit, setIsEdit] = useState(true)// eliminar?
  const { axiosFetch: postCategory} = useAxios(); 

  const handleSnackbarClose=()=>{
    setProveedor (prevState => ({...prevState, 
      idRubro: "",
      nombre: ""
    }))
    setIsSnackbarOpen(false);
    }

    function handleDialogClose(){
      setIsDialogOpen(false)
    }

    // UseAxios catch error useAxios:Cannot read properties of undefined (reading 'localeCompare')
    const handleAddCategory = (newCategory) => {
      const newRegister={id:newCategory.idRubro, label:newCategory.nombrec}
      const updatedCategories = [...categories, newRegister];
      updatedCategories.sort((a, b) => a.label.localeCompare(b.label));
      setCategories(updatedCategories);
    };


  const categorySuccessCb=(apiData)=>{
    const { id } = apiData
    setRubro (prevState => ( {...prevState, idRubro: id}));
    handleAddCategory(rubro)
    setIsEdit(true);
    setSnackbarMessage("Rubro grabado exitosamente en la base de datos")
    setIsSnackbarOpen(true);
  }  

  const categoryErrorCb=()=>{
    alert("Hubo un error en el acceso a la base de datos. Por favor, inténtalo más tarde, gracias!");
  }

  function saveCategory(rubro)  {
    postCategory({ axiosInstance: api, method: 'POST', url: '/rubros', data: rubro, requestConfig: { headers: {'Authorization': "martincsl@hotmail.com",},}},categorySuccessCb, categoryErrorCb);
  }

  const handleCancel=()=>{
    setRubro(prevState => ({...prevState, 
      idRubro: "",
      nombre: ""
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
    if (! checkFormErrors()) {   //&& checkRequiredFields()
      saveCategory(rubro)
    } else {
    //   alert("! checkFormErrors() &&  checkRequiredFields()")
      console.log("Not saved in database")
    }
    onClose();
  };

  useEffect(() => {
    setRubro({idRubro: "", nombre: ""})
    setFormErrors(prevState => ({...prevState, 
      idRubro: "",
      nombre: ""
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
                    label="Nombre del Rubro *"
                    name="nombre"
                    value={nombre}
                    autoComplete="nombre-rubro"
                    onChange={ (e) => {
                      handleChange (e,setRubro,[]);
                    }}
                    error={formErrors.nombre}
                  />
                  {formErrors.nombre ? <div className="error-helper-text">{formErrors.nombre}</div> : null}
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