import React from 'react';

import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

export default function SuppliersAutocomplete ({supplierObject, setterFunction, suppliersList, isShowAllOption}){
  // const componentVariant ="outlined";
  // const label = supplierObject.label? supplierObject.label: "Proveedor"

  const checkLabel=()=>{
    if (supplierObject.id==="0"){
      if (isShowAllOption){
        return "Proveedor" //"Todos"
      }
      return "Proveedor"
    }
    return supplierObject.label
  }

  const updateState=(newValue)=>{
    if (newValue!==null && newValue!==undefined){
      setterFunction(prevState => ({...prevState, idProveedor: newValue.id? newValue.id: "0", proveedor:newValue.label}))  
    } else {
      setterFunction(prevState => ({...prevState, idProveedor: "0", proveedor:"Todos"}))
    }
  }

  return (
    <>
      {suppliersList ?
        <>
         {/* {alert("SuppliersAutocomplete "+supplierObject.label+" label:"+)} */}
          <Autocomplete
            disablePortal
            fullWidth
            size="small"
            clearIcon={false}
            options={suppliersList}
            sx={{ width: "100%"}}
            onChange={(event, newValue) => updateState(newValue) }
            renderInput={(params) => <TextField {...params} label={checkLabel()} />}
          />
        </>
    : 
     alert("suppliersList vacio")
    // null
    }
    </>
  ) 
}

// sx={{
//   width: "100%",
//   '& .MuiAutocomplete-input': {
//     fontSize: '11px',
//   },
//   '& .MuiAutocomplete-listbox': {
//     fontSize: '11px',
//   },
//   '& .MuiAutocomplete-option': {
//     fontSize: '11px',
//   },
// }}