import React,{ useEffect } from 'react';

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

export default function TableHistoricalData ({calcHistoricalAverages, historicalFinancialData, historicalAverages}){   //, setHistoricalAverages
  
  const classes = useStyles();
  // console.count();

  useEffect (()=> {
    if (historicalFinancialData){
      calcHistoricalAverages();
    } 
  },[])

  return (
    <>
    <TableContainer component={Paper}>
      <Table className = {classes.table} size="small" aria-label="stycky header">

      <TableHead className = {classes.TableHeader}>
        <TableRow>
          <TableCell colSpan={6} className = {classes.TableTitle} align="left">{`Historical Growth Rates ${historicalFinancialData[2].year}-${historicalFinancialData[0].year} (CAGR)`}</TableCell>
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
            <TableCell align="right" className = {classes.TableRows} style={{ width: "10%", paddingRight:"5px",padding:"4px"  }} >{Intl.NumberFormat('en-US',{style:'percent', minimumFractionDigits:1}).format(historicalAverages.otherGrowth/100)}</TableCell>
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