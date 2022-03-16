import React, {useState, useEffect} from 'react';

import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tooltip } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import FormBusinessAssumptions from './FormBusinessAssumptions';

const useStyles = makeStyles( (mainTheme) => ({
table: {
  minWidth: 300,
  maxHeight: 900
},
TableHeader:{
  color: "white",
  backgroundColor: mainTheme.palette.primary.main
},
TableTitle:{
  color: "white",
  fontSize: 12
},
TableRows : {
  fontSize: 11
  },
TableRowsSubtitle : {
  fontSize: 11,
  height: 16,
  backgroundColor: "#d3d3d3",//light gray
  }, 
  TableValuationPrice:{
    color: "orange",
    backgroundColor: mainTheme.palette.primary.main,
    fontSize: 11
  },
TableCurrentPrice:{
  color: "white",
  backgroundColor: mainTheme.palette.primary.main,
  fontSize: 11
},
}));


export default function TableDCFValuation ({valuation, historicalFinancialData, calculatedCostOfCapital, assumptions, companyData}){

  const [ firstYear, setFirstYear ] = useState(0);
  const [ finalYear, setFinalYear ] = useState(0);
  const classes = useStyles();

  useEffect (()=> {
    if (historicalFinancialData){
      setFirstYear(historicalFinancialData[0].year + 1)
      setFinalYear (historicalFinancialData[0].year + assumptions.cashFlowDiscretePeriod) ;
    } 
  },[]);  

  return (
  <>
  <TableContainer component={Paper}>
    <Table className={classes.table} size="small" aria-label="stycky header">
      <TableHead className={classes.TableHeader}>
        <TableRow>
          <TableCell className={classes.TableTitle} align="left">Valuation</TableCell>
          <TableCell className={classes.TableTitle} align="right"></TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
      <TableRow>
          <TableCell align="left" className={classes.TableRows}>{`FCFF Average Growth ${firstYear}-${finalYear}`}</TableCell>
          <TableCell align="right" className={classes.TableRows} >{Intl.NumberFormat('en-US',{style:'percent', minimumFractionDigits:2,maximumFractionDigits:2}).format(valuation.fcffAvgGrowth/100)}</TableCell>
        </TableRow>
        <TableRow>
          <Tooltip placement="top-start" title="WACC, Weighted Average Cost of Capital calulated using the CAPM Model">
            <TableCell align="left" className={classes.TableRows}>Cost of Capital (WACC)</TableCell>
          </Tooltip>
          <TableCell align="right" className={classes.TableRows} >{Intl.NumberFormat('en-US',{style:'percent', minimumFractionDigits:2,maximumFractionDigits:2}).format(calculatedCostOfCapital.costOfCapital/100)}</TableCell>
        </TableRow>
        <TableRow>
        <Tooltip placement="top-start" title="Present Value of the Free Cash Flow to Firm, using WACC as Discount Rate">
          <TableCell align="left" className={classes.TableRows}>{`FCFF Present Value @${Intl.NumberFormat('en-US',{style:'decimal', minimumFractionDigits:2,maximumFractionDigits:2}).format(calculatedCostOfCapital.costOfCapital)}%`}</TableCell>
        </Tooltip>  
          <TableCell align="right" className={classes.TableRows} >{Intl.NumberFormat('en-US',{style:'decimal', minimumFractionDigits:1,maximumFractionDigits:1}).format(valuation.discreteNPV)}</TableCell>
        </TableRow>
        <TableRow>
          <Tooltip placement="top-start" title="Terminal Value calculated based on last Free Cash Flow to the Firm and perpetual growth rate assumptions">
            <TableCell align="left" className={classes.TableRows}>Perpetuity Value </TableCell>
          </Tooltip>
          <TableCell align="right" className={classes.TableRows} >{Intl.NumberFormat('en-US',{style:'decimal', minimumFractionDigits:1,maximumFractionDigits:1}).format(valuation.perpetuityValue)}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell align="left" className={classes.TableRows}>Perpetuity Present Value </TableCell>
          <TableCell align="right" className={classes.TableRows} >{Intl.NumberFormat('en-US',{style:'decimal', minimumFractionDigits:1,maximumFractionDigits:1}).format(valuation.perpetuityPresentValue)}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell align="left" className={classes.TableRowsSubtitle}>Enterprise Value </TableCell>
          <TableCell align="right" className={classes.TableRowsSubtitle} >{Intl.NumberFormat('en-US',{style:'decimal', minimumFractionDigits:1,maximumFractionDigits:1}).format(valuation.enterpriseValue)}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell align="left" className={classes.TableRows}>(+) Cash</TableCell>
          {/* historicalFinancialData[0].cash */}
          <TableCell align="right" className={classes.TableRows} >{Intl.NumberFormat('en-US',{style:'decimal', minimumFractionDigits:1,maximumFractionDigits:1}).format(historicalFinancialData[0].cash)}</TableCell>   
        </TableRow>
        <TableRow>
          <TableCell align="left" className={classes.TableRows}>(-) Debt</TableCell>
          {/* historicalFinancialData[0].longTermDebt + historicalFinancialData[0].shortLongTermDebt */}
          <TableCell align="right" className={classes.TableRows} >{Intl.NumberFormat('en-US',{style:'decimal', minimumFractionDigits:1,maximumFractionDigits:1}).format(historicalFinancialData[0].longTermDebt + historicalFinancialData[0].shortLongTermDebt)}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell align="left" className={classes.TableValuationPrice}>Equity Value</TableCell>
          <TableCell align="right" className={classes.TableValuationPrice} >{Intl.NumberFormat('en-US',{style:'decimal', minimumFractionDigits:1,maximumFractionDigits:1}).format(valuation.equityValue)}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell align="left" className={classes.TableRows}>Total shares</TableCell>
          <TableCell align="right" className={classes.TableRows} >{Intl.NumberFormat('en-US',{style:'decimal', minimumFractionDigits:0,maximumFractionDigits:0}).format(companyData.shares)}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell align="left" className={classes.TableValuationPrice}>Target Stock Price </TableCell>
          <TableCell align="right" className={classes.TableValuationPrice} >{Intl.NumberFormat('en-US',{style:'currency',currency:'USD'}).format(valuation.targetStockPrice)}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell className={classes.TableCurrentPrice} align="left">Current Stock Price</TableCell>
          <TableCell align="right" className={classes.TableCurrentPrice} >{Intl.NumberFormat('en-US',{style:'currency',currency:'USD'}).format(162.04)}</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  </TableContainer>
  </>
  )
}