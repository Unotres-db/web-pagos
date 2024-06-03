export default function useApartmentsCalculations(){

  // const [assumptions, setAssumptions]  = useState({ 
  //   QtyOfBuildings:0,
  //   oneRoomQty:0, oneRoomSize:0, oneRoomPricePerSqrMts:0,oneRoomTotalPrice:0,
  //   twoRoomsQty:0, twoRoomsSize:0, twoRoomsPricePerSqrMts:0,twoRoomsTotalPrice:0,
  //   threeRoomsQty:0, threeRoomsSize:0, threeRoomsPricePerSqrMts:0,threeRoomsTotalPrice:0,
  //   parkingQty:0,parkingAvgprice:0,parkingTotalPrice:0,
  //   fisrtMonthOfSale:0, phaseOneSales:0, phaseTwoSales:0, phaseThreeSales:0,phaseOneMonths:0, phaseTwoMonths:0, phaseThreeMonths:0,
  //   phaseOneDiscount:0, phaseTwoDiscount:0, phaseThreeDiscount:0,
  //   landSize:0, landCostPerMts:0, landTotalCost:0,
  //   constructionSize:0,constructionCostPerMts:0, constructionCost:0})
  // const [ financialData, setFinancialData] = useState((Array.from({ length:5 }, (a,b) => ({ year:2023 + b , period:0, totalRevenue:0, costOfRevenue: 0, grossProfit: 0, grossProfitPercent:0, operatingExpenses: 0, depreciation: 0, interestExpense: 0, other: 0, incomeBeforeTax: 0, incomeTaxExpense: 0, netIncome: 0, ebit: 0, capitalExpenditures: 0, cash: 0, shortLongTermDebt:0, longTermDebt:0, workingCapitalChanges:0, cashFlow:0, discountedCashFlow:0 }))));

  function calcRevenueEstimation(assumptions){
    let estFinancialDataArr = Array.from({ length: parseInt(assumptions.cashFlowDiscretePeriod) } , 
    () => ({ year: 0, period:0, totalRevenue:0, costOfRevenue: 0, grossProfit: 0, grossProfitPercent:0, operatingExpenses: 0, depreciation: 0, interestExpense: 0, other: 0, incomeBeforeTax: 0, incomeTaxExpense: 0, netIncome: 0, ebit: 0, capitalExpenditures: 0, cash: 0, shortLongTermDebt:0, longTermDebt:0, workingCapitalChanges:0, cashFlow:0, discountedCashFlow:0 }));
    const totalQty = assumptions.oneRoomQty + assumptions.twoRoomQty + assumptions.threeRoomQty
    const averagePrice= ((assumptions.oneRoomQty*oneRoomTotalPrice)/totalQty)+((assumptions.twoRoomQty*twoRoomTotalPrice)/totalQty)+((assumptions.threeRoomQty*threeRoomTotalPrice)/totalQty)

        for (let i = 1; i < estFinancialDataArr.length ; i++){
      if (i < assumptions.firstMonthOfsale) {
        estFinancialDataArr[i].totalRevenue = 0;
        estFinancialDataArr[i].costOfRevenue = 0;
        estFinancialDataArr[i].grossProfitPercent = 0;
        estFinancialDataArr[i].operatingExpenses = 0;
        estFinancialDataArr[i].incomeBeforeTax = 0;
      } else {

      }

    }

  }

}