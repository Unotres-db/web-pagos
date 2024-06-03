import React, { useState } from 'react';

import { Grid, Paper, Box, Button, Tooltip, Typography, Avatar} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import EmailIcon from '@mui/icons-material/Email';
import YouTubeIcon from '@mui/icons-material/YouTube';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import WebIcon from '@mui/icons-material/Web';
import picMcl from '../../assets/lp.jpg';

const useStyles = makeStyles((mainTheme) => ({
buttonStyle: {
  // width:"120px",
  backgroundColor:"#7b7d7b"
},
sectionTitleStyle:{
  fontSize: mainTheme.sectionTitle.fontSize,
  color: mainTheme.sectionTitle.color
},
userPhotoStyle:{
  height: mainTheme.userPhotoStyle.height,
  width: mainTheme.userPhotoStyle.width,
  alignItems: mainTheme.userPhotoStyle.alignItems,
  marginTop: mainTheme.userPhotoStyle.marginTop,
  marginBottom:mainTheme.userPhotoStyle.marginBottom,
  marginLeft:mainTheme.userPhotoStyle.marginLeft,
  marginRigth:mainTheme.userPhotoStyle.marginRight,
  display: mainTheme.userPhotoStyle.display,
  textAlign: mainTheme.userPhotoStyle.textAlign,
  justifyContent: mainTheme.userPhotoStyle.justifyContent,
},
iconStyle:{
  color: mainTheme.palette.primary.main,
},
iconStyleInfo:{
  color: mainTheme.palette.primary.main,
},
textStyle:{
  color: mainTheme.palette.primary.main,
},
socialNetworkBox:{
  width:'100%',
  textAlign: 'center',
  AlignItems: 'center',
  backgroundColor:mainTheme.palette.secondary.main,
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
    <Paper elevation={6} style={{margin:"0px", padding:"5px", maxWidth:"300px", margin:"auto"}}>
      {/* <Typography className={classes.sectionTitleStyle} >My Profile</Typography> */}

      <Grid container style={{marginTop:"5px"}}  >
        <Grid container justify="center" >  
          {/* <Box style={{height:"5px"}}/> */}
            <Avatar src={picMcl} alt="Martin Calcena" className={classes.userPhotoStyle} />
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

        {/* <Grid item xs={1} >
          <LocationOnIcon fontSize="small" className={classes.textStyle}  />
        </Grid>
        <Grid item xs={9} >
          <Typography style={{fontSize: 9, marginLeft: "10px", marginTop:"2px"}}>Asunción, Paraguay</Typography>
        </Grid>
        <Grid item xs={2} >

        </Grid> */}

      </Grid>
      
      {/* <Box className = {classes.socialNetworkBox}>
        <Tooltip title="Send an email">
          <EmailIcon className = {classes.iconStyle} style={{ fontSize:20, marginTop:"5px", marginLeft:"1px", marginRight:"1px", marginBottom:"0px" }}/>
        </Tooltip>
        <Tooltip title="Go to web">
          <WebIcon className = {classes.iconStyle} style={{ fontSize:20, marginTop:"5px", marginLeft:"1px", marginRight:"1px", marginBottom:"0px" }}/>
        </Tooltip>
        <Tooltip title="Go to Linkedin account">
          <LinkedInIcon className = {classes.iconStyle} style={{ fontSize:20, marginTop:"5px", marginLeft:"1px", marginRight:"1px", marginBottom:"0px" }}/>
        </Tooltip>
        <Tooltip title="Go to Youtube page">
          <YouTubeIcon className = {classes.iconStyle} style={{ fontSize:20, marginTop:"5px", marginLeft:"1px", marginRight:"1px", marginBottom:"0px" }}/>
        </Tooltip>
        <Tooltip title="Go to Twitter account">
          <TwitterIcon className = {classes.iconStyle} style={{ fontSize:20, marginTop:"5px", marginLeft:"1px", marginRight:"1px", marginBottom:"0px" }}/>
        </Tooltip>
        <Tooltip title="Go to Facebook account">
          <FacebookIcon className = {classes.iconStyle} style={{ fontSize:20, marginTop:"5px", marginLeft:"1px", marginRight:"1px", marginBottom:"0px" }}/>
        </Tooltip>
        <Tooltip title="Go to Instagram account">
          <InstagramIcon className = {classes.iconStyle} style={{ fontSize:20, marginTop:"5px", marginLeft:"1px", marginRight:"1px", marginBottom:"0px" }}/>
        </Tooltip>
      </Box>
      <Box style={{height:"2px"}}/> */}
      
      {/* <Grid container> 
        <Grid item xs={1}>
          <EmailIcon fontSize="small" className={classes.iconStyleInfo} />
        </Grid>
        <Grid item xs={11}>
          <Typography style={{fontSize: 9, marginLeft: "10px", marginTop:"2px"}}>martincsl@valuationsweb.com</Typography>
        </Grid>
      </Grid> 

      <Grid container> 
        <Grid item xs={1}>
          <FacebookIcon fontSize="small" className={classes.iconStyleInfo} />
        </Grid>
        <Grid item xs={11}>
          <Typography style={{fontSize: 9, marginLeft: "10px", marginTop:"2px"}}>valuationsweb</Typography>
        </Grid>
      </Grid> 

      <Grid container>
        <Grid item xs={1}>
          <WebIcon fontSize="small"  className = {classes.iconStyleInfo} />
        </Grid>
        <Grid item xs={11}>
          <Typography style={{fontSize: 9, marginLeft: "10px", marginTop:"2px"}}>www.valuationsweb.com</Typography>
        </Grid>
      </Grid> 

      <Grid container>
        <Grid item xs={1}>
          <LinkedInIcon fontSize="small"  className = {classes.iconStyleInfo} />
        </Grid>
        <Grid item xs={11}>
          <Typography style={{fontSize: 9, marginLeft: "10px", marginTop:"2px"}}>https://www.linkedin.com/in/martin-calcena-sim%C3%B5es-lopes-b28a954/</Typography>
        </Grid>
      </Grid> 

      <Grid container>
        <Grid item xs={1}>
          <InstagramIcon fontSize="small"  className = {classes.iconStyleInfo} />
        </Grid>
        <Grid item xs={11}>
          <Typography style={{fontSize: 9, marginLeft: "10px", marginTop:"2px"}}>@martincsl</Typography>
        </Grid>
      </Grid> 
      <Grid container>
        <Grid item xs={1}>
          <TwitterIcon fontSize="small"  className = {classes.iconStyleInfo} />
        </Grid>
        <Grid item xs={11}>
          <Typography style={{fontSize: 9, marginLeft: "10px", marginTop:"2px"}}>@martincsl</Typography>
        </Grid>
      </Grid> 
      <Grid container>
        <Grid item xs={1}>
          <YouTubeIcon fontSize='small' className = {classes.iconStyleInfo} />
        </Grid>
        <Grid item xs={11}>
          <Typography style={{fontSize: 9, marginLeft: "10px", marginTop:"2px"}}>valuationsweb</Typography>
        </Grid>
      </Grid>  */}

      <Grid container justify="center">
        <Tooltip title="Edit and save changes to your profile">
          <Button variant="contained" onClick={handleEditProfile} disableRipple startIcon={<ModeEditIcon />} className = {classes.buttonStyle}>Editar Perfil</Button>
        </Tooltip>
      </Grid>
      <Box style={{height:"10px"}}/>
      {/* <Grid container direction="row" xs={12} >

        <Grid item xs={6}>
          <Typography  align="left" style={{marginTop:"10px", marginLeft:"20px", fontSize:11}}>Following: 15</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography align="right" style={{marginTop:"10px", marginRight:"20px", fontSize:11}}>Followed by: 20</Typography>
        </Grid>
      </Grid> */}
    </Paper>
    <Box style={{height: "5px"}}/>
    {/* <FormEditProfileModal isModalOpen={isModalOpen} handleModalClose={handleModalClose}/> */}
    {/* <Paper elevation={6}>
      <FormEdit />
    </Paper> */}
    {/* <Box style={{height: "10px"}}/> */}
    </>
  )
}

      {/* <Grid container> 
        <Grid item xs={1}>
          <EmailIcon fontSize="small" className={classes.iconStyle} />
        </Grid>
        <Grid item xs={11}>
          <Typography style={{fontSize: 9, marginLeft: "10px", marginTop:"2px"}}>martincsl@valuationsweb.com</Typography>
        </Grid>
      </Grid> 
      <Grid container>
        <Grid item xs={1}>
          <InstagramIcon fontSize="small"  className = {classes.iconStyle} />
        </Grid>
        <Grid item xs={11}>
          <Typography style={{fontSize: 9, marginLeft: "10px", marginTop:"2px"}}>martincsl</Typography>
        </Grid>
      </Grid> 
      <Grid container>
        <Grid item xs={1}>
          <TwitterIcon fontSize="small"  className = {classes.iconStyle} />
        </Grid>
        <Grid item xs={11}>
          <Typography style={{fontSize: 9, marginLeft: "10px", marginTop:"2px"}}>martincsl</Typography>
        </Grid>
      </Grid> 
      <Grid container>
        <Grid item xs={1}>
          <YouTubeIcon fontSize='small' className = {classes.iconStyle} />
        </Grid>
        <Grid item xs={11}>
          <Typography style={{fontSize: 9, marginLeft: "10px", marginTop:"2px"}}>martincsl</Typography>
        </Grid>
      </Grid>  */}