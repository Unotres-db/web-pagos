import React from 'react';

import { Paper, Grid, Tooltip, Typography, Box, TextField, InputAdornment,Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import useForm from '../hooks/useForm';
import useValuation from '../hooks/useValuation';

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
    }
  }));


export default function FormAssumptions ({assumptions, setAssumptions,freeCashFlow, setFreeCashFlow,discountedFreeCashFlow,setDiscountedFreeCashFlow,historicalFinancialData,valuation, setValuation}){
  // const {handleChangeAssumptions, noBlanks} = useForm (setAssumptions);
  const { calcValuation } = useValuation({assumptions, setAssumptions,freeCashFlow, setFreeCashFlow,discountedFreeCashFlow,setDiscountedFreeCashFlow,historicalFinancialData,valuation, setValuation,setChartData});
  const classes = useStyles();
  
  return (
    <>
    {/* <Box style={{height:"5px"}}/> */}

    <TableContainer component={Paper}>
      <Table className={classes.table} size="small" aria-label="stycky header">
        <TableHead className={classes.TableHeader}>
          <TableRow>
            <TableCell className={classes.TableTitle} align="left">Business Assumptions</TableCell>
            {/* <TableCell className={classes.TableTitle} align="right"></TableCell> */}
          </TableRow>
        </TableHead>

        <TableBody>
          <TableRow>
            <Grid container>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Revenue Growth Rate (%)"
                size="small"
                value={assumptions.fcffGrowthRate}
                type="number"
                onChange = {(e) => setAssumptions(prevState => ({...prevState, fcffGrowthRate:e.target.value }))}
                onBlur = {(e) => { calcValuation()}}
                variant="filled"
                fullWidth
                name="fcffGrowthRate"
                InputProps={{
                  startAdornment: <InputAdornment position="start">%</InputAdornment>,
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Tooltip title="Margin for the next years">
                <TextField
                  label="Target Margin (%)"
                  size="small"
                  value={assumptions.marginTarget}
                  type="number"
                  onChange = {(e) => setAssumptions(prevState => ({...prevState,marginTarget:e.target.value }))}
                  // onBlur = {(e) => { calcValuation()}}
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
                onChange = {(e) => setAssumptions(prevState => ({...prevState, opexGrowth:e.target.value }))}
                // onBlur = {(e) => { calcValuation()}}
                variant="filled"
                fullWidth
                name="opexGrowth"
                InputProps={{
                  startAdornment: <InputAdornment position="start">%</InputAdornment>,
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              {/* <Tooltip title="Average Opex Growth (last  4 years): 15%"> */}
                <TextField
                  autofocus
                  label="Other Inc. Growth Rate (%)"
                  size="small"
                  value={assumptions.otherGrowth}
                  type="number"
                  onChange = {(e) => setAssumptions(prevState => ({...prevState,otherGrowth:e.target.value }))}
                  // onBlur = {(e) => { calcValuation()}}
                  variant="filled"
                  fullWidth
                  name="otherGrowth"
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
                label="Capex Growth Rate (%)"
                size="small"
                value={assumptions.capexPercentage}
                type="number"
                onChange = {(e) => setAssumptions(prevState => ({...prevState, capexPercentage:e.target.value }))}
                // onBlur = {(e) => { calcValuation()}}
                variant="filled"
                fullWidth
                name="capexPercentage"
                InputProps={{
                  startAdornment: <InputAdornment position="start">%</InputAdornment>,
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Tooltip title="Net Working Capital">
                <TextField
                  autofocus
                  label="NWC Growth Rate (%)"
                  size="small"
                  value={assumptions.workingcapitalPercentage}
                  type="number"
                  onChange = {(e) => setAssumptions(prevState => ({...prevState,workingcapitalPercentage:e.target.value }))}
                  // onBlur = {(e) => { calcValuation()}}
                  variant="filled"
                  fullWidth
                  name="workingcapitalPercentage"
                  InputProps={{
                    startAdornment: <InputAdornment position="start">%</InputAdornment>,
                  }}
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