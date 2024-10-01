import React from 'react';

import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

export default function CashFlowTypeAutocomplete ({cashFlowObject, setterFunction}){

  const checkLabel=()=>{
    if (cashFlowObject.id==="0"){
      return "Tipo de Flujo"
    }
    return cashFlowObject.label
  }

  const updateState=(newValue)=>{
    if (newValue!==null && newValue!==undefined){
      setterFunction(prevState => ({...prevState, idTipoFlujo: newValue.id? newValue.id: "1"}))  
    } else {
      setterFunction(prevState => ({...prevState, idTipoFlujo: "0"}))
    }
  }

  return (
    <>
    <Autocomplete
      disablePortal
      fullWidth
      size="small"
      clearIcon={false}
      options={[{id:"0", label:"Ingreso"},{id:"1", label:"Egreso"}]}
      sx={{ width: "100%"}}
      onChange={(event, newValue) => updateState(newValue) }
      renderInput={(params) => <TextField {...params} label={checkLabel()} />}
    />
    </>
  ) 
}