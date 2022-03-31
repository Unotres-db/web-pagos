import React from 'react';

import { Paper, Grid, Checkbox, FormControlLabel } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles( (mainTheme) => ({
  textCheckboxStyle:{
    color:mainTheme.palette.primary.main,
    margingLeft:"20px"
  },  
  input: {
    // height: "20px",
    boxSizing: "border-box" // <-- add this
  }
}));

export default function FormAssumptionsOptions ({isEstimateFcffOnly, setIsEstimateFcffOnly}){
  
  const handleChangeCheckEstimateFcffOnly = () => {
    if (isEstimateFcffOnly) {
      setIsEstimateFcffOnly(false);
    } else {
      setIsEstimateFcffOnly(true);
    }  
  };
  
  const classes = useStyles();
  return (
  <>
  <Paper elevation={6}>
    <Grid contaner>
      <Grid item>
        <FormControlLabel className={classes.textCheckboxStyle}
                          control = {<Checkbox disableRipple style={{ paddingLeft: '20px' }} defaultChecked = {isEstimateFcffOnly} size = "small"/>} 
                          label = "Estimate only FCFF and Perpetual Growth Rate" 
                          onChange = {handleChangeCheckEstimateFcffOnly}
        />
    </Grid>
    </Grid>
  </Paper>
  </>
  )
}