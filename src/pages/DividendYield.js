import React, {useState, useEffect} from 'react';

import { Grid, Paper, Box, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import api from '../services/api';
import Header from '../components/Header'; 
import DiscreteSliderLabel from '../components/DiscreteSliderLabel';
import TableGrahamModel from '../components/TableGrahamModel';


const useStyles = makeStyles( (mainTheme) => ({
  contentStyle: {
    position: 'absolute',
    top: '65px',
  },
  container:{
    position: "absolute",
  },
  boxStyle: {
    color:"#344955",
    width: "98%",   
    marginLeft:"8px",
    marginRight:"8px",
    padding: "5px",   
    // color: "white",
    // backgroundColor: mainTheme.palette.secondary.main,
    marginBottom: "1px",
  },
  paperStyle: {
    width: "100%",   
    minHeight:"250px",
    marginLeft:"1px",
    marginRight:"1px",
    padding: "5px",
    color: "black",
    // backgroundColor: "#f0f8ff", //"whistesmoke", //"lightgray",
    backgroundColor: mainTheme.palette.secondary.main,
  },
  TableContainerStyle: {
    width: "100%",   
    minHeight:"550px", // vai ser do tamanho do conteudo da tabela
    marginTop:"5px",
    marginLeft:"0px",
    marginRight:"0px",
    color: "white",
    backgroundColor: mainTheme.palette.secondary.main,
    padding: "10px",
  },
}));

export default function DividendYield (){

  const classes = useStyles();
  const marks = [
    { value: 0, label: '0%'},
    { value: 1, label: '1%'},
    { value: 2, label: '2%'},
    { value: 3, label: '3%'},
    { value: 4, label: '4%'},
    { value: 5, label: '5%'},
    { value: 6, label: '6%'},
    { value: 7, label: '7%'},
    { value: 8, label: '8%'},
    { value: 9, label: '9%'},
    { value: 10, label: '10%'},
  ];
  const [ minimumYield, setMinimumYield ] = useState(2.74);
  const [ companiesList, setCompaniesList ] = useState();

  useEffect ( ()=> {
    api.get('dividendyield')
        .then (response => {
          const allCompanies = response.data;
          setCompaniesList(allCompanies.filter(company => (company.dividendYield * 100) > minimumYield));
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
  },[minimumYield]) 

  return (
  <>
  <Header />
  { companiesList ? <div>
    <Grid container direction="column" alignItems="center" style = {{ minHeight: '80vh'}}  className={classes.container}>
      <Grid item xs={12} style = {{ minHeight: '69px'}} /> 

      <Grid item container direction="row" spacing={0}  >

      <Grid item xs={12} md={3} >
        <Paper elevation={6} style={{backgroundColor:"orange", marginTop:"5px",marginLeft:"5px",marginRight:"5px",minHeight:"200px"}}>
            <Box className={classes.boxStyle}>
              <Typography align="center" variant="subtitle2" style = {{color:"#344955"}} gutterBottom><b>What is Dividend Yield ?</b></Typography> 
              <Typography align="center" variant="subtitle3" >The dividend yield, displayed as a percentage, is the amount of money a company pays shareholders for owning a share of its stock divided by its current stock price.</Typography>
            </Box>
          </Paper>
      </Grid>  

      <Grid item xs={12} md={6} > 
        <Paper className={classes.TableContainerStyle} >
          <TableGrahamModel companiesList = {companiesList} />
        </Paper>  
      </Grid>

      <Grid item xs={12} md={3} > 
        <Paper elevation={6} style={{backgroundColor:"orange",marginTop:"5px",marginLeft:"5px",marginRight:"5px",minHeight:"200px"}}>
          <Box className = {classes.boxStyle} >
            <Typography align="center" variant="subtitle2" style = {{color:"#344955"}} gutterBottom><b>Filter Options</b></Typography>
            <Typography align="center" variant="subtitle2" style = {{color:"#344955"}} gutterBottom><b>Minimum Dividend Yield</b></Typography>  
          </Box>
          <Box className = {classes.boxStyle} >
            <Grid item  xs={12}>
              <DiscreteSliderLabel marks = {marks} minimumYield = {minimumYield} setMinimumYield = {setMinimumYield}/>  
            </Grid>  
            <Typography align="left" variant="caption" style = {{color:"#344955"}} paragraph><b>Treasury 10 years: 1.78%</b></Typography>
            <Typography align="left" variant="caption" style = {{color:"#344955"}} gutterBottom><b>Inflation USA, CPI last 12 months: 6.8%</b></Typography>
          </Box>
        </Paper>
        <Box style={{height: "5px"}}/>
      </Grid>
      </Grid>
    </Grid>
    <Grid container direction="column" alignItems="center" style= {{ minHeight: '5vh'}} />
  </div>: null }
  </>
  )
}