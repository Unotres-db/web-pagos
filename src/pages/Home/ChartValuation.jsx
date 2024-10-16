import React from "react";

import { Bar } from "react-chartjs-2";
// import { HorizontalBar } from "react-chartjs-2"; 
import { Chart as ChartJS } from "chart.js/auto";

import { makeStyles, useTheme } from '@material-ui/core/styles';

export default function ChartValuation () {

  const theme = useTheme();
  const options = {
    plugins: {
      legend: {
        display: false, // Set display to false to hide the legend and the label
        labels: {
          fontColor: "blue",
          backgroundColor:"green",
          fontSize: 18
      }
      },
    },
    scales: {
      x: {
        ticks: {
          fontSize: "8px", // Set the font size for the x-axis ticks
        },
      },
      y: {
        ticks: {
          fontSize: 8, // Set the font size for the y-axis ticks
        },
      },
    },
  };
  const combinedFinancialData=[
    {
      year:2023,
      cashFlow:1.879,
    },
    {
      year:2024,
      cashFlow:4.635,
    },
    {
      year:2025,
      cashFlow:9.346,
    },
    {
      year:2026,
      cashFlow:6.850,
    },
    {
      year:2027,
      cashFlow:7.020,
    },
    {
      year:2028,
      cashFlow:7.190,
    },
  ]
  const chartData = {
        labels:combinedFinancialData.map((currElement)=>(currElement.year)),
        datasets:[{label:"Facturación Estimada USD (millones)", data:combinedFinancialData.map((currElement)=> (currElement.cashFlow)),
        backgroundColor:defineChartColors(),
      }]}

  function defineChartColors (){
    // const arrayOfForecastedColors = Array.from({ length: 6 } , () => ("#344955"));
    const arrayOfForecastedColors = Array.from({ length: 6 }, (v, i) => (i === 0 ? "#3C6E76" : "#344955"));
    return arrayOfForecastedColors
  }

  return (
    <>
    {combinedFinancialData ? <>
      <Bar data = {chartData} options={options} />
      {/* <HorizontalBar data = {chartData} options={options} /> */}

      </>  
    : null}
    </>
  )
}