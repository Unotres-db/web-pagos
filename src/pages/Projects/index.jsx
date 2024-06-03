import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { Grid, Paper, Box, Button, CircularProgress, Typography } from '@material-ui/core'; // Container,
import { makeStyles } from '@material-ui/core/styles';
import AddCircleIcon from '@mui/icons-material/AddCircle';

import { format, parseISO } from 'date-fns';

import Header from '../../components/Header'; 
import ChartCashFlow from './ChartCashFlow';
import FormPricesAssumptions from './FormPricesAssumptions';
import FormCostsAssumptions from './FormCostsAssumptions';
import FormSalesAssumptions from './FormSalesAssumptions';
import FormSalesDiscountAssumptions from './FormSalesDiscountAsumptions';
import ProjectOptions from './ProjectOptions';
import TablePL from './TablePL';
import TableCompetition from './TableCompetition';
import TableResults from './TableResults';
import ProjectSelector from './ProjectSelector';
// import DialogModal from '../../components/modals/DialogModal';
// import ChartFreeCashFlow from '../Valuation/ChartFreeCashFlow';
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
    minHeight: "560px", // "668px",
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
    backgroundColor:"#7b7d7b",
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
  textStyle:{
    color:mainTheme.palette.primary.main
  },
  TableContainerStyle: {
    width: "100%",
    minHeight: "560px", //"668px", 
    marginLeft: "3px",
    marginRight: "0px",
    color: "white",
    backgroundColor: "#f0f8ff", 
    // backgroundColor:mainTheme.palette.primary.main,
    padding: "2px",
  },
}));

export default function Projects () {
  const classes = useStyles();
  const userId = "martincsl";

  const [ dialogOptions, setDialogOptions ] = useState({severity:"",title:"",message:"",buttons:{}, action:""});
  const [ isDialogOpen, setIsDialogOpen ] = useState(false);
  const [ projectIdSearch, setProjectIdSearch] = useState("LP2");
  const [ projectSearchName, setProjectSearchname] = useState("LP2 - Loma Pyta - 2 Torres");
  const [ projectsList, setProjectsList] = useState([
    { 
      name:"Villa del Bosque",
      id:"VDB",
      shortName:"Villa del Bosque"
    },
    {
      name:"Villa Adela 2",
      id:"VA2",
      shortName:"Villa Adela 2"
    }, 
    {
      name:"Edificio Tres Kandu",
      id:"3KD",
      shortName:"Tres Kandu"
    },
    {
      name:"Edificio Torre Solana",
      id:"TSA",
      shortName:"Torre Solana" 
    },
    {
      name:"Edificio Torre Narciso",
      id:"TNO",
      shortName:"Torre Narciso" 
    },
    {
      name:"Tuyuti 2",
      id:"TI2",
      shortName:"Tuyuti 2"
    }
  ]);
  const currentYear = new Date().getFullYear();  // revisar
  const [ editMode, setEditMode ] = useState("blank"); 
  const [assumptions, setAssumptions]  = useState({ 
    QtyOfBuildings:1,initialDate:"",
    oneRoomQty:18, oneRoomSize:45, oneRoomPricePerSqrMts:1000,oneRoomTotalPrice:45000,
    twoRoomsQty:30, twoRoomsSize:60, twoRoomsPricePerSqrMts:1000,twoRoomsTotalPrice:65000,
    threeRoomsQty:0, threeRoomsSize:0, threeRoomsPricePerSqrMts:0,threeRoomsTotalPrice:0,
    parkingQty:0,parkingAvgprice:0,parkingTotalPrice:0,
    fisrtMonthOfSale:3, phaseOneSales:30, phaseTwoSales:50, phaseThreeSales:20,
                        phaseOneMonths:9, phaseTwoMonths:9, phaseThreeMonths:6,
    phaseOneDiscount:15.00, phaseTwoDiscount:7.50, phaseThreeDiscount:0.00,
    landSize:1000, landCostPerMts:405, landTotalCost:405000,
    constructionSize:3415,constructionCostPerMts:500.51, constructionCost:1880000})
  const totalMonths = assumptions? parseInt(assumptions.fisrtMonthOfSale) + parseInt(assumptions.phaseOneMonths) + parseInt(assumptions.phaseTwoMonths) + parseInt(assumptions.phaseThreeMonths) : 0;  
  const [ financialData, setFinancialData] = useState((Array.from({ length:5 }, (a,b) => ({ year:2023 + b , period:0, month:0, totalRevenue:0, costOfRevenue: 0, grossProfit: 0, grossProfitPercent:0, operatingExpenses: 0, depreciation: 0, interestExpense: 0, other: 0, incomeBeforeTax: 0, incomeTaxExpense: 0, netIncome: 0, ebit: 0, capitalExpenditures: 0, cash: 0, shortLongTermDebt:0, longTermDebt:0, workingCapitalChanges:0, cashFlow:0, discountedCashFlow:0 }))));
  const [ monthlyFinancialData, setMonthlyFinancialData]= useState((Array.from({ length:totalMonths }, (a,b) => ({ year:2023 + b , period:0, totalRevenue:0, costOfRevenue: 0, grossProfit: 0, grossProfitPercent:0, operatingExpenses: 0, depreciation: 0, interestExpense: 0, other: 0, incomeBeforeTax: 0, incomeTaxExpense: 0, netIncome: 0, ebit: 0, capitalExpenditures: 0, cash: 0, shortLongTermDebt:0, longTermDebt:0, workingCapitalChanges:0, cashFlow:0, discountedCashFlow:0 }))))
  const totalQty = parseInt(assumptions.oneRoomQty) + parseInt(assumptions.twoRoomsQty) + parseInt(assumptions.threeRoomsQty);
  const averagePrice = (assumptions.oneRoomTotalPrice*(assumptions.oneRoomQty/totalQty)) + (assumptions.twoRoomsTotalPrice*(assumptions.twoRoomsQty/totalQty)) + (assumptions.threeRoomsTotalPrice*(assumptions.threeRoomsQty/totalQty));
  // const totalSales = averagePrice 

  // const totalSales = ((parseInt(assumptions.averagePrice) * (parseInt(totalQty) * parseFloat(assumptions.phaseOneSales/100))))
  const totalSales = ((parseInt(averagePrice) * (parseInt(totalQty) * parseFloat(assumptions.phaseOneSales/100))))
                   + ((parseInt(averagePrice) * (parseInt(totalQty) * parseFloat(assumptions.phaseTwoSales/100))))
                   + ((parseInt(averagePrice) * (parseInt(totalQty) * parseFloat(assumptions.phaseThreeSales/100))))
  const totalCost = assumptions.landTotalCost + assumptions.constructionCost;
  const costFactor = totalCost/totalSales;
  
  function createMonthlyFinancialData (){
    let estFinancialDataArr = Array.from({ length: totalMonths } , () => ({ year: 0, period:0, month: 0, totalRevenue:0, costOfRevenue: 0, grossProfit: 0, grossProfitPercent:0, operatingExpenses: 0, depreciation: 0, interestExpense: 0, other: 0, incomeBeforeTax: 0, incomeTaxExpense: 0, netIncome: 0, ebit: 0, capitalExpenditures: 0, cash: 0, shortLongTermDebt:0, longTermDebt:0, workingCapitalChanges:0, cashFlow:0, discountedCashFlow:0 }));
    for (let i = 0 ; i < assumptions.fisrtMonthOfSale; i++){
      estFinancialDataArr[i].period = i 
      if (i < 13){
        estFinancialDataArr[i].year = 2023
      } else {
        estFinancialDataArr[i].year = 2023 + 1
      }
      if (i < 13){
        estFinancialDataArr[i].month = i + 1
      } else {
        estFinancialDataArr[i].month = i - 12 + 1
      }
      estFinancialDataArr[i].totalRevenue = 0
      estFinancialDataArr[i].costOfRevenue = 0
    }
    for (let i = assumptions.fisrtMonthOfSale; i < (assumptions.fisrtMonthOfSale + assumptions.phaseOneMonths); i++){
      estFinancialDataArr[i].period = i
      if (i < 13){
        estFinancialDataArr[i].year = 2023
      } else {
        estFinancialDataArr[i].year = 2023 + 1
      }
      if (i < 13){
        estFinancialDataArr[i].month = i + 1
      } else {
        estFinancialDataArr[i].month = i - (12 * ( estFinancialDataArr[i].year - 2023)) + 1
      }
      estFinancialDataArr[i].totalRevenue =((parseInt(averagePrice) * (parseInt(totalQty) * parseFloat(assumptions.phaseOneSales/100))))/assumptions.phaseOneMonths
      estFinancialDataArr[i].costOfRevenue = estFinancialDataArr[i].totalRevenue * costFactor
    }
    for (let i = (assumptions.fisrtMonthOfSale + assumptions.phaseOneMonths); i < (assumptions.fisrtMonthOfSale + assumptions.phaseOneMonths + assumptions.phaseTwoMonths); i++){
      estFinancialDataArr[i].period = i
      if (i < 12){
        estFinancialDataArr[i].year = 2023
      } else {
        estFinancialDataArr[i].year = 2023 + Math.floor(i/12)
      }
      if (i < 12){
        estFinancialDataArr[i].month = i + 1
      } else {
        estFinancialDataArr[i].month = i - (12 * ( estFinancialDataArr[i].year - 2023))
      }
      estFinancialDataArr[i].totalRevenue = ((parseInt(averagePrice) * (parseInt(totalQty) * parseFloat(assumptions.phaseTwoSales/100))))/assumptions.phaseTwoMonths
      estFinancialDataArr[i].costOfRevenue = estFinancialDataArr[i].totalRevenue * costFactor
    }
    for (let i = (assumptions.fisrtMonthOfSale + assumptions.phaseOneMonths + assumptions.phaseTwoMonths); i < (assumptions.fisrtMonthOfSale + assumptions.phaseOneMonths + assumptions.phaseTwoMonths + assumptions.phaseThreeMonths); i++){
      estFinancialDataArr[i].period = i
      if (i < 12){
        estFinancialDataArr[i].year = 2023
      } else {
        estFinancialDataArr[i].year = 2023 + Math.floor(i/12)
      }
      if (i < 12){
        estFinancialDataArr[i].month = i + 1
      } else {
        estFinancialDataArr[i].month = i - (12 * ( estFinancialDataArr[i].year - 2023)) + 1
      }
      estFinancialDataArr[i].totalRevenue = ((parseInt(averagePrice) * (parseInt(totalQty) * parseFloat(assumptions.phaseThreeSales/100))))/assumptions.phaseThreeMonths
      estFinancialDataArr[i].costOfRevenue = estFinancialDataArr[i].totalRevenue * costFactor
    }
    return estFinancialDataArr
  }


  useEffect(() => {
    setFinancialData([
      {year:2023, period:1, totalRevenue: 711909, costOfRevenue: 520909, grossProfit: 191000, grossProfitPercent:26.82, operatingExpenses: 117027, depreciation: 0, interestExpense: 76768, other: 0, incomeBeforeTax: -2594, incomeTaxExpense: 0, netIncome: -2594, ebit: 73874, capitalExpenditures: 0, cash: 0, shortLongTermDebt:0, longTermDebt:0, workingCapitalChanges:-898680, cashFlow:-901274, discountedCashFlow:0},
      {year:2024, period:2, totalRevenue: 2663584, costOfRevenue:  1948963, grossProfit:  714621, grossProfitPercent:26.82, operatingExpenses: 201190, depreciation: 0, interestExpense: 54641, other: 0, incomeBeforeTax: 458790, incomeTaxExpense: 0, netIncome: 458790, ebit: 513432, capitalExpenditures: 0, cash: 0, shortLongTermDebt:0, longTermDebt:0, workingCapitalChanges:41515, cashFlow:500305, discountedCashFlow:0},
      {year:2025, period:3, totalRevenue: 2109877, costOfRevenue:  1543812, grossProfit: 566065, grossProfitPercent:26.82, operatingExpenses: 163138, depreciation: 0, interestExpense: 28181, other: 0, incomeBeforeTax: 381147, incomeTaxExpense: 0, netIncome: 381147, ebit: 402928, capitalExpenditures: 0, cash: 0, shortLongTermDebt:0, longTermDebt:0, workingCapitalChanges:602449, cashFlow:983495, discountedCashFlow:0},
      {year:2026, period:4, totalRevenue:206800, costOfRevenue: 151317, grossProfit: 55483, grossProfitPercent:26.82, operatingExpenses: 14791, depreciation: 0, interestExpense: 106, other: 0, incomeBeforeTax: 40586, incomeTaxExpense: 0, netIncome: 40586, ebit: 40692, capitalExpenditures: 0, cash: 0, shortLongTermDebt:0, longTermDebt:0, workingCapitalChanges:254717, cashFlow:209303, discountedCashFlow:0},
    ])
    setMonthlyFinancialData(createMonthlyFinancialData())
  }, []);

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
            <Box style={{height:"5px"}} />

            <FormSalesDiscountAssumptions assumptions={assumptions} setAssumptions={setAssumptions} editMode={editMode} />

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
              <Typography variant="caption" gutterBottom className={classes.textStyle}>{`Total de Deptos.: ${totalQty}, Precio Promedio Us$: ${Intl.NumberFormat('en-US',{style:"decimal", minimumFractionDigits:0,maximumFractionDigits:0}).format(averagePrice)}, Total de Meses del Proyecto: ${totalMonths},`}</Typography> 
              <Typography variant="caption" className={classes.textStyle}>{` Total Ventas: 2,760,000`}</Typography> 

              {/* <Typography variant="caption">{`Total de Deptos.: ${totalQty} Precio Promedio: ${averagePrice} `}</Typography>  */}

              <ProjectOptions editMode={editMode} />
              <Box style={{height:"10px"}}/>
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
            <Paper>
              <ChartCashFlow elevation={3}/>

            </Paper>
          </Paper>
        </Grid>
      </Grid>
      </Grid>
    </>
  )  
}
