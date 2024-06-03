import React from 'react';

import { Grid, Paper, Box, Button, Tooltip, Typography, Avatar} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

export default function CashBalance (){
  return(
    <>
    <Paper>
      <Grid container>
        <Grid item sx={6}>
          <Typography>Saldo Itau</Typography>
        </Grid>  
        <Grid item sx={6}>
          <Typography>100.000</Typography>
        </Grid>  
        <Grid item sx={6}>
          <Typography>Saldo Continental</Typography>
        </Grid>  
        <Grid item sx={6}>  
          <Typography>Saldo Caja Chica</Typography>
        </Grid>  
        <Grid item sx={6}>  
          <Typography>Saldo Actual</Typography>
          <Typography>Saldo Comprometido</Typography>
        </Grid>    
      </Grid>
    </Paper>

    </>
  )
}