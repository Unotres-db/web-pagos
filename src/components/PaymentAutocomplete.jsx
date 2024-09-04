import React, { useState, useEffect } from 'react';

import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

import api from '../services/api';
import useAxios from '../hooks/useAxios';

export default function PaymentAutocomplete ({supplierObject, setTransaccion, isEditField, setIsEditField, variant}){
  const [ paymentsList, setPaymentsList] = useState([{id:"Cheque",label:"Cheque"},{id:"Deposito",label:"Deposito"},{id:"Efectivo", label:"Efectivo"},{id:"Transferencia", label:"Transferencia"}]);
  const { loading: isLoadingPaymentss, axiosFetch: getPayments} = useAxios();
  const componentVariant = variant? variant : "outlined"
 
 
  const updateState=(newValue)=>{
    setTransaccion(prevState => ({...prevState, idTipoPago: newValue.id}))
  }

//   const successCallback = (apiData)=>{
//     const suppliers = apiData;
//     if (suppliers.length > 0){
//       setSuppliersList(suppliers);
//     }
//   }

//   const errorsCb=()=>{
//     alert ("Error accessing data from server")
//   }

//   useEffect ( ()=> {
//     getSuppliers({ axiosInstance: api, method: 'GET', url: '/proveedores', }, successCallback, errorsCb);
//   },[])

  return (
    <>
      {paymentsList ?
    
        <>
          <Autocomplete
            disablePortal
            fullWidth
                    size="small"
            options={paymentsList}
            sx={{ width: "100%"}}
            onChange={(event, newValue) => updateState(newValue) }
            renderInput={(params) => <TextField {...params} label="Tipo de Pago" />}
          />
        </>
    : 
     alert("paymentsList is empty")
    }
    </>
  ) 
}