import React from 'react';

import { Paper, Grid, Tooltip, TextField, InputAdornment,Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

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

export default function FormBusinessAssumptions ({assumptions, setAssumptions}){
  const classes = useStyles();  

  const handleChange = (e) => {
    setAssumptions (prevState => ({...prevState, [e.target.name]:e.target.value, fcffGrowthRate:0 }))
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
          <Grid item xs={12} sm={6}>
            <TextField
              label="Revenue Growth Rate (%)"
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
          <Grid item xs={12} sm={6}>
            <Tooltip title="Estimate Margin for next years">
              <TextField
                label="Target Margin (%)"
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
          </Grid>
        </TableRow>
        <TableRow>
          <Grid container>
          <Grid item xs={12} sm={6}>
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
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Interest Growth Rate (%)"
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
          </Grid>
        </TableRow>
        <TableRow>
          <Grid container>
          <Grid item xs={12} sm={6}>
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
          <Grid item xs={12} sm={6}>
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
        </TableRow>
        <TableRow>
          <Grid container>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Capex Growth Rate (%)"
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
          <Grid item xs={12} sm={6}>
            <Tooltip title="Net Working Capital">
              <TextField
                label="NWC Growth Rate (%)"
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
          </Grid>
        </TableRow>
        <TableRow>
        <Grid container>
          <Grid item xs={12} sm={6}>
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
          </Grid>
          <Grid item xs={12} sm={6}>
            <Tooltip title="Free cash Flow Discrete Period (in Years)">
              <TextField
                label="FCFF Discrete Period"
                size="small"
                value={assumptions.cashFlowDiscretePeriod}
                type="number"
                onChange={(e) => { handleChange (e)}}
                variant="filled"
                fullWidth
                name="cashFlowDiscretePeriod"
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