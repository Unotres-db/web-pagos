import React, {useState, useEffect} from 'react';

import { Grid, Paper, TextField, Box, Typography, FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import api from '../services/api';
import useFetch from '../hooks/useFetch';
import useFetch2 from '../hooks/useFetch2';
import Header from '../components/Header';
import CompanySelect from './Valuation/CompanySelect';

// import axios from "axios";
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

export default function CompanyData () {

  const classes = useStyles();
  const [ companiesList, setCompaniesList ] = useState([]);
  const [ companyIdSearch, setCompanyIdSearch] = useState("CVX");
  const [ companySearchName, setCompanySearchName] = useState("");
  const [ companyData, setCompanyData] = useState({symbol:"",shortName:"", sharesOustanding: 0, regularMarketPrice:0, marketCap:0, beta:0 });

  const { data: allCompanies, isLoading: isLoadingAllCompanies, error: errorAllCompanies } = useFetch(api.get("companies"));
  const { data: company, isLoading: isLoadingCompany, error: errorCompany, refetch:refetchCompany } = useFetch2('companies', companyIdSearch);
  const { data: financials, isLoading: isLoadingFinancials, error: errorFinancials, refetch:refetchFinancials } = useFetch2('financials', companyIdSearch);

  // const { data: company, isLoading: isLoadingCompany, error: errorCompany, refetch:refetchCompany } = useFetch(api.get('companies', { headers :{ Authorization: `${companyIdSearch}`,}}));
  // const { data: company, isLoading: isLoadingCompany, error: errorCompany, refetch:refetchCompany } = useFetch(api.get('companies', { headers :{ Authorization: companyIdSearch,}}));
  // const { data: financials, isLoading: isLoadingFinancials, error: errorFinancials } = useFetch(api.get('financials',{ headers :{Authorization: companyIdSearch,}}));

  useEffect ( ()=> {   // ok, funciona corretamente
    console.count();
    if (allCompanies) {
      // Uses react-search-autocomplete parameters (name, id) not the state names such as shortName, companyId...
      let searchListCompanies = Array.from({ length: allCompanies.length } , () =>({id:"", shortName:"", name:""}));
      for (let i = 0 ; i < allCompanies.length; i++) {
        searchListCompanies[i].name = allCompanies[i].symbol + " - " + allCompanies[i].shortName
        searchListCompanies[i].id = allCompanies[i].symbol 
        searchListCompanies[i].shortName = allCompanies[i].shortName
      }
      setCompaniesList (searchListCompanies)
    }
  },[allCompanies])  

  useEffect ( ()=> {   // --> Erro, nao atualiza o state corretamente, apesar de fazer o fetch corretamente
    
    if (! isLoadingCompany  && company) {

      // Problema eh aqui...usefect atualiza corretamente, mas os dado nao sao utilizados....primerio mostrava state anterior
      setCompanySearchName(company.symbol + " - " + company.shortName);
      console.log(companyIdSearch);
      console.log(company);

      // setCompanyData({symbol:company.symbol, shortName:company.shortName, sharesOutstanding: company.marketCap/1000000/company.regularMarketPrice, regularMarketPrice:company.regularMarketPrice, marketCap:company.marketCap/1000000000, beta:company.beta})
    }
  },[companyIdSearch])  


  return (
    <>
    <Header />
    <Grid container spacing={0} direction="column" alignItems="center" justify="center" className={classes.contentStyle} style={{ minHeight: '85vh' }} >
      <Grid item xs={12} md={6} >
        <Paper className={classes.paper} elevation={12}>
          <Box className = {classes.boxSelectStyle} >
            { ! isLoadingAllCompanies ? <>
              <CompanySelect companiesList={companiesList} companyIdSearch={companyIdSearch} companySearchName={companySearchName} setCompanyIdSearch={setCompanyIdSearch} />
            </> : null }
          </Box>
          <Typography>{companyIdSearch}</Typography>
          { companySearchName ? companySearchName: null }
          { ! isLoadingCompany && company ? <>
            <Typography>{company.shortName}</Typography>
            <Typography>{company.regularMarketPrice}</Typography>
          </> : null}
          
          { ! isLoadingFinancials ? <>

            {financials && financials.map ( (currElement)=> (
              <Typography>{currElement.totalRevenue/1000000000}</Typography>
            )
            )}
          </>: null}
        </Paper>  
      </Grid>  
    </Grid>
    </>
  )
}