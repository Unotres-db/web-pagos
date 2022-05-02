import React, { useState } from 'react';

import { FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { ReactSearchAutocomplete } from 'react-search-autocomplete'

const useStyles = makeStyles((mainTheme) => ({
  formControl: {
    marginTop: mainTheme.spacing(0),
    maxHeight: 30,

  },
}));

export default function CompanySelect ({ companiesList, companyIdSearch, companySearchName, setCompanyIdSearch }){
  const classes = useStyles();
  const [wordEntered, setWordEntered] = useState("");

  // function onChange(e){
  //   setCompanyIdSearch(e.target.value)
  // }

  const handleOnSelect = (item) => {
    setCompanyIdSearch(item.id)
  }
  const handleOnSearch = (item) => {
    // the item selected
    // console.log(item)
    setWordEntered(item.name)
  }
  const handleOnHover = (result) => {
    // console.log(result);
  };
  const handleOnFocus = () => {
    // console.log("Focused");
  };
  const handleOnClear = () => {
    // setCompanyIdSearch()
    // console.log("Cleared");
  };
  
  // const formatResult = (item) => {
  //   return (
  //     <>
  //       <span style={{ display: 'block', textAlign: 'left' }}>{item.name}</span>
  //     </>
  //   )
  // }

  return (
    <>
    { companiesList ? 
      <>
        <ReactSearchAutocomplete
          items={companiesList}
          placeholder={"Enter Company Name or Symbol"}
          inputSearchString={companySearchName}
          onSearch={handleOnSearch}
          onHover={handleOnHover}
          onSelect={handleOnSelect}
          onFocus={handleOnFocus}
          onClear={handleOnClear}
          styling={{ zIndex: 4, height: "35px", borderRadius: "24px",fontSize: "11px", iconColor: "#344955", color: "#344955", searchIconMargin: '0 0 0 8px',clearIconMargin: '3px 8px 0 0' }} // To display it on top of the search box below
          autoFocus
          // formatResult={formatResult}
        />  
      </>
    : null }

    </>
  )  
}

{/* <FormControl variant="filled" margin="none" inputProps={{style: {fontSize: 9}}} className={classes.formControl} fullWidth>
<InputLabel id="demo-simple-select-outlined-label" style={{backgroundColor:"white"}} fullwidth>Company</InputLabel>
  <Select
    inputProps={{style: {fontSize: 9}}}
    labelId="demo-simple-select-outlined-label"
    id="demo-simple-select-outlined"
    value={companyIdSearch}
    onChange={(e) => onChange(e)}
    label="Company or symbol"
    name="companySearch"
    >
    {companiesList.map(( name, index) => (
      <MenuItem key={index} value={name.symbol}>
        {name.searchString}
      </MenuItem>
    ))}
  </Select>
</FormControl> */}