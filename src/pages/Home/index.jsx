import React, { useState, useEffect } from 'react';

import { Grid, Paper, Box, Typography, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import DeleteIcon from '@mui/icons-material/Delete';



import api from '../../services/api';
import Header from '../../components/Header.js';
import MyProfile from './MyProfile';
import OldTableMyValuationsList from './OldTableMyValuationsList';
import TableMyValuationsList from './TableMyValuationsList';
import RecommendedValuations from './RecommendedValuations.jsx';

const useStyles = makeStyles( (mainTheme) => ({
  contentStyle: {
    position: 'absolute',
    top: '65px',
  },
  buttonStyle: {
    color: mainTheme.palette.primary.main,
    fontSize: "11px",
    [mainTheme.breakpoints.down('xs')]: {
      fontSize: "10px"
    },
    backgroundColor: mainTheme.palette.secondary.main,
    textTransform: "none",
    width:"120px",
    height: "30px",
    marginTop: "2px",
    marginLeft:"2px",
    "&:hover": {
      backgroundColor: "#F49506ed"
    },
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
    minHeight:"550px", // vai ser do tamanho do conteudo da tabela
    marginLeft:"3px",
    marginRight:"0px",
    color: mainTheme.palette.primary.main,
    backgroundColor: "whitesmoke",
    padding: "10px",
  },
  TableContainerStyle: {
    width: "100%",   
    height:"800px", // vai ser do tamanho do conteudo da tabela
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
  const [ valuationsList, setValuationsList] = useState();

  useEffect ( ()=> {
    api.get('valuations')
    .then (response => {
      const allValuations = response.data;
      // colocar em maiusculas para ver se existe diferenca
      setValuationsList(allValuations);
      
    }).catch (function (err){
      if (err.response) {
        const errorMsg = Object.values(err.response.data);
        alert("Warning - Database access error" + errorMsg)
      } else if (err.request) {
          alert("Warning - Server access error")
        } else {
            alert("Warning - Unexpected error")
          }
    });
  },[]) 
  
  return (
    <>
    { console.log(valuationsList)}
    <Header />
    <Grid container direction="column" alignItems="center" style = {{ minHeight: '80vh'}} >

      <Grid item xs={12} style = {{ minHeight: '69px'}} /> 

      <Grid item container direction="row" spacing={1} >

        <Grid item xs={12} md={2} >
          <Paper className={classes.paperStyle} >
            {/* <Typography>My Profile</Typography> */}
            <MyProfile />
          </Paper>
        </Grid>

        <Grid item xs={12} md={7} > 
          <Paper className={classes.paperStyle} >
            <Grid container>
              <Grid item xs={2}>
                <Typography style={{fontSize:14}}>My Valuations</Typography>
              </Grid>
              <Grid item xs={10}>
                <Button 
                  variant = "contained" 
                  size = "small" 
                  className = {classes.buttonStyle} 
                  startIcon={<AddCircleIcon />} 
                  disableRipple
                  // onClick = {handleNewValuation} 
                  >New Valuation 
                </Button>
                <Button 
                  variant = "contained" 
                  size = "small" 
                  className = {classes.buttonStyle} 
                  startIcon={<DeleteIcon />} 
                  disableRipple
                  // onClick = {handleNewValuation} 
                  >Delete All 
                </Button>

              </Grid>
              
            </Grid>
            <Box style={{height:"5px"}}/>
            { valuationsList ? <>
              {/* <TestTable valuationsList = {valuationsList}/> */}
              <TableMyValuationsList valuationsList = {valuationsList}/>
            </>: null}
            
          </Paper>
        </Grid>

        <Grid item xs={12} md={3} > 
          <Paper className={classes.paperStyle} >
            <Typography style={{fontSize:14}}>Published Valuations</Typography>
            <Box style={{height:"5px"}}/>
            <Paper>
              <RecommendedValuations />
            </Paper>
          </Paper>
        </Grid>
      </Grid>
    </Grid>

    <Grid container direction="column" alignItems="center" style= {{ minHeight: '5vh'}} />
    </>
  )
}