import React from 'react';

import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, Box, Button, Typography } from '@mui/material'
import { makeStyles } from '@material-ui/core/styles';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import WarningIcon from '@mui/icons-material/Warning';

const useStyles = makeStyles( () => ({
  iconBox:{
    width:'100%',
    textAlign: 'center',
    AlignItems: 'center',
  },
  iconStyle:{
    color: "white", 
  },
  // buttonStyle:{
  //   backgroundColor:"white",
  //   textTransform:"none",
  //   fontSize: 12,
  //   margin: "10px",
  //   // paddingLeft:"15px",
  //   minWidth:"68px",
  //   borderColor:"white",
  //   "&:hover": {
  //     color:"white",
  //     // backgroundColor:"white",
  //     borderColor:"white",
  //   },
  // },  
}))

export default function DialogModal ({open, onClose, severity, title, buttons, children, action}) {

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
  let gridSpace = 0
  if (numberOfButtons === 1) {
    gridSpace = 12
  } else if (numberOfButtons === 2){
    gridSpace = 3
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
    <div >
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
      <DialogTitle id="alert-dialog-title" style={{backgroundColor:bkColor, fontSize:14,paddingTop:"0px", paddingBottom:"0px"}}><Typography align="center" variant="subtitle2" style={{color:'white'}}>{title}</Typography></DialogTitle>
      <DialogContent style={{color:'white', paddingTop:"0px", paddingBottom:"0px", backgroundColor:bkColor}}>
        <DialogContentText id="alert-dialog-description">
          <Box style={{display:"Flex", justifyContent:"center"}}>
            <Typography align="justify" style={{ color: 'white', fontSize :"14px" }}>
              {children}
            </Typography> 
          </Box>
        </DialogContentText>
      </DialogContent>
      <Box style={{height:"10px", backgroundColor:bkColor}}/>  
      <DialogActions style={{color:'white', backgroundColor:bkColor, paddingTop:"0px", paddingBottom:"0px"}}>
        <Grid container direction="row" xs={12} style={{textAlign:'center'}}>
          { numberOfButtons = 2 ? <>
            <Grid item direction="row" xs={gridSpace} />
          </>: null}
          {Object.keys(buttons).map( key => {
            return (
            <Grid item direction="row" xs={gridSpace}    >  
              <Box style={{display:"flex", justifyContent:"center",paddingLeft:"8px", marginLet:"2px",marginRigth:"2px", width:"100%"}}>
                <Button type="submit" style={{color:bkColor,backgroundColor:"white",textTransform:"none",fontSize: 12, margin: "5px"}} onClick={() => onClose (buttons[key], action)} variant="outlined" disableRipple>{buttons[key]}</Button>
              </Box>
            </Grid>
            )
          })}
          { numberOfButtons = 2 ? <>
            <Grid item direction="row" xs={gridSpace}  />
          </>: null}
        </Grid>
        <Box style={{height:"5px"}}/>
      </DialogActions>
      <Box style={{height:"15px", backgroundColor:bkColor}}/>
    </Dialog>
    </div>
    </>
  )
}