import React from "react";

import { Bar } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";

import { Paper } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import makeStyles from '@mui/styles/makeStyles';

const useStyles = makeStyles((mainTheme) => ({
  paperStyle: {
    [mainTheme.breakpoints.down('sm')]: {
      // maxWidth: "350px",
      // margin:"5px"
    },
  }
  }));

export default function SuppliersChart () {
  const classes = useStyles();
  const theme = useTheme();
  const suppliersData =[{"concasa":300000000}]

   const chartData = {
        labels:combinedFinancialData.map((currElement)=>(currElement.year)),
        datasets:[{label:"Total Revenue (in Us$ b)", data:combinedFinancialData.map((currElement)=> (currElement.totalRevenue)),
        backgroundColor:defineChartColors(),
      }]}

  const chartOptions = {
    plugins: {
      legend: {
        labels: {
          boxWidth: 0,
        }
      },
      }
    }


  return (
    <>
    <Paper elevation={3} className={classes.paperStyle}>
      {combinedFinancialData ? <>
        <Bar data = { chartData } options={chartOptions} />
        </>  
      : null}
    </Paper>

    </>
  )
}