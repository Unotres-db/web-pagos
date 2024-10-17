import React from "react";

import { Bar } from "react-chartjs-2";
// import { HorizontalBar } from "react-chartjs-2"; 
import { Chart as ChartJS } from "chart.js/auto";

import { makeStyles, useTheme } from '@material-ui/core/styles';

export default function ChartDisbursementByMonth ({disbursementsByMonth}) {
  const totalMonths=disbursementsByMonth.length
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
          fontSize: "5px", // Set the font size for the x-axis ticks
        },
      },
      y: {
        ticks: {
          fontSize: 5, // Set the font size for the y-axis ticks
        },
      },
    },
  };
  const chartData = {
        labels:disbursementsByMonth.map((currElement)=>((currElement.month))),
        datasets:[{label:"Subtotal", data:disbursementsByMonth.map((currElement)=> (currElement.total)),
        backgroundColor:defineChartColors(),
      }]}

  function defineChartColors (){
    const arrayOfForecastedColors = Array.from({ length: totalMonths } , () => ("#3C6E76"));
    return arrayOfForecastedColors
  }

  return (
    <>
    {disbursementsByMonth ? <>
      <Bar data = {chartData} options={options} />
      </>  
    : null}
    </>
  )
}