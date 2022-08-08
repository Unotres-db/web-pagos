export default function useDataHandling() {   

  function round (num) {
    var m = Number((Math.abs(num) * 100).toPrecision(15));
    return Math.round(m) / 100 * Math.sign(num);
  }

  function calcGrowthRate (initialValue, finalValue, years){
    if (initialValue > 0 && finalValue > 0){
      return round((((finalValue/initialValue)**(1/years))-1)*100)
    }
    if (initialValue < 0 && finalValue < 0){
      return round((((Math.abs(finalValue)/Math.abs(initialValue))**(1/years))-1)*100)
    }
    if (initialValue < 0 && finalValue > 0){
      return round((((finalValue + (2*Math.abs(initialValue))/Math.abs(initialValue))**(1/years))-1)*100)
    }
    if (initialValue > 0 && finalValue < 0){
      return round((((Math.abs(finalValue) + (2*(initialValue))/Math.abs(initialValue))**(1/years))-1)*-100)
    }
    else return 0
  }

  function createCombinedData ( historicalFinancialData, forecastedFinancialData, isCheckedShowPreviousYears, isCheckedDescOrder ){   
    // Combines data from historical and forecasted data in just one array, to use in tables and chart
    let emptyArray = Array.from({ length: 8 } , () => ({ year:0, period:0, totalRevenue:0, costOfRevenue: 0, grossProfit: 0, grossProfitPercent:0, operatingExpenses: 0, depreciation: 0, interestExpense: 0, other: 0, incomeBeforeTax: 0, incomeTaxExpense: 0, netIncome: 0, ebit: 0, capitalExpenditures: 0, cash: 0, shortLongTermDebt:0, longTermDebt:0, workingCapitalChanges:0, cashFlow:0, discountedCashFlow:0 }))
    if (historicalFinancialData) {
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
    if (isCheckedShowPreviousYears) { 
      emptyArray[0].year = 2019  // revisar
    } else {
      emptyArray.length -=3
      emptyArray[0].year = 2022  // Revisar
    }
    for ( let i = 1 ; i < emptyArray.length ; i ++) {
      emptyArray[i].year = emptyArray[i-1].year + 1
    }
    if (isCheckedDescOrder) {
      return emptyArray.reverse()
    } return emptyArray
  }

  function createFinancialHistoricalData ( apiData ){ //revisar
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

  function calcHistoricalAverages(historicalFinancialData){
    let averagesIndicators = {revenueCAGR: 0, opexCAGR: 0, interestCAGR: 0, otherCAGR: 0, capexCAGR:0, nwcCAGR:0, sumOfRevenue: 0, sumOfGrossProfit: 0, marginAvg: 0, sumOfIncomeBeforeTax: 0, sumOfIncomeTaxExpense: 0, taxRateAvg:0, cashFlowCAGR:0}
    if (historicalFinancialData){
      if ( historicalFinancialData[0].totalRevenue !== undefined &&  historicalFinancialData[0].totalRevenue !== null ){ 
        for (let i = 0; i < historicalFinancialData.length-1 ; i++) {
          if (  historicalFinancialData[i].totalRevenue !== undefined &&  historicalFinancialData[i].totalRevenue !== null ){
            averagesIndicators.sumOfRevenue = averagesIndicators.sumOfRevenue + historicalFinancialData[i].totalRevenue;
          } else { averagesIndicators.sumOfRevenue = 0 }
          averagesIndicators.sumOfGrossProfit = averagesIndicators.sumOfGrossProfit + historicalFinancialData[i].grossProfit;
          averagesIndicators.sumOfIncomeBeforeTax = averagesIndicators.sumOfIncomeBeforeTax + historicalFinancialData[i].incomeBeforeTax;
          averagesIndicators.sumOfIncomeTaxExpense = averagesIndicators.sumOfIncomeTaxExpense + historicalFinancialData[i].incomeTaxExpense;
        }
        if ( historicalFinancialData[3].totalRevenue !== undefined &&  historicalFinancialData[2].totalRevenue !== null ){
          averagesIndicators.revenueCAGR = round((((historicalFinancialData[2].totalRevenue/historicalFinancialData[0].totalRevenue)**(1/2)) -1)*-100);
        } else { averagesIndicators.revenueCAGR = 0 }
        averagesIndicators.revenueCAGR = calcGrowthRate(historicalFinancialData[2].totalRevenue,historicalFinancialData[0].totalRevenue, 2);
        if (averagesIndicators.sumOfRevenue > 0) {
          averagesIndicators.marginAvg = round((averagesIndicators.sumOfGrossProfit/averagesIndicators.sumOfRevenue)*100);
        }
        averagesIndicators.opexCAGR = calcGrowthRate(historicalFinancialData[2].operatingExpenses,historicalFinancialData[0].operatingExpenses, 2) ;
        averagesIndicators.interestCAGR = calcGrowthRate(historicalFinancialData[2].interestExpense,historicalFinancialData[0].interestExpense, 2)
        averagesIndicators.otherCAGR = calcGrowthRate(historicalFinancialData[2].other,historicalFinancialData[0].other,2)
        if (averagesIndicators.sumOfIncomeBeforeTax !=0) {
          averagesIndicators.taxRateAvg =  round((averagesIndicators.sumOfIncomeTaxExpense/averagesIndicators.sumOfIncomeBeforeTax)*-100);
        }
        averagesIndicators.capexCAGR = calcGrowthRate(historicalFinancialData[2].capitalExpenditures,historicalFinancialData[0].capitalExpenditures, 2)
        averagesIndicators.nwcCAGR = calcGrowthRate(historicalFinancialData[2].workingCapitalChanges,historicalFinancialData[0].workingCapitalChanges, 2);
        averagesIndicators.cashFlowCAGR = calcGrowthRate(historicalFinancialData[2].cashFlow,historicalFinancialData[0].cashFlow, 2);
      }
    }
    return averagesIndicators
  }

  return { createCombinedData, createFinancialHistoricalData, calcHistoricalAverages } 
}