import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import dayjs from 'dayjs'
// import { format, parse } from 'date-fns';
// import DateFnsUtils from '@date-io/date-fns';

import { Paper, Grid, Dialog, DialogActions, DialogContent, DialogContentText, Box, Tooltip, Button, Typography, TextField, Avatar, useTheme, useMediaQuery } from '@mui/material'
import makeStyles from '@mui/styles/makeStyles';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import { LoginContext } from '../../helpers/Context';
import useAxios from '../../hooks/useAxios.js';
import valuationsWebApi from '../../services/valuationsWebApi';
import useFetch from '../../hooks/useFetch';
import useForm from '../../hooks/useForm';
import DialogModal from '../../components/modals/DialogModal.jsx';

import ShowUserImageByUserId from '../../components/ShowUserImageByUserId';
import CountryAutocomplete from '../../components/CountryAutocomplete.jsx';
// import { ReactSearchAutocomplete } from 'react-search-autocomplete';

const useStyles = makeStyles( () => ({
  modalStyle:{
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 350,
    height: 800,
    backgroundColor:"white",
    // border: '2px solid #000',
    // boxShadow: 24,
    // p: 4,
  },
  contentStyle: {
    position: 'absolute',
    top: '65px'
  },
  paperStyle: {
    // maxWidth:"350px"
    width:"350px",
    // height: 900,
  },
  textStyle:{
    marginLeft:"12px",
    fontSize:"12px",
    color:'#344955'
  },
  unsubscribedTextStyle:{
    marginRight:"3px",
    fontSize:"9px",
    color:'#344955'
  },
  sectionTitleStyle:{
    fontSize: 14,
    color: "black",
    marginTop:"5px",
    marginLeft:"5px",
    marginBottom:"5px"
  },
  userPhotoStyle:{
    width:"68px",
    height:"68px"
  },
  buttonStyle: {
    marginLeft:"10px",
    width:"100px",
    [mainTheme.breakpoints.down('sm')]: {
      marginLeft:"2px",
      fontSize: "8px",
      width:"70px",
    },
  },
  passwordButtonStyle: {
    marginLeft:"10px",
    width:"120px",
    [mainTheme.breakpoints.down('sm')]: {
      fontSize: "9px",
      marginLeft:"6px",
      width:"95px",
    },
  },
}));

export default function FormTransactions({ open, onClose }){
  const classes = useStyles();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const { userData } = useContext(LoginContext);
  const { userId, userPassword, userProduct, userFirstName, userLastName, userPhone, userDescription } = userData
  const [ isEditField, setIsEditField] = useState(false)
  const { handleChange, isValidName, isValidPhone, noBlanks, isValidCurrUser, registerData, setRegisterData, formErrors, setFormErrors, isDialogOpen, handleDialogClose, dialogOptions} = useForm ();
  // const { axiosFetch: delUser, isLoading: isLoadingDelUser, error: isErrorDelUser } = useAxios();
  const [ editMode, setEditMode] = useState("")
  const { updateUser } = useFetch (setEditMode);
  let userRegistrationData={id:"", password:"", product:"", firstName:"", lastName:"", phone:"", birthday:null, occupation:"", company:"", email:"", country:"", city:"", description:"", website:"", twitter:"", linkedin:"", facebook:"", instagram:"", youtube:"", tiktok:""}
  const history = useHistory();

  const handleKeyDown = (event) => {
    if (event.key === 'Escape') {
      handleCancel();
    }
  };

  const handleCancel=()=>{
    setRegisterData (prevState => ({...prevState, id:userId, password: userPassword, firstName:userFirstName, lastName:userLastName, phone:userPhone, birthday: userBirthday, country:userCountry, countryName:userCountryName, description: userDescription}))
    setIsEditField(false);
    onClose()
  }

   const handleSaveChanges = async () => {
  
    userRegistrationData.id = registerData.id;
    userRegistrationData.password = registerData.password;
    userRegistrationData.product = registerData.product;
    userRegistrationData.firstName = registerData.firstName;
    userRegistrationData.lastName = registerData.lastName;
    // Checar si eh uma data valida....
    // userRegistrationData.birthday =isValidDate(registerData.birthday)? registerData.birthday.format('YYYY/MM/DD'):"";
    userRegistrationData.phone = registerData.phone;
    userRegistrationData.email = registerData.id;
    userRegistrationData.country = registerData.country
    userRegistrationData.description = registerData.description;
    //Actualiza el state de datos del usuario con los cambios

    // limpia los states locales
    // setRegisterData({ id:"",  password:"", confirmPassword:"", product:"",firstName:"",lastName:"", country:"", countryName:"", phone:"", birthday:null, occupation:"", company:"",email:"", city:"", description:"", website:"", twitter:"", linkedin:"", facebook:"", instagram:"", youtube:"", tiktok:"", photo:null, banner:null})
    setIsEditField(false);

    onClose(); // Cierra el FormEditProfile

  };

  useEffect(() => {
    setRegisterData (prevState => ({...prevState, id:userId, password: userPassword, product: userProduct, firstName:userFirstName, lastName:userLastName, phone:userPhone, birthday: dayjs(userBirthday), country:userCountry, countryName:userCountryName, description: userDescription}))
  }, [open]);

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
            <Typography className={classes.sectionTitleStyle}>Incluir Factura</Typography>
            
            <Box sx={{height:"10px"}}/>
            <Grid container spacing={2}>

              <Grid item xs={12} sm={6}>
                <TextField  variant ="outlined" margin="dense" size="small" fullWidth
                  label="First Name"
                  name="firstName"
                  value={registerData.firstName}
                  autoComplete="first-name"
                  onChange={ (e) => {
                    handleChange (e,setRegisterData,[isValidName]);
                  }}
                  onBlur={() => checkEditChanges()}
                  error={formErrors.firstName}
                />
                {formErrors.firstName ? <div className="error-helper-text">{formErrors.firstName}</div> : null}
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField variant ="outlined" margin="dense" size="small" fullWidth
                  label="Last Name"
                  name="lastName"
                  value={registerData.lastName}
                  autoComplete="last-name"
                  onChange={ (e) => {
                    handleChange (e,setRegisterData,[isValidName]);
                  }}
                  onBlur={() => checkEditChanges()}
                  error={formErrors.lastName}
                />
                {formErrors.lastName ? <div className="error-helper-text">{formErrors.lastName}</div> : null}
              </Grid>
              <Grid item xs={12} sm={12} >
                <CountryAutocomplete 
                  countryObject={countryObject} 
                  registerData={registerData}
                  setRegisterData={setRegisterData}
                  isEditField={isEditField} 
                  setIsEditField={setIsEditField}
                />
              </Grid>
              <Grid item xs={6} sm={6}>
                <TextField variant ="outlined" margin="dense" size="small" fullWidth
                  label="Phone"
                  name="phone"
                  value={registerData.phone}
                  autoComplete="phone"
                  onChange={ (e) => {
                    handleChange (e,setRegisterData,[isValidPhone]);
                  }}
                  onBlur={() => checkEditChanges()}
                  error={formErrors.phone}
                />
                {formErrors.phone ? <div className="error-helper-text">{formErrors.phone}</div> : null}
              </Grid>
              {/* <Grid item xs={6} sm={6} >
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker disableFuture format="YYYY/MM/DD" 
                    label = "Birthday"
                    name = "birthday"
                    value = {registerData.birthday}
                    onChange={ (date) => {
                      setIsEditField (true)
                      setRegisterData (prevState => ({...prevState, birthday:date}))
                    }}
                    slotProps = {{ textField: {  variant: 'outlined' , size: "small", margin:"dense"}}}/>
                </LocalizationProvider>
              </Grid> */}
              <Grid item xs={12} sm={12}>
                <TextField variant ="outlined" margin="dense" size="small" fullWidth
                  label="Description"
                  name="description"
                  value={registerData.description}
                  autoComplete="description"
                  multiline
                  rows={3}
                  onChange={ (e) => {
                    handleChange (e,setRegisterData,[noBlanks]);
                  }}
                  onBlur={() => checkEditChanges()}
                  error={formErrors.description}
                />
                {formErrors.description ? <div className="error-helper-text">{formErrors.description}</div> : null}
              </Grid>
            </Grid>
          </DialogContentText>
        </DialogContent>
        <DialogActions >
          <Grid container direction="row"  >
            <Grid item xs={4} style={{textAlign:'left'}}>
              <Button disableRipple className={classes.buttonStyle} onClick={handleCancel} >
                Cancel</Button>
            </Grid>
            <Grid item xs={4} style={{textAlign:'right'}} >
              <Button onClick={handleSaveChanges} disableRipple disabled={!isEditField} className={classes.buttonStyle} >
                Save</Button>
            </Grid>
          </Grid> 
          <Box style={{height: "60px"}}/>
        </DialogActions>
    </Dialog>
  </Paper>

  </>
  )  
}