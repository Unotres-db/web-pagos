import React from 'react';

import { Grid, Paper, Box, Typography, Button, IconButton, Avatar, Icon } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import FindInPageIcon from '@mui/icons-material/FindInPage';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import PublishIcon from '@mui/icons-material/Publish';
import CommentIcon from '@mui/icons-material/Comment';
import RecommendIcon from '@mui/icons-material/Recommend';

import Header from '../components/Header';
import { ClassNames } from '@emotion/react';
const useStyles = makeStyles((mainTheme) => ({
  root: {
    flexGrow: 1,
  },
  contentStyle: {
    position: 'absolute',
    top: '65px'
  },
  boxSubTitleStyle:{

  },
  boxLineStyle:{
    height:"55px"
  },
  paperStyle: {
    padding: mainTheme.spacing(2),
    // margin: 'auto',
    marginTop:"30px",
    marginLeft:"15px",
    marginRight:"15px",
    paddingLeft:"10px",
    paddingRight:"10px",
    // minWidth: 350,
    // maxWidth: 500,
  },

  buttonStyle: {
    color: mainTheme.palette.primary.main,
    fontSize: "11px",
    width:"105px",
    height: "30px",
    [mainTheme.breakpoints.down('xs')]: {
      fontSize: "10px"
    },
    backgroundColor: mainTheme.palette.secondary.main,
    textTransform: "none",
    marginTop: "2px",
    marginLeft:"2px",
    "&:hover": {
      backgroundColor: "#F49506ed"
    },
  },

  })); 
export default function Pricing (){
  const classes = useStyles();
  return (
    <>
    <Header />
    <Grid container spacing={0} direction="row"  justify="center" className={classes.contentStyle} style={{ minHeight: '85vh' }} >
      <Grid item xs={12} sm={3} >
        <Paper className= {classes.paperStyle} elevation={6}>
          <Typography align="center" gutterBottom>Free</Typography>
          <Box style={{height:"60px"}}/>
          <Typography align="center" gutterBottom>What will you get</Typography>
          <Box className={classes.boxLineStyle}>
            <Grid container style={{backgroundColor:"green"}}>
              <Grid item xs={1}>
                <FindInPageIcon style={{marginTop:"7px"}}/>
              </Grid>
              <Grid item xs={11}>
                <Typography variant="caption" gutterBottom>See up to 10 published valuations from others users</Typography>
              </Grid>
            </Grid>
          </Box>
          <Box className={classes.boxLineStyle}>
          <Grid container spacing={3}  style={{backgroundColor:"blue"}}>
              <Grid item xs={1}>
                <AddCircleIcon />
              </Grid>
              <Grid item xs={11}>
                <Typography variant="caption" gutterBottom>Create up to 4 valuations per month</Typography>
              </Grid>
            </Grid>
          </Box>
          <Box className={classes.boxLineStyle}>
            <Typography variant="caption" gutterBottom>Publish your valuations to all users</Typography>
          </Box>
          <Box className={classes.boxLineStyle}>
            <Typography variant="caption" gutterBottom>Generate PDF files of your valuations</Typography>
          </Box>
          <Box className={classes.boxLineStyle}>
            <Typography variant="caption" gutterBottom>Generate PDF files of published valuations</Typography>
          </Box>
          <Box className={classes.boxLineStyle}>
            <Typography variant="caption">See rates and comments of published valuations</Typography>
          </Box>
          <Box style={{height:"20px"}}/>
          <Grid container justify="center">
            <Button disableRipple fullWidth="false" className = {classes.buttonStyle}>Get Started</Button>
          </Grid>
          {/* <Typography variant="body2" gutterBottom>See up to 10 published valuations from others users</Typography>
          <Typography variant="body2" gutterBottom>Create up to 4 valuations per month</Typography>
          <Typography variant="body2" gutterBottom>Publish your valuations to all users</Typography>
          <Typography variant="body2" gutterBottom>Generate PDF files of your valuations</Typography>
          <Typography variant="body2" gutterBottom>Generate PDF files of published valuations</Typography>
          <Typography variant="body2">See rates and comments of published valuations</Typography> */}

        </Paper>
      </Grid>
      <Grid item xs={12} sm={3}>
        <Paper className = {classes.paperStyle} elevation={6}>
          <Typography align="center" gutterBottom>Montly Subscription</Typography>
          <Box style ={{height: "30px"}}>
            <Typography align="center" gutterBottom >Us$ 29,90</Typography>
          </Box>
          <Box style ={{height: "30px"}} />
          <Typography align="center" gutterBottom>What will you get</Typography>
          <Typography  variant="body2" gutterBottom>See published Valuations from others users</Typography>
          <Typography  variant="body2" gutterBottom>Create up to 30 valuations per month</Typography>
          <Typography  variant="body2" gutterBottom>Publish your valuations to all users</Typography>
          <Typography  variant="body2" gutterBottom>Enable/Disable rates and comments from other users</Typography>
          <Typography  variant="body2"gutterBottom>Generate PDF files of your valuations</Typography>
          <Typography  variant="body2" gutterBottom>Generate PDF files of published valuations</Typography>
          <Typography  variant="body2">Rate and comment up to 30 published valuations</Typography>
          <Grid container justify="center">
            <Button disableRipple fullWidth="false" className = {classes.buttonStyle}>Get Started</Button>
          </Grid>
        </Paper>

      </Grid>
      <Grid item xs={12} sm={3}>
        <Paper  className={classes.paperStyle} elevation={6}>
          <Typography align="center" gutterBottom >Annual Subscription</Typography>
          <Box style={{height:"30px"}}>
            <Typography align="center" gutterBottom >Us$ 287,00</Typography>
          </Box>
          <Box style ={{height: "30px"}}>
            <Typography align="center" variant="caption" gutterBottom>20% discount over montly price</Typography>
          </Box >  
          <Typography variant="body2" align="center" gutterBottom>What will you get</Typography>
          <Typography variant="body2"gutterBottom>See published Valuations from others users</Typography>
          <Typography variant="body2" gutterBottom>Create unlimited valuations</Typography>
          <Typography variant="body2" gutterBottom>Publish your valuations to your network or all users</Typography>
          <Typography variant="body2" gutterBottom>Enable/Disable rates and comments from other users</Typography>
          <Typography variant="body2" >Generate PDF files of your valuations </Typography>
          <Typography variant="caption" gutterBottom>with you contact info (web, email, linkedin and instagram account)</Typography>
          <Typography variant="body2" gutterBottom>Generate PDF files of published valuations</Typography>
          <Typography variant="body2">Rate and comment published valuations</Typography>
          <Grid container justify="center">
            <Button disableRipple fullWidth="false" className = {classes.buttonStyle}>Get Started</Button>
          </Grid>
        </Paper>
      </Grid>
    </Grid>
    </>
  )
}