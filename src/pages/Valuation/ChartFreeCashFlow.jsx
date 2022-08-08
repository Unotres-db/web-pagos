import React from "react";

import { Bar } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";

import { makeStyles, useTheme } from '@material-ui/core/styles';

export default function ChartFreeCashFlow ({ combinedFinancialData, assumptions, isCheckedShowPreviousYears, isCheckedDescOrder }) {

  const theme = useTheme();
  const chartData = {
        labels:combinedFinancialData.map((currElement)=>(currElement.year)),
        datasets:[{label:"Free Cash Flow to the Firm", data:combinedFinancialData.map((currElement)=> (currElement.cashFlow)),
        backgroundColor:defineChartColors(),
      }]}

  function defineChartColors (){
    const arrayOfForecastedColors = Array.from({ length: assumptions.cashFlowDiscretePeriod } , () => (theme.palette.primary.main));
    const arrayOfHistoricalColors = Array.from({ length: 3 } , () => (theme.palette.tertiary.main));  
    if (isCheckedShowPreviousYears){
      if (isCheckedDescOrder){
        const arrayOfColorsDesc = arrayOfForecastedColors.concat(arrayOfHistoricalColors);
        return arrayOfColorsDesc
      }
      const arrayOfColorsAsc = arrayOfHistoricalColors.concat(arrayOfForecastedColors);
      return arrayOfColorsAsc
    } else {
        return arrayOfForecastedColors
    }
  }

  return (
    <>
    {combinedFinancialData ? <>
      <Bar data = { chartData } />
      </>  
    : null}
    </>
  )
}

  // let combinedArray = [];
  // const [ chartData, setChartData] = useState(null);

  // const [ chartData, setChartData] = useState({
  //   labels:combinedArray.map((currElement)=> (currElement.year)),
  //   datasets:[{label:"Free Cash Flow to the Firm", data:combinedArray.map((currElement)=> (currElement.cashFlow)),
  //   backgroundColor:["white"],
  // }]});

  // function extractYear(year){
  //   let textYear = year.toString()
  //   let finalDigitsYear= textYear.substring(2,4);
  //   return finalDigitsYear
  // }

  // useEffect (()=> {
  //   setChartData({
  //     labels:combinedFinancialData.map((currElement)=>(currElement.year)),
  //     datasets:[{label:"Free Cash Flow to the Firm", data:combinedFinancialData.map((currElement)=> (currElement.cashFlow)),
  //     backgroundColor:defineChartColors(),
  //   }]});
  // },[])
  // },[combinedFinancialData, isCheckedDescOrder, isCheckedShowPreviousYears, assumptions])



