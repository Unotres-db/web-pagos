import React from 'react';

import { Grid, Box, FormGroup, FormControlLabel, Checkbox, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles( (mainTheme) => ({
  boxStyle: {
    width: "100%",
    padding: "1px",
    color: "white",
    backgroundColor: mainTheme.palette.secondary.main,
    marginBottom: "1px",
  },
  textCheckboxStyle:{
    fontSize: "11px",
    [mainTheme.breakpoints.down('xs')]: {
      fontSize: "9px"
    },
    color:mainTheme.palette.primary.main,
  },
}));

export default function TableCheckBoxes ({ isCheckedDescOrder, setIsCheckedDescOrder, isCheckedShowIncStatement, setIsCheckedShowIncStatement, isCheckedShowPreviousYears, setIsCheckedShowPreviousYears}){
  const classes = useStyles();
  const handleChangeCheckDescOrder = () => {
    if (isCheckedDescOrder) {
      setIsCheckedDescOrder(false);
    } else {
      setIsCheckedDescOrder(true);
    }  
  };
  const handleChangeCheckShowIncStatement = () => {
    if (isCheckedShowIncStatement) {
      setIsCheckedShowIncStatement(false);
    } else {
      setIsCheckedShowIncStatement(true);
    }  
  };
  const handleChangeCheckShowPreviousYears = () => {
    if (isCheckedShowPreviousYears) {
      setIsCheckedShowPreviousYears(false);
    } else {
      setIsCheckedShowPreviousYears(true);
    }  
  };
  
  return (
  <>
  <FormGroup style={{height:"20px"}}> 
    <Grid container direction='row'>

      <Grid item xs={4} sm={4} md={4}  >
        <Box display="flex" justifyContent="flex-start">
          <FormControlLabel 
            control = {<Checkbox defaultChecked disableRipple = {true} size="small"/>} 
            label={<Typography className={classes.textCheckboxStyle}>Show Income Statement</Typography>}
            onChange = {handleChangeCheckShowIncStatement}
          />
        </Box>
      </Grid>

      <Grid item xs={4} sm={4} md={4} >
        <Box display="flex" justifyContent="center">
          <FormControlLabel 
            control = {<Checkbox defaultChecked disableRipple = {true} size="small"/>} 
            label={<Typography className={classes.textCheckboxStyle}>Show previous years</Typography>}
            onChange = {handleChangeCheckShowPreviousYears}
          />
        </Box>
      </Grid>

      <Grid item xs={4} sm={4} md={4}  >
        <Box display="flex" justifyContent="flex-end" >
          <FormControlLabel  
            control = {<Checkbox defaultChecked disableRipple = {true} size="small" />} 
            label={<Typography className={classes.textCheckboxStyle} >Show years in descending order</Typography>}
            onChange = {handleChangeCheckDescOrder}
          />
        </Box>
      </Grid>

    </Grid>
  </FormGroup>
  </>
)
}