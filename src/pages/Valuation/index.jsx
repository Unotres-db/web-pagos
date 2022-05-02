import React, { useEffect, useState } from 'react';

import { Container, Grid, Paper, Box, CircularProgress } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import api from '../../services/api';
import useFetch from '../../hooks/useFetch';
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
    // backgroundColor:'green'
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
    padding: "2px",
  },
  // iconStyle: {
  //   textAlign: "center",
  //   display: "block",
  //   justifyContent: "center",
  //   alignItems: "center",
  //   margin: "auto",
  //   marginTop: "10px",
  // }
}));

export default function Valuation (){

  const classes = useStyles();
  const forecastedInitialValues = Array.from({ length: 5 } , () => ({ year:0, period:0, totalRevenue:0, costOfRevenue: 0, grossProfit: 0, grossProfitPercent:0, operatingExpenses: 0, depreciation: 0, interestExpense: 0, other: 0, incomeBeforeTax: 0, incomeTaxExpense: 0, netIncome: 0, ebit: 0, capitalExpenditures: 0, cash: 0, shortLongTermDebt:0, longTermDebt:0, workingCapitalChanges:0, cashFlow:0, discountedCashFlow:0 }))
  const [ Prompt, setIsDirty, setIsPristine ] = useUnsavedWarning();
  const [ isLoading, setIsLoading ] = useState(true);
  const [ isUseAvgAsAssumption, setIsUseAvgAsAssumption ] = useState(true); // Uses historical averages as assumptions to forecast next years
  const [ isEstimateFcffOnly,setIsEstimateFcffOnly  ] = useState(false); 
  const [ isDisabledChkBox, setIsDisabledChkBox] = useState(false);
  const [ isCheckedDescOrder, setIsCheckedDescOrder] = useState(true);
  const [ isCheckedShowIncStatement, setIsCheckedShowIncStatement] = useState(true);
  const [ isCheckedShowPreviousYears, setIsCheckedShowPreviousYears] = useState(true);
  const [ companiesList, setCompaniesList ] = useState([]);
  const [ companyIdSearch, setCompanyIdSearch] = useState("MMM");
  const [ companySearchName, setCompanySearchName]= useState("");
  const [ apiQueryParam, setApiQueryParam] = useState("")
  const [ historicalFinancialData, setHistoricalFinancialData ] = useState();
  const [ combinedFinancialData, setCombinedFinancialData] = useState();
  const [ companyData, setCompanyData] = useState({symbol:"",shortName:"", sharesOustanding: 0, regularMarketPrice:0, marketCap:0, beta:0 });
  const [ assumptions, setAssumptions ] = useState({revenueGrowth:"", marginTarget:"", opexGrowth:"", interestGrowth:"", otherGrowth:"",cashFlowGrowthRate:"", taxRate:"", capexGrowth:"", nwcGrowth:"", perpetualGrowthRate: 2, cashFlowDiscretePeriod:5, companyBeta:1.2, riskFreeReturn:2.715, marketReturn:10.05, debtTotalRatio:0, costOfDebt:5});
  const [ calculatedCostOfCapital, setCalculatedCostOfCapital] = useState({ costOfEquity:0, costOfCapital:0});
  const [ historicalAverages, setHistoricalAverages ] = useState({revenueGrowth:0, marginTarget:0, opexGrowth:0, interestGrowth:0, otherGrowth:0, taxRate:0, capexGrowth:0, nwcGrowth:0, cashFlowGrowth:0});
  const [ valuation, setValuation] = useState({cashFlowAvgGrowth:0, sumOfCashFlowPresentValue:0, perpetuityValue:0, perpetuityPresentValue:0, enterpriseValue:0, cash:0, debt:0, equityValue:0, sharesOutstanding:0, targetStockPrice:0, marketCap:0})
  const [ forecastedFinancialData, setForecastedFinancialData] = useState(forecastedInitialValues);
  const { calcForecastedCashFlow, calcValuation, calcHistoricalAverages, calcCostOfCapital } = useValuation ({assumptions, forecastedFinancialData, historicalFinancialData, isCheckedDescOrder, historicalAverages, setHistoricalAverages,calculatedCostOfCapital, companyData, isEstimateFcffOnly}); //
  const { createFinancialHistoricalData, createCombinedData, handleValuation} = useDataHandling({ companyData, historicalFinancialData, assumptions, calculatedCostOfCapital, valuation, forecastedFinancialData, isCheckedShowPreviousYears, isCheckedDescOrder })
  
  const { data: allCompanies, isLoading: isLoadingAllCompanies, error: errorAllCompanies } = useFetch(api.get("companies"));
  // const { data: company, isLoading: isLoadingCompany, error: errorCompany, refetch:refetchCompany } = useFetch(api.get(`'companies', { headers :{ Authorization: ${companyIdSearch},}})`);
  const { data: company, isLoading: isLoadingCompany, error: errorCompany, refetch:refetchCompany } = useFetch(api.get('companies', { headers :{ Authorization: companyIdSearch,}}));

  const { data: financials, isLoading: isLoadingFinancials, error: errorFinancials } = useFetch(api.get('financials',{ headers :{Authorization: companyIdSearch,}}));


  useEffect ( ()=> {
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

  // useEffect(() => {
  //   setIsDirty()
  // }, []);

  useEffect (()=> {
    
    function getCompany(){
      const dataCompany = {companyIdSearch}
      api.get('companies', { headers :{ Authorization: companyIdSearch,}})
        .then (response => {
          const company = response.data;
          setCompanySearchName(company.symbol + " - " + company.shortName);
          setCompanyData({symbol:company.symbol, shortName:company.shortName, sharesOutstanding: company.marketCap/1000000/company.regularMarketPrice, regularMarketPrice:company.regularMarketPrice, marketCap:company.marketCap/1000000000, beta:company.beta})
          setAssumptions (prevState => ({...prevState, companyBeta: company.beta, revenueGrowth:"", marginTarget:"", opexGrowth:"", interestGrowth:"", otherGrowth:"",taxRate:"",capexGrowth:"",nwcGrowth:"",cashFlowGrowthRate:"",cashFlowDiscretePeriod:5 }))
          // clean previous company forecasted data
          setForecastedFinancialData(forecastedInitialValues);
          setCombinedFinancialData(historicalFinancialData);
        }).catch (function (err){
          if (err.response) {
            const errorMsg = Object.values(err.response.data);
            alert("warning - Error en acceso a base de datos" + errorMsg)
          }
        });  
      // console.log(companyIdSearch);
      // console.log(company);
      // refetchCompany(api.get('companies', { headers :{ Authorization: companyIdSearch,}}));
      // console.log(company);
      // refetchCompany();
 
      if (company) {
        console.log(company);
        setCompanySearchName(company.symbol + " - " + company.shortName);
        setCompanyData({symbol:company.symbol, shortName:company.shortName, sharesOutstanding: company.marketCap/1000000/company.regularMarketPrice, regularMarketPrice:company.regularMarketPrice, marketCap:company.marketCap/1000000000, beta:company.beta})
        setAssumptions (prevState => ({...prevState, companyBeta: company.beta, revenueGrowth:"", marginTarget:"", opexGrowth:"", interestGrowth:"", otherGrowth:"",taxRate:"",capexGrowth:"",nwcGrowth:"",cashFlowGrowthRate:"",cashFlowDiscretePeriod:5 }))
        // clean previous company forecasted data
        setForecastedFinancialData(forecastedInitialValues);
        setCombinedFinancialData(historicalFinancialData);
      }
    }

    function getFinancials(){ 
      if (companyIdSearch){
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
        });
        setIsLoading(false);
      }
      // if (companyIdSearch && financials) {
      //   setHistoricalFinancialData(createFinancialHistoricalData(financials));
      //   setIsLoading(false);
      // }
    }
    // getAllCompanies();
    // setTimeout(function(){
    //   getFinancials();
    // },5000)
    // setTimeout(getFinancials(),5000);
    getCompany();
    getFinancials();
    

},[companyIdSearch]);

useEffect (()=> {
  if (historicalFinancialData){
    // alert ("--useEffect [historicalFinancialData]")
    calcHistoricalAverages();
    if (historicalFinancialData[0].cashFlow < 0){
      setIsEstimateFcffOnly(false)
      setIsDisabledChkBox(true);
    } else {
      // setIsEstimateFcffOnly(false)
      setIsDisabledChkBox(false);
    }
  }
},[historicalFinancialData, companyData]);  

useEffect (()=> {
  // alert("--passou em useEffect[historicalFinancialData");
  if (historicalFinancialData){
    // alert ("--useEffect [historicalAverages]")
    setCalculatedCostOfCapital(calcCostOfCapital());  // testar undefined na funcao
    // calcValuation();
    setForecastedFinancialData(calcForecastedCashFlow());
    setCombinedFinancialData(createCombinedData());
    // if (forecastedFinancialData){
    //   if (forecastedFinancialData[0].cashFlow <= 0){
    //     alert("Confirma ultimo flujo como negativo?");
    //   } 
    // }
  }
},[historicalAverages]);  

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
    setValuation(calcValuation());
    setCombinedFinancialData(createCombinedData());
    // if (checkValuationMinRequirements) {
    //   localStorage.setItem('valuation', JSON.stringify(valuation));
    //   localStorage.setItem('forecastedFinancialData', JSON.stringify(forecastedFinancialData));
    //   localStorage.setItem('calculatedCostOfCapital', JSON.stringify(calculatedCostOfCapital));
    // }
  }
},[assumptions]);  

useEffect (()=> {
  setCombinedFinancialData(createCombinedData());
},[isCheckedDescOrder, isCheckedShowPreviousYears]);  

useEffect (()=> {
  setAssumptions({revenueGrowth:"", marginTarget:"", opexGrowth:"", interestGrowth:"", otherGrowth:"",cashFlowGrowthRate:"", taxRate:"", capexGrowth:"", nwcGrowth:"", perpetualGrowthRate: 2, cashFlowDiscretePeriod:5, companyBeta:1.2, riskFreeReturn:2.715, marketReturn:10.05, debtTotalRatio:0, costOfDebt:5})
},[isEstimateFcffOnly]);  


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
  
  return (
  <>
  <Header />
  
  { historicalFinancialData ? <div>

  {/* <Container fixed> */}
  <Grid container direction="column" alignItems="center" style = {{ minHeight: '80vh'}} className={classes.container} >

    <Grid item xs={12} style = {{ minHeight: '69px'}} /> 

    <Grid item container direction="row" spacing={1} >
      <Grid item xs={12} md={3} >
        <Paper className={classes.paperStyle} elevation={3}>
        { ! isLoading ? (
          <TableHistoricalData 
            calcHistoricalAverages = {calcHistoricalAverages}
            historicalFinancialData = {historicalFinancialData}
            historicalAverages = {historicalAverages}
          />
        ) : "" }

        <Box style={{height:"5px"}}/>
          { ! isLoading ? (
            <FormOptions 
              isEstimateFcffOnly = {isEstimateFcffOnly}
              setIsEstimateFcffOnly = {setIsEstimateFcffOnly}
              isDisabledChkBox = {isDisabledChkBox}
            />
          ) : 0 }  

          {  ! isEstimateFcffOnly ? <div>
          <Box style={{height:"5px"}}/>  
          { ! isLoading ? (
            <FormBusinessData 
              assumptions = {assumptions} 
              setAssumptions = {setAssumptions}
            />
          ) : 0 }
          </div> : <div> 
          <Box style={{height:"5px"}}/>    
          <FormCashFlowData
            assumptions = {assumptions} 
            setAssumptions = {setAssumptions}
          />
          </div>
          }
          <Box style={{height:"5px"}}/>
          { ! isLoading ? (
          <FormCostOfCapitalData 
            assumptions = {assumptions} 
            setAssumptions = {setAssumptions}
            calculatedCostOfCapital = {calculatedCostOfCapital}
          />
          ) : 0 }
        </Paper>
      </Grid>  

      <Grid item xs={12} md={6} > 
        <Paper className = {classes.TableContainerStyle} elevation = {3}>
        
          <Box style={{height:"2px"}}/>
          <Paper className = {classes.CompanyInfo}>
          
            {companiesList ? <div>

              <Box className = {classes.boxSelectStyle} >
                <CompanySelect companiesList={companiesList} companyIdSearch={companyIdSearch} companySearchName={companySearchName} setCompanyIdSearch={setCompanyIdSearch} />
              </Box>
            </div> : null}

            {companyData ? <>
              {companyData.shortName}
              <Box style={{height:"5px"}}  />
              <CompanyInfo companyData={companyData} handleValuation = {handleValuation} />
              </>: null}

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

          { combinedFinancialData ? <>
            <TableIncomeStatement
              combinedFinancialData = {combinedFinancialData}
              assumptions = {assumptions}
              isCheckedShowPreviousYears = {isCheckedShowPreviousYears}
              isCheckedDescOrder = {isCheckedDescOrder}
              isEstimateFcffOnly = {isEstimateFcffOnly}
            />
      
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
          { ! isLoading ? <div>
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
                // historicalFinancialData = {historicalFinancialData}
                // assumptions = {assumptions}
                // forecastedFinancialData = {forecastedFinancialData} 
                combinedFinancialData = {combinedFinancialData}
                assumptions = {assumptions}
                isCheckedShowPreviousYears = {isCheckedShowPreviousYears}
                isCheckedDescOrder = {isCheckedDescOrder}
              />
          : null}
          </Paper>
          </div> :0} 
        </Paper>
      </Grid>
    </Grid>
    </Grid>

  <Grid container direction="column" alignItems="center" style= {{ minHeight: '5vh'}} />

  {/* </Container> */}

  </div> : 
    <CircularProgress />
  } 
  {Prompt}
  </>
  )
}
