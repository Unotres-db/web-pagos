import React, {useState, useEffect} from 'react';

import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tooltip } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles( (mainTheme) => ({
table: {
  // minWidth: 300,
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
  backgroundColor: mainTheme.palette.contrast.main, //light gray
  }, 
TableValuationPrice:{
  color: mainTheme.palette.secondary.main,
  backgroundColor: mainTheme.palette.primary.main,
  fontSize: 11
},
TableCurrentPrice:{
  color: "white",
  backgroundColor: mainTheme.palette.tertiary.main, //mainTheme.palette.primary.main,
  fontSize: 11,
},
}));

export default function TableValuation ({valuation, historicalFinancialData, calculatedCostOfCapital, assumptions, companyData}){

  const classes = useStyles();
  const [ firstYear, setFirstYear ] = useState(0);
  const [ finalYear, setFinalYear ] = useState(0);
  // const priceRange = `${Intl.NumberFormat('en-US',{style:'currency',currency:'USD' }).format(companyData.fiftyTwoWeekLow)} - ${Intl.NumberFormat('en-US',{style:'decimal', minimumFractionDigits:1,maximumFractionDigits:1}).format(companyData.fiftyTwoWeekHigh)}`


  useEffect (()=> {
    if (historicalFinancialData){
      setFirstYear(historicalFinancialData[0].year + 1)
      const calcFinalYear = historicalFinancialData[0].year + +assumptions.cashFlowDiscretePeriod
      setFinalYear(calcFinalYear);
    } 
  },[assumptions]);

  return (
  <>
  <TableContainer component={Paper}>
    <Table className={classes.table} size="small" aria-label="stycky header">
      <TableHead className={classes.TableHeader}>
        <TableRow>
          <TableCell className={classes.TableValuationPrice} style={{fontSize: 12}}align="left">Valuation (Us$ billions)</TableCell>
          <TableCell className={classes.TableValuationPrice} align="right"></TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        <TableRow>
          <TableCell align="left" className={classes.TableRows}>{`FCFF Average Growth ${firstYear}-${finalYear}`}</TableCell>
          <TableCell align="right" className={classes.TableRows} >{Intl.NumberFormat('en-US',{style:'percent', minimumFractionDigits:2,maximumFractionDigits:2}).format(valuation.cashFlowAvgGrowth/100)}</TableCell>
        </TableRow>
        <TableRow>
          <Tooltip placement="top-start" title="Present Value of the Free Cash Flow to Firm, using WACC as Discount Rate">
            <TableCell align="left" className={classes.TableRows}>{`FCFF Present Value @${Intl.NumberFormat('en-US',{style:'decimal', minimumFractionDigits:2,maximumFractionDigits:2}).format(calculatedCostOfCapital.costOfCapital)}%`}</TableCell>
          </Tooltip>  
          <TableCell align="right" className={classes.TableRows} >{Intl.NumberFormat('en-US',{style:'decimal', minimumFractionDigits:1,maximumFractionDigits:1}).format(valuation.sumOfCashFlowPresentValue)}</TableCell>
        </TableRow>
        <TableRow>
          <Tooltip placement="top-start" title="Terminal Value calculated based on last Free Cash Flow to the Firm and perpetual growth rate assumptions">
            <TableCell align="left" className={classes.TableRows}>Terminal Value </TableCell>
          </Tooltip>
          <TableCell align="right" className={classes.TableRows} >{Intl.NumberFormat('en-US',{style:'decimal', minimumFractionDigits:1,maximumFractionDigits:1}).format(valuation.perpetuityValue)}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell align="left" className={classes.TableRows}>Present Value of Terminal Value</TableCell>
          <TableCell align="right" className={classes.TableRows} >{Intl.NumberFormat('en-US',{style:'decimal', minimumFractionDigits:1,maximumFractionDigits:1}).format(valuation.perpetuityPresentValue)}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell align="left" className={classes.TableRowsSubtitle}>Enterprise Value</TableCell>
          <TableCell align="right" className={classes.TableRowsSubtitle} >{Intl.NumberFormat('en-US',{style:'decimal', minimumFractionDigits:1,maximumFractionDigits:1}).format(valuation.enterpriseValue)}</TableCell>
        </TableRow>
        {/* <TableRow>
          <TableCell align="left" className={classes.TableCurrentPrice}>Current Enterprise Value</TableCell>
          <TableCell align="right" className={classes.TableCurrentPrice} >{Intl.NumberFormat('en-US',{style:'decimal', minimumFractionDigits:1,maximumFractionDigits:1}).format(companyData.marketCap - valuation.cash + valuation.debt)}</TableCell>
        </TableRow> */}
        <TableRow>
          <TableCell align="left" className={classes.TableRows}>(+) Cash and Short Term Investments</TableCell>
          <TableCell align="right" className={classes.TableRows} >{Intl.NumberFormat('en-US',{style:'decimal', minimumFractionDigits:1,maximumFractionDigits:1}).format(valuation.cash)}</TableCell>   
        </TableRow>
        <TableRow>
          <TableCell align="left" className={classes.TableRows}>(-) Debt and Leasing Obligations</TableCell>
          <TableCell align="right" className={classes.TableRows} >{Intl.NumberFormat('en-US',{style:'decimal', minimumFractionDigits:1,maximumFractionDigits:1}).format(valuation.debt)}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell align="left" className={classes.TableValuationPrice}>Equity Value</TableCell>
          <TableCell align="right" className={classes.TableValuationPrice} >{Intl.NumberFormat('en-US',{style:'decimal', minimumFractionDigits:1,maximumFractionDigits:1}).format(valuation.equityValue)}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell align="left" className={classes.TableValuationPrice}>Target Stock Price </TableCell>
          <TableCell align="right" className={classes.TableValuationPrice} >{Intl.NumberFormat('en-US',{style:'currency',currency:'USD'}).format(valuation.targetStockPrice)}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell align="left" className={classes.TableCurrentPrice}>Current Equity Value</TableCell>
          <TableCell align="right" className={classes.TableCurrentPrice} >{Intl.NumberFormat('en-US',{style:'decimal', minimumFractionDigits:1,maximumFractionDigits:1}).format(companyData.marketCap)}</TableCell>
        </TableRow>

        <TableRow>
          <TableCell className={classes.TableCurrentPrice} align="left">Current Stock Price</TableCell>
          <TableCell align="right" className={classes.TableCurrentPrice} >{Intl.NumberFormat('en-US',{style:'currency',currency:'USD'}).format(companyData.regularMarketPrice)}</TableCell>
        </TableRow>
        {/* <TableRow>
          <TableCell className={classes.TableCurrentPrice} align="left">52 Week Price Range</TableCell>
          <TableCell align="right" className={classes.TableCurrentPrice} style={{ padding:"0px", marginRight:"5px", fontSize:9}}>{priceRange}</TableCell>
        </TableRow> */}
        <TableRow>
          <TableCell align="left" className={classes.TableRows}>Total Shares Outstanding (millions)</TableCell>
          { companyData.sharesOutstanding ? <>
            <TableCell align="right" className={classes.TableRows} >{Intl.NumberFormat('en-US',{style:'decimal', minimumFractionDigits:0,maximumFractionDigits:0}).format(companyData.sharesOutstanding)}</TableCell>
          </>: <>
            <TableCell align="right" className={classes.TableRows} >{Intl.NumberFormat('en-US',{style:'decimal', minimumFractionDigits:0,maximumFractionDigits:0}).format(0)}</TableCell>
          </>
        }
        </TableRow>
      </TableBody>
    </Table>
  </TableContainer>
  </>
  )
}