export default function useValuation({assumptions, setAssumptions,freeCashFlow, setFreeCashFlow, discountedFreeCashFlow, setDiscountedFreeCashFlow,historicalFinancialData,valuation, setValuation}) {
  
  function calcValuation() {
    // let baseFcff = historicalFinancialData[0].ebit
    //               + historicalFinancialData[0].incomeTaxExpense
    //               - historicalFinancialData[0].depreciation
    //               + historicalFinancialData[0].capitalExpenditures
    //               + historicalFinancialData[0].workingCapitalChanges
    // let estimatedFreeCashFlow = [{year:0,fcff:0},{year:0,fcff:0},{year:0,fcff:0},{year:0,fcff:0},{year:0,fcff:0}];
    let estimatedFreeCashFlow = Array.from({ length: 5 } , () => ({ year: 0,totalRevenue:0,costOfRevenue: 0,grossProfit: 0,totalOperatingExpenses: 0,depreciation: 0,interestExpense: 0,other: 0,incomeBeforeTax: 0,incomeTaxExpense: 0,netIncome: 0,ebit: 0,capitalExpenditures: 0,cash: 0,shortLongTermDebt:0,longTermDebt:0,workingCapitalChanges:0,fcff:0 }));
    let discountedFreeCashFlow = Array.from({ length: 5 } , () => ({ year: 0,totalRevenue:0,costOfRevenue: 0,grossProfit: 0,totalOperatingExpenses: 0,depreciation: 0,interestExpense: 0,other: 0,incomeBeforeTax: 0,incomeTaxExpense: 0,netIncome: 0,ebit: 0,capitalExpenditures: 0,cash: 0,shortLongTermDebt:0,longTermDebt:0,workingCapitalChanges:0,fcff:0 }));
    let valuationResults = { discreteNPV:0, perpetuityValue:0, perpetuityPresentValue:0,enterpriseValue:0, equityValue:0 };

    estimatedFreeCashFlow[0].year = historicalFinancialData[0].year + 1;
    estimatedFreeCashFlow[0].totalRevenue = historicalFinancialData[0].totalRevenue * (1 + parseFloat(assumptions.revenueGrowth/100));
    estimatedFreeCashFlow[0].costOfRevenue = (historicalFinancialData[0].totalRevenue * (1 - parseFloat(assumptions.marginTarget/100)))*-1;
    estimatedFreeCashFlow[0].grossProfit = estimatedFreeCashFlow[0].totalRevenue + estimatedFreeCashFlow[0].costOfRevenue;
    estimatedFreeCashFlow[0].totalOperatingExpenses = historicalFinancialData[0].totalOperatingExpenses*(1 + parseFloat(assumptions.opexGrowth/100));
    estimatedFreeCashFlow[0].depreciation = historicalFinancialData[0].depreciation * (1 - parseFloat(assumptions.capexPercentage/100));
    estimatedFreeCashFlow[0].interestExpense = historicalFinancialData[0].interestExpense * (1 + parseFloat(assumptions.revenueGrowth/100));
    estimatedFreeCashFlow[0].other = historicalFinancialData[0].other * (1 + parseFloat(assumptions.otherGrowth/100));
    estimatedFreeCashFlow[0].incomeBeforeTax = estimatedFreeCashFlow[0].grossProfit + estimatedFreeCashFlow[0].totalOperatingExpenses + estimatedFreeCashFlow[0].depreciation + estimatedFreeCashFlow[0].interestExpense + estimatedFreeCashFlow[0].other;
    if (estimatedFreeCashFlow[0].incomeBeforeTax > 0){
      estimatedFreeCashFlow[0].incomeTaxExpense = - estimatedFreeCashFlow[0].incomeBeforeTax*(parseFloat(assumptions.taxRate/100));
    }
    estimatedFreeCashFlow[0].netIncome =  estimatedFreeCashFlow[0].incomeBeforeTax + estimatedFreeCashFlow[0].incomeTaxExpense;
    estimatedFreeCashFlow[0].ebit = estimatedFreeCashFlow[0].netIncome - estimatedFreeCashFlow[0].interestExpense - estimatedFreeCashFlow[0].incomeTaxExpense;
    estimatedFreeCashFlow[0].capitalExpenditures = historicalFinancialData[0].capitalExpenditures * (1 + parseFloat(assumptions.capexPercentage/100));
    estimatedFreeCashFlow[0].workingCapitalChanges = historicalFinancialData[0].workingCapitalChanges * (1 + parseFloat(assumptions.workingCapitalChangesPercentage/100));;
    estimatedFreeCashFlow[0].fcff = estimatedFreeCashFlow[0].ebit - estimatedFreeCashFlow[0].depreciation + estimatedFreeCashFlow[0].incomeTaxExpense + estimatedFreeCashFlow[0].capitalExpenditures + estimatedFreeCashFlow[0].workingCapitalChanges;
    // estimatedFreeCashFlow[0].fcff = baseFcff * (1 + parseFloat(assumptions.fcffGrowthRate/100));
    discountedFreeCashFlow[0].year = estimatedFreeCashFlow[0].year;
    discountedFreeCashFlow[0].fcff = (estimatedFreeCashFlow[0].fcff)/(1+parseFloat(assumptions.discountRate/100));

    for (let i = 1; i < estimatedFreeCashFlow.length ; i++){
      estimatedFreeCashFlow[i].year = estimatedFreeCashFlow[i-1].year + 1 ;
      estimatedFreeCashFlow[i].totalRevenue = estimatedFreeCashFlow[i-1].totalRevenue * (1 + parseFloat(assumptions.revenueGrowth/100));
      estimatedFreeCashFlow[i].costOfRevenue = (estimatedFreeCashFlow[i-1].totalRevenue * (1 - parseFloat(assumptions.marginTarget/100)))*-1;
      estimatedFreeCashFlow[i].grossProfit = estimatedFreeCashFlow[i].totalRevenue + estimatedFreeCashFlow[i].costOfRevenue;
      estimatedFreeCashFlow[i].totalOperatingExpenses = estimatedFreeCashFlow[i-1].totalOperatingExpenses*(1 + parseFloat(assumptions.opexGrowth/100));
      estimatedFreeCashFlow[i].depreciation = estimatedFreeCashFlow[i-1].depreciation * (1 - parseFloat(assumptions.capexPercentage/100));
      estimatedFreeCashFlow[i].interestExpense = estimatedFreeCashFlow[i-1].interestExpense * (1 + parseFloat(assumptions.revenueGrowth/100));
      estimatedFreeCashFlow[i].other = estimatedFreeCashFlow[i-1].other * (1 + parseFloat(assumptions.otherGrowth/100));
      estimatedFreeCashFlow[i].incomeBeforeTax = estimatedFreeCashFlow[i].grossProfit + estimatedFreeCashFlow[i].totalOperatingExpenses + estimatedFreeCashFlow[i].depreciation + estimatedFreeCashFlow[i].interestExpense + estimatedFreeCashFlow[i].other;
      if (estimatedFreeCashFlow[i].incomeBeforeTax > 0){
        estimatedFreeCashFlow[i].incomeTaxExpense = - estimatedFreeCashFlow[i].incomeBeforeTax*(parseFloat(assumptions.taxRate/100));
      }
      estimatedFreeCashFlow[i].netIncome =  estimatedFreeCashFlow[i].incomeBeforeTax + estimatedFreeCashFlow[i].incomeTaxExpense;
      estimatedFreeCashFlow[i].ebit = estimatedFreeCashFlow[i].netIncome - estimatedFreeCashFlow[i].interestExpense - estimatedFreeCashFlow[i].incomeTaxExpense;
      estimatedFreeCashFlow[i].capitalExpenditures = estimatedFreeCashFlow[i-1].capitalExpenditures * (1 + parseFloat(assumptions.capexPercentage/100));
      estimatedFreeCashFlow[i].workingCapitalChanges = estimatedFreeCashFlow[i-1].workingCapitalChanges * (1 + parseFloat(assumptions.workingCapitalChangesPercentage/100));;
      estimatedFreeCashFlow[i].fcff = estimatedFreeCashFlow[i].ebit - estimatedFreeCashFlow[i].depreciation + estimatedFreeCashFlow[i].incomeTaxExpense + estimatedFreeCashFlow[i].capitalExpenditures + estimatedFreeCashFlow[i].workingCapitalChanges;

      discountedFreeCashFlow[i].year = discountedFreeCashFlow[i-1].year + 1;
      discountedFreeCashFlow[i].fcff = estimatedFreeCashFlow[i].fcff/(Math.pow((1+parseFloat(assumptions.discountRate/100)),(i+1))); 
    }

    discountedFreeCashFlow.map ( (currElement) => (
      valuationResults.discreteNPV = valuationResults.discreteNPV + currElement.fcff
    ));

    valuationResults.perpetuityValue = (estimatedFreeCashFlow[4].fcff*(1+assumptions.perpetualGrowthRate))/(assumptions.wacc-assumptions.perpetualGrowthRate);
    valuationResults.perpetuityPresentValue = valuationResults.perpetuityValue/(Math.pow((1+parseFloat(assumptions.discountRate/100)),(5))); 
    valuationResults.enterpriseValue = valuationResults.discreteNPV+valuationResults.perpetuityPresentValue;
    valuationResults.equityValue =  valuationResults.enterpriseValue+historicalFinancialData[0].cash-historicalFinancialData[0].longTermDebt-historicalFinancialData[0].shortLongTermDebt;
    setFreeCashFlow(estimatedFreeCashFlow.reverse());
    setDiscountedFreeCashFlow(discountedFreeCashFlow.reverse());
    setValuation(valuationResults);
  }

  return {calcValuation};
}