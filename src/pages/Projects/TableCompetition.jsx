import React, { memo } from 'react';

import { Paper, TableContainer, Table, TableBody, TableCell, TableHead, TableRow, Box, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles( (mainTheme) => ({
table: {
  //   minWidth: 300,
  // maxHeight: 900,
  // "& .MuiTableCell-root": {
  //   borderLeft: "1px solid rgba(224, 224, 224, 1)",
  // }
},
TableHeader:{
  color: "white",
  backgroundColor:mainTheme.palette.primary.main
},
TableTitle:{
  color: "white",
  fontSize: 12
},
TableRows : {
  fontSize: 9
  }
}));

function TableCompetition (){
  
  const classes = useStyles();

  return (
    <>
    <TableContainer component={Paper}>
      <Table className = {classes.table} size="small" aria-label="stycky header">

      <TableHead className = {classes.TableHeader}>
        <TableRow>
          <TableCell colSpan={6} className = {classes.TableTitle} align="left">{`Datos de la Competencia - Edificios de la Zona`}</TableCell>
        </TableRow>
      </TableHead>

    
        <TableBody>
          <TableRow>
          <TableCell align="right" className = {classes.TableRows} style={{ width: "20%", marginLeft:"5px", marginRight:"5px", padding:"4px" }} >Dormitorios</TableCell> 

            <TableCell align="right" className = {classes.TableRows} style={{ width: "20%", marginLeft:"5px", marginRight:"5px", padding:"4px" }} >Cantidad Promedio</TableCell> 
            <TableCell align="right" className = {classes.TableRows} style={{ width: "20%", marginLeft:"5px", marginRight:"5px", padding:"4px" }} >Superficie m2</TableCell> 
            <TableCell align="right" className = {classes.TableRows} style={{ width: "20%", marginLeft:"5px", marginRight:"5px", padding:"4px" }} >Precio Us$ x m2</TableCell>
            <TableCell align="right" className = {classes.TableRows} style={{ width: "20%", marginLeft:"5px", marginRight:"5px", padding:"4px" }} >Precio Total Us$</TableCell>
          </TableRow>
          <TableRow>
            <TableCell align="right" className = {classes.TableRows} style={{ width: "20%", paddingRight:"5px", padding:"2px" }}>{Intl.NumberFormat('en-US',{style:'decimal', minimumFractionDigits:0}).format(1)}</TableCell>
            <TableCell align="right" className = {classes.TableRows} style={{ width: "20%", paddingRight:"5px", padding:"2px" }}>{Intl.NumberFormat('en-US',{style:'percent', minimumFractionDigits:1}).format(0.3265)}</TableCell>
            <TableCell align="right" className = {classes.TableRows} style={{ width: "20%", paddingRight:"5px", padding:"2px" }}>{Intl.NumberFormat('en-US',{style:'decimal', minimumFractionDigits:1}).format(45.2)}</TableCell>
            <TableCell align="right" className = {classes.TableRows} style={{ width: "20%", paddingRight:"5px", padding:"2px" }}>{Intl.NumberFormat('en-US',{style:'decimal', minimumFractionDigits:0}).format(1000)}</TableCell>
            <TableCell align="right" className = {classes.TableRows} style={{ width: "20%", paddingRight:"7px", padding:"4px" }}>{Intl.NumberFormat('en-US',{style:'decimal', minimumFractionDigits:0}).format(45200)}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell align="right" className = {classes.TableRows} style={{ width: "20%", paddingRight:"5px", padding:"2px" }}>{Intl.NumberFormat('en-US',{style:'decimal', minimumFractionDigits:0}).format(2)}</TableCell>
            <TableCell align="right" className = {classes.TableRows} style={{ width: "20%", paddingRight:"5px", padding:"2px" }}>{Intl.NumberFormat('en-US',{style:'percent', minimumFractionDigits:1}).format(0.4567)}</TableCell>
            <TableCell align="right" className = {classes.TableRows} style={{ width: "20%", paddingRight:"5px", padding:"2px" }}>{Intl.NumberFormat('en-US',{style:'decimal', minimumFractionDigits:1}).format(64.2)}</TableCell>
            <TableCell align="right" className = {classes.TableRows} style={{ width: "20%", paddingRight:"5px", padding:"2px" }}>{Intl.NumberFormat('en-US',{style:'decimal', minimumFractionDigits:0}).format(1000)}</TableCell>
            <TableCell align="right" className = {classes.TableRows} style={{ width: "20%", paddingRight:"7px", padding:"4px" }}>{Intl.NumberFormat('en-US',{style:'decimal', minimumFractionDigits:0}).format(64200)}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell align="right" className = {classes.TableRows} style={{ width: "20%", paddingRight:"5px", padding:"2px" }}>{Intl.NumberFormat('en-US',{style:'decimal', minimumFractionDigits:0}).format(3)}</TableCell>
            <TableCell align="right" className = {classes.TableRows} style={{ width: "20%", paddingRight:"5px", padding:"2px" }}>{Intl.NumberFormat('en-US',{style:'percent', minimumFractionDigits:1}).format(0.216)}</TableCell>
            <TableCell align="right" className = {classes.TableRows} style={{ width: "20%", paddingRight:"5px", padding:"2px" }}>{Intl.NumberFormat('en-US',{style:'decimal', minimumFractionDigits:1}).format(89,6)}</TableCell>
            <TableCell align="right" className = {classes.TableRows} style={{ width: "20%", paddingRight:"5px", padding:"2px" }}>{Intl.NumberFormat('en-US',{style:'decimal', minimumFractionDigits:0}).format(1000)}</TableCell>
            <TableCell align="right" className = {classes.TableRows} style={{ width: "20%", paddingRight:"7px", padding:"4px" }}>{Intl.NumberFormat('en-US',{style:'decimal', minimumFractionDigits:0}).format(89600)}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
    <Box style={{height:"5px"}}/>
    <Typography style={{color:"black", fontSize:"9px"}}>Obs.: Tamaño de la Amuestra: 9 departamentos Loma Pyta</Typography>
    </>
  )
}
export default memo (TableCompetition)