import React from 'react';

import { Grid, Paper, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import { format, parseISO } from 'date-fns';

import Header from '../components/Header';
const useStyles = makeStyles((mainTheme) => ({
  root: {
    flexGrow: 1,
  },
  contentStyle: {
    position: 'absolute',
    top: '65px'
  },
  paper: {
    padding: mainTheme.spacing(2),
    margin: 'auto',
    minWidth: 350,
    maxWidth: 500,
  },
  photoStyle:{
    height: '90px',
    width: "90px",
    textAlign: "center",
    display: "block",
    justifyContent: "center",
    alignItems: "center",
    margin: "auto",
    marginTop: "10px",
    marginBottom:"10px",
  }, 
  logoStyle:{
    height: '50px',
    textAlign: "center",
    display: "inline",
    justifyContent: "center",
    alignItems: "center",
    margin: "auto",
    marginTop: "10px",
  }, 
  logoStyleNode:{
    height: '20px',
    textAlign: "center",
    display: "inline",
    justifyContent: "center",
    alignItems: "center",
    margin: "auto",
    marginTop: "10px",
    marginBottom:"10px",
    marginRight: "10px",
    marginLeft: "4px",
  }, 
  })); 

export default function TestDateFormats () {
  const classes = useStyles();
  const date1 = new Date();
  const date2 = Date.now()
  const date3 = new Date().toISOString().replace('Z','').replace('T', ' ');
  const date4 = parseISO("2022-06-18 19:49:37");

  return (
    <>
    <Header />
    {/* { console.log(date1)} */}
    {/* { console.log(format(date1,"yyyy MMMM,dd" ))} */}
    {/* { console.log(date2)}  */}
    {/* { console.log(format(date2,"yyyy MMMM,dd"))} */}
    { console.log(format(date4,"yyyy MMMM,dd"))}
    {/* { console.log(date3)} */}
    <Grid container spacing={0} direction="column" alignItems="center" justify="center" className={classes.contentStyle} style={{ minHeight: '85vh' }} >
      <Grid item xs={12} md={6} >
        <Paper className={classes.paper} elevation={12}>
          <Typography gutterBottom variant="subtitle1" align='center'>
            Date Format 1
          </Typography>
          <Typography gutterBottom variant="subtitle2">
            {/* {date1} */}
          </Typography>
          <Typography gutterBottom variant="subtitle2" align='justify'> 
            Date Format 2 
          </Typography>
          <Typography gutterBottom variant="subtitle2"  align='justify'>
            {/* {date2} */}
          </Typography>  
        </Paper>
      </Grid>
    </Grid>
  </>
  );
}