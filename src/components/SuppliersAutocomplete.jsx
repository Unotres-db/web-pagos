import React from 'react';

import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

export default function SuppliersListByProject ({supplierObject, setterFunction, suppliersList}){
  const componentVariant ="outlined";
  const label = supplierObject.label? supplierObject.label: "Proveedor"
 
  const updateState=(newValue)=>{
    if (newValue!==null && newValue!==undefined){
      setterFunction(prevState => ({...prevState, idProveedor: newValue.id? newValue.id: "0"}))  
    } else {
      setterFunction(prevState => ({...prevState, idProveedor: "0"}))
    }
   
  }

  return (
    <>
      {suppliersList ?
        <>
          <Autocomplete
            disablePortal
            fullWidth
            size="small"
            clearIcon={false}
            options={suppliersList}
            sx={{ width: "100%"}}
            onChange={(event, newValue) => updateState(newValue) }
            renderInput={(params) => <TextField {...params} label={label} />}
          />
        </>
    : 
     alert("suppliersList vacio")
    }
    </>
  ) 
}