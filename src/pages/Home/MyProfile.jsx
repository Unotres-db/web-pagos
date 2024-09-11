import React, { useState } from 'react';

import { Grid, Paper, Box, Button, Tooltip, Typography, Avatar} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import picUser from '../../assets/leticia.jpg';

const useStyles = makeStyles((mainTheme) => ({
buttonStyle: {
  textTransform:"none",
  fontSize:"12px",
  backgroundColor: "#E1C16E", 
  color: '#344955', 
  '&:hover': {
    backgroundColor: '#bda25c', 
    color: '#34495', 
  },
  '&:disabled': {
    backgroundColor: "gray", //"#F49506ed",
    color: '#344955', 
  },
},
userPhotoStyle:{
  height: "72px",
  width: "72px",
  alignItems: "center",
  marginTop: "5px",
  marginBottom:"5px",
  marginLeft:"5px",
  marginRigth:"5px",
  display: "block",
  textAlign: "center",
  justifyContent: "center",
},
})); 

export default function MyProfile ({isEditProfile, setIsEditProfile}){
  // const [ isModalOpen, setIsModalOpen] = useState(false);

  function handleEditProfile(){
    // setIsModalOpen(true);
    setIsEditProfile(true);
  }

  function handleModalClose(){
    // setIsModalOpen(false)
    setIsEditProfile(false);
  }

  const classes = useStyles();
  return (
    <>
    {/* maxWidth:"300px" */}
    <Paper elevation={6} style={{margin:"0px", padding:"5px",width:"100%" , margin:"auto"}}>
      {/* <Typography className={classes.sectionTitleStyle} >My Profile</Typography> */}

      <Grid container style={{marginTop:"5px"}}  >
        <Grid container justify="center" >  
          {/* <Box style={{height:"5px"}}/> */}
            <Avatar src={picUser} alt="Foto del Usuario" className={classes.userPhotoStyle} />
        </Grid>
        {/* <Grid item container justify="center" xs={12}>
          <Button disableRipple startIcon={<AddAPhotoIcon />} className={classes.buttonStyle}>Change Photo</Button>
        </Grid> */}
        <Grid item xs={12} >
          <Typography align="center" gutterBottom style={{fontSize: 12, marginTop:"5px"}}>Leticia Pane</Typography>
  
        </Grid>
      </Grid>
      <Box style={{height:"2px"}}/>
      <Box style={{display:"flex", alignItems:"center", justifyContent:"center"}}>
        <Typography align="center" gutterBottom variant="caption" style={{fontSize: 9}} >leticia.pane@correo.com.py</Typography>
      </Box>
      <Box style={{display:"flex", alignItems:"center", justifyContent:"center"}}>
        <Typography align="center" gutterBottom variant="caption" style={{fontSize: 9}} >Perfil de usuario: Gerente</Typography>
      </Box>
      <Grid container style={{marginTop:"5px"}} >

      </Grid>
      
      <Grid container justify="center">
        <Tooltip title="Editar y grabar cambios en tu perfil">
        {/* backgroundColor:"#E1C16E", */}
        {/* style={{margin:'2px', color:"#344955",textTransform:"none"}} */}
          <Button variant="contained" onClick={handleEditProfile} className={classes.buttonStyle} disableRipple startIcon={<ModeEditIcon />} >
          Editar Perfil</Button>
        </Tooltip>
      </Grid>
      <Box style={{height:"10px"}}/>
    </Paper>
    <Box style={{height: "5px"}}/>
    </>
  )
}