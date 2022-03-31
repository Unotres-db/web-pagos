import React from 'react';

import { Paper, Box, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles( (mainTheme) => ({
textAreaStyle: {
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

export default function DescriptionText () {
  const classes = useStyles();
  return(
    <>
    <Paper elevation = {6} className = {classes.textAreaStyle} >
      <Box className = {classes.boxStyle} >
        <Typography align="center" variant="subtitle2" className={classes.textStyle} gutterBottom><b>What is Dividend Yield ?</b></Typography> 
        <Typography align="center" variant="subtitle3" >The dividend yield, displayed as a percentage, is the amount of money a company pays shareholders for owning a share of its stock divided by its current stock price.</Typography>
      </Box>
    </Paper>
    </>
  )  
}