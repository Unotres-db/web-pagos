import React from 'react';

import { Paper, Grid, Checkbox, FormControlLabel } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles( (mainTheme) => ({
  textCheckboxStyle:{
    color:mainTheme.palette.primary.main,
    margingLeft:"20px",
    marginRight: "5px",
    paddingRight: "2px",
    fontSize:"9px"
  },  
  input: {
    // height: "20px",
    boxSizing: "border-box" // <-- add this
  }
}));

export default function FormOptions ({isEstimateFcffOnly, setIsEstimateFcffOnly, isDisabledChkBox}){
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
  <Paper elevation = {6}>
    <Grid contaner>
      <Grid item>
        <FormControlLabel 
          className = {classes.textCheckboxStyle}
          disabled = {isDisabledChkBox}
          control = {<Checkbox disableRipple style={{ paddingLeft: '20px' }}  defaultChecked = {false} checked = {isEstimateFcffOnly} size = "small"/>} 
          label = "Estimate only Free Cash Flow & Perpetuity Growth"
          onChange = {handleChangeCheckEstimateFcffOnly}
        />
      </Grid>
    </Grid>
  </Paper>
  </>
  )
}