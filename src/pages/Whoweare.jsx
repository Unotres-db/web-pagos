import React from 'react';

import { Grid, Paper, Typography} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import picMcl from '../assets/mcl.jpg';
import picJs from '../assets/logojs2.png';
import picReact from '../assets/logoreact2.png';
import picNode from '../assets/logonode.png';
import picSql from '../assets/logosql2.jpg';
import picMui from '../assets/logomui3.png';
import picFigma from '../assets/logofigma2.png';
import picGit from '../assets/logo-git2.png';

import Header from '../components/Header';
const useStyles = makeStyles((mainTheme) => ({
  root: {
    flexGrow: 1,
  },
  contentStyle: {
    position: 'absolute',
    top: '65px'
  },
  paper: {
    padding: mainTheme.spacing(2),
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
    height: '50px',
    textAlign: "center",
    display: "inline",
    justifyContent: "center",
    alignItems: "center",
    margin: "auto",
    marginTop: "10px",
  }, 
  logoStyleNode:{
    height: '20px',
    textAlign: "center",
    display: "inline",
    justifyContent: "center",
    alignItems: "center",
    margin: "auto",
    marginTop: "10px",
    marginBottom:"10px",
    marginRight: "10px",
    marginLeft: "4px",
  }, 
  })); 

export default function Whoweare () {
  const classes = useStyles();

  return (
    <>
    <Header />

    <Grid container spacing={0} direction="column" alignItems="center" justify="center" className={classes.contentStyle} style={{ minHeight: '85vh' }} >
      <Grid item xs={12} md={6} >
        <Paper className={classes.paper} elevation={12}>
          <Typography gutterBottom variant="subtitle1" align='center'>
            Martin Calcena Simões Lopes
          </Typography>
            <img src = {picMcl} alt="Martin" className={classes.photoStyle} /> 
          <Typography gutterBottom variant="subtitle2">
            Education: BS in Business Administration and MBA in Finance
          </Typography>
          <Typography gutterBottom variant="subtitle2" align='justify'> 
            27+ years of work experience in Business, Sales, Finance, DCF Analysis, Financial Modeling, Projects, Planning, Reports and New Products Development in companies such as Texaco, DPA (Nestlé) and AON Affinity, among others, working in Brazil, Paraguay and USA. 
          </Typography>
            {/* <img src = {picTexaco} alt="Texaco" className={classes.logoStyle} /> 
            <img src = {picNestle} alt="Nestle" style = {{height:35}} /> 
            <img src = {picAon} alt="Aon" style = {{height:40}} /> 
            <img src = {picCsa} alt="Csa" className={classes.logoStyle} />  */}
          <Typography gutterBottom variant="subtitle2"  align='justify'>
            Co-founder and CEO of Quo Fintech S.A. and ValuationWeb.
          </Typography>  
          <Typography gutterBottom variant="subtitle2" align='justify'>
            Self-taught full stack developer working with HTML, CSS, Javascript, React Js, Node.js, SQL, Material Ui, Figma and Git. 
          </Typography> 
            <Grid container direction="row" alignItems="center" spacing={1}> 
              <Grid item xs={1}  />
              <Grid item xs={3} >
                <img src = {picJs} alt="Javascript"  className={classes.logoStyle} /> 
              </Grid>
              <Grid item xs={1}  >
                <img src = {picReact} alt="React" className={classes.logoStyle} /> 
              </Grid>
              <Grid item xs={1} >
                <img src = {picNode} alt="Node" className={classes.logoStyleNode} /> 
              </Grid>
              <Grid item xs={1} alignItems="center">
                <img src = {picSql} alt="Sql" style={{height:50}} /> 
              </Grid>
              <Grid item xs={1} >
                <img src = {picMui} alt="Material Ui" className={classes.logoStyle} /> 
              </Grid>
              <Grid item xs={1} >
                <img src = {picFigma} alt="Figma" className={classes.logoStyle} style={{height:40}} /> 
              </Grid>
              <Grid item xs={1}>
                <img src = {picGit} alt="Git" className={classes.logoStyle} /> 
              </Grid>
              <Grid item xs={1} />
            </Grid>
          </Paper>
      </Grid>
    </Grid>
  </>
  );
}