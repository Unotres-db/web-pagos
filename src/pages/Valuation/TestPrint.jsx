import React from 'react';

import Pdf from "react-to-pdf";
import { Grid, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Box, Button, Typography, Paper } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import CancelIcon from '@mui/icons-material/Cancel';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';

import mainLogo from '../../assets/Group 292.svg';

import TableHistoricalData from './TableHistoricalData';
import FormBusinessData from './FormBusinessData';
import FormCostOfCapitalData from './FormCostOfCapitalData';
import TableValuation from './TableValuation';

const useStyles = makeStyles((mainTheme) => ({
  buttonStyle:{
    minWidth:"130px",
  }, 
  logoStyle: {
    position: "relative",
    height: "45px",
    // padding: "24px",
    top:"0px"
  }
}))

const ref = React.createRef();

const TestPrint = ({ open, onClose, companyData, historicalFinancialData, assumptions, setAssumptions, calculatedCostOfCapital, valuation }) => {

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
            <img src = {mainLogo} alt="Logo" className={classes.logoStyle} />
              <Grid container direction="row" spacing={2}>
                <Grid item xs={6}>
                  <TableHistoricalData historicalFinancialData = {historicalFinancialData} />
                  <FormBusinessData assumptions = {assumptions} setAssumptions = {setAssumptions} />
                  <FormCostOfCapitalData 
                      assumptions = {assumptions} 
                      setAssumptions = {setAssumptions}
                      calculatedCostOfCapital = {calculatedCostOfCapital}
                    />
                  </Grid>  
                <Grid item xs={6}>
                  <TableValuation 
                    valuation = {valuation} 
                    historicalFinancialData = {historicalFinancialData} 
                    calculatedCostOfCapital = {calculatedCostOfCapital}
                    assumptions = {assumptions}
                    companyData = {companyData}
                  />
                  </Grid>
                
              </Grid>
              {/* <Typography>Generate Pdf</Typography> */}
            </div>
            <Box style={{height: 0}}/>
          </DialogContentText>
        </DialogContent>
        <DialogActions >
          <Grid container direction="row" xs={6} style={{textAlign:'center'}}>
            <Button disableRipple className={classes.buttonStyle} onClick={onClose} startIcon={<CancelIcon />}>Cancel</Button>
            <Pdf targetRef={ref} filename="valuation.pdf">
              {({ toPdf }) => <Button disableRipple className={classes.buttonStyle} onClick={toPdf} startIcon={<PictureAsPdfIcon />}>Generate Pdf File</Button>}
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