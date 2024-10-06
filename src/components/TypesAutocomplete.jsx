import React from 'react';

import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

export default function TypeAutocomplete ({typeObject, setterFunction}){

  const checkLabel=()=>{
    if (typeObject.id==="0"){
      return "Tipo de Transaccion"
    }
    return typeObject.label
  }

  const updateState=(newValue)=>{
    if (newValue!==null && newValue!==undefined){
      setterFunction(prevState => ({...prevState, idTipoTransaccion: newValue.id? newValue.label: ""}))  
    } else {
      setterFunction(prevState => ({...prevState, idTipoTransaccion: ""}))
    }
  }

  return (
    <>
    <Autocomplete
      disablePortal
      fullWidth
      size="small"
      clearIcon={false}
      options={[{id:"0", label:"HONORARIO"},{id:"1", label:"MAT + MO"},{id:"2", label:"MATERIAL"},{id:"2", label:"MO"}]}
      sx={{ width: "100%"}}
      onChange={(event, newValue) => updateState(newValue) }
      renderInput={(params) => <TextField {...params} label={checkLabel()} />}
    />
    </>
  ) 
}