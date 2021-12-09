import React from 'react';

import { Grid, Paper, Box, Typography, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import Header from '../components/Header.js';

const useStyles = makeStyles( (mainTheme) => ({
  contentStyle: {
    position: 'absolute',
    top: '65px',
  },
  buttonStyle: {
    color: "white",
    font: "14px",
    backgroundColor:mainTheme.palette.primary.main,
    textTransform:"none",
    margin: "2px",
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
    color: mainTheme.palette.primary.main,
    backgroundColor: "whitesmoke",
    padding: "10px",
  },
  TableContainerStyle: {
    width: "100%",   
    height:"780px", // vai ser do tamanho do conteudo da tabela
    marginLeft:"3px",
    marginRight:"0px",
    color: "white",
    backgroundColor: mainTheme.palette.secondary.main,
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

export default function Home (){
    const classes = useStyles();
  return (
    <>
    <Header />
    <Grid container direction="column" alignItems="center" style = {{ minHeight: '80vh'}} >

      <Grid item xs={12} style = {{ minHeight: '69px'}} /> 

      <Grid item container direction="row" spacing={1} >

        <Grid item xs={12} md={3} >
          <Paper className={classes.paperStyle} >
            <Typography>My Profile</Typography>
          </Paper>
        </Grid>  

        <Grid item xs={12} md={6} > 
          <Paper className={classes.paperStyle} >
            <Typography>My Valuations</Typography>
            
            <Button className={classes.buttonStyle}>Tesla 2021 Nov, 11</Button>
            <Button className={classes.buttonStyle}>Amazon 2021 Nov, 20</Button>
          </Paper>  
        </Grid>

        <Grid item xs={12} md={3} > 
          <Paper className={classes.paperStyle} >
            <Typography>Published Valuations</Typography>
            <Paper>
              <Typography align="left" variant="caption">Henrique Bredda</Typography>
              <Typography align="left" variant="caption">Tesla</Typography>
            </Paper>
          </Paper>
        </Grid>
      </Grid>
    </Grid>

    <Grid container direction="column" alignItems="center" style= {{ minHeight: '5vh'}} />
    </>
  )
}