import React from 'react';

import Pdf from "react-to-pdf";
import { Grid, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Box, Button, Typography, Paper } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';

import TableHistoricalData from './TableHistoricalData';
import TableValuation from './TableValuation';

const useStyles = makeStyles((mainTheme) => ({
  iconBox:{
    width:'100%',
    textAlign: 'center',
    AlignItems: 'center',
  },
  buttonStyle:{
    color:"white",
    backgroundColor:mainTheme.palette.primary.main,
    textTransform:"none",
    fontSize: 12,
    margin: "10px",
    minWidth:"140px",
    "&:hover": {
      color:"orangered",
      backgroundColor:mainTheme.palette.primary.main,
    },
  }, 
  paperStyle: {
    width: 650,   
    height:"100%",
    marginLeft:"50px",
    marginRight:"50px",
    padding: "10px",
    backgroundColor:"white",
  },   
}))

const ref = React.createRef();

const TestPrint = ({ open, onClose, companyData, historicalFinancialData, assumptions, calculatedCostOfCapital, valuation }) => {

  // console.log("entou em Test Print");
  const classes = useStyles();  

  return (
    <>
    {/* { console.log("companyData: " + companyData)}
    { console.log("historicalFinancialData " + historicalFinancialData)}
    { console.log("assumptions: " + assumptions)}
    { console.log("calculatedCostOfCapital: " + calculatedCostOfCapital)}
    { console.log(valuation)} */}


    { companyData ? <>
      <Box style={{width: 900}}> 
      <Dialog 
        open={open}
        onClose={onClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        maxWidth="xl"
      >
        <DialogTitle id="alert-dialog-title" ><Typography align="center" variant="h6" style={{color:'white'}}>Generate Pdf</Typography></DialogTitle>
        <DialogContent style={{color:'white'}}>
          <DialogContentText id="alert-dialog-description">
            <div className="Post" ref={ref}>
              <Grid container>
                <Grid item xs={3}></Grid>
                  <TableHistoricalData historicalFinancialData = {historicalFinancialData} />
                <Grid item xs={6}></Grid>
                <TableValuation 
                  valuation = {valuation} 
                  historicalFinancialData = {historicalFinancialData} 
                  calculatedCostOfCapital = {calculatedCostOfCapital}
                  assumptions = {assumptions}
                  companyData = {companyData}
                />
                <Grid item xs={3}></Grid>
              </Grid>
              {/* <Typography>Generate Pdf</Typography> */}
            </div>
            <Box style={{height: 0}}/>
          </DialogContentText>
        </DialogContent>
        <DialogActions >
          <Grid container direction="row" xs={6} style={{textAlign:'center'}}>
            <Button disableRipple className={classes.buttonStyle} onClick={onClose}>Volver</Button>
            <Pdf targetRef={ref} filename="post.pdf">
              {({ toPdf }) => <Button disableRipple className={classes.buttonStyle} onClick={toPdf}>Generar Archivo Pdf</Button>}
            </Pdf>
            <Box style={{height: 20}}/>
          </Grid> 
        </DialogActions>
      </Dialog>
    </Box>
    </>: console.log("! companyData")}

    </>
  )
}
export default TestPrint