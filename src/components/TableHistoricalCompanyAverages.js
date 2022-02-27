import React,{useEffect} from 'react';

import { Paper, Tooltip, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles( (mainTheme) => ({
table: {
  minWidth: 300,
  maxHeight: 900
},
TableHeader:{
  color: "white",
  backgroundColor: "#3C6E76"
},
TableTitle:{
  color: "white",
  fontSize: 12
},
TableRows : {
  fontSize: 9
  }
}));

export default function TableHistoricalCompanyAverages ({historicalFinancialData,historicalAverages, setHistoricalAverages}){
  
  const classes = useStyles();
  let averagesIndicators = {revenueCAGR: 0, opexCAGR: 0, interestCAGR: 0, otherCAGR: 0, sumOfRevenue: 0, sumOfGrossProfit: 0, marginAvg: 0, sumOfIncomeBeforeTax: 0, sumOfIncomeTaxExpense: 0, taxRateAvg:0}

  useEffect (()=> {
    for (let i = 0; i < historicalFinancialData.length-1 ; i++) {
      averagesIndicators.sumOfRevenue = averagesIndicators.sumOfRevenue + historicalFinancialData[i].totalRevenue;
      averagesIndicators.sumOfGrossProfit = averagesIndicators.sumOfGrossProfit + historicalFinancialData[i].grossProfit;
      averagesIndicators.sumOfIncomeBeforeTax = averagesIndicators.sumOfIncomeBeforeTax + historicalFinancialData[i].incomeBeforeTax;
      averagesIndicators.sumOfIncomeTaxExpense = averagesIndicators.sumOfIncomeTaxExpense + historicalFinancialData[i].incomeTaxExpense;
    }
    averagesIndicators.marginAvg = (averagesIndicators.sumOfGrossProfit/averagesIndicators.sumOfRevenue);
    averagesIndicators.taxRateAvg =  (averagesIndicators.sumOfIncomeTaxExpense/averagesIndicators.sumOfIncomeBeforeTax);
    averagesIndicators.revenueCAGR = (((historicalFinancialData[3].totalRevenue/historicalFinancialData[0].totalRevenue)**(1/4)) -1)*-100;
    averagesIndicators.opexCAGR = (((historicalFinancialData[3].totalOperatingExpenses/historicalFinancialData[0].totalOperatingExpenses)**(1/4)) -1)*-100;
    averagesIndicators.interestCAGR = (((historicalFinancialData[3].interestExpense/historicalFinancialData[0].interestExpense)**(1/4)) -1)*-1;
    averagesIndicators.otherCAGR = (((historicalFinancialData[3].other/historicalFinancialData[0].other)**(1/4)) -1)*-1;
    setHistoricalAverages(averagesIndicators);
  },[])

  return (
    <>
    
    <TableContainer component={Paper}>
      <Table className = {classes.table} size="small" aria-label="stycky header">
      <TableHead className = {classes.TableHeader}>
          <TableRow>
            <TableCell colSpan={6} className = {classes.TableTitle} align="left">Historical 4 Years Averages</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          <TableRow>
            <TableCell align="left" className = {classes.TableRows} style={{ width: "30%" }}>Revenue Avg. Growth</TableCell>
              <TableCell align="right" className = {classes.TableRows} style={{ width: "20%" }}>{Intl.NumberFormat('en-US',{style:'percent', minimumFractionDigits:2}).format( historicalAverages.revenueCAGR/100)}</TableCell>
              <TableCell align="left" className = {classes.TableRows} style={{ width: "30%" }}>Average Margin</TableCell>
              <TableCell align="right" className = {classes.TableRows} style={{ width: "20%" }}>{Intl.NumberFormat('en-US',{style:'percent', minimumFractionDigits:2}).format(historicalAverages.marginAvg)}</TableCell>
            </TableRow>

            <TableRow>
              <TableCell align="left" className = {classes.TableRows} >Expenses Avg. Growth</TableCell>
              <TableCell align="right" className = {classes.TableRows} >{Intl.NumberFormat('en-US',{style:'percent', minimumFractionDigits:2}).format(historicalAverages.opexCAGR/100)}</TableCell>
              <TableCell align="left" className = {classes.TableRows}>Interest Avg. Growth</TableCell>
              <TableCell align="right" className = {classes.TableRows} >{Intl.NumberFormat('en-US',{style:'percent', minimumFractionDigits:2}).format( historicalAverages.interestCAGR)}</TableCell>
            </TableRow>

            <TableRow>
              <TableCell align="left" className = {classes.TableRows}>Other Inc. Avg. Growth</TableCell>
              <TableCell align="right" className = {classes.TableRows} >{Intl.NumberFormat('en-US',{style:'percent', minimumFractionDigits:2}).format(historicalAverages.otherCAGR)}</TableCell>
                <Tooltip title ="Net Working Capital Changes" placement="top">
                  <TableCell align="left" className = {classes.TableRows}>NWC Changes</TableCell>
                </Tooltip>
              <TableCell align="right" className = {classes.TableRows} >{Intl.NumberFormat('en-US',{style:'percent', minimumFractionDigits:2}).format(historicalAverages.otherCAGR)}</TableCell>
            </TableRow>

        </TableBody>
      </Table>
    </TableContainer>
    </>
  )
}