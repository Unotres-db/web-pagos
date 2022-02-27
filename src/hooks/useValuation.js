export default function useValuation({assumptions, setAssumptions,freeCashFlow, setFreeCashFlow, discountedFreeCashFlow, setDiscountedFreeCashFlow,historicalFinancialData,valuation, setValuation,historicalAverages, setHistoricalAverages}) {
  // {revenueGrowth:10.5, marginTarget:50.0, opexGrowth:2.3, otherGrowth:0,fcffGrowthRate:12,taxRate:25 , discountRate:10, capexPercentage:15, workingCapitalChangesPercentage:15, wacc: 10, perpetualGrowthRate: 3, cashFlowDiscretePeriod:5, companyBeta:1.2, riskFreeReturn:3, marketReturn:8, debtEquityRatio:30, costOfDebt:5});  
  
  function calcHistoricalAverages(){

  }

  function calcWacc (){
    // uses CAPM model
    let ke = (parseFloat(assumptions.riskFreeReturn/100) + (assumptions.companyBeta*(parseFloat(assumptions.marketReturn/100)-parseFloat(assumptions.riskFreeReturn/100)))*100);
    // alert(ke);
    // let calculatedWacc = (parseFloat(assumptions.costOfDebt/100) * parseFloat(assumptions.debtEquityRatio/100)) + (ke * (parseFloat(100-assumptions.debtEquityRatio)));
    // setAssumptions(prevState => ({...prevState, costOfEquity:ke, wacc:calculatedWacc }));
    setAssumptions(prevState => ({...prevState, costOfEquity:ke, wacc:ke }));

    // calcValuation();
  };
  

  function calcValuation() {

    // let baseFcff = historicalFinancialData[0].ebit
    //               + historicalFinancialData[0].incomeTaxExpense
    //               - historicalFinancialData[0].depreciation
    //               + historicalFinancialData[0].capitalExpenditures
    //               + historicalFinancialData[0].workingCapitalChanges
    // let estimatedFreeCashFlow = [{year:0,fcff:0},{year:0,fcff:0},{year:0,fcff:0},{year:0,fcff:0},{year:0,fcff:0}];
    let estFinancialDataArr = Array.from({ length: 5 } , () => ({ year: 0,totalRevenue:0,costOfRevenue: 0,grossProfit: 0,totalOperatingExpenses: 0,depreciation: 0,interestExpense: 0,other: 0,incomeBeforeTax: 0,incomeTaxExpense: 0,netIncome: 0,ebit: 0,capitalExpenditures: 0,cash: 0,shortLongTermDebt:0,longTermDebt:0,workingCapitalChanges:0,fcff:0, discountedFcff:0 }));
    // let forecastedFinancialDataArray = Array.from({ length: 5 } , () => ({ year: 0,totalRevenue:0,costOfRevenue: 0,grossProfit: 0,totalOperatingExpenses: 0,depreciation: 0,interestExpense: 0,other: 0,incomeBeforeTax: 0,incomeTaxExpense: 0,netIncome: 0,ebit: 0,capitalExpenditures: 0,cash: 0,shortLongTermDebt:0,longTermDebt:0,workingCapitalChanges:0,fcff:0 }));
    let discountedFreeCashFlow = Array.from({ length: 5 } , () => ({ year: 0,totalRevenue:0,costOfRevenue: 0,grossProfit: 0,totalOperatingExpenses: 0,depreciation: 0,interestExpense: 0,other: 0,incomeBeforeTax: 0,incomeTaxExpense: 0,netIncome: 0,ebit: 0,capitalExpenditures: 0,cash: 0,shortLongTermDebt:0,longTermDebt:0,workingCapitalChanges:0,fcff:0 }));
    let valuationResultsArr = { discreteNPV:0, perpetuityValue:0, perpetuityPresentValue:0,enterpriseValue:0, equityValue:0 };

    estFinancialDataArr[0].year = historicalFinancialData[0].year + 1;
    estFinancialDataArr[0].totalRevenue = historicalFinancialData[0].totalRevenue * (1 + parseFloat(assumptions.revenueGrowth/100));
    estFinancialDataArr[0].costOfRevenue = (historicalFinancialData[0].totalRevenue * (1 - parseFloat(assumptions.marginTarget/100)))*-1;
    estFinancialDataArr[0].grossProfit =estFinancialDataArr[0].totalRevenue +estFinancialDataArr[0].costOfRevenue;
    estFinancialDataArr[0].totalOperatingExpenses = historicalFinancialData[0].totalOperatingExpenses*(1 + parseFloat(assumptions.opexGrowth/100));
    estFinancialDataArr[0].depreciation = historicalFinancialData[0].depreciation * (1 - parseFloat(assumptions.capexPercentage/100));
    estFinancialDataArr[0].interestExpense = historicalFinancialData[0].interestExpense * (1 + parseFloat(assumptions.revenueGrowth/100));
    estFinancialDataArr[0].other = historicalFinancialData[0].other * (1 + parseFloat(assumptions.otherGrowth/100));
    estFinancialDataArr[0].incomeBeforeTax =estFinancialDataArr[0].grossProfit +estFinancialDataArr[0].totalOperatingExpenses +estFinancialDataArr[0].depreciation +estFinancialDataArr[0].interestExpense +estFinancialDataArr[0].other;
    if (estFinancialDataArr[0].incomeBeforeTax > 0){
      estFinancialDataArr[0].incomeTaxExpense = -estFinancialDataArr[0].incomeBeforeTax*(parseFloat(assumptions.taxRate/100));
    }
    estFinancialDataArr[0].netIncome = estFinancialDataArr[0].incomeBeforeTax +estFinancialDataArr[0].incomeTaxExpense;
    estFinancialDataArr[0].ebit = estFinancialDataArr[0].netIncome -estFinancialDataArr[0].interestExpense -estFinancialDataArr[0].incomeTaxExpense;
    estFinancialDataArr[0].capitalExpenditures = historicalFinancialData[0].capitalExpenditures * (1 + parseFloat(assumptions.capexPercentage/100));
    estFinancialDataArr[0].workingCapitalChanges = historicalFinancialData[0].workingCapitalChanges * (1 + parseFloat(assumptions.workingCapitalChangesPercentage/100));;
    estFinancialDataArr[0].fcff =estFinancialDataArr[0].ebit -estFinancialDataArr[0].depreciation +estFinancialDataArr[0].incomeTaxExpense +estFinancialDataArr[0].capitalExpenditures +estFinancialDataArr[0].workingCapitalChanges;
    //estFinancialDataArr[0].fcff = baseFcff * (1 + parseFloat(assumptions.fcffGrowthRate/100));
    // discountedFreeCashFlow[0].year = estFinancialDataArr[0].year;
    // discountedFreeCashFlow[0].fcff = (estFinancialDataArr[0].fcff)/(1+parseFloat(assumptions.discountRate/100));
    estFinancialDataArr[0].discountedFcff = (estFinancialDataArr[0].fcff)/(1+parseFloat(assumptions.discountRate/100));

    for (let i = 1; i <estFinancialDataArr.length ; i++){
      estFinancialDataArr[i].year = estFinancialDataArr[i-1].year + 1 ;
      estFinancialDataArr[i].totalRevenue = estFinancialDataArr[i-1].totalRevenue * (1 + parseFloat(assumptions.revenueGrowth/100));
      estFinancialDataArr[i].costOfRevenue = (estFinancialDataArr[i-1].totalRevenue * (1 - parseFloat(assumptions.marginTarget/100)))*-1;
      estFinancialDataArr[i].grossProfit = estFinancialDataArr[i].totalRevenue +estFinancialDataArr[i].costOfRevenue;
      estFinancialDataArr[i].totalOperatingExpenses = estFinancialDataArr[i-1].totalOperatingExpenses*(1 + parseFloat(assumptions.opexGrowth/100));
      estFinancialDataArr[i].depreciation = estFinancialDataArr[i-1].depreciation * (1 - parseFloat(assumptions.capexPercentage/100));
      estFinancialDataArr[i].interestExpense = estFinancialDataArr[i-1].interestExpense * (1 + parseFloat(assumptions.revenueGrowth/100));
      estFinancialDataArr[i].other = estFinancialDataArr[i-1].other * (1 + parseFloat(assumptions.otherGrowth/100));
      estFinancialDataArr[i].incomeBeforeTax = estFinancialDataArr[i].grossProfit +estFinancialDataArr[i].totalOperatingExpenses +estFinancialDataArr[i].depreciation +estFinancialDataArr[i].interestExpense +estFinancialDataArr[i].other;
      if (estFinancialDataArr[i].incomeBeforeTax > 0){
        estFinancialDataArr[i].incomeTaxExpense = -estFinancialDataArr[i].incomeBeforeTax*(parseFloat(assumptions.taxRate/100));
      }
      estFinancialDataArr[i].netIncome = estFinancialDataArr[i].incomeBeforeTax +estFinancialDataArr[i].incomeTaxExpense;
      estFinancialDataArr[i].ebit = estFinancialDataArr[i].netIncome -estFinancialDataArr[i].interestExpense -estFinancialDataArr[i].incomeTaxExpense;
      estFinancialDataArr[i].capitalExpenditures = estFinancialDataArr[i-1].capitalExpenditures * (1 + parseFloat(assumptions.capexPercentage/100));
      estFinancialDataArr[i].workingCapitalChanges = estFinancialDataArr[i-1].workingCapitalChanges * (1 + parseFloat(assumptions.workingCapitalChangesPercentage/100));;
      estFinancialDataArr[i].fcff = estFinancialDataArr[i].ebit -estFinancialDataArr[i].depreciation +estFinancialDataArr[i].incomeTaxExpense +estFinancialDataArr[i].capitalExpenditures +estFinancialDataArr[i].workingCapitalChanges;

      estFinancialDataArr[i].discountedFcff = estFinancialDataArr[i].fcff/(Math.pow((1+parseFloat(assumptions.discountRate/100)),(i+1))); 
      // discountedFreeCashFlow[i].year = discountedFreeCashFlow[i-1].year + 1;
      // discountedFreeCashFlow[i].fcff = estFinancialDataArr[i].fcff/(Math.pow((1+parseFloat(assumptions.discountRate/100)),(i+1))); 
    }

    estFinancialDataArr.map ( (currElement) => (
      valuationResultsArr.discreteNPV = valuationResultsArr.discreteNPV + currElement.discountedFcff
    ));

    // discountedFreeCashFlow.map ( (currElement) => (
    //   valuationResultsArr.discreteNPV = valuationResultsArr.discreteNPV + currElement.fcff
    // ));

    valuationResultsArr.perpetuityValue = (estFinancialDataArr[4].fcff*(1+parseFloat(assumptions.perpetualGrowthRate/100)))/parseFloat((assumptions.wacc/100)-(assumptions.perpetualGrowthRate/100));
    valuationResultsArr.perpetuityPresentValue = valuationResultsArr.perpetuityValue/(Math.pow((1+parseFloat(assumptions.discountRate/100)),(5))); 
    valuationResultsArr.enterpriseValue = valuationResultsArr.discreteNPV + valuationResultsArr.perpetuityPresentValue;
    valuationResultsArr.equityValue = valuationResultsArr.enterpriseValue + historicalFinancialData[0].cash - historicalFinancialData[0].longTermDebt - historicalFinancialData[0].shortLongTermDebt;
    setFreeCashFlow(estFinancialDataArr.reverse());
    // setDiscountedFreeCashFlow(discountedFreeCashFlow.reverse());
    setValuation(valuationResultsArr);
  }

  return {calcValuation, calcWacc};
}