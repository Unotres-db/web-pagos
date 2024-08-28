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
  const options = [
    { label: 'The Godfather', id: 1 },
    { label: 'Pulp Fiction', id: 2 },
  ];

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
      {console.log("listaRubros-RubrosComboBox")}
      {console.log(listaRubros)}
      <Autocomplete
        disablePortal
        options={listaRubros}
        sx={{ width: 300 }}
        renderInput={(params) => <TextField {...params} label="Rubro" />}
      />
    {/* <Autocomplete
      disablePortal
      options={options}
      sx={{ width: 300 }}
      renderInput={(params) => <TextField {...params} label="Rubro" />}
    /> */}
    </>
    : 
     alert("listaRubros vazio")
    }

  </>
  )
} 