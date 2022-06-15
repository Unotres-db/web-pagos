import React, { useState } from 'react';

import { Grid, Box, Typography, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import SaveIcon from '@material-ui/icons/Save';
import PublishIcon from '@mui/icons-material/Publish';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import DeleteIcon from '@mui/icons-material/Delete';

import AlertDialog from '../../components/modals/AlertDialog';
import PrintValuation from './PrintValuation';
import TestPrint from './TestPrint';

const useStyles = makeStyles( (mainTheme) => ({
buttonStyle: {
  color: mainTheme.palette.primary.main,
  fontSize: "11px",
  [mainTheme.breakpoints.down('xs')]: {
    fontSize: "10px"
  },
  backgroundColor: mainTheme.palette.secondary.main,
  textTransform: "none",
  width:"80px",
  height:"30px",
  marginTop: "2px",
  marginLeft:"2px",
  "&:hover": {
    backgroundColor: "#F49506ed"
  },
},
companyNameText:{
  // paddingLeft:"42px",
  paddingLeft:"5px",
// 
  fontSize: "12px",
  [mainTheme.breakpoints.down('xs')]: {
    fontSize: "12px"
  },
},
companyMarketText:{
  fontSize: "11px",
  [mainTheme.breakpoints.down('xs')]: {
    fontSize: "9px"
  },
}
}));

export default function CompanyInfo({ companyData, historicalFinancialData, handleValuation, handlePublication, editMode, setEditMode, assumptions, calculatedCostOfCapital, valuation, setValuation, handleNewValuation }){

  const [ isAlertOpen, setIsAlertOpen ] = useState(false);
  const [ alertMessage, setAlertMessage ] = useState({severity:"",title:"",message:"",buttons:{}});
  const [ isDialogPdfOpen, setIsDialogPdfOpen] = useState(false);

  function handleAlertClose () {
    setIsAlertOpen(false);
    setAlertMessage( {title: "", message:""});
  }

  function handleDialogPdfClose(){
    setIsDialogPdfOpen(false);
  }
  function handlePrintValuation (){
    console.log("entrou em Printvaluation");
    setIsDialogPdfOpen(true)
    // <PrintValuation />
  }

  function handlingValuation () {
    if (handleValuation()){
      setEditMode("saved");
      setAlertMessage( {severity:"success", title: "Congratulations", message:"Your valuation was saved with success"});
      setIsAlertOpen(true);  
    }
    else {
      console.log("no grabo valuation o problemas en la promise")
    }
  }

  function handlingPublication () {
    if (handlePublication()){
      setValuation(prevState => ({...prevState, published:"all", publishedDate:""}))
      setEditMode("published");
      setAlertMessage( {severity:"success", title: "Congratulations", message:"Your valuation was published with success"});
      setIsAlertOpen(true);  
    }
    else {
      console.log("no grabo valuation o problemas en la promise")
    }
  }
  // function handlePublication () {
  //   if (handlePublication()) {
  //     setAlertMessage( {severity:"success", title: "Congratulations", message:"Your valuation was published with success"});
  //     setIsAlertOpen(true);  
  //   }
  // }

  const classes = useStyles()

  return (
    <>
    <Grid container direction = "row" spacing = {1}  >
      <Grid item xs = {12} sm={5}>
        <Box style = {{height: "10px"}}/>  
        { companyData.symbol ? <>
          <Typography align="left" className={classes.companyNameText}>{`${companyData.symbol} - ${companyData.shortName} `}</Typography>
          {/* <Typography align="left" className={classes.companyNameText}>{`${companyData.shortName}`}</Typography> */}


          {/* <Typography style={{fontSize:9}}>{valuationIdText}</Typography> */}
          {/* { valuation.valuationId !=="none" && valuation.valuationId !== undefined ? 
            <>
              <Typography style={{fontSize:9}}>{`${companyData.symbol}-${companyData.shortName}-Jun,03, 2022-${valuation.valuationId} `}</Typography>
            </>: null } */}

          </>
        : null }
        
      </Grid> 
      <Grid item xs={12} sm = {7} >
        <Box style = {{height: "5px"}}/>  
        <Box display ="flex" justifyContent="flex-end">
          <Button 
            variant = "contained" 
            size = "small" 
            className = {classes.buttonStyle} 
            startIcon={<AddCircleIcon />} 
            disableRipple
            onClick = {handleNewValuation} 
            >New 
          </Button>

          <Button 
            variant = "contained" 
            size = "small" 
            className = {classes.buttonStyle} 
            startIcon={<SaveIcon />} 
            disabled={editMode!=="completed"}
            disableRipple
            onClick = {handlingValuation} 
            >Save 
          </Button>
          <Button 
            variant = "contained" 
            size = "small" 
            className = {classes.buttonStyle} 
            startIcon={<PublishIcon />} 
            // disabled={editMode!=="saved"}
            disabled = {editMode!=="saved"}
            disableRipple
            onClick = {handlingPublication} 
            >Publish 
          </Button>
          <Button 
            variant = "contained" 
            size = "small" 
            className = {classes.buttonStyle} 
            startIcon={<PictureAsPdfIcon />} 
            // disabled={editMode!=="saved"}
            disabled = {editMode=="blank" || editMode=="completed"}
            disableRipple
            onClick = {handlePrintValuation} 
            >Print
          </Button>
          <Button 
            variant = "contained" 
            size = "small" 
            className = {classes.buttonStyle} 
            startIcon={<DeleteIcon />} 
            // disabled={editMode!=="saved"}
            disabled = {editMode=="blank" || editMode=="completed"}
            disableRipple
            // onClick = {handleValuation} 
            >Delete
          </Button>
        </Box>  
      </Grid>
    </Grid>
    <AlertDialog open={isAlertOpen} onClose={handleAlertClose} severity={alertMessage.severity} title={alertMessage.title}>
      {alertMessage.message}
    </AlertDialog>
    <TestPrint 
      open={isDialogPdfOpen} 
      onClose={handleDialogPdfClose} 
      companyData={companyData}
      historicalFinancialData={historicalFinancialData} 
      assumptions={assumptions} 
      calculatedCostOfCapital={calculatedCostOfCapital} 
      valuation={valuation}
    />
    </>
  )
}