import React, { useState, useEffect } from 'react';
import { Container, Grid, Paper, Box, CircularProgress } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import valuationsWebApi from '../../services/valuationsWebApi';
import useAxios from '../../hooks/useAxios';
import useUnsavedWarning from '../../hooks/useUnsavedWarning';
import useDataHandling from '../../hooks/useDataHandling';
import useValuation from '../../hooks/useValuation';

import Header from '../../components/Header'; 
import DialogModal from '../../components/modals/DialogModal';
import TableHistoricalData from './TableHistoricalData'; // revisar
import FormOptions from './FormOptions'; 
import FormBusinessData from './FormBusinessData';
import FormCashFlowData from './FormCashFlowData';
import FormCostOfCapitalData from './FormCostOfCapitalData';
import CompanySelect from './CompanySelect';
import ValuationOptions from './ValuationOptions';
import TableCheckBoxes from './TableCheckBoxes';
import TableIncomeStatement from './TableIncomeStatement';
import TableCashFlow from './TableCashFlow';
import TableValuation from './TableValuation';
import ChartFreeCashFlow from './ChartFreeCashFlow';

const useStyles = makeStyles( (mainTheme) => ({
  contentStyle: {
    position: 'absolute',
    top: '65px',
  },
  // container:{
  //   position: 'absolute',
  // },
  paperStyle: {
    // position: 'sticky',
    width: "100%",   
    minHeight: "668px",
    [mainTheme.breakpoints.down('xs')]: {
      minHeight: "200px"
    },
    marginLeft: "3px",
    marginRight: "0px",
    color: "white",
    backgroundColor: "#f0f8ff",
    padding: "10px",
  },
  boxSelectStyle:{
    height: "30px",
    width: "45%",
    [mainTheme.breakpoints.down('xs')]: {
      width: "100%"
    },
  },
  CompanyInfo: {
    marginLeft: "3px",
    marginRight: "0px",
    color: "black",
    backgroundColor: "white",
    padding: "10px",
  },
  TableContainerStyle: {
    width: "100%",
    minHeight: "668px", 
    marginLeft: "3px",
    marginRight: "0px",
    color: "white",
    backgroundColor: "#f0f8ff", 
    // backgroundColor:mainTheme.palette.primary.main,
    padding: "2px",
  },
}));

export default function Valuation () {
  const classes = useStyles();
  const userId = "martincsl";
  const [ dialogOptions, setDialogOptions ] = useState({severity:"",title:"",message:"",buttons:{}, action:""});
  const [ isDialogOpen, setIsDialogOpen ] = useState(false);
  const currentYear = new Date().getFullYear();  // revisar
  // const historicalYears = 3 // revisar
  const [ isCheckedShowIncStatement, setIsCheckedShowIncStatement] = useState(true);
  const [ isCheckedShowPreviousYears, setIsCheckedShowPreviousYears ] = useState(true);   // Check if previous years will be shown in income statement and cash flow (default)
  const [ isCheckedDescOrder, setIsCheckedDescOrder] = useState(true);                    // Check if numbers will appear in descending order (default)
  const [ isEstimateFcffOnly, setIsEstimateFcffOnly ] = useState(false);                  // Check if valuation assumptions will be complete or just estimate directly the cash flow growth
  const [ historicalFinancialData, setHistoricalFinancialData ] = useState(null);         // Array with fetched financial data from previous years
  const [ companiesList, setCompaniesList ] = useState([]);                               // List of companies to populate the Auto complete Search
  const [ companyIdSearch, setCompanyIdSearch ] = useState("");                           // Symbol that will be received by CompanySelect component
  const [ companyData, setCompanyData] = useState({symbol:"",shortName:"", sharesOustanding: 0, regularMarketPrice:0, fiftyTwoWeekLow:0, fiftyTwoWeekHigh:0, marketCap:0, beta:0, totalCash:0, totalDebt:0 });
  const companySearchName = companyData.symbol !=="" ? (companyData.symbol + " - " + companyData.shortName) : "" ;
  const [ assumptions, setAssumptions ] = useState({revenueGrowth:"", marginTarget:"", opexGrowth:"", interestGrowth:"", otherGrowth:"",cashFlowGrowthRate:"", taxRate:"", capexGrowth:"", nwcGrowth:"", perpetualGrowthRate: 3, cashFlowDiscretePeriod:5, companyBeta:0, riskFreeReturn:3.0790, marketReturn:10.05, debtTotalRatio:0, costOfDebt:5});
  const { createFinancialHistoricalData, createCombinedData} = useDataHandling();
  const { calcForecastedCashFlow, calcValuation, calcCostOfCapital, checkValuationStatus } = useValuation();
  const { axiosFetch: getAllCompanies } = useAxios();                                     // function to fecth data from all companies
  const { axiosFetch: getCompany } = useAxios();                                          // function to fecth general data from one specific company
  const { axiosFetch: getFinancials } = useAxios();                                       // function to fecth previous years financial data from one specific company
  const calculatedCostOfCapital = historicalFinancialData && companyData ? calcCostOfCapital(historicalFinancialData, companyData, assumptions): { costOfEquity:0, costOfCapital:0 }  ;
  const forecastedFinancialData = historicalFinancialData ? calcForecastedCashFlow (historicalFinancialData, assumptions, calculatedCostOfCapital, isEstimateFcffOnly): (Array.from({ length: assumptions.cashFlowDiscretePeriod }, (a,b) => ({ year:currentYear + b, period:0, totalRevenue:0, costOfRevenue: 0, grossProfit: 0, grossProfitPercent:0, operatingExpenses: 0, depreciation: 0, interestExpense: 0, other: 0, incomeBeforeTax: 0, incomeTaxExpense: 0, netIncome: 0, ebit: 0, capitalExpenditures: 0, cash: 0, shortLongTermDebt:0, longTermDebt:0, workingCapitalChanges:0, cashFlow:0, discountedCashFlow:0 }))).reverse();
  const combinedFinancialData = historicalFinancialData ? createCombinedData(historicalFinancialData, forecastedFinancialData, isCheckedShowPreviousYears, isCheckedDescOrder): (Array.from({ length: parseInt(assumptions.cashFlowDiscretePeriod) + 3 }, (a,b) => ({ year:currentYear-3 + b, period:0, totalRevenue:0, costOfRevenue: 0, grossProfit: 0, grossProfitPercent:0, operatingExpenses: 0, depreciation: 0, interestExpense: 0, other: 0, incomeBeforeTax: 0, incomeTaxExpense: 0, netIncome: 0, ebit: 0, capitalExpenditures: 0, cash: 0, shortLongTermDebt:0, longTermDebt:0, workingCapitalChanges:0, cashFlow:0, discountedCashFlow:0 }))).reverse();
  const valuation = forecastedFinancialData ? calcValuation(companyData, historicalFinancialData, assumptions, calculatedCostOfCapital, forecastedFinancialData): {revenueGrowth:"", marginTarget:"", opexGrowth:"", interestGrowth:"", otherGrowth:"",cashFlowGrowthRate:"", taxRate:"", capexGrowth:"", nwcGrowth:"", perpetualGrowthRate: 3, cashFlowDiscretePeriod:5, companyBeta:0, riskFreeReturn:3.0790, marketReturn:10.05, debtTotalRatio:0, costOfDebt:5} ;
  const [ Prompt, setIsDirty, setIsPristine ] = useUnsavedWarning();
  const [ editMode, setEditMode ] = useState("blank");                                    // blank, edited, completed, saved, published
  const isDisabledChkBox = checkDisableCheckBox();

  function allCompaniesSuccessCallback (apiData) {
    // company poderia filtrar allCompanies em vez de fazer um fetch
    const allCompanies = apiData; ///como limitar quantidade de dados do state para somente symbol e shortName? Filter x select no backend?
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
  }

  function companySuccessCallback(apiData){  //revisar
    let shares = 0;
    const company = apiData;
    if (company) {
      if (company.marketCap > 0 && company.regularMarketPrice > 0 ) {
        shares = company.marketCap/1000000/company.regularMarketPrice //compare with api value....
      } 
      setCompanyData({symbol:company.symbol, shortName:company.shortName, sharesOutstanding: shares, regularMarketPrice:company.regularMarketPrice, fiftyTwoWeekLow:company.fiftyTwoWeekLow, fiftyTwoWeekHigh:company.fiftyTwoWeekHigh, marketCap:company.marketCap/1000000000, beta:company.beta, totalCash: company.totalCash/1000000000, totalDebt: company.totalDebt/1000000000})
      setAssumptions (prevState => ({...prevState, companyBeta: company.beta, revenueGrowth:"", marginTarget:"", opexGrowth:"", interestGrowth:"", otherGrowth:"",taxRate:"",capexGrowth:"",nwcGrowth:"",cashFlowGrowthRate:"",cashFlowDiscretePeriod:5 }))
    } 
  }

  function financialsSuccessCallback (apiData){
    setHistoricalFinancialData(createFinancialHistoricalData ( apiData ));
  }

  function checkDisableCheckBox (){
    if (historicalFinancialData){
      if (historicalFinancialData[0].cashFlow < 0){
        return true
      }
    }
    return false
  }

  function errorCallback(errorMessage){
    setDialogOptions({severity:"error", title:"Oops", message:errorMessage,buttons:{button1:"Ok"}})
    setIsDialogOpen (true);
  }

  function handleDialogClose (value, action) { 
    setIsDialogOpen (false);
    setDialogOptions({severity:"",title:"",message:"",buttons:{},action:""});
  }

  function handleNewValuation () {  // revisar
    setCompanyIdSearch("");
    setCompanyData({symbol:"",shortName:"", sharesOustanding: 0, regularMarketPrice:0, fiftyTwoWeekLow:0, fiftyTwoWeekHigh:0, marketCap:0, beta:0, totalCash:0, totalDebt:0 });
    setHistoricalFinancialData(null);
    setAssumptions({revenueGrowth:"", marginTarget:"", opexGrowth:"", interestGrowth:"", otherGrowth:"",cashFlowGrowthRate:"", taxRate:"", capexGrowth:"", nwcGrowth:"", perpetualGrowthRate: 3, cashFlowDiscretePeriod:5, companyBeta:0, riskFreeReturn:3.0790, marketReturn:10.05, debtTotalRatio:0, costOfDebt:5});
  }

  useEffect(() => {
    getAllCompanies({ axiosInstance: valuationsWebApi, method: 'GET', url: '/companies', }, allCompaniesSuccessCallback, errorCallback);
  }, []);

  useEffect(() => {
    if (companyIdSearch){
      getCompany({ axiosInstance: valuationsWebApi, method: 'GET', url: `/companies/${companyIdSearch}`, requestConfig: { headers: {'Authorization': userId,},}},companySuccessCallback, errorCallback);
      getFinancials({ axiosInstance: valuationsWebApi, method: 'GET', url: `/financials/${companyIdSearch}`, requestConfig: { headers: {'Authorization': userId,},}},financialsSuccessCallback, errorCallback);
      setIsEstimateFcffOnly(false);
    }
  }, [companyIdSearch]);
  
  useEffect(() => {
    setEditMode(checkValuationStatus(companyData, assumptions, isEstimateFcffOnly));
  }, [assumptions]);

  useEffect (()=> {  
    if (companyData.beta) {
      setAssumptions (prevState => ({...prevState, companyBeta: companyData.beta, revenueGrowth:"", marginTarget:"", opexGrowth:"", interestGrowth:"", otherGrowth:"",taxRate:"",capexGrowth:"",nwcGrowth:"",cashFlowGrowthRate:"",cashFlowDiscretePeriod:5 }))
    } else {
      setAssumptions (prevState => ({...prevState, companyBeta: "", revenueGrowth:"", marginTarget:"", opexGrowth:"", interestGrowth:"", otherGrowth:"",taxRate:"",capexGrowth:"",nwcGrowth:"",cashFlowGrowthRate:"",cashFlowDiscretePeriod:5 }))
    }
  },[isEstimateFcffOnly]); 

  return(
    <>
    <Header />
    {console.count()}
    { combinedFinancialData ? <div>
      {/* className={classes.container} */}
    <Grid container direction="column" alignItems="center" style = {{ minHeight: '80vh'}}  >

      <Grid item xs={12} style = {{ minHeight: '69px'}} /> 

      <Grid item container direction="row" spacing={1} >
        <Grid item xs={12} md={3} >
          <Paper className={classes.paperStyle} elevation={3}>

            <TableHistoricalData historicalFinancialData = {historicalFinancialData} />

            <Box style={{height:"5px"}}/>
            <FormOptions isEstimateFcffOnly = {isEstimateFcffOnly} setIsEstimateFcffOnly = {setIsEstimateFcffOnly} isDisabledChkBox = {isDisabledChkBox} />

            <Box style = {{height:"5px"}} />  
            { ! isEstimateFcffOnly ? 
              <FormBusinessData assumptions = {assumptions} setAssumptions = {setAssumptions} /> 
              : <FormCashFlowData assumptions = {assumptions} setAssumptions = {setAssumptions} />
            }

            <Box style={{height:"5px"}}/>
            <FormCostOfCapitalData assumptions = {assumptions} setAssumptions = {setAssumptions} calculatedCostOfCapital = {calculatedCostOfCapital} />

          </Paper>
        </Grid>

        <Grid item xs={12} md={6} > 
          <Paper className = {classes.TableContainerStyle} elevation = {3}>
          
            <Box style={{height:"2px"}}/>
            <Paper className = {classes.CompanyInfo}>
            
              { companiesList ? <>
                <Box className = {classes.boxSelectStyle} >
                  <CompanySelect 
                    companiesList = {companiesList} 
                    companyIdSearch = {companyIdSearch} 
                    companySearchName = {companySearchName} 
                    setCompanyIdSearch = {setCompanyIdSearch} />
                </Box>
              </> : null}
              <Box style = {{height:"10px"}}/>
              
              { companyData ? <>
                <ValuationOptions 
                  companyData = {companyData} 
                  historicalFinancialData={historicalFinancialData}
                  forecastedFinancialData = {forecastedFinancialData}
                  editMode = {editMode}
                  setEditMode = {setEditMode}
                  assumptions = {assumptions}
                  setAssumptions = {setAssumptions}
                  calculatedCostOfCapital = {calculatedCostOfCapital}
                  valuation = {valuation}
                  handleNewValuation = {handleNewValuation}
                />
              </> : null}

              <TableCheckBoxes 
                isCheckedDescOrder = {isCheckedDescOrder} 
                setIsCheckedDescOrder = {setIsCheckedDescOrder} 
                isCheckedShowIncStatement = {isCheckedShowIncStatement} 
                setIsCheckedShowIncStatement = {setIsCheckedShowIncStatement} 
                isCheckedShowPreviousYears = {isCheckedShowPreviousYears}
                setIsCheckedShowPreviousYears = {setIsCheckedShowPreviousYears}
              />
              <Box style={{height:"3px"}}/>

            </Paper>
          
            { combinedFinancialData  ?  <>
              { isCheckedShowIncStatement ? <>
                <Box style={{height:"5px"}}/>
                <TableIncomeStatement
                  combinedFinancialData = {combinedFinancialData}
                  assumptions = {assumptions}
                  isCheckedShowPreviousYears = {isCheckedShowPreviousYears}
                  isCheckedDescOrder = {isCheckedDescOrder}
                  isEstimateFcffOnly = {isEstimateFcffOnly}
                />
              </>: null }

              <Box style={{height:"5px"}}/>
              <TableCashFlow
                combinedFinancialData = {combinedFinancialData}
                assumptions = {assumptions}
                isCheckedShowPreviousYears = {isCheckedShowPreviousYears}
                isCheckedDescOrder = {isCheckedDescOrder}
                isEstimateFcffOnly = {isEstimateFcffOnly}
              />
            </>: <CircularProgress variant = "indeterminate" />}
          </Paper>
        </Grid>

        <Grid item xs={12} md={3} >
          <Paper className={classes.paperStyle} elevation={3}>
            
            <TableValuation 
              valuation = {valuation} 
              historicalFinancialData = {historicalFinancialData} 
              combinedFinancialData = {combinedFinancialData}
              calculatedCostOfCapital = {calculatedCostOfCapital}
              assumptions = {assumptions}
              companyData = {companyData}
            />
            <Box style={{height:"8px"}}/>
            <Paper elevation ={6} style={{height:'180px'}}>
              { combinedFinancialData ? 
                <ChartFreeCashFlow
                  combinedFinancialData = {combinedFinancialData}
                  assumptions = {assumptions}
                  isCheckedShowPreviousYears = {isCheckedShowPreviousYears}
                  isCheckedDescOrder = {isCheckedDescOrder}
                />
              : null}
            </Paper>
          
          </Paper>
        </Grid>
      </Grid>
      </Grid>

    <Grid container direction="column" alignItems="center" style= {{ minHeight: '5vh'}} />
    </div> : 
      <CircularProgress />
    } 
    <DialogModal open={isDialogOpen} onClose={handleDialogClose} severity={dialogOptions.severity} title={dialogOptions.title} buttons={dialogOptions.buttons} action={dialogOptions.action}>
      {dialogOptions.message}
    </DialogModal> 
    {Prompt}
  </>
  )  
}