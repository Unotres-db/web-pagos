export default function useValuation({assumptions, setAssumptions,freeCashFlow, setFreeCashFlow, discountedFreeCashFlow, setDiscountedFreeCashFlow,historicalFinancialData,valuation, setValuation, setChartData}) {
  
  function calcValuation() {
    // alert("-- entou em calcValuation "+assumptions.fcffGrowthRate)
    let baseFcff = historicalFinancialData[0].ebit
                  + historicalFinancialData[0].incomeTaxExpense
                  - historicalFinancialData[0].depreciation
                  + historicalFinancialData[0].capitalExpenditures
                  + historicalFinancialData[0].workingCapitalChanges
    // let myEstimatedFreeChashFlow = Array.from({ length: 10 } , () => ({year:0,fcff:0}));
    let estimatedFreeCashFlow = [{year:0,fcff:0},{year:0,fcff:0},{year:0,fcff:0},{year:0,fcff:0},{year:0,fcff:0}];
    let discountedFreeCashFlow = [{year:0,fcff:0},{year:0,fcff:0},{year:0,fcff:0},{year:0,fcff:0},{year:0,fcff:0}];
    let valuationResults = {discreteNPV:0, perpetuityValue:0, enterpriseValue:0}

    estimatedFreeCashFlow[0].year = historicalFinancialData[0].year + 1;
    discountedFreeCashFlow[0].year = estimatedFreeCashFlow[0].year;

    estimatedFreeCashFlow[0].fcff = baseFcff * (1 + parseFloat(assumptions.fcffGrowthRate/100));
    discountedFreeCashFlow[0].fcff = ((baseFcff * (1 + parseFloat(assumptions.fcffGrowthRate/100)))/(1+parseFloat(assumptions.discountRate/100)));

    for (let i = 1; i < 5 ; i++){
      estimatedFreeCashFlow[i].year = estimatedFreeCashFlow[i-1].year+1 ;
      // estimatedFreeCashFlow[i].totalRevenue = estimatedFreeCashFlow[i-1].totalRevenue*(1 + parseFloat(assumptions.revenueGrowth/100));
      // estimatedFreeCashFlow[i].costOfRevenue = -estimatedFreeCashFlow[i-1].totalRevenue*(1 - parseFloat(assumptions.marginTarget/100));
      // estimatedFreeCashFlow[i].grossProfit =  estimatedFreeCashFlow[i].totalRevenue + estimatedFreeCashFlow[i].costOfRevenue;
      // estimatedFreeCashFlow[i].totalOperatingExpenses = estimatedFreeCashFlow[i-1].totalOperatingExpenses*(1 + parseFloat(assumptions.opexGrowth/100));
      // revisar
      // estimatedFreeCashFlow[i].depreciation = estimatedFreeCashFlow[i-1].depreciation * (1 - parseFloat(assumptions.capexPercentage/100));
      // estimatedFreeCashFlow[i].interestExpense = estimatedFreeCashFlow[i-1].interestExpense * (1 + parseFloat(assumptions.revenueGrowth/100));
      //--------
      // estimatedFreeCashFlow[i].other = estimatedFreeCashFlow[i-1].other * (1 + parseFloat(assumptions.otherGrowth/100));
      // estimatedFreeCashFlow[i].incomeBeforeTax = estimatedFreeCashFlow[i].grossProfit + estimatedFreeCashFlow[i].totalOperatingExpenses + estimatedFreeCashFlow[i].depreciation + estimatedFreeCashFlow[i].interestExpense + estimatedFreeCashFlow[i].other;
      // if (estimatedFreeCashFlow[i].incomeBeforeTax > 0){
      //   estimatedFreeCashFlow[i].incomeTaxExpense = -estimatedFreeCashFlow[i].incomeBeforeTax*(1 + parseFloat(assumptions.taxRate/100));
      // }
      // estimatedFreeCashFlow[i].netIncome =estimatedFreeCashFlow[i].incomeBeforeTax + estimatedFreeCashFlow[i].incomeTaxExpense;
      // estimatedFreeCashFlow[i].ebit = estimatedFreeCashFlow[i].netIncome + estimatedFreeCashFlow[i].interestExpense + estimatedFreeCashFlow[i].incomeTaxExpense;
      // estimatedFreeCashFlow[i].workingCapitalChanges = 0;
      // estimatedFreeCashFlow[i].fcff = estimatedFreeCashFlow[i].ebit + estimatedFreeCashFlow[i].depreciation - estimatedFreeCashFlow[i].incomeTaxExpense - estimatedFreeCashFlow[i].capitalExpenditures -estimatedFreeCashFlow[i].workingCapitalChanges;
      estimatedFreeCashFlow[i].fcff = estimatedFreeCashFlow[i-1].fcff*(1 + parseFloat(assumptions.fcffGrowthRate/100));

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
    setFreeCashFlow(estimatedFreeCashFlow);
    setDiscountedFreeCashFlow(discountedFreeCashFlow);
    setValuation(valuationResults);
    setChartData({
      labels:estimatedFreeCashFlow.map((currElement)=> (currElement.year)),
      datasets:[{label:"Free Cash Flow", data:estimatedFreeCashFlow.map((currElement)=> (currElement.fcff)),
      backgroundColor:["gray"],
    }]});
  }

  return {calcValuation};
}