import React, { useEffect, useState } from 'react';

import { Container, Grid, Paper, Box, CircularProgress } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import api from '../services/api';
import useUnsavedWarning from '../hooks/useUnsavedWarning';
import useDataHandling from '../hooks/useDataHandling';
import useValuation from '../hooks/useValuation';

import Header from '../components/Header'; 
// import AutoSearch from '../components/AutoSearch';

import TableHistoricalCompanyAverages from '../components/TableHistoricalCompanyAverages';
import FormAssumptionsOptions from '../components/FormAssumptionsOptions';
import FormFcffAssumption from '../components/FormFcffAssumption';
import FormBusinessAssumptions from '../components/FormBusinessAssumptions';
import FormCostOfCapitalAssumptions from '../components/FormCostOfCapitalAssumptions';
import CompanySelect from './Valuation/CompanySelect';
import CompanyInfo from './Valuation/CompanyInfo';
import TableCheckBoxes from './Valuation/TableCheckBoxes';
import TableDCFFinancials from '../components/TableDCFFinancials';
import TableDCFValuation from '../components/TableDCFValuation';
import ChartRevenueFcff from '../components/ChartRevenueFcff';

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
    minHeight: "640px",
    [mainTheme.breakpoints.down('xs')]: {
      minHeight: "200px"
    },
    marginLeft: "3px",
    marginRight: "0px",
    color: "white",
    backgroundColor: "#f0f8ff",
    padding: "10px",
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
    minHeight: "640px", 
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

export default function DiscCashFlow (){

  const classes = useStyles();
  const [ Prompt, setIsDirty, setIsPristine ] = useUnsavedWarning();
  const [ isLoading, setIsLoading ]= useState(true);
  // const [ isValuationMinRequirements, setIsValuationMinRequirements ] = useState(false);
  const forecastedInitialValues = Array.from({ length: 5 } , () => ({ year:0, period:0, totalRevenue:0, costOfRevenue: 0, grossProfit: 0, grossProfitPercent:0, operatingExpenses: 0, depreciation: 0, interestExpense: 0, other: 0, incomeBeforeTax: 0, incomeTaxExpense: 0, netIncome: 0, ebit: 0, capitalExpenditures: 0, cash: 0, shortLongTermDebt:0, longTermDebt:0, workingCapitalChanges:0, cashFlow:0, discountedCashFlow:0 }))
  const [ isUseAvgAsAssumption, setIsUseAvgAsAssumption ] = useState(true); // Uses historical averages as assumptions to forecast next years
  const [ isEstimateFcffOnly,setIsEstimateFcffOnly  ] = useState(false); 
  const [ isDisabledChkBox, setIsDisabledChkBox] = useState(false);
  const [ isCheckedDescOrder, setIsCheckedDescOrder] = useState(true);
  const [ isCheckedShowIncStatement, setIsCheckedShowIncStatement] = useState(true);
  const [ isCheckedShowPreviousYears, setIsCheckedShowPreviousYears] = useState(true);
  const [ companiesList, setCompaniesList ] = useState([]);
  const [ companyIdSearch, setCompanyIdSearch] = useState("MMM");
  const [ historicalFinancialData, setHistoricalFinancialData ] = useState();
  const [ combinedFinancialdata, setCombinedFinancialData] = useState();
  const [ companyData, setCompanyData] = useState({symbol:"",shortName:"", sharesOustanding: 0, regularMarketPrice:0, marketCap:0, beta:0 });
  const [ assumptions, setAssumptions ] = useState({revenueGrowth:"", marginTarget:"", opexGrowth:"", interestGrowth:"", otherGrowth:"",cashFlowGrowthRate:"", taxRate:"", capexGrowth:"", nwcGrowth:"", perpetualGrowthRate: 2, cashFlowDiscretePeriod:5, companyBeta:1.2, riskFreeReturn:2.715, marketReturn:10.05, debtTotalRatio:0, costOfDebt:5});
  const [ calculatedCostOfCapital, setCalculatedCostOfCapital] = useState({ costOfEquity:0, costOfCapital:0});
  const [ historicalAverages, setHistoricalAverages ] = useState({revenueGrowth:0, marginTarget:0, opexGrowth:0, interestGrowth:0, otherGrowth:0, taxRate:0, capexGrowth:0, nwcGrowth:0, cashFlowGrowth:0});
  const [ valuation, setValuation] = useState({cashFlowAvgGrowth:0, sumOfCashFlowPresentValue:0, perpetuityValue:0, perpetuityPresentValue:0, enterpriseValue:0, cash:0, debt:0, equityValue:0, sharesOutstanding:0, targetStockPrice:0, marketCap:0})
  const { cashFlowAvgGrowth, sumOfCashFlowPresentValue, perpetuityValue, perpetuityPresentValue, enterpriseValue, cash, debt, equityValue, sharesOutstanding, targetStockPrice, marketCap } = valuation;
  const { revenueGrowth, marginTarget, opexGrowth, interestGrowth, otherGrowth, taxRate, capexGrowth, nwcGrowth, perpetualGrowthRate, cashFlowDiscretePeriod, companyBeta, riskFreeReturn, marketReturn, debtTotalRatio, costOfDebt} = assumptions
  const { costOfEquity, costOfCapital} = calculatedCostOfCapital
  const [ forecastedFinancialData, setForecastedFinancialData] = useState(forecastedInitialValues);
  // const companiesList = ['MMM','AOS','ABT','ABBV','AFL','APD','ALB','AMCR','ADM','T','ATO','ADP','BDX','CAH','CAT','CB','CINF','CTAS','CLX','CL','ED','DOV','ECL','EMR','ESS','EXPD','FRT','BEN','GD','GPC','HRL','ITW','IBM','KMB','LEG','LIN','LOW','MKC','MCD','MDT','NEE','NUE','PNR','PBCT','PPG','PG','ROP','SPGI','SHW','SWK','SYY','TROW','TGT','VFC','GWW','WBA','WMT','WST','PBR','BP','SHEL','FB','AMZN','TSLA','GOOG','MSFT'];
  const { calcForecastedCashFlow, calcValuation, calcHistoricalAverages, calcCostOfCapital } = useValuation ({assumptions, forecastedFinancialData, historicalFinancialData, isCheckedDescOrder, historicalAverages, setHistoricalAverages,calculatedCostOfCapital, companyData, isEstimateFcffOnly}); //
  const {changeArrayOrder} = useDataHandling({ historicalFinancialData, forecastedFinancialData, isCheckedShowPreviousYears, isCheckedDescOrder })
  // console.count();
  
  // useEffect(() => {
  //   setIsDirty()
  // }, []);

  useEffect (()=> {

    function getAllCompanies(){
      api.get('companies')
        .then (response => {
          const allCompanies = response.data;
          let symbolName = Array.from({ length: allCompanies.length } , () =>({symbol:"", shortName:"", searchString:""}));
          for (let i = 0 ; i < allCompanies.length; i++){
            symbolName[i].searchString = allCompanies[i].symbol + " - " + allCompanies[i].shortName
            symbolName[i].symbol = allCompanies[i].symbol 
            symbolName[i].shortName = allCompanies[i].shortName
          }
          setCompaniesList(symbolName);
        }).catch (function (err){
          if (err.response) {
            const errorMsg = Object.values(err.response.data);
            alert("warning - Error en acceso a base de datos" + errorMsg)
          }
        });  
    }

    function getCompany(){
      const dataCompany = {companyIdSearch}
      api.get('companies', { headers :{ Authorization: companyIdSearch,}})
        .then (response => {
          const company = response.data;
          setCompanyData({symbol:company.symbol,shortName:company.shortName, sharesOutstanding: company.marketCap/1000000/company.regularMarketPrice, regularMarketPrice:company.regularMarketPrice, marketCap:company.marketCap/1000000000, beta:company.beta})
          setAssumptions (prevState => ({...prevState, companyBeta: company.beta, revenueGrowth:"", marginTarget:"", opexGrowth:"", interestGrowth:"", otherGrowth:"",taxRate:"",capexGrowth:"",nwcGrowth:"",cashFlowGrowthRate:"" }))
          setForecastedFinancialData(forecastedInitialValues);
          setCombinedFinancialData(historicalFinancialData);
        }).catch (function (err){
          if (err.response) {
            const errorMsg = Object.values(err.response.data);
            alert("warning - Error en acceso a base de datos" + errorMsg)
          }
        });  
    }

    function getFinancials(){ 
      if (companyIdSearch){
        api.get('financials',{ headers :{Authorization: companyIdSearch,}})
        .then (response => {
          const results = response.data;
          let financialAuxArray = Array.from({ length: 4 } , () => ({ year: 0, totalRevenue:0, costOfRevenue: 0, grossProfit: 0, grossProfitPercent:0, operatingExpenses: 0, depreciation: 0, interestExpense: 0, other: 0, incomeBeforeTax: 0, incomeTaxExpense: 0, netIncome: 0, ebit: 0, capitalExpenditures: 0, cash: 0, shortLongTermDebt:0, longTermDebt:0, totalCurrentAssets:0, totalCurrentLiabilities:0, workingCapitalChanges:0, cashFlow:0, discountedCashFlow:0 }));

          financialAuxArray[0].workingCapitalChanges = ((results[0].totalCurrentAssets-results[0].totalCurrentLiabilities)-(results[1].totalCurrentAssets-results[1].totalCurrentLiabilities))/1000000000;
          financialAuxArray[1].workingCapitalChanges = ((results[1].totalCurrentAssets-results[1].totalCurrentLiabilities)-(results[2].totalCurrentAssets-results[2].totalCurrentLiabilities))/1000000000;
          financialAuxArray[2].workingCapitalChanges = ((results[2].totalCurrentAssets-results[2].totalCurrentLiabilities)-(results[3].totalCurrentAssets-results[3].totalCurrentLiabilities))/1000000000;

          for (let i = 0 ; i < 4; i++){
            financialAuxArray[i].year = results[i].year;
            financialAuxArray[i].totalRevenue = results[i].totalRevenue/1000000000;
            financialAuxArray[i].costOfRevenue = results[i].costOfRevenue/-1000000000;
            financialAuxArray[i].grossProfit = results[i].grossProfit/1000000000;
            financialAuxArray[i].grossProfitPercent = (results[i].grossProfit/results[i].totalRevenue)*100;
            // financialAuxArray[i].operatingExpenses = results[i].operatingExpenses/-1000000000;
            financialAuxArray[i].operatingExpenses = results[i].sellingGeneralAdministrative/-1000000000 + results[i].otherOperatingExpenses/-1000000000 + results[i].researchDevelopment/-1000000000 + results[i].otherItems/-1000000000;
            financialAuxArray[i].depreciation = results[i].depreciation/-1000000000;
            financialAuxArray[i].interestExpense = results[i].interestExpense/1000000000;
            financialAuxArray[i].incomeBeforeTax = results[i].incomeBeforeTax/1000000000;
            financialAuxArray[i].other = financialAuxArray[i].incomeBeforeTax-( financialAuxArray[i].grossProfit+ financialAuxArray[i].operatingExpenses+financialAuxArray[i].depreciation+financialAuxArray[i].interestExpense); 
            financialAuxArray[i].incomeTaxExpense = (results[i].incomeTaxExpense/1000000000)*-1;
            financialAuxArray[i].netIncome = results[i].netIncome/1000000000;
            // financialAuxArray[i].ebit = results[i].ebit/1000000000;
            financialAuxArray[i].ebit =  financialAuxArray[i].incomeBeforeTax - financialAuxArray[i].interestExpense;
            financialAuxArray[i].capitalExpenditures = results[i].capitalExpenditures/1000000000;
            financialAuxArray[i].cash = results[i].cash/1000000000;
            financialAuxArray[i].shortLongTermDebt = results[i].shortLongTermDebt/1000000000;
            financialAuxArray[i].longTermDebt = results[i].longTermDebt/1000000000;
            financialAuxArray[i].totalCurrentAssets = results[i].totalCurrentAssets/1000000000;
            financialAuxArray[i].totalCurrentLiabilities = results[i].totalCurrentLiabilities/1000000000;
            financialAuxArray[i].cashFlow =  financialAuxArray[i].ebit + financialAuxArray[i].incomeTaxExpense - financialAuxArray[i].depreciation + financialAuxArray[i].capitalExpenditures + financialAuxArray[i].workingCapitalChanges;
          }  
          setHistoricalFinancialData(financialAuxArray);
          // setCompanyData({symbol:"CVX",shortName:"Chevron Corp.", shares: 1947.549952, regularMarketPrice:113.6, marketCap:221.242})
          // setIsLoading(false);
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
    }
    getAllCompanies();
    getCompany();
    getFinancials();
    // if (! isLoading) {
    if (historicalFinancialData) {  
      // alert("--passou em !isLoading");
      // calcHistoricalAverages();
      // calcCostOfCapital()
      // calcValuation();
    }
},[companyIdSearch]);

// useEffect (()=> {

// },[companyIdSearch]);  

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
    setCombinedFinancialData(changeArrayOrder());
    if (forecastedFinancialData){
      if (forecastedFinancialData[0].cashFlow <= 0){
        // alert("Confirma ultimo flujo como negativo?");
      } 
    }
  }
},[historicalAverages]);  

useEffect (()=> {
  if (historicalFinancialData){
    setValuation(calcValuation());
    setCombinedFinancialData(changeArrayOrder());
  }
},[forecastedFinancialData]);  

useEffect (()=> {
  if (historicalFinancialData){
    setCalculatedCostOfCapital(calcCostOfCapital());
    setForecastedFinancialData(calcForecastedCashFlow());
    setValuation(calcValuation());
    setCombinedFinancialData(changeArrayOrder());
    // if (checkValuationMinRequirements) {
    //   localStorage.setItem('valuation', JSON.stringify(valuation));
    //   localStorage.setItem('forecastedFinancialData', JSON.stringify(forecastedFinancialData));
    //   localStorage.setItem('calculatedCostOfCapital', JSON.stringify(calculatedCostOfCapital));
    // }
  }
},[assumptions]);  

useEffect (()=> {
  setCombinedFinancialData(changeArrayOrder());
},[isCheckedDescOrder, isCheckedShowPreviousYears]);  

async function handleValuation (){
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
  const userId = "martincsl";
  const companyId = companyData.symbol;
  const valuationData = { userId, companyId, cashFlowAvgGrowth, sumOfCashFlowPresentValue, perpetuityValue, perpetuityPresentValue, enterpriseValue, cash, debt, equityValue, sharesOutstanding, targetStockPrice, marketCap, revenueGrowth, marginTarget, opexGrowth, interestGrowth, otherGrowth, taxRate, capexGrowth, nwcGrowth, perpetualGrowthRate, cashFlowDiscretePeriod, companyBeta, riskFreeReturn, marketReturn, debtTotalRatio, costOfDebt, costOfEquity, costOfCapital } ;
  let dataToProcess=[];
  api.post('/valuations', valuationData ).then (response => {
    const { valuationId: valuationId, data } = response.data;
    // console.log(valuationId);
    dataToProcess = forecastedFinancialData.map((item, index) => ({...item, valuationId:valuationId, forecastedId:valuationId + index.toString(), companyId:companyData.symbol})) 
    dataToProcess.map ((currElement)=> (
      api.post('/forecasted', currElement ).then (response => {
      }).catch (function (err){
        if (err.request){
          alert("Forecasted: Server not responding");
          return { valid: false, message:"Server not responding" };
        } 
        if ( err.response.status == 404) {
          alert("Forecasted: Database not found")
          return { valid: false, message:"Database not found" };
        }
        const errorMsg = Object.values(err.response.data);
        alert("post: forecasted " + errorMsg);
      })))
    
  }).catch (function (err){
    if (err.request){
      alert("Valuation: Server not responding");
      return { valid: false, message:"Server not responding" };
    } 
    if ( err.response.status == 404) {
      alert("Valuation: Database not found")
      return { valid: false, message:"Database not found" };
    }
    const errorMsg = Object.values(err.response.data);
    alert("post: valuation " + errorMsg);
  });
}

// function checkValuationMinRequirements() {
//   if ( assumptions.revenueGrowth !== "" &&
//         assumptions.marginTarget !== "" &&
//         assumptions.opexGrowth !== "" &&
//         assumptions.taxRate !== "" &&
//         assumptions.perpetualGrowthRate !== "" &&
//         assumptions.riskFreeReturn !=="" &&
//         assumptions.marketReturn !=="" &&
//         assumptions.companyBeta !== "" &&
//         assumptions.costOfDebt !==""
//   ){ 
//     setIsValuationMinRequirements(true);
//     return true
//   } else {
//       return false
//   }}
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
          <TableHistoricalCompanyAverages 
            calcHistoricalAverages = {calcHistoricalAverages}
            historicalFinancialData = {historicalFinancialData}
            historicalAverages = {historicalAverages}
          />
        ) : "" }

        <Box style={{height:"5px"}}/>
          { ! isLoading ? (
            <FormAssumptionsOptions 
              isEstimateFcffOnly = {isEstimateFcffOnly}
              setIsEstimateFcffOnly = {setIsEstimateFcffOnly}
              isDisabledChkBox = {isDisabledChkBox}
            />
          ) : 0 }  

          {  ! isEstimateFcffOnly ? <div>
          <Box style={{height:"5px"}}/>  
          { ! isLoading ? (
            <FormBusinessAssumptions 
              assumptions = {assumptions} 
              setAssumptions = {setAssumptions}
            />
          ) : 0 }
          </div> : <div> 
          <Box style={{height:"5px"}}/>    
          <FormFcffAssumption 
            assumptions = {assumptions} 
            setAssumptions = {setAssumptions}
            
          />
          </div>
          }
          <Box style={{height:"5px"}}/>
          { ! isLoading ? (
          <FormCostOfCapitalAssumptions 
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
            {companyData && companiesList? <div>
              <Box style={{height: "30px", width: "50%"}}>
                <CompanySelect companiesList={companiesList} companyIdSearch={companyIdSearch} setCompanyIdSearch={setCompanyIdSearch} />
              </Box>
              <CompanyInfo companyData={companyData} handleValuation = {handleValuation} />
            </div> :0}

            <TableCheckBoxes 
              isCheckedDescOrder = {isCheckedDescOrder} 
              setIsCheckedDescOrder = {setIsCheckedDescOrder} 
              isCheckedShowIncStatement = {isCheckedShowIncStatement} 
              setIsCheckedShowIncStatement = {setIsCheckedShowIncStatement} 
              isCheckedShowPreviousYears = {isCheckedShowPreviousYears}
              setIsCheckedShowPreviousYears = {setIsCheckedShowPreviousYears}
            />
            <Box style={{height:"8px"}}/>

          </Paper>
          <Box style={{height:"5px"}}/>
            <TableDCFFinancials 
              historicalFinancialData = {historicalFinancialData} 
              assumptions = {assumptions}
              forecastedFinancialData = {forecastedFinancialData} 
              isCheckedDescOrder = {isCheckedDescOrder}
              isCheckedShowIncStatement = {isCheckedShowIncStatement}
              isCheckedShowPreviousYears = {isCheckedShowPreviousYears}
              isEstimateFcffOnly = {isEstimateFcffOnly}
            />
        </Paper>
      </Grid>

      <Grid item xs={12} md={3} >
        <Paper className={classes.paperStyle} elevation={3}>
          { ! isLoading ? <div>
          <TableDCFValuation 
            valuation = {valuation} 
            historicalFinancialData = {historicalFinancialData} 
            calculatedCostOfCapital = {calculatedCostOfCapital}
            assumptions = {assumptions}
            companyData = {companyData}
          />
          <Box style={{height:"8px"}}/>
          <Paper elevation ={6} style={{height:'180px'}}>
            { combinedFinancialdata ? 
              <ChartRevenueFcff 
                // historicalFinancialData = {historicalFinancialData}
                // assumptions = {assumptions}
                // forecastedFinancialData = {forecastedFinancialData} 
                combinedFinancialdata = {combinedFinancialdata}
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
