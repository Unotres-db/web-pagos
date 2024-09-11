import React, { useState, useContext } from 'react';

import { Grid, Paper, Box, Button, Tooltip, Typography, Avatar} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import ModeEditIcon from '@mui/icons-material/ModeEdit';

import picLeticia from '../../assets/leticia.jpg';
import picMartin from '../../assets/mcl.jpg';
import picSebastian from '../../assets/sebastian.jpg';
import picDiana from '../../assets/diana.jpg';

import { LoginContext } from '../../helpers/Context';

const useStyles = makeStyles((mainTheme) => ({
textStyle:{
    color:'#344955',
    fontSize:"12px",
    marginTop:"5px"
  },  
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
  const { userData }= useContext(LoginContext);
  const { userId, userFirstName, userLastName}= userData;

  function getUserPic (){
    if (userId==="martincsl@hotmail.com"){
      return picMartin
    }
    if (userId==="sblanco@unotres.com.py"){
      return picSebastian
    }
    if (userId==="leticiapane@unotres.com.py"){
      return picLeticia
    }
    return picDiana
  }

  function getUserOccupation (userId){
    if (userId==="martincsl@hotmail.com"){
      return "Consultor Financiero"
    }
    if (userId==="sblanco@unotres.com.py"){
      return "Socio-Director"
    }
    if (userId==="leticiapane@unotres.com.py"){
      return "Socia-Directora"
    }
    if (userId==="dianapane@unotres.com.py"){
      return "Administradora"
    }
    return picDiana
  }

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
            <Avatar src={getUserPic()} alt="Foto del Usuario" className={classes.userPhotoStyle} />
        </Grid>
        {/* <Grid item container justify="center" xs={12}>
          <Button disableRipple startIcon={<AddAPhotoIcon />} className={classes.buttonStyle}>Change Photo</Button>
        </Grid> */}
        <Grid item xs={12} >
          <Typography align="center" gutterBottom className={classes.textStyle} >{`${userFirstName} ${userLastName}`}</Typography>
  
        </Grid>
      </Grid>
      <Box style={{height:"2px"}}/>
      <Box style={{display:"flex", alignItems:"center", justifyContent:"center"}}>
        <Typography align="center" gutterBottom variant="caption" className={classes.textStyle}  >{userId}</Typography>
      </Box>
      <Box style={{display:"flex", alignItems:"center", justifyContent:"center"}}>
        <Typography align="center" gutterBottom variant="caption" className={classes.textStyle} >{getUserOccupation(userId)}</Typography>
      </Box>
      <Grid container style={{marginTop:"5px"}} >

      </Grid>
      
      <Grid container justify="center">
        <Tooltip title="Editar y grabar cambios en tu perfil">
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