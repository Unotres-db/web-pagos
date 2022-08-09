import React from 'react';

import { Paper, TableContainer, Table, TableBody, TableCell, TableHead, TableRow } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import useDataHandling from '../../hooks/useDataHandling';

const useStyles = makeStyles( (mainTheme) => ({
table: {
  //   minWidth: 300,
  // maxHeight: 900,
  // "& .MuiTableCell-root": {
  //   borderLeft: "1px solid rgba(224, 224, 224, 1)",
  // }
},
TableHeader:{
  color: "white",
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

export default function TableHistoricalData2 ({historicalFinancialData}){
  
  const classes = useStyles();
  const { calcHistoricalAverages } = useDataHandling();
  const historicalAverages = calcHistoricalAverages(historicalFinancialData);

  return (
    <>
    <TableContainer component={Paper}>
      <Table className = {classes.table} size="small" aria-label="stycky header">

      <TableHead className = {classes.TableHeader}>
        <TableRow>
          { historicalFinancialData ? <TableCell colSpan={6} className = {classes.TableTitle} align="left">{`Historical Growth Rates ${historicalFinancialData[2].year}-${historicalFinancialData[0].year} (CAGR)`}</TableCell>
            : <TableCell colSpan={6} className = {classes.TableTitle} align="left">{`Historical Growth Rates (CAGR)`}</TableCell>
          }
        </TableRow>
      </TableHead>

      { historicalAverages ? <>
        <TableBody>
          <TableRow>
            <TableCell align="left" className = {classes.TableRows} style={{ width: "20%", marginLeft:"5px", marginRight:"5px", padding:"4px" }} >Revenue Growth</TableCell>
            <TableCell align="right" className = {classes.TableRows} style={{ width: "10%", paddingRight:"5px", padding:"2px" }}>{Intl.NumberFormat('en-US',{style:'percent', minimumFractionDigits:1}).format(historicalAverages.revenueCAGR/100)}</TableCell>
            <TableCell align="left" className = {classes.TableRows} style={{ width: "20%", marginLeft:"5px", marginRight:"5px", padding:"4px" }} >Average Margin</TableCell>
            <TableCell align="right" className = {classes.TableRows} style={{ width: "10%", paddingRight:"5px", padding:"2px" }}>{Intl.NumberFormat('en-US',{style:'percent', minimumFractionDigits:1}).format(historicalAverages.marginAvg/100)}</TableCell>
            <TableCell align="left" className = {classes.TableRows} style={{ width: "20%", marginLeft:"5px", marginRight:"5px", padding:"4px" }} >Op. Expenses Growth</TableCell>
            <TableCell align="right" className = {classes.TableRows} style={{ width: "10%", paddingRight:"7px", padding:"4px" }}>{Intl.NumberFormat('en-US',{style:'percent', minimumFractionDigits:1}).format(historicalAverages.opexCAGR/100)}</TableCell>
          </TableRow>

          <TableRow>
            {/* <TableCell align="left" className = {classes.TableRows} style={{ width: "20%", marginLeft:"5px", marginRight:"5px", padding:"4px" }} >Depreciation Growth</TableCell>
            <TableCell align="right" className = {classes.TableRows} style={{ width: "10%", paddingRight:"5px", padding:"2px" }} >{Intl.NumberFormat('en-US',{style:'percent', minimumFractionDigits:1}).format(historicalAverages.opexGrowth/100)}</TableCell> */}
            <TableCell align="left" className = {classes.TableRows} style={{ width: "20%", marginLeft:"5px", marginRight:"5px", padding:"4px" }} >Interest Growth</TableCell>
            <TableCell align="right" className = {classes.TableRows} style={{ width: "10%", paddingRight:"5px", padding:"2px" }} >{Intl.NumberFormat('en-US',{style:'percent', minimumFractionDigits:1}).format(historicalAverages.interestCAGR/100)}</TableCell>
            <TableCell align="left" className = {classes.TableRows} style={{ width: "20%", marginLeft:"5px", marginRight:"5px", padding:"4px" }} >Other Inc. Growth</TableCell>
            <TableCell align="right" className = {classes.TableRows} style={{ width: "10%", paddingRight:"7px", padding:"2px" }} >{Intl.NumberFormat('en-US',{style:'percent', minimumFractionDigits:1}).format(historicalAverages.otherCAGR/100)}</TableCell>
            <TableCell align="left" className = {classes.TableRows} style={{ width: "20%", marginLeft:"5px", marginRight:"5px", padding:"4px" }} >Inc. Taxes Avg. Rate</TableCell>
            <TableCell align="right" className = {classes.TableRows} style={{ width: "10%", paddingRight:"5px",padding:"4px"  }} >{Intl.NumberFormat('en-US',{style:'percent', minimumFractionDigits:1}).format(historicalAverages.taxRateAvg/100)}</TableCell>
          </TableRow>

          <TableRow>
            <TableCell align="left" className = {classes.TableRows}  style={{ width: "20%", marginLeft:"5px", marginRight:"5px", padding:"4px" }} >Capex Growth</TableCell>
            <TableCell align="right" className = {classes.TableRows} style={{ width: "10%", paddingRight:"5px", padding:"2px" }} >{Intl.NumberFormat('en-US',{style:'percent', minimumFractionDigits:1}).format(historicalAverages.capexCAGR/100)}</TableCell>
            <TableCell align="left" className = {classes.TableRows}  style={{ width: "20%", marginLeft:"5px", marginRight:"5px", padding:"4px" }} >NWC Chgs. Growth</TableCell>
            <TableCell align="right" className = {classes.TableRows} style={{ width: "10%", paddingRight:"5px", padding:"2px" }} >{Intl.NumberFormat('en-US',{style:'percent', minimumFractionDigits:1}).format(historicalAverages.nwcCAGR/100)}</TableCell>
            <TableCell align="left" className = {classes.TableRows}  style={{ width: "20%", marginLeft:"5px", marginRight:"5px", padding:"4px" }} >Free Cash Flow Growth</TableCell>
            <TableCell align="right" className = {classes.TableRows} style={{ width: "10%", paddingRight:"7px", padding:"4px" }} >{Intl.NumberFormat('en-US',{style:'percent', minimumFractionDigits:1}).format(historicalAverages.cashFlowCAGR/100)}</TableCell>
          </TableRow>
        </TableBody>
      </>: null }

      </Table>
    </TableContainer>
    </>
  )
}