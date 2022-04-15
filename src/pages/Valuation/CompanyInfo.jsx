import React from 'react';

import { Grid, Box, Typography, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import SaveIcon from '@material-ui/icons/Save';

const useStyles = makeStyles( (mainTheme) => ({
buttonStyle: {
  color: mainTheme.palette.primary.main,
  fontSize: "11px",
  [mainTheme.breakpoints.down('xs')]: {
    fontSize: "10px"
  },
  backgroundColor: mainTheme.palette.secondary.main,
  textTransform: "none",
  marginTop: "2px",
  "&:hover": {
    backgroundColor: "#F49506ed"
  },
},
companyNameText:{
  font: "14px",
  [mainTheme.breakpoints.down('xs')]: {
    fontSize: "10px"
  },
}
}));

export default function CompanyInfo({ companyData, handleValuation }){
  const classes = useStyles()
  return (
    <>
    <Grid container direction = "row" spacing = {1} >
      <Grid item xs = {7} >
        {/* <Box style = {{height: "5px"}}/>  
        <Typography align="center" variant="caption" className={classes.companyNameText}>{`${companyData.shortName} (${companyData.symbol})`}</Typography>
         */}
      </Grid>
      <Grid item xs = {5}  >
        <Box display ="flex" justifyContent="flex-end">
          <Button 
            variant = "contained" 
            size = "small" 
            className = {classes.buttonStyle} 
            startIcon={<SaveIcon />} 
            disableRipple
            onClick = {handleValuation} 
            >Save Valuation
          </Button>
        </Box>  
      </Grid>
    </Grid>
    </>
  )
}