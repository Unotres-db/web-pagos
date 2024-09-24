import React from 'react';

import { Grid, Paper, Box, Button, Tooltip, Typography, Avatar} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles( () => ({
  contentStyle: {
    position: 'absolute',
    top: '65px',
  },
  buttonStyle: {
    textTransform:"none",
    fontSize:"12px",
    backgroundColor: "#E1C16E", 
    color: '#344955', 
    '&:hover': {
      backgroundColor: '#bda25c', 
      color: '#34495', 
    },
    '&:disabled': {
      backgroundColor: "gray", //"#F49506ed",
      color: '#344955', 
    },
  },
  sectionTitleStyle:{
    fontSize: 14,
    color: '#344955',
    // color: mainTheme.sectionTitle.color
  },
  paperStyle: {
    width: "100%",   
    // minHeight:"565px", // vai ser do tamanho do conteudo da tabela
    height:"100%",
    marginLeft:"3px",
    marginRight:"0px",
    color:"#344955",
    backgroundColor: "whitesmoke",
    padding: "5px",
  },
  textStyle:{
    fontSize:"9px"
  }
})) 

export default function ExchangeRate (){
   const classes = useStyles();
   return (
    <>
    <Paper>
      <Grid container direction='row'>
        <Grid item container xs={4} style={{backgroundColor:"cyan"}}>
          <Grid item xs={12}>
             <Typography className={classes.textStyle}>
               Tipo de Cambio
             </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography className={classes.textStyle}>
              Maxi Cambios
            </Typography>

          </Grid> 

        </Grid>
        <Grid item container xs={4} style={{backgroundColor:"green"}}>
          <Grid item xs={12}>
            <Typography className={classes.textStyle}>
              Compra
              
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography className={classes.textStyle}>
              7.720
            </Typography>
          </Grid> 
          
        </Grid>
      </Grid>
      <Grid item container xs={4}  style={{backgroundColor:"red"}}>
        <Grid item xs={12}>
          <Typography className={classes.textStyle}>Venta</Typography>
     
        </Grid>
        <Grid item xs={12}>
          <Typography className={classes.textStyle}>7.750</Typography>

        </Grid> 
          
      </Grid>
    </Paper>
    </>
   )
}