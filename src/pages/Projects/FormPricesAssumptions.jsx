import React from 'react';

import { Paper, Grid, Tooltip, TextField, InputAdornment,Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import NumberFormatPositive from '../../components/Formats/NumberFormatPositive';

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

export default function FormPricesAssumptions ({assumptions, setAssumptions, editMode}){
  const classes = useStyles();  
  // const assumptions = { oneRoomQty:0, oneRoomSize:0, oneRoomPricePerSqrMts:0,oneRoomTotalPrice:0,
  //                       twoRoomsQty:0, twoRoomsSize:0, twoRoomsPricePerSqrMts:0,twoRoomsTotalPrice:0,
  //                       threeRoomsQty:0, threeRoomsSize:0, threeRoomsPricePerSqrMts:0,threeRoomsTotalPrice:0,
  //                       parkingQty:0,parkingAvgprice:0,
  //                       landSize:0, landCostPerMts:0, landTotalCost:0,
  //                       constructionSize:0,constructionCostPerMts:0, constructionCost:0};
  // }

  return (
  <>
  <TableContainer component={Paper}>
    <Table className={classes.table} size="small" aria-label="stycky header">
      <TableHead className={editMode==="saved" || editMode==="published" ? classes.tableHeaderDisabled :classes.tableHeader}>
      {/* <TableHead className={classes.tableHeader}> */}

        <TableRow>
          <TableCell className={editMode==="saved" || editMode==="published" ? classes.tableTitleDisabled :classes.tableTitle} align="left">Supuestos de Cantidades y Precios por Torre</TableCell>
          {/* <TableCell className={classes.tableTitle} align="left">Business Assumptions</TableCell> */}

        </TableRow>
      </TableHead>
      <TableBody>
        <TableRow>
          <Grid container>
            <Grid item xs={2}>
              <TableCell style={{paddingLeft: "5px",fontSize: 10}}>1 Dorm.</TableCell>
            </Grid>
            <Grid item xs={2} >
              <TextField label="Cantidad por Torre" className={classes.textFieldStyle} size="small" type="number" variant="filled" fullWidth
                value={assumptions.oneRoomQty}
                // onChange={(e) => {handleChange (e,[])}}
                onChange = {(e) => setAssumptions(prevState => ({...prevState,oneRoomQty:e.target.value }))}
                name="oneRoomQty"
                // disabled={editMode==="saved" || editMode==="published"}
                InputProps={{
                  inputComponent: NumberFormatPositive,
                }}
              />
            </Grid>
            <Grid item xs={2} >
              <Tooltip title="Cantidad de metros cuadrados del deptartamento de 1 dormitorio">
                <TextField label="Metros Cuadrados" className={classes.textFieldStyle} size="small" type="number" variant="filled" fullWidth
                  value={assumptions.oneRoomSize}
                  // onChange={(e) => {handleChange (e,[])}}
                  onChange = {(e) => setAssumptions(prevState => ({...prevState,oneRoomSize:e.target.value }))}
                  name="oneRoomSize"
                  // disabled={editMode==="saved" || editMode==="published"}
                  InputProps={{
                    inputComponent: NumberFormatPositive,
                  }}
                />
              </Tooltip>
            </Grid>
            <Grid item xs={3} >
              <TextField label="Precio Us$ por m2" className={classes.textFieldStyle} size="small" type="number" variant="filled" fullWidth
                value={assumptions.oneRoomPricePerSqrMts}
                // onChange={(e) => {handleChange (e,[])}}
                onChange = {(e) => setAssumptions(prevState => ({...prevState,oneRoomPricePerSqrMts:e.target.value }))}
                name="oneRoomPricePerSqrMts"
                // disabled={editMode==="saved" || editMode==="published"}
                InputProps={{
                  inputComponent: NumberFormatPositive,
                }}
              />
            </Grid>
            <Grid item xs={3} >
              <TextField label="Precio Total en Us$" className={classes.textFieldStyle} size="small" type="number" variant="filled" fullWidth
                value={assumptions.oneRoomTotalPrice}
                // onChange={(e) => {handleChange (e,[])}}
                onChange = {(e) => setAssumptions(prevState => ({...prevState,oneRoomTotalPrice:e.target.value }))}
                name="oneRoomTotalPrice"
                // disabled={editMode==="saved" || editMode==="published"}
                InputProps={{
                  inputComponent: NumberFormatPositive,
                }}
              />
            </Grid>
          </Grid>
        </TableRow>
        <TableRow>

        <Grid container>
            <Grid item xs={2}>
              <TableCell style={{paddingLeft: "5px",fontSize: 10}}>2 Dorms.</TableCell>
            </Grid>
            <Grid item xs={2} >
              <TextField label="Cantidad por Torre" className={classes.textFieldStyle} size="small" type="number" variant="filled" fullWidth
                value={assumptions.twoRoomsQty}
                // onChange={(e) => {handleChange (e,[])}}
                onChange = {(e) => setAssumptions(prevState => ({...prevState,twoRoomsQty:e.target.value }))}
                name="twoRoomsQty"
                // disabled={editMode==="saved" || editMode==="published"}
                InputProps={{
                  inputComponent: NumberFormatPositive,
                }}
              />
            </Grid>
            <Grid item xs={2} >
              <Tooltip title="Cantidad de metros cuadrados del deptartamento de 1 dormitorio">
                <TextField label="Metros Cuadrados" className={classes.textFieldStyle} size="small" type="number" variant="filled" fullWidth
                  value={assumptions.twoRoomsSize}
                  // onChange={(e) => {handleChange (e,[])}}
                  onChange = {(e) => setAssumptions(prevState => ({...prevState,twoRoomsSize:e.target.value }))}
                  name="twoRoomsSize"
                  // disabled={editMode==="saved" || editMode==="published"}
                  InputProps={{
                    inputComponent: NumberFormatPositive,
                  }}
                />
              </Tooltip>
            </Grid>
            <Grid item xs={3} >
              <TextField label="Precio Us$ por m2" className={classes.textFieldStyle} size="small" type="number" variant="filled" fullWidth
                value={assumptions.twoRoomsPricePerSqrMts}
                // onChange={(e) => {handleChange (e,[])}}
                onChange = {(e) => setAssumptions(prevState => ({...prevState,twoRoomsPricePerSqrMts:e.target.value }))}
                name="twoRoomsPricePerSqrMts"
                // disabled={editMode==="saved" || editMode==="published"}
                InputProps={{
                  inputComponent: NumberFormatPositive,
                }}
              />
            </Grid>
            <Grid item xs={3} >
              <TextField label="Precio Total en Us$" className={classes.textFieldStyle} size="small" type="number" variant="filled" fullWidth
                value={assumptions.twoRoomsTotalPrice}
                // onChange={(e) => {handleChange (e,[])}}
                onChange = {(e) => setAssumptions(prevState => ({...prevState,twoRoomsTotalPrice:e.target.value }))}
                name="twoRoomsTotalPrice"
                // disabled={editMode==="saved" || editMode==="published"}
                InputProps={{
                  inputComponent: NumberFormatPositive,
                }}
              />
            </Grid>
          </Grid>
        </TableRow>
        <Grid container>
            <Grid item xs={2}>
              <TableCell style={{paddingLeft: "5px",fontSize: 10}}>3 Dorms.</TableCell>
            </Grid>
            <Grid item xs={2} >
              <TextField label="Cantidad por Torre" className={classes.textFieldStyle} size="small" type="number" variant="filled" fullWidth
                value={assumptions.threeRoomsQty}
                // onChange={(e) => {handleChange (e,[])}}
                onChange = {(e) => setAssumptions(prevState => ({...prevState,threeRoomsQty:e.target.value }))}
                name="threeRoomsQty"
                // disabled={editMode==="saved" || editMode==="published"}
              />
            </Grid>
            <Grid item xs={2} >
              <Tooltip title="Cantidad de metros cuadrados del deptartamento de 3 dormitorio">
                <TextField label="Metros Cuadrados" className={classes.textFieldStyle} size="small" type="number" variant="filled" fullWidth
                  value={assumptions.threeRoomsSize}
                  // onChange={(e) => {handleChange (e,[])}}
                  onChange = {(e) => setAssumptions(prevState => ({...prevState,threeRoomsSize:e.target.value }))}
                  name="threeRoomsSize"
                  // disabled={editMode==="saved" || editMode==="published"}
                />
              </Tooltip>
            </Grid>
            <Grid item xs={3} >
              <TextField label="Precio Us$ por m2" className={classes.textFieldStyle} size="small" type="number" variant="filled" fullWidth
                value={assumptions.threeRoomsPricePerSqrMts}
                // onChange={(e) => {handleChange (e,[])}}
                onChange = {(e) => setAssumptions(prevState => ({...prevState,threeRoomsPricePerSqrMts:e.target.value }))}
                name="threeRoomsPricePerSqrMts"
                // disabled={editMode==="saved" || editMode==="published"}
              />
            </Grid>
            <Grid item xs={3} >
              <TextField label="Precio Total en Us$" className={classes.textFieldStyle} size="small" type="number" variant="filled" fullWidth
                value={assumptions.threeRoomsTotalPrice}
                // onChange={(e) => {handleChange (e,[])}}
                onChange = {(e) => setAssumptions(prevState => ({...prevState,threeRoomsTotalPrice:e.target.value }))}
                name="threeRoomsTotalPrice"
                // disabled={editMode==="saved" || editMode==="published"}
              />
            </Grid>
          </Grid>
        <TableRow>
        <Grid container>
            <Grid item xs={2}>
              <TableCell style={{paddingLeft: "5px",fontSize: 10}}>4 Dorms.</TableCell>
            </Grid>
            <Grid item xs={2} >
              <TextField label="Cantidad por Torre" className={classes.textFieldStyle} size="small" type="number" variant="filled" fullWidth
                value={assumptions.threeRoomsQty}
                // onChange={(e) => {handleChange (e,[])}}
                onChange = {(e) => setAssumptions(prevState => ({...prevState,threeRoomsQty:e.target.value }))}
                name="threeRoomsQty"
                // disabled={editMode==="saved" || editMode==="published"}
              />
            </Grid>
            <Grid item xs={2} >
              <Tooltip title="Cantidad de metros cuadrados del deptartamento de 3 dormitorio">
                <TextField label="Metros Cuadrados" className={classes.textFieldStyle} size="small" type="number" variant="filled" fullWidth
                  value={assumptions.threeRoomsSize}
                  // onChange={(e) => {handleChange (e,[])}}
                  onChange = {(e) => setAssumptions(prevState => ({...prevState,threeRoomsSize:e.target.value }))}
                  name="threeRoomsSize"
                  // disabled={editMode==="saved" || editMode==="published"}
                />
              </Tooltip>
            </Grid>
            <Grid item xs={3} >
              <TextField label="Precio Us$ por m2" className={classes.textFieldStyle} size="small" type="number" variant="filled" fullWidth
                value={assumptions.threeRoomsPricePerSqrMts}
                // onChange={(e) => {handleChange (e,[])}}
                onChange = {(e) => setAssumptions(prevState => ({...prevState,threeRoomsPricePerSqrMts:e.target.value }))}
                name="threeRoomsPricePerSqrMts"
                // disabled={editMode==="saved" || editMode==="published"}
              />
            </Grid>
            <Grid item xs={3} >
              <TextField label="Precio Total en Us$" className={classes.textFieldStyle} size="small" type="number" variant="filled" fullWidth
                value={assumptions.threeRoomsTotalPrice}
                // onChange={(e) => {handleChange (e,[])}}
                onChange = {(e) => setAssumptions(prevState => ({...prevState,threeRoomsTotalPrice:e.target.value }))}
                name="threeRoomsTotalPrice"
                // disabled={editMode==="saved" || editMode==="published"}
              />
            </Grid>
          </Grid>
        </TableRow>

        {/* <TableRow>
          <Grid container>
            <Grid item xs={3}>
              <TableCell style={{paddingLeft: "5px",fontSize: 10}}>Datos de Cocheras</TableCell>
            </Grid>
            <Grid item xs={3} >
              <Tooltip title="">
                <TextField label="Cocheras por Torre" size="small" type="number" variant="filled" fullWidth
                  value={assumptions.parkingQty}
                  onChange={(e) => {handleChange (e,[])}}
                  name="parkingQty"
                />
              </Tooltip>
            </Grid>
            <Grid item xs={3}>  
              <Tooltip title="">
                <TextField label="Precio Prom. Cocheras" size="small" type="number" variant="filled" fullWidth
                  value={assumptions.parkingAvgprice}
                  onChange={(e) => {handleChange (e,[])}}
                  name="parkingAvgprice"
                />
              </Tooltip>
            </Grid>
            <Grid item xs={3}>  
              <Tooltip title="">
                <TextField label="Precio Total Cocheras" size="small" type="number" variant="filled" fullWidth
                  value={assumptions.parkingTotalPrice}
                  onChange={(e) => {handleChange (e,[])}}
                  name="parkingTotalPrice"
                />
              </Tooltip>
            </Grid>
          </Grid>
        </TableRow> */}

        {/* <TableRow>
        <Grid container>
          <Grid item xs={2}>  
            <Tooltip title="">
              <TextField label="Cantidad de Torres" size="small" type="number" variant="filled" fullWidth
                value={assumptions.QtyOfBuildings}
                // onChange={(e) => {handleChange (e,[])}}
                onChange = {(e) => setAssumptions(prevState => ({...prevState,QtyOfBuildings:e.target.value }))}
                name="QtyOfBuildings"
              />
            </Tooltip>
            </Grid>
          </Grid>  
        </TableRow> */}
      </TableBody>
    </Table>
  </TableContainer>
  </>
  )
}