import React, { useContext, useState, useEffect} from 'react';

import { Paper, Grid, Dialog, DialogActions, DialogContent, DialogContentText, Box, Tooltip, Button, Typography, TextField, Avatar, useTheme, useMediaQuery } from '@mui/material'
import { makeStyles } from '@material-ui/core/styles';

import api from '../../services/api';
import useAxios from '../../hooks/useAxios'
import useForm from '../../hooks/useForm';
import RubrosAutoComplete from '../../components/RubrosAutoComplete';
import RubrosComboBox from '../../components/RubrosComboBox';

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
    // backgroundColor: "#f0f8ff",
    backgroundColor:"cyan",
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

export default function FormAddTransaction({ open, onClose }){
  const classes = useStyles();
  const [ rubros, setRubros] = useState([]);
  const [ proveedores, setProveedores ] = useState([]);
  const [ isEditField, setIsEditField] = useState(true)// eliminar?

  const { handleChange, handleChangeUserId, handleSubmit, chkBlankFormContact, chkBlankFormLogin, chkFormErrors, isValidName, isValidPhone, isValidEmail, noBlanks, isValidUser, isValidPassword, userId, values, transaccion, setTransaccion, formErrors } = useForm ();
  const { 
    idTransaccion,
    idProyecto, 
    idProveedor, 
    nombreProveedor,
    idRubro, 
    nombreRubro,
    idTipoTransaccion, 
    descripcion, 
    numeroFactura, 
    fechaFactura, 
    timbradoFactura, 
    montoFactura,
    comprobantePago,
    fechaPago,
    idTipoPago,
    idTipoFlujo } = transaccion
    const objetoRubro = {idRubro: "4", nombreRubro: "Artefactos Electricos"}
    // Artefactos Electricos
  const { axiosFetch: getRubros, isLoading: isLoadingRubros, error: isErrorRubros } = useAxios();
  const { axiosFetch: getProveedores, isLoading: isLoadingProveedores, error: isErrorProveedores } = useAxios();


  const handleCancel=()=>{
    onClose()
  }

  const handleKeyDown = (event) => {
    if (event.key === 'Escape') {
      handleCancel();
    }
  };


  const getProveedoresSuccessCb=(apiData)=>{
    if (apiData){
      setProveedores(apiData)
    }
  }

  const getProveedoresErrorCb=()=>{
    alert ("Error leyendo Proveedores desde la base de datos")
  }

  const getRubrosSuccessCb=(apiData)=>{
    if (apiData){
      setRubros(apiData)
      getProveedores({ axiosInstance: api, method: 'GET', url: `/proveedores`, requestConfig: { headers: {'Authorization': "id",},}},getProveedoresSuccessCb, getProveedoresErrorCb);
    }
  }

  const getRubrosErrorCb=()=>{
    alert ("Error leyendo Rubros desde la base de datos")
  }

  useEffect(() => {
    getRubros({ axiosInstance: api, method: 'GET', url: `/rubros`, requestConfig: { headers: {'Authorization': "id",},}},getRubrosSuccessCb, getRubrosErrorCb);
  }, [ open ]);

  return (
    <>
    { proveedores ? <>
   
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
                <Typography align='center'>{`Incluir Factura`}</Typography>

                <Box sx={{height:"10px"}}/>
                <Grid container spacing={1}>

                <Grid item xs={12}>
                  {/* <RubrosAutoComplete 
                    objetoRubro={objetoRubro}
                    transaccion={transaccion}
                    setTransaccion={setTransaccion}
                    isEditField={isEditField}
                    setIsEditField={setIsEditField}
                    variant="filled"
                  />
                </Grid> */}

                <RubrosComboBox 
                    objetoRubro={objetoRubro}
                    transaccion={transaccion}
                    setTransaccion={setTransaccion}
                    isEditField={isEditField}
                    setIsEditField={setIsEditField}
                    variant="filled"
                  />
                </Grid>

                  
                  <Grid item xs={12} sm={6}>
                    <TextField  variant ="outlined" margin="dense" size="small" fullWidth
                      label="Fecha Factura"
                      name="fechaFactura"
                      value={fechaFactura}
                      autoComplete="fecha-factura"
                      onChange={ (e) => {
                        handleChange (e,setTransaccion,[noBlanks]);
                      }}
                      error={formErrors.fechaFactura}
                    />
                    {formErrors.fechaFactura ? <div className="error-helper-text">{formErrors.fechaFactura}</div> : null}
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField variant ="outlined" margin="dense" size="small" fullWidth
                      label="Numero Factura"
                      name="numeroFactura"
                      value={numeroFactura}
                      autoComplete="numero-factura"
                      onChange={ (e) => {
                        handleChange (e,setTransaccion,[noBlanks]);
                      }}
                      error={formErrors.numeroFactura}
                    />
                    {formErrors.numeroFactura ? <div className="error-helper-text">{formErrors.numeroFactura}</div> : null}
                  </Grid>
                  {/* <Grid item xs={12} sm={12} >
                    <CountryAutocomplete 
                      countryObject={countryObject} 
                      registerData={registerData}
                      setRegisterData={setRegisterData}
                      isEditField={isEditField} 
                      setIsEditField={setIsEditField}
                    />
                  </Grid> */}
                  <Grid item xs={6} sm={6}>
                    <TextField variant ="outlined" margin="dense" size="small" fullWidth
                      label="Monto Factura"
                      name="montoFactura"
                      value={montoFactura}
                      autoComplete="monto-factura"
                      onChange={ (e) => {
                        handleChange (e,setTransaccion,[noBlanks]);
                     // handleChange (e,setRegisterData,[isValidName]);
                      }}
                      error={montoFactura}
                    />
                    {montoFactura ? <div className="error-helper-text">{montoFactura}</div> : null}
                  </Grid>
                  <Grid item xs={12} sm={12}>
                    <TextField variant ="outlined" margin="dense" size="small" fullWidth
                      label="Descripcion"
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
                      label="Fecha Pago"
                      name="fechaPago"
                      value={fechaPago}
                      autoComplete="fecha-pago"
                      onChange={ (e) => {
                        handleChange (e,setTransaccion,[noBlanks]);
                     // handleChange (e,setRegisterData,[isValidName]);
                      }}
                      error={fechaPago}
                    />
                    {fechaPago ? <div className="error-helper-text">{fechaPago}</div> : null}
                  </Grid>
                  <Grid item xs={6} sm={6}>
                    <TextField variant ="outlined" margin="dense" size="small" fullWidth
                      label="Comprobante de Pago"
                      name="comprobantePago"
                      value={comprobantePago}
                      autoComplete="fecha-pago"
                      onChange={ (e) => {
                        handleChange (e,setTransaccion,[noBlanks]);
                     // handleChange (e,setRegisterData,[isValidName]);
                      }}
                      error={comprobantePago}
                    />
                    {comprobantePago ? <div className="error-helper-text">{comprobantePago}</div> : null}
                  </Grid>
                </Grid>
              </DialogContentText>
            </DialogContent>
            <DialogActions >
              <Grid container direction="row"  >
                <Grid item xs={6} style={{textAlign:'right'}} >
                  <Button disableRipple className={classes.buttonStyle} onClick={handleCancel} variant="contained" size="small"  style={{margin:'2px', color:"#344955",backgroundColor:"#E1C16E",textTransform:"none"}}>
                    Cancelar</Button>
                </Grid>
                <Grid item xs={6} style={{textAlign:'left'}} >
                  <Button disableRipple className={classes.buttonStyle} variant="contained" size="small"  style={{margin:'2px', color:"#344955",backgroundColor:"#E1C16E",textTransform:"none"}} >
                    Grabar</Button>
                </Grid>
              </Grid> 
              <Box style={{height: "60px"}}/>
            </DialogActions>
        </Dialog>
  </Paper>
    
  </>: null}
  </>
  )

}