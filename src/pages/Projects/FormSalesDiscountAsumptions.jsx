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

export default function FormSalesDiscountAssumptions ({assumptions, setAssumptions, editMode}){
  const classes = useStyles(); 

  return (
    //  fisrtMonthOfSale:0, phaseOneSales:0, phaseTwoSales:0, phaseThreeSales:0,phaseOneMonths:0, phaseTwoMonths:0, phaseThreeMonths:0,
    <>
      <TableContainer component={Paper}>
    <Table className={classes.table} size="small" aria-label="stycky header">
      <TableHead className={editMode==="saved" || editMode==="published" ? classes.tableHeaderDisabled :classes.tableHeader}>

        <TableRow>
          <TableCell className={editMode==="saved" || editMode==="published" ? classes.tableTitleDisabled :classes.tableTitle} align="left">Supuestos de Ventas y Descuentos</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>

      

        <TableRow>
          <Grid container>


            <Grid item xs={4} >
              <TextField label="Ventas en Pozo" className={classes.textFieldStyle} size="small" type="number" variant="filled" fullWidth
                value={assumptions.phaseOneSales}
                onChange = {(e) => setAssumptions(prevState => ({...prevState,phaseOneSales:e.target.value }))}
                name="phaseOneSales"
                InputProps={{
                  startAdornment: <InputAdornment position="start">%</InputAdornment>,
                }}
              />
            </Grid>
            <Grid item xs={4} >
                <TextField label="Ventas en Obra" className={classes.textFieldStyle} size="small" type="number" variant="filled" fullWidth
                  value={assumptions.phaseTwoSales}
                  onChange = {(e) => setAssumptions(prevState => ({...prevState,phaseTwoSales:e.target.value }))}
                  name="phaseTwoSales"
                  InputProps={{
                    startAdornment: <InputAdornment position="start">%</InputAdornment>,
                  }}
                />
            </Grid>
            <Grid item xs={4} >
              <TextField label="Ventas con Obra Terminada" className={classes.textFieldStyle} size="small" type="number" variant="filled" fullWidth
                value={assumptions.phaseThreeSales}
                onChange = {(e) => setAssumptions(prevState => ({...prevState,phaseThreeSales:e.target.value }))}
                name="phaseThreeSales"
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
              <TextField label="Descuento en Pozo" className={classes.textFieldStyle} size="small" type="number" variant="filled" fullWidth
                value={assumptions.phaseOneDiscount}
                // onChange={(e) => {handleChange (e,[])}}
                onChange = {(e) => setAssumptions(prevState => ({...prevState,phaseOneDiscount:e.target.value }))}

                name="phaseOneDiscount"
                // disabled={editMode==="saved" || editMode==="published"}
                InputProps={{
                  startAdornment: <InputAdornment position="start">%</InputAdornment>,
                }}
              />
            </Grid>
            <Grid item xs={4} >
                <TextField label="Descuento en Obra" className={classes.textFieldStyle} size="small" type="number" variant="filled" fullWidth
                  value={assumptions.phaseTwoDiscount}
                  // onChange={(e) => {handleChange (e,[])}}
                  onChange = {(e) => setAssumptions(prevState => ({...prevState,phaseTwoDiscount:e.target.value }))}

                  name="phaseTwoDiscount"
                  // disabled={editMode==="saved" || editMode==="published"}
                  InputProps={{
                    startAdornment: <InputAdornment position="start">%</InputAdornment>,
                  }}
                />
            </Grid>
            <Grid item xs={4} >
              <TextField label="Descuento Ventas Terminada" className={classes.textFieldStyle} size="small" type="number" variant="filled" fullWidth
                value={0}
                // onChange={(e) => {handleChange (e,[])}}
                name="phaseThreeSales"
                // disabled={editMode==="saved" || editMode==="published"}
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