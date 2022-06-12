import React from 'react';

import { Grid, Paper, Box, Button, Typography, Avatar} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import ModeEditIcon from '@mui/icons-material/ModeEdit';

// import picMcl from '../../assets/mcl.jpg';
import picMcl from '../../assets/mcl.jpg'
import TableYourNetwork from './TableYourNetwork';

const useStyles = makeStyles((mainTheme) => ({
buttonStyle: {
  color: mainTheme.palette.primary.main,
  fontSize: "11px",
  width:"110px",
  height: "30px",
  [mainTheme.breakpoints.down('xs')]: {
    fontSize: "10px"
  },
  backgroundColor: mainTheme.palette.secondary.main,
  textTransform: "none",
  marginTop: "2px",
  marginLeft:"2px",
  "&:hover": {
    backgroundColor: "#F49506ed"
  },
},
})); 

export default function MyProfile (){
  const classes = useStyles();
  return (
    <>
    <Grid container >
      <Grid item xs={3}>
        <Avatar 
          alt="Martin Calcena"
          src={picMcl}
        />

      </Grid>
      <Grid item xs={9} >
        <Typography gutterBottom style={{fontSize: 12}}>Martin Calcena Simoes Lopes</Typography>
        <Typography gutterBottom style={{fontSize: 11}}>Investidor interessado em Valuations</Typography>
        <Typography style={{fontSize: 11}}>martincsl@hotmail.com</Typography>
 
      </Grid>
    </Grid>
    <Box style={{height:"5px"}}/>
    <Grid container justify="center">
      <Button disableRipple fullWidth="false" startIcon={<ModeEditIcon />} className = {classes.buttonStyle}>Edit Profile</Button>
    </Grid>


    <Box style={{height: "20px"}}/>
    <Grid container direction="column">
      <Grid item>
        <Typography align = "rigth" style={{fontSize: 14, width:"100%"}}>My Network</Typography>
      </Grid>
      {/* <Grid item>
        <Typography align = "rigth" style={{fontSize: 12, width:"100%"}}>Pedro Ferrari</Typography>
        <Typography align = "rigth" style={{fontSize: 12, width:"100%"}}>Joao Paulo Pacheco</Typography>
        <Typography align = "rigth" style={{fontSize: 12, width:"100%"}}>Nicolas Cooper</Typography>
        <Typography align = "rigth" style={{fontSize: 12, width:"100%"}}>Eduardo Velho</Typography>
      </Grid> */}

    </Grid>
    <TableYourNetwork />
    </>
  )
}