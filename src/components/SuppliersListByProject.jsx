import React from 'react';

import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

export default function SuppliersListByProject ({supplierObject, setterFunction, suppliersList}){
  const componentVariant ="outlined";
  const label = supplierObject.label? supplierObject.label: "Proveedor"
 
  const updateState=(newValue)=>{
    // alert("id:" + newValue.id + " label:" + newValue.label )
    setterFunction(prevState => ({...prevState, idProveedor: newValue.id}))
  }

  return (
    <>
      {suppliersList ?
        <>
          <Autocomplete
            disablePortal
            fullWidth
            size="small"
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