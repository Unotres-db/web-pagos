import React from 'react';

import { Paper, Grid, Tooltip, TextField, InputAdornment,Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

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
  tableHeader:{
    // backgroundColor: mainTheme.palette.secondary.main
    // backgroundColor: "#5499C7"
    backgroundColor:  mainTheme.palette.primary.main
  },
  tableHeaderDisabled:{
    backgroundColor:  mainTheme.palette.primary.main
  },
  tableTitle:{
    color: "white",
    fontSize: 12
  },
  tableTitleDisabled:{
    color: mainTheme.palette.secondary.main,
    fontSize: 12
  }
  }));

export default function FormSalesAssumptions ({assumptions, setAssumptions, editMode}){
  const classes = useStyles(); 

  return (
    //  fisrtMonthOfSale:0, phaseOneSales:0, phaseTwoSales:0, phaseThreeSales:0,phaseOneMonths:0, phaseTwoMonths:0, phaseThreeMonths:0,
    <>
      <TableContainer component={Paper}>
    <Table className={classes.table} size="small" aria-label="stycky header">
      <TableHead className={editMode==="saved" || editMode==="published" ? classes.tableHeaderDisabled :classes.tableHeader}>

        <TableRow>
          <TableCell className={editMode==="saved" || editMode==="published" ? classes.tableTitleDisabled :classes.tableTitle} align="left">Supuestos de Periodo de Ventas</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>

      <TableRow>
          <Grid container >

            <Grid item xs={3} >
              <TextField label="Mes de Inicio de Ventas" className={classes.textFieldStyle} size="small" type="number" variant="filled" fullWidth
                value={assumptions.fisrtMonthOfSale}
                // onChange={(e) => {handleChange (e,[])}}
                onChange = {(e) => setAssumptions(prevState => ({...prevState,fisrtMonthOfSale:e.target.value }))}
                name="fisrtMonthOfSale"
                // disabled={editMode==="saved" || editMode==="published"}
              />
            </Grid>

            <Grid item xs={3} >
              <TextField label="Meses de Venta en Pozo" className={classes.textFieldStyle} size="small" type="number" variant="filled" fullWidth
                  value={assumptions.phaseOneMonths}
                  onChange = {(e) => setAssumptions(prevState => ({...prevState,phaseOneMonths:e.target.value }))}
                  name="phaseThreeMonths"
                  // disabled={editMode==="saved" || editMode==="published"}
                />
            </Grid>
            <Grid item xs={3} >
              <TextField label="Meses de Venta en Obra" className={classes.textFieldStyle} size="small" type="number" variant="filled" fullWidth
                  value={assumptions.phaseTwoMonths}

                  // onChange={(e) => {handleChange (e,[])}}
                onChange = {(e) => setAssumptions(prevState => ({...prevState,phaseTwoMonths:e.target.value }))}

                  name="phaseThreeMonths"
                  // disabled={editMode==="saved" || editMode==="published"}
                />
            </Grid>
            <Grid item xs={3} >
              <TextField label="Meses de Venta Obra Terminada" className={classes.textFieldStyle} size="small" type="number" variant="filled" fullWidth
                  value={assumptions.phaseThreeMonths}
                  // onChange={(e) => {handleChange (e,[])}}
                onChange = {(e) => setAssumptions(prevState => ({...prevState,phaseThreeMonths:e.target.value }))}

                  name="phaseThreeMonths"
                  // disabled={editMode==="saved" || editMode==="published"}
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