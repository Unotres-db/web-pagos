import React from 'react';

import { Paper, Grid, TextField, InputAdornment,Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

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

  const classes = useStyles();
  return (
    <>
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
                variant="filled"
                fullWidth
                name="riskFreeReturn"
                InputProps={{
                  startAdornment: <InputAdornment position="start">%</InputAdornment>,
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Rm: Market Return (%)"
                size="small"
                value={assumptions.marketReturn}
                type="number"
                onChange = {(e) => setAssumptions(prevState => ({...prevState,marketReturn:e.target.value }))}
                variant="filled"
                fullWidth
                name="marketReturn"
                InputProps={{
                  startAdornment: <InputAdornment position="start">%</InputAdornment>,
                }}
              />
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
                variant="filled"
                fullWidth
                name="companyBeta"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Kd: Gross Cost of Debt (%)"
                size="small"
                value={assumptions.costOfDebt}
                type="number"
                onChange = {(e) => setAssumptions(prevState => ({...prevState, costOfDebt:e.target.value }))}
                variant="filled"
                fullWidth
                name="costOfDebt"
                InputProps={{
                  startAdornment: <InputAdornment position="start">%</InputAdornment>,
                }}
              />
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
              variant="filled"
              fullWidth
              name="costOfEquity"
              InputProps={{
                startAdornment: <InputAdornment position="start">%</InputAdornment>,
              }}
            />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Cost of Capital (WACC) (%)"
                size="small"
                value={calculatedCostOfCapital.costOfCapital}
                variant="filled"
                fullWidth
                name="costOfCapital"
                InputProps={{
                  startAdornment: <InputAdornment position="start">%</InputAdornment>,
                }}
              />
            </Grid>
            </Grid>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
    </>
  )
}