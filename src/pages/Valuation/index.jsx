import React, { useEffect, useState } from 'react';

import { Container, Grid, Paper, Box, CircularProgress } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import api from '../../services/api';
import useFetch from '../../hooks/useFetch';
import useFetch0 from '../../hooks/useFetch0';
import useUnsavedWarning from '../../hooks/useUnsavedWarning';
import useDataHandling from '../../hooks/useDataHandling';
import useValuation from '../../hooks/useValuation';

import Header from '../../components/Header'; 
import TableHistoricalData from './TableHistoricalData';
import FormOptions from './FormOptions'; 
import FormBusinessData from './FormBusinessData';
import FormCashFlowData from './FormCashFlowData';
import FormCostOfCapitalData from './FormCostOfCapitalData';
import CompanySelect from './CompanySelect';
import CompanyInfo from './CompanyInfo';
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
  container:{
    position: 'absolute',
  },
  paperStyle: {
    position: 'sticky',
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
  const currentYear = new Date().getFullYear();  // revisar
  const historicalYears = 3
  const historicalInitialValues = (Array.from({ length: 4 }, (a,b) => ({ year:currentYear - 4 + b, period:0, totalRevenue:0, costOfRevenue: 0, grossProfit: 0, grossProfitPercent:0, operatingExpenses: 0, depreciation: 0, interestExpense: 0, other: 0, incomeBeforeTax: 0, incomeTaxExpense: 0, netIncome: 0, ebit: 0, capitalExpenditures: 0, cash: 0, shortLongTermDebt:0, longTermDebt:0, workingCapitalChanges:0, cashFlow:0, discountedCashFlow:0 }))).reverse();
  const forecastedInitialValues = (Array.from({ length: 5 }, (a,b) => ({ year:currentYear + b, period:0, totalRevenue:0, costOfRevenue: 0, grossProfit: 0, grossProfitPercent:0, operatingExpenses: 0, depreciation: 0, interestExpense: 0, other: 0, incomeBeforeTax: 0, incomeTaxExpense: 0, netIncome: 0, ebit: 0, capitalExpenditures: 0, cash: 0, shortLongTermDebt:0, longTermDebt:0, workingCapitalChanges:0, cashFlow:0, discountedCashFlow:0 }))).reverse();
  const combinedInitialValues = (Array.from({ length: 8 }, (a,b) => ({ year:currentYear - historicalYears + b, period:0, totalRevenue:0, costOfRevenue: 0, grossProfit: 0, grossProfitPercent:0, operatingExpenses: 0, depreciation: 0, interestExpense: 0, other: 0, incomeBeforeTax: 0, incomeTaxExpense: 0, netIncome: 0, ebit: 0, capitalExpenditures: 0, cash: 0, shortLongTermDebt:0, longTermDebt:0, workingCapitalrChanges:0, cashFlow:0, discountedCashFlow:0 }))).reverse();
  const assumptionsInitialValues = {revenueGrowth:"", marginTarget:"", opexGrowth:"", interestGrowth:"", otherGrowth:"",cashFlowGrowthRate:"", taxRate:"", capexGrowth:"", nwcGrowth:"", perpetualGrowthRate: 3, cashFlowDiscretePeriod:5, companyBeta:0, riskFreeReturn:3.0790, marketReturn:10.05, debtTotalRatio:0, costOfDebt:5}
  const valuationInitialValues = {valuationId:"none", cashFlowAvgGrowth:0, sumOfCashFlowPresentValue:0, perpetuityValue:0, perpetuityPresentValue:0, enterpriseValue:0, cash:0, debt:0, equityValue:0, sharesOutstanding:0, targetStockPrice:0, marketCap:0, published:"", publishedDate:""};
  const [ Prompt, setIsDirty, setIsPristine ] = useUnsavedWarning();
  const [ isLoading, setIsLoading ] = useState (false);
  // const [ isUseAvgAsAssumption, setIsUseAvgAsAssumption ] = useState(true); // Uses historical averages as assumptions to forecast next years
  const [ isEstimateFcffOnly,setIsEstimateFcffOnly  ] = useState(false); 
  const [ isDisabledChkBox, setIsDisabledChkBox] = useState(false);
  const [ isCheckedDescOrder, setIsCheckedDescOrder] = useState(true);
  const [ isCheckedShowIncStatement, setIsCheckedShowIncStatement] = useState(true);
  const [ isCheckedShowPreviousYears, setIsCheckedShowPreviousYears] = useState(true);
  // const [ isValuationCompleted, setIsValuationCompleted ] = useState(false);
  const [ editMode, setEditMode ] = useState("blank"); // blank, edited, completed, saved, published
  // const [ valuationIdText, setValuationIdText] = useState("none");
  const [ companiesList, setCompaniesList ] = useState([]);
  const [ companyIdSearch, setCompanyIdSearch] = useState("");
  const [ companySearchName, setCompanySearchName]= useState("");
  // const [ apiQueryParam, setApiQueryParam] = useState("")
  const [ historicalFinancialData, setHistoricalFinancialData ] = useState();
  // const [ averageHistoricalTaxRate, setAverageHistoricalTaxRate] = useState(0);
  const [ combinedFinancialData, setCombinedFinancialData] = useState(combinedInitialValues);
  const [ companyData, setCompanyData] = useState({symbol:"",shortName:"", sharesOustanding: 0, regularMarketPrice:0, fiftyTwoWeekLow:0, fiftyTwoWeekHigh:0, marketCap:0, beta:0, totalCash:0, totalDebt:0 });
  const [ assumptions, setAssumptions ] = useState(assumptionsInitialValues);
  const [ calculatedCostOfCapital, setCalculatedCostOfCapital] = useState({ costOfEquity:0, costOfCapital:0});
  const [ valuation, setValuation] = useState(valuationInitialValues);
  const [ forecastedFinancialData, setForecastedFinancialData] = useState(forecastedInitialValues);
  const { calcForecastedCashFlow, calcValuation, calcCostOfCapital } = useValuation ({assumptions, forecastedFinancialData, historicalFinancialData, isCheckedDescOrder, calculatedCostOfCapital, companyData, isEstimateFcffOnly}); //
  const { createFinancialHistoricalData, createCombinedData, handleValuation, handlePublication } = useDataHandling({ companyData, historicalFinancialData, assumptions, calculatedCostOfCapital, valuation, setValuation, forecastedFinancialData, isCheckedShowPreviousYears, isCheckedDescOrder })
  const { data: allCompanies, isLoading: isLoadingAllCompanies, error: errorAllCompanies } = useFetch(api.get("companies"));
  const { data,  error, refetch } = useFetch0();

  function valuationStatus() {
    const {revenueGrowth, marginTarget, opexGrowth, interestGrowth, otherGrowth,  taxRate, capexGrowth, nwcGrowth, cashFlowGrowthRate, perpetualGrowthRate, cashFlowDiscretePeriod, companyBeta, riskFreeReturn, marketReturn, costOfDebt} = assumptions;
    const {symbol} = companyData;
    let fieldsCompleted = 0;
    if (! symbol){
      return "Blank"
    }
    let valuesToCheck = { revenueGrowth, marginTarget, opexGrowth, interestGrowth, otherGrowth,  taxRate, capexGrowth, nwcGrowth, perpetualGrowthRate, cashFlowDiscretePeriod, companyBeta, riskFreeReturn, marketReturn,costOfDebt }
    if (isEstimateFcffOnly) {
      valuesToCheck = { cashFlowGrowthRate, perpetualGrowthRate, cashFlowDiscretePeriod, companyBeta, riskFreeReturn, marketReturn, costOfDebt }
    }
    let totalFields = Object.keys(valuesToCheck).length;
    Object.keys(valuesToCheck).forEach( (key) => {  
      if (assumptions [key] !== "") {
        fieldsCompleted = fieldsCompleted + 1
      } 
    })
    if (fieldsCompleted === totalFields){
      return "completed"
    } 
    return "edited"
  }

  function handleNewValuation () {
    setCompanySearchName("");
    setCompanyData({symbol:"",shortName:"", sharesOustanding: 0, regularMarketPrice:0, fiftyTwoWeekLow:0, fiftyTwoWeekHigh:0, marketCap:0, beta:0, totalCash:0, totalDebt:0 });
    setHistoricalFinancialData(historicalInitialValues);
    setAssumptions(assumptionsInitialValues);
    setForecastedFinancialData(forecastedInitialValues);
    setCombinedFinancialData(combinedInitialValues);
    setValuation(valuationInitialValues); 
  }

  // function allCompaniesSuccessCallback () {
  //   if (allCompanies) {  
  //     // Uses react-search-autocomplete parameters (name, id) not the state names such as shortName, companyId...
  //     let searchListCompanies = Array.from({ length: allCompanies.length } , () =>({id:"", shortName:"", name:""}));
  //     for (let i = 0 ; i < allCompanies.length; i++) {
  //       searchListCompanies[i].name = allCompanies[i].symbol + " - " + allCompanies[i].shortName
  //       searchListCompanies[i].id = allCompanies[i].symbol 
  //       searchListCompanies[i].shortName = allCompanies[i].shortName
  //     }
  //     setCompaniesList (searchListCompanies)
  //   }
  // }

  // function CompanySuccessCallback(data){
  //   const company = data;
  //   if (response.data) {
  //     if (company.marketCap > 0 && company.regularMarketPrice > 0 ) {
  //       shares = company.marketCap/1000000/company.regularMarketPrice //see api value
  //     } 
  //     setCompanySearchName(company.symbol + " - " + company.shortName);
  //     setCompanyData({symbol:company.symbol, shortName:company.shortName, sharesOutstanding: shares, regularMarketPrice:company.regularMarketPrice, fiftyTwoWeekLow:company.fiftyTwoWeekLow, fiftyTwoWeekHigh:company.fiftyTwoWeekHigh, marketCap:company.marketCap/1000000000, beta:company.beta, totalCash: company.totalCash/1000000000, totalDebt: company.totalDebt/1000000000})
  //     setAssumptions (prevState => ({...prevState, companyBeta: company.beta, revenueGrowth:"", marginTarget:"", opexGrowth:"", interestGrowth:"", otherGrowth:"",taxRate:"",capexGrowth:"",nwcGrowth:"",cashFlowGrowthRate:"",cashFlowDiscretePeriod:5 }))
  //     // clean previous company forecasted data
  //     setForecastedFinancialData(forecastedInitialValues);
  //     // setCombinedFinancialData(historicalFinancialData);
  // }

  // function CompanyErrorCallback(){
  //   setCompanySearchName("");
  //   setDialogOptions({severity:"error", title:"Oops", message:errorMessage,buttons:{button1:"Ok"}})
  //   setIsDialogOpen (true);
  // }

  // function financialsSuccessCallback(){
  //   setHistoricalFinancialData(createFinancialHistoricalData(response.data));
  // }

  useEffect ( ()=> {
    if (allCompanies) {  
      // Note: Uses 'react-search-autocomplete' parameters (name, id) not the state names such as shortName, companyId...
      let searchListCompanies = Array.from({ length: allCompanies.length } , () =>({id:"", shortName:"", name:""}));
      for (let i = 0 ; i < allCompanies.length; i++) {
        searchListCompanies[i].name = allCompanies[i].symbol + " - " + allCompanies[i].shortName
        searchListCompanies[i].id = allCompanies[i].symbol 
        searchListCompanies[i].shortName = allCompanies[i].shortName
      }
      setCompaniesList (searchListCompanies)
    }
  },[allCompanies])  

  // useEffect(() => {
  //   setIsDirty()
  // }, []);

  useEffect (()=> {
    
    function getCompany2 (){
      let shares = 0;
      // const { company, isErrorCompany} = refetch(api.get('companies', { headers :{ Authorization: companyIdSearch,}}))
      // const { company, isErrorCompany } = refetch (api.get(`'companies', { headers :{ Authorization: ${companyIdSearch},}})`));
      const { data, isError } = refetch (companyIdSearch);

      if (isError) {
        alert ("Error fetching data");
      } else {
          if (data) {
            if (data.marketCap > 0 && data.regularMarketPrice > 0 ) {
              shares = data.marketCap/1000000/data.regularMarketPrice //see api value
            } 
            setCompanySearchName(data.symbol + " - " + data.shortName);
            setCompanyData({symbol:data.symbol, shortName:data.shortName, sharesOutstanding: shares, regularMarketPrice:data.regularMarketPrice, fiftyTwoWeekLow:data.fiftyTwoWeekLow, fiftyTwoWeekHigh:data.fiftyTwoWeekHigh, marketCap:data.marketCap/1000000000, beta:data.beta, totalCash: data.totalCash/1000000000, totalDebt: data.totalDebt/1000000000})
            setAssumptions (prevState => ({...prevState, companyBeta: data.beta, revenueGrowth:"", marginTarget:"", opexGrowth:"", interestGrowth:"", otherGrowth:"",taxRate:"",capexGrowth:"",nwcGrowth:"",cashFlowGrowthRate:"",cashFlowDiscretePeriod:5 }))
            // clean previous company forecasted data
            setForecastedFinancialData(forecastedInitialValues);
            // setCombinedFinancialData(historicalFinancialData);
          } else {
            setCompanySearchName("");
          }
        }
    }

    function getCompany(){
      
      let shares = 0;
      api.get('companies', { headers :{ Authorization: companyIdSearch,}})
        .then (response => {
          const company = response.data;
          if (company) {
            if (company.marketCap > 0 && company.regularMarketPrice > 0 ) {
              shares = company.marketCap/1000000/company.regularMarketPrice //see api value
            } 
            setCompanySearchName(company.symbol + " - " + company.shortName);
            setCompanyData({symbol:company.symbol, shortName:company.shortName, sharesOutstanding: shares, regularMarketPrice:company.regularMarketPrice, fiftyTwoWeekLow:company.fiftyTwoWeekLow, fiftyTwoWeekHigh:company.fiftyTwoWeekHigh, marketCap:company.marketCap/1000000000, beta:company.beta, totalCash: company.totalCash/1000000000, totalDebt: company.totalDebt/1000000000})
            setAssumptions (prevState => ({...prevState, companyBeta: company.beta, revenueGrowth:"", marginTarget:"", opexGrowth:"", interestGrowth:"", otherGrowth:"",taxRate:"",capexGrowth:"",nwcGrowth:"",cashFlowGrowthRate:"",cashFlowDiscretePeriod:5 }))
            // clean previous company forecasted data
            setForecastedFinancialData(forecastedInitialValues);
            // setCombinedFinancialData(historicalFinancialData);
          } else {
            setCompanySearchName("");
          }
        })
        .catch (function (err){
          if (err.response) {
            const errorMsg = Object.values(err.response.data);
            alert("warning - Error en acceso a base de datos" + errorMsg)
          }
        });  
    }

    function getFinancials(){ 
      if (companyIdSearch){
        setIsLoading (true);
        api.get('financials',{ headers :{Authorization: companyIdSearch,}})
        .then (response => {
          // const results = response.data;
          setHistoricalFinancialData(createFinancialHistoricalData(response.data));
        }).catch (function (err){
          if (err.response) {
            const errorMsg = Object.values(err.response.data);
            alert("warning - Error en acceso a base de datos" + errorMsg)
          } else if(err.request) {
              alert("warning - Error en acceso a servidor")
            } else {
                alert("warning - Error en acceso a servidor")
              }
        }).finally (() => {
          setIsLoading (false);
        });
      }

    }
    // getAllCompanies();
    // setTimeout(function(){
    //   getFinancials();
    // },5000)
    // setTimeout(getFinancials(),5000);
    if (companyIdSearch){
      // getCompany2();
      getCompany();
      getFinancials();
    }
    setIsEstimateFcffOnly(false);
},[companyIdSearch]);

useEffect (()=> {
  if (historicalFinancialData){
    // setValuation(valuationInitialValues);
    setCalculatedCostOfCapital(calcCostOfCapital());  // testar undefined na funcao
    setForecastedFinancialData(calcForecastedCashFlow());
    // setCombinedFinancialData(createCombinedData());
    if (historicalFinancialData[0].cashFlow < 0){
      setIsEstimateFcffOnly(false)
      setIsDisabledChkBox(true);
    } else {
      // setIsEstimateFcffOnly(false)
      setIsDisabledChkBox(false);
    }
  }
},[historicalFinancialData, companyData]);  

// nao devria ser somente nos assumptions?
useEffect (()=> {
  if (historicalFinancialData){
    setValuation(calcValuation());
    setCombinedFinancialData(createCombinedData());
  }
},[forecastedFinancialData]);  

useEffect (()=> {
  if (historicalFinancialData){
    setCalculatedCostOfCapital(calcCostOfCapital());
    setForecastedFinancialData(calcForecastedCashFlow());
    setCombinedFinancialData(createCombinedData());
    setEditMode(valuationStatus());
  }
},[assumptions]);  

useEffect (()=> {
  setCombinedFinancialData(createCombinedData());
},[isCheckedDescOrder, isCheckedShowPreviousYears]);  

useEffect (()=> {
  if (companyData.beta) {
    setAssumptions (prevState => ({...prevState, companyBeta: companyData.beta, revenueGrowth:"", marginTarget:"", opexGrowth:"", interestGrowth:"", otherGrowth:"",taxRate:"",capexGrowth:"",nwcGrowth:"",cashFlowGrowthRate:"",cashFlowDiscretePeriod:5 }))
  } else {
    setAssumptions (prevState => ({...prevState, companyBeta: "", revenueGrowth:"", marginTarget:"", opexGrowth:"", interestGrowth:"", otherGrowth:"",taxRate:"",capexGrowth:"",nwcGrowth:"",cashFlowGrowthRate:"",cashFlowDiscretePeriod:5 }))
  }
},[isEstimateFcffOnly]);  


  
  return (
  <>
  {console.count()}
  <Header />

  { combinedFinancialData ? <div>

  <Grid container direction="column" alignItems="center" style = {{ minHeight: '80vh'}} className={classes.container} >

    <Grid item xs={12} style = {{ minHeight: '69px'}} /> 

    <Grid item container direction="row" spacing={1} >
      <Grid item xs={12} md={3} >
        <Paper className={classes.paperStyle} elevation={3}>

          <TableHistoricalData historicalFinancialData = {historicalFinancialData} />
        <Box style={{height:"5px"}}/>

          <FormOptions 
            isEstimateFcffOnly = {isEstimateFcffOnly}
            setIsEstimateFcffOnly = {setIsEstimateFcffOnly}
            isDisabledChkBox = {isDisabledChkBox}
          />

          {  ! isEstimateFcffOnly ? <>
          <Box style={{height:"5px"}} />  

            <FormBusinessData 
              assumptions = {assumptions} 
              setAssumptions = {setAssumptions}
            />
          </> : 
          <> 
            <Box style={{height:"5px"}}/>   
            
            <FormCashFlowData
              assumptions = {assumptions} 
              setAssumptions = {setAssumptions}
            />
          </> }
          <Box style={{height:"5px"}}/>

          <FormCostOfCapitalData 
            assumptions = {assumptions} 
            setAssumptions = {setAssumptions}
            calculatedCostOfCapital = {calculatedCostOfCapital}
          />
        </Paper>
      </Grid>  

      <Grid item xs={12} md={6} > 
        <Paper className = {classes.TableContainerStyle} elevation = {3}>
        
          <Box style={{height:"2px"}}/>
          <Paper className = {classes.CompanyInfo}>
          
            { companiesList ? <>
              <Box className = {classes.boxSelectStyle} >
                <CompanySelect 
                  companiesList={companiesList} 
                  companyIdSearch={companyIdSearch} 
                  companySearchName={companySearchName} 
                  setCompanyIdSearch={setCompanyIdSearch} />
              </Box>
            </> : null}
            <Box style={{height:"10px"}}/>
            
            { companyData ? <>
              <CompanyInfo 
                companyData = {companyData} 
                historicalFinancialData={historicalFinancialData}
                forecastedFinancialData = {forecastedFinancialData}
                handleValuation = {handleValuation} 
                handlePublication = {handlePublication}
                editMode = {editMode}
                setEditMode = {setEditMode}
                assumptions={assumptions}
                setAssumptions={setAssumptions}
                calculatedCostOfCapital={calculatedCostOfCapital}
                valuation = {valuation}
                setValuation = {setValuation}
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
        
          <Box style={{height:"5px"}}/>

          { combinedFinancialData  ?  <>
            { isCheckedShowIncStatement ? <>
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
  {Prompt}
  </>
  )
}


  // axios.all([
  //   axios.post(`/my-url`, {
  //     myVar: 'myValue'
  //   }), 
  //   axios.post(`/my-url2`, {
  //     myVar: 'myValue'
  //   })
  // ])
  // .then(axios.spread((data1, data2) => {
  //   // output of req.
  //   console.log('data1', data1, 'data2', data2)
  // }));