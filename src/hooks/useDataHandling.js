import api from '../services/api';

export default function useDataHandling({ companyData, historicalFinancialData, assumptions, calculatedCostOfCapital, valuation, forecastedFinancialData, isCheckedShowPreviousYears, isCheckedDescOrder }){

  function createCombinedData (){   
    if (historicalFinancialData){
      const historicalArray = historicalFinancialData.slice(0,3);
      const forecastedArray = forecastedFinancialData.map((x) => x);
      if (isCheckedShowPreviousYears) {
        if (isCheckedDescOrder) {
          return forecastedArray.concat(historicalArray)
        }
        return forecastedArray.concat(historicalArray).reverse();
      } else {
        if (isCheckedDescOrder) {
          return forecastedArray
        } return forecastedArray.reverse()
      }
    }
  }

  async function handleValuation(){ // esta ok
  
    const userId = "martincsl"; // revisar
    const companyId = companyData.symbol;
    const { revenueGrowth, marginTarget, opexGrowth, interestGrowth, otherGrowth, taxRate, capexGrowth, nwcGrowth, perpetualGrowthRate, cashFlowDiscretePeriod, companyBeta, riskFreeReturn, marketReturn, debtTotalRatio, costOfDebt} = assumptions
    const { costOfEquity, costOfCapital} = calculatedCostOfCapital
    const { cashFlowAvgGrowth, sumOfCashFlowPresentValue, perpetuityValue, perpetuityPresentValue, enterpriseValue, cash, debt, equityValue, sharesOutstanding, targetStockPrice, marketCap } = valuation;
    const valuationData = { userId, companyId, cashFlowAvgGrowth, sumOfCashFlowPresentValue, perpetuityValue, perpetuityPresentValue, enterpriseValue, cash, debt, equityValue, sharesOutstanding, targetStockPrice, marketCap, revenueGrowth, marginTarget, opexGrowth, interestGrowth, otherGrowth, taxRate, capexGrowth, nwcGrowth, perpetualGrowthRate, cashFlowDiscretePeriod, companyBeta, riskFreeReturn, marketReturn, debtTotalRatio, costOfDebt, costOfEquity, costOfCapital } ;
    let dataToProcess=[];
    api.post('/valuations', valuationData ).then (response => { 

      const { valuationId: valuationId, data } = response.data;
      dataToProcess = forecastedFinancialData.map((item, index) => ({...item, valuationId:valuationId, forecastedId:valuationId + index.toString(), companyId:companyData.symbol})) 
      dataToProcess.map ((currElement)=> (

        api.post('/forecasted', currElement ).then (response => {
          //poner mensaje y codigo de exito..
        }).catch (function (err){
          if (err.request){
            return { valid: false, message:"Server not responding" };
          } 
          if ( err.response.status == 404) {
            return { valid: false, message:"Database not found" };
          }
          const errorMsg = Object.values(err.response.data);
        })))
      
    }).catch (function (err){
      if (err.request){
        return { valid: false, message:"Server not responding" };
      } 
      if ( err.response.status == 404) {
        return { valid: false, message:"Database not found" };
      }
      const errorMsg = Object.values(err.response.data);
    });
}

function createFinancialHistoricalData ( apiData ){
  // Note: Does not uses Yahoo Finance 'totalOperatingExpenses'and 'ebit' data, but formulas instead
  let financials = Array.from({ length: 4 } , () => ({ year: 0, totalRevenue:0, costOfRevenue: 0, grossProfit: 0, grossProfitPercent:0, operatingExpenses: 0, depreciation: 0, interestExpense: 0, other: 0, incomeBeforeTax: 0, incomeTaxExpense: 0, netIncome: 0, ebit: 0, capitalExpenditures: 0, cash: 0, shortLongTermDebt:0, longTermDebt:0, totalCurrentAssets:0, totalCurrentLiabilities:0, workingCapitalChanges:0, cashFlow:0, discountedCashFlow:0 }));
  if (apiData) {
    financials[0].workingCapitalChanges = ((apiData[0].totalCurrentAssets-apiData[0].totalCurrentLiabilities)-(apiData[1].totalCurrentAssets-apiData[1].totalCurrentLiabilities))/1000000000;
    financials[1].workingCapitalChanges = ((apiData[1].totalCurrentAssets-apiData[1].totalCurrentLiabilities)-(apiData[2].totalCurrentAssets-apiData[2].totalCurrentLiabilities))/1000000000;
    financials[2].workingCapitalChanges = ((apiData[2].totalCurrentAssets-apiData[2].totalCurrentLiabilities)-(apiData[3].totalCurrentAssets-apiData[3].totalCurrentLiabilities))/1000000000;
    // check how many years have apiData?
    for (let i = 0 ; i < 4; i++) {
      financials[i].year = apiData[i].year;
      financials[i].totalRevenue = apiData[i].totalRevenue/1000000000;
      financials[i].costOfRevenue = apiData[i].costOfRevenue/-1000000000;
      financials[i].grossProfit = apiData[i].grossProfit/1000000000;
      financials[i].grossProfitPercent = (apiData[i].grossProfit/apiData[i].totalRevenue)*100;
      financials[i].operatingExpenses = apiData[i].sellingGeneralAdministrative/-1000000000 + apiData[i].otherOperatingExpenses/-1000000000 + apiData[i].researchDevelopment/-1000000000 + apiData[i].otherItems/-1000000000;
      financials[i].depreciation = apiData[i].depreciation/-1000000000;
      financials[i].interestExpense = apiData[i].interestExpense/1000000000;
      financials[i].incomeBeforeTax = apiData[i].incomeBeforeTax/1000000000;
      financials[i].other = financials[i].incomeBeforeTax-( financials[i].grossProfit+ financials[i].operatingExpenses+financials[i].depreciation+financials[i].interestExpense); 
      financials[i].incomeTaxExpense = (apiData[i].incomeTaxExpense/1000000000)*-1;
      financials[i].netIncome = apiData[i].netIncome/1000000000;
      financials[i].ebit =  financials[i].incomeBeforeTax - financials[i].interestExpense;
      financials[i].capitalExpenditures = apiData[i].capitalExpenditures/1000000000;
      financials[i].cash = apiData[i].cash/1000000000;
      financials[i].shortLongTermDebt = apiData[i].shortLongTermDebt/1000000000;
      financials[i].longTermDebt = apiData[i].longTermDebt/1000000000;
      financials[i].totalCurrentAssets = apiData[i].totalCurrentAssets/1000000000;
      financials[i].totalCurrentLiabilities = apiData[i].totalCurrentLiabilities/1000000000;
      financials[i].cashFlow =  financials[i].ebit + financials[i].incomeTaxExpense - financials[i].depreciation + financials[i].capitalExpenditures + financials[i].workingCapitalChanges;
    }
  }
  return financials
}

  return { createCombinedData, createFinancialHistoricalData, handleValuation } 
}