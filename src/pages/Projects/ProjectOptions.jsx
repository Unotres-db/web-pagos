import React from 'react';

import { Grid, Box, Typography, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import SaveIcon from '@material-ui/icons/Save';
import PublishIcon from '@mui/icons-material/Publish';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import DeleteIcon from '@mui/icons-material/Delete';
// import ExcelIcon from '../../assets/icon-excel.png'

const useStyles = makeStyles( (mainTheme) => ({
    buttonStyle: {
      width:"120px",
      backgroundColor:"#7b7d7b",
      [mainTheme.breakpoints.down('xs')]: {
        fontSize: "10px"
      },
    },
    companyNameText:{
      paddingLeft:"5px",
      fontSize: "12px",
      [mainTheme.breakpoints.down('xs')]: {
        fontSize: "12px"
      },
    }
    }));
    

export default function ProjectOptions({editMode}){
    const classes = useStyles()
return (
    <>
   <Grid container direction = "row" spacing = {1}  >
      <Grid item xs = {12} sm={3}>
        <Box style = {{height: "10px"}}/>  
        {/* <Typography align="left" className={classes.companyNameText}>Proyecto Loma Pyta - 2 Torres</Typography> */}
      </Grid> 
      <Grid item xs={12} sm = {9} >
        <Box style = {{height: "5px"}}/>  
        <Box display ="flex" justifyContent="flex-end">
          <Button variant = "contained" disableRipple className = {classes.buttonStyle} 
            startIcon={<AddCircleIcon />} 
            // disabled={editMode==="blank"}
            // onClick = {handleNewValuation} 
            >Nuevo 
          </Button>
          <Button variant = "contained" disableRipple className = {classes.buttonStyle} 
            startIcon={<SaveIcon />} 
            // disabled={editMode!=="completed"}
            // onClick ={handleSave}
            >Grabar 
          </Button>
          <Button variant = "contained" disableRipple className = {classes.buttonStyle} 
            startIcon={<PublishIcon />} 
            // disabled = {editMode!=="saved"}
            // onClick={() => (handlePublish (savedValuationData.id))} 
            >Exportar 
          </Button>
          <Button variant = "contained" disableRipple className = {classes.buttonStyle} 
            startIcon={<PictureAsPdfIcon />} 
            // disabled = {editMode!=="saved" && editMode!=="published"}
            // onClick = {handlePrintValuation} 
            >Imprimir
          </Button>

          <Button variant = "contained" disableRipple className = {classes.buttonStyle} 
            startIcon={<DeleteIcon />} 
            // disabled = {editMode!=="saved" && editMode!=="published"}
            // onClick={(e) => (handleDelete (savedValuationData.id))} 
            >Borrar
          </Button>
        </Box>  
      </Grid>
    </Grid>
    </>
)
}