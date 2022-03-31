import React from 'react';

import { Paper, Box, Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import DiscreteSliderLabel from '../../components/DiscreteSliderLabel';

const useStyles = makeStyles( (mainTheme) => ({
sliderAreaStyle:{
  marginTop:"5px",
  marginLeft:"5px",
  marginRight:"5px",
  minHeight:"200px",
  backgroundColor:mainTheme.palette.secondary.main,
}, 
boxStyle: {
  width: "98%",   
  marginLeft:"8px",
  marginRight:"8px",
  padding: "5px",   
  marginBottom: "1px",
  color:mainTheme.palette.primary.main,
}, 
textStyle: {
  color:mainTheme.palette.primary.main
}
}));

export default function FilterOptions ({ marks, minimumYield, setMinimumYield }){
  const classes = useStyles();
  return (
    <>
    <Paper elevation = {6} className = {classes.sliderAreaStyle}>
      <Box className = {classes.boxStyle} >
        <Typography align="center" variant="subtitle2" className = {classes.textStyle} gutterBottom><b>Filter Options</b></Typography>
        <Typography align="center" variant="subtitle2" className = {classes.textStyle} gutterBottom><b>Minimum Dividend Yield</b></Typography>  
      </Box>
      <Box className = {classes.boxStyle} >
        <Grid item  xs={12}>
          <DiscreteSliderLabel marks = {marks} minimumYield = {minimumYield} setMinimumYield = {setMinimumYield}/>  
        </Grid>  
        <Typography align="left" variant="caption" className = {classes.textStyle} paragraph><b>{`US Treasury Bond 10 years: ${minimumYield}%`}</b></Typography>
        <Typography align="left" variant="caption" className = {classes.textStyle} gutterBottom><b>Inflation US, CPI last 12 months: 9.8%</b></Typography>
      </Box>
    </Paper>
    </>
  )
}



