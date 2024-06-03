import React from "react";

import { Bar } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";

import { makeStyles, useTheme } from '@material-ui/core/styles';

export default function ChartValuation () {

  const theme = useTheme();
  const options = {
    plugins: {
      legend: {
        display: true, // Set display to false to hide the legend and the label
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
      year:23,
      cashFlow:-5677,
    },
    {
      year:24,
      cashFlow:694,
    },
    {
      year:25,
      cashFlow:2317,
    },
    {
      year:26,
      cashFlow:3206,
    },
    {
      year:27,
      cashFlow:5849,
    },
  ]
  const chartData = {
        labels:combinedFinancialData.map((currElement)=>(currElement.year)),
        datasets:[{label:"Flujo de Caja Libre Gs.m", data:combinedFinancialData.map((currElement)=> (currElement.cashFlow)),
        backgroundColor:defineChartColors(),
      }]}

  function defineChartColors (){
    const arrayOfForecastedColors = Array.from({ length: 5 } , () => (theme.palette.primary.main));
    return arrayOfForecastedColors
  }

  return (
    <>
    {combinedFinancialData ? <>
      <Bar data = {chartData} options={options} />
      </>  
    : null}
    </>
  )
}