import React from "react";

import { Bar } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";

import { makeStyles, useTheme } from '@material-ui/core/styles';

export default function ChartCashFlow () {

  const theme = useTheme();
  const combinedFinancialData=[
    {
      year:2024,
      cashFlow:-901,
    },
    {
      year:2025,
      cashFlow:500,
    },
    {
      year:2026,
      cashFlow:983,
    },
    {
      year:2027,
      cashFlow:295,
    },
    {
      year:2028,
      cashFlow:295,
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
      <Bar data = { chartData } />
      </>  
    : null}
    </>
  )
}