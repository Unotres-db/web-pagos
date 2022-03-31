import React, {useState, useEffect} from 'react';

import { Grid, Paper, Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import api from '../services/api';
import Header from '../components/Header'; 
import DescriptionText from './DividendYield/DescriptionText';
import TableDividendYield from './DividendYield/TableDividendYield';
import FilterOptions from './DividendYield/FilterOptions';

const useStyles = makeStyles( (mainTheme) => ({
  contentStyle: {
    position: 'absolute',
    top: '65px',
  },
  container:{
    position: "absolute",
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
          <DescriptionText />
        </Grid>  

        <Grid item xs={12} md={6} > 
          <Paper className={classes.TableContainerStyle} >
            <TableDividendYield companiesList = {companiesList} />
          </Paper>  
        </Grid>

        <Grid item xs={12} md={3} > 
          <FilterOptions marks = {marks} minimumYield = {minimumYield} setMinimumYield = {setMinimumYield}/>
          <Box style={{height: "5px"}}/>
        </Grid>
      </Grid>
    </Grid>

    <Grid container direction="column" alignItems="center" style= {{ minHeight: '5vh'}} />
  </div>: null }
  </>
  )
}