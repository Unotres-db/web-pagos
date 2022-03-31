import React, { useEffect, useState } from 'react';

import { TextField, Container, Grid, Paper, Box, Typography, Button, Checkbox, FormGroup, FormControlLabel } from '@material-ui/core';
// import Autocomplete from '@mui/material/Autocomplete';
import { makeStyles } from '@material-ui/core/styles';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import SaveIcon from '@material-ui/icons/Save';

import api from '../services/api';
import useUnsavedWarning from '../hooks/useUnsavedWarning';
import useValuation from '../hooks/useValuation';

import Header from '../components/Header'; 
import TableHistoricalCompanyAverages from '../components/TableHistoricalCompanyAverages';
import FormAssumptionsOptions from '../components/FormAssumptionsOptions';
import FormFcffAssumption from '../components/FormFcffAssumption';
import FormBusinessAssumptions from '../components/FormBusinessAssumptions';
import FormCostOfCapitalAssumptions from '../components/FormCostOfCapitalAssumptions';
import TableDCFFinancials from '../components/TableDCFFinancials';
import TableDCFValuation from '../components/TableDCFValuation';

import ChartRevenueFcff from '../components/ChartRevenueFcff';
// import ChartRevenue from '../components/ChartRevenue';

import picCompany from '../assets/logocvx.png';

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
    minHeight:"660px",
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
    // backgroundColor: mainTheme.palette.secondary.main,
    backgroundColor: "#f0f8ff", //"whistesmoke", //"lightgray",
    padding: "2px",
  },
  textCheckboxStyle:{
    color:mainTheme.palette.primary.main,
    
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
  const [ Prompt, setIsDirty, setIsPristine ] = useUnsavedWarning();
  const [ isLoading, setIsLoading ]= useState(true);
  // const [ isValuationMinRequirements, setIsValuationMinRequirements ] = useState(false);
  const [ isUseAvgAsAssumption, setIsUseAvgAsAssumption ] = useState(true); // Uses historical averages as assumptions to forecast next years
  const [ isEstimateFcffOnly,setIsEstimateFcffOnly  ] = useState(false); // 
  const [ isCheckedDescOrder, setIsCheckedDescOrder] = useState(true);
  const [ isCheckedShowIncStatement, setIsCheckedShowIncStatement] = useState(true);
  const [ isCheckedShowPreviousYears, setIsCheckedShowPreviousYears] = useState(true);
  const [ companyIdSearch, setCompanyIdSearch] = useState("CVX");
  const [ historicalFinancialData, setHistoricalFinancialData ] = useState();
  const [ companyData, setCompanyData] = useState({symbol:"",shortName:"", sharesOustanding: 0, regularMarketPrice:0, marketCap:0});
  const [ assumptions, setAssumptions ] = useState({revenueGrowth:"", marginTarget:"", opexGrowth:"", interestGrowth:"", otherGrowth:"",cashFlowGrowthRate:"", taxRate:"", capexGrowth:"", nwcGrowth:"", perpetualGrowthRate: 2, cashFlowDiscretePeriod:5, companyBeta:1.2, riskFreeReturn:2, marketReturn:6, debtTotalRatio:30, costOfDebt:5});
  const [ calculatedCostOfCapital, setCalculatedCostOfCapital] = useState({ costOfEquity:0, costOfCapital:0});
  const [ historicalAverages, setHistoricalAverages ] = useState({revenueGrowth:0, marginTarget:0, opexGrowth:0, interestGrowth:0, otherGrowth:0, fcffGrowthRate:0, taxRate:0, capexGrowth:0, nwcGrowth:0});
  const [ valuation, setValuation] = useState({cashFlowAvgGrowth:0, sumOfCashFlowPresentValue:0, perpetuityValue:0, perpetuityPresentValue:0, enterpriseValue:0, cash:0, debt:0, equityValue:0, sharesOutstanding:0, targetStockPrice:0, marketCap:0})
  const { cashFlowAvgGrowth, sumOfCashFlowPresentValue, perpetuityValue, perpetuityPresentValue, enterpriseValue, cash, debt, equityValue, sharesOutstanding, targetStockPrice, marketCap } = valuation;
  const { revenueGrowth, marginTarget, opexGrowth, interestGrowth, otherGrowth, taxRate, capexGrowth, nwcGrowth, perpetualGrowthRate, cashFlowDiscretePeriod, companyBeta, riskFreeReturn, marketReturn, debtTotalRatio, costOfDebt} = assumptions
  const { costOfEquity, costOfCapital} = calculatedCostOfCapital

  const [ forecastedFinancialData, setForecastedFinancialData] = useState(Array.from({ length: 5 } , () => (
  { year:0,
    period:0,
    totalRevenue:0, 
    costOfRevenue: 0,
    grossProfit: 0,
    operatingExpenses: 0,
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
    cashFlow:0,
    discountedCashFlow:0 }
  )));

  const { calcForecastedCashFlow, calcValuation, calcHistoricalAverages, calcCostOfCapital } = useValuation ({assumptions, forecastedFinancialData, historicalFinancialData, isCheckedDescOrder, setHistoricalAverages,calculatedCostOfCapital, companyData, isEstimateFcffOnly}); //
  
  // useEffect(() => {
  //   setIsDirty()
  // }, []);

  useEffect (()=> {
    // alert("--useEffect []");
        // api.get('companies',{ companyIdSearch }
      const dataCompany = {companyIdSearch}
      function getCompany(){
        api.get('companies', 
        { headers :{ Authorization: companyIdSearch,}}
        ).then (response => {
          const company = response.data;
          setCompanyData({symbol:company.symbol,shortName:company.shortName, sharesOutstanding: company.marketCap/1000000/company.regularMarketPrice, regularMarketPrice:company.regularMarketPrice, marketCap:company.marketCap/1000000000})
  
        }).catch (function (err){
          if (err.response) {
            const errorMsg = Object.values(err.response.data);
            alert("warning - Error en acceso a base de datos" + errorMsg)
          }
        });  
      }

      function getFinancials(){ 
      // const data = { companyIdSearch };
      
      api.get('financials',{ headers :{
        Authorization: companyIdSearch,
      }
      }).then (response => {
          const results = response.data;
          let financialAuxArray = Array.from({ length: 4 } , () => ({ year: 0, totalRevenue:0, costOfRevenue: 0, grossProfit: 0, operatingExpenses: 0, depreciation: 0, interestExpense: 0, other: 0, incomeBeforeTax: 0, incomeTaxExpense: 0, netIncome: 0, ebit: 0, capitalExpenditures: 0, cash: 0, shortLongTermDebt:0, longTermDebt:0, totalCurrentAssets:0, totalCurrentLiabilities:0, workingCapitalChanges:0, cashFlow:0, discountedCashFlow:0 }));

          financialAuxArray[0].workingCapitalChanges = ((results[0].totalCurrentAssets-results[0].totalCurrentLiabilities)-(results[1].totalCurrentAssets-results[1].totalCurrentLiabilities))/1000000000;
          financialAuxArray[1].workingCapitalChanges = ((results[1].totalCurrentAssets-results[1].totalCurrentLiabilities)-(results[2].totalCurrentAssets-results[2].totalCurrentLiabilities))/1000000000;
          financialAuxArray[2].workingCapitalChanges = ((results[2].totalCurrentAssets-results[2].totalCurrentLiabilities)-(results[3].totalCurrentAssets-results[3].totalCurrentLiabilities))/1000000000;

          for (let i = 0 ; i < 4; i++){
            financialAuxArray[i].year = results[i].year;
            financialAuxArray[i].totalRevenue = results[i].totalRevenue/1000000000;
            financialAuxArray[i].costOfRevenue = results[i].costOfRevenue/-1000000000;
            financialAuxArray[i].grossProfit = results[i].grossProfit/1000000000;
            // financialAuxArray[i].operatingExpenses = results[i].operatingExpenses/-1000000000;
            financialAuxArray[i].operatingExpenses = results[i].sellingGeneralAdministrative/-1000000000 + results[i].otherOperatingExpenses/-1000000000 + results[i].researchDevelopment/-1000000000 + results[i].otherItems/-1000000000;
            financialAuxArray[i].depreciation = results[i].depreciation/-1000000000;
            financialAuxArray[i].interestExpense = results[i].interestExpense/1000000000;
            financialAuxArray[i].incomeBeforeTax = results[i].incomeBeforeTax/1000000000;
            financialAuxArray[i].other = financialAuxArray[i].incomeBeforeTax-( financialAuxArray[i].grossProfit+ financialAuxArray[i].operatingExpenses+financialAuxArray[i].depreciation+financialAuxArray[i].interestExpense); 
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
            financialAuxArray[i].cashFlow =  financialAuxArray[i].ebit + financialAuxArray[i].incomeTaxExpense - financialAuxArray[i].depreciation + financialAuxArray[i].capitalExpenditures + financialAuxArray[i].workingCapitalChanges;
          }  
          setHistoricalFinancialData(financialAuxArray);
          // setCompanyData({symbol:"CVX",shortName:"Chevron Corp.", shares: 1947.549952, regularMarketPrice:113.6, marketCap:221.242})
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
    getCompany();
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
      if (forecastedFinancialData[0].cashFlow <= 0){
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
    // if (checkValuationMinRequirements) {
    //   localStorage.setItem('valuation', JSON.stringify(valuation));
    //   localStorage.setItem('forecastedFinancialData', JSON.stringify(forecastedFinancialData));
    //   localStorage.setItem('calculatedCostOfCapital', JSON.stringify(calculatedCostOfCapital));
    // }
  }
},[assumptions]);  


async function handleValuation (){

  // axios.all([
  //   axios.post(`/my-url`, {
  //     myVar: 'myValue'
  //   }), 
  //   axios.post(`/my-url2`, {
  //     myVar: 'myValue'
  //   })
  // ])
  // .then(axios.spread((data1, data2) => {
  //   // output of req.
  //   console.log('data1', data1, 'data2', data2)
  // }));
  const userId = "martincsl";
  const companyId = companyData.symbol;
  const valuationData = { userId, companyId, cashFlowAvgGrowth, sumOfCashFlowPresentValue, perpetuityValue, perpetuityPresentValue, enterpriseValue, cash, debt, equityValue, sharesOutstanding, targetStockPrice, marketCap, revenueGrowth, marginTarget, opexGrowth, interestGrowth, otherGrowth, taxRate, capexGrowth, nwcGrowth, perpetualGrowthRate, cashFlowDiscretePeriod, companyBeta, riskFreeReturn, marketReturn, debtTotalRatio, costOfDebt, costOfEquity, costOfCapital } ;
  let dataToProcess=[];
  api.post('/valuations', valuationData ).then (response => {
    const { valuationId: valuationId, data } = response.data;
    console.log(valuationId);
    dataToProcess = forecastedFinancialData.map((item, index) => ({...item, valuationId:valuationId, forecastedId:valuationId + index.toString(), companyId:companyData.symbol})) 
    dataToProcess.map ((currElement)=> (
  
      api.post('/forecasted', currElement ).then (response => {
      
      }).catch (function (err){
        if (err.request){
          alert("Forecasted: Server not responding");
          return { valid: false, message:"Server not responding" };
        } 
        if ( err.response.status == 404) {
          alert("Forecasted: Database not found")
          return { valid: false, message:"Database not found" };
        }
        const errorMsg = Object.values(err.response.data);
        alert("post: forecasted " + errorMsg);
      })))
    
  }).catch (function (err){
    if (err.request){
      alert("Valuation: Server not responding");
      return { valid: false, message:"Server not responding" };
    } 
    if ( err.response.status == 404) {
      alert("Valuation: Database not found")
      return { valid: false, message:"Database not found" };
    }
    const errorMsg = Object.values(err.response.data);
    alert("post: valuation " + errorMsg);
  });

}

// function checkValuationMinRequirements() {
//   if ( assumptions.revenueGrowth !== "" &&
//         assumptions.marginTarget !== "" &&
//         assumptions.opexGrowth !== "" &&
//         assumptions.taxRate !== "" &&
//         assumptions.perpetualGrowthRate !== "" &&
//         assumptions.riskFreeReturn !=="" &&
//         assumptions.marketReturn !=="" &&
//         assumptions.companyBeta !== "" &&
//         assumptions.costOfDebt !==""
//   ){ 
//     setIsValuationMinRequirements(true);
//     return true
//   } else {
//       return false
//   }}

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
            // setAssumptions={setAssumptions}
          />
        ) : "" }

        <Box style={{height:"5px"}}/>
          { ! isLoading ? (
          <FormAssumptionsOptions 
            isEstimateFcffOnly = {isEstimateFcffOnly}
            setIsEstimateFcffOnly = {setIsEstimateFcffOnly}
          />
          ) : 0 }  

          {  ! isEstimateFcffOnly ? <div>
          <Box style={{height:"5px"}}/>  
          { ! isLoading ? (
          <FormBusinessAssumptions 
            assumptions={assumptions} 
            setAssumptions={setAssumptions}
          />
          ) : 0 }
          </div> : <div> 
          <Box style={{height:"5px"}}/>    
          <FormFcffAssumption 
            assumptions={assumptions} 
            setAssumptions={setAssumptions}
          />
          </div>
          }
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
                {/* <img src = {picCompany} alt="CompanyLogo" className={classes.logoStyle} style={{height:30}} />  */}
                {/* <Typography>{isValuationMinRequirements? "sem requisitos minimos": "com requisitos minimos"}</Typography> */}
                </Grid>
                <Grid item>
                <Box style={{height: "5px"}}/>  
                  <Typography align="center" variant="caption" style={{height:"30px"}}>{`${companyData.shortName} (${companyData.symbol})`}</Typography>
                </Grid>
              </Grid>
      
              <Grid item xs={4}>
                {/* <Typography align="center" variant="subtitle3" style={{height:"30px"}}>Chevron Corp.(CVX)</Typography> */}
              </Grid>
              <Grid item xs={4} >
                <Box display="flex" justifyContent="flex-end">
                  <Button onClick = {handleValuation} 
                          variant="contained" 
                          size="small" 
                          className={classes.buttonStyle} 
                          startIcon={<SaveIcon />} 
                          disableRipple
                          >Save Valuation
                  </Button>
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
              isEstimateFcffOnly={isEstimateFcffOnly}
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
  {Prompt}
  </>
  )
}
