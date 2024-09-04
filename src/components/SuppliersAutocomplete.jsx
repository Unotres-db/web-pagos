import React, { useState, useEffect } from 'react';

import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

import api from '../services/api';
import useAxios from '../hooks/useAxios';

export default function SuppliersAutocomplete ({supplierObject, setTransaccion, isEditField, setIsEditField, variant}){
  const [ suppliersList, setSuppliersList] = useState([]);
  const { loading: isLoadingSuppliers, axiosFetch: getSuppliers} = useAxios();
  const componentVariant = variant? variant : "outlined"
 
 
  const updateState=(newValue)=>{
    // alert("id:" + newValue.id + " label:" + newValue.label )
    setTransaccion(prevState => ({...prevState, idProveedor: newValue.id}))
  }

  const successCallback = (apiData)=>{
    const suppliers = apiData;
    if (suppliers.length > 0){
      setSuppliersList(suppliers);
    }
  }

  const errorsCb=()=>{
    alert ("Error accessing data from server")
  }

  useEffect ( ()=> {
    getSuppliers({ axiosInstance: api, method: 'GET', url: '/proveedores', }, successCallback, errorsCb);
  },[])

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
            renderInput={(params) => <TextField {...params} label="Proveedor" />}
          />
        </>
    : 
     alert("suppliersList vazio")
    }
    </>
  ) 
}