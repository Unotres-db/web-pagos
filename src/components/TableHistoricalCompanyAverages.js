import React,{ useEffect } from 'react';

import { Paper, Tooltip, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

// import useValuation from '../hooks/useValuation';

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

export default function TableHistoricalCompanyAverages ({calcHistoricalAverages, historicalFinancialData, historicalAverages}){   //, setHistoricalAverages
  
  const classes = useStyles();
  // console.log(historicalAverages);
  // alert("--entrou em historical averages");
  // const { calcHistoricalAverages } = useValuation({ historicalFinancialData, historicalAverages, setHistoricalAverages, setAssumptions});
  // console.log(historicalFinancialData);
  
  useEffect (()=> {
    calcHistoricalAverages();
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
            <TableCell align="left" className = {classes.TableRows} style={{ width: "30%" }}>Revenue Growth Rate</TableCell>
            <TableCell align="right" className = {classes.TableRows} style={{ width: "20%" }}>{Intl.NumberFormat('en-US',{style:'percent', minimumFractionDigits:1}).format(historicalAverages.revenueGrowth/100)}</TableCell>
            <TableCell align="left" className = {classes.TableRows} style={{ width: "30%" }}>Average Margin</TableCell>
            <TableCell align="right" className = {classes.TableRows} style={{ width: "20%" }}>{Intl.NumberFormat('en-US',{style:'percent', minimumFractionDigits:1}).format(historicalAverages.marginTarget/100)}</TableCell>
          </TableRow>

          <TableRow>
            <TableCell align="left" className = {classes.TableRows} >Expenses Growth Rate</TableCell>
            <TableCell align="right" className = {classes.TableRows} >{Intl.NumberFormat('en-US',{style:'percent', minimumFractionDigits:1}).format(historicalAverages.opexGrowth/100)}</TableCell>
            <TableCell align="left" className = {classes.TableRows}>Interest Growth Rate</TableCell>
            <TableCell align="right" className = {classes.TableRows} >{Intl.NumberFormat('en-US',{style:'percent', minimumFractionDigits:1}).format(historicalAverages.interestGrowth/100)}</TableCell>
          </TableRow>

          <TableRow>
            <TableCell align="left" className = {classes.TableRows}>Other Inc. Growth</TableCell>
            <TableCell align="right" className = {classes.TableRows} >{Intl.NumberFormat('en-US',{style:'percent', minimumFractionDigits:1}).format(historicalAverages.otherGrowth/100)}</TableCell>
            <TableCell align="left" className = {classes.TableRows}>Inc.Taxes Avg. Rate</TableCell>
            <TableCell align="right" className = {classes.TableRows} >{Intl.NumberFormat('en-US',{style:'percent', minimumFractionDigits:1}).format(historicalAverages.taxRate/100)}</TableCell>
          </TableRow>

          <TableRow>
            <TableCell align="left" className = {classes.TableRows}>Capex Growth</TableCell>
            <TableCell align="right" className = {classes.TableRows} >{Intl.NumberFormat('en-US',{style:'percent', minimumFractionDigits:1}).format(historicalAverages.capexGrowth/100)}</TableCell>
            <TableCell align="left" className = {classes.TableRows}>NWC Chgs. Growth</TableCell>
            <TableCell align="right" className = {classes.TableRows} >{Intl.NumberFormat('en-US',{style:'percent', minimumFractionDigits:1}).format(historicalAverages.nwcGrowth/100)}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
    </>
  )
}