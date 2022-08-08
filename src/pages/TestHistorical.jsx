import React, {useState, useEffect} from 'react';

import { Grid, Box, Typography, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import valuationsWebApi from '../services/valuationsWebApi';
import useAxios from '../hooks/useAxios';
import useDataHandling from '../hooks/useDataHandling';

import DialogModal from '../components/modals/DialogModal';
import CompanySelect from './Valuation/CompanySelect';
import TableHistoricalData2 from './Valuation/TableHistoricalData2';
import TableIncomeStatement from './Valuation/TableIncomeStatement';
import TableValuation from './Valuation/TableValuation';
import FormBusinessData from './Valuation/FormBusinessData';
import FormCostOfCapitalData from './Valuation/FormCostOfCapitalData';
import useValuation2 from '../hooks/useValuation2';

const useStyles = makeStyles( (mainTheme) => ({
boxSelectStyle:{
  height: "30px",
  width: "45%",
  [mainTheme.breakpoints.down('xs')]: {
    width: "100%"
  },
},
}));

export default function TestHistorical (){
  const classes = useStyles();
  const userId = "martincsl";
  const [ dialogOptions, setDialogOptions ] = useState({severity:"",title:"",message:"",buttons:{}, action:""});
  const [ isDialogOpen, setIsDialogOpen ] = useState(false);
  const currentYear = new Date().getFullYear();  // revisar
  // const historicalYears = 3 // revisar
  const [ isCheckedShowPreviousYears ] = useState(true);            // Check if previous years will be shown in income statement and cash flow (default)
  const [ isCheckedDescOrder ] = useState(true);                    // Check if numbers will appear in descending order (default)
  const [ isEstimateFcffOnly ] = useState(false);                   // Check if valuation assumptions will be complete or just estimate directly the cash flow growth
  const [ historicalFinancialData, setHistoricalFinancialData ] = useState(null);  // Array with fetched financial data from previous years
  const [ companiesList, setCompaniesList ] = useState([]);         // List of companies to populate the Auto complete Search
  const [ companyIdSearch, setCompanyIdSearch ] = useState("");     // Symbol that will be received by CompanySelect component
  const [ companyData, setCompanyData] = useState({symbol:"",shortName:"", sharesOustanding: 0, regularMarketPrice:0, fiftyTwoWeekLow:0, fiftyTwoWeekHigh:0, marketCap:0, beta:0, totalCash:0, totalDebt:0 });
  const companySearchName = companyData.symbol !=="" ? (companyData.symbol + " - " + companyData.shortName) : "" ;
  const [ assumptions, setAssumptions ] = useState({revenueGrowth:"", marginTarget:"", opexGrowth:"", interestGrowth:"", otherGrowth:"",cashFlowGrowthRate:"", taxRate:"", capexGrowth:"", nwcGrowth:"", perpetualGrowthRate: 3, cashFlowDiscretePeriod:5, companyBeta:0, riskFreeReturn:3.0790, marketReturn:10.05, debtTotalRatio:0, costOfDebt:5});
  const { createFinancialHistoricalData, createCombinedData} = useDataHandling();
  const { calcForecastedCashFlow, calcValuation, calcCostOfCapital } = useValuation2();
  const { axiosFetch: getAllCompanies } = useAxios();                // function to fecth data from all companies
  const { axiosFetch: getCompany } = useAxios();                     // function to fecth general data from one specific company
  const { axiosFetch: getFinancials } = useAxios();                  // function to fecth previous years financial data from one specific company
  const calculatedCostOfCapital = historicalFinancialData && companyData ? calcCostOfCapital(historicalFinancialData, companyData, assumptions): { costOfEquity:0, costOfCapital:0 }  ;
  const forecastedFinancialData = historicalFinancialData ? calcForecastedCashFlow (historicalFinancialData, assumptions, calculatedCostOfCapital, isEstimateFcffOnly):(Array.from({ length: 5 }, (a,b) => ({ year:currentYear + b, period:0, totalRevenue:0, costOfRevenue: 0, grossProfit: 0, grossProfitPercent:0, operatingExpenses: 0, depreciation: 0, interestExpense: 0, other: 0, incomeBeforeTax: 0, incomeTaxExpense: 0, netIncome: 0, ebit: 0, capitalExpenditures: 0, cash: 0, shortLongTermDebt:0, longTermDebt:0, workingCapitalChanges:0, cashFlow:0, discountedCashFlow:0 }))).reverse();
  const combinedFinancialData = historicalFinancialData ? createCombinedData(historicalFinancialData, forecastedFinancialData, isCheckedShowPreviousYears, isCheckedDescOrder): (Array.from({ length: 8 }, (a,b) => ({ year:currentYear-3 + b, period:0, totalRevenue:0, costOfRevenue: 0, grossProfit: 0, grossProfitPercent:0, operatingExpenses: 0, depreciation: 0, interestExpense: 0, other: 0, incomeBeforeTax: 0, incomeTaxExpense: 0, netIncome: 0, ebit: 0, capitalExpenditures: 0, cash: 0, shortLongTermDebt:0, longTermDebt:0, workingCapitalChanges:0, cashFlow:0, discountedCashFlow:0 }))).reverse();
  const valuation = forecastedFinancialData ? calcValuation(companyData, historicalFinancialData, assumptions, calculatedCostOfCapital, forecastedFinancialData): {revenueGrowth:"", marginTarget:"", opexGrowth:"", interestGrowth:"", otherGrowth:"",cashFlowGrowthRate:"", taxRate:"", capexGrowth:"", nwcGrowth:"", perpetualGrowthRate: 3, cashFlowDiscretePeriod:5, companyBeta:0, riskFreeReturn:3.0790, marketReturn:10.05, debtTotalRatio:0, costOfDebt:5} ;

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
      // setCompanySearchName(company.symbol + " - " + company.shortName);
      setCompanyData({symbol:company.symbol, shortName:company.shortName, sharesOutstanding: shares, regularMarketPrice:company.regularMarketPrice, fiftyTwoWeekLow:company.fiftyTwoWeekLow, fiftyTwoWeekHigh:company.fiftyTwoWeekHigh, marketCap:company.marketCap/1000000000, beta:company.beta, totalCash: company.totalCash/1000000000, totalDebt: company.totalDebt/1000000000})
      setAssumptions (prevState => ({...prevState, companyBeta: company.beta, revenueGrowth:"", marginTarget:"", opexGrowth:"", interestGrowth:"", otherGrowth:"",taxRate:"",capexGrowth:"",nwcGrowth:"",cashFlowGrowthRate:"",cashFlowDiscretePeriod:5 }))
      // clean previous company forecasted data
      // setForecastedFinancialData(forecastedInitialValues);
      // setCombinedFinancialData(historicalFinancialData);
    } 
  }

  function financialsSuccessCallback (apiData){
    setHistoricalFinancialData(createFinancialHistoricalData ( apiData ));
  }

  function errorCallback(errorMessage){
    setDialogOptions({severity:"error", title:"Oops", message:errorMessage,buttons:{button1:"Ok"}})
    setIsDialogOpen (true);
  }

  function handleDialogClose (value, action) { 
    setIsDialogOpen (false);
    setDialogOptions({severity:"",title:"",message:"",buttons:{},action:""});
  }

  useEffect(() => {
    getAllCompanies({ axiosInstance: valuationsWebApi, method: 'GET', url: '/companies', }, allCompaniesSuccessCallback, errorCallback);
  }, []);

  useEffect(() => {
    if (companyIdSearch){
      getCompany({ axiosInstance: valuationsWebApi, method: 'GET', url: `/companies/${companyIdSearch}`, requestConfig: { headers: {'Authorization': userId,},}},companySuccessCallback, errorCallback);
      getFinancials({ axiosInstance: valuationsWebApi, method: 'GET', url: `/financials/${companyIdSearch}`, requestConfig: { headers: {'Authorization': userId,},}},financialsSuccessCallback, errorCallback);
    }
  }, [companyIdSearch]);

  return(
    <>
    <div>
      { companiesList ? <>
        <Box className = {classes.boxSelectStyle} >
          <CompanySelect 
            companiesList = {companiesList} 
            companyIdSearch = {companyIdSearch}     // 
            companySearchName = {companySearchName} // receives back the name
            setCompanyIdSearch = {setCompanyIdSearch} />
        </Box>
        <Box style={{height:"10px"}}/>
      </> : null}
      { historicalFinancialData ? <>
        <TableHistoricalData2 historicalFinancialData = {historicalFinancialData} />
      </>
      : <p>Sin datos del fetch</p>}

      <Box style={{height:"5px"}}/>

      <FormCostOfCapitalData 
        assumptions = {assumptions} 
        setAssumptions = {setAssumptions}
        calculatedCostOfCapital = {calculatedCostOfCapital}
      />
    
    <Box style={{height: "5px"}}/>
    { companyData ? <p>{companyData.marketCap}</p> : <p>Without Market Cap</p>}

    <Box style={{height: "5px"}}/>
    { companySearchName ? <p>{companySearchName}</p> : <p>Without Name</p>}

    <Box style={{height: "5px"}}/>
    { calculatedCostOfCapital ? <p>{calculatedCostOfCapital.costOfCapital}</p> : <p>Without Wacc</p>}

    <Box style={{height: "5px"}}/>
    { forecastedFinancialData ? <>
      {forecastedFinancialData.map ( (currElement)=> (
          <p>{`Year ${currElement.year} Revenue: ${currElement.totalRevenue}`}</p>
      ))}
    </>: null}

    {/* <Box style={{height: "10px"}}/>
    { combinedFinancialData ? <>
      {combinedFinancialData.map ( (currElement)=> (
          <p>{`Year ${currElement.year} Revenue: ${currElement.totalRevenue}`}</p>
      ))}
    </>: null} */}

    { assumptions ? <>
      <FormBusinessData 
        assumptions = {assumptions} 
        setAssumptions = {setAssumptions}
      />
    </>: null}

    <TableIncomeStatement  
      combinedFinancialData={combinedFinancialData} 
      assumptions={assumptions} 
      isCheckedShowPreviousYears={isCheckedShowPreviousYears} 
      isCheckedDescOrder={isCheckedDescOrder} 
      isEstimateFcffOnly={isEstimateFcffOnly} 
    />

    <Box style={{height: "5px"}}/>
    <TableValuation 
      valuation = {valuation} 
      historicalFinancialData = {historicalFinancialData} 
      calculatedCostOfCapital = {calculatedCostOfCapital}
      assumptions = {assumptions}
      companyData = {companyData}
    />

    <DialogModal open={isDialogOpen} onClose={handleDialogClose} severity={dialogOptions.severity} title={dialogOptions.title} buttons={dialogOptions.buttons} action={dialogOptions.action}>
      {dialogOptions.message}
    </DialogModal> 
    </div>
    </>
  )
}


  // ja poderia calcular com a funcao, dando 0 em todos os anos....
  // let forecastedFinancialData = (Array.from({ length: 5 }, (a,b) => ({ year:currentYear + b, period:0, totalRevenue:0, costOfRevenue: 0, grossProfit: 0, grossProfitPercent:0, operatingExpenses: 0, depreciation: 0, interestExpense: 0, other: 0, incomeBeforeTax: 0, incomeTaxExpense: 0, netIncome: 0, ebit: 0, capitalExpenditures: 0, cash: 0, shortLongTermDebt:0, longTermDebt:0, workingCapitalChanges:0, cashFlow:0, discountedCashFlow:0 }))).reverse();
  // const [ forecastedFinancialData, setForecastedFinancialData]= useState((Array.from({ length: 5 }, (a,b) => ({ year:currentYear + b, period:0, totalRevenue:0, costOfRevenue: 0, grossProfit: 0, grossProfitPercent:0, operatingExpenses: 0, depreciation: 0, interestExpense: 0, other: 0, incomeBeforeTax: 0, incomeTaxExpense: 0, netIncome: 0, ebit: 0, capitalExpenditures: 0, cash: 0, shortLongTermDebt:0, longTermDebt:0, workingCapitalChanges:0, cashFlow:0, discountedCashFlow:0 }))).reverse());


  // function createFinancialHistoricalData ( apiData ){
  //   // Note: Does not uses Yahoo Finance 'totalOperatingExpenses'and 'ebit' data, but formulas instead
  //   let financials = Array.from({ length: 4 } , () => ({ year: 0, totalRevenue:0, costOfRevenue: 0, grossProfit: 0, grossProfitPercent:0, operatingExpenses: 0, depreciation: 0, interestExpense: 0, other: 0, incomeBeforeTax: 0, incomeTaxExpense: 0, netIncome: 0, ebit: 0, capitalExpenditures: 0, cash: 0, shortLongTermDebt:0, longTermDebt:0, totalCurrentAssets:0, totalCurrentLiabilities:0, workingCapitalChanges:0, cashFlow:0, discountedCashFlow:0 }));
  //   if (apiData) {
  //     financials[0].workingCapitalChanges = ((apiData[0].totalCurrentAssets-apiData[0].totalCurrentLiabilities)-(apiData[1].totalCurrentAssets-apiData[1].totalCurrentLiabilities))/1000000000;
  //     financials[1].workingCapitalChanges = ((apiData[1].totalCurrentAssets-apiData[1].totalCurrentLiabilities)-(apiData[2].totalCurrentAssets-apiData[2].totalCurrentLiabilities))/1000000000;
  //     financials[2].workingCapitalChanges = ((apiData[2].totalCurrentAssets-apiData[2].totalCurrentLiabilities)-(apiData[3].totalCurrentAssets-apiData[3].totalCurrentLiabilities))/1000000000;
  //     // check how many years have apiData?
  //     for (let i = 0 ; i < 4; i++) {
  //       financials[i].year = apiData[i].year;
  //       financials[i].totalRevenue = apiData[i].totalRevenue/1000000000;
  //       financials[i].costOfRevenue = apiData[i].costOfRevenue/-1000000000;
  //       financials[i].grossProfit = apiData[i].grossProfit/1000000000;
  //       financials[i].grossProfitPercent = (apiData[i].grossProfit/apiData[i].totalRevenue)*100;
  //       financials[i].operatingExpenses = apiData[i].sellingGeneralAdministrative/-1000000000 + apiData[i].otherOperatingExpenses/-1000000000 + apiData[i].researchDevelopment/-1000000000 + apiData[i].otherItems/-1000000000;
  //       financials[i].depreciation = apiData[i].depreciation/-1000000000;
  //       financials[i].interestExpense = apiData[i].interestExpense/1000000000;
  //       financials[i].incomeBeforeTax = apiData[i].incomeBeforeTax/1000000000;
  //       financials[i].other = financials[i].incomeBeforeTax-( financials[i].grossProfit+ financials[i].operatingExpenses+financials[i].depreciation+financials[i].interestExpense); 
  //       financials[i].incomeTaxExpense = (apiData[i].incomeTaxExpense/1000000000)*-1;
  //       financials[i].netIncome = apiData[i].netIncome/1000000000;
  //       financials[i].ebit =  financials[i].incomeBeforeTax - financials[i].interestExpense;
  //       financials[i].capitalExpenditures = apiData[i].capitalExpenditures/1000000000;
  //       financials[i].cash = apiData[i].cash/1000000000;
  //       financials[i].shortLongTermDebt = apiData[i].shortLongTermDebt/1000000000;
  //       financials[i].longTermDebt = apiData[i].longTermDebt/1000000000;
  //       financials[i].totalCurrentAssets = apiData[i].totalCurrentAssets/1000000000;
  //       financials[i].totalCurrentLiabilities = apiData[i].totalCurrentLiabilities/1000000000;
  //       financials[i].cashFlow =  financials[i].ebit + financials[i].incomeTaxExpense - financials[i].depreciation + financials[i].capitalExpenditures + financials[i].workingCapitalChanges;
  //     }
  //   }
  //   return financials
  // }