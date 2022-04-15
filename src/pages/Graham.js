import React, {useState, useEffect} from 'react';

import { Grid, Paper, TextField, Box, Typography, FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import api from '../services/api';
import Header from '../components/Header.js';
import AutoSearch from '../components/AutoSearch/index.jsx';

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


export default function Graham (){
  const classes = useStyles();
  const [companiesList, setCompaniesList] = useState([{}]);
  const [wordEntered, setWordEntered] = useState("");
  
  function onChange(e){
    setWordEntered(e.target.value);
  }

  useEffect ( ()=> {
    
    api.get('companies')
    .then (response => {
      const allCompanies = response.data;
      let symbolName = Array.from({ length: allCompanies.length } , () =>({symbol:"", shortName:"", searchString:""}));
      for (let i = 0 ; i < allCompanies.length; i++){
        symbolName[i].searchString = allCompanies[i].symbol + " - " + allCompanies[i].shortName
        symbolName[i].symbol = allCompanies[i].symbol 
        symbolName[i].shortName = allCompanies[i].shortName
      }
      console.log(symbolName);
      setCompaniesList (symbolName);
      // setCompaniesList(allCompanies);
    }).catch (function (err){
      if (err.response) {
        const errorMsg = Object.values (err.response.data);
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
    <Header/>
    <Grid container spacing={0} direction="column" alignItems="center" justify="center" className={classes.contentStyle} style={{ minHeight: '85vh' }} >
      <Grid item xs={12} md={6} >
        <Paper className={classes.paper} elevation={12}>
        { companiesList ? <>
          <AutoSearch style={{position:"relative", zIndex:2}} placeholder = "Enter a Company Name or Stock Symbol..." data = {companiesList} />
          <Box style={{height:"5px"}}/>
          <TextField > Testeando </TextField>
          <Typography style={{position:"relative", zIndex:1}}>Testeando....</Typography>

          {/* <HireTypeSelect value={values.customerHiringType} onChange={(e) => handleChange (e,[noBlanks])} name="customerHiringType"/> */}
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
                  <MenuItem key={index} value={index}>
                    {/* {name[index].searchString} */}
                    {name.searchString}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
          </>
        : null}
        </Paper>  
      </Grid>  
    </Grid>  
    </>
  )
}