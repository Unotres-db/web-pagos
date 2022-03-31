export default function useValuation({assumptions, forecastedFinancialData, historicalFinancialData, setHistoricalAverages, calculatedCostOfCapital, companyData, isEstimateFcffOnly }) {   //
  
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

  function calcHistoricalAverages(){
  
    let averagesIndicators = {revenueCAGR: 0, opexCAGR: 0, interestCAGR: 0, otherCAGR: 0, capexCAGR:0, nwcCAGR:0, sumOfRevenue: 0, sumOfGrossProfit: 0, marginAvg: 0, sumOfIncomeBeforeTax: 0, sumOfIncomeTaxExpense: 0, taxRateAvg:0}

    // if (  historicalFinancialData[0].totalRevenue !== undefined &&  historicalFinancialData[0].totalRevenue !== null ){ 
      // CAGR = Compound Annual Growth Rate
      
      for (let i = 0; i < historicalFinancialData.length-1 ; i++) {

        if (  historicalFinancialData[i].totalRevenue !== undefined &&  historicalFinancialData[i].totalRevenue !== null ){
          averagesIndicators.sumOfRevenue = averagesIndicators.sumOfRevenue + historicalFinancialData[i].totalRevenue;
        } else { averagesIndicators.sumOfRevenue = 0 }
        averagesIndicators.sumOfGrossProfit = averagesIndicators.sumOfGrossProfit + historicalFinancialData[i].grossProfit;
        averagesIndicators.sumOfIncomeBeforeTax = averagesIndicators.sumOfIncomeBeforeTax + historicalFinancialData[i].incomeBeforeTax;
        averagesIndicators.sumOfIncomeTaxExpense = averagesIndicators.sumOfIncomeTaxExpense + historicalFinancialData[i].incomeTaxExpense;
        }
        if ( historicalFinancialData[3].totalRevenue !== undefined &&  historicalFinancialData[3].totalRevenue !== null ){
          averagesIndicators.revenueCAGR = round((((historicalFinancialData[3].totalRevenue/historicalFinancialData[0].totalRevenue)**(1/4)) -1)*-100);
        } else { averagesIndicators.revenueCAGR = 0 }
        averagesIndicators.revenueCAGR = calcGrowthRate(historicalFinancialData[3].totalRevenue,historicalFinancialData[0].totalRevenue, 4);
        averagesIndicators.marginAvg = round((averagesIndicators.sumOfGrossProfit/averagesIndicators.sumOfRevenue)*100);
        averagesIndicators.opexCAGR = calcGrowthRate(historicalFinancialData[3].operatingExpense,historicalFinancialData[0].operatingExpense, 4) *-1;
        averagesIndicators.interestCAGR = calcGrowthRate(historicalFinancialData[3].interestExpense,historicalFinancialData[0].interestExpense, 4)
        averagesIndicators.otherCAGR = calcGrowthRate(historicalFinancialData[3].other,historicalFinancialData[0].other,4)
        averagesIndicators.taxRateAvg =  round((averagesIndicators.sumOfIncomeTaxExpense/averagesIndicators.sumOfIncomeBeforeTax)*-100);
        averagesIndicators.capexCAGR = calcGrowthRate(historicalFinancialData[2].capitalExpenditures,historicalFinancialData[0].capitalExpenditures, 3)
        averagesIndicators.nwcCAGR = calcGrowthRate(historicalFinancialData[2].workingCapitalChanges,historicalFinancialData[0].workingCapitalChanges, 3);
        setHistoricalAverages(prevState => ({...prevState, 
          revenueGrowth:averagesIndicators.revenueCAGR, 
          marginTarget:averagesIndicators.marginAvg,
          opexGrowth:averagesIndicators.opexCAGR,
          interestGrowth:averagesIndicators.interestCAGR,
          otherGrowth:averagesIndicators.otherCAGR,
          taxRate:averagesIndicators.taxRateAvg,
          capexGrowth:averagesIndicators.capexCAGR,
          nwcGrowth:averagesIndicators.nwcCAGR
        }));
      // setAssumptions(prevState => ({...prevState, 
      //   revenueGrowth:averagesIndicators.revenueCAGR, 
      //   marginTarget:averagesIndicators.marginAvg,
      //   opexGrowth:averagesIndicators.opexCAGR,
      //   interestGrowth:averagesIndicators.interestCAGR,
      //   otherGrowth:averagesIndicators.otherCAGR,
      //   taxRate:averagesIndicators.taxRateAvg,
      //   capexGrowth:averagesIndicators.capexCAGR,
      //   nwcGrowth:averagesIndicators.nwcCAGR
      // }));
  // }
    // console.log(historicalAverages) ;
  }

  function calcCostOfCapital (){
    // uses CAPM model
    // alert("--entrou em calcCostOfCapital");
  if (historicalFinancialData){
    const debtRatio = (historicalFinancialData[0].longTermDebt + historicalFinancialData[0].shortLongTermDebt)/(historicalFinancialData[0].longTermDebt + historicalFinancialData[0].shortLongTermDebt + companyData.marketCap)
    let ke = round((parseFloat(assumptions.riskFreeReturn/100) + (assumptions.companyBeta*(parseFloat(assumptions.marketReturn/100)-parseFloat(assumptions.riskFreeReturn/100))))*100);
    let calculatedWacc = round((assumptions.costOfDebt * parseFloat(debtRatio)) + (ke * parseFloat(1 - debtRatio)));
    return {costOfEquity:ke, costOfCapital:calculatedWacc}
  }
  };
  
  function calcForecastedCashFlow () {
    // alert("--entrou em calcForecastedCashFlow");
    let estFinancialDataArr = Array.from({ length: 5 } , () => ({ year: 0, period:0, totalRevenue:0, costOfRevenue: 0, grossProfit: 0, operatingExpenses: 0, depreciation: 0, interestExpense: 0, other: 0, incomeBeforeTax: 0, incomeTaxExpense: 0, netIncome: 0, ebit: 0, capitalExpenditures: 0, cash: 0, shortLongTermDebt:0, longTermDebt:0, workingCapitalChanges:0, cashFlow:0, discountedCashFlow:0 }));
    estFinancialDataArr[0].year = historicalFinancialData[0].year + 1;
    // estFinancialDataArr[0].period = 0;
    estFinancialDataArr[0].period = estFinancialDataArr.length-1;
    if (isEstimateFcffOnly){ // calculate only the fcff (free casf flow of the firm)
      const baseFcff = historicalFinancialData[0].ebit
                    + historicalFinancialData[0].incomeTaxExpense
                    - historicalFinancialData[0].depreciation
                    + historicalFinancialData[0].capitalExpenditures
                    + historicalFinancialData[0].workingCapitalChanges;
      if (assumptions.fcffGrowthRate === "") {
        for (let i = 1; i <estFinancialDataArr.length ; i++){
          estFinancialDataArr[i].year = estFinancialDataArr[i-1].year + 1 ;
          estFinancialDataArr[i].period = Math.abs(i-estFinancialDataArr.length)-1;
          estFinancialDataArr[i].cashFlow = 0;
          estFinancialDataArr[i].discountedCashFlow = 0;
        }  
      } else {
        estFinancialDataArr[0].cashFlow = baseFcff * (1 + parseFloat(assumptions.cashFlowGrowthRate/100));
        estFinancialDataArr[0].discountedCashFlow = (estFinancialDataArr[0].cashFlow)/(1 + parseFloat(calculatedCostOfCapital.costOfCapital/100));
        for (let i = 1; i < estFinancialDataArr.length ; i++){
          estFinancialDataArr[i].year = estFinancialDataArr[i-1].year + 1 ;
          estFinancialDataArr[i].period = Math.abs(i-estFinancialDataArr.length)-1;
          estFinancialDataArr[i].cashFlow = estFinancialDataArr[i-1].cashFlow * (1 + parseFloat(assumptions.cashFlowGrowthRate/100));
          estFinancialDataArr[i].discountedCashFlow = estFinancialDataArr[i].cashFlow/(Math.pow((1+parseFloat(calculatedCostOfCapital.costOfCapital/100)),(i+1))); 
        } 
      }
    } else {  //calculate all accounts
        // if (  historicalFinancialData[0].totalRevenue !== undefined &&  historicalFinancialData[0].totalRevenue !== null && historicalFinancialData[0].totalRevenue !== 0){ 
        if (assumptions.revenueGrowth === "") {
          estFinancialDataArr[0].totalRevenue = 0
        } else {
          estFinancialDataArr[0].totalRevenue = historicalFinancialData[0].totalRevenue * (1 + parseFloat(assumptions.revenueGrowth/100));
        }  
        estFinancialDataArr[0].costOfRevenue = ( estFinancialDataArr[0].totalRevenue * (1 - parseFloat(assumptions.marginTarget/100)))*-1;
        estFinancialDataArr[0].grossProfit = estFinancialDataArr[0].totalRevenue + estFinancialDataArr[0].costOfRevenue;
        if (assumptions.opexGrowth === "") {
          estFinancialDataArr[0].operatingExpenses = 0
        } else {
            estFinancialDataArr[0].operatingExpenses = historicalFinancialData[0].operatingExpenses*(1 + parseFloat(assumptions.opexGrowth/100));
        }  
        if (assumptions.capexGrowth === "") {
          estFinancialDataArr[0].depreciation = 0
        } else {
            estFinancialDataArr[0].depreciation = historicalFinancialData[0].depreciation*(1 + parseFloat(assumptions.capexGrowth/100));
        }  
        if (assumptions.interestGrowth === "") {
          estFinancialDataArr[0].interestExpense = 0
        } else {
            estFinancialDataArr[0].interestExpense = historicalFinancialData[0].interestExpense*(1 + parseFloat(assumptions.interestGrowth/100));
        }  
        if (assumptions.otherGrowth === "") {
          estFinancialDataArr[0].other = 0
        } else {
            estFinancialDataArr[0].other = historicalFinancialData[0].other*(1 + parseFloat(assumptions.otherGrowth/100));
        }
        estFinancialDataArr[0].incomeBeforeTax = estFinancialDataArr[0].grossProfit +estFinancialDataArr[0].operatingExpenses +estFinancialDataArr[0].depreciation +estFinancialDataArr[0].interestExpense +estFinancialDataArr[0].other;
        if (estFinancialDataArr[0].incomeBeforeTax > 0){
          estFinancialDataArr[0].incomeTaxExpense = (estFinancialDataArr[0].incomeBeforeTax*(parseFloat(assumptions.taxRate/100)))*-1;
        }
        estFinancialDataArr[0].netIncome = estFinancialDataArr[0].incomeBeforeTax +estFinancialDataArr[0].incomeTaxExpense;
        estFinancialDataArr[0].ebit = estFinancialDataArr[0].netIncome -estFinancialDataArr[0].interestExpense - estFinancialDataArr[0].incomeTaxExpense;

        if (assumptions.capexGrowth === "") {
          estFinancialDataArr[0].capitalExpenditures = 0
        } else {
            estFinancialDataArr[0].capitalExpenditures = historicalFinancialData[0].capitalExpenditures*(1 + parseFloat(assumptions.capexGrowth/100));
        }
        if (assumptions.nwcGrowth === "") {
          estFinancialDataArr[0].workingCapitalChanges = 0
        } else {
            estFinancialDataArr[0].workingCapitalChanges = historicalFinancialData[0].workingCapitalChanges*(1 + parseFloat(assumptions.nwcGrowth/100));
        }  
        estFinancialDataArr[0].cashFlow = round(estFinancialDataArr[0].ebit - estFinancialDataArr[0].depreciation + estFinancialDataArr[0].incomeTaxExpense + estFinancialDataArr[0].capitalExpenditures + estFinancialDataArr[0].workingCapitalChanges);
        estFinancialDataArr[0].discountedCashFlow = (estFinancialDataArr[0].cashFlow)/(1+parseFloat(calculatedCostOfCapital.costOfCapital/100));

        for (let i = 1; i < estFinancialDataArr.length ; i++){
          estFinancialDataArr[i].year = estFinancialDataArr[i-1].year + 1 ;
          estFinancialDataArr[i].period = Math.abs(i-estFinancialDataArr.length)-1;
          estFinancialDataArr[i].totalRevenue = estFinancialDataArr[i-1].totalRevenue * (1 + parseFloat(assumptions.revenueGrowth/100));
          estFinancialDataArr[i].costOfRevenue = (estFinancialDataArr[i].totalRevenue * (1 - parseFloat(assumptions.marginTarget/100)))*-1;
          estFinancialDataArr[i].grossProfit = estFinancialDataArr[i].totalRevenue +estFinancialDataArr[i].costOfRevenue;
          estFinancialDataArr[i].operatingExpenses = estFinancialDataArr[i-1].operatingExpenses*(1 + parseFloat(assumptions.opexGrowth/100));
          estFinancialDataArr[i].depreciation = estFinancialDataArr[i-1].depreciation * (1 + parseFloat(assumptions.capexGrowth/100));
          estFinancialDataArr[i].interestExpense = estFinancialDataArr[i-1].interestExpense * (1 + parseFloat(assumptions.interestGrowth/100));
          estFinancialDataArr[i].other = estFinancialDataArr[i-1].other * (1 + parseFloat(assumptions.otherGrowth/100));
          estFinancialDataArr[i].incomeBeforeTax = estFinancialDataArr[i].grossProfit +estFinancialDataArr[i].operatingExpenses + estFinancialDataArr[i].depreciation + estFinancialDataArr[i].interestExpense + estFinancialDataArr[i].other;
          if (estFinancialDataArr[i].incomeBeforeTax > 0){
            estFinancialDataArr[i].incomeTaxExpense = ((estFinancialDataArr[i].incomeBeforeTax*(parseFloat(assumptions.taxRate/100)))*-1);
          }
          estFinancialDataArr[i].netIncome = estFinancialDataArr[i].incomeBeforeTax +estFinancialDataArr[i].incomeTaxExpense;
          estFinancialDataArr[i].ebit = estFinancialDataArr[i].netIncome - estFinancialDataArr[i].interestExpense - estFinancialDataArr[i].incomeTaxExpense;
          estFinancialDataArr[i].capitalExpenditures = estFinancialDataArr[i-1].capitalExpenditures * (1 + parseFloat(assumptions.capexGrowth/100));
          estFinancialDataArr[i].workingCapitalChanges = estFinancialDataArr[i-1].workingCapitalChanges * (1 + parseFloat(assumptions.nwcGrowth/100));
          estFinancialDataArr[i].cashFlow = round(estFinancialDataArr[i].ebit - estFinancialDataArr[i].depreciation + estFinancialDataArr[i].incomeTaxExpense + estFinancialDataArr[i].capitalExpenditures + estFinancialDataArr[i].workingCapitalChanges);
          estFinancialDataArr[i].discountedCashFlow = estFinancialDataArr[i].cashFlow/(Math.pow((1+parseFloat(calculatedCostOfCapital.costOfCapital/100)),(i+1))); 
        }
      }
    estFinancialDataArr.reverse(); // to show numbers in descending order
    return estFinancialDataArr
  }
  
  function calcValuation() {
  // alert("--entrou em calcValuation: ");
  if (forecastedFinancialData){
    let valuationResultsArr = { cashFlowAvgGrowth:0, sumOfCashFlowPresentValue:0, perpetuityValue:0, perpetuityPresentValue:0, enterpriseValue:0, cash:0, debt:0, equityValue:0, sharesOutstanding:0, targetStockPrice:0, marketCap:0 };
    forecastedFinancialData.map ( (currElement) => (
      valuationResultsArr.sumOfCashFlowPresentValue = valuationResultsArr.sumOfCashFlowPresentValue + currElement.discountedCashFlow
    ));
    if (forecastedFinancialData[0].cashFlow > 0){
      valuationResultsArr.perpetuityValue = (forecastedFinancialData[0].cashFlow*( 1+ parseFloat(assumptions.perpetualGrowthRate/100)))/parseFloat((calculatedCostOfCapital.costOfCapital/100)-(assumptions.perpetualGrowthRate/100));
    }
    valuationResultsArr.perpetuityPresentValue = valuationResultsArr.perpetuityValue/(Math.pow((1+parseFloat(calculatedCostOfCapital.costOfCapital/100)),(5))); 
    valuationResultsArr.enterpriseValue = valuationResultsArr.sumOfCashFlowPresentValue + valuationResultsArr.perpetuityPresentValue;
    valuationResultsArr.cash = historicalFinancialData[0].cash;
    valuationResultsArr.debt = historicalFinancialData[0].longTermDebt + historicalFinancialData[0].shortLongTermDebt;
    valuationResultsArr.equityValue = valuationResultsArr.enterpriseValue + historicalFinancialData[0].cash - historicalFinancialData[0].longTermDebt - historicalFinancialData[0].shortLongTermDebt;
    valuationResultsArr.sharesOutstanding = companyData.sharesOutstanding*1000;
    valuationResultsArr.marketCap = companyData.marketCap;
    if (valuationResultsArr.equityValue > 0){
      valuationResultsArr.targetStockPrice = (valuationResultsArr.equityValue)/companyData.sharesOutstanding*1000;
    }
    valuationResultsArr.cashFlowAvgGrowth = calcGrowthRate(historicalFinancialData[0].cashFlow,forecastedFinancialData[0].cashFlow, 5 )
    return valuationResultsArr
  }
  }

  return {calcForecastedCashFlow, calcValuation, calcCostOfCapital, calcHistoricalAverages};
}