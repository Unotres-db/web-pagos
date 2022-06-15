import React from 'react';

import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Box, Button, Typography, Grid } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
import WarningIcon from '@material-ui/icons/Warning';

const useStyles = makeStyles( (mainTheme) => ({
  iconBox:{
    width:'100%',
    textAlign: 'center',
    AlignItems: 'center',
  },
  iconStyle:{
    color: "white", 
  },
  buttonStyle:{
    backgroundColor:"white",
    textTransform:"none",
    fontSize: 12,
    margin: "10px",
    minWidth:"60px",
    "&:hover": {
      color:mainTheme.palette.primary.main,
      backgroundColor:"white",
    },
  },  
}))

const AlertDialog = ({open, onClose, severity, title, buttons, children}) => {
  console.log(buttons);
  if (buttons === undefined){
    buttons={button1:"Ok"}
  }

  let bkColor="#ff9800";
  if (severity==="success") {
    bkColor="#4caf50"
  } else if (severity==="error") {
    bkColor="#f44336"
  }
  let numberOfButtons = Object.keys(buttons).length;
  let gridSpace=0
  if (numberOfButtons === 1) {
    gridSpace = 12
  } else if (numberOfButtons === 2){
    gridSpace = 6
  } else if (numberOfButtons === 3) {
    gridSpace = 4
  } else {
    gridSpace = 3
  }

  function selectIcon (){
    switch (severity) {
      case "success":
        return (
          <CheckCircleOutlineIcon className={classes.iconStyle} style={{ fontSize: 40 }} />
        );
      case "error":
        return (
          <ErrorOutlineIcon className={classes.iconStyle} style={{ fontSize: 40 }}/>
        );
      case "warning":
        return (
          <WarningIcon className={classes.iconStyle} style={{ fontSize: 40 }} />
        );
    }
  }

  const classes = useStyles();
  return (
    <>
    <Dialog 
      open={open}
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <Box className={classes.iconBox} style={{color:'white',backgroundColor:bkColor}}>
      <Box style={{height:20}} />
        {selectIcon()}
      </Box>
      <DialogTitle id="alert-dialog-title" style={{backgroundColor:bkColor, paddingTop:"0px", paddingBottom:"0px"}}><Typography align="center" variant="subtitle2" style={{color:'white'}}>{title}</Typography></DialogTitle>
      <DialogContent style={{color:'white', paddingTop:"0px", paddingBottom:"0px", backgroundColor:bkColor}}>
        <DialogContentText id="alert-dialog-description">
          <Typography align="center" variant="caption" style={{ color: 'white' }}>
            {children}
          </Typography> 
        </DialogContentText>
      </DialogContent>
        
      <DialogActions style={{color:'white', backgroundColor:bkColor, paddingTop:"0px", paddingBottom:"0px"}}>
        <Grid container direction="row" xs={12} style={{textAlign:'center'}}>
          {Object.keys(buttons).map( key => {
            return (
            
            <Grid item direction="row" xs={gridSpace}  >  
              <Button type="submit" className={classes.buttonStyle} style={{color:bkColor}} onClick={() => onClose (buttons[key])} variant="outlined" disableRipple>{buttons[key]}</Button>
            </Grid>
            )
            
          })}

        </Grid>
        <Box style={{height:"2px"}}/>
      </DialogActions>

    </Dialog>
    </>
    )
}
export default AlertDialog