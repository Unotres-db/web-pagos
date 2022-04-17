export default function useDataHandling({ historicalFinancialData, forecastedFinancialData, isCheckedShowPreviousYears, isCheckedDescOrder }){
  // console.count();
  function createCombinedData (){   // createCombinedArray
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
  return {createCombinedData} 
}