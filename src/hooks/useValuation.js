export default function useValuation2() {   
  
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

  function calcTaxRate( historicalFinancialData, assumptions ){
    if (historicalFinancialData){
      let taxFactor = 0;
      if (assumptions.taxRate > 0) {
        taxFactor = (100-assumptions.taxRate)/100
        return taxFactor
      } 
      let sumOfIncomeBeforeTax = 0
      let sumOfIncomeTaxExpense = 0;
      let calculatedTaxRate = 0;
      for (let i = 0; i < historicalFinancialData.length-1 ; i++) {
        sumOfIncomeBeforeTax = sumOfIncomeBeforeTax + historicalFinancialData[i].incomeBeforeTax;
        sumOfIncomeTaxExpense = sumOfIncomeTaxExpense + historicalFinancialData[i].incomeTaxExpense;
      } 
      calculatedTaxRate=((sumOfIncomeTaxExpense/sumOfIncomeBeforeTax)*-100);
      if (calculatedTaxRate != 0) {
        return (100-calculatedTaxRate)/100 
      }
      return 0.70
    }
  }

  function calcCostOfCapital (historicalFinancialData, companyData, assumptions){   // nao usa o % da media...
    // Note: uses CAPM (Capital Assets Pricing Model) formulas: Ke = Rf + beta * ( Rm - Rf) ; Kd = Cost of debt * (100% - Tax Rate)
    let ke = 0;
    let calculatedWacc = 0;
    if (historicalFinancialData && companyData.marketCap > 0){
      const debtRatio = (companyData.totalDebt)/(companyData.totalDebt + companyData.marketCap)
      ke = round((parseFloat(assumptions.riskFreeReturn/100) + (assumptions.companyBeta*(parseFloat(assumptions.marketReturn/100)-parseFloat(assumptions.riskFreeReturn/100))))*100);
      calculatedWacc = round((assumptions.costOfDebt * parseFloat(calcTaxRate(historicalFinancialData, assumptions)) * parseFloat(debtRatio)) + (ke * parseFloat(1 - debtRatio)));
    }
    return {costOfEquity:ke, costOfCapital:calculatedWacc}
  };
  
  function calcForecastedCashFlow (historicalFinancialData, assumptions, calculatedCostOfCapital,isEstimateFcffOnly) {

    let estFinancialDataArr = Array.from({ length: parseInt(assumptions.cashFlowDiscretePeriod) } , () => ({ year: 0, period:0, totalRevenue:0, costOfRevenue: 0, grossProfit: 0, grossProfitPercent:0, operatingExpenses: 0, depreciation: 0, interestExpense: 0, other: 0, incomeBeforeTax: 0, incomeTaxExpense: 0, netIncome: 0, ebit: 0, capitalExpenditures: 0, cash: 0, shortLongTermDebt:0, longTermDebt:0, workingCapitalChanges:0, cashFlow:0, discountedCashFlow:0 }));
    if (historicalFinancialData ){

      if (assumptions.cashFlowDiscretePeriod !=null && assumptions.cashFlowDiscretePeriod !=undefined && assumptions.cashFlowDiscretePeriod !=="" && assumptions.cashFlowDiscretePeriod > 0) {
        estFinancialDataArr[0].year = historicalFinancialData[0].year + 1;
        // estFinancialDataArr[0].period = 0;
        estFinancialDataArr[0].period = estFinancialDataArr.length-1;
        if (isEstimateFcffOnly){ // calculate only the free casf flow of the firm (income statement and cash flow accounts will be equal to zero)
          const baseFcff = historicalFinancialData[0].ebit
                          + historicalFinancialData[0].incomeTaxExpense
                          - historicalFinancialData[0].depreciation
                          + historicalFinancialData[0].capitalExpenditures
                          + historicalFinancialData[0].workingCapitalChanges;
          if (assumptions.cashFlowGrowthRate === "") {
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
        } else {  //calculate all income statement and cash flow accounts
            // if (  historicalFinancialData[0].totalRevenue !== undefined &&  historicalFinancialData[0].totalRevenue !== null && historicalFinancialData[0].totalRevenue !== 0){ 
            if (assumptions.revenueGrowth === "") {
              estFinancialDataArr[0].totalRevenue = 0
            } else {
              estFinancialDataArr[0].totalRevenue = historicalFinancialData[0].totalRevenue * (1 + parseFloat(assumptions.revenueGrowth/100));
            }  
            estFinancialDataArr[0].costOfRevenue = ( estFinancialDataArr[0].totalRevenue * (1 - parseFloat(assumptions.marginTarget/100)))*-1;
            estFinancialDataArr[0].grossProfit = estFinancialDataArr[0].totalRevenue + estFinancialDataArr[0].costOfRevenue;
            if (estFinancialDataArr[0].totalRevenue > 0) {
              estFinancialDataArr[0].grossProfitPercent = (estFinancialDataArr[0].grossProfit / estFinancialDataArr[0].totalRevenue) * 100;
            }
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
            estFinancialDataArr[0].incomeBeforeTax = estFinancialDataArr[0].grossProfit + estFinancialDataArr[0].operatingExpenses +estFinancialDataArr[0].depreciation +estFinancialDataArr[0].interestExpense +estFinancialDataArr[0].other;
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
            // ????
            if (estFinancialDataArr[0].cashFlow != 0){
              estFinancialDataArr[0].discountedCashFlow = (estFinancialDataArr[0].cashFlow)/(1+parseFloat(calculatedCostOfCapital.costOfCapital/100));

            } else {
              estFinancialDataArr[0].discountedCashFlow=0
            }
            for (let i = 1; i < estFinancialDataArr.length ; i++){
              estFinancialDataArr[i].year = estFinancialDataArr[i-1].year + 1 ;
              estFinancialDataArr[i].period = Math.abs(i-estFinancialDataArr.length)-1;
              estFinancialDataArr[i].totalRevenue = estFinancialDataArr[i-1].totalRevenue * (1 + parseFloat(assumptions.revenueGrowth/100));
              estFinancialDataArr[i].costOfRevenue = (estFinancialDataArr[i].totalRevenue * (1 - parseFloat(assumptions.marginTarget/100)))*-1;
              estFinancialDataArr[i].grossProfit = estFinancialDataArr[i].totalRevenue +estFinancialDataArr[i].costOfRevenue;
              if (estFinancialDataArr[i].totalRevenue > 0) {
                estFinancialDataArr[i].grossProfitPercent = (estFinancialDataArr[i].grossProfit/estFinancialDataArr[i].totalRevenue)*100;
              }
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
              if ( estFinancialDataArr[i].cashFlow != 0){
                estFinancialDataArr[i].discountedCashFlow = estFinancialDataArr[i].cashFlow/(Math.pow((1+parseFloat(calculatedCostOfCapital.costOfCapital/100)),(i+1))); 
              } else{
                estFinancialDataArr[i].discountedCashFlow = 0; 
              }
            }
          }
        estFinancialDataArr.reverse(); // .reverse() to show array in descending order (default option)
      }
    }  
    return estFinancialDataArr
  } 

  function calcValuation(companyData, historicalFinancialData, assumptions, calculatedCostOfCapital, forecastedFinancialData) {
    // valuationId:"none"
    let valuationResultsArr = {valuationId:"", cashFlowAvgGrowth:0, sumOfCashFlowPresentValue:0, perpetuityValue:0, perpetuityPresentValue:0, enterpriseValue:0, cash:0, debt:0, equityValue:0, sharesOutstanding:0, targetStockPrice:0, marketCap:0, updated_at:"",published:"", publishedDate:""};
  //  Reviisar Ifs ++++++++++++++++++++
    if (historicalFinancialData && forecastedFinancialData && assumptions) {
      if (forecastedFinancialData && assumptions.cashFlowDiscretePeriod !==undefined && assumptions.cashFlowDiscretePeriod !==null ){
        if (historicalFinancialData[0].cashFlow !== null && historicalFinancialData[0].cashFlow !== undefined){
          if (assumptions.cashFlowDiscretePeriod !=null && assumptions.cashFlowDiscretePeriod !=undefined && assumptions.cashFlowDiscretePeriod !=="" && assumptions.cashFlowDiscretePeriod > 0) {
            forecastedFinancialData.map ( (currElement) => (
              valuationResultsArr.sumOfCashFlowPresentValue = valuationResultsArr.sumOfCashFlowPresentValue + currElement.discountedCashFlow
            ));
            if (forecastedFinancialData[0].cashFlow > 0 && assumptions.perpetualGrowthRate !==""){
              valuationResultsArr.perpetuityValue = (forecastedFinancialData[0].cashFlow*( 1+ parseFloat(assumptions.perpetualGrowthRate/100)))/parseFloat((calculatedCostOfCapital.costOfCapital/100)-(assumptions.perpetualGrowthRate/100));
            }
            valuationResultsArr.perpetuityPresentValue = valuationResultsArr.perpetuityValue/(Math.pow((1+parseFloat(calculatedCostOfCapital.costOfCapital/100)),(assumptions.cashFlowDiscretePeriod))); 
            valuationResultsArr.enterpriseValue = valuationResultsArr.sumOfCashFlowPresentValue + valuationResultsArr.perpetuityPresentValue;
            // valuationResultsArr.cash = historicalFinancialData[0].cash;
            // valuationResultsArr.debt = historicalFinancialData[0].longTermDebt + historicalFinancialData[0].shortLongTermDebt;
            valuationResultsArr.cash = companyData.totalCash;
            valuationResultsArr.debt = companyData.totalDebt;
            if (valuationResultsArr.enterpriseValue > 0){
              valuationResultsArr.equityValue = valuationResultsArr.enterpriseValue + valuationResultsArr.cash - valuationResultsArr.debt;
            }
            if (companyData.sharesOutstanding > 0){
              valuationResultsArr.sharesOutstanding = companyData.sharesOutstanding*1000;
            }
            valuationResultsArr.marketCap = companyData.marketCap;
            if (valuationResultsArr.equityValue > 0){
              valuationResultsArr.targetStockPrice = (valuationResultsArr.equityValue)/companyData.sharesOutstanding*1000;
            }
            valuationResultsArr.cashFlowAvgGrowth = calcGrowthRate(historicalFinancialData[0].cashFlow,forecastedFinancialData[0].cashFlow, assumptions.cashFlowDiscretePeriod )
          }
      }
      }
    }
    return valuationResultsArr
  }

  function checkValuationStatus(companyData, assumptions, isEstimateFcffOnly, savedValuationData) {
    // revisar y hacer tb con isDirty/isPristine
    const { revenueGrowth, marginTarget, opexGrowth, interestGrowth, otherGrowth,  taxRate, capexGrowth, nwcGrowth, cashFlowGrowthRate, perpetualGrowthRate, cashFlowDiscretePeriod, companyBeta, riskFreeReturn, marketReturn, costOfDebt} = assumptions;
    const { symbol } = companyData;
    let fieldsCompleted = 0;
    if (! symbol){
      return "blank"
    }
    // if (savedValuationData.published){
    //   return "published"
    // }

    // Note: check only fields that are considered "required" for a valuation to be complete
    let valuesToCheck = { revenueGrowth, marginTarget, opexGrowth, taxRate, capexGrowth, perpetualGrowthRate, cashFlowDiscretePeriod, companyBeta, riskFreeReturn, marketReturn,costOfDebt }

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

  return { calcForecastedCashFlow, calcValuation, calcCostOfCapital, checkValuationStatus };
}