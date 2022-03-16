import React, { useEffect, useState } from 'react';

import { TextField, Container, Grid, Paper, Box, Typography, Button, Checkbox, FormGroup, FormControlLabel } from '@material-ui/core';
// import Autocomplete from '@mui/material/Autocomplete';
import { makeStyles } from '@material-ui/core/styles';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import SaveIcon from '@material-ui/icons/Save';

import api from '../services/api';
// import useForm from '../hooks/useForm';

import Header from '../components/Header'; 
import FormBusinessAssumptions from '../components/FormBusinessAssumptions';
import FormCostOfCapitalAssumptions from '../components/FormCostOfCapitalAssumptions';
// import TableDCFAssumptions from '../components/TableDCFAssumptions';
import TableDCFFinancials from '../components/TableDCFFinancials';
import TableDCFValuation from '../components/TableDCFValuation';
import TableHistoricalCompanyAverages from '../components/TableHistoricalCompanyAverages';
import ChartRevenueFcff from '../components/ChartRevenueFcff';
import ChartRevenue from '../components/ChartRevenue';


// import logoXOM from '../assets/logoxom.png';
// import picExxon from '../assets/logoxom.png';
import useValuation from '../hooks/useValuation';
import picCompany from '../assets/logocvx.png';
// import picCompany from '../assets/logoaon.jpg';


const useStyles = makeStyles( (mainTheme) => ({
  contentStyle: {
    position: 'absolute',
    top: '65px',
  },
  container:{
    position:'absolute',
  },
  buttonStyle: {
    color: mainTheme.palette.primary.main,
    font: "14px",
    backgroundColor:mainTheme.palette.secondary.main,
    textTransform:"none",
    margin: "0px",
    "&:hover": {
      backgroundColor:"#F49506ed"
    },
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
    position: 'sticky',
    width: "100%",   
    height:"660px",
    marginLeft:"3px",
    marginRight:"0px",
    color: "white",
    // backgroundColor: mainTheme.palette.primary.main,
    backgroundColor: "#f0f8ff", //"whistesmoke", //"lightgray",
    padding: "10px",
  },
  CompanyInfo: {
    marginLeft:"3px",
    marginRight:"0px",
    color: "black",
    backgroundColor: "white",
    padding: "10px",
  },
  TableContainerStyle: {
    width: "100%",   
    height:"660px", // vai ser do tamanho do conteudo da tabela
    marginLeft:"3px",
    marginRight:"0px",
    color: "white",
    // backgroundColor: mainTheme.palette.primary.main,
    backgroundColor: "#f0f8ff", //"whistesmoke", //"lightgray",
    padding: "10px",
  },
  textCheckboxStyle:{
    color:mainTheme.palette.primary.main
  },
  iconStyle: {
    textAlign: "center",
    display: "block",
    justifyContent: "center",
    alignItems: "center",
    margin: "auto",
    marginTop: "10px",
  }
}));

export default function DiscCashFlow (){

  const classes = useStyles();
  const [ isLoading, setIsLoading ]= useState(true);
  const [ isUsingAverageAsAssumption, setIsUsingAverageAsAssumption ]= useState(true);
  const [ isCheckedDescOrder, setIsCheckedDescOrder] = useState(true);
  const [ isCheckedShowIncStatement, setIsCheckedShowIncStatement] = useState(true);
  const [ isCheckedShowPreviousYears, setIsCheckedShowPreviousYears] = useState(true);
  const [ companyIdSearch, setCompanyIdSearch] = useState("CVX");
  const [ historicalFinancialData, setHistoricalFinancialData ] = useState();
  const [ companyData, setCompanyData] = useState({symbol:"",shortName:"", shares: 0, regularMarketPrice:0});
  const [ assumptions, setAssumptions ] = useState({revenueGrowth:"", marginTarget:"", opexGrowth:"", interestGrowth:"", otherGrowth:"",fcffGrowthRate:"", taxRate:"", capexGrowth:"", nwcGrowth:"", perpetualGrowthRate: 2, cashFlowDiscretePeriod:5, companyBeta:1.2, riskFreeReturn:2, marketReturn:6, debtEquityRatio:30, costOfDebt:5});
  const [ calculatedCostOfCapital, setCalculatedCostOfCapital] = useState({ costOfEquity:0, costOfCapital:0});
  const [ historicalAverages, setHistoricalAverages ] = useState({revenueGrowth:0, marginTarget:0, opexGrowth:0, interestGrowth:0, otherGrowth:0, fcffGrowthRate:0, taxRate:0, capexGrowth:0, nwcGrowth:0});
  // let  historicalAverages = {revenueGrowth:0, marginTarget:0, opexGrowth:0, interestGrowth:0, otherGrowth:0, fcffGrowthRate:0, taxRate:0, capexGrowth:0, nwcGrowth:0};
  const [ discountedFreeCashFlow, setDiscountedFreeCashFlow ] = useState([{year:0,fcff:0},{year:0,fcff:0},{year:0,fcff:0},{year:0,fcff:0},{year:0,fcff:0}]);
  const [ valuation, setValuation] = useState({discreteNPV:0, perpetuityValue:0, perpetuityPresentValue:0,enterpriseValue:0, equityValue:0, fcffAvgGrowth:0, targetStockPrice:0})
  const [ showFinancialData, setShowFinancialData]  =useState([{}]);
  // const [ freeCashFlow, setFreeCashFlow] = useState(Array.from({ length: 10 } , () => (

  const [ forecastedFinancialData, setForecastedFinancialData] = useState(Array.from({ length: 5 } , () => (
  { year: 0,
    totalRevenue:0, 
    costOfRevenue: 0,
    grossProfit: 0,
    totalOperatingExpenses: 0,
    depreciation: 0,
    interestExpense: 0,
    other: 0,
    incomeBeforeTax: 0,
    incomeTaxExpense: 0, 
    netIncome: 0,
    ebit: 0,
    capitalExpenditures: 0,
    cash: 0,
    shortLongTermDebt:0,
    longTermDebt:0,
    workingCapitalChanges:0,
    fcff:0,
    discountedFcff:0 }
  )));

  // const companiesSymbols = [ {symbol: "CVX", CompanyName:"Chevron Corp"},{symbol: "XOM", CompanyName:"Exxon Corp"},{symbol: "PBR", CompanyName:"Petrobras"} ]
  const { calcForecastedCashFlow, calcValuation, calcHistoricalAverages, calcCostOfCapital } = useValuation ({assumptions, setAssumptions, forecastedFinancialData, setForecastedFinancialData, discountedFreeCashFlow, setDiscountedFreeCashFlow, historicalFinancialData, valuation, setValuation, isCheckedDescOrder, historicalAverages, setHistoricalAverages,calculatedCostOfCapital, setCalculatedCostOfCapital, companyData}); //
  
  useEffect (()=> {
    // alert("--useEffect []");

      function getFinancials(){ 
      // const data = { companyIdSearch };
        api.get('financials',{ headers :{
          Authorization: companyIdSearch,
        }
        }).then (response => {
          const results = response.data;
          let financialAuxArray = Array.from({ length: 4 } , () => ({ year: 0, totalRevenue:0, costOfRevenue: 0, grossProfit: 0, totalOperatingExpenses: 0, depreciation: 0, interestExpense: 0, other: 0, incomeBeforeTax: 0, incomeTaxExpense: 0, netIncome: 0, ebit: 0, capitalExpenditures: 0, cash: 0, shortLongTermDebt:0, longTermDebt:0, totalCurrentAssets:0, totalCurrentLiabilities:0, workingCapitalChanges:0, fcff:0, discountedFcff:0 }));

          for (let i = 0 ; i < 4; i++){
            financialAuxArray[i].year = results[i].year;
            financialAuxArray[i].totalRevenue = results[i].totalRevenue/1000000000;
            financialAuxArray[i].costOfRevenue = results[i].costOfRevenue/-1000000000;
            financialAuxArray[i].grossProfit = results[i].grossProfit/1000000000;
            // financialAuxArray[i].totalOperatingExpenses = results[i].totalOperatingExpenses/-1000000000;
            financialAuxArray[i].totalOperatingExpenses=results[i].sellingGeneralAdministrative/-1000000000 + results[i].otherOperatingExpenses/-1000000000 + results[i].researchDevelopment/-1000000000 + results[i].otherItems/-1000000000;
            financialAuxArray[i].depreciation = results[i].depreciation/-1000000000;
            financialAuxArray[i].interestExpense = results[i].interestExpense/1000000000;
            financialAuxArray[i].incomeBeforeTax = results[i].incomeBeforeTax/1000000000;
            financialAuxArray[i].other = financialAuxArray[i].incomeBeforeTax-( financialAuxArray[i].grossProfit+ financialAuxArray[i].totalOperatingExpenses+financialAuxArray[i].depreciation+financialAuxArray[i].interestExpense); 
            financialAuxArray[i].incomeTaxExpense = (results[i].incomeTaxExpense/1000000000)*-1;
            financialAuxArray[i].netIncome = results[i].netIncome/1000000000;
            // financialAuxArray[i].ebit = results[i].ebit/1000000000;
            financialAuxArray[i].ebit =  financialAuxArray[i].incomeBeforeTax - financialAuxArray[i].interestExpense;

            financialAuxArray[i].capitalExpenditures = results[i].capitalExpenditures/1000000000;
            financialAuxArray[i].cash = results[i].cash/1000000000;
            financialAuxArray[i].shortLongTermDebt = results[i].shortLongTermDebt/1000000000;
            financialAuxArray[i].longTermDebt = results[i].longTermDebt/1000000000;
            financialAuxArray[i].totalCurrentAssets = results[i].totalCurrentAssets/1000000000;
            financialAuxArray[i].totalCurrentLiabilities = results[i].totalCurrentLiabilities/1000000000;
            // financialAuxArray[i].workingCapitalChanges = (financialAuxArray[i].totalCurrentAssets-financialAuxArray[i].totalCurrentLiabilities)-(financialAuxArray[i+1].totalCurrentAssets-financialAuxArray[i+1].totalCurrentLiabilities);
            financialAuxArray[i].fcff =  financialAuxArray[i].ebit + financialAuxArray[i].incomeTaxExpense - financialAuxArray[i].depreciation + financialAuxArray[i].capitalExpenditures + financialAuxArray[i].workingCapitalChanges;
            // console.log(financialAuxArray[i].fcff);
          }  
          // console.log(financialAuxArray[2].fcff);
          financialAuxArray[0].workingCapitalChanges=(financialAuxArray[0].totalCurrentAssets-financialAuxArray[0].totalCurrentLiabilities)-(financialAuxArray[1].totalCurrentAssets-financialAuxArray[1].totalCurrentLiabilities);
          financialAuxArray[1].workingCapitalChanges=(financialAuxArray[1].totalCurrentAssets-financialAuxArray[1].totalCurrentLiabilities)-(financialAuxArray[2].totalCurrentAssets-financialAuxArray[2].totalCurrentLiabilities);
          financialAuxArray[2].workingCapitalChanges=(financialAuxArray[2].totalCurrentAssets-financialAuxArray[2].totalCurrentLiabilities)-(financialAuxArray[3].totalCurrentAssets-financialAuxArray[3].totalCurrentLiabilities);

          setHistoricalFinancialData(financialAuxArray);
          setCompanyData({symbol:"CVX",shortName:"Chevron Corp.", shares: 1870, regularMarketPrice:166.31})
          setIsLoading(false);
      }).catch (function (err){
        if (err.response) {
          const errorMsg = Object.values(err.response.data);
          alert("warning - Error en acceso a base de datos" + errorMsg)
        } else if(err.request) {
            alert("warning - Error en acceso a servidor")
          } else {
              alert("warning - Error en acceso a servidor")
            }
      });
      setIsLoading(false);
    }

    getFinancials();
    // if (! isLoading) {
    if (historicalFinancialData) {  
      // alert("--passou em !isLoading");
      // calcHistoricalAverages();
      // calcCostOfCapital()
      // calcValuation();
    }
},[]);

useEffect (()=> {
  
  if (historicalFinancialData){
    // alert ("--useEffect [historicalFinancialData]")
    
    calcHistoricalAverages();
    // calcCostOfCapital()
    // calcValuation();
  }
},[historicalFinancialData, companyData]);  

useEffect (()=> {
  // alert("--passou em useEffect[historicalFinancialData");
  if (historicalFinancialData){
    // alert ("--useEffect [historicalAverages]")
    setCalculatedCostOfCapital(calcCostOfCapital());  // testar undefined na funcao
    // calcValuation();
    setForecastedFinancialData(calcForecastedCashFlow());
    if (forecastedFinancialData){
      if (forecastedFinancialData[0].fcff <= 0){
        // alert("Confirma ultimo flujo como negativo?");
      } 
    }
  }
},[historicalAverages]);  

useEffect (()=> {
  if (historicalFinancialData){
    setValuation(calcValuation());
  }
},[forecastedFinancialData]);  

useEffect (()=> {
  if (historicalFinancialData){
    setCalculatedCostOfCapital(calcCostOfCapital());
    setForecastedFinancialData(calcForecastedCashFlow());
    setValuation(calcValuation());
    // calcValuation();
  }
},[assumptions]);  

    const handleChangeCheckDescOrder = () => {
      if (isCheckedDescOrder) {
        setIsCheckedDescOrder(false);
      } else {
        setIsCheckedDescOrder(true);
      }  
    };
    const handleChangeCheckShowIncStatement = () => {
      if (isCheckedShowIncStatement) {
        setIsCheckedShowIncStatement(false);
      } else {
        setIsCheckedShowIncStatement(true);
      }  
    };
    const handleChangeCheckShowPreviousYears = () => {
      if (isCheckedShowPreviousYears) {
        setIsCheckedShowPreviousYears(false);
      } else {
        setIsCheckedShowPreviousYears(true);
      }  
    };

    return (

    <>
    <Header />
    
    { historicalFinancialData ? <div>
    {/* <Container fixed> */}
    <Grid container direction="column" alignItems="center" style = {{ minHeight: '80vh'}} className={classes.container} >

      <Grid item xs={12} style = {{ minHeight: '69px'}} /> 

      <Grid item container direction="row" spacing={1} >
      {/* <Typography>{historicalFinancialData.map ( (currElement) => currElement.totalRevenue)}</Typography> */}
        <Grid item xs={12} md={3} >
          <Paper className={classes.paperStyle} elevation={6}>
          { ! isLoading ? (
            <TableHistoricalCompanyAverages 
            calcHistoricalAverages={calcHistoricalAverages}
              historicalFinancialData={historicalFinancialData}
              historicalAverages={historicalAverages}
              // setHistoricalAverages={setHistoricalAverages}
              setAssumptions={setAssumptions}
            />
          ) : 0 }
            {/* <Typography align="center" variant="subtitle3">Assumptions:</Typography> */}
            {/* <TableDCFAssumptions 
                fcffGrowthRate={assumptions.fcffGrowthRate}
                taxRate={assumptions.taxRate} 
                discountRate={assumptions.discountRate}
                perpetualGrowthRate={assumptions.perpetualGrowthRate}
                capexPercentage={assumptions.capexPercentage}
                workingCapitalChangesPercentage={assumptions.workingCapitalChangesPercentage}
            /> */}
            <Box style={{height:"5px"}}/>
            { ! isLoading ? (
            <FormBusinessAssumptions 
              assumptions={assumptions} 
              setAssumptions={setAssumptions}
            />
            ) : 0 }
            <Box style={{height:"5px"}}/>
            { ! isLoading ? (
            <FormCostOfCapitalAssumptions 
              assumptions={assumptions} 
              setAssumptions={setAssumptions}
              calculatedCostOfCapital={calculatedCostOfCapital}
            />
            ) : 0 }
          </Paper>
        </Grid>  

        <Grid item xs={12} md={6} > 
    
          <Paper className={classes.TableContainerStyle} elevation={6}>

            <Paper className={classes.CompanyInfo}>
            {companyData ? <div>
              <Grid container spacing={2}>
                <Grid container item xs={4}  spacing={1}>
                  <Grid item>
                  <img src = {picCompany} alt="CompanyLogo" className={classes.logoStyle} style={{height:30}} /> 
                  </Grid>
                  <Grid item>
                  <Box style={{height: "5px"}}/>  
                    <Typography align="center" variant="subtitle3" style={{height:"30px"}}>{`${companyData.shortName} (${companyData.symbol})`}</Typography>
                  </Grid>
                </Grid>
        
                <Grid item xs={4}>
                  {/* <Typography align="center" variant="subtitle3" style={{height:"30px"}}>Chevron Corp.(CVX)</Typography> */}
                </Grid>
                <Grid item xs={4} >
                  <Box display="flex" justifyContent="flex-end">
                    {/* <Button variant="contained" size="small" className={classes.buttonStyle} startIcon={<SaveIcon />} disableRipple>Generate Pdf</Button> */}
                    <Button variant="contained" size="small" className={classes.buttonStyle} startIcon={<SaveIcon />} disableRipple>Save Valuation</Button>
                  </Box>  
                </Grid>
              </Grid>
              </div> :0}
              <FormGroup style={{height:"20px"}}> 
                <Grid container >
                  <Grid item xs={12} md={4} >
                    <Box display="flex" justifyContent="flex-start">
                      <FormControlLabel className={classes.textCheckboxStyle}
                        control = {<Checkbox defaultChecked disableRipple = {true} size="small"/>} 
                        label = "Show Income Statement" 
                        onChange = {handleChangeCheckShowIncStatement}
                    />
                    </Box>
                  </Grid>
                  <Grid item xs={12} md={4} >
                    <Box display="flex" justifyContent="center">
                      <FormControlLabel className={classes.textCheckboxStyle}
                        control = {<Checkbox defaultChecked disableRipple = {true} size="small"/>} 
                        label = "Show previous years" 
                        onChange = {handleChangeCheckShowPreviousYears}
                      />
                    </Box>
                  </Grid>
                  <Grid item xs={12} md={4} >
                  <Box display="flex" justifyContent="flex-end">

                    <FormControlLabel className={classes.textCheckboxStyle}
                      control = {<Checkbox defaultChecked disableRipple = {true} size="small"/>} 
                      label = "Show years in descending order" 
                      onChange = {handleChangeCheckDescOrder}
                    />
                    </Box>
                  </Grid>

                </Grid>
              </FormGroup>
              {/* <FormGroup>
                <FormControlLabel 
                  control = {<Checkbox defaultChecked disableRipple = {true} size="small"/>} 
                  label = "Show Income Statement" 
                  onChange = {handleChangeCheckIncStatement}
                  // style={{backgroundColor:"red"}}
                />
              </FormGroup> */}
            </Paper>
            {/* { (historicalFinancialData !== undefined) ? <div> */}
              <TableDCFFinancials 
                historicalFinancialData={historicalFinancialData} 
                forecastedFinancialData={forecastedFinancialData} 
                isCheckedDescOrder={isCheckedDescOrder}
                isCheckedShowIncStatement={isCheckedShowIncStatement}
                isCheckedShowPreviousYears={isCheckedShowPreviousYears}
              />
              {/* </div>
            : 0 } */}
          </Paper>
        </Grid>

        <Grid item xs={12} md={3} >
          <Paper className={classes.paperStyle} elevation={6}>
            { ! isLoading ? <div>
            <TableDCFValuation 
              valuation = {valuation} 
              historicalFinancialData = {historicalFinancialData} 
              calculatedCostOfCapital = {calculatedCostOfCapital}
              assumptions = {assumptions}
              companyData = {companyData}
            />
            <Box style={{height:"8px"}}/>
            <Paper elevation ={6} style={{height:'180px'}}>
              <ChartRevenueFcff 
                historicalFinancialData = {historicalFinancialData}
                forecastedFinancialData = {forecastedFinancialData} 
                isCheckedDescOrder = {isCheckedDescOrder}
              />
            </Paper>
            {/* <Paper elevation ={6} style={{height:'150px'}}>
              <ChartRevenue 
                historicalFinancialData = {historicalFinancialData}
                forecastedFinancialData = {forecastedFinancialData} 
                isCheckedDescOrder = {isCheckedDescOrder}
              />
            </Paper> */}
            </div> :0} 
          </Paper>
        </Grid>
      </Grid>
      </Grid>
    
    <Grid container direction="column" alignItems="center" style= {{ minHeight: '5vh'}} />

    {/* </Container> */}
  </div> : 0} 
    </>
  )
}

  // const [historicalFinancialData, setHistoricalFinancialData] = useState([
  // { 
  //   year: 2021,
  //   totalRevenue: 152, 
  //   costOfRevenue: -112.39,
  //   grossProfit: 39.69,
  //   totalOperatingExpenses: -14.05,
  //   depreciation: -6.5,
  //   interestExpense: -1.75,
  //   other: 1.52,
  //   incomeBeforeTax: 18.91,
  //   incomeTaxExpense: -4.73, 
  //   netIncome: 14.19,
  //   ebit: 20.66,
  //   capitalExpenditures: -5.0,
  //   cash: 20.45,
  //   shortLongTermDebt:0.70,
  //   longTermDebt:6.15,
  //   workingCapitalChanges:-1,
  //   fcff:16.44,
  //   discountedFcff:0
  // },
  // {
  //   year: 2020,
  //   totalRevenue: 132.25, 
  //   costOfRevenue: -100.35,
  //   grossProfit: 31.90,
  //   totalOperatingExpenses: -12.54,
  //   depreciation: -6,
  //   interestExpense: -1.5,
  //   other: 1.32,
  //   incomeBeforeTax: 13.18,
  //   incomeTaxExpense: -3.29, 
  //   netIncome: 9.88,
  //   ebit:14.68,
  //   capitalExpenditures: -5,
  //   cash: 10.32,
  //   shortLongTermDebt:0.65,
  //   longTermDebt:6.05,
  //   workingCapitalChanges:-1,
  //   fcff:11.38, 
  //   discountedFcff:0

  // },
  // {
  //   year: 2019,
  //   totalRevenue: 115, 
  //   costOfRevenue: -89.60,
  //   grossProfit: 25.40,
  //   totalOperatingExpenses: -11.2,
  //   depreciation: -5.5,
  //   interestExpense: -1.25,
  //   other: 1.15,
  //   incomeBeforeTax: 8.60,
  //   incomeTaxExpense: -2.15, 
  //   netIncome: 6.45,
  //   ebit:9.85,
  //   capitalExpenditures: -5,
  //   cash: 8.78,
  //   shortLongTermDebt:0.60,
  //   longTermDebt:5.95,
  //   workingCapitalChanges:-1,
  //   fcff: 7.20,
  //   discountedFcff:0
  // },
  // {
  //   year: 2018,
  //   totalRevenue: 100, 
  //   costOfRevenue: -80,
  //   grossProfit: 20,
  //   totalOperatingExpenses: -10,
  //   depreciation: -5,
  //   interestExpense: -1,
  //   other: 1,
  //   incomeBeforeTax: 5,
  //   incomeTaxExpense: -1.25, 
  //   netIncome: 3.75,
  //   ebit:6,
  //   capitalExpenditures: -5,
  //   cash: 5.78,
  //   shortLongTermDebt:0.50,
  //   longTermDebt:5.90,
  //   workingCapitalChanges:-1,
  //   fcff: 3.75,
  //   discountedFcff:0
  // }]);
  // const [ historicalFinancialData, setHistoricalFinancialData]= useState([]);
  // const [ historicalFinancialData, setHistoricalFinancialData ] = useState(Array.from({ length: 4 } , () => (
  // let historicalFinancialData = (Array.from({ length: 4 } , () => (
  //   { year: 0,
  //     totalRevenue:0, 
  //     costOfRevenue: 0,
  //     grossProfit: 0,
  //     totalOperatingExpenses: 0,
  //     depreciation: 0,
  //     interestExpense: 0,
  //     other: 0,
  //     incomeBeforeTax: 0,
  //     incomeTaxExpense: 0, 
  //     netIncome: 0,
  //     ebit: 0,
  //     capitalExpenditures: 0,
  //     cash: 0,
  //     shortLongTermDebt:0,
  //     longTermDebt:0,
  //     workingCapitalChanges:0,
  //     fcff:0,
  //     discountedFcff:0 }
  //   )));




        // const results = response.data;
        // console.log(results);
        // setHistoricalFinancialData(response.data);
      //   // for (let i = 0; i < historicalFinancialData.length-1 ; i++) {
      //   for (let i = 0 ; i < 4; i++){
  
      //     historicalFinancialData[i].year = results[i].year
      //     historicalFinancialData[i].totalRevenue = results[i].totalRevenue/1000000000
      //     historicalFinancialData[i].costOfRevenue = results[i].costOfRevenue/1000000000
      //     historicalFinancialData[i].grossProfit = results[i].grossProfit/1000000000
      //     historicalFinancialData[i].totalOperatingExpenses = results[i].totalOperatingExpenses/-1000000000
      //     historicalFinancialData[i].depreciation = results[i].depreciation/-1000000000
      //     historicalFinancialData[i].interestExpense = results[i].interestExpense/1000000000
      //     // historicalFinancialData[i].other = results[i].other/1000000000 // calculated field
      //     historicalFinancialData[i].incomeBeforeTax = results[i].incomeBeforeTax/1000000000
      //     historicalFinancialData[i].incomeTaxExpense = results[i].incomeTaxExpense/1000000000
      //     historicalFinancialData[i].netIncome = results[i].netIncome/1000000000
      //     historicalFinancialData[i].capitalExpenditures = results[i].capitalExpenditures/1000000000
      //     historicalFinancialData[i].cash = results[i].cash/1000000000
      //     historicalFinancialData[i].shortLongTermDebt = results[i].shortLongTermDebt/1000000000
      //     historicalFinancialData[i].longTermDebt = results[i].longTermDebt/1000000000
      //     // historicalFinancialData[i].workingCapitalChanges = 0
      //     // historicalFinancialData[i].fcff = 0
      //   // }))    
      //   }