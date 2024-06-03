import React from 'react';

import { Paper, Grid, Tooltip, TextField, InputAdornment,Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

// import useValuationForm from '../../hooks/useValuationForm';
import NumberFormatPositive from '../../components/Formats/NumberFormatPositive';
// import NumberFormatAmount from '../../components/Formats/NumberFormatAmount';

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

export default function FormCostsAssumptions ({assumptions, setAssumptions, editMode}){
  const classes = useStyles(); 
  // const { formErrors, handleChange, noBlanks, isValidTaxRate, isValidDiscretePeriod } = useValuationForm({ assumptions, setAssumptions })
  
  return (
    <>
      <TableContainer component={Paper}>
    <Table className={classes.table} size="small" aria-label="stycky header">
      <TableHead className={editMode==="saved" || editMode==="published" ? classes.tableHeaderDisabled :classes.tableHeader}>
      {/* <TableHead className={classes.tableHeader}> */}

        <TableRow>
          <TableCell className={editMode==="saved" || editMode==="published" ? classes.tableTitleDisabled :classes.tableTitle} align="left">Supuestos de Costos del Terreno y Construcción</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        <TableRow>
          <Grid container>

            <Grid item xs={4} >
              <TextField label="Superficie de Construccion (m2)" className={classes.textFieldStyle} size="small" type="number" variant="filled" fullWidth
                value={assumptions.constructionSize}
                // onChange={(e) => {handleChange (e,[])}}
                onChange = {(e) => setAssumptions(prevState => ({...prevState,constructionSize:e.target.value }))}
                name="constructionSize"
                // disabled={editMode==="saved" || editMode==="published"}
                InputProps={{
                  inputComponent: NumberFormatPositive,
                }}
              />
            </Grid>
            <Grid item xs={4} >
              <Tooltip title="Costo Construccion (en m2)">
                <TextField label="Costo Contsruccion Us$ por m2" className={classes.textFieldStyle} size="small" type="number" variant="filled" fullWidth
                  value={assumptions.constructionCostPerMts}
                  // onChange={(e) => {handleChange (e,[])}}
                onChange = {(e) => setAssumptions(prevState => ({...prevState,constructionCostPerMts:e.target.value }))}
                  name="constructionCostPerMts"
                  // disabled={editMode==="saved" || editMode==="published"}
                  InputProps={{
                    inputComponent: NumberFormatPositive,
                  }}
                />
              </Tooltip>
            </Grid>
            <Grid item xs={4} >

            <TextField label="Costo Construccion en Us$" className={classes.textFieldStyle} size="small" type="number" variant="filled" fullWidth
                value={assumptions.constructionCost}
                onChange = {(e) => setAssumptions(prevState => ({...prevState,constructionCost:e.target.value }))}
                name="constructionCost"
                InputProps={{
                  inputComponent: NumberFormatPositive,
                }}
                // disabled={editMode==="saved" || editMode==="published"}
                // InputProps={{
                //   inputComponent: NumberFormatAmount,
                // }}
              /> 
            </Grid>
          </Grid>
        </TableRow>

        <TableRow>
          <Grid container>

            <Grid item xs={4} >
              <TextField label="Superficie Terremo (m2)" className={classes.textFieldStyle} size="small" type="number" variant="filled" fullWidth
                value={assumptions.landSize}
                // onChange={(e) => {handleChange (e,[])}}
                onChange = {(e) => setAssumptions(prevState => ({...prevState,landSize:e.target.value }))}

                name="landSize"
                // disabled={editMode==="saved" || editMode==="published"}
                InputProps={{
                  inputComponent: NumberFormatPositive,
                }}
              />
            </Grid>
            <Grid item xs={4} >
              <Tooltip title="Costo del terreno en metros cuadrados">
                <TextField label="Costo Terreno Us$ por m2" className={classes.textFieldStyle} size="small" type="number" variant="filled" fullWidth
                  value={assumptions.landCostPerMts}
                  // onChange={(e) => {handleChange (e,[])}}
                  onChange = {(e) => setAssumptions(prevState => ({...prevState,landCostPerMts:e.target.value }))}

                  name="landCostPerMts"
                  // disabled={editMode==="saved" || editMode==="published"}
                  InputProps={{
                    inputComponent: NumberFormatPositive,
                  }}
                />
              </Tooltip>
            </Grid>
            <Grid item xs={4} >
              <TextField label="Costo Terreno en Us$" className={classes.textFieldStyle} size="small" type="number" variant="filled" fullWidth
                value={405000}
                // onChange={(e) => {handleChange (e,[])}}
                // InputProps={{
                //   inputComponent: NumberFormatPositive,
                // }}
                // onChange = {(e) => setAssumptions(prevState => ({...prevState,landTotalCost:e.target.value }))}
                name="landTotalCost"
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