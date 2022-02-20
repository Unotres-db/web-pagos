import React, { useEffect, useState } from 'react';

import { TextField, Container, Grid, Paper, Box, Typography, Button } from '@material-ui/core';
// import Autocomplete from '@mui/material/Autocomplete';
import { makeStyles } from '@material-ui/core/styles';

import api from '../services/api';
import useForm from '../hooks/useForm';

import Header from '../components/Header'; 
import FormAssumptions from '../components/FormAssumptions';
import TableDCFAssumptions from '../components/TableDCFAssumptions';
import TableDCFFinancials from '../components/TableDCFFinancials';
import TableDCFValuation from '../components/TableDCFValuation';
import ChartRevenueFcff from '../components/ChartRevenueFcff';

// import logoXOM from '../assets/logoxom.png';
import picExxon from '../assets/logoxom.png';
import useValuation from '../hooks/useValuation';

const useStyles = makeStyles( (mainTheme) => ({
  contentStyle: {
    position: 'absolute',
    top: '65px',
  },
  container:{
    position:'absolute',
  },
  buttonStyle: {
    color: "white",
    font: "14px",
    backgroundColor:mainTheme.palette.secondary.main,
    textTransform:"none",
    margin: "0px",
  },
  titleStyle: {
    width: "100%",   
    padding: "15px",   
    color: mainTheme.palette.secondary.main,
    backgroundColor: "white",
    marginBottom: "10px",
  },
  boxStyle: {
    width: "100%",   
    padding: "1px",   
    color: "white",
    backgroundColor: mainTheme.palette.secondary.main,
    marginBottom: "1px",
  },
  paperStyle: {
    position: 'sticky',
    width: "100%",   
    height:"500px",
    marginLeft:"3px",
    marginRight:"0px",
    color: "white",
    backgroundColor: mainTheme.palette.secondary.main,
    padding: "10px",
  },
  CompanyInfo: {
    marginLeft:"3px",
    marginRight:"0px",
    color: "black",
    backgroundColor: "white",
    padding: "10px",
  },
  TableContainerStyle: {
    width: "100%",   
    height:"560px", // vai ser do tamanho do conteudo da tabela
    marginLeft:"3px",
    marginRight:"0px",
    color: "white",
    backgroundColor: mainTheme.palette.secondary.main,
    padding: "10px",
  },
  iconStyle: {
    textAlign: "center",
    display: "block",
    justifyContent: "center",
    alignItems: "center",
    margin: "auto",
    marginTop: "10px",
  }
}));

export default function DiscCashFlow (){

  useEffect (()=> {
  //   // api.get('dividendyield').then (response => {
  //   //   const allCompanies = response.data;
  //   //   setCompaniesList(allCompanies.filter(company => (company.dividendYield * 100) > minimumYield));
  //   // }).catch (function (err){
  //   //   if (err.response) {
  //   //     const errorMsg = Object.values(err.response.data);
  //   //     alert("warning - Error en acceso a base de datos" + errorMsg)
  //   //   } else if(err.request) {
  //   //       alert("warning - Error en acceso a servidor")
  //   //     } else {
  //   //         alert("warning - Error en acceso a servidor")
  //   //       }
  //   // });
    // calcFutureCashFlow();
    calcValuation();
  
  },[])

  // useEffect (()=> {
  //   alert("useEffect DiscCashFlow [assumptions]");

    // calcFutureCashFlow();
  // },[assumptions])

  const classes = useStyles();
  const [ assumptions, setAssumptions ] = useState({revenueGrowth:10.5, marginTarget:10.8, opexGrowth:2.3, otherGrowth:0,fcffGrowthRate:12,taxRate:0.25 , discountRate:10, capexPercentage:0.15, workingCapitalChangesPercentage:0.20, wacc: 0.1, perpetualGrowthRate: 0.03});
  // const [ freeCashFlow, setFreeCashFlow ] = useState([{year:0,fcff:0},{year:0,fcff:0},{year:0,fcff:0},{year:0,fcff:0},{year:0,fcff:0}]);
  const [ discountedFreeCashFlow, setDiscountedFreeCashFlow ] = useState([{year:0,fcff:0},{year:0,fcff:0},{year:0,fcff:0},{year:0,fcff:0},{year:0,fcff:0}]);
  const [ valuation, setValuation] = useState({discreteNPV:0, perpetuityValue:0, perpetuityPresentValue:0,enterpriseValue:0, equityValue:0})
  const [ freeCashFlow, setFreeCashFlow] = useState(Array.from({ length: 10 } , () => (
  { year: 0,
    totalRevenue:0, 
    costOfRevenue: 0,
    grossProfit: 0,
    totalOperatingExpenses: 0,
    depreciation: 0,
    interestExpense: 0,
    other: 0,
    incomeBeforeTax: 0,
    incomeTaxExpense: 0, 
    netIncome: 0,
    ebit: 0,
    capitalExpenditures: 0,
    workingCapitalChanges:0,
    fcff:0 }
  )));

  const [ historicalFinancialData, setHistoricalFinancialData ] = useState([
    { 
      year: 2021,
      totalRevenue: 152, 
      costOfRevenue: -112.39,
      grossProfit: 39.69,
      totalOperatingExpenses: -14.05,
      depreciation: -6.5,
      interestExpense: -1.75,
      other: 1.52,
      incomeBeforeTax: 18.91,
      incomeTaxExpense: -4.73, 
      netIncome: 14.19,
      ebit: 20.66,
      capitalExpenditures: -5.0,
      cash: 20.45,
      shortLongTermDebt:0.70,
      longTermDebt:6.15,
      workingCapitalChanges:-1
    },
    {
      year: 2020,
      totalRevenue: 132.25, 
      costOfRevenue: -100.35,
      grossProfit: 31.90,
      totalOperatingExpenses: -12.54,
      depreciation: -6,
      interestExpense: -1.5,
      other: 1.32,
      incomeBeforeTax: 13.18,
      incomeTaxExpense: -3.29, 
      netIncome: 9.88,
      ebit:14.68,
      capitalExpenditures: -5,
      cash: 10.32,
      shortLongTermDebt:0.65,
      longTermDebt:6.05,
      workingCapitalChanges:-1
    },
    {
      year: 2019,
      totalRevenue: 115, 
      costOfRevenue: -89.60,
      grossProfit: 25.40,
      totalOperatingExpenses: -11.2,
      depreciation: -5.5,
      interestExpense: -1.25,
      other: 1.15,
      incomeBeforeTax: 8.60,
      incomeTaxExpense: -2.15, 
      netIncome: 6.45,
      ebit:9.85,
      capitalExpenditures: -5,
      cash: 8.78,
      shortLongTermDebt:0.60,
      longTermDebt:5.95,
      workingCapitalChanges:-1
    },
    {
      year: 2018,
      totalRevenue: 100, 
      costOfRevenue: -80,
      grossProfit: 20,
      totalOperatingExpenses: -10,
      depreciation: -5,
      interestExpense: -1,
      other: 1,
      incomeBeforeTax: 5,
      incomeTaxExpense: -1.25, 
      netIncome: 3.75,
      ebit:6,
      capitalExpenditures: -5,
      cash: 5.78,
      shortLongTermDebt:0.50,
      longTermDebt:5.90,
      workingCapitalChanges:-1
    },
    { 
      year: 2017,
      totalRevenue: 152, 
      costOfRevenue: -112.39,
      grossProfit: 39.69,
      totalOperatingExpenses: -14.05,
      depreciation: -6.5,
      interestExpense: -1.75,
      other: 1.52,
      incomeBeforeTax: 18.91,
      incomeTaxExpense: -4.73, 
      netIncome: 14.19,
      ebit: 20.66,
      capitalExpenditures: -5.0,
      cash: 20.45,
      shortLongTermDebt:0.70,
      longTermDebt:6.15,
      workingCapitalChanges:-1
    },
    {
      year: 2016,
      totalRevenue: 132.25, 
      costOfRevenue: -100.35,
      grossProfit: 31.90,
      totalOperatingExpenses: -12.54,
      depreciation: -6,
      interestExpense: -1.5,
      other: 1.32,
      incomeBeforeTax: 13.18,
      incomeTaxExpense: -3.29, 
      netIncome: 9.88,
      ebit:14.68,
      capitalExpenditures: -5,
      cash: 10.32,
      shortLongTermDebt:0.65,
      longTermDebt:6.05,
      workingCapitalChanges:-1
    },
    {
      year: 2015,
      totalRevenue: 115, 
      costOfRevenue: -89.60,
      grossProfit: 25.40,
      totalOperatingExpenses: -11.2,
      depreciation: -5.5,
      interestExpense: -1.25,
      other: 1.15,
      incomeBeforeTax: 8.60,
      incomeTaxExpense: -2.15, 
      netIncome: 6.45,
      ebit:9.85,
      capitalExpenditures: -5,
      cash: 8.78,
      shortLongTermDebt:0.60,
      longTermDebt:5.95,
      workingCapitalChanges:-1
    },
    {
      year: 2014,
      totalRevenue: 100, 
      costOfRevenue: -80,
      grossProfit: 20,
      totalOperatingExpenses: -10,
      depreciation: -5,
      interestExpense: -1,
      other: 1,
      incomeBeforeTax: 5,
      incomeTaxExpense: -1.25, 
      netIncome: 3.75,
      ebit:6,
      capitalExpenditures: -5,
      cash: 5.78,
      shortLongTermDebt:0.50,
      longTermDebt:5.90,
      workingCapitalChanges:-1
    }
  ]);
    const companiesSymbols = [ {symbol: "CVX", CompanyName:"Chevron Corp"},{symbol: "XOM", CompanyName:"Exxon Corp"},{symbol: "PBR", CompanyName:"Petrobras"} ]
    
    // const [chartData, setChartData] = useState({
    //   labels:historicalFinancialData.map((currElement)=> (currElement.year)),
    //   datasets:[{label:"Revenue", data:historicalFinancialData.map((currElement)=> (currElement.totalRevenue)),
    //   backgroundColor:["gray"],
    // }]});
    const [chartData, setChartData] = useState({
      labels:freeCashFlow.map((currElement)=> (currElement.year)),
      datasets:[{label:"Free Cash Flow", data:freeCashFlow.map((currElement)=> (currElement.fcff)),
      backgroundColor:["gray"],
    }]});
    //"#344955"
    const { calcValuation } = useValuation({assumptions, setAssumptions,freeCashFlow, setFreeCashFlow,discountedFreeCashFlow,setDiscountedFreeCashFlow,historicalFinancialData,valuation, setValuation, setChartData});

    return (
    <>
    <Header />
    {/* <Container fixed> */}
    <Grid container direction="column" alignItems="center" style = {{ minHeight: '80vh'}} className={classes.container} >

      <Grid item xs={12} style = {{ minHeight: '69px'}} /> 

      <Grid item container direction="row" spacing={1} >
  
        <Grid item xs={12} md={3} >
          <Paper className={classes.paperStyle} >
            {/* <Typography align="center" variant="subtitle3">Assumptions:</Typography> */}
            {/* <TableDCFAssumptions 
                fcffGrowthRate={assumptions.fcffGrowthRate}
                taxRate={assumptions.taxRate} 
                discountRate={assumptions.discountRate}
                perpetualGrowthRate={assumptions.perpetualGrowthRate}
                capexPercentage={assumptions.capexPercentage}
                workingCapitalChangesPercentage={assumptions.workingCapitalChangesPercentage}
            /> */}
            <FormAssumptions 
              assumptions={assumptions} 
              setAssumptions={setAssumptions}
              historicalFinancialData={historicalFinancialData} 
              freeCashFlow={freeCashFlow} 
              setFreeCashFlow={setFreeCashFlow}
              discountedFreeCashFlow={discountedFreeCashFlow}
              setDiscountedFreeCashFlow={setDiscountedFreeCashFlow}
              valuation={valuation}
              setValuation={setValuation}
              setChartData={setChartData}
            />
          </Paper>
        </Grid>  

        <Grid item xs={12} md={6} > 
          <Paper className={classes.TableContainerStyle} >
            <Paper className={classes.CompanyInfo}>
              <Typography align="center" variant="subtitle3">Exxon Corp (XOM)</Typography>
              {/* <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={companiesSymbols}
                sx={{ width: 300 }}
                renderInput={(params) => <TextField {...params} label="Company" />}
              /> */}
            </Paper>
            <TableDCFFinancials 
              historyFinancialData={historicalFinancialData} 
              freeCashFlow={freeCashFlow} 
              discountedFreeCashFlow={discountedFreeCashFlow}
            />
          </Paper>  
        </Grid>

        <Grid item xs={12} md={3} > 
          <Paper className={classes.paperStyle} >
            <TableDCFValuation 
              valuation={valuation} 
              historicalFinancialData={historicalFinancialData} 
            />
            <ChartRevenueFcff chartData={chartData} />
          </Paper>
        </Grid>
      </Grid>
      </Grid>

    <Grid container direction="column" alignItems="center" style= {{ minHeight: '5vh'}} />
    {/* </Container> */}
    </>
  )
}

