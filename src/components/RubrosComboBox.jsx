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

export default function RubrosComboBox({objetoRubro, setTransaccion, isEditField, setIsEditField, variant}){
//   const classes = useStyles();
  const [ listaRubros, setListaRubros] = useState([]);
  const { loading: isLoadingRubros, axiosFetch: getRubros} = useAxios();
  const componentVariant = variant? variant : "outlined"
  const label = objetoRubro.nombreRubro? objetoRubro.nombreRubro: "Rubro"

  const checkChange=(newValue)=>{
    if (newValue !== null && newValue !== undefined){
      // alert("CountryObj.id: " + objetoRubro.id + " newValue" + newValue.id)
      if(objetoRubro.idRubro !== newValue.id){
        if ( ! isEditField){
          setIsEditField(true)
        } else{
          setIsEditField(false)
        }
      }
    }
  }

  const updateState=(newValue)=>{
    // alert("id:" + newValue.id + " label:" + newValue.label )
    setTransaccion(prevState => ({...prevState, idRubro: newValue.id}))
  }

  const successCallback = (apiData)=>{
    const rubros = apiData;
    if (rubros.length > 0){
      setListaRubros(rubros);
    }
  }

  const errorsCb=()=>{
    alert ("Error accessing data from server")
  }

  useEffect ( ()=> {
    getRubros({ axiosInstance: api, method: 'GET', url: '/rubros', }, successCallback, errorsCb);
  },[]) 

  return (
    <>
    {listaRubros ?
    <>
      <Autocomplete
        disablePortal
        fullWidth
        size="small"
        options={listaRubros}
        sx={{ width: "100%" }}
        onChange={(event, newValue) => updateState(newValue) }
        renderInput={(params) => <TextField {...params} label={label} />}
      />

    </>
    : 
     alert("listaRubros vazio")
    }

  </>
  )
} 