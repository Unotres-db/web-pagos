import React from 'react';
import Pdf from "react-to-pdf";

import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Box, Button, Typography, Grid, Paper } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';

import TableHistoricalData from './TableHistoricalData';
import FormBusinessData from './FormBusinessData';
import FormCostOfcapitalData from './FormCostOfCapitalData';

export default function PrintValuation({isOpen, onClose}) {
  console.log("entrou em Print");
  // ver passagem de parametros desde companyInfo
  const ref = React.createRef();
  return (
    <>
    <Dialog 
      open={isOpen}
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      maxWidth="xl"
    >
      <DialogTitle id="alert-dialog-title" ><Typography align="center" variant="h6" style={{color:'white'}}>Generar Pagare</Typography></DialogTitle>
        <DialogContent style={{color:'white'}}>
          <DialogContentText id="alert-dialog-description">
            <div className="Post" ref={ref}>
              <Typography>Testeando Print</Typography>
              {/* <TableHistoricalData />
              <FormBusinessData />
              <FormCostOfcapitalData /> */}
            </div>
          </DialogContentText>
        </DialogContent>
      <DialogActions >
        <Pdf targetRef={ref} filename="valuation.pdf">
          {({ toPdf }) => <Button disableRipple onClick={toPdf}>Create Pdf File</Button>}
        </Pdf>
      </DialogActions>
    </Dialog>  
    </>
  )
}