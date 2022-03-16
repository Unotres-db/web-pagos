import React from 'react';

import { Grid, Paper, Box, Typography, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

export default function TestDYChild ({companiesList}){
  
  return(
    <>
    {companiesList.map ((currElement) => 
  
    <Typography>{currElement.regularMarketPrice*10}</Typography>
    )
    }
    </>
  )
}