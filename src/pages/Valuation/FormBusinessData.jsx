import React from 'react';

import { Paper, Grid, Tooltip, TextField, InputAdornment,Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import useValuationForm from '../../hooks/useValuationForm';

const useStyles = makeStyles( (mainTheme) => ({
  table: {
    // minWidth: 300,
    // maxHeight: 900
  },
  textFieldStyle:{
    // "& .MuiFilledInput-root":{
    //   fontSize:"8px",
    //   color: "red",
    //   backgroundColor:"yellow",
    //   height: "28px",
    // }
  },
  TableHeader:{
    color:  "white",
    backgroundColor:  mainTheme.palette.secondary.main
  },
  TableTitle:{
    color: "white",
    fontSize: 12
  },
  }));

export default function FormBusinessData ({assumptions, setAssumptions}){
  const classes = useStyles();  
  const { formErrors, handleChange, noBlanks, isValidTaxRate, isValidDiscretePeriod } = useValuationForm({ assumptions, setAssumptions })

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
            <Grid item xs={4} >
              <TextField label="Revenue Growth Rate" className={classes.textFieldStyle} size="small" type="number" variant="filled" fullWidth
                value={assumptions.revenueGrowth}
                onChange={(e) => {handleChange (e,[])}}
                name="revenueGrowth"
                InputProps={{ startAdornment: <InputAdornment position="start">%</InputAdornment>,}}
              />
            </Grid>
            <Grid item xs={4} >
              <Tooltip title="Estimate Margin for next years">
                <TextField label="Margin Target" className={classes.textFieldStyle} size="small" type="number" variant="filled" fullWidth
                  value={assumptions.marginTarget}
                  onChange={(e) => {handleChange (e,[])}}
                  name="marginTarget"
                  InputProps={{ startAdornment: <InputAdornment position="start">%</InputAdornment>,}}
                />
              </Tooltip>
            </Grid>
            <Grid item xs={4} >
              <TextField label="Expenses Growth Rate" className={classes.textFieldStyle} size="small" type="number" variant="filled" fullWidth
                value={assumptions.opexGrowth}
                onChange={(e) => {handleChange (e,[])}}
                name="opexGrowth"
                InputProps={{
                  startAdornment: <InputAdornment position="start">%</InputAdornment>,
                }}
              />
            </Grid>
          </Grid>
        </TableRow>
        <TableRow>
          <Grid container>
            <Grid item xs={4} >
              <TextField label="Interest Growth Rate" size="small" type="number" variant="filled" fullWidth
                value={assumptions.interestGrowth}
                onChange={(e) => {handleChange (e,[])}}
                name="interestGrowth"
                InputProps={{
                  startAdornment: <InputAdornment position="start">%</InputAdornment>,
                }}
              />
            </Grid>
            <Grid item xs={4} >
                <TextField label="Other Inc. Growth Rate" size="small" type="number" variant="filled" fullWidth
                  value={assumptions.otherGrowth}
                  onChange={(e) => {handleChange (e,[])}}
                  name="otherGrowth"
                  InputProps={{
                    startAdornment: <InputAdornment position="start">%</InputAdornment>,
                  }}
                />
            </Grid>
            <Grid item xs={4} >
              <TextField label="Income Taxes Rate" size="small" type="number" variant="filled" fullWidth
                value={assumptions.taxRate}
                onChange={(e) => {handleChange (e,[isValidTaxRate])}}
                name="taxRate"
                error={formErrors.taxRate}
                helperText={formErrors.taxRate}
                InputProps={{
                  startAdornment: <InputAdornment position="start">%</InputAdornment>,
                }}
              />
            </Grid>
          </Grid>
        </TableRow>
        <TableRow>
          <Grid container>
            <Grid item xs={4}>
              <TextField label="Capex Growth Rate" size="small" type="number" variant="filled" fullWidth
                value={assumptions.capexGrowth}
                onChange={(e) => {handleChange (e,[])}}
                name="capexGrowth"
                InputProps={{
                  startAdornment: <InputAdornment position="start">%</InputAdornment>,
                }}
              />
            </Grid>
            <Grid item xs={4} >
              <Tooltip title="Net Working Capital Changes Growth Rate">
                <TextField label="NWCC Growth Rate" size="small" type="number" variant="filled" fullWidth
                  value={assumptions.nwcGrowth}
                  onChange={(e) => {handleChange (e,[])}}
                  name="nwcGrowth"
                  InputProps={{
                    startAdornment: <InputAdornment position="start">%</InputAdornment>,
                  }}
                />
              </Tooltip>
            </Grid>
            <Grid item xs={4} >
              <TextField label="Perpetual Growth Rate" size="small" type="number" variant="filled" fullWidth
                value={assumptions.perpetualGrowthRate}
                onChange={(e) => {handleChange (e,[])}}
                name="perpetualGrowthRate"
                InputProps={{
                  startAdornment: <InputAdornment position="start">%</InputAdornment>,
                }}
              />
            </Grid>
          </Grid>
        </TableRow>
        <TableRow>
          <Grid container>
            <Grid item xs={4} >
              <Tooltip title="Free cash Flow Discrete Period (in Years)">
                <TextField label="FCFF Discrete Period (Years)" size="small" type="number" variant="filled" fullWidth
                  value={assumptions.cashFlowDiscretePeriod}
                  onChange={(e) => {handleChange (e,[])}}
                  name="cashFlowDiscretePeriod"
                  // error={formErrors.cashFlowDiscretePeriod} 
                />
                {/* {formErrors.cashFlowDiscretePeriod ? <div >{formErrors.cashFlowDiscretePeriod}</div> : null} */}
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