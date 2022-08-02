import React, { useState } from 'react';

import { Grid, Box, Typography, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import SaveIcon from '@material-ui/icons/Save';
import PublishIcon from '@mui/icons-material/Publish';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import DeleteIcon from '@mui/icons-material/Delete';

import { format } from 'date-fns';

import useTest from '../../hooks/useTest';
import valuationsWebApi from '../../services/valuationsWebApi';
import useAxios from '../../hooks/useAxios';

import DialogModal from '../../components/modals/DialogModal';
import PrintValuation from './PrintValuation';
import TestPrint from './TestPrint';

const useStyles = makeStyles( (mainTheme) => ({
buttonStyle: {
  width:"80px",
  [mainTheme.breakpoints.down('xs')]: {
    fontSize: "10px"
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
}
}));

export default function CompanyInfo({ companyData, historicalFinancialData, forecastedFinancialData, handleValuation, handlePublication, editMode, setEditMode, assumptions, setAssumptions, calculatedCostOfCapital, valuation, setValuation, handleNewValuation }){

  const [ dialogOptions, setDialogOptions] = useState({severity:"",title:"",message:"",buttons:{}, action:""});
  const [ isDialogOpen, setIsDialogOpen] = useState(false);
  const [ isDialogPdfOpen, setIsDialogPdfOpen] = useState(false);
  const [ deleteValuationId, setDeleteValuationId] = useState("");
  const { saveValuation }  = useTest ();
  const { axiosFetch: putValuation} = useAxios();
  const { axiosFetch: delValuation} = useAxios();

  function handleSave (){
    saveValuation(companyData, assumptions, calculatedCostOfCapital, valuation, setValuation, forecastedFinancialData, saveSuccessCallback, errorCallback)
  }

  function handlePublish (){  // receber valuationId como parametro x usar o state
    const { valuationId } = valuation;
    const published = "all";
    putValuation({ axiosInstance: valuationsWebApi, method: 'PUT', url: '/publication', 
      requestConfig: { 
        valuationId: valuationId,
        published: published
      }
    },publishSuccessCallback, errorCallback);
  }

  function handleDelete (valuationId){
    setDeleteValuationId(valuationId);
    setDialogOptions({severity:"warning", title:"Alert", message:"Are you sure you want to delete this valuation ?",buttons:{button1:"Cancel",button2:"Confirm"},action:"delete"})
    setIsDialogOpen (true);
  }

  function deleteValuation (valuationId){  
    const userId = "martincsl"  // atualizar para state global com Context
    delValuation({ axiosInstance: valuationsWebApi, method: 'DELETE', url: '/valuations', 
      requestConfig: { 
        data : {valuationId: valuationId }, //testar com params e nao body
        headers: {'Authorization': userId,},
      }
    },deleteSuccessCallback, errorCallback);
  }

  function saveSuccessCallback(apiData){
    setEditMode("saved");
    setDialogOptions({severity:"success", title:"Thank You", message:"Your Valuation was sucessfully saved",buttons:{button1:"Ok"},action:"save"})
    setIsDialogOpen (true);
  }

  function publishSuccessCallback(){
    const publishedDate = format(new Date(),'yyyy-MM-dd HH:mm:ss') //only to update the state in the frontend
    setValuation(prevState => ({...prevState, published:"all", publishedDate:publishedDate}))
    setEditMode("published");
    setDialogOptions({severity:"success", title:"Thank You", message:"Your Valuation was sucessfully published",buttons:{button1:"Ok"},action:"publish"})
    setIsDialogOpen (true);
  }

  function deleteSuccessCallback(apiData){
    setEditMode("blank");
    handleNewValuation();
    setDialogOptions({severity:"success", title:"Thank You", message:"Your Valuation was sucessfully deleted",buttons:{button1:"Ok"},action:"delete"})
    setIsDialogOpen (true);
  }

  function errorCallback(errorMessage){
    setDialogOptions({severity:"error", title:"Oops", message:errorMessage,buttons:{button1:"Ok"}})
    setIsDialogOpen (true);
  }

  function handleDialogClose (value, action) { 
    setIsDialogOpen (false);
    setDialogOptions({severity:"",title:"",message:"",buttons:{},action:""});
    if (value === "Confirm" && action ==="delete"){  
      deleteValuation(deleteValuationId,deleteSuccessCallback, errorCallback);
    } 
  }

  function handleDialogPdfClose(){
    setIsDialogPdfOpen(false);
  }

  function handlePrintValuation (){
    console.log("entrou em Printvaluation");
    setIsDialogPdfOpen(true)
    // <PrintValuation />
  }

  const classes = useStyles()
  return (
    <>
    <Grid container direction = "row" spacing = {1}  >
      <Grid item xs = {12} sm={5}>
        <Box style = {{height: "10px"}}/>  
        {/* <Typography>{editMode}</Typography> */}
        { companyData.symbol ? 
          <>
          
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
            className = {classes.buttonStyle} 
            startIcon={<AddCircleIcon />} 
            disableRipple
            disabled={editMode==="blank"}
            onClick = {handleNewValuation} 
            >New 
          </Button>
          <Button 
            variant = "contained" 
            className = {classes.buttonStyle} 
            startIcon={<SaveIcon />} 
            disabled={editMode!=="completed"}
            disableRipple
            onClick ={handleSave}
            >Save 
          </Button>
          <Button 
            variant = "contained" 
            className = {classes.buttonStyle} 
            startIcon={<PublishIcon />} 
            disabled = {editMode!=="saved"}
            disableRipple
            onClick={handlePublish} 
            >Publish 
          </Button>
          <Button 
            variant = "contained" 
            className = {classes.buttonStyle} 
            startIcon={<PictureAsPdfIcon />} 
            // disabled = {editMode=="blank" || editMode=="completed"}
            disabled = {editMode!=="saved" && editMode!=="published"}
            disableRipple
            onClick = {handlePrintValuation} 
            >Print
          </Button>
          <Button 
            variant = "contained" 
            className = {classes.buttonStyle} 
            startIcon={<DeleteIcon />} 
            // disabled = {editMode=="blank" || editMode=="completed"}
            disabled = {editMode!=="saved" && editMode!=="published"}
            disableRipple
            onClick={(e) => (handleDelete (valuation.valuationId))} 
            >Delete
          </Button>
        </Box>  
      </Grid>
    </Grid>
    <DialogModal open={isDialogOpen} onClose={handleDialogClose} severity={dialogOptions.severity} title={dialogOptions.title} buttons={dialogOptions.buttons} action={dialogOptions.action}>
      {dialogOptions.message}
    </DialogModal> 
    <TestPrint 
      open={isDialogPdfOpen} 
      onClose={handleDialogPdfClose} 
      companyData={companyData}
      historicalFinancialData={historicalFinancialData} 
      assumptions={assumptions} 
      setAssumptions={setAssumptions}
      calculatedCostOfCapital={calculatedCostOfCapital} 
      valuation={valuation}
    />
    </>
  )
}