import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import { Grid, Paper, Box, Button, Typography, Tooltip } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import AddCircleIcon from '@mui/icons-material/AddCircle';

import api from '../../services/api';

import Header from '../../components/Header';
import DialogModal from '../../components/modals/DialogModal';
import MyProfile from './MyProfile';
import TableMyValuationsList from './TableMyValuationsList';
import RecommendedValuations from './RecommendedValuations';
import TableYourNetwork from './TableYourNetwork';

const useStyles = makeStyles( (mainTheme) => ({
  contentStyle: {
    position: 'absolute',
    top: '65px',
  },
  buttonStyle: {
    [mainTheme.breakpoints.down('xs')]: {
      fontSize: "10px"
    },
  },
  sectionTitleStyle:{
    fontSize: mainTheme.sectionTitle.fontSize,
    color: mainTheme.sectionTitle.color
  },
  titleStyle: {
    width: "100%",
    padding: "15px",
    color: mainTheme.palette.secondary.main,
    backgroundColor: "white",
    marginBottom: "10px",
  },
  boxStyle: {
    width: "100%",
    padding: "1px",
    color: "white",
    backgroundColor: mainTheme.palette.secondary.main,
    marginBottom: "1px",
  },
  paperStyle: {
    width: "100%",   
    minHeight:"550px", // vai ser do tamanho do conteudo da tabela
    marginLeft:"3px",
    marginRight:"0px",
    color: mainTheme.palette.primary.main,
    backgroundColor: "whitesmoke",
    padding: "5px",
  },
  TableContainerStyle: {
    width: "100%",   
    height:"800px", // vai ser do tamanho do conteudo da tabela
    marginLeft:"3px",
    marginRight:"0px",
    color: "white",
    backgroundColor: mainTheme.palette.secondary.main,
    padding: "10px",
  },
  iconStyle: {
    textAlign: "center",
    display: "block",
    justifyContent: "center",
    alignItems: "center",
    margin: "auto",
    marginTop: "10px",
  }
})) 

export default function Home (){
  const classes = useStyles();
  const [ valuationsList, setValuationsList ] = useState();
  const [ isDialogOpen, setIsDialogOpen ] = useState(false);
  const [ dialogOptions, setDialogOptions ] = useState({severity:"",title:"",message:"",buttons:{},action:""});
  const history = useHistory();

  function handleDialogClose(){
    setIsDialogOpen(false);
  }

  function handleNewValuation(){
    history.push('/valuation')
  }
   // testear com useFetch x useEffect
  useEffect ( ()=> {
    api.get('valuations')
    .then (response => {
      const allValuations = response.data;
      setValuationsList(allValuations);
    })
    .catch (function (err){
      if (err.response) {
        const errorMsg = Object.values(err.response.data);
        setDialogOptions({severity:"error", title:"Oops", message:"There was an error in the database access. Please try later.",buttons:{button1:"Ok"},action:""})
      } else if (err.request) {
        setDialogOptions({severity:"error", title:"Oops", message:"There was an error in the server access. Please try later.",buttons:{button1:"Ok"},action:""})
        } else {
          setDialogOptions({severity:"error", title:"Oops", message:"There was an unexpected error in the server. Please try later.",buttons:{button1:"Ok"},action:""})
          }
      setIsDialogOpen (true);
    });
  },[]) 
  
  return (
    <>
    <Header />
    <Grid container direction="column" alignItems="center" style = {{ minHeight: '80vh'}} >

      <Grid item xs={12} style = {{ minHeight: '69px'}} /> 

      <Grid item container direction="row" spacing={1} >

        <Grid item xs={12} md={2} >
          <Paper className={classes.paperStyle} >
            <MyProfile />
            <TableYourNetwork />
          </Paper>
        </Grid>

        <Grid item xs={12} md={7} > 
          <Paper className={classes.paperStyle} >
            <Grid container>
              <Grid item xs={2}>
                <Typography className={classes.sectionTitleStyle}>My Valuations</Typography>
              </Grid>
              <Grid item xs={10}>
                <Tooltip title="Create a new valuation">
                  <Button 
                    variant = "contained" 
                    startIcon = {<AddCircleIcon />} 
                    disableRipple
                    onClick = {handleNewValuation} 
                    className = {classes.buttonStyle}
                    >New Valuation
                  </Button>
                </Tooltip>
              </Grid>
              
            </Grid>
            <Box style={{height:"5px"}}/>
            { valuationsList ? <>
              <TableMyValuationsList valuationsList = {valuationsList} setValuationsList={setValuationsList} />
            </>: 
              <Typography style={{fontSize:14, marginTop:"15px"}}>You don't have any saved valuation</Typography>
            }
          </Paper>
        </Grid>

        <Grid item xs={12} md={3} > 
          <Paper className={classes.paperStyle} >
            <Typography className={classes.sectionTitleStyle} >Published Valuations</Typography>
            <Box style={{height:"5px"}}/>
            <Paper>
              <RecommendedValuations />
            </Paper>
          </Paper>
        </Grid>
      </Grid>
    </Grid>
    <DialogModal open={isDialogOpen} onClose={handleDialogClose} severity={dialogOptions.severity} title={dialogOptions.title} buttons={dialogOptions.buttons} action={dialogOptions.action}>
      {dialogOptions.message}
    </DialogModal> 
    </>
  )
}