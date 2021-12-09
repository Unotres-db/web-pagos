import React from 'react';
import { useHistory } from 'react-router-dom';

import axios from "axios";
import api from '../services/api';
import Header from '../components/Header';
import { Grid, Typography, Button } from '@material-ui/core';
import { LeakAddTwoTone } from '@material-ui/icons';

export default function Update () {

  const history = useHistory ();
 
  var financialData = Array.from(Array(4), () => {
    return { financialsId:"", companyId:"", costOfRevenue: "", totalRevenue: "", netIncome: "" };
  });

  var financialQtrData = Array.from(Array(4), () => {
    return { financialsId:"", companyId:"", costOfRevenue: "", totalRevenue: "", netIncome: "" };
  });

  var summaryData = { 
    companyId:"", 
    marketCap:"",
    beta:"",
    regularMarketPrice:"",
    fiftyTwoWeekHigh:"",
    fiftyTwoWeekLow:"",
    dividendRate:"",
    dividendYield:"",
    payoutRatio:"",
    exDividendDate:"",
    fiveYearAvgDividendYield:"",
    trailingAnnualDividendRate:"",
    trailingAnnualDividendYield:"",
    forwardPE:"", 
    trailingPE:"",
 };

  var companyData = { 
    companyId: "",
    exchange: "",
    exchangeTimezoneName: "",
    exchangeTimezoneShortName: "",
    gmtOffSetMilliseconds: "",
    isEsgPopulated: "",
    longName: "",
    market: "",
    messageBoardId: "",
    quoteType: "",
    shortName: "",
    symbol: "",
  } 

  async function handleFinancials (){
    alert("entrou em handlefinancials");
    for (let i = 0; i < financialData.length; i++) {

    // verifica se a informacao dos dados financeiros ja esta no banco de dados
    try {
      
      const response = await api.get ('/financials', { headers: { Authorization: financialData[i].financialsId }})
        try {
      
          const data =  financialData[i]  ;
          const response = await api.put ('/financials', data);
          // return { valid: true, message:"Éxito en actualización de datos financieros" };
        } catch (err) {
            const errorMsg = Object.values(err.response.data);
          }
        // se houve algum erro na busca da empresa...
      } catch (err) {
        console.log(err);
        // if (err.request){
        //   console.log("Sin respuesta de la base de datos");
        //   return { valid: false, message:"Sin respuesta de la base de datos" };
        // }
        if (err.response.status == 404) {
          // se a empresa nao esta na base, inclui como novo registro
          console.log("Frontend: datos de este periodo de financials no existen en la base de datos");
          try {
            // tenta incluir nova
  
            // const data =  companyData ;
            const data = financialData[i];
            const response = await api.post('/financials', data );
            // return { valid: true, message:"Éxito en inclusión de datos financieros" };
            // se nao conseguiu, ve a msg de erro
          } catch (err) {
              const errorMsg = Object.values(err.response.data);
              alert("Error en inclusión de datos financieros");
              // return { valid: false, message:"Error en inclusión de datos financieros" };
            }
        } else {
          // se...
            const errorMsg = Object.values(err.response.data);
            alert("Error en inicio de sessión");
            // return { valid: false, message:"Error en actualización de datos financieros" };
          }
        }
    }// for
  }

  async function handleCompany(){
    
    // busca a empresa na base de dados 
    try {
    alert(companyData.companyId);
    const response = await api.get ('/companies', { headers: { Authorization: companyData.companyId }})
      try {
        const data =  companyData  ;
        const response = await api.put ('/companies', data);
        alert("--alteracao deu certo");
        return { valid: true, message:"Éxito en actualización de empresa" };
      } catch (err) {
          const errorMsg = Object.values(err.response.data);
        }
      // se houve algum erro na busca da empresa...
    } catch (err) {
      console.log(err);
      // if (err.request){
      //   console.log("Sin respuesta de la base de datos");
      //   return { valid: false, message:"Sin respuesta de la base de datos" };
      // }
      if (err.response.status == 404) {
        // se a empresa nao esta na base, inclui como novo registro
        console.log("Frontend: empresa no existe en la base de datos");
        try {
          // tenta incluir nova

          const data =  companyData  ;
          const response = await api.post('/companies', data );
          alert("--inclusao deu certo");
          return { valid: true, message:"Éxito en inclusión de la empresa" };
          // se nao conseguiu, ve a msg de erro
        } catch (err) {
            const errorMsg = Object.values(err.response.data);
            alert("Error en inclusión de solcitud-Empresa");
            return { valid: false, message:"Error en inclusión de empresa" };
          }
      } else {
        // se...
          const errorMsg = Object.values(err.response.data);
          alert("Error en inicio de sessión");
          return { valid: false, message:"Error en actualización de empresa" };
        }
      }
  }

  async function handleSummary(){
    alert ("--entrou em handleSummary")
    // busca a empresa na base de dados 
    try {
    alert(summaryData.companyId);
    const response = await api.get ('/summary', { headers: { Authorization: summaryData.companyId }})
      try {
        const data =  summaryData  ;
        const response = await api.put ('/summary', data);
        alert("--alteracao summary deu certo");
        return { valid: true, message:"Éxito en actualización del summary" };
      } catch (err) {
          const errorMsg = Object.values(err.response.data);
        }
      // se houve algum erro na busca da empresa...
    } catch (err) {
      console.log(err);
      // if (err.request){
      //   console.log("Sin respuesta de la base de datos");
      //   return { valid: false, message:"Sin respuesta de la base de datos" };
      // }
      if (err.response.status == 404) {
        // se a empresa nao esta na base, inclui como novo registro
        console.log("--Frontend: summary no existe en la base de datos");
        try {
          // tenta incluir nova

          const data =  summaryData  ;
          const response = await api.post('/summary', data );
          alert("--inclusao summary deu certo");
          return { valid: true, message: "Éxito en inclusión de summary" };
          // se nao conseguiu, ve a msg de erro
        } catch (err) {
            const errorMsg = Object.values(err.response.data);
            alert("--erro na inclusao de summary");
            return { valid: false, message: "Error en inclusión de empresa" };
          }
      } else {
        // se...
          const errorMsg = Object.values(err.response.data);
          alert("Error en inicio de sessión");
          return { valid: false, message:"Error en actualización de empresa" };
        }
      }
  }
  function handleCreate() {
    alert("entrou em handleCreate");
    // if (handleCompany().valid) {
    //   alert("handleCompany is true");
    //   if (handleFinancials().valid){
    //     alert ("Datos incluidos correctamente");
    //     history.push('/');
    //   }
    // }
    const result = handleCompany();
    if (result) {
      const resultSummary = handleSummary()
      if (resultSummary) {
        handleFinancials();
      } else {
        alert("handleSummary no devolvio valid=true");
      };

    } else{
      alert("handleCompany no devolvio valid=true");
    };
    // handleSummary();
    
  }

  async function getYFData(){
    const companiesList = ['KO','PEP','JNJ'];
    for (let i = 0; i < companiesList.length; i++) {
      var companySymbol = companiesList[i];
      var options = {
        method: 'GET',
        url: 'https://yh-finance.p.rapidapi.com/stock/v2/get-financials',
        params: {symbol: companySymbol, region: 'US'},
        headers: {
            'x-rapidapi-host': 'yh-finance.p.rapidapi.com',
            'x-rapidapi-key': '057477ec51mshd7404991ea3c956p1dc241jsn2fbfbe21b657'
        }
      };
 
      await axios.request(options).then(function (response) {
        var yfData =  response.data;
        // const { meta: {symbol}} = yfData;
        // const { price: {marketCap: {raw}}} = yfData;
        console.log(yfData);
        // companyData.financialsId = yfData.balanceSheetHistory.balanceSheetStatements[0].endDate.fmt + yfData.quoteType.symbol  ;
        companyData.companyId = yfData.quoteType.symbol;
        companyData.exchange = yfData.quoteType.exchange;
        companyData.exchangeTimezoneName = yfData.quoteType.exchangeTimezoneName;
        companyData.exchangeTimezoneShortName = yfData.quoteType.exchangeTimezoneShortName;
        companyData.gmtOffSetMilliseconds = yfData.quoteType.gmtOffSetMilliseconds;
        companyData.isEsgPopulated = yfData.quoteType.isEsgPopulated;
        companyData.longName = yfData.quoteType.longName;
        companyData.market = yfData.quoteType.market;
        companyData.messageBoardId = yfData.quoteType.messageBoardId;
        companyData.quoteType = yfData.quoteType.quoteType;
        companyData.shortName = yfData.quoteType.shortName;
        companyData.symbol = yfData.quoteType.symbol;

        summaryData.companyId = yfData.quoteType.symbol;
        console.log(summaryData.companyId);
        if ( yfData.price.marketCap !== undefined && yfData.price.marketCap !== null ){
          summaryData.marketCap =   yfData.price.marketCap.raw;
        } else { summaryData.marketCap = 0 }

        if ( yfData.summaryDetail.beta !== undefined && yfData.summaryDetail.beta !== null ){
          summaryData.beta =   yfData.summaryDetail.beta.raw;
        } else { summaryData.beta = 0 }

        if ( yfData.price.regularMarketPrice !== undefined && yfData.price.regularMarketPrice !== null ){
          summaryData.regularMarketPrice = yfData.price.regularMarketPrice.raw;
        } else { summaryData.regularMarketPrice = 0 }

        if ( yfData.summaryDetail.fiftyTwoWeekHigh !== undefined && yfData.summaryDetail.fiftyTwoWeekHigh !== null ){
          summaryData.fiftyTwoWeekHigh =   yfData.summaryDetail.fiftyTwoWeekHigh.raw;
        } else { summaryData.fiftyTwoWeekHigh = 0 }

        if ( yfData.summaryDetail.fiftyTwoWeekLow !== undefined && yfData.summaryDetail.fiftyTwoWeekLow !== null ){
          summaryData.fiftyTwoWeekLow =   yfData.summaryDetail.fiftyTwoWeekLow.raw;
        } else { summaryData.fiftyTwoWeekLow = 0 }

        if ( yfData.summaryDetail.dividendRate !== undefined && yfData.summaryDetail.dividendRate !== null ){
          summaryData.dividendRate =   yfData.summaryDetail.dividendRate.raw;
        } else { summaryData.dividendRate = 0 }

        if ( yfData.summaryDetail.dividendYield !== undefined && yfData.summaryDetail.dividendYield !== null ){
          summaryData.dividendYield =   yfData.summaryDetail.dividendYield.raw;
        } else { summaryData.dividendYield = 0 }

        if ( yfData.summaryDetail.payoutRatio !== undefined && yfData.summaryDetail.payoutRatio !== null ){
          summaryData.payoutRatio =   yfData.summaryDetail.payoutRatio.raw;
        } else { summaryData.payoutRatio = 0 }

        if ( yfData.summaryDetail.exDividendDate !== undefined && yfData.summaryDetail.exDividendDate !== null ){
          summaryData.exDividendDate =   yfData.summaryDetail.exDividendDate.fmt;
        } else { summaryData.exDividendDate = "" }

        if ( yfData.summaryDetail.fiveYearAvgDividendYield !== undefined && yfData.summaryDetail.fiveYearAvgDividendYield !== null ){
          summaryData.fiveYearAvgDividendYield =   yfData.summaryDetail.fiveYearAvgDividendYield.raw;
        } else { summaryData.fiveYearAvgDividendYield = 0 }

        if ( yfData.summaryDetail.trailingAnnualDividendRate !== undefined && yfData.summaryDetail.trailingAnnualDividendRate !== null ){
          summaryData.trailingAnnualDividendRate =   yfData.summaryDetail.trailingAnnualDividendRate.raw;
        } else { summaryData.trailingAnnualDividendRate = 0 }

        if ( yfData.summaryDetail.trailingAnnualDividendYield !== undefined && yfData.summaryDetail.trailingAnnualDividendYield !== null ){
          summaryData.trailingAnnualDividendYield =   yfData.summaryDetail.trailingAnnualDividendYield.raw;
        } else { summaryData.trailingAnnualDividendYield = 0 }

        if ( yfData.summaryDetail.forwardPE !== undefined && yfData.summaryDetail.forwardPE !== null ){
          summaryData.forwardPE =   yfData.summaryDetail.forwardPE.raw;
        } else { summaryData.forwardPE = 0 }

        if ( yfData.summaryDetail.trailingPE !== undefined && yfData.summaryDetail.trailingPE !== null ){
          summaryData.trailingPE =   yfData.summaryDetail.trailingPE.raw;
        } else { summaryData.trailingPE = 0 }

        //----
        financialData[0].financialsId = yfData.balanceSheetHistory.balanceSheetStatements[0].endDate.fmt + yfData.quoteType.symbol;;
        financialData[0].companyId = yfData.quoteType.symbol;

        if (yfData.balanceSheetHistory.balanceSheetStatements[0].endDate !== undefined && yfData.balanceSheetHistory.balanceSheetStatements[0].endDate !== null ){
          financialData[0].endDate =  yfData.balanceSheetHistory.balanceSheetStatements[0].endDate.fmt;
        } else { financialData[0].endDate = "" }

        if (yfData.incomeStatementHistory.incomeStatementHistory[0].costOfRevenue !== undefined && yfData.incomeStatementHistory.incomeStatementHistory[0].costOfRevenue !== null ){
          financialData[0].costOfRevenue = yfData.incomeStatementHistory.incomeStatementHistory[0].costOfRevenue.raw; 
        } else { financialData[0].costOfRevenue = 0 }

        if (yfData.incomeStatementHistory.incomeStatementHistory[0].netIncome !== undefined && yfData.incomeStatementHistory.incomeStatementHistory[0].netIncome !== null ){
          financialData[0].netIncome = yfData.incomeStatementHistory.incomeStatementHistory[0].netIncome.raw; 
        } else { financialData[0].netIncome = 0 }

        if (yfData.incomeStatementHistory.incomeStatementHistory[0].totalRevenue !== undefined && yfData.incomeStatementHistory.incomeStatementHistory[0].totalRevenue !== null ){
          financialData[0].totalRevenue = yfData.incomeStatementHistory.incomeStatementHistory[0].totalRevenue.raw; 
        } else { financialData[0].totalRevenue = 0 }
        //
   
        if (yfData.balanceSheetHistory.balanceSheetStatements[1].endDate !== undefined && yfData.balanceSheetHistory.balanceSheetStatements[1].endDate !== null ){
          financialData[1].endDate = yfData.balanceSheetHistory.balanceSheetStatements[1].endDate.fmt;
        } else { financialData[1].endDate = "" }
        financialData[1].companyId = yfData.quoteType.symbol;
        financialData[1].financialsId = yfData.balanceSheetHistory.balanceSheetStatements[1].endDate.fmt + yfData.quoteType.symbol;;

        if (yfData.incomeStatementHistory.incomeStatementHistory[1].costOfRevenue !== undefined && yfData.incomeStatementHistory.incomeStatementHistory[1].costOfRevenue !== null ){
          financialData[1].costOfRevenue = yfData.incomeStatementHistory.incomeStatementHistory[1].costOfRevenue.raw; 
        } else { financialData[1].costOfRevenue = 0 }

        if (yfData.incomeStatementHistory.incomeStatementHistory[1].netIncome !== undefined && yfData.incomeStatementHistory.incomeStatementHistory[1].netIncome !== null ){
          financialData[1].netIncome = yfData.incomeStatementHistory.incomeStatementHistory[1].netIncome.raw; 
        } else { financialData[1].netIncome = 0 }

        if (yfData.incomeStatementHistory.incomeStatementHistory[1].totalRevenue !== undefined && yfData.incomeStatementHistory.incomeStatementHistory[1].totalRevenue !== null ){
          financialData[1].totalRevenue = yfData.incomeStatementHistory.incomeStatementHistory[1].totalRevenue.raw; 
        } else { financialData[1].totalRevenue = 0 }

        //
        financialData[2].financialsId = yfData.balanceSheetHistory.balanceSheetStatements[2].endDate.fmt + companyData.symbol;
        financialData[2].companyId = yfData.quoteType.symbol;
        if (yfData.balanceSheetHistory.balanceSheetStatements[2].endDate !== undefined && yfData.balanceSheetHistory.balanceSheetStatements[2].endDate !== null ){
          financialData[2].endDate = yfData.balanceSheetHistory.balanceSheetStatements[2].endDate.fmt;
        } else { financialData[2].endDate = "" }

        if (yfData.incomeStatementHistory.incomeStatementHistory[2].costOfRevenue !== undefined && yfData.incomeStatementHistory.incomeStatementHistory[2].costOfRevenue !== null ){
          financialData[2].costOfRevenue = yfData.incomeStatementHistory.incomeStatementHistory[2].costOfRevenue.raw; 
        } else { financialData[2].costOfRevenue = 0 }

        if (yfData.incomeStatementHistory.incomeStatementHistory[2].netIncome !== undefined && yfData.incomeStatementHistory.incomeStatementHistory[2].netIncome !== null ){
          financialData[2].netIncome = yfData.incomeStatementHistory.incomeStatementHistory[2].netIncome.raw; 
        } else { financialData[2].netIncome = 0 }

        if (yfData.incomeStatementHistory.incomeStatementHistory[2].totalRevenue !== undefined && yfData.incomeStatementHistory.incomeStatementHistory[2].totalRevenue !== null ){
          financialData[2].totalRevenue = yfData.incomeStatementHistory.incomeStatementHistory[2].totalRevenue.raw; 
        } else { financialData[2].totalRevenue = 0 }
        //---
        
        financialData[3].financialsId = yfData.balanceSheetHistory.balanceSheetStatements[3].endDate.fmt + yfData.quoteType.symbol;
        financialData[3].companyId = yfData.quoteType.symbol;

        if (yfData.balanceSheetHistory.balanceSheetStatements[3].endDate !== undefined && yfData.balanceSheetHistory.balanceSheetStatements[3].endDate !== null ){
          financialData[3].endDate = yfData.balanceSheetHistory.balanceSheetStatements[3].endDate.fmt;
        } else { financialData[3].endDate = "" }

        if (yfData.incomeStatementHistory.incomeStatementHistory[3].costOfRevenue !== undefined && yfData.incomeStatementHistory.incomeStatementHistory[3].costOfRevenue !== null ){
          financialData[3].costOfRevenue = yfData.incomeStatementHistory.incomeStatementHistory[3].costOfRevenue.raw; 
        } else { financialData[3].costOfRevenue = 0 }

        if (yfData.incomeStatementHistory.incomeStatementHistory[3].netIncome !== undefined && yfData.incomeStatementHistory.incomeStatementHistory[3].netIncome !== null ){
          financialData[3].netIncome = yfData.incomeStatementHistory.incomeStatementHistory[3].netIncome.raw; 
        } else { financialData[3].netIncome = 0 }

        if (yfData.incomeStatementHistory.incomeStatementHistory[3].totalRevenue !== undefined && yfData.incomeStatementHistory.incomeStatementHistory[3].totalRevenue !== null ){
          financialData[3].totalRevenue = yfData.incomeStatementHistory.incomeStatementHistory[3].totalRevenue.raw; 
        } else { financialData[3].totalRevenue = 0 }
        // console.log(summaryData);
        // console.log(summaryData);
        console.log(financialData[0]);
        console.log(financialData[1]);
        console.log(financialData[2]);
        console.log(financialData[3]);

        handleCreate();
      }).catch(function (error) {
        alert (error);
        console.error(error);
      });
    
    } //for
  }

  return (
    <>
    <Header/>
    <Button onClick={getYFData()}>Update</Button>
    </>
)
}


