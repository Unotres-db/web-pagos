import React, {useState, useEffect} from 'react';

import { Grid, Paper, TextField, Box, Typography, FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

// import axios from "axios";

import api from '../services/api';
import Header from '../components/Header.js';
// import AutoSearch from '../components/AutoSearch/index.jsx';
// import useQuery from '../hooks/useQuery';
import useFetch from '../hooks/useFetch';

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
    height: 600,
    minWidth: 350,
    maxWidth: 500,
    backgroundColor: "lightgray"
  },
  formControl: {
    marginTop: mainTheme.spacing(0),
    maxHeight: 48,
    // backgroundColor:"white"
  },
}));

// allCompanies  / filteredCompanies / company
export default function Graham (){
  const classes = useStyles();
  const [ companyIdSearch, setCompanyIdSearch ] = useState("CVX");
  const [ companiesList, setCompaniesList ] = useState([{}]);
  const [ wordEntered, setWordEntered ] = useState("");
  const { data: allCompanies, isLoading, error } = useFetch(api.get("companies"));
  const { data: company, isLoading: isLoadingCompany, error: errorCompany } = useFetch(api.get('companies', { headers :{ Authorization: companyIdSearch,}}));
  
  function onChange(e){
    setWordEntered(e.target.value);
  }

  useEffect ( ()=> {

    // console.count();
    if (allCompanies) {
      let symbolName = Array.from({ length: allCompanies.length } , () =>({symbol:"", shortName:"", searchString:""}));
      for (let i = 0 ; i < allCompanies.length; i++){
        symbolName[i].searchString = allCompanies[i].symbol + " - " + allCompanies[i].shortName
        symbolName[i].symbol = allCompanies[i].symbol 
        symbolName[i].shortName = allCompanies[i].shortName
      }
      setCompaniesList(symbolName)
    }
  },[allCompanies])  

  return (
    <>
    <Header/> 
    <Grid container spacing={0} direction="column" alignItems="center" justify="center" className={classes.contentStyle} style={{ minHeight: '85vh' }} >
      <Grid item xs={12} md={6} >
        <Paper className={classes.paper} elevation={12}>
        { ! isLoading && allCompanies !== null ?  <> 
        
        { companiesList ? <>
          <Typography gutterBottom>{wordEntered? wordEntered: null}</Typography>
          <Typography> {company? company.shortName: null}</Typography>
          
            <FormControl variant="filled" margin="none" inputProps={{style: {fontSize: 9}}} className={classes.formControl} fullWidth>
              <InputLabel id="demo-simple-select-outlined-label" style={{backgroundColor:"white"}}fullwidth>Company</InputLabel>
                <Select
                  inputProps={{style: {fontSize: 9}}}
                  labelId="demo-simple-select-outlined-label"
                  id="demo-simple-select-outlined"
                  value={wordEntered}
                  onChange={(e) => onChange(e)}
                  label="Company or symbol"
                  name="companySearch"
                >
                {companiesList.map(( name, index) => (
                  <MenuItem key={index} value={name.shortName}>
                    {name.searchString}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            
          </> : null}
        </>: null }

        </Paper>  
      </Grid>  
    </Grid>  
    </> 
  )
}

  //   api.get('companies')
  //   .then (response => {
  //     const allCompanies = response.data;
  //     let symbolName = Array.from({ length: allCompanies.length } , () =>({symbol:"", shortName:"", searchString:""}));
  //     for (let i = 0 ; i < allCompanies.length; i++){
  //       symbolName[i].searchString = allCompanies[i].symbol + " - " + allCompanies[i].shortName
  //       symbolName[i].symbol = allCompanies[i].symbol 
  //       symbolName[i].shortName = allCompanies[i].shortName
  //     }
  //     console.log(symbolName);
  //     setCompaniesList (symbolName);
  //   }).catch (function (err){
  //     if (err.response) {
  //       const errorMsg = Object.values (err.response.data);
  //       alert("Warning - Database access error" + errorMsg)
  //     } else if (err.request) {
  //         alert("Warning - Server access error")
  //       } else {
  //           alert("Warning - Unexpected error")
  //         }
  //   });