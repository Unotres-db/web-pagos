
import React, { useState }  from 'react';

import { Grid, Typography,  Paper, Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TableFooter, TablePagination, TableSortLabel, Button, IconButton, Tooltip, Avatar } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import DeleteIcon from '@mui/icons-material/Delete';

import picBBarbosa from '../../assets/bbarbosa-nord.jpg';
import picLogoNord from '../../assets/logo-nord.jpg';
import picPedroFerrari from '../../assets/pedroferrari.jpg';
import picJPPacheco from '../../assets/jppacheco.jpg';
import picNicolasCooper from '../../assets/nicolascooper.jpg';
import picMarcoRochaLima from '../../assets/marcorochalima.jpg';
import picLucilaCooper from '../../assets/lucilacooper.jpg';

const useStyles = makeStyles( (mainTheme) => ({
  table: {
    minWidth: 370,
    maxHeight: 900
  },
  TableHeader:{
    color: "white",
    backgroundColor: mainTheme.palette.primary.main
  },
  TableTitle:{
    color: "white",
    fontSize: 11
  },
  ButtonTable:{
    display: 'inline-block',
    padding:0,
    minHeight: 0,
    minWidth: 0,
    color: mainTheme.palette.primary.main,
    fontSize: "11px",
    textTransform:"none",
    "&:hover": {
      color:mainTheme.palette.secondary.main,
      backgroundColor:"whitesmoke"
    },
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
  buttonStyle: {
    color: mainTheme.palette.primary.main,
    fontSize: "11px",
    height:"20px",
    width:"60px",
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
    grow:{
      flexGrow: 1
    },
  },
  iconButtonStyle: {
    color: mainTheme.palette.primary.main,
    // fontSize: "11px",
    // [mainTheme.breakpoints.down('xs')]: {
    //   fontSize: "10px"
    // },
    backgroundColor: mainTheme.palette.secondary.main,
    textTransform: "none",
    marginTop: "2px",
    marginLeft:"2px",
    "&:hover": {
      backgroundColor: "#F49506ed"
    },
  },
  TableRows : {
    fontSize: 11
  }
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
    {/* <Box style={{height: "20px"}}/> */}
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
          <Typography align = "center" style={{marginLeft:"5px", fontSize: 11, width:"100%"}}>{currUser.name}</Typography>
        </Grid>
      </Grid>

    ))}
    </>
  )
}