import React,{ useState, useEffect, memo } from 'react';

import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

// import useValuation from '../hooks/useValuation';

const useStyles = makeStyles( (mainTheme) => ({
table: {
  minWidth: 300,
  maxHeight: 900,
  // "& .MuiTableCell-root": {
  //   borderLeft: "1px solid rgba(224, 224, 224, 1)"
  // }
},
TableHeader:{
  color: "white",
  // backgroundColor: "#3C6E76" //azul claro navy
  backgroundColor:mainTheme.palette.tertiary.main
},
TableTitle:{
  color: "white",
  fontSize: 12
},
TableRows : {
  fontSize: 9
  }
}));

// function TableHistoricalData ({calcHistoricalAverages, historicalFinancialData, historicalAverages}){   //, setHistoricalAverages
export default function TableHistoricalData ({historicalFinancialData}){   //, setHistoricalAverages
//  function TableHistoricalData ({historicalFinancialData}){   //, setHistoricalAverages
  
  const classes = useStyles();
  // let historicalAverages = {}

  // let historicalAverages = {revenueGrowth:0, marginTarget:0, opexGrowth:0, interestGrowth:0, otherGrowth:0, taxRate:0, capexGrowth:0, nwcGrowth:0, cashFlowGrowth:0}
  const [ historicalAverages, setHistoricalAverages] = useState({revenueGrowth:0, marginTarget:0, opexGrowth:0, interestGrowth:0, otherGrowth:0, taxRate:0, capexGrowth:0, nwcGrowth:0, cashFlowGrowth:0})
  // console.count();

  useEffect (()=> {

    if (historicalFinancialData){
    
      function round (num) {
        var m = Number((Math.abs(num) * 100).toPrecision(15));
        return Math.round(m) / 100 * Math.sign(num);
      }
    
      function calcGrowthRate (initialValue, finalValue, years){
        if (initialValue > 0 && finalValue > 0){
          return round((((finalValue/initialValue)**(1/years))-1)*100)
        }
        if (initialValue < 0 && finalValue < 0){
          return round((((Math.abs(finalValue)/Math.abs(initialValue))**(1/years))-1)*100)
        }
        if (initialValue < 0 && finalValue > 0){
          return round((((finalValue + (2*Math.abs(initialValue))/Math.abs(initialValue))**(1/years))-1)*100)
        }
        if (initialValue > 0 && finalValue < 0){
          return round((((Math.abs(finalValue) + (2*(initialValue))/Math.abs(initialValue))**(1/years))-1)*-100)
        }
        else return 0
      }

    let averagesIndicators = {revenueCAGR: 0, opexCAGR: 0, interestCAGR: 0, otherCAGR: 0, capexCAGR:0, nwcCAGR:0, sumOfRevenue: 0, sumOfGrossProfit: 0, marginAvg: 0, sumOfIncomeBeforeTax: 0, sumOfIncomeTaxExpense: 0, taxRateAvg:0, cashFlowGrowth:0}
    if ( historicalFinancialData[0].totalRevenue !== undefined &&  historicalFinancialData[0].totalRevenue !== null ){ 
      
      for (let i = 0; i < historicalFinancialData.length-1 ; i++) {
        if (  historicalFinancialData[i].totalRevenue !== undefined &&  historicalFinancialData[i].totalRevenue !== null ){
          averagesIndicators.sumOfRevenue = averagesIndicators.sumOfRevenue + historicalFinancialData[i].totalRevenue;
        } else { averagesIndicators.sumOfRevenue = 0 }
        averagesIndicators.sumOfGrossProfit = averagesIndicators.sumOfGrossProfit + historicalFinancialData[i].grossProfit;
        averagesIndicators.sumOfIncomeBeforeTax = averagesIndicators.sumOfIncomeBeforeTax + historicalFinancialData[i].incomeBeforeTax;
        averagesIndicators.sumOfIncomeTaxExpense = averagesIndicators.sumOfIncomeTaxExpense + historicalFinancialData[i].incomeTaxExpense;
      }
      if ( historicalFinancialData[3].totalRevenue !== undefined &&  historicalFinancialData[2].totalRevenue !== null ){
        averagesIndicators.revenueCAGR = round((((historicalFinancialData[2].totalRevenue/historicalFinancialData[0].totalRevenue)**(1/2)) -1)*-100);
      } else { averagesIndicators.revenueCAGR = 0 }
      averagesIndicators.revenueCAGR = calcGrowthRate(historicalFinancialData[2].totalRevenue,historicalFinancialData[0].totalRevenue, 2);
      if (averagesIndicators.sumOfRevenue > 0) {
        averagesIndicators.marginAvg = round((averagesIndicators.sumOfGrossProfit/averagesIndicators.sumOfRevenue)*100);
      }
      averagesIndicators.opexCAGR = calcGrowthRate(historicalFinancialData[2].operatingExpenses,historicalFinancialData[0].operatingExpenses, 2) ;
      averagesIndicators.interestCAGR = calcGrowthRate(historicalFinancialData[2].interestExpense,historicalFinancialData[0].interestExpense, 2)
      averagesIndicators.otherCAGR = calcGrowthRate(historicalFinancialData[2].other,historicalFinancialData[0].other,2)
      if (averagesIndicators.sumOfIncomeBeforeTax !=0) {
        averagesIndicators.taxRateAvg =  round((averagesIndicators.sumOfIncomeTaxExpense/averagesIndicators.sumOfIncomeBeforeTax)*-100);
      }
      averagesIndicators.capexCAGR = calcGrowthRate(historicalFinancialData[2].capitalExpenditures,historicalFinancialData[0].capitalExpenditures, 2)
      averagesIndicators.nwcCAGR = calcGrowthRate(historicalFinancialData[2].workingCapitalChanges,historicalFinancialData[0].workingCapitalChanges, 2);
      averagesIndicators.cashFlowCAGR = calcGrowthRate(historicalFinancialData[2].cashFlow,historicalFinancialData[0].cashFlow, 2);
  }

    setHistoricalAverages(prevState => ({...prevState, 
      revenueGrowth:averagesIndicators.revenueCAGR, 
      marginTarget:averagesIndicators.marginAvg,
      opexGrowth:averagesIndicators.opexCAGR,
      interestGrowth:averagesIndicators.interestCAGR,
      otherGrowth:averagesIndicators.otherCAGR,
      taxRate:averagesIndicators.taxRateAvg,
      capexGrowth:averagesIndicators.capexCAGR,
      nwcGrowth:averagesIndicators.nwcCAGR,
      cashFlowGrowth:averagesIndicators.cashFlowCAGR,
    }));
    }

  },[historicalFinancialData])

  return (
    <>
    {/* {console.count()} */}

    <TableContainer component={Paper}>
      <Table className = {classes.table} size="small" aria-label="stycky header">

      <TableHead className = {classes.TableHeader}>
        <TableRow>
          { historicalFinancialData ? 
            <>
              <TableCell colSpan={6} className = {classes.TableTitle} align="left">{`Historical Growth Rates ${historicalFinancialData[2].year}-${historicalFinancialData[0].year} (CAGR)`}</TableCell>
            </>
          : <>
              <TableCell colSpan={6} className = {classes.TableTitle} align="left">{`Historical Growth Rates (CAGR)`}</TableCell>
            </> 
          }

        </TableRow>
      </TableHead>

        <TableBody>
          <TableRow>
            <TableCell align="left" className = {classes.TableRows} style={{ width: "20%", marginLeft:"5px", marginRight:"5px", padding:"4px" }} >Revenue Growth</TableCell>
            <TableCell align="right" className = {classes.TableRows} style={{ width: "10%", paddingRight:"5px", padding:"2px" }}>{Intl.NumberFormat('en-US',{style:'percent', minimumFractionDigits:1}).format(historicalAverages.revenueGrowth/100)}</TableCell>
            <TableCell align="left" className = {classes.TableRows} style={{ width: "20%", marginLeft:"5px", marginRight:"5px", padding:"4px" }} >Average Margin</TableCell>
            <TableCell align="right" className = {classes.TableRows} style={{ width: "10%", paddingRight:"5px", padding:"2px" }}>{Intl.NumberFormat('en-US',{style:'percent', minimumFractionDigits:1}).format(historicalAverages.marginTarget/100)}</TableCell>
            <TableCell align="left" className = {classes.TableRows} style={{ width: "20%", marginLeft:"5px", marginRight:"5px", padding:"4px" }} >Op. Expenses Growth</TableCell>
            <TableCell align="right" className = {classes.TableRows} style={{ width: "10%", paddingRight:"7px", padding:"4px" }}>{Intl.NumberFormat('en-US',{style:'percent', minimumFractionDigits:1}).format(historicalAverages.opexGrowth/100)}</TableCell>
          </TableRow>

          <TableRow>
            {/* <TableCell align="left" className = {classes.TableRows} style={{ width: "20%", marginLeft:"5px", marginRight:"5px", padding:"4px" }} >Depreciation Growth</TableCell>
            <TableCell align="right" className = {classes.TableRows} style={{ width: "10%", paddingRight:"5px", padding:"2px" }} >{Intl.NumberFormat('en-US',{style:'percent', minimumFractionDigits:1}).format(historicalAverages.opexGrowth/100)}</TableCell> */}
            <TableCell align="left" className = {classes.TableRows} style={{ width: "20%", marginLeft:"5px", marginRight:"5px", padding:"4px" }} >Interest Growth</TableCell>
            <TableCell align="right" className = {classes.TableRows} style={{ width: "10%", paddingRight:"5px", padding:"2px" }} >{Intl.NumberFormat('en-US',{style:'percent', minimumFractionDigits:1}).format(historicalAverages.interestGrowth/100)}</TableCell>
            <TableCell align="left" className = {classes.TableRows} style={{ width: "20%", marginLeft:"5px", marginRight:"5px", padding:"4px" }} >Other Inc. Growth</TableCell>
            <TableCell align="right" className = {classes.TableRows} style={{ width: "10%", paddingRight:"7px", padding:"2px" }} >{Intl.NumberFormat('en-US',{style:'percent', minimumFractionDigits:1}).format(historicalAverages.otherGrowth/100)}</TableCell>
            <TableCell align="left" className = {classes.TableRows} style={{ width: "20%", marginLeft:"5px", marginRight:"5px", padding:"4px" }} >Inc. Taxes Avg. Rate</TableCell>
            <TableCell align="right" className = {classes.TableRows} style={{ width: "10%", paddingRight:"5px",padding:"4px"  }} >{Intl.NumberFormat('en-US',{style:'percent', minimumFractionDigits:1}).format(historicalAverages.taxRate/100)}</TableCell>
          </TableRow>

          {/* <TableRow>
            <TableCell align="left" className = {classes.TableRows} style={{ width: "20%", marginLeft:"5px", marginRight:"5px", padding:"4px" }} >Inc. Taxes Avg. Rate</TableCell>
            <TableCell align="right" className = {classes.TableRows} style={{ width: "10%", paddingRight:"5px", padding:"2px"  }} >{Intl.NumberFormat('en-US',{style:'percent', minimumFractionDigits:1}).format(historicalAverages.otherGrowth/100)}</TableCell>
            <TableCell align="left" className = {classes.TableRows} style={{ width: "20%", marginLeft:"5px", marginRight:"5px", padding:"4px" }} >Net Income Growth</TableCell>
            <TableCell align="right" className = {classes.TableRows} style={{ width: "10%", paddingRight:"5px", padding:"2px"  }} >{Intl.NumberFormat('en-US',{style:'percent', minimumFractionDigits:1}).format(historicalAverages.taxRate/100)}</TableCell>
            <TableCell align="left" className = {classes.TableRows} style={{ width: "20%", marginLeft:"5px", marginRight:"5px", padding:"4px" }} >EBIT Growth</TableCell>
            <TableCell align="right" className = {classes.TableRows} style={{ width: "10%", paddingRight:"7px", padding:"2px" }} >{Intl.NumberFormat('en-US',{style:'percent', minimumFractionDigits:1}).format(historicalAverages.otherGrowth/100)}</TableCell>
          </TableRow>  */}

          <TableRow>
            <TableCell align="left" className = {classes.TableRows}  style={{ width: "20%", marginLeft:"5px", marginRight:"5px", padding:"4px" }} >Capex Growth</TableCell>
            <TableCell align="right" className = {classes.TableRows} style={{ width: "10%", paddingRight:"5px", padding:"2px" }} >{Intl.NumberFormat('en-US',{style:'percent', minimumFractionDigits:1}).format(historicalAverages.capexGrowth/100)}</TableCell>
            <TableCell align="left" className = {classes.TableRows}  style={{ width: "20%", marginLeft:"5px", marginRight:"5px", padding:"4px" }} >NWC Chgs. Growth</TableCell>
            <TableCell align="right" className = {classes.TableRows} style={{ width: "10%", paddingRight:"5px", padding:"2px" }} >{Intl.NumberFormat('en-US',{style:'percent', minimumFractionDigits:1}).format(historicalAverages.nwcGrowth/100)}</TableCell>
            <TableCell align="left" className = {classes.TableRows}  style={{ width: "20%", marginLeft:"5px", marginRight:"5px", padding:"4px" }} >Free Cash Flow Growth</TableCell>
            <TableCell align="right" className = {classes.TableRows} style={{ width: "10%", paddingRight:"7px", padding:"4px" }} >{Intl.NumberFormat('en-US',{style:'percent', minimumFractionDigits:1}).format(historicalAverages.cashFlowGrowth/100)}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
    </>
  )
}

// export default memo(TableHistoricalData);