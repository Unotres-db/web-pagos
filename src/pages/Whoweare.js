import React from 'react';

import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

import picMcl from '../assets/mcl.jpg';
// import picTexaco from '../assets/logotexaco.png';
// import picNestle from '../assets/logonestle.jpg';
// import picAon from '../assets/logoaon.jpg';
// import picCsa from '../assets/logocsa.jpg';
// import picJs from '../assets/logojs.png';
// import picReact from '../assets/logoreact.png';
// import picNode from '../assets/logonode.png';
// import picMui from '../assets/logomui.png';
// import picFigma from '../assets/logofigma.png';

import Header from '../components/Header';
const useStyles = makeStyles((mainTheme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: mainTheme.spacing(2),
    // backgroundColor:mainTheme.palette.secondary.main,
    margin: 'auto',
    minWidth: 350,
    maxWidth: 500,
  },
  photoStyle:{
    height: '90px',
    textAlign: "center",
    display: "block",
    justifyContent: "center",
    alignItems: "center",
    margin: "auto",
    marginTop: "10px",
    marginBottom:"10px",
  }, 
  logoStyle:{
    height: '45px',
    textAlign: "center",
    display: "inline",
    justifyContent: "center",
    alignItems: "center",
    margin: "auto",
    marginTop: "10px",
    marginBottom:"10px",
    marginRight: "30px",
  }, 
  })); 

export default function Whoweare () {
  const classes = useStyles();

  return (
    <>
    <Header />

    <Grid container spacing={0} direction="column" alignItems="center" justify="center" style={{ minHeight: '100vh' }} >
        <Grid item xs={12} md={6} >
          <Paper className={classes.paper} elevation={12}>
            <Typography gutterBottom variant="subtitle1" align='center'>
                Martin Calcena Simões Lopes
            </Typography>
            <img src = {picMcl} alt="Martin" className={classes.photoStyle} /> 
            <Typography gutterBottom variant="subtitle2">
                Education: Business Administration and MBA in Finance (IBMEC)
            </Typography>
            <Typography gutterBottom variant="subtitle2" align='justify'> 
                27+ years of work experience in Business, Sales, Finance, DCF Analysis, Financial Modeling, Projects, Planning, Reports and New Products Development in companies such as Texaco, Nestlé and AON Affinity, among others, working in Brazil, Paraguay and USA. 
            </Typography>
            {/* <img src = {picTexaco} alt="Texaco" className={classes.logoStyle} /> 
            <img src = {picNestle} alt="Nestle" style = {{height:35}} /> 
            <img src = {picAon} alt="Aon" style = {{height:40}} /> 
            <img src = {picCsa} alt="Csa" className={classes.logoStyle} />  */}
            <Typography gutterBottom variant="subtitle2"  align='justify'>
                Co-founder and CEO of Quo Fintech S.A. and ValuationWeb.
            </Typography>  
            <Typography gutterBottom variant="subtitle2" align='justify'>
                Self-taught full stack developer working with HTML, CSS, Javascript, React, Node Js, SQL, Material Ui and Figma. 
            </Typography>  
            {/* <img src = {picJs} alt="Javascript"  className={classes.logoStyle} /> 
            <img src = {picReact} alt="React" style={{height:30}} /> 
            <img src = {picNode} alt="Node" style={{height:30}} /> 
            <img src = {picMui} alt="Material Ui" className={classes.logoStyle} /> 
            <img src = {picFigma} alt="Figma" className={classes.logoStyle} />  */}
          </Paper>
        </Grid>
      </Grid>
  </>
  )
}