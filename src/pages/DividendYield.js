import React, {useState, useEffect} from 'react';

import { Grid, Paper, Box, Typography, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import api from '../services/api';
import Header from '../components/Header'; 
import DiscreteSliderLabel from '../components/DiscreteSliderLabel';
import TableDividendYield from '../components/TableDividendYield';
import TableGrahamModel from '../components/TableGrahamModel';

const useStyles = makeStyles( (mainTheme) => ({
  contentStyle: {
    position: 'absolute',
    top: '65px',
  },
  container:{
    position: "absolute",
  },
  buttonStyle: {
    color: "white",
    font: "14px",
    backgroundColor:mainTheme.palette.secondary.main,
    textTransform:"none",
    margin: "0px",
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
    height:"200px",
    marginLeft:"3px",
    marginRight:"0px",
    color: "white",
    backgroundColor: mainTheme.palette.secondary.main,
    padding: "10px",
  },
  TableContainerStyle: {
    width: "100%",   
    height:"560px", // vai ser do tamanho do conteudo da tabela
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
    const [ companiesList, setCompaniesList ] = useState([]); 
    const [ minimumYield, setMinimumYield] = useState(1.55);

    useEffect ( ()=> {
      api.get('dividendyield').then (response => {
        setCompaniesList(response.data);
        // console.log(response.data);
      }).catch (function (err){
        if (err.response) {
          const errorMsg = Object.values(err.response.data);
          alert("warning - Error en acceso a base de datos" + errorMsg)
        } else if(err.request) {
            alert("warning - Error en acceso a servidor")
          } else {
              alert("warning - Error en acceso a servidor")
            }
      });
    },[])

    useEffect ( ()=> {
      api.get('dividendyield').then (response => {
        var allCompanies = response.data;
        var filteredList = allCompanies.filter(company => (company.dividendYield*100) > minimumYield)
        setCompaniesList(filteredList);
      }).catch (function (err){
        if (err.response) {
          const errorMsg = Object.values(err.response.data);
          alert("warning - Error en acceso a base de datos" + errorMsg)
        } else if(err.request) {
            alert("warning - Error en acceso a servidor")
          } else {
              alert("warning - Error en acceso a servidor")
            }
      });
    },[minimumYield])

    return (
    <>
    <Header />
    <Grid container direction="column" alignItems="center" style = {{ minHeight: '80vh'}}  className={classes.container}>

      <Grid item xs={12} style = {{ minHeight: '69px'}} /> 

      {/* <Grid item xs={12} style = {{ width: '100%'}} >
        <Box className={classes.titleStyle}>      
          <Typography align="center" variant="h6" ><b>Dividend Yield</b></Typography>
        </Box>
      </Grid> */}

      <Grid item container direction="row" spacing={1}>
  
        <Grid item xs={12} md={3} >
          <Paper className={classes.paperStyle} >
            <Typography align="center" variant="subtitle2" style = {{color:"#344955"}} gutterBottom><b>What is Dividend Yield ?</b></Typography> 
            <Typography align="center" variant="subtitle3">The dividend yield, displayed as a percentage, is the amount of money a company pays shareholders for owning a share of its stock divided by its current stock price.</Typography>
          </Paper>
        </Grid>  

        <Grid item xs={12} md={6} > 

          <Paper className={classes.TableContainerStyle} >
            {/* <TableDividendYield companiesList={companiesList}/> */}
            <TableGrahamModel companiesList={companiesList}/>

            {/* <TableGrahamModel /> */}
          </Paper>  
        </Grid>

        <Grid item xs={12} md={3} > 
          <Paper className={classes.paperStyle} >
            <Typography align="center" variant="subtitle2" style = {{color:"#344955"}} gutterBottom><b>Filter Options</b></Typography> 
              <Button className={classes.buttonStyle} size="medium" fullWidth>Minimum Dividend Yield</Button>
              <DiscreteSliderLabel marks={marks} minimumYield={minimumYield} setMinimumYield={setMinimumYield}/>  
            <Typography variant="subtitle2" gutterBottom>Treasury 10 years: 1.55%</Typography>
            <Typography variant="subtitle2">Inflation USA, CPI last 12 months: 3.5%</Typography>
          </Paper>
        </Grid>
      </Grid>
      </Grid>

    <Grid container direction="column" alignItems="center" style= {{ minHeight: '5vh'}} />
    </>
  )
}