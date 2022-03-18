import React from 'react';

import { Paper, Grid, Tooltip, Typography, Box, TextField, InputAdornment,Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

// import useForm from '../hooks/useForm';
import useValuation from '../hooks/useValuation';

const useStyles = makeStyles( (mainTheme) => ({
  table: {
    minWidth: 300,
    maxHeight: 900
  },
  TableHeader:{
    color: "white",
    backgroundColor: mainTheme.palette.secondary.main
  },
  TableTitle:{
    color: "white",
    fontSize: 12
  },
  TableRows : {
    fontSize: 11
    }
  }));
export default function FormCostOfCapitalAssumptions ({assumptions, setAssumptions, calculatedCostOfCapital}){

  // const {calcCostOfCapital } = useValuation({assumptions, setAssumptions, freeCashFlow, setFreeCashFlow, discountedFreeCashFlow, setDiscountedFreeCashFlow, historicalFinancialData, valuation, setValuation});
  const classes = useStyles();

  return (
    <>
    {/* <Box style={{height:"5px"}}/> */}

    <TableContainer component={Paper}>
      <Table className={classes.table} size="small" aria-label="stycky header">
        <TableHead className={classes.TableHeader}>
          <TableRow>
            <TableCell className={classes.TableTitle} align="left">Cost of Capital Assumptions</TableCell>
            {/* <TableCell className={classes.TableTitle} align="right"></TableCell> */}
          </TableRow>
        </TableHead>

        <TableBody>
          <TableRow>
            <Grid container>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Rf: Risk Free Return (%)"
                size="small"
                value={assumptions.riskFreeReturn}
                type="number"
                onChange = {(e) => setAssumptions(prevState => ({...prevState, riskFreeReturn:e.target.value }))}
                // onBlur = {(e) => { calcCostOfCapital() }}
                // onBlur = {calcCostOfCapital}
                variant="filled"
                fullWidth
                name="riskFreeReturn"
                InputProps={{
                  startAdornment: <InputAdornment position="start">%</InputAdornment>,
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              {/* <Tooltip title="Estimate Margin for next years"> */}
                <TextField
                  label="Rm: Market Return (%)"
                  size="small"
                  value={assumptions.marketReturn}
                  type="number"
                  onChange = {(e) => setAssumptions(prevState => ({...prevState,marketReturn:e.target.value }))}
                  // onBlur = {(e) => { calcCostOfCapital() }}
                  // onBlur = {calcCostOfCapital}
                  variant="filled"
                  fullWidth
                  name="marketReturn"
                  InputProps={{
                    startAdornment: <InputAdornment position="start">%</InputAdornment>,
                  }}
                />
              {/* </Tooltip> */}
            </Grid>
            </Grid>
          </TableRow>
          <TableRow>
            <Grid container>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Unlevered Segment Beta"
                size="small"
                value={assumptions.companyBeta}
                type="number"
                onChange = {(e) => setAssumptions(prevState => ({...prevState, companyBeta:e.target.value }))}
                // onBlur = {(e) => { calcCostOfCapital() }}
                // onBlur = {calcCostOfCapital}
                variant="filled"
                fullWidth
                name="companyBeta"
                // InputProps={{
                //   startAdornment: <InputAdornment position="start"></InputAdornment>,
                // }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              {/* <Tooltip title="Cost of Equity using CAPM Model"> */}
              <TextField
                label="Kd: Cost of Debt (%)"
                size="small"
                value={assumptions.costOfDebt}
                type="number"
                onChange = {(e) => setAssumptions(prevState => ({...prevState, costOfDebt:e.target.value }))}
                // onBlur = {(e) => { calcCostOfCapital(e) }}
                // onBlur = {calcCostOfCapital}
                variant="filled"
                fullWidth
                name="costOfDebt"
                InputProps={{
                  startAdornment: <InputAdornment position="start">%</InputAdornment>,
                }}
              />

              {/* </Tooltip> */}
            </Grid>
            </Grid>
          </TableRow>
          <TableRow>
            <Grid container>
            <Grid item xs={12} sm={6}>
            <TextField
                  label="Ke: Cost of Equity (%)"
                  size="small"
                  value={calculatedCostOfCapital.costOfEquity}
                  // type="number"
                  // onChange = {(e) => setAssumptions(prevState => ({...prevState,costOfEquity:e.target.value }))}
                  // onBlur = {(e) => { calcCostOfCapital() }}
                  // onBlur = {calcCostOfCapital}
                  variant="filled"
                  fullWidth
                  name="costOfEquity"
                  InputProps={{
                    startAdornment: <InputAdornment position="start">%</InputAdornment>,
                  }}
                />
            </Grid>
            <Grid item xs={12} sm={6}>
              {/* <Tooltip title="Ke: Cost of Equity"> */}
                <TextField
                  label="Cost of Capital (WACC) (%)"
                  size="small"
                  value={calculatedCostOfCapital.costOfCapital}
                  // type="number"
                  // onChange = {(e) => setAssumptions(prevState => ({...prevState,debtEquityRatio:e.target.value }))}
                  // onBlur = {(e) => { calcCostOfCapital() }}
                  // onBlur = {calcCostOfCapital}
                  variant="filled"
                  fullWidth
                  name="costOfCapital"
                  InputProps={{
                    startAdornment: <InputAdornment position="start">%</InputAdornment>,
                  }}
                />
              {/* </Tooltip> */}
            </Grid>
            </Grid>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
    </>
  )

}