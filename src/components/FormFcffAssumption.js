import React from 'react';

import { Paper, Grid, TextField, InputAdornment, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tooltip } from '@material-ui/core';
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

export default function FormFcffAssumption ({assumptions, setAssumptions}){
  const classes = useStyles();

  const handleChange = (e) => {
    setAssumptions (prevState => ({...prevState, [e.target.name]:e.target.value, revenueGrowth:"",marginTarget:"",opexGrowth:"", interestGrowth:"",otherGrowth:"",taxRate:"", capexGrowth:"", nwcGrowth:""}))
  };
  
  const handleChangeDiscretePeriod = (e) => {
    if (e.target.value > 0 && e.target.value < 21){
      setAssumptions (prevState => ({...prevState, [e.target.name]:e.target.value }))
    } else{
      setAssumptions (prevState => ({...prevState, [e.target.name]:1 }))
    }
  } 

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
        {/* <TableRow>
          <TextField
            label="Free Cash Flow Growth"
            size="small"
            value={assumptions.cashFlowGrowthRate}
            type="number"
            onChange={(e) => { handleChange (e)}}
            variant="filled"
            fullWidth
            name="cashFlowGrowthRate"
            InputProps={{
              startAdornment: <InputAdornment position="start">%</InputAdornment>,
            }}
          />
        </TableRow> */}

        <TableRow>
          <Grid container>

            <Grid item xs = {4}>
              <TextField
                label="Free Cash Flow Growth Rate"
                size="small"
                value={assumptions.cashFlowGrowthRate}
                type="number"
                onChange={(e) => { handleChange (e)}}
                variant="filled"
                fullWidth
                name="cashFlowGrowthRate"
                InputProps={{
                  startAdornment: <InputAdornment position="start">%</InputAdornment>,
                }}
              />
            </Grid>

            <Grid item xs = {4} >
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
            
            <Grid item xs={4} >
              <Tooltip title="Free Cash Flow Discrete Period (in Years)">
                <TextField
                  label="FCFF Discrete Period (Years)"
                  size="small"
                  value={assumptions.cashFlowDiscretePeriod}
                  type="number"
                  onChange={(e) => { handleChangeDiscretePeriod (e)}}
                  variant="filled"
                  fullWidth
                  name="cashFlowDiscretePeriod"
                  InputProps={{
                    inputProps: { 
                        max: 20, min: 1 
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