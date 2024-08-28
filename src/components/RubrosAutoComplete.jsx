import React, { useState, useEffect } from 'react';

import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Box from '@mui/material/Box';
import { makeStyles } from '@material-ui/core/styles';

import api from '../services/api';
import useAxios from '../hooks/useAxios';

const useStyles = makeStyles((mainTheme) => ({
  // autocomplete: {
  //   '& .MuiAutocomplete-input': {
  //     height: '30px', 
  //     fontSize: '11px', 
  //     backgroundColor:'white'
  //   },
  // },
}));

export default function RubrosAutoComplete({objetoRubro, setTransaccion, isEditField, setIsEditField, variant}){
                                         // {countryObject, setRegisterData, isEditField, setIsEditField, variant}
//   const classes = useStyles();
  const [ listaRubros, setListaRubros] = useState([]);
  const { loading: isLoadingRubros, axiosFetch: getRubros} = useAxios();
  const componentVariant = variant? variant : "outlined"

  const checkChange=(newValue)=>{
    if (newValue !== null && newValue !== undefined){
      alert("CountryObj.id: " + objetoRubro.id + " newValue" + newValue.id)
      if(objetoRubro.idRubro !== newValue.id){
        if ( ! isEditField){
          setIsEditField(true)
        } else{
          setIsEditField(false)
        }
      }
    }
  }

  const successCallback = (apiData)=>{
    const rubros = apiData;
    if (rubros.length > 0){
      setListaRubros(rubros);
    }
  }

  const errorsCb=()=>{
    // alert ("Error accessing data from server")
  }

  useEffect ( ()=> {
    getRubros({ axiosInstance: api, method: 'GET', url: '/rubros', }, successCallback, errorsCb);
  },[]) 

  return (
    <>
    {listaRubros ?
  
    <>
      {console.log(listaRubros)}
      {console.log(objetoRubro)}
      <Autocomplete
        // className={classes.autocomplete}
        disablePortal
        id="combo-box-demo"
        defaultValue={ objetoRubro }
        options={listaRubros ? listaRubros : []}
        // options={listaRubros}
        // options={["albanileria","cemento","biodigestor"]}
        // {top100Films.map((option) => option.title)}
        // getOptionLabel={(option) => option.name? option.name: ""}
        ListboxProps={{ style: { maxHeight: 170 } }}
        onChange={(event, newValue) => {
          setTransaccion (prevState => ( {...prevState, idRubro: newValue===null? "": newValue.id, nombreRubro: newValue===null? "": newValue.name}));
          checkChange(newValue);
        }}
        fullWidth
        // isOptionEqualToValue={(option, value) => option.id === value.id}
        freeSolo
        forcePopupIcon={true}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Seleccione el rubro"
            variant={componentVariant}
            size="small"
          />
        )}
      />
    </>
    : null}
  </>
  )
} 