import React from 'react';

import { Paper, Grid, TextField, InputAdornment, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tooltip } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import useValuationForm from '../../hooks/useValuationForm';

const useStyles = makeStyles( (mainTheme) => ({
  table: {
    minWidth: 300,
    maxHeight: 900
  },
  TableHeader:{
    color:  "white",
    backgroundColor:  mainTheme.palette.secondary.main
  },
  TableTitle:{
    color: "white",
    fontSize: 12
  },
  TableRows : {
    fontSize: 11
  }
  }));

export default function FormCashFlowData ({assumptions, setAssumptions}){
  const classes = useStyles();
  const { formErrors, handleChange, noBlanks, isValidDiscretePeriod } = useValuationForm({ assumptions, setAssumptions })
  const formTitle =   "Business Assumptions"
  // const formTitlePt = "Premissas de Negocio"
  // const formTitleEs = "Supuestos del Negocio"
  const formLabels = [
    { id:0,
      label: "Free Cash Flow Growth Rate", 
    //label: "Cresc. Fluxo de Caixa Livre",
    },
    { id:1,
      label: "Perpetual Growth Rate", 
   // label: "Cresc. na Perpetuidade"
    },
    { id:2,
      label: "FCFF Discrete Period (Years)",   
   // label: "Periodo do Fluxo Discreto"
    }
  ]

  return (
  <>
  <TableContainer component={Paper}>
    <Table className={classes.table} size="small" aria-label="stycky header">
      <TableHead className={classes.TableHeader}>
        <TableRow>
          <TableCell className={classes.TableTitle} align="left">Business Assumptions</TableCell>
        </TableRow>
      </TableHead>

      <TableBody>

        <TableRow>
          <Grid container>

            <Grid item xs = {4}>
              <TextField
                label="Free Cash Flow Growth Rate"
                size="small"
                value={assumptions.cashFlowGrowthRate}
                type="number"
                onChange={(e) => {handleChange (e,[])}}
                variant="filled"
                fullWidth
                name="cashFlowGrowthRate"
                error={formErrors.cashFlowGrowthRate}
                helperText={formErrors.cashFlowGrowthRate}
                InputProps={{
                  startAdornment: <InputAdornment position="start">%</InputAdornment>,
                }}
              />
              {/* {formErrors.cashFlowGrowthRate ? <div className="error-helper-text">{formErrors.cashFlowGrowthRate}</div> : null} */}
            </Grid>

            <Grid item xs = {4} >
              <TextField
                label="Perpetual Growth Rate"
                size="small"
                value={assumptions.perpetualGrowthRate}
                type="number"
                // onChange={(e) => { handleChange (e)}}
                onChange={(e) => {handleChange (e,[noBlanks])}}
                variant="filled"
                fullWidth
                name="perpetualGrowthRate"
                error={formErrors.perpetualGrowthRate}
                helperText={formErrors.perpetualGrowthRate}
                InputProps={{
                  startAdornment: <InputAdornment position="start">%</InputAdornment>,
                }}
              />
            </Grid>
            
            <Grid item xs={4} >
              <Tooltip title="Free Cash Flow discrete period, in years, before perpetuity">
                <TextField
                  label="FCFF Discrete Period (Years)"
                  size="small"
                  value={assumptions.cashFlowDiscretePeriod}
                  type="number"
                  placeholder="Value ?"
                  onChange={(e) => {handleChange (e,[isValidDiscretePeriod])}}
                  variant="filled"
                  fullWidth
                  name="cashFlowDiscretePeriod"
                  error={formErrors.cashFlowDiscretePeriod}
                  helperText={formErrors.cashFlowDiscretePeriod}
                  InputProps={{
                    inputProps: { 
                        max: 30, min: 1 
                    }}}
                />
              </Tooltip>
            </Grid>

          </Grid>
        </TableRow>
      </TableBody>
    </Table>
  </TableContainer>
  </>
  )
}