import React, { useContext, useState, useEffect} from 'react';

import { format, isValid, parse } from 'date-fns';
// import { es } from 'date-fns/locale';

import { PatternFormat } from 'react-number-format';
import { NumericFormat } from 'react-number-format';

import { Paper, Grid, Dialog, DialogActions, DialogContent, DialogContentText, Box, Tooltip, Button, Typography, TextField, Avatar, useTheme, useMediaQuery, InputAdornment, Snackbar, SnackbarContent } from '@mui/material'
import { makeStyles } from '@material-ui/core/styles';

// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import { DatePicker } from '@mui/x-date-pickers/DatePicker';   
// import { esES } from '@mui/x-date-pickers/locales';   

import { LoginContext } from '../../helpers/Context';
import api from '../../services/api';
import useAxios from '../../hooks/useAxios'
import useForm from '../../hooks/useForm';

import CashFlowTypeAutocomplete from '../../components/CashFlowTypeAutocomplete';
import CategoriesAutocomplete from '../../components/CategoriesAutocomplete';
import DialogModal from '../../components/DialogModal';
import RubrosAutoComplete from '../../components/RubrosAutoComplete';
import RubrosComboBox from '../../components/RubrosComboBox';
import SuppliersAutocomplete from '../../components/SuppliersAutocomplete';
import SuppliersListByProject from '../../components/SuppliersListByProject';
import PaymentAutocomplete from '../../components/PaymentAutocomplete';

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

export default function FormAddTransaction({ open, onClose, id, isEdit, setIsEdit }){
  const classes = useStyles();
  const { suppliers, setSuppliers, categories, setCategories, cashFlowType, setCashFlowType } = useContext(LoginContext)
  const [ supplierSearchId, setSuppliersSearchId]= useState("");
  const [ categorySearchId, setCategorySearchId]= useState("");
  const [ isSnackbarOpen, setIsSnackbarOpen]= useState(false);
  const [ snackbarMessage, setSnackbarMessage] = useState("");
  const [ isEditField, setIsEditField] = useState(true)// eliminar?
  const [ dialogOptions, setDialogOptions] = useState({severity:"",title:"",message:"",buttons:{}, action:""});
  const [ isDialogOpen, setIsDialogOpen] = useState(false);
  const { handleChange, handleChangeUserId, handleSubmit, chkBlankFormContact, chkBlankFormLogin, chkFormErrors, isValidName, isValidPhone, isValidEmail, noBlanks, isValidUser, isValidPassword, userId, values, transaccion, setTransaccion, formErrors, setFormErrors } = useForm ();
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
    const objetoRubro = {idRubro: "0", nombreRubro: ""}
    const cashFlowObject={id:"0", label:""}
    const categoryObject = {id: "0", label: ""}
    const supplierObject = {id: "0", label: ""}
    const paymentObject = {id: "0", label: ""}

  const { axiosFetch: getFactura, isLoading: isLoadingFactura, error: isErrorFactura } = useAxios();
  const muiMontoFacturaProps = { required: true, fullWidth: true, variant :"outlined", margin:"dense", size:"small", label: "Monto Factura", name: "montoFactura",InputProps: {startAdornment: <InputAdornment position="start">Gs.</InputAdornment> }};
  const muiNumeroFacturaProps = { required: true, fullWidth: true, variant :"outlined", margin:"dense", size:"small", label: "Numero Factura", name: "numeroFactura" };
  const muiFechaFacturaProps = { required: true, fullWidth: true, variant :"outlined", margin:"dense", size:"small", label: "Fecha Factura", name: "fechaFactura" };
  const muiFechaPagoProps = { required: true, fullWidth: true, variant :"outlined", margin:"dense", size:"small", label: "Fecha de pago", name: "fechaPago" };

  const handleSnackbarClose=()=>{
   setIsSnackbarOpen(false);
  }

  function convertDateToUTC(dateString) {
    // Split the date string into day, month, and year parts
    const [day, month, year] = dateString.split('/');
  
    // Create a new Date object in local time
    const localDate = new Date(year, month - 1, day); // Month is 0-based
  
    // Create a new Date object with the desired UTC values
    const utcDate = new Date(Date.UTC(year, month - 1, day, 0, 0, 0, 0));
  
    // Convert the UTC date to a string
    // const utcDateString = utcDate.toISOString();
  
    return utcDate;
  }


  function convertToMilliseconds(dateString) {
    // Split the date string into day, month, and year parts
    const [day, month, year] = dateString.split('/');
  
    // Create a new Date object in local time (adjust month to 0-based index)
    const localDate = new Date(year, month - 1, day);
  
    // Check if the parsed date is valid
    if (isNaN(localDate.getTime())) {
      return null; // Invalid date format
    }
  
    // Convert the local date to UTC milliseconds
    const utcMilliseconds = localDate.getTime() + localDate.getTimezoneOffset() * 60000;
  
    return utcMilliseconds;
  }


  const validateInvoiceDate = (date) => {
    
    // Check if date is empty
    if (!date.value) {
      return false;
    }
  
    // Check if date is not yet complete (less than 8 characters)
    if (date.value.length < 8) {
      return true; // Incomplete date is considered valid for the purpose of this validation
    }
  
    const parsedDate = new Date(date.formattedValue.split('/').reverse().join('/'));

    if (isNaN(parsedDate)) {
      setFormErrors (prevState => ( {...prevState, fechaFactura: "Fecha Invalida"}));
      setDialogOptions({severity:"error", title:"Error", message:"La fecha incluida es invalida. Favor corregir, gracias!",buttons:{button1:"Ok"}})
      setIsDialogOpen(true)
      return false; // Invalid date format
    }
    if (!isValid(parsedDate)) {
      setFormErrors (prevState => ( {...prevState, fechaFactura: "Fecha Invalida"}));
      setDialogOptions({severity:"error", title:"Error", message:"La fecha incluida es invalida. Favor corregir, gracias!",buttons:{button1:"Ok"}})
      setIsDialogOpen(true)
      return false; 
    }
    
    if (formErrors.fechaFactura){
      setFormErrors (prevState => ( {...prevState, fechaFactura: ""}));
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

  const validatePaymentDate = (date) => {
    
    // Check if date is empty
    if (!date.value) {
      return false;
    }
  
    // Check if date is not yet complete (less than 8 characters)
    if (date.value.length < 8) {
      return true; // Incomplete date is considered valid for the purpose of this validation
    }
  
    const parsedDate = new Date(date.formattedValue.split('/').reverse().join('/'));

    if (isNaN(parsedDate)) {
      setFormErrors (prevState => ( {...prevState, fechaPago: "Fecha Invalida"}));
      setDialogOptions({severity:"error", title:"Error", message:"La fecha incluida es invalida. Favor corregir, gracias!",buttons:{button1:"Ok"}})
      setIsDialogOpen(true)
      return false; // Invalid date format
    }
    if (!isValid(parsedDate)) {
      setFormErrors (prevState => ( {...prevState, fechaPago: "Fecha Invalida"}));
      setDialogOptions({severity:"error", title:"Error", message:"La fecha incluida es invalida. Favor corregir, gracias!",buttons:{button1:"Ok"}})
      setIsDialogOpen(true)
      return false; 
    }
    
    if (formErrors.fechaFactura){
      setFormErrors (prevState => ( {...prevState, fechaPago: ""}));
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

  function getInvoiceSuccessCb(){
    // setTransaccion(prevState => ({...prevState, numeroFactura: newValue.formattedValue}))
  }

  function getInvoiceErrorCb(){
    setTransaccion(prevState => ({...prevState, numeroFactura: ""}))
    setDialogOptions({severity:"error", title:"Error", message:"La factura ya esta cargada en el sistema. Favor corregir, gracias!",buttons:{button1:"Ok"}})
    setIsDialogOpen(true)
  }

  function handleInvoiceNumber (newValue){
    if(newValue){
      if (newValue.value.length===13){
        getFactura({ axiosInstance: api, method: 'GET', url: `/factura?id_proveedor=${transaccion.idProveedor}&numero_factura=${newValue.formattedValue}`, requestConfig: { headers: {'Authorization': "id",},}},getInvoiceSuccessCb, getInvoiceErrorCb);
      }
      setTransaccion(prevState => ({...prevState, numeroFactura: newValue.formattedValue}))
    }
  }

  function handlePaymentDate (newValue){
    if (validatePaymentDate(newValue)){
      setTransaccion(prevState => ({...prevState, fechaPago: newValue.formattedValue}))
    }
  }

  async function saveTransaction(transaccion)  {
    return api.post('/transacciones', transaccion)
      .then(response => {
        const { idTransaccion: id } = response.data;  
        setTransaccion (prevState => ( {...prevState, idTransaccion: id }));
        setIsEdit(true);
        setSnackbarMessage("Transaccion grabada exitosamente en la base de datos")
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

  function checkRequiredFields(){
    if (idProveedor !=="" && idRubro !=="" && montoFactura !=="" && descripcion !==""){
      return true
    } 
    return false
  }

  const handleSaveChanges = async () => {
    if (! checkFormErrors() ) {
      saveTransaction(transaccion)
      setTransaccion (prevState => ({...prevState, 
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
      onClose();
    } else {
      //Refactorar...Crear error handler
      console.log("Not saved in database")
    }
  };

  useEffect(() => {
    setTransaccion(prevState => ({...prevState, idProyecto: id, idTipoFlujo:"1"}))
  }, [ open ]);

  return (
    <>
    { suppliers ? <>
   
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
                <Typography align='center'>{`Incluir Factura o Pago`}</Typography>

                <Box sx={{height:"10px"}}/>
                <Grid container spacing={1}>
                <Grid item xs={12} >
                  <SuppliersAutocomplete
                    supplierObject={supplierObject} 
                    setterFunction={setTransaccion} 
                    suppliersList={suppliers}
                  />
                </Grid> 

                <Grid item xs={12} sm={12} >
                  <CategoriesAutocomplete
                      categoryObject={categoryObject} 
                      setterFunction={setTransaccion} 
                      categoriesList={categories}
                  />
                </Grid>

                
                <Grid item xs={6} sm={6}>
                    <PatternFormat
                      format="##/##/####"
                      allowEmptyFormatting mask="_"
                      value={fechaFactura}
                      customInput={TextField}
                      onValueChange={(e) => {handleInvoiceDate (e)}}
                      {...muiFechaFacturaProps}
                    />
                    {formErrors.fechaFactura ? <div className="error-helper-text">{formErrors.fechaFactura}</div> : null}
                </Grid>

                <Grid item xs={6} sm={6}>
                  <PatternFormat
                    format="###-###-#######"
                    allowEmptyFormatting mask="_"
                    value={numeroFactura}
                    customInput={TextField}
                    onValueChange={(e) => {handleInvoiceNumber (e)}}
                    {...muiNumeroFacturaProps}
                  />
                  {formErrors.numeroFactura ? <div className="error-helper-text">{formErrors.numeroFactura}</div> : null}
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Box style={{height:"8px"}}/>
                  <CashFlowTypeAutocomplete
                    cashFlowObject={cashFlowObject} 
                    setterFunction={setTransaccion}
                  />
                </Grid> 
                <Grid item xs={12} sm={6}>
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
                      label="Descripción"
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
                    <PatternFormat
                      format="##/##/####"
                      allowEmptyFormatting mask="_"
                      value={fechaPago}
                      customInput={TextField}
                      onValueChange={(e) => { handlePaymentDate (e)}}
                      {...muiFechaPagoProps}
                    />
                    {formErrors.fechaPago ? <div className="error-helper-text">{formErrors.fechaPago}</div> : null}
                  </Grid>
                  
                  <Grid item xs={6} sm={6}>
                    <TextField variant ="outlined" margin="dense" size="small" fullWidth
                      label="Comprobante de Pago"
                      name="comprobantePago"
                      value={comprobantePago}
                      autoComplete="comprobante-pago"
                      onChange={ (e) => {
                        handleChange (e,setTransaccion,[noBlanks]);
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
                  <Button disableRipple style={{margin:'2px', color:"#344955",backgroundColor:"#E1C16E",textTransform:"none",width:"75px"}}  onClick={handleCancel} variant="contained" size="small"  >
                    Cancelar</Button>
                </Grid>
                <Grid item xs={6} style={{textAlign:'left'}} >

              {/* No esta reconociendo clasess */}
              {/* style={{margin:'2px', color:"#344955",backgroundColor:"#E1C16E",textTransform:"none"}} */}
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
                    },
  }} disabled={checkFormErrors() || ! checkRequiredFields()} onClick={handleSaveChanges} variant="contained" size="small"   >
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
    >
    <SnackbarContent
      className={classes.greenSnackbarContent}
      message={snackbarMessage}
    />
  </Snackbar>
  <DialogModal open={isDialogOpen} onClose={handleDialogClose} severity={dialogOptions.severity} title={dialogOptions.title} buttons={dialogOptions.buttons} action={dialogOptions.action}>
    {dialogOptions.message}
  </DialogModal>
  </>: null}
  </>
  )
}