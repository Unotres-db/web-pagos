import React from 'react';

import { Paper, Grid, TextField, InputAdornment,Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import useValuationForm from '../../hooks/useValuationForm';

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
export default function FormCostOfCapitalData ({assumptions, setAssumptions, calculatedCostOfCapital}){

  const classes = useStyles();
  const { handleChange, isValidDiscretePeriod } = useValuationForm({ assumptions, setAssumptions })
  return (
    <>
    <TableContainer component={Paper}>
      <Table className={classes.table} size="small" aria-label="stycky header">
        <TableHead className={classes.TableHeader}>
          <TableRow>
            <TableCell className={classes.TableTitle} align="left">Cost of Capital Assumptions</TableCell>
            {/* <TableCell className={classes.TableTitle} align="left">Premissas do Custo de Capital</TableCell> */}
            {/* <TableCell className={classes.TableTitle} align="left">Supuestos del Costo de Capital</TableCell> */}

            {/* <TableCell className={classes.TableTitle} align="right"></TableCell> */}
          </TableRow>
        </TableHead>

        <TableBody>
          <TableRow>
            <Grid container>
              <Grid item xs={4} sm={4}>
                <TextField
                  label="Rf: Risk Free Return"
                  // label="Retorno Livre de Risco"
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
              <Grid item xs={4} sm={4}>
                <TextField
                  label="Rm: Market Return"
                  // label="Retorno do Mercado"
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
              <Grid item xs={4} sm={4}>
              <TextField
                label="Segment Beta"
                // label="Beta do Segmento"
                size="small"
                value={assumptions.companyBeta}
                type="number"
                onChange = {(e) => setAssumptions(prevState => ({...prevState, companyBeta:e.target.value }))}
                variant="filled"
                fullWidth
                name="companyBeta"
              />
            </Grid>
            </Grid>
          </TableRow>
          <TableRow>
            <Grid container>

            <Grid item xs={4} sm={4}>
              <TextField
                label="Kd: Gross Cost of Debt"
                // label="Custo da Dívida"
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
            <Grid item xs={4} sm={4}>
            <TextField
              label="Ke: Cost of Equity"
              // label ="Custo do Capital Próprio"
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
            <Grid item xs={4} sm={4}>
              <TextField
                label="WACC: Cost of Capital"
                // label="WACC: Custo de Capital"
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