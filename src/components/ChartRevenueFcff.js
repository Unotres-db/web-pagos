import React, {useState, useEffect} from "react";

import { Bar } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";

function ChartRevenueFcff ({ historicalFinancialData, freeCashFlow, isCheckedDescOrder }) {

  function extractYear(year){
    let textYear = year.toString()
    let finalDigitsYear= textYear.substring(2,4);
    return finalDigitsYear
  }

  let combinedArray = [];
  let chartColors=["#344955","#344955","#344955","#344955","#344955","gray","gray","gray", "gray"];
  const [ chartData, setChartData] = useState({
    labels:combinedArray.map((currElement)=> (currElement.year)),
    datasets:[{label:"Free Cash Flow", data:combinedArray.map((currElement)=> (currElement.fcff)),
    backgroundColor:["white"],
  }]});

  useEffect (()=> {
    if (isCheckedDescOrder){
      for (let i = 0; i < 5 ; i++){
        combinedArray[i] = freeCashFlow[i];
      }; 
      for (let j = 0; j < 4 ; j++){
        combinedArray[j+5] = historicalFinancialData[j];
      };
    } 
    else {
      for (let k = 3; k >= 0 ; k--){
        combinedArray[Math.abs(k-3)] = historicalFinancialData[k];
      };
      for (let k = 4; k >= 0 ; k--){
        combinedArray[Math.abs(k-4)+4] = freeCashFlow[k];
      };
      chartColors=["gray","gray","gray", "gray","#344955","#344955","#344955","#344955","#344955"];
    }
    setChartData({
      labels:combinedArray.map((currElement)=>currElement.year),
      datasets:[{label:"Free Cash Flow", data:combinedArray.map((currElement)=> (currElement.fcff)),
      backgroundColor:chartColors,
    }]});
  },[freeCashFlow, isCheckedDescOrder])

    return (
    <>
    <Bar data = { chartData } />;
    </>
  )
}

export default ChartRevenueFcff ;