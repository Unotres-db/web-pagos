import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { Grid, Paper, Box, Button, CircularProgress } from '@material-ui/core'; // Container,
import { makeStyles } from '@material-ui/core/styles';
import AddCircleIcon from '@mui/icons-material/AddCircle';


import { format, parseISO } from 'date-fns';


import Header from '../../components/Header'; 
import ChartCashFlow from './ChartCashFlow';
import FormPricesAssumptions from './FormPricesAssumptions';
import FormCostsAssumptions from './FormCostsAssumptions';
import FormSalesAssumptions from './FormSalesAssumptions';
import ProjectOptions from './ProjectOptions';
import TablePL from './TablePL';
import TableCompetition from './TableCompetition';
import TableResults from './TableResults';
import ProjectSelector from './ProjectSelector';
import DialogModal from '../../components/modals/DialogModal';
import ChartFreeCashFlow from '../Valuation/ChartFreeCashFlow';
import TableCashFlow from './TableCashFlow';

const useStyles = makeStyles( (mainTheme) => ({
  contentStyle: {
    position: 'absolute',
    top: '65px',
  },
  // container:{
  //   position: 'absolute',
  // },
  paperStyle: {
    // position: 'sticky',
    width: "100%",   
    minHeight: "550px", // "668px",
    [mainTheme.breakpoints.down('xs')]: {
      minHeight: "200px"
    },
    marginLeft: "3px",
    marginRight: "0px",
    color: "white",
    backgroundColor: "#f0f8ff",
    padding: "10px",
  },
  buttonStyle: {
    [mainTheme.breakpoints.down('xs')]: {
      fontSize: "10px"
    },
  },
  boxSelectStyle:{
    height: "30px",
    width: "45%",
    [mainTheme.breakpoints.down('xs')]: {
      width: "100%"
    },
  },
  CompanyInfo: {
    marginLeft: "3px",
    marginRight: "0px",
    color: "black",
    backgroundColor: "white",
    padding: "10px",
  },
  TableContainerStyle: {
    width: "100%",
    minHeight: "550px", //"668px", 
    marginLeft: "3px",
    marginRight: "0px",
    color: "white",
    backgroundColor: "#f0f8ff", 
    // backgroundColor:mainTheme.palette.primary.main,
    padding: "2px",
  },
}));

export default function Houses () {
  const classes = useStyles();
  const userId = "martincsl";

  const [ dialogOptions, setDialogOptions ] = useState({severity:"",title:"",message:"",buttons:{}, action:""});
  const [ isDialogOpen, setIsDialogOpen ] = useState(false);
  const [ projectIdSearch, setProjectIdSearch] = useState("LP2");
  const [ projectSearchName, setProjectSearchname] = useState("LP2 - Loma Pyta - 2 Torres");
  const [ projectsList, setProjectsList] = useState([
    { 
      name:"LCG - Luque Cañada Garay",
      id:"LCG",
      shortName:"Luque Cañada Garay 18 Casas"
    },
    {
      name:"LP2 - Loma Pyta - 2 Torres",
      id:"LP2",
      shortName:"LP2 - Loma Pyta 4 Torres"
    }, 
    {
      name:"LP4 - Loma Pyta - 4 Torres",
      id:"LP4",
      shortName:"LP2 - Loma Pyta 4 Torres"
    },
    {
      name:"MRA - Mariano Roque Alonso - 3 Torres",
      id:"MRA",
      shortName:"MRA - Mariano Roque Alonso - 3 Torres" 
    },
    {
      name:"NSAJ - Nativo Sajonia",
      id:"NSAJ",
      shortName:"NSAJ - Nativo Sajonia - 1 Torre" 
    },
    {
      name:"LCSR - Luque Cañada San Rafael",
      id:"LCSR",
      shortName:"Luque Cañada San Rafael 30 Casas"
    }
  ]);
  const currentYear = new Date().getFullYear();  // revisar
  const [ editMode, setEditMode ] = useState("blank"); 
  const [assumptions, setAssumptions]  = useState({ 
    QtyOfBuildings:0,
    oneRoomQty:0, oneRoomSize:0, oneRoomPricePerSqrMts:0,oneRoomTotalPrice:0,
    twoRoomsQty:0, twoRoomsSize:0, twoRoomsPricePerSqrMts:0,twoRoomsTotalPrice:0,
    threeRoomsQty:0, threeRoomsSize:0, threeRoomsPricePerSqrMts:0,threeRoomsTotalPrice:0,
    parkingQty:0,parkingAvgprice:0,parkingTotalPrice:0,
    fisrtMonthOfSale:0, phaseOneSales:0, phaseTwoSales:0, phaseThreeSales:0,phaseOneMonths:0, phaseTwoMonths:0, phaseThreeMonths:0,
    phaseOneDiscount:0, phaseTwoDiscount:0, phaseThreeDiscount:0,
    landSize:0, landCostPerMts:0, landTotalCost:0,
    constructionSize:0,constructionCostPerMts:0, constructionCost:0})
  const [ financialData, setFinancialData] = useState((Array.from({ length:5 }, (a,b) => ({ year:2023 + b , period:0, totalRevenue:0, costOfRevenue: 0, grossProfit: 0, grossProfitPercent:0, operatingExpenses: 0, depreciation: 0, interestExpense: 0, other: 0, incomeBeforeTax: 0, incomeTaxExpense: 0, netIncome: 0, ebit: 0, capitalExpenditures: 0, cash: 0, shortLongTermDebt:0, longTermDebt:0, workingCapitalChanges:0, cashFlow:0, discountedCashFlow:0 }))));
  return (
    <>
    <Header />

    <Grid container direction="column" alignItems="center" style = {{ minHeight: '80vh'}}  >

      <Grid item xs={12} style = {{ minHeight: '69px'}} /> 

      <Grid item container direction="row" spacing={1}  >

        <Grid item xs={12} md={3} >
          <Paper className={classes.paperStyle} elevation={3}>
            <FormCostsAssumptions assumptions={assumptions} setAssumptions={setAssumptions} editMode={editMode}/>
            <Box style={{height:"5px"}} />
            <FormPricesAssumptions assumptions={assumptions} setAssumptions={setAssumptions} editMode={editMode}/>
            <Box style={{height:"5px"}} />
            <FormSalesAssumptions assumptions={assumptions} setAssumptions={setAssumptions} editMode={editMode} />

          </Paper>
        </Grid>

        <Grid item xs={12} md={6} > 
          <Paper className = {classes.TableContainerStyle} elevation = {3}>
          <Box style={{height:"5px"}} />
 
            <Box style={{height:"2px"}}/>
            <Paper className = {classes.CompanyInfo}>
              <Grid item xs={12} md={6}>
                <ProjectSelector 
                projectsList = {projectsList} 
                projectIdSearch = {projectIdSearch} 
                projectSearchName = {projectSearchName} 
                setProjectIdSearch = {setProjectIdSearch} />
              </Grid>
              <Box style={{height:"3px"}}/>
              <ProjectOptions editMode={editMode} />
              <Box style={{height:"3px"}}/>
              <TablePL assumptions={assumptions} financialData={financialData}/>
              <Box style={{height:"3px"}}/>
              <TableCashFlow assumptions={assumptions} financialData={financialData}/>

  

            </Paper>
          </Paper>
        </Grid>

        <Grid item xs={12} md={3} >
          <Paper className={classes.paperStyle} elevation={3}>
            <TableCompetition />
            <Box style={{height:"5px"}}/>
            <Button
              variant = "contained" 
              startIcon = {<AddCircleIcon />} 
              disableRipple
              // onClick = {handleNewValuation} 
              className = {classes.buttonStyle}
            
            >Ver Detalles</Button>
            <Box style={{height:"5px"}}/>
            <TableResults />
            <Box style={{height:"5px"}}/>
            <ChartCashFlow />
          </Paper>
        </Grid>
      </Grid>
      </Grid>
    </>
  )  
}
