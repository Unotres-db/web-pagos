import React, {useState, useEffect} from "react";

import { Bar } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";

import { makeStyles, useTheme } from '@material-ui/core/styles';

// import useDataHandling from "../../hooks/useDataHandling";

// export default function ChartRevenueFcff ({ historicalFinancialData, assumptions, forecastedFinancialData, isCheckedShowPreviousYears, isCheckedDescOrder }) {
  export default function ChartFreeCashFlow ({ combinedFinancialdata, assumptions, isCheckedShowPreviousYears, isCheckedDescOrder }) {

  // const { changeArrayOrder } = useDataHandling ({ historicalFinancialData, forecastedFinancialData, isCheckedShowPreviousYears, isCheckedDescOrder });
  let combinedArray = [];
  // const numberOfYears = assumptions;
  // console.log(assumptions);
  const theme = useTheme();
  const [ chartData, setChartData] = useState({
    labels:combinedArray.map((currElement)=> (currElement.year)),
    datasets:[{label:"Free Cash Flow to the Firm", data:combinedArray.map((currElement)=> (currElement.cashFlow)),
    backgroundColor:["white"],
  }]});

  //   const [ chartData, setChartData] = useState({
  //   labels:combinedFinancialdata.map((currElement)=> (currElement.year)),
  //   datasets:[{label:"Free Cash Flow to the Firm", data:combinedArray.map((currElement)=> (currElement.cashFlow)),
  //   backgroundColor:["white"],
  // }]});

  // function extractYear(year){
  //   let textYear = year.toString()
  //   let finalDigitsYear= textYear.substring(2,4);
  //   return finalDigitsYear
  // }

  function defineChartColors (){
    const arrayOfForecastedColors = Array.from({ length: assumptions.cashFlowDiscretePeriod } , () => (theme.palette.primary.main));
    const arrayOfHistoricalColors = Array.from({ length: 3 } , () => (theme.palette.tertiary.main));  
    if (isCheckedShowPreviousYears){
      if (isCheckedDescOrder){
        const arrayOfColorsDesc = arrayOfForecastedColors.concat(arrayOfHistoricalColors);
        console.log(arrayOfColorsDesc);
        return arrayOfColorsDesc
      }
      const arrayOfColorsAsc = arrayOfHistoricalColors.concat(arrayOfForecastedColors);
      return arrayOfColorsAsc
    } else {
        return arrayOfForecastedColors
    }
  }
  
  useEffect (()=> {
    // setChartData({
    //   labels:changeArrayOrder().map((currElement)=>(currElement.year)),
    //   datasets:[{label:"Free Cash Flow to the Firm", data:changeArrayOrder().map((currElement)=> (currElement.cashFlow)),
    //   backgroundColor:defineChartColors(),
    //   }]

    setChartData({
      labels:combinedFinancialdata.map((currElement)=>(currElement.year)),
      datasets:[{label:"Free Cash Flow to the Firm", data:combinedFinancialdata.map((currElement)=> (currElement.cashFlow)),
      backgroundColor:defineChartColors(),
    }]});
},[combinedFinancialdata, isCheckedDescOrder, isCheckedShowPreviousYears, assumptions])

    return (
    <>
    {combinedFinancialdata ? <>
      <Bar data = { chartData } />
      </>  
    : null}
    </>
  )
}

