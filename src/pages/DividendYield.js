import React from 'react';

import { Grid, Paper, Box, Typography, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import Header from '../components/Header'; 
import DiscreteSliderLabel from '../components/DiscreteSliderLabel';
import TableDividendYield from '../components/TableDividendYield';
import TableGrahamModel from '../components/TableGrahamModel';

const useStyles = makeStyles( (mainTheme) => ({
  contentStyle: {
    position: 'absolute',
    top: '65px',
  },
  buttonStyle: {
    color: "white",
    font: "14px",
    backgroundColor:mainTheme.palette.secondary.main,
    textTransform:"none",
    margin: "0px",
  },
  titleStyle: {
    width: "100%",   
    padding: "15px",   
    color: mainTheme.palette.secondary.main,
    backgroundColor: "white",
    marginBottom: "10px",
  },
  boxStyle: {
    width: "100%",   
    padding: "1px",   
    color: "white",
    backgroundColor: mainTheme.palette.secondary.main,
    marginBottom: "1px",
  },
  paperStyle: {
    width: "100%",   
    height:"230px",
    marginLeft:"3px",
    marginRight:"0px",
    color: "white",
    backgroundColor: mainTheme.palette.secondary.main,
    padding: "10px",
  },
  TableContainerStyle: {
    width: "100%",   
    height:"780px", // vai ser do tamanho do conteudo da tabela
    marginLeft:"3px",
    marginRight:"0px",
    color: "white",
    backgroundColor: "whitesmoke",
    padding: "10px",
  },
  iconStyle: {
    textAlign: "center",
    display: "block",
    justifyContent: "center",
    alignItems: "center",
    margin: "auto",
    marginTop: "10px",
  }
})) 

export default function DividendYield (){

    const classes = useStyles();
    
    return (
    <>
    <Header />
    <Grid container direction="column" alignItems="center" style = {{ minHeight: '80vh'}} >

      <Grid item xs={12} style = {{ minHeight: '69px'}} /> 

      {/* <Grid item xs={12} style = {{ width: '100%'}} >
        <Box className={classes.titleStyle}>      
          <Typography align="center" variant="h6" ><b>Dividend Yield</b></Typography>
        </Box>
      </Grid> */}

      <Grid item container direction="row" spacing={1} >
  
        <Grid item xs={12} md={3} >
          <Paper className={classes.paperStyle} >
            <Typography align="center" variant="subtitle2" style = {{color:"#344955"}} gutterBottom><b>What is Dividend Yield ?</b></Typography> 
            <Typography align="center" variant="subtitle3">The dividend yield, displayed as a percentage, is the amount of money a company pays shareholders for owning a share of its stock divided by its current stock price.</Typography>
          </Paper>
        </Grid>  

        <Grid item xs={12} md={6} > 
         
          <Paper className={classes.TableContainerStyle} >
            <TableDividendYield />
            {/* <TableGrahamModel /> */}
          </Paper>  
        </Grid>

        <Grid item xs={12} md={3} > 
          <Paper className={classes.paperStyle} >
            <Typography align="center" variant="subtitle2" style = {{color:"#344955"}} gutterBottom><b>Filter Options</b></Typography> 
            <Button className={classes.buttonStyle} size="medium" fullWidth>Minimum Dividend Yield</Button>
  
              <DiscreteSliderLabel />  
           
            <Typography variant="subtitle2" gutterBottom>Treasury 10 years: 1.55%</Typography>
            <Typography variant="subtitle2">Inflation USA, CPI last 12 months: 3.5%</Typography>
          </Paper>
        </Grid>
      </Grid>
      </Grid>

    <Grid container direction="column" alignItems="center" style= {{ minHeight: '5vh'}} />
    </>
  )
}