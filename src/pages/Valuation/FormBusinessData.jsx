import React from 'react';

import { Paper, Grid, Tooltip, TextField, InputAdornment,Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

// import useForm from '../../hooks/useForm';

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

export default function FormBusinessData ({assumptions, setAssumptions}){
  const classes = useStyles();  
  const handleChange = (e) => {
    setAssumptions (prevState => ({...prevState, [e.target.name]:e.target.value, cashFlowGrowthRate:0 }))
  }; 

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
              <TextField
                label="Revenue Growth Rate"
                size="small"
                value={assumptions.revenueGrowth}
                type="number"
                onChange={(e) => { handleChange (e)}}
                variant="filled"
                fullWidth
                name="revenueGrowth"
                InputProps={{
                  startAdornment: <InputAdornment position="start">%</InputAdornment>,
                }}
              />
            </Grid>
            <Grid item xs={4} >
              <Tooltip title="Estimate Margin for next years">
                <TextField
                  label="Margin Target"
                  size="small"
                  value={assumptions.marginTarget}
                  type="number"
                  onChange={(e) => { handleChange (e)}}
                  variant="filled"
                  fullWidth
                  name="marginTarget"
                  InputProps={{
                    startAdornment: <InputAdornment position="start">%</InputAdornment>,
                  }}
                />
              </Tooltip>
            </Grid>
            <Grid item xs={4} >
              <TextField
                label="Expenses Growth Rate"
                size="small"
                value={assumptions.opexGrowth}
                type="number"
                onChange={(e) => { handleChange (e)}}
                variant="filled"
                fullWidth
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
            {/* <Grid item xs={6} sm={6}>
              <TextField
                label="Opex Growth Rate (%)"
                size="small"
                value={assumptions.opexGrowth}
                type="number"
                onChange={(e) => { handleChange (e)}}
                variant="filled"
                fullWidth
                name="opexGrowth"
                InputProps={{
                  startAdornment: <InputAdornment position="start">%</InputAdornment>,
                }}
              />
            </Grid> */}
            <Grid item xs={4} >
              <TextField
                label="Interest Growth Rate"
                size="small"
                value={assumptions.interestGrowth}
                type="number"
                onChange={(e) => { handleChange (e)}}
                variant="filled"
                fullWidth
                name="interestGrowth"
                InputProps={{
                  startAdornment: <InputAdornment position="start">%</InputAdornment>,
                }}
              />
            </Grid>
            <Grid item xs={4} >
                <TextField
                  label="Other Inc. Growth Rate"
                  size="small"
                  value={assumptions.otherGrowth}
                  type="number"
                  onChange={(e) => { handleChange (e)}}
                  variant="filled"
                  fullWidth
                  name="otherGrowth"
                  InputProps={{
                    startAdornment: <InputAdornment position="start">%</InputAdornment>,
                  }}
                />
            </Grid>
            <Grid item xs={4} >
              <TextField
                label="Income Taxes Rate"
                size="small"
                value={assumptions.taxRate}
                type="number"
                onChange={(e) => { handleChange (e)}}
                variant="filled"
                fullWidth
                name="taxRate"
                InputProps={{
                  startAdornment: <InputAdornment position="start">%</InputAdornment>,
                }}
              />
            </Grid>
          </Grid>
        </TableRow>
        {/* <TableRow>
          <Grid container>
            <Grid item xs={6} sm={6}>
                <TextField
                  label="Other Inc. Growth Rate (%)"
                  size="small"
                  value={assumptions.otherGrowth}
                  type="number"
                  onChange={(e) => { handleChange (e)}}
                  variant="filled"
                  fullWidth
                  name="otherGrowth"
                  InputProps={{
                    startAdornment: <InputAdornment position="start">%</InputAdornment>,
                  }}
                />
            </Grid>
            <Grid item xs={6} sm={6}>
              <TextField
                label="Inc. Taxes Rate (%)"
                size="small"
                value={assumptions.taxRate}
                type="number"
                onChange={(e) => { handleChange (e)}}
                variant="filled"
                fullWidth
                name="taxRate"
                InputProps={{
                  startAdornment: <InputAdornment position="start">%</InputAdornment>,
                }}
              />
            </Grid>
          </Grid>
        </TableRow> */}
        <TableRow>
          <Grid container>
            <Grid item xs={4}>
              <TextField
                label="Capex Growth Rate"
                size="small"
                value={assumptions.capexGrowth}
                type="number"
                onChange={(e) => { handleChange (e)}}
                variant="filled"
                fullWidth
                name="capexGrowth"
                InputProps={{
                  startAdornment: <InputAdornment position="start">%</InputAdornment>,
                }}
              />
            </Grid>
            <Grid item xs={4} >
              <Tooltip title="Net Working Capital Changes Growth Rate">
                <TextField
                  label="NWCC Growth Rate"
                  size="small"
                  value={assumptions.nwcGrowth}
                  type="number"
                  onChange={(e) => { handleChange (e)}}
                  variant="filled"
                  fullWidth
                  name="nwcGrowth"
                  InputProps={{
                    startAdornment: <InputAdornment position="start">%</InputAdornment>,
                  }}
                />
              </Tooltip>
            </Grid>
            <Grid item xs={4} >
              <TextField
                label="Perpetual Growth Rate"
                size="small"
                value={assumptions.perpetualGrowthRate}
                type="number"
                onChange={(e) => { handleChange (e)}}
                variant="filled"
                fullWidth
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
            {/* <Grid item xs={6} sm={6}>
              <TextField
                label="Perpetual Growth Rate (%)"
                size="small"
                value={assumptions.perpetualGrowthRate}
                type="number"
                onChange={(e) => { handleChange (e)}}
                variant="filled"
                fullWidth
                name="perpetualGrowthRate"
                InputProps={{
                  startAdornment: <InputAdornment position="start">%</InputAdornment>,
                }}
              />
            </Grid> */}
            <Grid item xs={4} >
              <Tooltip title="Free cash Flow Discrete Period (in Years)">
                <TextField
                  label="FCFF Discrete Period (Years)"
                  size="small"
                  value={assumptions.cashFlowDiscretePeriod}
                  type="number"
                  onChange={(e) => { handleChange (e)}}
                  variant="filled"
                  fullWidth
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