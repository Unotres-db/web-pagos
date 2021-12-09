import React from 'react';

import Snackbar from '@material-ui/core/Snackbar';
import { makeStyles } from '@material-ui/core/styles';
import { Alert, AlertTitle } from '@material-ui/lab';

const useStyles = makeStyles( (mainTheme) => ({
  alertStyle: {
    position:'relative',
    top: '180px'
  }
}))

export default function AlertMessage ({open, onClose, severity, title, children }){
  const classes = useStyles();  
 
   return (
     <>
     <Snackbar open={open} autoHideDuration={3000} onClose={onClose} className={classes.alertStyle}> 
       <Alert onClose={onClose} severity={severity} variant ="filled">
          <AlertTitle>{title}</AlertTitle>
          {children}
       </Alert>
     </Snackbar>
     </>
    )
}
