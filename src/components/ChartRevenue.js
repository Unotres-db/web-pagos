import React, {useState, useEffect} from "react";

import { Bar } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";

export default function ChartRevenue ({ historicalFinancialData, forecastedFinancialData, isCheckedDescOrder }) {
  // console.log(historicalFinancialData);
  function extractYear(year){
    let textYear = year.toString()
    let finalDigitsYear= textYear.substring(2,4);
    return finalDigitsYear
  }
  
  let combinedArray = [];
  //#F9AA33
  let chartColors=["#F9AA33","#F9AA33","#F9AA33","#F9AA33","#F9AA33","#3C6E76","#3C6E76","#3C6E76", "#3C6E76"]; //#344955"
  const [ chartData, setChartData] = useState({
    labels:combinedArray.map((currElement)=> extractYear((currElement.year))),
    datasets:[{label:"Revenue", data:combinedArray.map((currElement)=> (currElement.totalRevenue)),
    backgroundColor:["white"],
  }]});

  useEffect (()=> {
    function generateChartData(){
      if (isCheckedDescOrder){
        for (let i = 0; i < 5 ; i++){
          combinedArray[i] = forecastedFinancialData[i];
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
          combinedArray[Math.abs(k-4)+4] = forecastedFinancialData[k];
        };
        chartColors=["#3C6E76","#3C6E76","#3C6E76", "#3C6E76","#F9AA33","#F9AA33","#F9AA33","#F9AA33","#F9AA33"];
      }
    
      setChartData({
        labels:combinedArray.map((currElement)=>extractYear(currElement.year)),
        datasets:[{label:"Revenue", data:combinedArray.map((currElement)=> (currElement.totalRevenue)),
        backgroundColor:chartColors,
      }]});
    }
    
    generateChartData();
  },[forecastedFinancialData, isCheckedDescOrder])

    return (
    <>
    <Bar data = { chartData } />
    </>
  )
}