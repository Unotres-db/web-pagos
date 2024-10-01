import React from 'react';

import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

export default function CategoriesAutocomplete ({categoryObject, setterFunction, categoriesList, isShowAllOption}){
  // const componentVariant ="outlined";
  // const label = categoryObject.label? categoryObject.label: "Rubro"

  const checkLabel=()=>{
    if (categoryObject.id==="0"){
      if (isShowAllOption){
        return "Rubro" // "Todos"
      }
      return "Rubro"
    }
    return categoryObject.label
  }
 
  const updateState=(newValue)=>{
    if (newValue!==null && newValue!==undefined){
      setterFunction(prevState => ({...prevState, idRubro: newValue.id? newValue.id: "0"}))  
    } else {
      setterFunction(prevState => ({...prevState, idRubro: "0"}))
    }
  }

  return (
    <>
      {categoriesList ?
        <>
          <Autocomplete
            disablePortal
            fullWidth
            size="small"
            clearIcon={false}
            options={categoriesList}
            sx={{ width: "100%"}}
            onChange={(event, newValue) => updateState(newValue) }
            renderInput={(params) => <TextField {...params} label={checkLabel()} />}
          />
        </>
    : 
     alert("categoriesList vacio")
    }
    </>
  ) 
}
