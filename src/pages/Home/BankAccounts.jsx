import React from 'react';

import { Paper, Grid, TableContainer, Table, TableHead, TableBody, TableRow, TableCell, Box, Typography, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import logoItau from '../../assets/logo-itau.png';
import logoContinental from '../../assets/logo-continental.png';
import logoInterfisa from '../../assets/logo-interfisa.png';

const useStyles = makeStyles( () => ({
  tableStyle:{
    // minWidth: 300,
    // maxHeight: 900
  },
  tableHeaderStyle:{
    color: "white",
    backgroundColor: '#344955',
  },
  tableTitleStyle:{
    color: "white",
    fontSize: 11,
  },
  tableRowsStyle:{
    fontSize: 11,
    margin:"0px",
    padding:"0px"
  }
}));

const bankAccounts = [
  {id: 0,bank:"Continental", exchange:"USD", debit:100000, credit :120000},
  {id: 1,bank:"Itau", exchange:"USD", debit:100000, credit :80000},
  {id: 2,bank:"Interfisa", exchange:"USD", debit:100000, credit :200000},
  {id: 3,bank:"Continental", exchange:"Gs.", debit:0, credit :1000000000},
  {id: 4,bank:"Itau", exchange:"Gs.", debit:0, credit :300000000 },
  {id: 5,bank:"Interfisa", exchange:"Gs.", debit:0, credit :200000000},
]

export default function BankAccounts (){
  const classes = useStyles();

  function getBankLogo(bank){
    if (bank==="Continental"){
      return logoContinental
    }
    if (bank==="Itau"){
      return logoItau
    }
    if (bank==="Interfisa"){
      return logoInterfisa
    }

  }

  return (
    <>
    <Paper elevation={4}>
      <TableContainer component={Paper} >
        <Table className = {classes.tableStyle} size="small" aria-label="stycky header">
          <TableHead className = {classes.tableHeaderStyle}>
            <TableRow>
            {/* style={{fontSize:"11px",width: "34%", padding:"2px", marginLeft:"5px", color:"whitesmoke" }} */}
              <TableCell className = {classes.tableTitleStyle} align="left">Banco</TableCell>
              <TableCell className = {classes.tableTitleStyle} style={{fontSize:"11px",padding:"2px",color:"whitesmoke" }} align="center">Moneda</TableCell>
              {/* <TableCell className = {classes.tableTitleStyle} style={{fontSize:"11px",padding:"2px",color:"whitesmoke" }} align="right">Debito</TableCell>
              <TableCell className = {classes.tableTitleStyle} style={{fontSize:"11px",padding:"2px",color:"whitesmoke"}} align="right">Credito</TableCell> */}
              <TableCell className = {classes.tableTitleStyle} align="right">Saldo</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            { bankAccounts ? bankAccounts.map((account) => (<>
            
            <TableRow key={bankAccounts.id}>
              <TableCell align="left"   >
                <Grid container>
                  <Grid item xs={6}>
                    <Box className={classes.innerBoxStyle}>   
                     <img src = {getBankLogo(account.bank)} alt="Logo banco" style={{height:'30px'}}/> 
                    </Box>

                  </Grid>
                  <Grid item xs={6}>
                    <Box style={{height:"8px"}}/>
                    <Typography className={classes.tableRowsStyle} >{account.bank}</Typography> 
                  </Grid>
                </Grid>

               
              </TableCell>
              <TableCell align="center" className={classes.tableRowsStyle} >
                <Typography className={classes.tableRowsStyle}>{account.exchange}</Typography>
              </TableCell>

              {/* <TableCell align="left" className={classes.tableRowsStyle} style={{width:"16%", paddingLeft:"5px", paddingRight:"5px"}}>
                <Typography align='right' className={classes.tableRowsStyle} >{Intl.NumberFormat("de-DE",{style:'decimal', minimumFractionDigits:0,maximumFractionDigits:0}).format(account.debit)}</Typography>
              </TableCell>   */}

              {/* <TableCell align="left" className={classes.tableRowsStyle} style={{width:"9%", paddingLeft:"5px", paddingRight:"5px"}}>
                <Typography align='right' className={classes.tableRowsStyle} >{Intl.NumberFormat("de-DE",{style:'decimal', minimumFractionDigits:0,maximumFractionDigits:0}).format(account.credit)}</Typography>
              </TableCell> */}
              <TableCell align="left" className={classes.tableRowsStyle} style={{width:"10%", paddingLeft:"5px", paddingRight:"5px"}} >
                <Typography align='right' className={classes.tableRowsStyle} >{Intl.NumberFormat("de-DE",{style:'decimal', minimumFractionDigits:0,maximumFractionDigits:0}).format(account.credit-account.debit)}</Typography>
              </TableCell>
            </TableRow>
            </>
        )): null}
          </TableBody>
        </Table>
      </TableContainer>

      {/* <TableContainer component={Paper} >
        <Table className = {classes.tableStyle} size="small" aria-label="stycky header">
          <TableHead className = {classes.tableHeaderStyle}>
            <TableRow>
              <TableCell className = {classes.tableTitleStyle} align="left"></TableCell>
              <TableCell className = {classes.tableTitleStyle} style={{fontSize:"11px",padding:"2px",color:"whitesmoke" }} align="center">Moneda</TableCell>
              <TableCell className = {classes.tableTitleStyle} align="right">Saldo</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>

            
            <TableRow >
              <TableCell style={{width:"60%"}}></TableCell>
              <TableCell align="left"   >USD</TableCell>
              <Typography align='right' className={classes.tableRowsStyle} >{Intl.NumberFormat("de-DE",{style:'decimal', minimumFractionDigits:0,maximumFractionDigits:0}).format(400000)}</Typography>
            </TableRow>
            <TableRow >
              <TableCell></TableCell>
              <TableCell align="left"  >Gs.</TableCell>
              <Typography align='right' className={classes.tableRowsStyle} >{Intl.NumberFormat("de-DE",{style:'decimal', minimumFractionDigits:0,maximumFractionDigits:0}).format(300000000)}</Typography>
            </TableRow>
        
   
          </TableBody>
        </Table>
      </TableContainer> */}
    </Paper>
    </>
  )
}


{/* <TableRow>
<TableCell className = {classes.tableRowsStyle} style={{fontSize:"11px", width: "34%", padding:"4px" }} align="right" >Itau</TableCell>
<TableCell className = {classes.tableRowsStyle} style={{fontSize:"11px", width: "34%", padding:"4px" }} align="right" >Dolares</TableCell>
<TableCell className = {classes.tableRowsStyle} style={{fontSize:"11px", width: "34%", padding:"4px" }} align="right" >{Intl.NumberFormat("de-DE",{style:'decimal', minimumFractionDigits:0,maximumFractionDigits:0}).format(ingresos)}</TableCell>
<TableCell className = {classes.tableRowsStyle} style={{ fontSize:"11px",width: "33%", paddingRight:"5px", padding:"2px" }}  align="right" >{Intl.NumberFormat("de-DE",{style:'decimal', minimumFractionDigits:0,maximumFractionDigits:0}).format(egresos)}</TableCell>
<TableCell className = {classes.tableRowsStyle} style={{ fontSize:"11px",width: "33%", paddingRight:"5px", padding:"2px" }}  align="right" >{Intl.NumberFormat("de-DE",{style:'decimal', minimumFractionDigits:0,maximumFractionDigits:0}).format(saldo)}</TableCell>
</TableRow>  
<TableRow>
<TableCell className = {classes.tableRowsStyle} style={{fontSize:"11px", width: "34%", padding:"4px" }} align="right" >Continental</TableCell>
<TableCell className = {classes.tableRowsStyle} style={{fontSize:"11px", width: "34%", padding:"4px" }} align="right" >Dolares</TableCell>
<TableCell className = {classes.tableRowsStyle} style={{fontSize:"11px", width: "34%", padding:"4px" }} align="right" >{Intl.NumberFormat("de-DE",{style:'decimal', minimumFractionDigits:0,maximumFractionDigits:0}).format(ingresos)}</TableCell>
<TableCell className = {classes.tableRowsStyle} style={{ fontSize:"11px",width: "33%", paddingRight:"5px", padding:"2px" }}  align="right" >{Intl.NumberFormat("de-DE",{style:'decimal', minimumFractionDigits:0,maximumFractionDigits:0}).format(egresos)}</TableCell>
<TableCell className = {classes.tableRowsStyle} style={{ fontSize:"11px",width: "33%", paddingRight:"5px", padding:"2px" }}  align="right" >{Intl.NumberFormat("de-DE",{style:'decimal', minimumFractionDigits:0,maximumFractionDigits:0}).format(saldo)}</TableCell>
</TableRow> 
<TableRow>
<TableCell className = {classes.tableRowsStyle} style={{fontSize:"11px", width: "34%", padding:"4px" }} align="right" >Interfisa</TableCell>
<TableCell className = {classes.tableRowsStyle} style={{fontSize:"11px", width: "34%", padding:"4px" }} align="right" >Dolares</TableCell>
<TableCell className = {classes.tableRowsStyle} style={{fontSize:"11px", width: "34%", padding:"4px" }} align="right" >{Intl.NumberFormat("de-DE",{style:'decimal', minimumFractionDigits:0,maximumFractionDigits:0}).format(ingresos)}</TableCell>
<TableCell className = {classes.tableRowsStyle} style={{ fontSize:"11px",width: "33%", paddingRight:"5px", padding:"2px" }}  align="right" >{Intl.NumberFormat("de-DE",{style:'decimal', minimumFractionDigits:0,maximumFractionDigits:0}).format(egresos)}</TableCell>
<TableCell className = {classes.tableRowsStyle} style={{ fontSize:"11px",width: "33%", paddingRight:"5px", padding:"2px" }}  align="right" >{Intl.NumberFormat("de-DE",{style:'decimal', minimumFractionDigits:0,maximumFractionDigits:0}).format(saldo)}</TableCell>
</TableRow>    */}