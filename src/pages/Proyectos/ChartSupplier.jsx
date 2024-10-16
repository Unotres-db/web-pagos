import React from "react";

import { Bar } from "react-chartjs-2";
// import { HorizontalBar } from "react-chartjs-2"; 
import { Chart as ChartJS } from "chart.js/auto";

import { makeStyles, useTheme } from '@material-ui/core/styles';

export default function ChartSupplier ({suppliersSubtotal}) {


  function trimString(string) {
    if (string.length > 11) {
      return string.substring(0, 11) + "...";
    } else {
      return string;
    }
  }

  const top5Suppliers = suppliersSubtotal.slice(0, 5);
  const otherSuppliersTotal = suppliersSubtotal.slice(5).reduce((total, supplier) => total + supplier.total, 0);
  const trimmedSuppliersSubtotals = [...top5Suppliers, { id: 'Otros', label: 'Otros', total: otherSuppliersTotal }];
  // const trimmedSuppliersSubtotals = suppliersSubtotal;


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
        labels:trimmedSuppliersSubtotals.map((currElement)=>(trimString(currElement.label))),
        datasets:[{label:"Subtotal", data:trimmedSuppliersSubtotals.map((currElement)=> (currElement.total)),
        backgroundColor:defineChartColors(),
      }]}

  function defineChartColors (){
    const arrayOfForecastedColors = Array.from({ length: 6 } , () => ("#344955"));
    // const arrayOfForecastedColors = Array.from({ length: 6 }, (v, i) => (i === 0 ? "#3C6E76" : "#344955"));
    return arrayOfForecastedColors
  }

  return (
    <>
    {suppliersSubtotal ? <>
      <Bar data = {chartData} options={options} />
      </>  
    : null}
    </>
  )
}