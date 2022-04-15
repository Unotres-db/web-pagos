import React, { useState } from 'react';

import { FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((mainTheme) => ({
  formControl: {
    marginTop: mainTheme.spacing(0),
    maxHeight: 30,

  },
}));

export default function CompanySelect ({ companiesList, companyIdSearch, setCompanyIdSearch }){
  const classes = useStyles();
  const [wordEntered, setWordEntered] = useState("");

  function onChange(e){
    // setWordEntered(e.target.value);
    setCompanyIdSearch(e.target.value)
  }

  return (
    <>
    <FormControl variant="filled" margin="none" inputProps={{style: {fontSize: 9}}} className={classes.formControl} fullWidth>
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
    </FormControl>
    </>
  )  
}

