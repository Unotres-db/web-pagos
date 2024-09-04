import React, { useContext, useState, useEffect} from 'react';

import { parse, format, isValid } from 'date-fns';
import { es } from 'date-fns/locale';

import { PatternFormat } from 'react-number-format';
import { NumericFormat } from 'react-number-format';

import { Paper, Grid, Dialog, DialogActions, DialogContent, DialogContentText, Box, Tooltip, Button, Typography, TextField, Avatar, useTheme, useMediaQuery, InputAdornment } from '@mui/material'
import { makeStyles } from '@material-ui/core/styles';

// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import { DatePicker } from '@mui/x-date-pickers/DatePicker';   
// import { esES } from '@mui/x-date-pickers/locales';   

import api from '../../services/api';
import useAxios from '../../hooks/useAxios'
import useForm from '../../hooks/useForm';

import DialogModal from '../../components/DialogModal';
import RubrosAutoComplete from '../../components/RubrosAutoComplete';
import RubrosComboBox from '../../components/RubrosComboBox';
import SuppliersAutocomplete from '../../components/SuppliersAutocomplete';
import PaymentAutocomplete from '../../components/PaymentAutocomplete';

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
    textTransform: 'none',
    width:"75px"
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
  const [ dialogOptions, setDialogOptions] = useState({severity:"",title:"",message:"",buttons:{}, action:""});
  const [ isDialogOpen, setIsDialogOpen] = useState(false);
  const { handleChange, handleChangeUserId, handleSubmit, chkBlankFormContact, chkBlankFormLogin, chkFormErrors, isValidName, isValidPhone, isValidEmail, noBlanks, isValidUser, isValidPassword, userId, values, transaccion, setTransaccion, formErrors } = useForm ();
  const { 
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
    const supplierObject = {id: "0", label: ""}
    const paymentObject = {id: "0", label: ""}

  const { axiosFetch: getRubros, isLoading: isLoadingRubros, error: isErrorRubros } = useAxios();
  const { axiosFetch: getProveedores, isLoading: isLoadingProveedores, error: isErrorProveedores } = useAxios();
  const muiMontoFacturaProps = { required: true, fullWidth: true, variant :"outlined", margin:"dense", size:"small", label: "Monto Factura", name: "montoFactura",InputProps: {startAdornment: <InputAdornment position="start">Gs.</InputAdornment> }};
  const muiFechaFacturaProps = { required: true, fullWidth: true, variant :"outlined", margin:"dense", size:"small", label: "Fecha Factura", name: "fechaFactura" };

  const validateInvoiceDate = (date) => {
    
    // Check if date is empty
    if (!date.value) {
      return false;
    }
  
    // Check if date is not yet complete (less than 6 characters)
    if (date.value.length < 6) {
      return true; // Incomplete date is considered valid for the purpose of this validation
    }
  
    // Parse the date in the "31/12/2023" format
    const parsedDate = new Date(date.formattedValue.split('/').reverse().join('-'));
    const parsedDateTest = parse('date.formattedValue', 'P', new Date(), { locale: es });

    // Check if parsing was successful
    if (isNaN(parsedDate)) {
      return false; // Invalid date format
    }

    if (!isValid(parsedDateTest)) {
      setDialogOptions({severity:"alert", title:"Ojo Diana", message:"La fecha incluida es invalida",buttons:{button1:"Ok"}})
      setIsDialogOpen(true)
      return false; 
    }
  
    // Get current date in UTC
    const currentDate = new Date();
    const currentUTCTime = currentDate.getTime() + currentDate.getTimezoneOffset() * 60000;
    const currentUTCDate = new Date(currentUTCTime);
  
    // Format dates for comparison
    const formattedParsedDate = format(parsedDate, 'yyyy-MM-dd');
    const formattedCurrentUTCDate = format(currentUTCDate, 'yyyy-MM-dd');
  
    // Check if date is equal to or lower than today (UTC)
    if (formattedParsedDate > formattedCurrentUTCDate) {
      // alert("Confirma fecha posterior a la fecha de hoy?")
      setDialogOptions({severity:"warning", title:"Atención", message:"La fecha incluida es posterior a la fecha de hoy. Favor verificar, gracias!",buttons:{button1:"Ok"}})
      setIsDialogOpen(true)
      return false;
    }
  
    // Check if date is from current or previous month of the current year (UTC)
    const parsedDateYear = format(parsedDate, 'yyyy');
    const currentUTCYear = format(currentUTCDate, 'yyyy');
    const parsedDateMonth = format(parsedDate, 'MM');
    const currentUTCMonth = format(currentUTCDate, 'MM');
    if (parsedDateYear < currentUTCYear || (parsedDateYear === currentUTCYear && parsedDateMonth < currentUTCMonth - 1)) {
      // alert("Confirma fecha de factura inferior al mes anterior?")
      setDialogOptions({severity:"warning", title:"Atención", message:"La fecha incluida no es reciente. Favor verificar, gracias!",buttons:{button1:"Ok"}})
      setIsDialogOpen(true)
      return false;
    }
    return true;
  };

  function handleDialogClose(){
    setIsDialogOpen(false)
  }

  function handleAmount (newValue){
    setTransaccion(prevState => ({...prevState, montoFactura: newValue.floatValue}))
  }

  function handleInvoiceDate (newValue){
    if (validateInvoiceDate(newValue)){
      setTransaccion(prevState => ({...prevState, fechaFactura: newValue.formattedValue}))
    }
  }

  async function saveTransaction(transaccion)  {
    return api.post('/transacciones', transaccion)
      .then(response => {
        const { idTransaccion: id } = response.data;  // solo recibe el id del backend
        setTransaccion (prevState => ( {...prevState, idTransaccion: id }));
        console.log("grabando transaccion")
        console.log(transaccion)
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
    // setRegisterData (prevState => ({...prevState, id:userId, password: userPassword, firstName:userFirstName, lastName:userLastName, phone:userPhone, birthday: userBirthday, country:userCountry, countryName:userCountryName, description: userDescription}))
    setTransaccion(prevState => ({...prevState, 
      idProyecto:"", 
      idProveedor:"", 
      // nombreProveedor:"",
      idRubro:"", 
      // nombreRubro:"",
      idTipoTransaccion:"", 
      descripcion:"", 
      numeroFactura:"", 
      fechaFactura:"", 
      timbradoFactura:"", 
      montoFactura:"",
      comprobantePago:"",
      fechaPago:"",
      idTipoPago:"",
      nombreTipoPago:"",
      idTipoFlujo:""
    }))
    onClose()
  }

  const handleKeyDown = (event) => {
    if (event.key === 'Escape') {
      handleCancel();
    }
  };

  const checkFormErrors=()=>{
    if (formErrors.fechaFactura !=="" || formErrors.numeroFactura !=="" || formErrors.montoFactura !=="" ){
      return true
    }
    return false
  }

  const handleSaveChanges = async () => {
    
    if (! checkFormErrors() ) {
      // saveTransaction(transaccion)
      console.log("checkFormErrors "+transaccion)
      console.log(transaccion)
      // onClose(); // Cierra el FormEditProfile
    } else {
      //Refactorar...Crear error handler
      console.log("Not saved in database")
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
                <Grid item xs={12} >
                  <SuppliersAutocomplete 
                    supplierObject={supplierObject}
                    transaccion={transaccion}
                    setTransaccion={setTransaccion}
                    isEditField={isEditField}
                    setIsEditField={setIsEditField}
                    variant="filled"
                  />
                </Grid> 

                <Grid item xs={12} >
                  <RubrosComboBox 
                    objetoRubro={objetoRubro}
                    transaccion={transaccion}
                    setTransaccion={setTransaccion}
                    isEditField={isEditField}
                    setIsEditField={setIsEditField}
                    variant="filled"
                  />
                </Grid>


                {/* <Grid item xs={12} >
                  <LocalizationProvider locale={esES}>
                    <DatePicker
                      label="Fecha Factura"
                      value={fechaFactura}
                      onChange={ (e) => {
                        handleChange (e,setTransaccion,[noBlanks]);
                      }}
                      format="dd/MM/yyyy"
                    />
                  </LocalizationProvider>
                </Grid> */}
                
                  <Grid item xs={6} sm={6}>
                  <PatternFormat
                        format="##/##/####"
                        allowEmptyFormatting mask="_"
                        value={fechaFactura}
                        customInput={TextField}
                        onValueChange={(e) => {
                          handleInvoiceDate (e)}}
                        // onValueChange={ (e) => {
                        //   handleChange (e,setTransaccion,[noBlanks]);
                        // }}
                        {...muiFechaFacturaProps}
                      />
                      
                    {formErrors.fechaFactura ? <div className="error-helper-text">{formErrors.fechaFactura}</div> : null}
                  </Grid>
                  <Grid item xs={6} sm={6}>
                    <NumericFormat
                        value={montoFactura}
                        customInput={TextField}
                        allowNegative={false}
                        onValueChange={(e) => {handleAmount (e)}}
                        // onValueChange={ (e) => {
                        //   handleChange (e,setTransaccion,[noBlanks]);
                        // }}
                        thousandSeparator="."
                        decimalSeparator=","
                        {...muiMontoFacturaProps}
                      />
                  </Grid>
                  <Grid item xs={6} sm={6}>


                  </Grid>
                  {/* <Grid item xs={6} sm={6}>
                    <TextField variant ="outlined" margin="dense" size="small" fullWidth
                      label="Monto Factura"
                      name="montoFactura"
                      value={montoFactura}
                      autoComplete="monto-factura"
                      onChange={ (e) => {
                        handleChange (e,setTransaccion,[noBlanks]);
                      }}
                      error={formErrors.montoFactura}
                    />
                    {formErrors.montoFactura ? <div className="error-helper-text">{formErrors.montoFactura}</div> : null}
                  </Grid> */}
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
                  <Grid item xs={12} >
                  <PaymentAutocomplete 
                    paymentObject={paymentObject}
                    transaccion={transaccion}
                    setTransaccion={setTransaccion}
                    isEditField={isEditField}
                    setIsEditField={setIsEditField}
                    variant="filled"
                  />
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
                      error={formErrors.fechaPago}
                    />
                    {formErrors.fechaPago ? <div className="error-helper-text">{formErrors.fechaPago}</div> : null}
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
                      error={formErrors.comprobantePago}
                    />
                    {formErrors.comprobantePago ? <div className="error-helper-text">{formErrors.comprobantePago}</div> : null}
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
                  <Button disableRipple className={classes.buttonStyle} onClick={handleSaveChanges} variant="contained" size="small"  style={{margin:'2px', color:"#344955",backgroundColor:"#E1C16E",textTransform:"none"}} >
                    Grabar</Button>
                </Grid>
              </Grid> 
              <Box style={{height: "60px"}}/>
            </DialogActions>
        </Dialog>
  </Paper>
  <DialogModal open={isDialogOpen} onClose={handleDialogClose} severity={dialogOptions.severity} title={dialogOptions.title} buttons={dialogOptions.buttons} action={dialogOptions.action}>
    {dialogOptions.message}
  </DialogModal>
    
  </>: null}
  </>
  )

}