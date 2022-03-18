import React from 'react';

import { Paper, Checkbox, FormGroup, FormControlLabel } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles( (mainTheme) => ({
  textCheckboxStyle:{
    color:mainTheme.palette.primary.main
  }
}));

export default function FormAssumptionsOptions (isEstimateFcffOnly, setIsEstimateFcffOnly){

  const classes = useStyles();
  const handleChangeCheckEstimateFcffOnly = () => {
    if (isEstimateFcffOnly) {
      setIsEstimateFcffOnly(false);
    } else {
      setIsEstimateFcffOnly(true);
    }  
  };

  return (
  <>
  <Paper elevation={6}>
    <FormControlLabel className={classes.textCheckboxStyle}
                      control = {<Checkbox defaultChecked disableRipple = {true} size="small"/>} 
                      label = "Estimate FCFF Growth only" 
                      onChange = {handleChangeCheckEstimateFcffOnly}
    />
  </Paper>
  </>
  )
}