import React from 'react';

import { Grid, Paper, Box, Typography, Avatar} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import picBBarbosa from '../../assets/bbarbosa-nord.jpg';
import picLogoNord from '../../assets/logo-nord.jpg';
import picPedroFerrari from '../../assets/pedroferrari.jpg';
import picJPPacheco from '../../assets/jppacheco.jpg';
import picNicolasCooper from '../../assets/nicolascooper.jpg';

const useStyles = makeStyles((mainTheme) => ({
photoStyle:{
  // height: '90px',
  // width: "90px",
  textAlign: "center",
  display: "block",
  justifyContent: "center",
  alignItems: "center",
  margin: "auto",
  marginTop: "7px",
  marginBottom:"5px",
  marginLeft:"5px",
  marginRigth:"5px"
}
})); 

export default function RecommendedValuations (){
  const classes = useStyles();

  return (
    <>
    <Paper style={{width:"100%"}} elevation={6}>
      <Grid container>
        <Grid item xs={2} >
        <Avatar className={classes.photoStyle}
            alt="Bruce Barbosa"
            src={picBBarbosa}
          />
        </Grid>
        <Grid item xs={8}>
          <Typography gutterBottom align = "center" style={{fontSize: 12}}>Bruce Barbosa</Typography>
          <Typography gutterBottom align = "center" style={{fontSize: 11}}><b>{`TSLA - Tesla Motors`}</b></Typography> 
          <Typography align = "center" style={{fontSize: 9}}>{`Target Price $ 400, Jun, 06 2022`}</Typography> 
          </Grid>
        <Grid item xs={2} >
        <Avatar className={classes.photoStyle}
            alt="Nord Research"
            src={picLogoNord}
          />
        </Grid>
      </Grid>
    </Paper>
    <Box style={{height:"5px"}}/>
    <Paper style={{width:"100%"}} elevation={6}>
      <Grid container>
        <Grid item xs={2} >
        <Avatar className={classes.photoStyle}
            alt="Pedro Ferrari"
            src={picPedroFerrari}
          />
        </Grid>
        <Grid item xs={8}>
          <Typography gutterBottom align = "center" style={{fontSize: 12}}>Pedro Ferrari</Typography>
          <Typography gutterBottom align = "center" style={{fontSize: 11}}><b>{`FB - Meta Platforms`}</b></Typography> 
          <Typography align = "center" style={{fontSize: 9}}>{`Target Price $ 250, Jun, 06 2022`}</Typography> 

          </Grid>
        <Grid item xs={2} >
        {/* <Avatar className={classes.photoStyle}
            alt="Nord Research"
            src={picLogoNord}
          /> */}
        </Grid>
      </Grid>
    </Paper>
    <Box style={{height:"5px"}}/>
    <Paper style={{width:"100%"}} elevation={6}>
      <Grid container>
        <Grid item xs={2} >
        <Avatar className={classes.photoStyle}
            alt="Nicolas Cooper"
            src={picNicolasCooper}
          />
        </Grid>
        <Grid item xs={8}>
          <Typography gutterBottom align = "center" style={{fontSize: 12}}>Nicolas Cooper</Typography>
          <Typography gutterBottom align = "center" style={{fontSize: 11}}><b>{`CVX - Chevron Corp.`}</b></Typography> 
          <Typography align = "center" style={{fontSize: 9}}>{`Target Price $ 123, Jun, 06 2022`}</Typography> 

          </Grid>
        <Grid item xs={2} >
        {/* <Avatar className={classes.photoStyle}
            alt="Nord Research"
            src={picLogoNord}
          /> */}
        </Grid>
      </Grid>
    </Paper>
    </>
  ) 
}