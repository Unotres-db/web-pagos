import React, { useState }  from 'react';

import { Grid, Paper, Box, Typography, Avatar } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import picBBarbosa from '../../assets/bbarbosa-nord.jpg';
import picPedroFerrari from '../../assets/pedroferrari.jpg';
import picJPPacheco from '../../assets/jppacheco.jpg';
import picNicolasCooper from '../../assets/nicolascooper.jpg';
import picMarcoRochaLima from '../../assets/marcorochalima.jpg';
import picLucilaCooper from '../../assets/lucilacooper.jpg';

const useStyles = makeStyles( (mainTheme) => ({
  sectionTitleStyle:{
    fontSize: mainTheme.sectionTitle.fontSize,
    color: mainTheme.sectionTitle.color
  },
  connectionsTitleStyle:{
    width:"100%",
    marginTop:"3px", 
    marginRight:"5px",
    fontSize:11, 
  },
  contactNameText:{
    width:"100%",
    marginLeft:"5px", 
    fontSize: 11, 
  },
  photoStyle:{
    // height: '90px',
    // width: "90px",
    textAlign: "center",
    display: "block",
    justifyContent: "center",
    alignItems: "center",
    margin: "auto",
    marginTop: "5px",
    marginBottom:"5px",
    marginLeft:"5px",
    marginRigth:"5px"
  },
}));

const rowsData = [
  {
    id:0,
    userId:"bb1",
    name: "Bruce Barbosa",
    avatar:picBBarbosa,
  },
  {
    id:1,
    userId:"pg1",
    name: "Pedro Ferrari",
    avatar:picPedroFerrari,
  },
  {
    id:2,
    userId:"nc1",
    name: "Nicolas Cooper",
    avatar:picNicolasCooper,
  },
  {
    id:3,
    userId:"jp1",
    name: "Joao Paulo Pacheco",
    avatar:picJPPacheco,
  },
  {
    id:4,
    userId:"jp1",
    name: "Marco Antonio Rocha Lima",
    avatar:picMarcoRochaLima,
  },
  {
    id:5,
    userId:"lc1",
    name: "Lucila Cooper",
    avatar:picLucilaCooper,
  },
]

export default function TableYourNetwork() {
  const classes = useStyles()
  return (
    <>
    <Paper elevation={6} style={{padding:"5px"}}>
      <Grid container direction="row">
        <Grid item xs={6}>
          <Typography align = "left" className={classes.sectionTitleStyle} >My Network</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography align = "right" className={classes.connectionsTitleStyle}>{`Connections: ${rowsData.length}`}</Typography>
        </Grid>
      </Grid>

      {rowsData.map ((currUser) => (
        <Grid container>

          <Grid item>
            <Avatar className={classes.photoStyle}
              alt={currUser.name}
              src={currUser.avatar}
            />
          </Grid>

          <Grid item>
            <Box style={{height: "15px"}}/>
            <Typography align = "center" className={classes.contactNameText}>{currUser.name}</Typography>
          </Grid>
        </Grid>
      ))}
    </Paper>
    </>
  )
}