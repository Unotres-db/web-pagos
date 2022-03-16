import React from 'react';

import { Paper, Tooltip, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

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

export default function TableDCFAssumptions ({fcffGrowthRate, taxRate, discountRate, perpetualGrowthRate, capexPercentage, workingCapitalChangesPercentage}){
  const classes = useStyles();

  return (
  <>

  </>
  )
}


{/* <TableContainer component={Paper}>
<Table className={classes.table} size="small" aria-label="stycky header">
    <TableHead className={classes.TableHeader}>
      <TableRow>
        <TableCell className={classes.TableTitle} align="left">Assumptions</TableCell>
        <TableCell className={classes.TableTitle} align="right">Data</TableCell>
      </TableRow>
    </TableHead>
    <TableBody>
      <TableRow>
        <TableCell align="left" className={classes.TableRows}>Cash Flow Growth Rate</TableCell>
            <TableCell align="right" className={classes.TableRows} >{Intl.NumberFormat('en-US',{style:'percent', minimumFractionDigits:2}).format(fcffGrowthRate/100)}</TableCell>
        </TableRow>
        <TableRow>
            <TableCell align="left" className={classes.TableRows}>Income Tax Rate </TableCell>
            <TableCell align="right" className={classes.TableRows} >{Intl.NumberFormat('en-US',{style:'percent', minimumFractionDigits:2}).format(taxRate)/100}</TableCell>
        </TableRow>
        <TableRow>
            <TableCell align="left" className={classes.TableRows}>Discount Rate </TableCell>
            <TableCell align="right" className={classes.TableRows} >{Intl.NumberFormat('en-US',{style:'percent', minimumFractionDigits:2}).format(discountRate/100)}</TableCell>
        </TableRow>
        <TableRow>
            <TableCell align="left" className={classes.TableRows}>Perpetual Growth Rate </TableCell>
            <TableCell align="right" className={classes.TableRows} >{Intl.NumberFormat('en-US',{style:'percent', minimumFractionDigits:2}).format(perpetualGrowthRate)}</TableCell>
        </TableRow>
        <TableRow>
            <TableCell align="left" className={classes.TableRows}>Capex Average Variation </TableCell>
            <TableCell align="right" className={classes.TableRows} >{Intl.NumberFormat('en-US',{style:'percent', minimumFractionDigits:2}).format(capexPercentage)}</TableCell>
        </TableRow>
        <TableRow>
            <Tooltip title ="Net Working Capital Changes" placement="top">
              <TableCell align="left" className={classes.TableRows}>NWC Changes</TableCell>
            </Tooltip>
            <TableCell align="right" className={classes.TableRows} >{Intl.NumberFormat('en-US',{style:'percent', minimumFractionDigits:2}).format(workingCapitalChangesPercentage)}</TableCell>
        </TableRow>
    </TableBody>
</Table>
</TableContainer> */}