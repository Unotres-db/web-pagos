import React, {useContext, useState, useEffect} from 'react';

import { Paper, TableContainer, Table, TableHead, TableBody, TableRow, TableCell, TableFooter, TablePagination, TableSortLabel, Button, IconButton, Tooltip, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import useTableSorting from '../../hooks/useTableSorting';
import TablePaginationActions from '../../components/TablePaginationActions';

const useStyles = makeStyles( (mainTheme) => ({
  table:{
    minWidth: 370,
    maxHeight: 900
  },
  TableHeader:{
    color: "white",
    backgroundColor: mainTheme.palette.primary.main
  },
  TableTitle:{
    color: "white",
    fontSize: 11
  },
  ButtonTable:{
    display: 'inline-block',
    padding:0,
    minHeight: 0,
    minWidth: 0,
    color: mainTheme.palette.primary.main,
    backgroundColor:"white",
    fontSize: "9px",
    textTransform:"none",
    "&:hover": {
      color:mainTheme.palette.secondary.main,
      backgroundColor:"white"
    },
  },
  grow:{
      flexGrow: 1
    },
  iconButtonStyle:{
    color: mainTheme.palette.primary.main,
    // fontSize: "11px",
    // [mainTheme.breakpoints.down('xs')]: {
    //   fontSize: "10px"
    // },
    backgroundColor: "whitesmoke",//mainTheme.palette.secondary.main,
    textTransform: "none",
    marginTop: "2px",
    marginLeft:"2px",
    "&:hover": {
      backgroundColor: "#437a9f" //"#F49506ed"
    },
  },
  TableRows:{
    fontSize: 12
  }
}));


export default function TableInvestments(){
  const classes = useStyles();
  const [ page, setPage ] = useState(0);

  return (
    <>
    </>
  )
}
