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
    return { financialsId:"", companyId:"", period:"", year:"", 
      accountsPayable:"",
      capitalSurplus: "",
      cash: "",
      commonStock: "",
      endDate: "",
      goodWill: "",
      intangibleAssets: "",
      inventory: "",
      longTermDebt: "",
      longTermInvestments: "",
      netReceivables: "",
      netTangibleAssets: "",
      otherAssets: "",
      otherCurrentAssets: "",
      otherCurrentLiab: "",
      otherLiab: "",
      otherStockholderEquity: "",
      propertyPlantEquipment: "",
      retainedEarnings: "",
      shortLongTermDebt: "",
      shortTermInvestments: "",
      totalAssets: "",
      totalCurrentAssets: "",
      totalCurrentLiabilities: "",
      totalLiab: "",
      totalStockholderEquity: "",
      treasuryStock: "",
      capitalExpenditures: "",
      changeInCash: "",
      changeToAccountReceivables: "",
      changeToInventory: "",
      changeToLiabilities: "",
      changeToNetincome: "",
      changeToOperatingActivities: "",
      depreciation: "",
      dividendsPaid:"",
      effectOfExchangeRate: "",
      investments: "",
      issuanceOfStock:"",
      netBorrowings: "",
      otherCashflowsFromFinancingActivities:"",
      otherCashflowsFromOperatingActivities:"",
      otherCashflowsFromInvestingActivities:"",
      repurchaseOfStock:"",
      totalCashFromFinancingActivities: "",
      totalCashFromOperatingActivities: "",
      totalCashflowsFromInvestingActivities: "",
      costOfRevenue: "",
      discontinuedOperations: "",
      ebit: "",
      effectOfAccountingCharges: "",
      extraordinaryItems: "",
      grossProfit: "",
      incomeBeforeTax: "",
      incomeTaxExpense: "",
      interestExpense: "",
      minorityInterest: "",
      netIncome: "",
      netIncomeApplicableToCommonShares: "",
      netIncomeFromContinuingOps: "",
      nonRecurring: "",
      operatingIncome: "",
      otherItems: "",
      otherOperatingExpenses: "",
      researchDevelopment: "",
      sellingGeneralAdministrative: "",
      totalOperatingExpenses: "",
      totalOtherIncomeExpenseNet: "",
      totalRevenue: "" };
  });

  var financialQtrData = Array.from(Array(4), () => {
    return { financialsId:"", companyId:"", period:"", quarter:"", 
      accountsPayable: "",
      capitalSurplus: "",
      cash: "",
      commonStock: "",
      endDate: "",
      goodWill: "",
      intangibleAssets: "",
      inventory: "",
      longTermDebt: "",
      longTermInvestments: "",
      netReceivables: "",
      netTangibleAssets: "",
      otherAssets: "",
      otherCurrentAssets: "",
      otherCurrentLiab: "",
      otherLiab: "",
      otherStockholderEquity: "",
      propertyPlantEquipment: "",
      retainedEarnings: "",
      shortLongTermDebt: "",
      shortTermInvestments: "",
      totalAssets: "",
      totalCurrentAssets: "",
      totalCurrentLiabilities: "",
      totalLiab: "",
      totalStockholderEquity: "",
      treasuryStock: "",
      capitalExpenditures: "",
      changeInCash: "",
      changeToAccountReceivables: "",
      changeToInventory: "",
      changeToLiabilities: "",
      changeToNetincome: "",
      changeToOperatingActivities: "",
      depreciation: "",
      dividendsPaid:"",
      effectOfExchangeRate: "",
      investments: "",
      issuanceOfStock:"",
      netBorrowings: "",
      otherCashflowsFromFinancingActivities:"",
      otherCashflowsFromOperatingActivities:"",
      otherCashflowsFromInvestingActivities:"",
      repurchaseOfStock:"",
      totalCashFromFinancingActivities: "",
      totalCashFromOperatingActivities: "",
      totalCashflowsFromInvestingActivities: "",
      costOfRevenue: "",
      discontinuedOperations: "",
      ebit: "",
      effectOfAccountingCharges: "",
      extraordinaryItems: "",
      grossProfit: "",
      incomeBeforeTax: "",
      incomeTaxExpense: "",
      interestExpense: "",
      minorityInterest: "",
      netIncome: "",
      netIncomeApplicableToCommonShares: "",
      netIncomeFromContinuingOps: "",
      nonRecurring: "",
      operatingIncome: "",
      otherItems: "",
      otherOperatingExpenses: "",
      researchDevelopment: "",
      sellingGeneralAdministrative: "",
      totalOperatingExpenses: "",
      totalOtherIncomeExpenseNet: "",
      totalRevenue: "" };
  });

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
    trailingPE:""
  } 

  async function handleFinancials (i){
    
    // for (let i = 0; i < financialData.length; i++) {
      
       alert("entrou em handlefinancials" + financialQtrData[i].companyId+financialQtrData[i].endDate);
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
        // se houve algum erro na busca dos dados...
      } catch (err) {
        console.log(err);
        // if (err.request){
        //   console.log("Sin respuesta de la base de datos");
        //   return { valid: false, message:"Sin respuesta de la base de datos" };
        // }
        if (err.response.status == 404) {
          // se os dados nao estao na base, inclui como novo registro
          try {
            // tenta incluir nova
              // const data =  companyData ;
            const data = financialData[i];
            const response = await api.post('/financials', data );
            // return { valid: true, message:"Éxito en inclusión de datos financieros" };
            // se nao conseguiu, ve a msg de erro....
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
    // }// for
  }


  async function handleFinancialsQtr (i){
    
    // for (let i = 0; i < financialQtrData.length; i++) {
      alert("entrou em handlefinancialsQtr" + financialQtrData[i].companyId);
    // verifica se a informacao dos dados financeiros ja esta no banco de dados
    try {
      const response = await api.get ('/financialsqtr', { headers: { Authorization: financialQtrData[i].financialsId }})
        try {
          const data =  financialQtrData[i]  ;
          
          const response = await api.put ('/financialsqtr', data);
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
            const data = financialQtrData[i];
            const response = await api.post('/financialsqtr', data );
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
    // }// for
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

  function handleCreate() {
    alert("entrou em handleCreate");
    const result = handleCompany();
    if (result) {   // DEVERIA RETORNAR O OK DO BACKEND.....
      for (let i = 0; i < financialData.length; i++){
        handleFinancials(i);
      }  
      for (let i = 0; i < financialQtrData.length; i++){
        handleFinancialsQtr(i);
      }  
    } else{
      alert("--handleCompany no devolvio valid = true");
    };
  }

  async function getYFData(){
    const companiesList = ['JPM','BAC','TSLA'];
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

        if ( yfData.price.marketCap !== undefined && yfData.price.marketCap !== null ){
          companyData.marketCap = yfData.price.marketCap.raw;
        } else { companyData.marketCap = 0 }

        if ( yfData.summaryDetail.beta !== undefined && yfData.summaryDetail.beta !== null ){
          companyData.beta = yfData.summaryDetail.beta.raw;
        } else { companyData.beta = 0 }

        if ( yfData.price.regularMarketPrice !== undefined && yfData.price.regularMarketPrice !== null ){
          companyData.regularMarketPrice = yfData.price.regularMarketPrice.raw;
        } else { companyData.regularMarketPrice = 0 }

        if ( yfData.summaryDetail.fiftyTwoWeekHigh !== undefined && yfData.summaryDetail.fiftyTwoWeekHigh !== null ){
          companyData.fiftyTwoWeekHigh = yfData.summaryDetail.fiftyTwoWeekHigh.raw;
        } else { companyData.fiftyTwoWeekHigh = 0 }

        if ( yfData.summaryDetail.fiftyTwoWeekLow !== undefined && yfData.summaryDetail.fiftyTwoWeekLow !== null ){
          companyData.fiftyTwoWeekLow =   yfData.summaryDetail.fiftyTwoWeekLow.raw;
        } else { companyData.fiftyTwoWeekLow = 0 }

        if ( yfData.summaryDetail.dividendRate !== undefined && yfData.summaryDetail.dividendRate !== null ){
          companyData.dividendRate = yfData.summaryDetail.dividendRate.raw;
        } else { companyData.dividendRate = 0 }

        if ( yfData.summaryDetail.dividendYield !== undefined && yfData.summaryDetail.dividendYield !== null ){
          companyData.dividendYield = yfData.summaryDetail.dividendYield.raw;
        } else { companyData.dividendYield = 0 }

        if ( yfData.summaryDetail.payoutRatio !== undefined && yfData.summaryDetail.payoutRatio !== null ){
          companyData.payoutRatio = yfData.summaryDetail.payoutRatio.raw;
        } else { companyData.payoutRatio = 0 }

        if ( yfData.summaryDetail.exDividendDate !== undefined && yfData.summaryDetail.exDividendDate !== null ){
          companyData.exDividendDate = yfData.summaryDetail.exDividendDate.fmt;
        } else { companyData.exDividendDate = "" }

        if ( yfData.summaryDetail.fiveYearAvgDividendYield !== undefined && yfData.summaryDetail.fiveYearAvgDividendYield !== null ){
          companyData.fiveYearAvgDividendYield = yfData.summaryDetail.fiveYearAvgDividendYield.raw;
        } else { companyData.fiveYearAvgDividendYield = 0 }

        if ( yfData.summaryDetail.trailingAnnualDividendRate !== undefined && yfData.summaryDetail.trailingAnnualDividendRate !== null ){
          companyData.trailingAnnualDividendRate = yfData.summaryDetail.trailingAnnualDividendRate.raw;
        } else { companyData.trailingAnnualDividendRate = 0 }

        if ( yfData.summaryDetail.trailingAnnualDividendYield !== undefined && yfData.summaryDetail.trailingAnnualDividendYield !== null ){
          companyData.trailingAnnualDividendYield = yfData.summaryDetail.trailingAnnualDividendYield.raw;
        } else { companyData.trailingAnnualDividendYield = 0 }

        if ( yfData.summaryDetail.forwardPE !== undefined && yfData.summaryDetail.forwardPE !== null ){
          companyData.forwardPE = yfData.summaryDetail.forwardPE.raw;
        } else { companyData.forwardPE = 0 }

        if ( yfData.summaryDetail.trailingPE !== undefined && yfData.summaryDetail.trailingPE !== null ){
          companyData.trailingPE = yfData.summaryDetail.trailingPE.raw;
        } else { companyData.trailingPE = 0 }

        //----
        financialData[0].financialsId = yfData.balanceSheetHistory.balanceSheetStatements[0].endDate.fmt + yfData.quoteType.symbol;;
        financialData[0].companyId = yfData.quoteType.symbol;
        financialData[0].period = 0;
        // Datos del balance patrimonial
        if (yfData.balanceSheetHistory.balanceSheetStatements[0].endDate !== undefined && yfData.balanceSheetHistory.balanceSheetStatements[0].endDate !== null ){
          financialData[0].endDate = yfData.balanceSheetHistory.balanceSheetStatements[0].endDate.fmt;
        } else { financialData[0].endDate = "" }

        financialData[0].year = financialData[0].endDate.substr(0, 4);       

        if (yfData.balanceSheetHistory.balanceSheetStatements[0].accountsPayable !== undefined && yfData.balanceSheetHistory.balanceSheetStatements[0].accountsPayable !== null ){
          financialData[0].accountsPayable = yfData.balanceSheetHistory.balanceSheetStatements[0].accountsPayable.raw;
        } else { financialData[0].accountsPayable = 0 }

        if (yfData.balanceSheetHistory.balanceSheetStatements[0].capitalSurplus !== undefined && yfData.balanceSheetHistory.balanceSheetStatements[0].capitalSurplus !== null ){
          financialData[0].capitalSurplus = yfData.balanceSheetHistory.balanceSheetStatements[0].capitalSurplus.raw;
        } else { financialData[0].capitalSurplus = 0 }

        if (yfData.balanceSheetHistory.balanceSheetStatements[0].cash !== undefined && yfData.balanceSheetHistory.balanceSheetStatements[0].cash !== null ){
          financialData[0].cash = yfData.balanceSheetHistory.balanceSheetStatements[0].cash.raw;
        } else { financialData[0].cash = 0 }

        if (yfData.balanceSheetHistory.balanceSheetStatements[0].commonStock !== undefined && yfData.balanceSheetHistory.balanceSheetStatements[0].commonStock !== null ){
          financialData[0].commonStock = yfData.balanceSheetHistory.balanceSheetStatements[0].commonStock.raw;
        } else { financialData[0].commonStock = 0 }

        if (yfData.balanceSheetHistory.balanceSheetStatements[0].goodWill !== undefined && yfData.balanceSheetHistory.balanceSheetStatements[0].goodWill !== null ){
          financialData[0].goodWill = yfData.balanceSheetHistory.balanceSheetStatements[0].goodWill.raw;
        } else { financialData[0].goodWill = 0 }

        if (yfData.balanceSheetHistory.balanceSheetStatements[0].intangibleAssets !== undefined && yfData.balanceSheetHistory.balanceSheetStatements[0].intangibleAssets !== null ){
          financialData[0].intangibleAssets = yfData.balanceSheetHistory.balanceSheetStatements[0].intangibleAssets.raw;
        } else { financialData[0].intangibleAssets = 0 }

        if (yfData.balanceSheetHistory.balanceSheetStatements[0].inventory !== undefined && yfData.balanceSheetHistory.balanceSheetStatements[0].inventory !== null ){
          financialData[0].inventory = yfData.balanceSheetHistory.balanceSheetStatements[0].inventory.raw;
        } else { financialData[0].inventory = 0 }

        if (yfData.balanceSheetHistory.balanceSheetStatements[0].longTermDebt !== undefined && yfData.balanceSheetHistory.balanceSheetStatements[0].longTermDebt !== null ){
          financialData[0].longTermDebt = yfData.balanceSheetHistory.balanceSheetStatements[0].longTermDebt.raw;
        } else { financialData[0].longTermDebt = 0 }

        if (yfData.balanceSheetHistory.balanceSheetStatements[0].longTermInvestments !== undefined && yfData.balanceSheetHistory.balanceSheetStatements[0].longTermInvestments !== null ){
          financialData[0].longTermInvestments = yfData.balanceSheetHistory.balanceSheetStatements[0].longTermInvestments.raw;
        } else { financialData[0].longTermInvestments = 0 }

        if (yfData.balanceSheetHistory.balanceSheetStatements[0].netReceivables !== undefined && yfData.balanceSheetHistory.balanceSheetStatements[0].netReceivables !== null ){
          financialData[0].netReceivables = yfData.balanceSheetHistory.balanceSheetStatements[0].netReceivables.raw;
        } else { financialData[0].netReceivables = 0 }

        if (yfData.balanceSheetHistory.balanceSheetStatements[0].netTangibleAssets !== undefined && yfData.balanceSheetHistory.balanceSheetStatements[0].netTangibleAssets !== null ){
          financialData[0].netTangibleAssets = yfData.balanceSheetHistory.balanceSheetStatements[0].netTangibleAssets.raw;
        } else { financialData[0].netTangibleAssets = 0 }

        if (yfData.balanceSheetHistory.balanceSheetStatements[0].otherAssets !== undefined && yfData.balanceSheetHistory.balanceSheetStatements[0].otherAssets !== null ){
          financialData[0].otherAssets = yfData.balanceSheetHistory.balanceSheetStatements[0].otherAssets.raw;
        } else { financialData[0].otherAssets = 0 }

        if (yfData.balanceSheetHistory.balanceSheetStatements[0].otherCurrentAssets !== undefined && yfData.balanceSheetHistory.balanceSheetStatements[0].otherCurrentAssets !== null ){
          financialData[0].otherCurrentAssets = yfData.balanceSheetHistory.balanceSheetStatements[0].otherCurrentAssets.raw;
        } else { financialData[0].otherCurrentAssets = 0 }

        if (yfData.balanceSheetHistory.balanceSheetStatements[0].otherCurrentLiab !== undefined && yfData.balanceSheetHistory.balanceSheetStatements[0].otherCurrentLiab !== null ){
          financialData[0].otherCurrentLiab = yfData.balanceSheetHistory.balanceSheetStatements[0].otherCurrentLiab.raw;
        } else { financialData[0].otherCurrentLiab = 0 }

        if (yfData.balanceSheetHistory.balanceSheetStatements[0].otherLiab !== undefined && yfData.balanceSheetHistory.balanceSheetStatements[0].otherLiab !== null ){
          financialData[0].otherLiab = yfData.balanceSheetHistory.balanceSheetStatements[0].otherLiab.raw;
        } else { financialData[0].otherLiab = 0 }

        if (yfData.balanceSheetHistory.balanceSheetStatements[0].otherStockholderEquity !== undefined && yfData.balanceSheetHistory.balanceSheetStatements[0].otherStockholderEquity !== null ){
          financialData[0].otherStockholderEquity = yfData.balanceSheetHistory.balanceSheetStatements[0].otherStockholderEquity.raw;
        } else { financialData[0].otherStockholderEquity = 0 }

        if (yfData.balanceSheetHistory.balanceSheetStatements[0].propertyPlantEquipment !== undefined && yfData.balanceSheetHistory.balanceSheetStatements[0].propertyPlantEquipment !== null ){
          financialData[0].propertyPlantEquipment = yfData.balanceSheetHistory.balanceSheetStatements[0].propertyPlantEquipment.raw;
        } else { financialData[0].propertyPlantEquipment = 0 }

        if (yfData.balanceSheetHistory.balanceSheetStatements[0].retainedEarnings !== undefined && yfData.balanceSheetHistory.balanceSheetStatements[0].retainedEarnings !== null ){
          financialData[0].retainedEarnings = yfData.balanceSheetHistory.balanceSheetStatements[0].retainedEarnings.raw;
        } else { financialData[0].retainedEarnings = 0 }

        if (yfData.balanceSheetHistory.balanceSheetStatements[0].shortLongTermDebt !== undefined && yfData.balanceSheetHistory.balanceSheetStatements[0].shortLongTermDebt !== null ){
          financialData[0].shortLongTermDebt = yfData.balanceSheetHistory.balanceSheetStatements[0].shortLongTermDebt.raw;
        } else { financialData[0].shortLongTermDebt = 0 }

        if (yfData.balanceSheetHistory.balanceSheetStatements[0].shortTermInvestments !== undefined && yfData.balanceSheetHistory.balanceSheetStatements[0].shortTermInvestments !== null ){
          financialData[0].shortTermInvestments = yfData.balanceSheetHistory.balanceSheetStatements[0].shortTermInvestments.raw;
        } else { financialData[0].shortTermInvestments = 0 }

        if (yfData.balanceSheetHistory.balanceSheetStatements[0].totalAssets !== undefined && yfData.balanceSheetHistory.balanceSheetStatements[0].totalAssets !== null ){
          financialData[0].totalAssets = yfData.balanceSheetHistory.balanceSheetStatements[0].totalAssets.raw;
        } else { financialData[0].totalAssets = 0 }

        if (yfData.balanceSheetHistory.balanceSheetStatements[0].totalCurrentAssets !== undefined && yfData.balanceSheetHistory.balanceSheetStatements[0].totalCurrentAssets !== null ){
          financialData[0].totalCurrentAssets = yfData.balanceSheetHistory.balanceSheetStatements[0].totalCurrentAssets.raw;
        } else { financialData[0].totalCurrentAssets = 0 }

        if (yfData.balanceSheetHistory.balanceSheetStatements[0].totalCurrentLiabilities !== undefined && yfData.balanceSheetHistory.balanceSheetStatements[0].totalCurrentLiabilities !== null ){
          financialData[0].totalCurrentLiabilities = yfData.balanceSheetHistory.balanceSheetStatements[0].totalCurrentLiabilities.raw;
        } else { financialData[0].totalCurrentLiabilities = 0 }

        if (yfData.balanceSheetHistory.balanceSheetStatements[0].totalLiab !== undefined && yfData.balanceSheetHistory.balanceSheetStatements[0].totalLiab !== null ){
          financialData[0].totalLiab = yfData.balanceSheetHistory.balanceSheetStatements[0].totalLiab.raw;
        } else { financialData[0].totalLiab = 0 }

        if (yfData.balanceSheetHistory.balanceSheetStatements[0].totalStockholderEquity !== undefined && yfData.balanceSheetHistory.balanceSheetStatements[0].totalStockholderEquity !== null ){
          financialData[0].totalStockholderEquity = yfData.balanceSheetHistory.balanceSheetStatements[0].totalStockholderEquity.raw;
        } else { financialData[0].totalStockholderEquity = 0 }

        if (yfData.balanceSheetHistory.balanceSheetStatements[0].treasuryStock !== undefined && yfData.balanceSheetHistory.balanceSheetStatements[0].treasuryStock !== null ){
          financialData[0].treasuryStock = yfData.balanceSheetHistory.balanceSheetStatements[0].treasuryStock.raw;
        } else { financialData[0].treasuryStock = 0 }
        // Datos del flujo de caja
        if (yfData.cashflowStatementHistory.cashflowStatements[0].capitalExpenditures !== undefined && yfData.cashflowStatementHistory.cashflowStatements[0].capitalExpenditures !== null ){
           financialData[0].capitalExpenditures = yfData.cashflowStatementHistory.cashflowStatements[0].capitalExpenditures.raw; 
        } else {  financialData[0].capitalExpenditures = 0 }

        if (yfData.cashflowStatementHistory.cashflowStatements[0].changeInCash !== undefined && yfData.cashflowStatementHistory.cashflowStatements[0].changeInCash !== null ){
           financialData[0].changeInCash = yfData.cashflowStatementHistory.cashflowStatements[0].changeInCash.raw; 
        } else {  financialData[0].changeInCash = 0 }
        
        if (yfData.cashflowStatementHistory.cashflowStatements[0].changeToAccountReceivables !== undefined && yfData.cashflowStatementHistory.cashflowStatements[0].changeToAccountReceivables !== null ){
           financialData[0].changeToAccountReceivables = yfData.cashflowStatementHistory.cashflowStatements[0].changeToAccountReceivables.raw; 
        } else {  financialData[0].changeToAccountReceivables = 0 }
        
        if (yfData.cashflowStatementHistory.cashflowStatements[0].changeToInventory !== undefined && yfData.cashflowStatementHistory.cashflowStatements[0].changeToInventory !== null ){
           financialData[0].changeToInventory = yfData.cashflowStatementHistory.cashflowStatements[0].changeToInventory.raw; 
        } else {  financialData[0].changeToInventory = 0 }
        
        if (yfData.cashflowStatementHistory.cashflowStatements[0].changeToLiabilities !== undefined && yfData.cashflowStatementHistory.cashflowStatements[0].changeToLiabilities !== null ){
           financialData[0].changeToLiabilities = yfData.cashflowStatementHistory.cashflowStatements[0].changeToLiabilities.raw; 
        } else {  financialData[0].changeToLiabilities = 0 }
        
        if (yfData.cashflowStatementHistory.cashflowStatements[0].changeToNetincome !== undefined && yfData.cashflowStatementHistory.cashflowStatements[0].changeToNetincome !== null ){
           financialData[0].changeToNetincome = yfData.cashflowStatementHistory.cashflowStatements[0].changeToNetincome.raw; 
        } else {  financialData[0].changeToNetincome = 0 }
        
        if (yfData.cashflowStatementHistory.cashflowStatements[0].changeToOperatingActivities !== undefined && yfData.cashflowStatementHistory.cashflowStatements[0].changeToOperatingActivities !== null ){
           financialData[0].changeToOperatingActivities = yfData.cashflowStatementHistory.cashflowStatements[0].changeToOperatingActivities.raw; 
        } else {  financialData[0].changeToOperatingActivities = 0 }
        
        if (yfData.cashflowStatementHistory.cashflowStatements[0].depreciation !== undefined && yfData.cashflowStatementHistory.cashflowStatements[0].depreciation !== null ){
           financialData[0].depreciation = yfData.cashflowStatementHistory.cashflowStatements[0].depreciation.raw; 
        } else {  financialData[0].depreciation = 0 }
        
        if (yfData.cashflowStatementHistory.cashflowStatements[0].dividendsPaid !== undefined && yfData.cashflowStatementHistory.cashflowStatements[0].dividendsPaid !== null ){
           financialData[0].dividendsPaid = yfData.cashflowStatementHistory.cashflowStatements[0].dividendsPaid.raw; 
        } else {  financialData[0].dividendsPaid = 0 }
        
        if (yfData.cashflowStatementHistory.cashflowStatements[0].effectOfExchangeRate !== undefined && yfData.cashflowStatementHistory.cashflowStatements[0].effectOfExchangeRate !== null ){
           financialData[0].effectOfExchangeRate = yfData.cashflowStatementHistory.cashflowStatements[0].effectOfExchangeRate.raw; 
        } else {  financialData[0].effectOfExchangeRate = 0 }
        
        if (yfData.cashflowStatementHistory.cashflowStatements[0].investments !== undefined && yfData.cashflowStatementHistory.cashflowStatements[0].investments !== null ){
           financialData[0].investments = yfData.cashflowStatementHistory.cashflowStatements[0].investments.raw; 
        } else {  financialData[0].investments = 0 }
        
        if (yfData.cashflowStatementHistory.cashflowStatements[0].issuanceOfStock !== undefined && yfData.cashflowStatementHistory.cashflowStatements[0].issuanceOfStock !== null ){
           financialData[0].issuanceOfStock = yfData.cashflowStatementHistory.cashflowStatements[0].issuanceOfStock.raw; 
        } else {  financialData[0].issuanceOfStock = 0 }
        
        if (yfData.cashflowStatementHistory.cashflowStatements[0].netBorrowings !== undefined && yfData.cashflowStatementHistory.cashflowStatements[0].netBorrowings !== null ){
           financialData[0].netBorrowings = yfData.cashflowStatementHistory.cashflowStatements[0].netBorrowings.raw; 
        } else {  financialData[0].netBorrowings = 0 }
        
        if (yfData.cashflowStatementHistory.cashflowStatements[0].otherCashflowsFromFinancingActivities !== undefined && yfData.cashflowStatementHistory.cashflowStatements[0].otherCashflowsFromFinancingActivities !== null ){
           financialData[0].otherCashflowsFromFinancingActivities = yfData.cashflowStatementHistory.cashflowStatements[0].otherCashflowsFromFinancingActivities.raw; 
        } else {  financialData[0].otherCashflowsFromFinancingActivities = 0 }
        
        if (yfData.cashflowStatementHistory.cashflowStatements[0].otherCashflowsFromOperatingActivities !== undefined && yfData.cashflowStatementHistory.cashflowStatements[0].otherCashflowsFromOperatingActivities !== null ){
           financialData[0].otherCashflowsFromOperatingActivities = yfData.cashflowStatementHistory.cashflowStatements[0].otherCashflowsFromOperatingActivities.raw; 
        } else {  financialData[0].otherCashflowsFromOperatingActivities = 0 }
        
        if (yfData.cashflowStatementHistory.cashflowStatements[0].otherCashflowsFromInvestingActivities !== undefined && yfData.cashflowStatementHistory.cashflowStatements[0].otherCashflowsFromInvestingActivities !== null ){
           financialData[0].otherCashflowsFromInvestingActivities = yfData.cashflowStatementHistory.cashflowStatements[0].otherCashflowsFromInvestingActivities.raw; 
        } else {  financialData[0].otherCashflowsFromInvestingActivities = 0 }
        
        if (yfData.cashflowStatementHistory.cashflowStatements[0].repurchaseOfStock !== undefined && yfData.cashflowStatementHistory.cashflowStatements[0].repurchaseOfStock !== null ){
           financialData[0].repurchaseOfStock = yfData.cashflowStatementHistory.cashflowStatements[0].repurchaseOfStock.raw; 
        } else {  financialData[0].repurchaseOfStock = 0 }
        
        if (yfData.cashflowStatementHistory.cashflowStatements[0].totalCashFromFinancingActivities !== undefined && yfData.cashflowStatementHistory.cashflowStatements[0].totalCashFromFinancingActivities !== null ){
           financialData[0].totalCashFromFinancingActivities = yfData.cashflowStatementHistory.cashflowStatements[0].totalCashFromFinancingActivities.raw; 
        } else {  financialData[0].totalCashFromFinancingActivities = 0 }
        
        if (yfData.cashflowStatementHistory.cashflowStatements[0].totalCashFromOperatingActivities !== undefined && yfData.cashflowStatementHistory.cashflowStatements[0].totalCashFromOperatingActivities !== null ){
           financialData[0].totalCashFromOperatingActivities = yfData.cashflowStatementHistory.cashflowStatements[0].totalCashFromOperatingActivities.raw; 
        } else {  financialData[0].totalCashFromOperatingActivities = 0 }
        
        if (yfData.cashflowStatementHistory.cashflowStatements[0].totalCashflowsFromInvestingActivities !== undefined && yfData.cashflowStatementHistory.cashflowStatements[0].totalCashflowsFromInvestingActivities !== null ){
           financialData[0].totalCashflowsFromInvestingActivities = yfData.cashflowStatementHistory.cashflowStatements[0].totalCashflowsFromInvestingActivities.raw; 
        } else {  financialData[0].totalCashflowsFromInvestingActivities = 0 }
        // Datos del income statement
        if (yfData.incomeStatementHistory.incomeStatementHistory[0].costOfRevenue !== undefined && yfData.incomeStatementHistory.incomeStatementHistory[0].costOfRevenue !== null ){
          financialData[0].costOfRevenue = yfData.incomeStatementHistory.incomeStatementHistory[0].costOfRevenue.raw; 
        } else { financialData[0].costOfRevenue = 0 }

        if (yfData.incomeStatementHistory.incomeStatementHistory[0].discontinuedOperations !== undefined && yfData.incomeStatementHistory.incomeStatementHistory[0].discontinuedOperations !== null ){
          financialData[0].discontinuedOperations = yfData.incomeStatementHistory.incomeStatementHistory[0].discontinuedOperations.raw; 
        } else { financialData[0].discontinuedOperations = 0 }

        if (yfData.incomeStatementHistory.incomeStatementHistory[0].ebit !== undefined && yfData.incomeStatementHistory.incomeStatementHistory[0].ebit !== null ){
          financialData[0].ebit = yfData.incomeStatementHistory.incomeStatementHistory[0].ebit.raw; 
        } else { financialData[0].ebit = 0 }

        if (yfData.incomeStatementHistory.incomeStatementHistory[0].effectOfAccountingCharges !== undefined && yfData.incomeStatementHistory.incomeStatementHistory[0].effectOfAccountingCharges !== null ){
          financialData[0].effectOfAccountingCharges = yfData.incomeStatementHistory.incomeStatementHistory[0].effectOfAccountingCharges.raw; 
        } else { financialData[0].effectOfAccountingCharges = 0 }

        if (yfData.incomeStatementHistory.incomeStatementHistory[0].extraordinaryItems !== undefined && yfData.incomeStatementHistory.incomeStatementHistory[0].extraordinaryItems !== null ){
          financialData[0].extraordinaryItems = yfData.incomeStatementHistory.incomeStatementHistory[0].extraordinaryItems.raw; 
        } else { financialData[0].extraordinaryItems = 0 }

        if (yfData.incomeStatementHistory.incomeStatementHistory[0].grossProfit !== undefined && yfData.incomeStatementHistory.incomeStatementHistory[0].grossProfit !== null ){
          financialData[0].grossProfit = yfData.incomeStatementHistory.incomeStatementHistory[0].grossProfit.raw; 
        } else { financialData[0].grossProfit = 0 }

        if (yfData.incomeStatementHistory.incomeStatementHistory[0].incomeBeforeTax !== undefined && yfData.incomeStatementHistory.incomeStatementHistory[0].incomeBeforeTax !== null ){
          financialData[0].incomeBeforeTax = yfData.incomeStatementHistory.incomeStatementHistory[0].incomeBeforeTax.raw; 
        } else { financialData[0].incomeBeforeTax = 0 }

        if (yfData.incomeStatementHistory.incomeStatementHistory[0].incomeTaxExpense !== undefined && yfData.incomeStatementHistory.incomeStatementHistory[0].incomeTaxExpense !== null ){
          financialData[0].incomeTaxExpense = yfData.incomeStatementHistory.incomeStatementHistory[0].incomeTaxExpense.raw; 
        } else { financialData[0].incomeTaxExpense = 0 }

        if (yfData.incomeStatementHistory.incomeStatementHistory[0].interestExpense !== undefined && yfData.incomeStatementHistory.incomeStatementHistory[0].interestExpense !== null ){
          financialData[0].interestExpense = yfData.incomeStatementHistory.incomeStatementHistory[0].interestExpense.raw; 
        } else { financialData[0].interestExpense = 0 }

        if (yfData.incomeStatementHistory.incomeStatementHistory[0].minorityInterest !== undefined && yfData.incomeStatementHistory.incomeStatementHistory[0].minorityInterest !== null ){
          financialData[0].minorityInterest = yfData.incomeStatementHistory.incomeStatementHistory[0].minorityInterest.raw; 
        } else { financialData[0].minorityInterest = 0 }

        if (yfData.incomeStatementHistory.incomeStatementHistory[0].netIncome !== undefined && yfData.incomeStatementHistory.incomeStatementHistory[0].netIncome !== null ){
          financialData[0].netIncome = yfData.incomeStatementHistory.incomeStatementHistory[0].netIncome.raw; 
        } else { financialData[0].netIncome = 0 }

        if (yfData.incomeStatementHistory.incomeStatementHistory[0].netIncomeApplicableToCommonShares !== undefined && yfData.incomeStatementHistory.incomeStatementHistory[0].netIncomeApplicableToCommonShares !== null ){
          financialData[0].netIncomeApplicableToCommonShares = yfData.incomeStatementHistory.incomeStatementHistory[0].netIncomeApplicableToCommonShares.raw; 
        } else { financialData[0].netIncomeApplicableToCommonShares = 0 }

        if (yfData.incomeStatementHistory.incomeStatementHistory[0].netIncomeFromContinuingOps !== undefined && yfData.incomeStatementHistory.incomeStatementHistory[0].netIncomeFromContinuingOps !== null ){
          financialData[0].netIncomeFromContinuingOps = yfData.incomeStatementHistory.incomeStatementHistory[0].netIncomeFromContinuingOps.raw; 
        } else { financialData[0].netIncomeFromContinuingOps = 0 }

        if (yfData.incomeStatementHistory.incomeStatementHistory[0].nonRecurring !== undefined && yfData.incomeStatementHistory.incomeStatementHistory[0].nonRecurring !== null ){
          financialData[0].nonRecurring = yfData.incomeStatementHistory.incomeStatementHistory[0].nonRecurring.raw; 
        } else { financialData[0].nonRecurring = 0 }

        if (yfData.incomeStatementHistory.incomeStatementHistory[0].operatingIncome !== undefined && yfData.incomeStatementHistory.incomeStatementHistory[0].operatingIncome !== null ){
          financialData[0].operatingIncome = yfData.incomeStatementHistory.incomeStatementHistory[0].operatingIncome.raw; 
        } else { financialData[0].operatingIncome = 0 }

        if (yfData.incomeStatementHistory.incomeStatementHistory[0].otherItems !== undefined && yfData.incomeStatementHistory.incomeStatementHistory[0].otherItems !== null ){
          financialData[0].otherItems = yfData.incomeStatementHistory.incomeStatementHistory[0].otherItems.raw; 
        } else { financialData[0].otherItems = 0 }

        if (yfData.incomeStatementHistory.incomeStatementHistory[0].otherOperatingExpenses !== undefined && yfData.incomeStatementHistory.incomeStatementHistory[0].otherOperatingExpenses !== null ){
          financialData[0].otherOperatingExpenses = yfData.incomeStatementHistory.incomeStatementHistory[0].otherOperatingExpenses.raw; 
        } else { financialData[0].otherOperatingExpenses = 0 }

        if (yfData.incomeStatementHistory.incomeStatementHistory[0].researchDevelopment !== undefined && yfData.incomeStatementHistory.incomeStatementHistory[0].researchDevelopment !== null ){
          financialData[0].researchDevelopment = yfData.incomeStatementHistory.incomeStatementHistory[0].researchDevelopment.raw; 
        } else { financialData[0].researchDevelopment = 0 }

        if (yfData.incomeStatementHistory.incomeStatementHistory[0].sellingGeneralAdministrative !== undefined && yfData.incomeStatementHistory.incomeStatementHistory[0].sellingGeneralAdministrative !== null ){
          financialData[0].sellingGeneralAdministrative = yfData.incomeStatementHistory.incomeStatementHistory[0].sellingGeneralAdministrative.raw; 
        } else { financialData[0].sellingGeneralAdministrative = 0 }

        if (yfData.incomeStatementHistory.incomeStatementHistory[0].totalOperatingExpenses !== undefined && yfData.incomeStatementHistory.incomeStatementHistory[0].totalOperatingExpenses !== null ){
          financialData[0].totalOperatingExpenses = yfData.incomeStatementHistory.incomeStatementHistory[0].totalOperatingExpenses.raw; 
        } else { financialData[0].totalOperatingExpenses = 0 }

        if (yfData.incomeStatementHistory.incomeStatementHistory[0].totalOtherIncomeExpenseNet !== undefined && yfData.incomeStatementHistory.incomeStatementHistory[0].totalOtherIncomeExpenseNet !== null ){
          financialData[0].totalOtherIncomeExpenseNet = yfData.incomeStatementHistory.incomeStatementHistory[0].totalOtherIncomeExpenseNet.raw; 
        } else { financialData[0].totalOtherIncomeExpenseNet = 0 }
        
        if (yfData.incomeStatementHistory.incomeStatementHistory[0].totalRevenue !== undefined && yfData.incomeStatementHistory.incomeStatementHistory[0].totalRevenue !== null ){
          financialData[0].totalRevenue = yfData.incomeStatementHistory.incomeStatementHistory[0].totalRevenue.raw; 
        } else { financialData[0].totalRevenue = 0 }

        // 
        if (yfData.balanceSheetHistory.balanceSheetStatements[1].endDate !== undefined && yfData.balanceSheetHistory.balanceSheetStatements[1].endDate !== null ){
          financialData[1].endDate = yfData.balanceSheetHistory.balanceSheetStatements[1].endDate.fmt;
        } else { financialData[1].endDate = "" }

        financialData[1].year = financialData[1].endDate.substr(0, 4);

        financialData[1].companyId = yfData.quoteType.symbol;
        financialData[1].financialsId = yfData.balanceSheetHistory.balanceSheetStatements[1].endDate.fmt + yfData.quoteType.symbol;;
        financialData[1].period = 1;
  
        // Datos del balance patrimonial
        if (yfData.balanceSheetHistory.balanceSheetStatements[1].endDate !== undefined && yfData.balanceSheetHistory.balanceSheetStatements[1].endDate !== null ){
          financialData[1].endDate = yfData.balanceSheetHistory.balanceSheetStatements[1].endDate.fmt;
        } else { financialData[1].endDate = "" }

        financialData[1].year = financialData[1].endDate.substr(0, 4);       

        if (yfData.balanceSheetHistory.balanceSheetStatements[1].accountsPayable !== undefined && yfData.balanceSheetHistory.balanceSheetStatements[1].accountsPayable !== null ){
          financialData[1].accountsPayable = yfData.balanceSheetHistory.balanceSheetStatements[1].accountsPayable.raw;
        } else { financialData[1].accountsPayable = 0 }

        if (yfData.balanceSheetHistory.balanceSheetStatements[1].capitalSurplus !== undefined && yfData.balanceSheetHistory.balanceSheetStatements[1].capitalSurplus !== null ){
          financialData[1].capitalSurplus = yfData.balanceSheetHistory.balanceSheetStatements[1].capitalSurplus.raw;
        } else { financialData[1].capitalSurplus = 0 }

        if (yfData.balanceSheetHistory.balanceSheetStatements[1].cash !== undefined && yfData.balanceSheetHistory.balanceSheetStatements[1].cash !== null ){
          financialData[1].cash = yfData.balanceSheetHistory.balanceSheetStatements[1].cash.raw;
        } else { financialData[1].cash = 0 }

        if (yfData.balanceSheetHistory.balanceSheetStatements[1].commonStock !== undefined && yfData.balanceSheetHistory.balanceSheetStatements[1].commonStock !== null ){
          financialData[1].commonStock = yfData.balanceSheetHistory.balanceSheetStatements[1].commonStock.raw;
        } else { financialData[1].commonStock = 0 }

        if (yfData.balanceSheetHistory.balanceSheetStatements[1].goodWill !== undefined && yfData.balanceSheetHistory.balanceSheetStatements[1].goodWill !== null ){
          financialData[1].goodWill = yfData.balanceSheetHistory.balanceSheetStatements[1].goodWill.raw;
        } else { financialData[1].goodWill = 0 }

        if (yfData.balanceSheetHistory.balanceSheetStatements[1].intangibleAssets !== undefined && yfData.balanceSheetHistory.balanceSheetStatements[1].intangibleAssets !== null ){
          financialData[1].intangibleAssets = yfData.balanceSheetHistory.balanceSheetStatements[1].intangibleAssets.raw;
        } else { financialData[1].intangibleAssets = 0 }

        if (yfData.balanceSheetHistory.balanceSheetStatements[1].inventory !== undefined && yfData.balanceSheetHistory.balanceSheetStatements[1].inventory !== null ){
          financialData[1].inventory = yfData.balanceSheetHistory.balanceSheetStatements[1].inventory.raw;
        } else { financialData[1].inventory = 0 }

        if (yfData.balanceSheetHistory.balanceSheetStatements[1].longTermDebt !== undefined && yfData.balanceSheetHistory.balanceSheetStatements[1].longTermDebt !== null ){
          financialData[1].longTermDebt = yfData.balanceSheetHistory.balanceSheetStatements[1].longTermDebt.raw;
        } else { financialData[1].longTermDebt = 0 }

        if (yfData.balanceSheetHistory.balanceSheetStatements[1].longTermInvestments !== undefined && yfData.balanceSheetHistory.balanceSheetStatements[1].longTermInvestments !== null ){
          financialData[1].longTermInvestments = yfData.balanceSheetHistory.balanceSheetStatements[1].longTermInvestments.raw;
        } else { financialData[1].longTermInvestments = 0 }

        if (yfData.balanceSheetHistory.balanceSheetStatements[1].netReceivables !== undefined && yfData.balanceSheetHistory.balanceSheetStatements[1].netReceivables !== null ){
          financialData[1].netReceivables = yfData.balanceSheetHistory.balanceSheetStatements[1].netReceivables.raw;
        } else { financialData[1].netReceivables = 0 }

        if (yfData.balanceSheetHistory.balanceSheetStatements[1].netTangibleAssets !== undefined && yfData.balanceSheetHistory.balanceSheetStatements[1].netTangibleAssets !== null ){
          financialData[1].netTangibleAssets = yfData.balanceSheetHistory.balanceSheetStatements[1].netTangibleAssets.raw;
        } else { financialData[1].netTangibleAssets = 0 }

        if (yfData.balanceSheetHistory.balanceSheetStatements[1].otherAssets !== undefined && yfData.balanceSheetHistory.balanceSheetStatements[1].otherAssets !== null ){
          financialData[1].otherAssets = yfData.balanceSheetHistory.balanceSheetStatements[1].otherAssets.raw;
        } else { financialData[1].otherAssets = 0 }

        if (yfData.balanceSheetHistory.balanceSheetStatements[1].otherCurrentAssets !== undefined && yfData.balanceSheetHistory.balanceSheetStatements[1].otherCurrentAssets !== null ){
          financialData[1].otherCurrentAssets = yfData.balanceSheetHistory.balanceSheetStatements[1].otherCurrentAssets.raw;
        } else { financialData[1].otherCurrentAssets = 0 }

        if (yfData.balanceSheetHistory.balanceSheetStatements[1].otherCurrentLiab !== undefined && yfData.balanceSheetHistory.balanceSheetStatements[1].otherCurrentLiab !== null ){
          financialData[1].otherCurrentLiab = yfData.balanceSheetHistory.balanceSheetStatements[1].otherCurrentLiab.raw;
        } else { financialData[1].otherCurrentLiab = 0 }

        if (yfData.balanceSheetHistory.balanceSheetStatements[1].otherLiab !== undefined && yfData.balanceSheetHistory.balanceSheetStatements[1].otherLiab !== null ){
          financialData[1].otherLiab = yfData.balanceSheetHistory.balanceSheetStatements[1].otherLiab.raw;
        } else { financialData[1].otherLiab = 0 }

        if (yfData.balanceSheetHistory.balanceSheetStatements[1].otherStockholderEquity !== undefined && yfData.balanceSheetHistory.balanceSheetStatements[1].otherStockholderEquity !== null ){
          financialData[1].otherStockholderEquity = yfData.balanceSheetHistory.balanceSheetStatements[1].otherStockholderEquity.raw;
        } else { financialData[1].otherStockholderEquity = 0 }

        if (yfData.balanceSheetHistory.balanceSheetStatements[1].propertyPlantEquipment !== undefined && yfData.balanceSheetHistory.balanceSheetStatements[1].propertyPlantEquipment !== null ){
          financialData[1].propertyPlantEquipment = yfData.balanceSheetHistory.balanceSheetStatements[1].propertyPlantEquipment.raw;
        } else { financialData[1].propertyPlantEquipment = 0 }

        if (yfData.balanceSheetHistory.balanceSheetStatements[1].retainedEarnings !== undefined && yfData.balanceSheetHistory.balanceSheetStatements[1].retainedEarnings !== null ){
          financialData[1].retainedEarnings = yfData.balanceSheetHistory.balanceSheetStatements[1].retainedEarnings.raw;
        } else { financialData[1].retainedEarnings = 0 }

        if (yfData.balanceSheetHistory.balanceSheetStatements[1].shortLongTermDebt !== undefined && yfData.balanceSheetHistory.balanceSheetStatements[1].shortLongTermDebt !== null ){
          financialData[1].shortLongTermDebt = yfData.balanceSheetHistory.balanceSheetStatements[1].shortLongTermDebt.raw;
        } else { financialData[1].shortLongTermDebt = 0 }

        if (yfData.balanceSheetHistory.balanceSheetStatements[1].shortTermInvestments !== undefined && yfData.balanceSheetHistory.balanceSheetStatements[1].shortTermInvestments !== null ){
          financialData[1].shortTermInvestments = yfData.balanceSheetHistory.balanceSheetStatements[1].shortTermInvestments.raw;
        } else { financialData[1].shortTermInvestments = 0 }

        if (yfData.balanceSheetHistory.balanceSheetStatements[1].totalAssets !== undefined && yfData.balanceSheetHistory.balanceSheetStatements[1].totalAssets !== null ){
          financialData[1].totalAssets = yfData.balanceSheetHistory.balanceSheetStatements[1].totalAssets.raw;
        } else { financialData[1].totalAssets = 0 }

        if (yfData.balanceSheetHistory.balanceSheetStatements[1].totalCurrentAssets !== undefined && yfData.balanceSheetHistory.balanceSheetStatements[1].totalCurrentAssets !== null ){
          financialData[1].totalCurrentAssets = yfData.balanceSheetHistory.balanceSheetStatements[1].totalCurrentAssets.raw;
        } else { financialData[1].totalCurrentAssets = 0 }

        if (yfData.balanceSheetHistory.balanceSheetStatements[1].totalCurrentLiabilities !== undefined && yfData.balanceSheetHistory.balanceSheetStatements[1].totalCurrentLiabilities !== null ){
          financialData[1].totalCurrentLiabilities = yfData.balanceSheetHistory.balanceSheetStatements[1].totalCurrentLiabilities.raw;
        } else { financialData[1].totalCurrentLiabilities = 0 }

        if (yfData.balanceSheetHistory.balanceSheetStatements[1].totalLiab !== undefined && yfData.balanceSheetHistory.balanceSheetStatements[1].totalLiab !== null ){
          financialData[1].totalLiab = yfData.balanceSheetHistory.balanceSheetStatements[1].totalLiab.raw;
        } else { financialData[1].totalLiab = 0 }

        if (yfData.balanceSheetHistory.balanceSheetStatements[1].totalStockholderEquity !== undefined && yfData.balanceSheetHistory.balanceSheetStatements[1].totalStockholderEquity !== null ){
          financialData[1].totalStockholderEquity = yfData.balanceSheetHistory.balanceSheetStatements[1].totalStockholderEquity.raw;
        } else { financialData[1].totalStockholderEquity = 0 }

        if (yfData.balanceSheetHistory.balanceSheetStatements[1].treasuryStock !== undefined && yfData.balanceSheetHistory.balanceSheetStatements[1].treasuryStock !== null ){
          financialData[1].treasuryStock = yfData.balanceSheetHistory.balanceSheetStatements[1].treasuryStock.raw;
        } else { financialData[1].treasuryStock = 0 }
        // Datos del flujo de caja
        if (yfData.cashflowStatementHistory.cashflowStatements[1].capitalExpenditures !== undefined && yfData.cashflowStatementHistory.cashflowStatements[1].capitalExpenditures !== null ){
           financialData[1].capitalExpenditures = yfData.cashflowStatementHistory.cashflowStatements[1].capitalExpenditures.raw; 
        } else {  financialData[1].capitalExpenditures = 0 }

        if (yfData.cashflowStatementHistory.cashflowStatements[1].changeInCash !== undefined && yfData.cashflowStatementHistory.cashflowStatements[1].changeInCash !== null ){
           financialData[1].changeInCash = yfData.cashflowStatementHistory.cashflowStatements[1].changeInCash.raw; 
        } else {  financialData[1].changeInCash = 0 }
        
        if (yfData.cashflowStatementHistory.cashflowStatements[1].changeToAccountReceivables !== undefined && yfData.cashflowStatementHistory.cashflowStatements[1].changeToAccountReceivables !== null ){
           financialData[1].changeToAccountReceivables = yfData.cashflowStatementHistory.cashflowStatements[1].changeToAccountReceivables.raw; 
        } else {  financialData[1].changeToAccountReceivables = 0 }
        
        if (yfData.cashflowStatementHistory.cashflowStatements[1].changeToInventory !== undefined && yfData.cashflowStatementHistory.cashflowStatements[1].changeToInventory !== null ){
           financialData[1].changeToInventory = yfData.cashflowStatementHistory.cashflowStatements[1].changeToInventory.raw; 
        } else {  financialData[1].changeToInventory = 0 }
        
        if (yfData.cashflowStatementHistory.cashflowStatements[1].changeToLiabilities !== undefined && yfData.cashflowStatementHistory.cashflowStatements[1].changeToLiabilities !== null ){
           financialData[1].changeToLiabilities = yfData.cashflowStatementHistory.cashflowStatements[1].changeToLiabilities.raw; 
        } else {  financialData[1].changeToLiabilities = 0 }
        
        if (yfData.cashflowStatementHistory.cashflowStatements[1].changeToNetincome !== undefined && yfData.cashflowStatementHistory.cashflowStatements[1].changeToNetincome !== null ){
           financialData[1].changeToNetincome = yfData.cashflowStatementHistory.cashflowStatements[1].changeToNetincome.raw; 
        } else {  financialData[1].changeToNetincome = 0 }
        
        if (yfData.cashflowStatementHistory.cashflowStatements[1].changeToOperatingActivities !== undefined && yfData.cashflowStatementHistory.cashflowStatements[1].changeToOperatingActivities !== null ){
           financialData[1].changeToOperatingActivities = yfData.cashflowStatementHistory.cashflowStatements[1].changeToOperatingActivities.raw; 
        } else {  financialData[1].changeToOperatingActivities = 0 }
        
        if (yfData.cashflowStatementHistory.cashflowStatements[1].depreciation !== undefined && yfData.cashflowStatementHistory.cashflowStatements[1].depreciation !== null ){
           financialData[1].depreciation = yfData.cashflowStatementHistory.cashflowStatements[1].depreciation.raw; 
        } else {  financialData[1].depreciation = 0 }
        
        if (yfData.cashflowStatementHistory.cashflowStatements[1].dividendsPaid !== undefined && yfData.cashflowStatementHistory.cashflowStatements[1].dividendsPaid !== null ){
           financialData[1].dividendsPaid = yfData.cashflowStatementHistory.cashflowStatements[1].dividendsPaid.raw; 
        } else {  financialData[1].dividendsPaid = 0 }
        
        if (yfData.cashflowStatementHistory.cashflowStatements[1].effectOfExchangeRate !== undefined && yfData.cashflowStatementHistory.cashflowStatements[1].effectOfExchangeRate !== null ){
           financialData[1].effectOfExchangeRate = yfData.cashflowStatementHistory.cashflowStatements[1].effectOfExchangeRate.raw; 
        } else {  financialData[1].effectOfExchangeRate = 0 }
        
        if (yfData.cashflowStatementHistory.cashflowStatements[1].investments !== undefined && yfData.cashflowStatementHistory.cashflowStatements[1].investments !== null ){
           financialData[1].investments = yfData.cashflowStatementHistory.cashflowStatements[1].investments.raw; 
        } else {  financialData[1].investments = 0 }
        
        if (yfData.cashflowStatementHistory.cashflowStatements[1].issuanceOfStock !== undefined && yfData.cashflowStatementHistory.cashflowStatements[1].issuanceOfStock !== null ){
           financialData[1].issuanceOfStock = yfData.cashflowStatementHistory.cashflowStatements[1].issuanceOfStock.raw; 
        } else {  financialData[1].issuanceOfStock = 0 }
        
        if (yfData.cashflowStatementHistory.cashflowStatements[1].netBorrowings !== undefined && yfData.cashflowStatementHistory.cashflowStatements[1].netBorrowings !== null ){
           financialData[1].netBorrowings = yfData.cashflowStatementHistory.cashflowStatements[1].netBorrowings.raw; 
        } else {  financialData[1].netBorrowings = 0 }
        
        if (yfData.cashflowStatementHistory.cashflowStatements[1].otherCashflowsFromFinancingActivities !== undefined && yfData.cashflowStatementHistory.cashflowStatements[1].otherCashflowsFromFinancingActivities !== null ){
           financialData[1].otherCashflowsFromFinancingActivities = yfData.cashflowStatementHistory.cashflowStatements[1].otherCashflowsFromFinancingActivities.raw; 
        } else {  financialData[1].otherCashflowsFromFinancingActivities = 0 }
        
        if (yfData.cashflowStatementHistory.cashflowStatements[1].otherCashflowsFromOperatingActivities !== undefined && yfData.cashflowStatementHistory.cashflowStatements[1].otherCashflowsFromOperatingActivities !== null ){
           financialData[1].otherCashflowsFromOperatingActivities = yfData.cashflowStatementHistory.cashflowStatements[1].otherCashflowsFromOperatingActivities.raw; 
        } else {  financialData[1].otherCashflowsFromOperatingActivities = 0 }
        
        if (yfData.cashflowStatementHistory.cashflowStatements[1].otherCashflowsFromInvestingActivities !== undefined && yfData.cashflowStatementHistory.cashflowStatements[1].otherCashflowsFromInvestingActivities !== null ){
           financialData[1].otherCashflowsFromInvestingActivities = yfData.cashflowStatementHistory.cashflowStatements[1].otherCashflowsFromInvestingActivities.raw; 
        } else {  financialData[1].otherCashflowsFromInvestingActivities = 0 }
        
        if (yfData.cashflowStatementHistory.cashflowStatements[1].repurchaseOfStock !== undefined && yfData.cashflowStatementHistory.cashflowStatements[1].repurchaseOfStock !== null ){
           financialData[1].repurchaseOfStock = yfData.cashflowStatementHistory.cashflowStatements[1].repurchaseOfStock.raw; 
        } else {  financialData[1].repurchaseOfStock = 0 }
        
        if (yfData.cashflowStatementHistory.cashflowStatements[1].totalCashFromFinancingActivities !== undefined && yfData.cashflowStatementHistory.cashflowStatements[1].totalCashFromFinancingActivities !== null ){
           financialData[1].totalCashFromFinancingActivities = yfData.cashflowStatementHistory.cashflowStatements[1].totalCashFromFinancingActivities.raw; 
        } else {  financialData[1].totalCashFromFinancingActivities = 0 }
        
        if (yfData.cashflowStatementHistory.cashflowStatements[1].totalCashFromOperatingActivities !== undefined && yfData.cashflowStatementHistory.cashflowStatements[1].totalCashFromOperatingActivities !== null ){
           financialData[1].totalCashFromOperatingActivities = yfData.cashflowStatementHistory.cashflowStatements[1].totalCashFromOperatingActivities.raw; 
        } else {  financialData[1].totalCashFromOperatingActivities = 0 }
        
        if (yfData.cashflowStatementHistory.cashflowStatements[1].totalCashflowsFromInvestingActivities !== undefined && yfData.cashflowStatementHistory.cashflowStatements[1].totalCashflowsFromInvestingActivities !== null ){
           financialData[1].totalCashflowsFromInvestingActivities = yfData.cashflowStatementHistory.cashflowStatements[1].totalCashflowsFromInvestingActivities.raw; 
        } else {  financialData[1].totalCashflowsFromInvestingActivities = 0 }
        // Datos del income statement
        if (yfData.incomeStatementHistory.incomeStatementHistory[1].costOfRevenue !== undefined && yfData.incomeStatementHistory.incomeStatementHistory[1].costOfRevenue !== null ){
          financialData[1].costOfRevenue = yfData.incomeStatementHistory.incomeStatementHistory[1].costOfRevenue.raw; 
        } else { financialData[1].costOfRevenue = 0 }

        if (yfData.incomeStatementHistory.incomeStatementHistory[1].discontinuedOperations !== undefined && yfData.incomeStatementHistory.incomeStatementHistory[1].discontinuedOperations !== null ){
          financialData[1].discontinuedOperations = yfData.incomeStatementHistory.incomeStatementHistory[1].discontinuedOperations.raw; 
        } else { financialData[1].discontinuedOperations = 0 }

        if (yfData.incomeStatementHistory.incomeStatementHistory[1].ebit !== undefined && yfData.incomeStatementHistory.incomeStatementHistory[1].ebit !== null ){
          financialData[1].ebit = yfData.incomeStatementHistory.incomeStatementHistory[1].ebit.raw; 
        } else { financialData[1].ebit = 0 }

        if (yfData.incomeStatementHistory.incomeStatementHistory[1].effectOfAccountingCharges !== undefined && yfData.incomeStatementHistory.incomeStatementHistory[1].effectOfAccountingCharges !== null ){
          financialData[1].effectOfAccountingCharges = yfData.incomeStatementHistory.incomeStatementHistory[1].effectOfAccountingCharges.raw; 
        } else { financialData[1].effectOfAccountingCharges = 0 }

        if (yfData.incomeStatementHistory.incomeStatementHistory[1].extraordinaryItems !== undefined && yfData.incomeStatementHistory.incomeStatementHistory[1].extraordinaryItems !== null ){
          financialData[1].extraordinaryItems = yfData.incomeStatementHistory.incomeStatementHistory[1].extraordinaryItems.raw; 
        } else { financialData[1].extraordinaryItems = 0 }

        if (yfData.incomeStatementHistory.incomeStatementHistory[1].grossProfit !== undefined && yfData.incomeStatementHistory.incomeStatementHistory[1].grossProfit !== null ){
          financialData[1].grossProfit = yfData.incomeStatementHistory.incomeStatementHistory[1].grossProfit.raw; 
        } else { financialData[1].grossProfit = 0 }

        if (yfData.incomeStatementHistory.incomeStatementHistory[1].incomeBeforeTax !== undefined && yfData.incomeStatementHistory.incomeStatementHistory[1].incomeBeforeTax !== null ){
          financialData[1].incomeBeforeTax = yfData.incomeStatementHistory.incomeStatementHistory[1].incomeBeforeTax.raw; 
        } else { financialData[1].incomeBeforeTax = 0 }

        if (yfData.incomeStatementHistory.incomeStatementHistory[1].incomeTaxExpense !== undefined && yfData.incomeStatementHistory.incomeStatementHistory[1].incomeTaxExpense !== null ){
          financialData[1].incomeTaxExpense = yfData.incomeStatementHistory.incomeStatementHistory[1].incomeTaxExpense.raw; 
        } else { financialData[1].incomeTaxExpense = 0 }

        if (yfData.incomeStatementHistory.incomeStatementHistory[1].interestExpense !== undefined && yfData.incomeStatementHistory.incomeStatementHistory[1].interestExpense !== null ){
          financialData[1].interestExpense = yfData.incomeStatementHistory.incomeStatementHistory[1].interestExpense.raw; 
        } else { financialData[1].interestExpense = 0 }

        if (yfData.incomeStatementHistory.incomeStatementHistory[1].minorityInterest !== undefined && yfData.incomeStatementHistory.incomeStatementHistory[1].minorityInterest !== null ){
          financialData[1].minorityInterest = yfData.incomeStatementHistory.incomeStatementHistory[1].minorityInterest.raw; 
        } else { financialData[1].minorityInterest = 0 }

        if (yfData.incomeStatementHistory.incomeStatementHistory[1].netIncome !== undefined && yfData.incomeStatementHistory.incomeStatementHistory[1].netIncome !== null ){
          financialData[1].netIncome = yfData.incomeStatementHistory.incomeStatementHistory[1].netIncome.raw; 
        } else { financialData[1].netIncome = 0 }

        if (yfData.incomeStatementHistory.incomeStatementHistory[1].netIncomeApplicableToCommonShares !== undefined && yfData.incomeStatementHistory.incomeStatementHistory[1].netIncomeApplicableToCommonShares !== null ){
          financialData[1].netIncomeApplicableToCommonShares = yfData.incomeStatementHistory.incomeStatementHistory[1].netIncomeApplicableToCommonShares.raw; 
        } else { financialData[1].netIncomeApplicableToCommonShares = 0 }

        if (yfData.incomeStatementHistory.incomeStatementHistory[1].netIncomeFromContinuingOps !== undefined && yfData.incomeStatementHistory.incomeStatementHistory[1].netIncomeFromContinuingOps !== null ){
          financialData[1].netIncomeFromContinuingOps = yfData.incomeStatementHistory.incomeStatementHistory[1].netIncomeFromContinuingOps.raw; 
        } else { financialData[1].netIncomeFromContinuingOps = 0 }

        if (yfData.incomeStatementHistory.incomeStatementHistory[1].nonRecurring !== undefined && yfData.incomeStatementHistory.incomeStatementHistory[1].nonRecurring !== null ){
          financialData[1].nonRecurring = yfData.incomeStatementHistory.incomeStatementHistory[1].nonRecurring.raw; 
        } else { financialData[1].nonRecurring = 0 }

        if (yfData.incomeStatementHistory.incomeStatementHistory[1].operatingIncome !== undefined && yfData.incomeStatementHistory.incomeStatementHistory[1].operatingIncome !== null ){
          financialData[1].operatingIncome = yfData.incomeStatementHistory.incomeStatementHistory[1].operatingIncome.raw; 
        } else { financialData[1].operatingIncome = 0 }

        if (yfData.incomeStatementHistory.incomeStatementHistory[1].otherItems !== undefined && yfData.incomeStatementHistory.incomeStatementHistory[1].otherItems !== null ){
          financialData[1].otherItems = yfData.incomeStatementHistory.incomeStatementHistory[1].otherItems.raw; 
        } else { financialData[1].otherItems = 0 }

        if (yfData.incomeStatementHistory.incomeStatementHistory[1].otherOperatingExpenses !== undefined && yfData.incomeStatementHistory.incomeStatementHistory[1].otherOperatingExpenses !== null ){
          financialData[1].otherOperatingExpenses = yfData.incomeStatementHistory.incomeStatementHistory[1].otherOperatingExpenses.raw; 
        } else { financialData[1].otherOperatingExpenses = 0 }

        if (yfData.incomeStatementHistory.incomeStatementHistory[1].researchDevelopment !== undefined && yfData.incomeStatementHistory.incomeStatementHistory[1].researchDevelopment !== null ){
          financialData[1].researchDevelopment = yfData.incomeStatementHistory.incomeStatementHistory[1].researchDevelopment.raw; 
        } else { financialData[1].researchDevelopment = 0 }

        if (yfData.incomeStatementHistory.incomeStatementHistory[1].sellingGeneralAdministrative !== undefined && yfData.incomeStatementHistory.incomeStatementHistory[1].sellingGeneralAdministrative !== null ){
          financialData[1].sellingGeneralAdministrative = yfData.incomeStatementHistory.incomeStatementHistory[1].sellingGeneralAdministrative.raw; 
        } else { financialData[1].sellingGeneralAdministrative = 0 }

        if (yfData.incomeStatementHistory.incomeStatementHistory[1].totalOperatingExpenses !== undefined && yfData.incomeStatementHistory.incomeStatementHistory[1].totalOperatingExpenses !== null ){
          financialData[1].totalOperatingExpenses = yfData.incomeStatementHistory.incomeStatementHistory[1].totalOperatingExpenses.raw; 
        } else { financialData[1].totalOperatingExpenses = 0 }

        if (yfData.incomeStatementHistory.incomeStatementHistory[1].totalOtherIncomeExpenseNet !== undefined && yfData.incomeStatementHistory.incomeStatementHistory[1].totalOtherIncomeExpenseNet !== null ){
          financialData[1].totalOtherIncomeExpenseNet = yfData.incomeStatementHistory.incomeStatementHistory[1].totalOtherIncomeExpenseNet.raw; 
        } else { financialData[1].totalOtherIncomeExpenseNet = 0 }
        
        if (yfData.incomeStatementHistory.incomeStatementHistory[1].totalRevenue !== undefined && yfData.incomeStatementHistory.incomeStatementHistory[1].totalRevenue !== null ){
          financialData[1].totalRevenue = yfData.incomeStatementHistory.incomeStatementHistory[1].totalRevenue.raw; 
        } else { financialData[1].totalRevenue = 0 }

        financialData[2].financialsId = yfData.balanceSheetHistory.balanceSheetStatements[2].endDate.fmt + companyData.symbol;
        financialData[2].companyId = yfData.quoteType.symbol;
        financialData[2].period = 2;

        if (yfData.balanceSheetHistory.balanceSheetStatements[2].endDate !== undefined && yfData.balanceSheetHistory.balanceSheetStatements[2].endDate !== null ){
          financialData[2].endDate = yfData.balanceSheetHistory.balanceSheetStatements[2].endDate.fmt;
        } else { financialData[2].endDate = "" }

        financialData[2].year = financialData[2].endDate.substr(0, 4);

        if (yfData.balanceSheetHistory.balanceSheetStatements[2].accountsPayable !== undefined && yfData.balanceSheetHistory.balanceSheetStatements[2].accountsPayable !== null ){
          financialData[2].accountsPayable = yfData.balanceSheetHistory.balanceSheetStatements[2].accountsPayable.raw;
        } else { financialData[2].accountsPayable = 0 }

        if (yfData.balanceSheetHistory.balanceSheetStatements[2].capitalSurplus !== undefined && yfData.balanceSheetHistory.balanceSheetStatements[2].capitalSurplus !== null ){
          financialData[2].capitalSurplus = yfData.balanceSheetHistory.balanceSheetStatements[2].capitalSurplus.raw;
        } else { financialData[2].capitalSurplus = 0 }

        if (yfData.balanceSheetHistory.balanceSheetStatements[2].cash !== undefined && yfData.balanceSheetHistory.balanceSheetStatements[2].cash !== null ){
          financialData[2].cash = yfData.balanceSheetHistory.balanceSheetStatements[2].cash.raw;
        } else { financialData[2].cash = 0 }

        if (yfData.balanceSheetHistory.balanceSheetStatements[2].commonStock !== undefined && yfData.balanceSheetHistory.balanceSheetStatements[2].commonStock !== null ){
          financialData[2].commonStock = yfData.balanceSheetHistory.balanceSheetStatements[2].commonStock.raw;
        } else { financialData[2].commonStock = 0 }

        if (yfData.balanceSheetHistory.balanceSheetStatements[2].goodWill !== undefined && yfData.balanceSheetHistory.balanceSheetStatements[2].goodWill !== null ){
          financialData[2].goodWill = yfData.balanceSheetHistory.balanceSheetStatements[2].goodWill.raw;
        } else { financialData[2].goodWill = 0 }

        if (yfData.balanceSheetHistory.balanceSheetStatements[2].intangibleAssets !== undefined && yfData.balanceSheetHistory.balanceSheetStatements[2].intangibleAssets !== null ){
          financialData[2].intangibleAssets = yfData.balanceSheetHistory.balanceSheetStatements[2].intangibleAssets.raw;
        } else { financialData[2].intangibleAssets = 0 }

        if (yfData.balanceSheetHistory.balanceSheetStatements[2].inventory !== undefined && yfData.balanceSheetHistory.balanceSheetStatements[2].inventory !== null ){
          financialData[2].inventory = yfData.balanceSheetHistory.balanceSheetStatements[2].inventory.raw;
        } else { financialData[2].inventory = 0 }

        if (yfData.balanceSheetHistory.balanceSheetStatements[2].longTermDebt !== undefined && yfData.balanceSheetHistory.balanceSheetStatements[2].longTermDebt !== null ){
          financialData[2].longTermDebt = yfData.balanceSheetHistory.balanceSheetStatements[2].longTermDebt.raw;
        } else { financialData[2].longTermDebt = 0 }

        if (yfData.balanceSheetHistory.balanceSheetStatements[2].longTermInvestments !== undefined && yfData.balanceSheetHistory.balanceSheetStatements[2].longTermInvestments !== null ){
          financialData[2].longTermInvestments = yfData.balanceSheetHistory.balanceSheetStatements[2].longTermInvestments.raw;
        } else { financialData[2].longTermInvestments = 0 }

        if (yfData.balanceSheetHistory.balanceSheetStatements[2].netReceivables !== undefined && yfData.balanceSheetHistory.balanceSheetStatements[2].netReceivables !== null ){
          financialData[2].netReceivables = yfData.balanceSheetHistory.balanceSheetStatements[2].netReceivables.raw;
        } else { financialData[2].netReceivables = 0 }

        if (yfData.balanceSheetHistory.balanceSheetStatements[2].netTangibleAssets !== undefined && yfData.balanceSheetHistory.balanceSheetStatements[2].netTangibleAssets !== null ){
          financialData[2].netTangibleAssets = yfData.balanceSheetHistory.balanceSheetStatements[2].netTangibleAssets.raw;
        } else { financialData[2].netTangibleAssets = 0 }

        if (yfData.balanceSheetHistory.balanceSheetStatements[2].otherAssets !== undefined && yfData.balanceSheetHistory.balanceSheetStatements[2].otherAssets !== null ){
          financialData[2].otherAssets = yfData.balanceSheetHistory.balanceSheetStatements[2].otherAssets.raw;
        } else { financialData[2].otherAssets = 0 }

        if (yfData.balanceSheetHistory.balanceSheetStatements[2].otherCurrentAssets !== undefined && yfData.balanceSheetHistory.balanceSheetStatements[2].otherCurrentAssets !== null ){
          financialData[2].otherCurrentAssets = yfData.balanceSheetHistory.balanceSheetStatements[2].otherCurrentAssets.raw;
        } else { financialData[2].otherCurrentAssets = 0 }

        if (yfData.balanceSheetHistory.balanceSheetStatements[2].otherCurrentLiab !== undefined && yfData.balanceSheetHistory.balanceSheetStatements[2].otherCurrentLiab !== null ){
          financialData[2].otherCurrentLiab = yfData.balanceSheetHistory.balanceSheetStatements[2].otherCurrentLiab.raw;
        } else { financialData[2].otherCurrentLiab = 0 }

        if (yfData.balanceSheetHistory.balanceSheetStatements[2].otherLiab !== undefined && yfData.balanceSheetHistory.balanceSheetStatements[2].otherLiab !== null ){
          financialData[2].otherLiab = yfData.balanceSheetHistory.balanceSheetStatements[2].otherLiab.raw;
        } else { financialData[2].otherLiab = 0 }

        if (yfData.balanceSheetHistory.balanceSheetStatements[2].otherStockholderEquity !== undefined && yfData.balanceSheetHistory.balanceSheetStatements[2].otherStockholderEquity !== null ){
          financialData[2].otherStockholderEquity = yfData.balanceSheetHistory.balanceSheetStatements[2].otherStockholderEquity.raw;
        } else { financialData[2].otherStockholderEquity = 0 }

        if (yfData.balanceSheetHistory.balanceSheetStatements[2].propertyPlantEquipment !== undefined && yfData.balanceSheetHistory.balanceSheetStatements[2].propertyPlantEquipment !== null ){
          financialData[2].propertyPlantEquipment = yfData.balanceSheetHistory.balanceSheetStatements[2].propertyPlantEquipment.raw;
        } else { financialData[2].propertyPlantEquipment = 0 }

        if (yfData.balanceSheetHistory.balanceSheetStatements[2].retainedEarnings !== undefined && yfData.balanceSheetHistory.balanceSheetStatements[2].retainedEarnings !== null ){
          financialData[2].retainedEarnings = yfData.balanceSheetHistory.balanceSheetStatements[2].retainedEarnings.raw;
        } else { financialData[2].retainedEarnings = 0 }

        if (yfData.balanceSheetHistory.balanceSheetStatements[2].shortLongTermDebt !== undefined && yfData.balanceSheetHistory.balanceSheetStatements[2].shortLongTermDebt !== null ){
          financialData[2].shortLongTermDebt = yfData.balanceSheetHistory.balanceSheetStatements[2].shortLongTermDebt.raw;
        } else { financialData[2].shortLongTermDebt = 0 }

        if (yfData.balanceSheetHistory.balanceSheetStatements[2].shortTermInvestments !== undefined && yfData.balanceSheetHistory.balanceSheetStatements[2].shortTermInvestments !== null ){
          financialData[2].shortTermInvestments = yfData.balanceSheetHistory.balanceSheetStatements[2].shortTermInvestments.raw;
        } else { financialData[2].shortTermInvestments = 0 }

        if (yfData.balanceSheetHistory.balanceSheetStatements[2].totalAssets !== undefined && yfData.balanceSheetHistory.balanceSheetStatements[2].totalAssets !== null ){
          financialData[2].totalAssets = yfData.balanceSheetHistory.balanceSheetStatements[2].totalAssets.raw;
        } else { financialData[2].totalAssets = 0 }

        if (yfData.balanceSheetHistory.balanceSheetStatements[2].totalCurrentAssets !== undefined && yfData.balanceSheetHistory.balanceSheetStatements[2].totalCurrentAssets !== null ){
          financialData[2].totalCurrentAssets = yfData.balanceSheetHistory.balanceSheetStatements[2].totalCurrentAssets.raw;
        } else { financialData[2].totalCurrentAssets = 0 }

        if (yfData.balanceSheetHistory.balanceSheetStatements[2].totalCurrentLiabilities !== undefined && yfData.balanceSheetHistory.balanceSheetStatements[2].totalCurrentLiabilities !== null ){
          financialData[2].totalCurrentLiabilities = yfData.balanceSheetHistory.balanceSheetStatements[2].totalCurrentLiabilities.raw;
        } else { financialData[2].totalCurrentLiabilities = 0 }

        if (yfData.balanceSheetHistory.balanceSheetStatements[2].totalLiab !== undefined && yfData.balanceSheetHistory.balanceSheetStatements[2].totalLiab !== null ){
          financialData[2].totalLiab = yfData.balanceSheetHistory.balanceSheetStatements[2].totalLiab.raw;
        } else { financialData[2].totalLiab = 0 }

        if (yfData.balanceSheetHistory.balanceSheetStatements[2].totalStockholderEquity !== undefined && yfData.balanceSheetHistory.balanceSheetStatements[2].totalStockholderEquity !== null ){
          financialData[2].totalStockholderEquity = yfData.balanceSheetHistory.balanceSheetStatements[2].totalStockholderEquity.raw;
        } else { financialData[2].totalStockholderEquity = 0 }

        if (yfData.balanceSheetHistory.balanceSheetStatements[2].treasuryStock !== undefined && yfData.balanceSheetHistory.balanceSheetStatements[2].treasuryStock !== null ){
          financialData[2].treasuryStock = yfData.balanceSheetHistory.balanceSheetStatements[2].treasuryStock.raw;
        } else { financialData[2].treasuryStock = 0 }

        // Datos del flujo de caja
        if (yfData.cashflowStatementHistory.cashflowStatements[2].capitalExpenditures !== undefined && yfData.cashflowStatementHistory.cashflowStatements[2].capitalExpenditures !== null ){
           financialData[2].capitalExpenditures = yfData.cashflowStatementHistory.cashflowStatements[2].capitalExpenditures.raw; 
        } else {  financialData[2].capitalExpenditures = 0 }

        if (yfData.cashflowStatementHistory.cashflowStatements[2].changeInCash !== undefined && yfData.cashflowStatementHistory.cashflowStatements[2].changeInCash !== null ){
           financialData[2].changeInCash = yfData.cashflowStatementHistory.cashflowStatements[2].changeInCash.raw; 
        } else {  financialData[2].changeInCash = 0 }
        
        if (yfData.cashflowStatementHistory.cashflowStatements[2].changeToAccountReceivables !== undefined && yfData.cashflowStatementHistory.cashflowStatements[2].changeToAccountReceivables !== null ){
           financialData[2].changeToAccountReceivables = yfData.cashflowStatementHistory.cashflowStatements[2].changeToAccountReceivables.raw; 
        } else {  financialData[2].changeToAccountReceivables = 0 }
        
        if (yfData.cashflowStatementHistory.cashflowStatements[2].changeToInventory !== undefined && yfData.cashflowStatementHistory.cashflowStatements[2].changeToInventory !== null ){
           financialData[2].changeToInventory = yfData.cashflowStatementHistory.cashflowStatements[2].changeToInventory.raw; 
        } else {  financialData[2].changeToInventory = 0 }
        
        if (yfData.cashflowStatementHistory.cashflowStatements[2].changeToLiabilities !== undefined && yfData.cashflowStatementHistory.cashflowStatements[2].changeToLiabilities !== null ){
           financialData[2].changeToLiabilities = yfData.cashflowStatementHistory.cashflowStatements[2].changeToLiabilities.raw; 
        } else {  financialData[2].changeToLiabilities = 0 }
        
        if (yfData.cashflowStatementHistory.cashflowStatements[2].changeToNetincome !== undefined && yfData.cashflowStatementHistory.cashflowStatements[2].changeToNetincome !== null ){
           financialData[2].changeToNetincome = yfData.cashflowStatementHistory.cashflowStatements[2].changeToNetincome.raw; 
        } else {  financialData[2].changeToNetincome = 0 }
        
        if (yfData.cashflowStatementHistory.cashflowStatements[2].changeToOperatingActivities !== undefined && yfData.cashflowStatementHistory.cashflowStatements[2].changeToOperatingActivities !== null ){
           financialData[2].changeToOperatingActivities = yfData.cashflowStatementHistory.cashflowStatements[2].changeToOperatingActivities.raw; 
        } else {  financialData[2].changeToOperatingActivities = 0 }
        
        if (yfData.cashflowStatementHistory.cashflowStatements[2].depreciation !== undefined && yfData.cashflowStatementHistory.cashflowStatements[2].depreciation !== null ){
           financialData[2].depreciation = yfData.cashflowStatementHistory.cashflowStatements[2].depreciation.raw; 
        } else {  financialData[2].depreciation = 0 }
        
        if (yfData.cashflowStatementHistory.cashflowStatements[2].dividendsPaid !== undefined && yfData.cashflowStatementHistory.cashflowStatements[2].dividendsPaid !== null ){
           financialData[2].dividendsPaid = yfData.cashflowStatementHistory.cashflowStatements[2].dividendsPaid.raw; 
        } else {  financialData[2].dividendsPaid = 0 }
        
        if (yfData.cashflowStatementHistory.cashflowStatements[2].effectOfExchangeRate !== undefined && yfData.cashflowStatementHistory.cashflowStatements[2].effectOfExchangeRate !== null ){
           financialData[2].effectOfExchangeRate = yfData.cashflowStatementHistory.cashflowStatements[2].effectOfExchangeRate.raw; 
        } else {  financialData[2].effectOfExchangeRate = 0 }
        
        if (yfData.cashflowStatementHistory.cashflowStatements[2].investments !== undefined && yfData.cashflowStatementHistory.cashflowStatements[2].investments !== null ){
           financialData[2].investments = yfData.cashflowStatementHistory.cashflowStatements[2].investments.raw; 
        } else {  financialData[2].investments = 0 }
        
        if (yfData.cashflowStatementHistory.cashflowStatements[2].issuanceOfStock !== undefined && yfData.cashflowStatementHistory.cashflowStatements[2].issuanceOfStock !== null ){
           financialData[2].issuanceOfStock = yfData.cashflowStatementHistory.cashflowStatements[2].issuanceOfStock.raw; 
        } else {  financialData[2].issuanceOfStock = 0 }
        
        if (yfData.cashflowStatementHistory.cashflowStatements[2].netBorrowings !== undefined && yfData.cashflowStatementHistory.cashflowStatements[2].netBorrowings !== null ){
           financialData[2].netBorrowings = yfData.cashflowStatementHistory.cashflowStatements[2].netBorrowings.raw; 
        } else {  financialData[2].netBorrowings = 0 }
        
        if (yfData.cashflowStatementHistory.cashflowStatements[2].otherCashflowsFromFinancingActivities !== undefined && yfData.cashflowStatementHistory.cashflowStatements[2].otherCashflowsFromFinancingActivities !== null ){
           financialData[2].otherCashflowsFromFinancingActivities = yfData.cashflowStatementHistory.cashflowStatements[2].otherCashflowsFromFinancingActivities.raw; 
        } else {  financialData[2].otherCashflowsFromFinancingActivities = 0 }
        
        if (yfData.cashflowStatementHistory.cashflowStatements[2].otherCashflowsFromOperatingActivities !== undefined && yfData.cashflowStatementHistory.cashflowStatements[2].otherCashflowsFromOperatingActivities !== null ){
           financialData[2].otherCashflowsFromOperatingActivities = yfData.cashflowStatementHistory.cashflowStatements[2].otherCashflowsFromOperatingActivities.raw; 
        } else {  financialData[2].otherCashflowsFromOperatingActivities = 0 }
        
        if (yfData.cashflowStatementHistory.cashflowStatements[2].otherCashflowsFromInvestingActivities !== undefined && yfData.cashflowStatementHistory.cashflowStatements[2].otherCashflowsFromInvestingActivities !== null ){
           financialData[2].otherCashflowsFromInvestingActivities = yfData.cashflowStatementHistory.cashflowStatements[2].otherCashflowsFromInvestingActivities.raw; 
        } else {  financialData[2].otherCashflowsFromInvestingActivities = 0 }
        
        if (yfData.cashflowStatementHistory.cashflowStatements[2].repurchaseOfStock !== undefined && yfData.cashflowStatementHistory.cashflowStatements[2].repurchaseOfStock !== null ){
           financialData[2].repurchaseOfStock = yfData.cashflowStatementHistory.cashflowStatements[2].repurchaseOfStock.raw; 
        } else {  financialData[2].repurchaseOfStock = 0 }
        
        if (yfData.cashflowStatementHistory.cashflowStatements[2].totalCashFromFinancingActivities !== undefined && yfData.cashflowStatementHistory.cashflowStatements[2].totalCashFromFinancingActivities !== null ){
           financialData[2].totalCashFromFinancingActivities = yfData.cashflowStatementHistory.cashflowStatements[2].totalCashFromFinancingActivities.raw; 
        } else {  financialData[2].totalCashFromFinancingActivities = 0 }
        
        if (yfData.cashflowStatementHistory.cashflowStatements[2].totalCashFromOperatingActivities !== undefined && yfData.cashflowStatementHistory.cashflowStatements[2].totalCashFromOperatingActivities !== null ){
           financialData[2].totalCashFromOperatingActivities = yfData.cashflowStatementHistory.cashflowStatements[2].totalCashFromOperatingActivities.raw; 
        } else {  financialData[2].totalCashFromOperatingActivities = 0 }
        
        if (yfData.cashflowStatementHistory.cashflowStatements[2].totalCashflowsFromInvestingActivities !== undefined && yfData.cashflowStatementHistory.cashflowStatements[2].totalCashflowsFromInvestingActivities !== null ){
           financialData[2].totalCashflowsFromInvestingActivities = yfData.cashflowStatementHistory.cashflowStatements[2].totalCashflowsFromInvestingActivities.raw; 
        } else {  financialData[2].totalCashflowsFromInvestingActivities = 0 }
        // Datos del income statement
        if (yfData.incomeStatementHistory.incomeStatementHistory[2].costOfRevenue !== undefined && yfData.incomeStatementHistory.incomeStatementHistory[2].costOfRevenue !== null ){
          financialData[2].costOfRevenue = yfData.incomeStatementHistory.incomeStatementHistory[2].costOfRevenue.raw; 
        } else { financialData[2].costOfRevenue = 0 }

        if (yfData.incomeStatementHistory.incomeStatementHistory[2].discontinuedOperations !== undefined && yfData.incomeStatementHistory.incomeStatementHistory[2].discontinuedOperations !== null ){
          financialData[2].discontinuedOperations = yfData.incomeStatementHistory.incomeStatementHistory[2].discontinuedOperations.raw; 
        } else { financialData[2].discontinuedOperations = 0 }

        if (yfData.incomeStatementHistory.incomeStatementHistory[2].ebit !== undefined && yfData.incomeStatementHistory.incomeStatementHistory[2].ebit !== null ){
          financialData[2].ebit = yfData.incomeStatementHistory.incomeStatementHistory[2].ebit.raw; 
        } else { financialData[2].ebit = 0 }

        if (yfData.incomeStatementHistory.incomeStatementHistory[2].effectOfAccountingCharges !== undefined && yfData.incomeStatementHistory.incomeStatementHistory[2].effectOfAccountingCharges !== null ){
          financialData[2].effectOfAccountingCharges = yfData.incomeStatementHistory.incomeStatementHistory[2].effectOfAccountingCharges.raw; 
        } else { financialData[2].effectOfAccountingCharges = 0 }

        if (yfData.incomeStatementHistory.incomeStatementHistory[2].extraordinaryItems !== undefined && yfData.incomeStatementHistory.incomeStatementHistory[2].extraordinaryItems !== null ){
          financialData[2].extraordinaryItems = yfData.incomeStatementHistory.incomeStatementHistory[2].extraordinaryItems.raw; 
        } else { financialData[2].extraordinaryItems = 0 }

        if (yfData.incomeStatementHistory.incomeStatementHistory[2].grossProfit !== undefined && yfData.incomeStatementHistory.incomeStatementHistory[2].grossProfit !== null ){
          financialData[2].grossProfit = yfData.incomeStatementHistory.incomeStatementHistory[2].grossProfit.raw; 
        } else { financialData[2].grossProfit = 0 }

        if (yfData.incomeStatementHistory.incomeStatementHistory[2].incomeBeforeTax !== undefined && yfData.incomeStatementHistory.incomeStatementHistory[2].incomeBeforeTax !== null ){
          financialData[2].incomeBeforeTax = yfData.incomeStatementHistory.incomeStatementHistory[2].incomeBeforeTax.raw; 
        } else { financialData[2].incomeBeforeTax = 0 }

        if (yfData.incomeStatementHistory.incomeStatementHistory[2].incomeTaxExpense !== undefined && yfData.incomeStatementHistory.incomeStatementHistory[2].incomeTaxExpense !== null ){
          financialData[2].incomeTaxExpense = yfData.incomeStatementHistory.incomeStatementHistory[2].incomeTaxExpense.raw; 
        } else { financialData[2].incomeTaxExpense = 0 }

        if (yfData.incomeStatementHistory.incomeStatementHistory[2].interestExpense !== undefined && yfData.incomeStatementHistory.incomeStatementHistory[2].interestExpense !== null ){
          financialData[2].interestExpense = yfData.incomeStatementHistory.incomeStatementHistory[2].interestExpense.raw; 
        } else { financialData[2].interestExpense = 0 }

        if (yfData.incomeStatementHistory.incomeStatementHistory[2].minorityInterest !== undefined && yfData.incomeStatementHistory.incomeStatementHistory[2].minorityInterest !== null ){
          financialData[2].minorityInterest = yfData.incomeStatementHistory.incomeStatementHistory[2].minorityInterest.raw; 
        } else { financialData[2].minorityInterest = 0 }

        if (yfData.incomeStatementHistory.incomeStatementHistory[2].netIncome !== undefined && yfData.incomeStatementHistory.incomeStatementHistory[2].netIncome !== null ){
          financialData[2].netIncome = yfData.incomeStatementHistory.incomeStatementHistory[2].netIncome.raw; 
        } else { financialData[2].netIncome = 0 }

        if (yfData.incomeStatementHistory.incomeStatementHistory[2].netIncomeApplicableToCommonShares !== undefined && yfData.incomeStatementHistory.incomeStatementHistory[2].netIncomeApplicableToCommonShares !== null ){
          financialData[2].netIncomeApplicableToCommonShares = yfData.incomeStatementHistory.incomeStatementHistory[2].netIncomeApplicableToCommonShares.raw; 
        } else { financialData[2].netIncomeApplicableToCommonShares = 0 }

        if (yfData.incomeStatementHistory.incomeStatementHistory[2].netIncomeFromContinuingOps !== undefined && yfData.incomeStatementHistory.incomeStatementHistory[2].netIncomeFromContinuingOps !== null ){
          financialData[2].netIncomeFromContinuingOps = yfData.incomeStatementHistory.incomeStatementHistory[2].netIncomeFromContinuingOps.raw; 
        } else { financialData[2].netIncomeFromContinuingOps = 0 }

        if (yfData.incomeStatementHistory.incomeStatementHistory[2].nonRecurring !== undefined && yfData.incomeStatementHistory.incomeStatementHistory[2].nonRecurring !== null ){
          financialData[2].nonRecurring = yfData.incomeStatementHistory.incomeStatementHistory[2].nonRecurring.raw; 
        } else { financialData[2].nonRecurring = 0 }

        if (yfData.incomeStatementHistory.incomeStatementHistory[2].operatingIncome !== undefined && yfData.incomeStatementHistory.incomeStatementHistory[2].operatingIncome !== null ){
          financialData[2].operatingIncome = yfData.incomeStatementHistory.incomeStatementHistory[2].operatingIncome.raw; 
        } else { financialData[2].operatingIncome = 0 }

        if (yfData.incomeStatementHistory.incomeStatementHistory[2].otherItems !== undefined && yfData.incomeStatementHistory.incomeStatementHistory[2].otherItems !== null ){
          financialData[2].otherItems = yfData.incomeStatementHistory.incomeStatementHistory[2].otherItems.raw; 
        } else { financialData[2].otherItems = 0 }

        if (yfData.incomeStatementHistory.incomeStatementHistory[2].otherOperatingExpenses !== undefined && yfData.incomeStatementHistory.incomeStatementHistory[2].otherOperatingExpenses !== null ){
          financialData[2].otherOperatingExpenses = yfData.incomeStatementHistory.incomeStatementHistory[2].otherOperatingExpenses.raw; 
        } else { financialData[2].otherOperatingExpenses = 0 }

        if (yfData.incomeStatementHistory.incomeStatementHistory[2].researchDevelopment !== undefined && yfData.incomeStatementHistory.incomeStatementHistory[2].researchDevelopment !== null ){
          financialData[2].researchDevelopment = yfData.incomeStatementHistory.incomeStatementHistory[2].researchDevelopment.raw; 
        } else { financialData[2].researchDevelopment = 0 }

        if (yfData.incomeStatementHistory.incomeStatementHistory[2].sellingGeneralAdministrative !== undefined && yfData.incomeStatementHistory.incomeStatementHistory[2].sellingGeneralAdministrative !== null ){
          financialData[2].sellingGeneralAdministrative = yfData.incomeStatementHistory.incomeStatementHistory[2].sellingGeneralAdministrative.raw; 
        } else { financialData[2].sellingGeneralAdministrative = 0 }

        if (yfData.incomeStatementHistory.incomeStatementHistory[2].totalOperatingExpenses !== undefined && yfData.incomeStatementHistory.incomeStatementHistory[2].totalOperatingExpenses !== null ){
          financialData[2].totalOperatingExpenses = yfData.incomeStatementHistory.incomeStatementHistory[2].totalOperatingExpenses.raw; 
        } else { financialData[2].totalOperatingExpenses = 0 }

        if (yfData.incomeStatementHistory.incomeStatementHistory[2].totalOtherIncomeExpenseNet !== undefined && yfData.incomeStatementHistory.incomeStatementHistory[2].totalOtherIncomeExpenseNet !== null ){
          financialData[2].totalOtherIncomeExpenseNet = yfData.incomeStatementHistory.incomeStatementHistory[2].totalOtherIncomeExpenseNet.raw; 
        } else { financialData[2].totalOtherIncomeExpenseNet = 0 }
        
        if (yfData.incomeStatementHistory.incomeStatementHistory[2].totalRevenue !== undefined && yfData.incomeStatementHistory.incomeStatementHistory[2].totalRevenue !== null ){
          financialData[2].totalRevenue = yfData.incomeStatementHistory.incomeStatementHistory[2].totalRevenue.raw; 
        } else { financialData[2].totalRevenue = 0 }

        financialData[3].financialsId = yfData.balanceSheetHistory.balanceSheetStatements[3].endDate.fmt + yfData.quoteType.symbol;
        financialData[3].companyId = yfData.quoteType.symbol;
        financialData[3].period = 3;

        if (yfData.balanceSheetHistory.balanceSheetStatements[3].endDate !== undefined && yfData.balanceSheetHistory.balanceSheetStatements[3].endDate !== null ){
          financialData[3].endDate = yfData.balanceSheetHistory.balanceSheetStatements[3].endDate.fmt;
        } else { financialData[3].endDate = "" }

        financialData[3].year = financialData[3].endDate.substr(0, 4);

        if (yfData.balanceSheetHistory.balanceSheetStatements[3].accountsPayable !== undefined && yfData.balanceSheetHistory.balanceSheetStatements[3].accountsPayable !== null ){
          financialData[3].accountsPayable = yfData.balanceSheetHistory.balanceSheetStatements[3].accountsPayable.raw;
        } else { financialData[3].accountsPayable = 0 }

        if (yfData.balanceSheetHistory.balanceSheetStatements[3].capitalSurplus !== undefined && yfData.balanceSheetHistory.balanceSheetStatements[3].capitalSurplus !== null ){
          financialData[3].capitalSurplus = yfData.balanceSheetHistory.balanceSheetStatements[3].capitalSurplus.raw;
        } else { financialData[3].capitalSurplus = 0 }

        if (yfData.balanceSheetHistory.balanceSheetStatements[3].cash !== undefined && yfData.balanceSheetHistory.balanceSheetStatements[3].cash !== null ){
          financialData[3].cash = yfData.balanceSheetHistory.balanceSheetStatements[3].cash.raw;
        } else { financialData[3].cash = 0 }

        if (yfData.balanceSheetHistory.balanceSheetStatements[3].commonStock !== undefined && yfData.balanceSheetHistory.balanceSheetStatements[3].commonStock !== null ){
          financialData[3].commonStock = yfData.balanceSheetHistory.balanceSheetStatements[3].commonStock.raw;
        } else { financialData[3].commonStock = 0 }

        if (yfData.balanceSheetHistory.balanceSheetStatements[3].goodWill !== undefined && yfData.balanceSheetHistory.balanceSheetStatements[3].goodWill !== null ){
          financialData[3].goodWill = yfData.balanceSheetHistory.balanceSheetStatements[3].goodWill.raw;
        } else { financialData[3].goodWill = 0 }

        if (yfData.balanceSheetHistory.balanceSheetStatements[3].intangibleAssets !== undefined && yfData.balanceSheetHistory.balanceSheetStatements[3].intangibleAssets !== null ){
          financialData[3].intangibleAssets = yfData.balanceSheetHistory.balanceSheetStatements[3].intangibleAssets.raw;
        } else { financialData[3].intangibleAssets = 0 }

        if (yfData.balanceSheetHistory.balanceSheetStatements[3].inventory !== undefined && yfData.balanceSheetHistory.balanceSheetStatements[3].inventory !== null ){
          financialData[3].inventory = yfData.balanceSheetHistory.balanceSheetStatements[3].inventory.raw;
        } else { financialData[3].inventory = 0 }

        if (yfData.balanceSheetHistory.balanceSheetStatements[3].longTermDebt !== undefined && yfData.balanceSheetHistory.balanceSheetStatements[3].longTermDebt !== null ){
          financialData[3].longTermDebt = yfData.balanceSheetHistory.balanceSheetStatements[3].longTermDebt.raw;
        } else { financialData[3].longTermDebt = 0 }

        if (yfData.balanceSheetHistory.balanceSheetStatements[3].longTermInvestments !== undefined && yfData.balanceSheetHistory.balanceSheetStatements[3].longTermInvestments !== null ){
          financialData[3].longTermInvestments = yfData.balanceSheetHistory.balanceSheetStatements[3].longTermInvestments.raw;
        } else { financialData[3].longTermInvestments = 0 }

        if (yfData.balanceSheetHistory.balanceSheetStatements[3].netReceivables !== undefined && yfData.balanceSheetHistory.balanceSheetStatements[3].netReceivables !== null ){
          financialData[3].netReceivables = yfData.balanceSheetHistory.balanceSheetStatements[3].netReceivables.raw;
        } else { financialData[3].netReceivables = 0 }

        if (yfData.balanceSheetHistory.balanceSheetStatements[3].netTangibleAssets !== undefined && yfData.balanceSheetHistory.balanceSheetStatements[3].netTangibleAssets !== null ){
          financialData[3].netTangibleAssets = yfData.balanceSheetHistory.balanceSheetStatements[3].netTangibleAssets.raw;
        } else { financialData[3].netTangibleAssets = 0 }

        if (yfData.balanceSheetHistory.balanceSheetStatements[3].otherAssets !== undefined && yfData.balanceSheetHistory.balanceSheetStatements[3].otherAssets !== null ){
          financialData[3].otherAssets = yfData.balanceSheetHistory.balanceSheetStatements[3].otherAssets.raw;
        } else { financialData[3].otherAssets = 0 }

        if (yfData.balanceSheetHistory.balanceSheetStatements[3].otherCurrentAssets !== undefined && yfData.balanceSheetHistory.balanceSheetStatements[3].otherCurrentAssets !== null ){
          financialData[3].otherCurrentAssets = yfData.balanceSheetHistory.balanceSheetStatements[3].otherCurrentAssets.raw;
        } else { financialData[3].otherCurrentAssets = 0 }

        if (yfData.balanceSheetHistory.balanceSheetStatements[3].otherCurrentLiab !== undefined && yfData.balanceSheetHistory.balanceSheetStatements[3].otherCurrentLiab !== null ){
          financialData[3].otherCurrentLiab = yfData.balanceSheetHistory.balanceSheetStatements[3].otherCurrentLiab.raw;
        } else { financialData[3].otherCurrentLiab = 0 }

        if (yfData.balanceSheetHistory.balanceSheetStatements[3].otherLiab !== undefined && yfData.balanceSheetHistory.balanceSheetStatements[3].otherLiab !== null ){
          financialData[3].otherLiab = yfData.balanceSheetHistory.balanceSheetStatements[3].otherLiab.raw;
        } else { financialData[3].otherLiab = 0 }

        if (yfData.balanceSheetHistory.balanceSheetStatements[3].otherStockholderEquity !== undefined && yfData.balanceSheetHistory.balanceSheetStatements[3].otherStockholderEquity !== null ){
          financialData[3].otherStockholderEquity = yfData.balanceSheetHistory.balanceSheetStatements[3].otherStockholderEquity.raw;
        } else { financialData[3].otherStockholderEquity = 0 }

        if (yfData.balanceSheetHistory.balanceSheetStatements[3].propertyPlantEquipment !== undefined && yfData.balanceSheetHistory.balanceSheetStatements[3].propertyPlantEquipment !== null ){
          financialData[3].propertyPlantEquipment = yfData.balanceSheetHistory.balanceSheetStatements[3].propertyPlantEquipment.raw;
        } else { financialData[3].propertyPlantEquipment = 0 }

        if (yfData.balanceSheetHistory.balanceSheetStatements[3].retainedEarnings !== undefined && yfData.balanceSheetHistory.balanceSheetStatements[3].retainedEarnings !== null ){
          financialData[3].retainedEarnings = yfData.balanceSheetHistory.balanceSheetStatements[3].retainedEarnings.raw;
        } else { financialData[3].retainedEarnings = 0 }

        if (yfData.balanceSheetHistory.balanceSheetStatements[3].shortLongTermDebt !== undefined && yfData.balanceSheetHistory.balanceSheetStatements[3].shortLongTermDebt !== null ){
          financialData[3].shortLongTermDebt = yfData.balanceSheetHistory.balanceSheetStatements[3].shortLongTermDebt.raw;
        } else { financialData[3].shortLongTermDebt = 0 }

        if (yfData.balanceSheetHistory.balanceSheetStatements[3].shortTermInvestments !== undefined && yfData.balanceSheetHistory.balanceSheetStatements[3].shortTermInvestments !== null ){
          financialData[3].shortTermInvestments = yfData.balanceSheetHistory.balanceSheetStatements[3].shortTermInvestments.raw;
        } else { financialData[3].shortTermInvestments = 0 }

        if (yfData.balanceSheetHistory.balanceSheetStatements[3].totalAssets !== undefined && yfData.balanceSheetHistory.balanceSheetStatements[3].totalAssets !== null ){
          financialData[3].totalAssets = yfData.balanceSheetHistory.balanceSheetStatements[3].totalAssets.raw;
        } else { financialData[3].totalAssets = 0 }

        if (yfData.balanceSheetHistory.balanceSheetStatements[3].totalCurrentAssets !== undefined && yfData.balanceSheetHistory.balanceSheetStatements[3].totalCurrentAssets !== null ){
          financialData[3].totalCurrentAssets = yfData.balanceSheetHistory.balanceSheetStatements[3].totalCurrentAssets.raw;
        } else { financialData[3].totalCurrentAssets = 0 }

        if (yfData.balanceSheetHistory.balanceSheetStatements[3].totalCurrentLiabilities !== undefined && yfData.balanceSheetHistory.balanceSheetStatements[3].totalCurrentLiabilities !== null ){
          financialData[3].totalCurrentLiabilities = yfData.balanceSheetHistory.balanceSheetStatements[3].totalCurrentLiabilities.raw;
        } else { financialData[3].totalCurrentLiabilities = 0 }

        if (yfData.balanceSheetHistory.balanceSheetStatements[3].totalLiab !== undefined && yfData.balanceSheetHistory.balanceSheetStatements[3].totalLiab !== null ){
          financialData[3].totalLiab = yfData.balanceSheetHistory.balanceSheetStatements[3].totalLiab.raw;
        } else { financialData[3].totalLiab = 0 }

        if (yfData.balanceSheetHistory.balanceSheetStatements[3].totalStockholderEquity !== undefined && yfData.balanceSheetHistory.balanceSheetStatements[3].totalStockholderEquity !== null ){
          financialData[3].totalStockholderEquity = yfData.balanceSheetHistory.balanceSheetStatements[3].totalStockholderEquity.raw;
        } else { financialData[3].totalStockholderEquity = 0 }

        if (yfData.balanceSheetHistory.balanceSheetStatements[3].treasuryStock !== undefined && yfData.balanceSheetHistory.balanceSheetStatements[3].treasuryStock !== null ){
          financialData[3].treasuryStock = yfData.balanceSheetHistory.balanceSheetStatements[3].treasuryStock.raw;
        } else { financialData[3].treasuryStock = 0 }

        // Datos del flujo de caja
        if (yfData.cashflowStatementHistory.cashflowStatements[3].capitalExpenditures !== undefined && yfData.cashflowStatementHistory.cashflowStatements[3].capitalExpenditures !== null ){
           financialData[3].capitalExpenditures = yfData.cashflowStatementHistory.cashflowStatements[3].capitalExpenditures.raw; 
        } else {  financialData[3].capitalExpenditures = 0 }

        if (yfData.cashflowStatementHistory.cashflowStatements[3].changeInCash !== undefined && yfData.cashflowStatementHistory.cashflowStatements[3].changeInCash !== null ){
           financialData[3].changeInCash = yfData.cashflowStatementHistory.cashflowStatements[3].changeInCash.raw; 
        } else {  financialData[3].changeInCash = 0 }
        
        if (yfData.cashflowStatementHistory.cashflowStatements[3].changeToAccountReceivables !== undefined && yfData.cashflowStatementHistory.cashflowStatements[3].changeToAccountReceivables !== null ){
           financialData[3].changeToAccountReceivables = yfData.cashflowStatementHistory.cashflowStatements[3].changeToAccountReceivables.raw; 
        } else {  financialData[3].changeToAccountReceivables = 0 }
        
        if (yfData.cashflowStatementHistory.cashflowStatements[3].changeToInventory !== undefined && yfData.cashflowStatementHistory.cashflowStatements[3].changeToInventory !== null ){
           financialData[3].changeToInventory = yfData.cashflowStatementHistory.cashflowStatements[3].changeToInventory.raw; 
        } else {  financialData[3].changeToInventory = 0 }
        
        if (yfData.cashflowStatementHistory.cashflowStatements[3].changeToLiabilities !== undefined && yfData.cashflowStatementHistory.cashflowStatements[3].changeToLiabilities !== null ){
           financialData[3].changeToLiabilities = yfData.cashflowStatementHistory.cashflowStatements[3].changeToLiabilities.raw; 
        } else {  financialData[3].changeToLiabilities = 0 }
        
        if (yfData.cashflowStatementHistory.cashflowStatements[3].changeToNetincome !== undefined && yfData.cashflowStatementHistory.cashflowStatements[3].changeToNetincome !== null ){
           financialData[3].changeToNetincome = yfData.cashflowStatementHistory.cashflowStatements[3].changeToNetincome.raw; 
        } else {  financialData[3].changeToNetincome = 0 }
        
        if (yfData.cashflowStatementHistory.cashflowStatements[3].changeToOperatingActivities !== undefined && yfData.cashflowStatementHistory.cashflowStatements[3].changeToOperatingActivities !== null ){
           financialData[3].changeToOperatingActivities = yfData.cashflowStatementHistory.cashflowStatements[3].changeToOperatingActivities.raw; 
        } else {  financialData[3].changeToOperatingActivities = 0 }
        
        if (yfData.cashflowStatementHistory.cashflowStatements[3].depreciation !== undefined && yfData.cashflowStatementHistory.cashflowStatements[3].depreciation !== null ){
           financialData[3].depreciation = yfData.cashflowStatementHistory.cashflowStatements[3].depreciation.raw; 
        } else {  financialData[3].depreciation = 0 }
        
        if (yfData.cashflowStatementHistory.cashflowStatements[3].dividendsPaid !== undefined && yfData.cashflowStatementHistory.cashflowStatements[3].dividendsPaid !== null ){
           financialData[3].dividendsPaid = yfData.cashflowStatementHistory.cashflowStatements[3].dividendsPaid.raw; 
        } else {  financialData[3].dividendsPaid = 0 }
        
        if (yfData.cashflowStatementHistory.cashflowStatements[3].effectOfExchangeRate !== undefined && yfData.cashflowStatementHistory.cashflowStatements[3].effectOfExchangeRate !== null ){
           financialData[3].effectOfExchangeRate = yfData.cashflowStatementHistory.cashflowStatements[3].effectOfExchangeRate.raw; 
        } else {  financialData[3].effectOfExchangeRate = 0 }
        
        if (yfData.cashflowStatementHistory.cashflowStatements[3].investments !== undefined && yfData.cashflowStatementHistory.cashflowStatements[3].investments !== null ){
           financialData[3].investments = yfData.cashflowStatementHistory.cashflowStatements[3].investments.raw; 
        } else {  financialData[3].investments = 0 }
        
        if (yfData.cashflowStatementHistory.cashflowStatements[3].issuanceOfStock !== undefined && yfData.cashflowStatementHistory.cashflowStatements[3].issuanceOfStock !== null ){
           financialData[3].issuanceOfStock = yfData.cashflowStatementHistory.cashflowStatements[3].issuanceOfStock.raw; 
        } else {  financialData[3].issuanceOfStock = 0 }
        
        if (yfData.cashflowStatementHistory.cashflowStatements[3].netBorrowings !== undefined && yfData.cashflowStatementHistory.cashflowStatements[3].netBorrowings !== null ){
           financialData[3].netBorrowings = yfData.cashflowStatementHistory.cashflowStatements[3].netBorrowings.raw; 
        } else {  financialData[3].netBorrowings = 0 }
        
        if (yfData.cashflowStatementHistory.cashflowStatements[3].otherCashflowsFromFinancingActivities !== undefined && yfData.cashflowStatementHistory.cashflowStatements[3].otherCashflowsFromFinancingActivities !== null ){
           financialData[3].otherCashflowsFromFinancingActivities = yfData.cashflowStatementHistory.cashflowStatements[3].otherCashflowsFromFinancingActivities.raw; 
        } else {  financialData[3].otherCashflowsFromFinancingActivities = 0 }
        
        if (yfData.cashflowStatementHistory.cashflowStatements[3].otherCashflowsFromOperatingActivities !== undefined && yfData.cashflowStatementHistory.cashflowStatements[3].otherCashflowsFromOperatingActivities !== null ){
           financialData[3].otherCashflowsFromOperatingActivities = yfData.cashflowStatementHistory.cashflowStatements[3].otherCashflowsFromOperatingActivities.raw; 
        } else {  financialData[3].otherCashflowsFromOperatingActivities = 0 }
        
        if (yfData.cashflowStatementHistory.cashflowStatements[3].otherCashflowsFromInvestingActivities !== undefined && yfData.cashflowStatementHistory.cashflowStatements[3].otherCashflowsFromInvestingActivities !== null ){
           financialData[3].otherCashflowsFromInvestingActivities = yfData.cashflowStatementHistory.cashflowStatements[3].otherCashflowsFromInvestingActivities.raw; 
        } else {  financialData[3].otherCashflowsFromInvestingActivities = 0 }
        
        if (yfData.cashflowStatementHistory.cashflowStatements[3].repurchaseOfStock !== undefined && yfData.cashflowStatementHistory.cashflowStatements[3].repurchaseOfStock !== null ){
           financialData[3].repurchaseOfStock = yfData.cashflowStatementHistory.cashflowStatements[3].repurchaseOfStock.raw; 
        } else {  financialData[3].repurchaseOfStock = 0 }
        
        if (yfData.cashflowStatementHistory.cashflowStatements[3].totalCashFromFinancingActivities !== undefined && yfData.cashflowStatementHistory.cashflowStatements[3].totalCashFromFinancingActivities !== null ){
           financialData[3].totalCashFromFinancingActivities = yfData.cashflowStatementHistory.cashflowStatements[3].totalCashFromFinancingActivities.raw; 
        } else {  financialData[3].totalCashFromFinancingActivities = 0 }
        
        if (yfData.cashflowStatementHistory.cashflowStatements[3].totalCashFromOperatingActivities !== undefined && yfData.cashflowStatementHistory.cashflowStatements[3].totalCashFromOperatingActivities !== null ){
           financialData[3].totalCashFromOperatingActivities = yfData.cashflowStatementHistory.cashflowStatements[3].totalCashFromOperatingActivities.raw; 
        } else {  financialData[3].totalCashFromOperatingActivities = 0 }
        
        if (yfData.cashflowStatementHistory.cashflowStatements[3].totalCashflowsFromInvestingActivities !== undefined && yfData.cashflowStatementHistory.cashflowStatements[3].totalCashflowsFromInvestingActivities !== null ){
           financialData[3].totalCashflowsFromInvestingActivities = yfData.cashflowStatementHistory.cashflowStatements[3].totalCashflowsFromInvestingActivities.raw; 
        } else {  financialData[3].totalCashflowsFromInvestingActivities = 0 }
        // Datos del income statement
        if (yfData.incomeStatementHistory.incomeStatementHistory[3].costOfRevenue !== undefined && yfData.incomeStatementHistory.incomeStatementHistory[3].costOfRevenue !== null ){
          financialData[3].costOfRevenue = yfData.incomeStatementHistory.incomeStatementHistory[3].costOfRevenue.raw; 
        } else { financialData[3].costOfRevenue = 0 }

        if (yfData.incomeStatementHistory.incomeStatementHistory[3].discontinuedOperations !== undefined && yfData.incomeStatementHistory.incomeStatementHistory[3].discontinuedOperations !== null ){
          financialData[3].discontinuedOperations = yfData.incomeStatementHistory.incomeStatementHistory[3].discontinuedOperations.raw; 
        } else { financialData[3].discontinuedOperations = 0 }

        if (yfData.incomeStatementHistory.incomeStatementHistory[3].ebit !== undefined && yfData.incomeStatementHistory.incomeStatementHistory[3].ebit !== null ){
          financialData[3].ebit = yfData.incomeStatementHistory.incomeStatementHistory[3].ebit.raw; 
        } else { financialData[3].ebit = 0 }

        if (yfData.incomeStatementHistory.incomeStatementHistory[3].effectOfAccountingCharges !== undefined && yfData.incomeStatementHistory.incomeStatementHistory[3].effectOfAccountingCharges !== null ){
          financialData[3].effectOfAccountingCharges = yfData.incomeStatementHistory.incomeStatementHistory[3].effectOfAccountingCharges.raw; 
        } else { financialData[3].effectOfAccountingCharges = 0 }

        if (yfData.incomeStatementHistory.incomeStatementHistory[3].extraordinaryItems !== undefined && yfData.incomeStatementHistory.incomeStatementHistory[3].extraordinaryItems !== null ){
          financialData[3].extraordinaryItems = yfData.incomeStatementHistory.incomeStatementHistory[3].extraordinaryItems.raw; 
        } else { financialData[3].extraordinaryItems = 0 }

        if (yfData.incomeStatementHistory.incomeStatementHistory[3].grossProfit !== undefined && yfData.incomeStatementHistory.incomeStatementHistory[3].grossProfit !== null ){
          financialData[3].grossProfit = yfData.incomeStatementHistory.incomeStatementHistory[3].grossProfit.raw; 
        } else { financialData[3].grossProfit = 0 }

        if (yfData.incomeStatementHistory.incomeStatementHistory[3].incomeBeforeTax !== undefined && yfData.incomeStatementHistory.incomeStatementHistory[3].incomeBeforeTax !== null ){
          financialData[3].incomeBeforeTax = yfData.incomeStatementHistory.incomeStatementHistory[3].incomeBeforeTax.raw; 
        } else { financialData[3].incomeBeforeTax = 0 }

        if (yfData.incomeStatementHistory.incomeStatementHistory[3].incomeTaxExpense !== undefined && yfData.incomeStatementHistory.incomeStatementHistory[3].incomeTaxExpense !== null ){
          financialData[3].incomeTaxExpense = yfData.incomeStatementHistory.incomeStatementHistory[3].incomeTaxExpense.raw; 
        } else { financialData[3].incomeTaxExpense = 0 }

        if (yfData.incomeStatementHistory.incomeStatementHistory[3].interestExpense !== undefined && yfData.incomeStatementHistory.incomeStatementHistory[3].interestExpense !== null ){
          financialData[3].interestExpense = yfData.incomeStatementHistory.incomeStatementHistory[3].interestExpense.raw; 
        } else { financialData[3].interestExpense = 0 }

        if (yfData.incomeStatementHistory.incomeStatementHistory[3].minorityInterest !== undefined && yfData.incomeStatementHistory.incomeStatementHistory[3].minorityInterest !== null ){
          financialData[3].minorityInterest = yfData.incomeStatementHistory.incomeStatementHistory[3].minorityInterest.raw; 
        } else { financialData[3].minorityInterest = 0 }

        if (yfData.incomeStatementHistory.incomeStatementHistory[3].netIncome !== undefined && yfData.incomeStatementHistory.incomeStatementHistory[3].netIncome !== null ){
          financialData[3].netIncome = yfData.incomeStatementHistory.incomeStatementHistory[3].netIncome.raw; 
        } else { financialData[3].netIncome = 0 }

        if (yfData.incomeStatementHistory.incomeStatementHistory[3].netIncomeApplicableToCommonShares !== undefined && yfData.incomeStatementHistory.incomeStatementHistory[3].netIncomeApplicableToCommonShares !== null ){
          financialData[3].netIncomeApplicableToCommonShares = yfData.incomeStatementHistory.incomeStatementHistory[3].netIncomeApplicableToCommonShares.raw; 
        } else { financialData[3].netIncomeApplicableToCommonShares = 0 }

        if (yfData.incomeStatementHistory.incomeStatementHistory[3].netIncomeFromContinuingOps !== undefined && yfData.incomeStatementHistory.incomeStatementHistory[3].netIncomeFromContinuingOps !== null ){
          financialData[3].netIncomeFromContinuingOps = yfData.incomeStatementHistory.incomeStatementHistory[3].netIncomeFromContinuingOps.raw; 
        } else { financialData[3].netIncomeFromContinuingOps = 0 }

        if (yfData.incomeStatementHistory.incomeStatementHistory[3].nonRecurring !== undefined && yfData.incomeStatementHistory.incomeStatementHistory[3].nonRecurring !== null ){
          financialData[3].nonRecurring = yfData.incomeStatementHistory.incomeStatementHistory[3].nonRecurring.raw; 
        } else { financialData[3].nonRecurring = 0 }

        if (yfData.incomeStatementHistory.incomeStatementHistory[3].operatingIncome !== undefined && yfData.incomeStatementHistory.incomeStatementHistory[3].operatingIncome !== null ){
          financialData[3].operatingIncome = yfData.incomeStatementHistory.incomeStatementHistory[3].operatingIncome.raw; 
        } else { financialData[3].operatingIncome = 0 }

        if (yfData.incomeStatementHistory.incomeStatementHistory[3].otherItems !== undefined && yfData.incomeStatementHistory.incomeStatementHistory[3].otherItems !== null ){
          financialData[3].otherItems = yfData.incomeStatementHistory.incomeStatementHistory[3].otherItems.raw; 
        } else { financialData[3].otherItems = 0 }

        if (yfData.incomeStatementHistory.incomeStatementHistory[3].otherOperatingExpenses !== undefined && yfData.incomeStatementHistory.incomeStatementHistory[3].otherOperatingExpenses !== null ){
          financialData[3].otherOperatingExpenses = yfData.incomeStatementHistory.incomeStatementHistory[3].otherOperatingExpenses.raw; 
        } else { financialData[3].otherOperatingExpenses = 0 }

        if (yfData.incomeStatementHistory.incomeStatementHistory[3].researchDevelopment !== undefined && yfData.incomeStatementHistory.incomeStatementHistory[3].researchDevelopment !== null ){
          financialData[3].researchDevelopment = yfData.incomeStatementHistory.incomeStatementHistory[3].researchDevelopment.raw; 
        } else { financialData[3].researchDevelopment = 0 }

        if (yfData.incomeStatementHistory.incomeStatementHistory[3].sellingGeneralAdministrative !== undefined && yfData.incomeStatementHistory.incomeStatementHistory[3].sellingGeneralAdministrative !== null ){
          financialData[3].sellingGeneralAdministrative = yfData.incomeStatementHistory.incomeStatementHistory[3].sellingGeneralAdministrative.raw; 
        } else { financialData[3].sellingGeneralAdministrative = 0 }

        if (yfData.incomeStatementHistory.incomeStatementHistory[3].totalOperatingExpenses !== undefined && yfData.incomeStatementHistory.incomeStatementHistory[3].totalOperatingExpenses !== null ){
          financialData[3].totalOperatingExpenses = yfData.incomeStatementHistory.incomeStatementHistory[3].totalOperatingExpenses.raw; 
        } else { financialData[3].totalOperatingExpenses = 0 }

        if (yfData.incomeStatementHistory.incomeStatementHistory[3].totalOtherIncomeExpenseNet !== undefined && yfData.incomeStatementHistory.incomeStatementHistory[3].totalOtherIncomeExpenseNet !== null ){
          financialData[3].totalOtherIncomeExpenseNet = yfData.incomeStatementHistory.incomeStatementHistory[3].totalOtherIncomeExpenseNet.raw; 
        } else { financialData[3].totalOtherIncomeExpenseNet = 0 }
        
        if (yfData.incomeStatementHistory.incomeStatementHistory[3].totalRevenue !== undefined && yfData.incomeStatementHistory.incomeStatementHistory[3].totalRevenue !== null ){
          financialData[3].totalRevenue = yfData.incomeStatementHistory.incomeStatementHistory[3].totalRevenue.raw; 
        } else { financialData[3].totalRevenue = 0 }

        console.log(financialData[0]);
        console.log(financialData[1]);
        console.log(financialData[2]);
        console.log(financialData[3]);
//************************************************************************* */

        financialQtrData[0].financialsId = yfData.balanceSheetHistoryQuarterly.balanceSheetStatements[0].endDate.fmt + yfData.quoteType.symbol;;
        financialQtrData[0].companyId = yfData.quoteType.symbol;
        financialQtrData[0].period = 0;

        if (yfData.balanceSheetHistoryQuarterly.balanceSheetStatements[0].endDate !== undefined && yfData.balanceSheetHistoryQuarterly.balanceSheetStatements[0].endDate !== null ){
          financialQtrData[0].endDate = yfData.balanceSheetHistoryQuarterly.balanceSheetStatements[0].endDate.fmt;
        } else { financialQtrData[0].endDate = "" }

        financialQtrData[0].quarter = financialQtrData[0].endDate.substr(0, 7);       

                
        if (yfData.balanceSheetHistoryQuarterly.balanceSheetStatements[0].accountsPayable !== undefined && yfData.balanceSheetHistoryQuarterly.balanceSheetStatements[0].accountsPayable !== null ){
          financialQtrData[0].accountsPayable = yfData.balanceSheetHistoryQuarterly.balanceSheetStatements[0].accountsPayable.raw;
        } else { financialQtrData[0].accountsPayable = 0 }

        if (yfData.balanceSheetHistoryQuarterly.balanceSheetStatements[0].capitalSurplus !== undefined && yfData.balanceSheetHistoryQuarterly.balanceSheetStatements[0].capitalSurplus !== null ){
          financialQtrData[0].capitalSurplus = yfData.balanceSheetHistoryQuarterly.balanceSheetStatements[0].capitalSurplus.raw;
        } else { financialQtrData[0].capitalSurplus = 0 }

        if (yfData.balanceSheetHistoryQuarterly.balanceSheetStatements[0].cash !== undefined && yfData.balanceSheetHistoryQuarterly.balanceSheetStatements[0].cash !== null ){
          financialQtrData[0].cash = yfData.balanceSheetHistoryQuarterly.balanceSheetStatements[0].cash.raw;
        } else { financialQtrData[0].cash = 0 }

        if (yfData.balanceSheetHistoryQuarterly.balanceSheetStatements[0].commonStock !== undefined && yfData.balanceSheetHistoryQuarterly.balanceSheetStatements[0].commonStock !== null ){
          financialQtrData[0].commonStock = yfData.balanceSheetHistoryQuarterly.balanceSheetStatements[0].commonStock.raw;
        } else { financialQtrData[0].commonStock = 0 }

        if (yfData.balanceSheetHistoryQuarterly.balanceSheetStatements[0].goodWill !== undefined && yfData.balanceSheetHistoryQuarterly.balanceSheetStatements[0].goodWill !== null ){
          financialQtrData[0].goodWill = yfData.balanceSheetHistoryQuarterly.balanceSheetStatements[0].goodWill.raw;
        } else { financialQtrData[0].goodWill = 0 }

        if (yfData.balanceSheetHistoryQuarterly.balanceSheetStatements[0].intangibleAssets !== undefined && yfData.balanceSheetHistoryQuarterly.balanceSheetStatements[0].intangibleAssets !== null ){
          financialQtrData[0].intangibleAssets = yfData.balanceSheetHistoryQuarterly.balanceSheetStatements[0].intangibleAssets.raw;
        } else { financialQtrData[0].intangibleAssets = 0 }

        if (yfData.balanceSheetHistoryQuarterly.balanceSheetStatements[0].inventory !== undefined && yfData.balanceSheetHistoryQuarterly.balanceSheetStatements[0].inventory !== null ){
          financialQtrData[0].inventory = yfData.balanceSheetHistoryQuarterly.balanceSheetStatements[0].inventory.raw;
        } else { financialQtrData[0].inventory = 0 }

        if (yfData.balanceSheetHistoryQuarterly.balanceSheetStatements[0].longTermDebt !== undefined && yfData.balanceSheetHistoryQuarterly.balanceSheetStatements[0].longTermDebt !== null ){
          financialQtrData[0].longTermDebt = yfData.balanceSheetHistoryQuarterly.balanceSheetStatements[0].longTermDebt.raw;
        } else { financialQtrData[0].longTermDebt = 0 }

        if (yfData.balanceSheetHistoryQuarterly.balanceSheetStatements[0].longTermInvestments !== undefined && yfData.balanceSheetHistoryQuarterly.balanceSheetStatements[0].longTermInvestments !== null ){
          financialQtrData[0].longTermInvestments = yfData.balanceSheetHistoryQuarterly.balanceSheetStatements[0].longTermInvestments.raw;
        } else { financialQtrData[0].longTermInvestments = 0 }

        if (yfData.balanceSheetHistoryQuarterly.balanceSheetStatements[0].netReceivables !== undefined && yfData.balanceSheetHistoryQuarterly.balanceSheetStatements[0].netReceivables !== null ){
          financialQtrData[0].netReceivables = yfData.balanceSheetHistoryQuarterly.balanceSheetStatements[0].netReceivables.raw;
        } else { financialQtrData[0].netReceivables = 0 }

        if (yfData.balanceSheetHistoryQuarterly.balanceSheetStatements[0].netTangibleAssets !== undefined && yfData.balanceSheetHistoryQuarterly.balanceSheetStatements[0].netTangibleAssets !== null ){
          financialQtrData[0].netTangibleAssets = yfData.balanceSheetHistoryQuarterly.balanceSheetStatements[0].netTangibleAssets.raw;
        } else { financialQtrData[0].netTangibleAssets = 0 }

        if (yfData.balanceSheetHistoryQuarterly.balanceSheetStatements[0].otherAssets !== undefined && yfData.balanceSheetHistoryQuarterly.balanceSheetStatements[0].otherAssets !== null ){
          financialQtrData[0].otherAssets = yfData.balanceSheetHistoryQuarterly.balanceSheetStatements[0].otherAssets.raw;
        } else { financialQtrData[0].otherAssets = 0 }

        if (yfData.balanceSheetHistoryQuarterly.balanceSheetStatements[0].otherCurrentAssets !== undefined && yfData.balanceSheetHistoryQuarterly.balanceSheetStatements[0].otherCurrentAssets !== null ){
          financialQtrData[0].otherCurrentAssets = yfData.balanceSheetHistoryQuarterly.balanceSheetStatements[0].otherCurrentAssets.raw;
        } else { financialQtrData[0].otherCurrentAssets = 0 }

        if (yfData.balanceSheetHistoryQuarterly.balanceSheetStatements[0].otherCurrentLiab !== undefined && yfData.balanceSheetHistoryQuarterly.balanceSheetStatements[0].otherCurrentLiab !== null ){
          financialQtrData[0].otherCurrentLiab = yfData.balanceSheetHistoryQuarterly.balanceSheetStatements[0].otherCurrentLiab.raw;
        } else { financialQtrData[0].otherCurrentLiab = 0 }

        if (yfData.balanceSheetHistoryQuarterly.balanceSheetStatements[0].otherLiab !== undefined && yfData.balanceSheetHistoryQuarterly.balanceSheetStatements[0].otherLiab !== null ){
          financialQtrData[0].otherLiab = yfData.balanceSheetHistoryQuarterly.balanceSheetStatements[0].otherLiab.raw;
        } else { financialQtrData[0].otherLiab = 0 }

        if (yfData.balanceSheetHistoryQuarterly.balanceSheetStatements[0].otherStockholderEquity !== undefined && yfData.balanceSheetHistoryQuarterly.balanceSheetStatements[0].otherStockholderEquity !== null ){
          financialQtrData[0].otherStockholderEquity = yfData.balanceSheetHistoryQuarterly.balanceSheetStatements[0].otherStockholderEquity.raw;
        } else { financialQtrData[0].otherStockholderEquity = 0 }

        if (yfData.balanceSheetHistoryQuarterly.balanceSheetStatements[0].propertyPlantEquipment !== undefined && yfData.balanceSheetHistoryQuarterly.balanceSheetStatements[0].propertyPlantEquipment !== null ){
          financialQtrData[0].propertyPlantEquipment = yfData.balanceSheetHistoryQuarterly.balanceSheetStatements[0].propertyPlantEquipment.raw;
        } else { financialQtrData[0].propertyPlantEquipment = 0 }

        if (yfData.balanceSheetHistoryQuarterly.balanceSheetStatements[0].retainedEarnings !== undefined && yfData.balanceSheetHistoryQuarterly.balanceSheetStatements[0].retainedEarnings !== null ){
          financialQtrData[0].retainedEarnings = yfData.balanceSheetHistoryQuarterly.balanceSheetStatements[0].retainedEarnings.raw;
        } else { financialQtrData[0].retainedEarnings = 0 }

        if (yfData.balanceSheetHistoryQuarterly.balanceSheetStatements[0].shortLongTermDebt !== undefined && yfData.balanceSheetHistoryQuarterly.balanceSheetStatements[0].shortLongTermDebt !== null ){
          financialQtrData[0].shortLongTermDebt = yfData.balanceSheetHistoryQuarterly.balanceSheetStatements[0].shortLongTermDebt.raw;
        } else { financialQtrData[0].shortLongTermDebt = 0 }

        if (yfData.balanceSheetHistoryQuarterly.balanceSheetStatements[0].shortTermInvestments !== undefined && yfData.balanceSheetHistoryQuarterly.balanceSheetStatements[0].shortTermInvestments !== null ){
          financialQtrData[0].shortTermInvestments = yfData.balanceSheetHistoryQuarterly.balanceSheetStatements[0].shortTermInvestments.raw;
        } else { financialQtrData[0].shortTermInvestments = 0 }

        if (yfData.balanceSheetHistoryQuarterly.balanceSheetStatements[0].totalAssets !== undefined && yfData.balanceSheetHistoryQuarterly.balanceSheetStatements[0].totalAssets !== null ){
          financialQtrData[0].totalAssets = yfData.balanceSheetHistoryQuarterly.balanceSheetStatements[0].totalAssets.raw;
        } else { financialQtrData[0].totalAssets = 0 }

        if (yfData.balanceSheetHistoryQuarterly.balanceSheetStatements[0].totalCurrentAssets !== undefined && yfData.balanceSheetHistoryQuarterly.balanceSheetStatements[0].totalCurrentAssets !== null ){
          financialQtrData[0].totalCurrentAssets = yfData.balanceSheetHistoryQuarterly.balanceSheetStatements[0].totalCurrentAssets.raw;
        } else { financialQtrData[0].totalCurrentAssets = 0 }

        if (yfData.balanceSheetHistoryQuarterly.balanceSheetStatements[0].totalCurrentLiabilities !== undefined && yfData.balanceSheetHistoryQuarterly.balanceSheetStatements[0].totalCurrentLiabilities !== null ){
          financialQtrData[0].totalCurrentLiabilities = yfData.balanceSheetHistoryQuarterly.balanceSheetStatements[0].totalCurrentLiabilities.raw;
        } else { financialQtrData[0].totalCurrentLiabilities = 0 }

        if (yfData.balanceSheetHistoryQuarterly.balanceSheetStatements[0].totalLiab !== undefined && yfData.balanceSheetHistoryQuarterly.balanceSheetStatements[0].totalLiab !== null ){
          financialQtrData[0].totalLiab = yfData.balanceSheetHistoryQuarterly.balanceSheetStatements[0].totalLiab.raw;
        } else { financialQtrData[0].totalLiab = 0 }

        if (yfData.balanceSheetHistoryQuarterly.balanceSheetStatements[0].totalStockholderEquity !== undefined && yfData.balanceSheetHistoryQuarterly.balanceSheetStatements[0].totalStockholderEquity !== null ){
          financialQtrData[0].totalStockholderEquity = yfData.balanceSheetHistoryQuarterly.balanceSheetStatements[0].totalStockholderEquity.raw;
        } else { financialQtrData[0].totalStockholderEquity = 0 }

        if (yfData.balanceSheetHistoryQuarterly.balanceSheetStatements[0].treasuryStock !== undefined && yfData.balanceSheetHistoryQuarterly.balanceSheetStatements[0].treasuryStock !== null ){
          financialQtrData[0].treasuryStock = yfData.balanceSheetHistoryQuarterly.balanceSheetStatements[0].treasuryStock.raw;
        } else { financialQtrData[0].treasuryStock = 0 }
        // Datos del flujo de caja 
        if (yfData.cashflowStatementHistoryQuarterly.cashflowStatements[0].capitalExpenditures !== undefined && yfData.cashflowStatementHistoryQuarterly.cashflowStatements[0].capitalExpenditures !== null ){
           financialQtrData[0].capitalExpenditures = yfData.cashflowStatementHistoryQuarterly.cashflowStatements[0].capitalExpenditures.raw; 
        } else {  financialQtrData[0].capitalExpenditures = 0 }

        if (yfData.cashflowStatementHistoryQuarterly.cashflowStatements[0].changeInCash !== undefined && yfData.cashflowStatementHistoryQuarterly.cashflowStatements[0].changeInCash !== null ){
           financialQtrData[0].changeInCash = yfData.cashflowStatementHistoryQuarterly.cashflowStatements[0].changeInCash.raw; 
        } else {  financialQtrData[0].changeInCash = 0 }
        
        if (yfData.cashflowStatementHistoryQuarterly.cashflowStatements[0].changeToAccountReceivables !== undefined && yfData.cashflowStatementHistoryQuarterly.cashflowStatements[0].changeToAccountReceivables !== null ){
           financialQtrData[0].changeToAccountReceivables = yfData.cashflowStatementHistoryQuarterly.cashflowStatements[0].changeToAccountReceivables.raw; 
        } else {  financialQtrData[0].changeToAccountReceivables = 0 }
        
        if (yfData.cashflowStatementHistoryQuarterly.cashflowStatements[0].changeToInventory !== undefined && yfData.cashflowStatementHistoryQuarterly.cashflowStatements[0].changeToInventory !== null ){
           financialQtrData[0].changeToInventory = yfData.cashflowStatementHistoryQuarterly.cashflowStatements[0].changeToInventory.raw; 
        } else {  financialQtrData[0].changeToInventory = 0 }
        
        if (yfData.cashflowStatementHistoryQuarterly.cashflowStatements[0].changeToLiabilities !== undefined && yfData.cashflowStatementHistoryQuarterly.cashflowStatements[0].changeToLiabilities !== null ){
           financialQtrData[0].changeToLiabilities = yfData.cashflowStatementHistoryQuarterly.cashflowStatements[0].changeToLiabilities.raw; 
        } else {  financialQtrData[0].changeToLiabilities = 0 }
        
        if (yfData.cashflowStatementHistoryQuarterly.cashflowStatements[0].changeToNetincome !== undefined && yfData.cashflowStatementHistoryQuarterly.cashflowStatements[0].changeToNetincome !== null ){
           financialQtrData[0].changeToNetincome = yfData.cashflowStatementHistoryQuarterly.cashflowStatements[0].changeToNetincome.raw; 
        } else {  financialQtrData[0].changeToNetincome = 0 }
        
        if (yfData.cashflowStatementHistoryQuarterly.cashflowStatements[0].changeToOperatingActivities !== undefined && yfData.cashflowStatementHistoryQuarterly.cashflowStatements[0].changeToOperatingActivities !== null ){
           financialQtrData[0].changeToOperatingActivities = yfData.cashflowStatementHistoryQuarterly.cashflowStatements[0].changeToOperatingActivities.raw; 
        } else {  financialQtrData[0].changeToOperatingActivities = 0 }
        
        if (yfData.cashflowStatementHistoryQuarterly.cashflowStatements[0].depreciation !== undefined && yfData.cashflowStatementHistoryQuarterly.cashflowStatements[0].depreciation !== null ){
           financialQtrData[0].depreciation = yfData.cashflowStatementHistoryQuarterly.cashflowStatements[0].depreciation.raw; 
        } else {  financialQtrData[0].depreciation = 0 }
        
        if (yfData.cashflowStatementHistoryQuarterly.cashflowStatements[0].dividendsPaid !== undefined && yfData.cashflowStatementHistoryQuarterly.cashflowStatements[0].dividendsPaid !== null ){
           financialQtrData[0].dividendsPaid = yfData.cashflowStatementHistoryQuarterly.cashflowStatements[0].dividendsPaid.raw; 
        } else {  financialQtrData[0].dividendsPaid = 0 }
        
        if (yfData.cashflowStatementHistoryQuarterly.cashflowStatements[0].effectOfExchangeRate !== undefined && yfData.cashflowStatementHistoryQuarterly.cashflowStatements[0].effectOfExchangeRate !== null ){
           financialQtrData[0].effectOfExchangeRate = yfData.cashflowStatementHistoryQuarterly.cashflowStatements[0].effectOfExchangeRate.raw; 
        } else {  financialQtrData[0].effectOfExchangeRate = 0 }
        
        if (yfData.cashflowStatementHistoryQuarterly.cashflowStatements[0].investments !== undefined && yfData.cashflowStatementHistoryQuarterly.cashflowStatements[0].investments !== null ){
           financialQtrData[0].investments = yfData.cashflowStatementHistoryQuarterly.cashflowStatements[0].investments.raw; 
        } else {  financialQtrData[0].investments = 0 }
        
        if (yfData.cashflowStatementHistoryQuarterly.cashflowStatements[0].issuanceOfStock !== undefined && yfData.cashflowStatementHistoryQuarterly.cashflowStatements[0].issuanceOfStock !== null ){
           financialQtrData[0].issuanceOfStock = yfData.cashflowStatementHistoryQuarterly.cashflowStatements[0].issuanceOfStock.raw; 
        } else {  financialQtrData[0].issuanceOfStock = 0 }
        
        if (yfData.cashflowStatementHistoryQuarterly.cashflowStatements[0].netBorrowings !== undefined && yfData.cashflowStatementHistoryQuarterly.cashflowStatements[0].netBorrowings !== null ){
           financialQtrData[0].netBorrowings = yfData.cashflowStatementHistoryQuarterly.cashflowStatements[0].netBorrowings.raw; 
        } else {  financialQtrData[0].netBorrowings = 0 }
        
        if (yfData.cashflowStatementHistoryQuarterly.cashflowStatements[0].otherCashflowsFromFinancingActivities !== undefined && yfData.cashflowStatementHistoryQuarterly.cashflowStatements[0].otherCashflowsFromFinancingActivities !== null ){
           financialQtrData[0].otherCashflowsFromFinancingActivities = yfData.cashflowStatementHistoryQuarterly.cashflowStatements[0].otherCashflowsFromFinancingActivities.raw; 
        } else {  financialQtrData[0].otherCashflowsFromFinancingActivities = 0 }
        
        if (yfData.cashflowStatementHistoryQuarterly.cashflowStatements[0].otherCashflowsFromOperatingActivities !== undefined && yfData.cashflowStatementHistoryQuarterly.cashflowStatements[0].otherCashflowsFromOperatingActivities !== null ){
           financialQtrData[0].otherCashflowsFromOperatingActivities = yfData.cashflowStatementHistoryQuarterly.cashflowStatements[0].otherCashflowsFromOperatingActivities.raw; 
        } else {  financialQtrData[0].otherCashflowsFromOperatingActivities = 0 }
        
        if (yfData.cashflowStatementHistoryQuarterly.cashflowStatements[0].otherCashflowsFromInvestingActivities !== undefined && yfData.cashflowStatementHistoryQuarterly.cashflowStatements[0].otherCashflowsFromInvestingActivities !== null ){
           financialQtrData[0].otherCashflowsFromInvestingActivities = yfData.cashflowStatementHistoryQuarterly.cashflowStatements[0].otherCashflowsFromInvestingActivities.raw; 
        } else {  financialQtrData[0].otherCashflowsFromInvestingActivities = 0 }
        
        if (yfData.cashflowStatementHistoryQuarterly.cashflowStatements[0].repurchaseOfStock !== undefined && yfData.cashflowStatementHistoryQuarterly.cashflowStatements[0].repurchaseOfStock !== null ){
           financialQtrData[0].repurchaseOfStock = yfData.cashflowStatementHistoryQuarterly.cashflowStatements[0].repurchaseOfStock.raw; 
        } else {  financialQtrData[0].repurchaseOfStock = 0 }
        
        if (yfData.cashflowStatementHistoryQuarterly.cashflowStatements[0].totalCashFromFinancingActivities !== undefined && yfData.cashflowStatementHistoryQuarterly.cashflowStatements[0].totalCashFromFinancingActivities !== null ){
           financialQtrData[0].totalCashFromFinancingActivities = yfData.cashflowStatementHistoryQuarterly.cashflowStatements[0].totalCashFromFinancingActivities.raw; 
        } else {  financialQtrData[0].totalCashFromFinancingActivities = 0 }
        
        if (yfData.cashflowStatementHistoryQuarterly.cashflowStatements[0].totalCashFromOperatingActivities !== undefined && yfData.cashflowStatementHistoryQuarterly.cashflowStatements[0].totalCashFromOperatingActivities !== null ){
           financialQtrData[0].totalCashFromOperatingActivities = yfData.cashflowStatementHistoryQuarterly.cashflowStatements[0].totalCashFromOperatingActivities.raw; 
        } else {  financialQtrData[0].totalCashFromOperatingActivities = 0 }
        
        if (yfData.cashflowStatementHistoryQuarterly.cashflowStatements[0].totalCashflowsFromInvestingActivities !== undefined && yfData.cashflowStatementHistoryQuarterly.cashflowStatements[0].totalCashflowsFromInvestingActivities !== null ){
           financialQtrData[0].totalCashflowsFromInvestingActivities = yfData.cashflowStatementHistoryQuarterly.cashflowStatements[0].totalCashflowsFromInvestingActivities.raw; 
        } else {  financialQtrData[0].totalCashflowsFromInvestingActivities = 0 }

        // Datos del income statement (yfData.incomeStatementHistoryQuarterly
        if (yfData.incomeStatementHistoryQuarterly.incomeStatementHistory[0].costOfRevenue !== undefined && yfData.incomeStatementHistoryQuarterly.incomeStatementHistory[0].costOfRevenue !== null ){
          financialQtrData[0].costOfRevenue = yfData.incomeStatementHistoryQuarterly.incomeStatementHistory[0].costOfRevenue.raw; 
        } else { financialQtrData[0].costOfRevenue = 0 }

        if (yfData.incomeStatementHistoryQuarterly.incomeStatementHistory[0].discontinuedOperations !== undefined && yfData.incomeStatementHistoryQuarterly.incomeStatementHistory[0].discontinuedOperations !== null ){
          financialQtrData[0].discontinuedOperations = yfData.incomeStatementHistoryQuarterly.incomeStatementHistory[0].discontinuedOperations.raw; 
        } else { financialQtrData[0].discontinuedOperations = 0 }

        if (yfData.incomeStatementHistoryQuarterly.incomeStatementHistory[0].ebit !== undefined && yfData.incomeStatementHistoryQuarterly.incomeStatementHistory[0].ebit !== null ){
          financialQtrData[0].ebit = yfData.incomeStatementHistoryQuarterly.incomeStatementHistory[0].ebit.raw; 
        } else { financialQtrData[0].ebit = 0 }

        if (yfData.incomeStatementHistoryQuarterly.incomeStatementHistory[0].effectOfAccountingCharges !== undefined && yfData.incomeStatementHistoryQuarterly.incomeStatementHistory[0].effectOfAccountingCharges !== null ){
          financialQtrData[0].effectOfAccountingCharges = yfData.incomeStatementHistoryQuarterly.incomeStatementHistory[0].effectOfAccountingCharges.raw; 
        } else { financialQtrData[0].effectOfAccountingCharges = 0 }

        if (yfData.incomeStatementHistoryQuarterly.incomeStatementHistory[0].extraordinaryItems !== undefined && yfData.incomeStatementHistoryQuarterly.incomeStatementHistory[0].extraordinaryItems !== null ){
          financialQtrData[0].extraordinaryItems = yfData.incomeStatementHistoryQuarterly.incomeStatementHistory[0].extraordinaryItems.raw; 
        } else { financialQtrData[0].extraordinaryItems = 0 }

        if (yfData.incomeStatementHistoryQuarterly.incomeStatementHistory[0].grossProfit !== undefined && yfData.incomeStatementHistoryQuarterly.incomeStatementHistory[0].grossProfit !== null ){
          financialQtrData[0].grossProfit = yfData.incomeStatementHistoryQuarterly.incomeStatementHistory[0].grossProfit.raw; 
        } else { financialQtrData[0].grossProfit = 0 }

        if (yfData.incomeStatementHistoryQuarterly.incomeStatementHistory[0].incomeBeforeTax !== undefined && yfData.incomeStatementHistoryQuarterly.incomeStatementHistory[0].incomeBeforeTax !== null ){
          financialQtrData[0].incomeBeforeTax = yfData.incomeStatementHistoryQuarterly.incomeStatementHistory[0].incomeBeforeTax.raw; 
        } else { financialQtrData[0].incomeBeforeTax = 0 }

        if (yfData.incomeStatementHistoryQuarterly.incomeStatementHistory[0].incomeTaxExpense !== undefined && yfData.incomeStatementHistoryQuarterly.incomeStatementHistory[0].incomeTaxExpense !== null ){
          financialQtrData[0].incomeTaxExpense = yfData.incomeStatementHistoryQuarterly.incomeStatementHistory[0].incomeTaxExpense.raw; 
        } else { financialQtrData[0].incomeTaxExpense = 0 }

        if (yfData.incomeStatementHistoryQuarterly.incomeStatementHistory[0].interestExpense !== undefined && yfData.incomeStatementHistoryQuarterly.incomeStatementHistory[0].interestExpense !== null ){
          financialQtrData[0].interestExpense = yfData.incomeStatementHistoryQuarterly.incomeStatementHistory[0].interestExpense.raw; 
        } else { financialQtrData[0].interestExpense = 0 }

        if (yfData.incomeStatementHistoryQuarterly.incomeStatementHistory[0].minorityInterest !== undefined && yfData.incomeStatementHistoryQuarterly.incomeStatementHistory[0].minorityInterest !== null ){
          financialQtrData[0].minorityInterest = yfData.incomeStatementHistoryQuarterly.incomeStatementHistory[0].minorityInterest.raw; 
        } else { financialQtrData[0].minorityInterest = 0 }

        if (yfData.incomeStatementHistoryQuarterly.incomeStatementHistory[0].netIncome !== undefined && yfData.incomeStatementHistoryQuarterly.incomeStatementHistory[0].netIncome !== null ){
          financialQtrData[0].netIncome = yfData.incomeStatementHistoryQuarterly.incomeStatementHistory[0].netIncome.raw; 
        } else { financialQtrData[0].netIncome = 0 }

        if (yfData.incomeStatementHistoryQuarterly.incomeStatementHistory[0].netIncomeApplicableToCommonShares !== undefined && yfData.incomeStatementHistoryQuarterly.incomeStatementHistory[0].netIncomeApplicableToCommonShares !== null ){
          financialQtrData[0].netIncomeApplicableToCommonShares = yfData.incomeStatementHistoryQuarterly.incomeStatementHistory[0].netIncomeApplicableToCommonShares.raw; 
        } else { financialQtrData[0].netIncomeApplicableToCommonShares = 0 }

        if (yfData.incomeStatementHistoryQuarterly.incomeStatementHistory[0].netIncomeFromContinuingOps !== undefined && yfData.incomeStatementHistoryQuarterly.incomeStatementHistory[0].netIncomeFromContinuingOps !== null ){
          financialQtrData[0].netIncomeFromContinuingOps = yfData.incomeStatementHistoryQuarterly.incomeStatementHistory[0].netIncomeFromContinuingOps.raw; 
        } else { financialQtrData[0].netIncomeFromContinuingOps = 0 }

        if (yfData.incomeStatementHistoryQuarterly.incomeStatementHistory[0].nonRecurring !== undefined && yfData.incomeStatementHistoryQuarterly.incomeStatementHistory[0].nonRecurring !== null ){
          financialQtrData[0].nonRecurring = yfData.incomeStatementHistoryQuarterly.incomeStatementHistory[0].nonRecurring.raw; 
        } else { financialQtrData[0].nonRecurring = 0 }

        if (yfData.incomeStatementHistoryQuarterly.incomeStatementHistory[0].operatingIncome !== undefined && yfData.incomeStatementHistoryQuarterly.incomeStatementHistory[0].operatingIncome !== null ){
          financialQtrData[0].operatingIncome = yfData.incomeStatementHistoryQuarterly.incomeStatementHistory[0].operatingIncome.raw; 
        } else { financialQtrData[0].operatingIncome = 0 }

        if (yfData.incomeStatementHistoryQuarterly.incomeStatementHistory[0].otherItems !== undefined && yfData.incomeStatementHistoryQuarterly.incomeStatementHistory[0].otherItems !== null ){
          financialQtrData[0].otherItems = yfData.incomeStatementHistoryQuarterly.incomeStatementHistory[0].otherItems.raw; 
        } else { financialQtrData[0].otherItems = 0 }

        if (yfData.incomeStatementHistoryQuarterly.incomeStatementHistory[0].otherOperatingExpenses !== undefined && yfData.incomeStatementHistoryQuarterly.incomeStatementHistory[0].otherOperatingExpenses !== null ){
          financialQtrData[0].otherOperatingExpenses = yfData.incomeStatementHistoryQuarterly.incomeStatementHistory[0].otherOperatingExpenses.raw; 
        } else { financialQtrData[0].otherOperatingExpenses = 0 }

        if (yfData.incomeStatementHistoryQuarterly.incomeStatementHistory[0].researchDevelopment !== undefined && yfData.incomeStatementHistoryQuarterly.incomeStatementHistory[0].researchDevelopment !== null ){
          financialQtrData[0].researchDevelopment = yfData.incomeStatementHistoryQuarterly.incomeStatementHistory[0].researchDevelopment.raw; 
        } else { financialQtrData[0].researchDevelopment = 0 }

        if (yfData.incomeStatementHistoryQuarterly.incomeStatementHistory[0].sellingGeneralAdministrative !== undefined && yfData.incomeStatementHistoryQuarterly.incomeStatementHistory[0].sellingGeneralAdministrative !== null ){
          financialQtrData[0].sellingGeneralAdministrative = yfData.incomeStatementHistoryQuarterly.incomeStatementHistory[0].sellingGeneralAdministrative.raw; 
        } else { financialQtrData[0].sellingGeneralAdministrative = 0 }

        if (yfData.incomeStatementHistoryQuarterly.incomeStatementHistory[0].totalOperatingExpenses !== undefined && yfData.incomeStatementHistoryQuarterly.incomeStatementHistory[0].totalOperatingExpenses !== null ){
          financialQtrData[0].totalOperatingExpenses = yfData.incomeStatementHistoryQuarterly.incomeStatementHistory[0].totalOperatingExpenses.raw; 
        } else { financialQtrData[0].totalOperatingExpenses = 0 }

        if (yfData.incomeStatementHistoryQuarterly.incomeStatementHistory[0].totalOtherIncomeExpenseNet !== undefined && yfData.incomeStatementHistoryQuarterly.incomeStatementHistory[0].totalOtherIncomeExpenseNet !== null ){
          financialQtrData[0].totalOtherIncomeExpenseNet = yfData.incomeStatementHistoryQuarterly.incomeStatementHistory[0].totalOtherIncomeExpenseNet.raw; 
        } else { financialQtrData[0].totalOtherIncomeExpenseNet = 0 }
        
        if (yfData.incomeStatementHistoryQuarterly.incomeStatementHistory[0].totalRevenue !== undefined && yfData.incomeStatementHistoryQuarterly.incomeStatementHistory[0].totalRevenue !== null ){
          financialQtrData[0].totalRevenue = yfData.incomeStatementHistoryQuarterly.incomeStatementHistory[0].totalRevenue.raw; 
        } else { financialQtrData[0].totalRevenue = 0 }

   
        if (yfData.balanceSheetHistoryQuarterly.balanceSheetStatements[1].endDate !== undefined && yfData.balanceSheetHistoryQuarterly.balanceSheetStatements[1].endDate !== null ){
          financialQtrData[1].endDate = yfData.balanceSheetHistoryQuarterly.balanceSheetStatements[1].endDate.fmt;
        } else { financialQtrData[1].endDate = "" }

        financialQtrData[1].quarter = financialQtrData[1].endDate.substr(0, 7);

        financialQtrData[1].companyId = yfData.quoteType.symbol;
        financialQtrData[1].financialsId = yfData.balanceSheetHistoryQuarterly.balanceSheetStatements[1].endDate.fmt + yfData.quoteType.symbol;;
        financialQtrData[1].period = 1;

        if (yfData.balanceSheetHistoryQuarterly.balanceSheetStatements[1].accountsPayable !== undefined && yfData.balanceSheetHistoryQuarterly.balanceSheetStatements[1].accountsPayable !== null ){
          financialQtrData[1].accountsPayable = yfData.balanceSheetHistoryQuarterly.balanceSheetStatements[1].accountsPayable.raw;
        } else { financialQtrData[1].accountsPayable = 0 }

        if (yfData.balanceSheetHistoryQuarterly.balanceSheetStatements[1].capitalSurplus !== undefined && yfData.balanceSheetHistoryQuarterly.balanceSheetStatements[1].capitalSurplus !== null ){
          financialQtrData[1].capitalSurplus = yfData.balanceSheetHistoryQuarterly.balanceSheetStatements[1].capitalSurplus.raw;
        } else { financialQtrData[1].capitalSurplus = 0 }

        if (yfData.balanceSheetHistoryQuarterly.balanceSheetStatements[1].cash !== undefined && yfData.balanceSheetHistoryQuarterly.balanceSheetStatements[1].cash !== null ){
          financialQtrData[1].cash = yfData.balanceSheetHistoryQuarterly.balanceSheetStatements[1].cash.raw;
        } else { financialQtrData[1].cash = 0 }

        if (yfData.balanceSheetHistoryQuarterly.balanceSheetStatements[1].commonStock !== undefined && yfData.balanceSheetHistoryQuarterly.balanceSheetStatements[1].commonStock !== null ){
          financialQtrData[1].commonStock = yfData.balanceSheetHistoryQuarterly.balanceSheetStatements[1].commonStock.raw;
        } else { financialQtrData[1].commonStock = 0 }

        if (yfData.balanceSheetHistoryQuarterly.balanceSheetStatements[1].goodWill !== undefined && yfData.balanceSheetHistoryQuarterly.balanceSheetStatements[1].goodWill !== null ){
          financialQtrData[1].goodWill = yfData.balanceSheetHistoryQuarterly.balanceSheetStatements[1].goodWill.raw;
        } else { financialQtrData[1].goodWill = 0 }

        if (yfData.balanceSheetHistoryQuarterly.balanceSheetStatements[1].intangibleAssets !== undefined && yfData.balanceSheetHistoryQuarterly.balanceSheetStatements[1].intangibleAssets !== null ){
          financialQtrData[1].intangibleAssets = yfData.balanceSheetHistoryQuarterly.balanceSheetStatements[1].intangibleAssets.raw;
        } else { financialQtrData[1].intangibleAssets = 0 }

        if (yfData.balanceSheetHistoryQuarterly.balanceSheetStatements[1].inventory !== undefined && yfData.balanceSheetHistoryQuarterly.balanceSheetStatements[1].inventory !== null ){
          financialQtrData[1].inventory = yfData.balanceSheetHistoryQuarterly.balanceSheetStatements[1].inventory.raw;
        } else { financialQtrData[1].inventory = 0 }

        if (yfData.balanceSheetHistoryQuarterly.balanceSheetStatements[1].longTermDebt !== undefined && yfData.balanceSheetHistoryQuarterly.balanceSheetStatements[1].longTermDebt !== null ){
          financialQtrData[1].longTermDebt = yfData.balanceSheetHistoryQuarterly.balanceSheetStatements[1].longTermDebt.raw;
        } else { financialQtrData[1].longTermDebt = 0 }

        if (yfData.balanceSheetHistoryQuarterly.balanceSheetStatements[1].longTermInvestments !== undefined && yfData.balanceSheetHistoryQuarterly.balanceSheetStatements[1].longTermInvestments !== null ){
          financialQtrData[1].longTermInvestments = yfData.balanceSheetHistoryQuarterly.balanceSheetStatements[1].longTermInvestments.raw;
        } else { financialQtrData[1].longTermInvestments = 0 }

        if (yfData.balanceSheetHistoryQuarterly.balanceSheetStatements[1].netReceivables !== undefined && yfData.balanceSheetHistoryQuarterly.balanceSheetStatements[1].netReceivables !== null ){
          financialQtrData[1].netReceivables = yfData.balanceSheetHistoryQuarterly.balanceSheetStatements[1].netReceivables.raw;
        } else { financialQtrData[1].netReceivables = 0 }

        if (yfData.balanceSheetHistoryQuarterly.balanceSheetStatements[1].netTangibleAssets !== undefined && yfData.balanceSheetHistoryQuarterly.balanceSheetStatements[1].netTangibleAssets !== null ){
          financialQtrData[1].netTangibleAssets = yfData.balanceSheetHistoryQuarterly.balanceSheetStatements[1].netTangibleAssets.raw;
        } else { financialQtrData[1].netTangibleAssets = 0 }

        if (yfData.balanceSheetHistoryQuarterly.balanceSheetStatements[1].otherAssets !== undefined && yfData.balanceSheetHistoryQuarterly.balanceSheetStatements[1].otherAssets !== null ){
          financialQtrData[1].otherAssets = yfData.balanceSheetHistoryQuarterly.balanceSheetStatements[1].otherAssets.raw;
        } else { financialQtrData[1].otherAssets = 0 }

        if (yfData.balanceSheetHistoryQuarterly.balanceSheetStatements[1].otherCurrentAssets !== undefined && yfData.balanceSheetHistoryQuarterly.balanceSheetStatements[1].otherCurrentAssets !== null ){
          financialQtrData[1].otherCurrentAssets = yfData.balanceSheetHistoryQuarterly.balanceSheetStatements[1].otherCurrentAssets.raw;
        } else { financialQtrData[1].otherCurrentAssets = 0 }

        if (yfData.balanceSheetHistoryQuarterly.balanceSheetStatements[1].otherCurrentLiab !== undefined && yfData.balanceSheetHistoryQuarterly.balanceSheetStatements[1].otherCurrentLiab !== null ){
          financialQtrData[1].otherCurrentLiab = yfData.balanceSheetHistoryQuarterly.balanceSheetStatements[1].otherCurrentLiab.raw;
        } else { financialQtrData[1].otherCurrentLiab = 0 }

        if (yfData.balanceSheetHistoryQuarterly.balanceSheetStatements[1].otherLiab !== undefined && yfData.balanceSheetHistoryQuarterly.balanceSheetStatements[1].otherLiab !== null ){
          financialQtrData[1].otherLiab = yfData.balanceSheetHistoryQuarterly.balanceSheetStatements[1].otherLiab.raw;
        } else { financialQtrData[1].otherLiab = 0 }

        if (yfData.balanceSheetHistoryQuarterly.balanceSheetStatements[1].otherStockholderEquity !== undefined && yfData.balanceSheetHistoryQuarterly.balanceSheetStatements[1].otherStockholderEquity !== null ){
          financialQtrData[1].otherStockholderEquity = yfData.balanceSheetHistoryQuarterly.balanceSheetStatements[1].otherStockholderEquity.raw;
        } else { financialQtrData[1].otherStockholderEquity = 0 }

        if (yfData.balanceSheetHistoryQuarterly.balanceSheetStatements[1].propertyPlantEquipment !== undefined && yfData.balanceSheetHistoryQuarterly.balanceSheetStatements[1].propertyPlantEquipment !== null ){
          financialQtrData[1].propertyPlantEquipment = yfData.balanceSheetHistoryQuarterly.balanceSheetStatements[1].propertyPlantEquipment.raw;
        } else { financialQtrData[1].propertyPlantEquipment = 0 }

        if (yfData.balanceSheetHistoryQuarterly.balanceSheetStatements[1].retainedEarnings !== undefined && yfData.balanceSheetHistoryQuarterly.balanceSheetStatements[1].retainedEarnings !== null ){
          financialQtrData[1].retainedEarnings = yfData.balanceSheetHistoryQuarterly.balanceSheetStatements[1].retainedEarnings.raw;
        } else { financialQtrData[1].retainedEarnings = 0 }

        if (yfData.balanceSheetHistoryQuarterly.balanceSheetStatements[1].shortLongTermDebt !== undefined && yfData.balanceSheetHistoryQuarterly.balanceSheetStatements[1].shortLongTermDebt !== null ){
          financialQtrData[1].shortLongTermDebt = yfData.balanceSheetHistoryQuarterly.balanceSheetStatements[1].shortLongTermDebt.raw;
        } else { financialQtrData[1].shortLongTermDebt = 0 }

        if (yfData.balanceSheetHistoryQuarterly.balanceSheetStatements[1].shortTermInvestments !== undefined && yfData.balanceSheetHistoryQuarterly.balanceSheetStatements[1].shortTermInvestments !== null ){
          financialQtrData[1].shortTermInvestments = yfData.balanceSheetHistoryQuarterly.balanceSheetStatements[1].shortTermInvestments.raw;
        } else { financialQtrData[1].shortTermInvestments = 0 }

        if (yfData.balanceSheetHistoryQuarterly.balanceSheetStatements[1].totalAssets !== undefined && yfData.balanceSheetHistoryQuarterly.balanceSheetStatements[1].totalAssets !== null ){
          financialQtrData[1].totalAssets = yfData.balanceSheetHistoryQuarterly.balanceSheetStatements[1].totalAssets.raw;
        } else { financialQtrData[1].totalAssets = 0 }

        if (yfData.balanceSheetHistoryQuarterly.balanceSheetStatements[1].totalCurrentAssets !== undefined && yfData.balanceSheetHistoryQuarterly.balanceSheetStatements[1].totalCurrentAssets !== null ){
          financialQtrData[1].totalCurrentAssets = yfData.balanceSheetHistoryQuarterly.balanceSheetStatements[1].totalCurrentAssets.raw;
        } else { financialQtrData[1].totalCurrentAssets = 0 }

        if (yfData.balanceSheetHistoryQuarterly.balanceSheetStatements[1].totalCurrentLiabilities !== undefined && yfData.balanceSheetHistoryQuarterly.balanceSheetStatements[1].totalCurrentLiabilities !== null ){
          financialQtrData[1].totalCurrentLiabilities = yfData.balanceSheetHistoryQuarterly.balanceSheetStatements[1].totalCurrentLiabilities.raw;
        } else { financialQtrData[1].totalCurrentLiabilities = 0 }

        if (yfData.balanceSheetHistoryQuarterly.balanceSheetStatements[1].totalLiab !== undefined && yfData.balanceSheetHistoryQuarterly.balanceSheetStatements[1].totalLiab !== null ){
          financialQtrData[1].totalLiab = yfData.balanceSheetHistoryQuarterly.balanceSheetStatements[1].totalLiab.raw;
        } else { financialQtrData[1].totalLiab = 0 }

        if (yfData.balanceSheetHistoryQuarterly.balanceSheetStatements[1].totalStockholderEquity !== undefined && yfData.balanceSheetHistoryQuarterly.balanceSheetStatements[1].totalStockholderEquity !== null ){
          financialQtrData[1].totalStockholderEquity = yfData.balanceSheetHistoryQuarterly.balanceSheetStatements[1].totalStockholderEquity.raw;
        } else { financialQtrData[1].totalStockholderEquity = 0 }

        if (yfData.balanceSheetHistoryQuarterly.balanceSheetStatements[1].treasuryStock !== undefined && yfData.balanceSheetHistoryQuarterly.balanceSheetStatements[1].treasuryStock !== null ){
          financialQtrData[1].treasuryStock = yfData.balanceSheetHistoryQuarterly.balanceSheetStatements[1].treasuryStock.raw;
        } else { financialQtrData[1].treasuryStock = 0 }
        // Datos del flujo de caja yfData.cashflowStatementHistoryQuarterly
        if (yfData.cashflowStatementHistoryQuarterly.cashflowStatements[1].capitalExpenditures !== undefined && yfData.cashflowStatementHistoryQuarterly.cashflowStatements[1].capitalExpenditures !== null ){
           financialQtrData[1].capitalExpenditures = yfData.cashflowStatementHistoryQuarterly.cashflowStatements[1].capitalExpenditures.raw; 
        } else {  financialQtrData[1].capitalExpenditures = 0 }

        if (yfData.cashflowStatementHistoryQuarterly.cashflowStatements[1].changeInCash !== undefined && yfData.cashflowStatementHistoryQuarterly.cashflowStatements[1].changeInCash !== null ){
           financialQtrData[1].changeInCash = yfData.cashflowStatementHistoryQuarterly.cashflowStatements[1].changeInCash.raw; 
        } else {  financialQtrData[1].changeInCash = 0 }
        
        if (yfData.cashflowStatementHistoryQuarterly.cashflowStatements[1].changeToAccountReceivables !== undefined && yfData.cashflowStatementHistoryQuarterly.cashflowStatements[1].changeToAccountReceivables !== null ){
           financialQtrData[1].changeToAccountReceivables = yfData.cashflowStatementHistoryQuarterly.cashflowStatements[1].changeToAccountReceivables.raw; 
        } else {  financialQtrData[1].changeToAccountReceivables = 0 }
        
        if (yfData.cashflowStatementHistoryQuarterly.cashflowStatements[1].changeToInventory !== undefined && yfData.cashflowStatementHistoryQuarterly.cashflowStatements[1].changeToInventory !== null ){
           financialQtrData[1].changeToInventory = yfData.cashflowStatementHistoryQuarterly.cashflowStatements[1].changeToInventory.raw; 
        } else {  financialQtrData[1].changeToInventory = 0 }
        
        if (yfData.cashflowStatementHistoryQuarterly.cashflowStatements[1].changeToLiabilities !== undefined && yfData.cashflowStatementHistoryQuarterly.cashflowStatements[1].changeToLiabilities !== null ){
           financialQtrData[1].changeToLiabilities = yfData.cashflowStatementHistoryQuarterly.cashflowStatements[1].changeToLiabilities.raw; 
        } else {  financialQtrData[1].changeToLiabilities = 0 }
        
        if (yfData.cashflowStatementHistoryQuarterly.cashflowStatements[1].changeToNetincome !== undefined && yfData.cashflowStatementHistoryQuarterly.cashflowStatements[1].changeToNetincome !== null ){
           financialQtrData[1].changeToNetincome = yfData.cashflowStatementHistoryQuarterly.cashflowStatements[1].changeToNetincome.raw; 
        } else {  financialQtrData[1].changeToNetincome = 0 }
        
        if (yfData.cashflowStatementHistoryQuarterly.cashflowStatements[1].changeToOperatingActivities !== undefined && yfData.cashflowStatementHistoryQuarterly.cashflowStatements[1].changeToOperatingActivities !== null ){
           financialQtrData[1].changeToOperatingActivities = yfData.cashflowStatementHistoryQuarterly.cashflowStatements[1].changeToOperatingActivities.raw; 
        } else {  financialQtrData[1].changeToOperatingActivities = 0 }
        
        if (yfData.cashflowStatementHistoryQuarterly.cashflowStatements[1].depreciation !== undefined && yfData.cashflowStatementHistoryQuarterly.cashflowStatements[1].depreciation !== null ){
           financialQtrData[1].depreciation = yfData.cashflowStatementHistoryQuarterly.cashflowStatements[1].depreciation.raw; 
        } else {  financialQtrData[1].depreciation = 0 }
        
        if (yfData.cashflowStatementHistoryQuarterly.cashflowStatements[1].dividendsPaid !== undefined && yfData.cashflowStatementHistoryQuarterly.cashflowStatements[1].dividendsPaid !== null ){
           financialQtrData[1].dividendsPaid = yfData.cashflowStatementHistoryQuarterly.cashflowStatements[1].dividendsPaid.raw; 
        } else {  financialQtrData[1].dividendsPaid = 0 }
        
        if (yfData.cashflowStatementHistoryQuarterly.cashflowStatements[1].effectOfExchangeRate !== undefined && yfData.cashflowStatementHistoryQuarterly.cashflowStatements[1].effectOfExchangeRate !== null ){
           financialQtrData[1].effectOfExchangeRate = yfData.cashflowStatementHistoryQuarterly.cashflowStatements[1].effectOfExchangeRate.raw; 
        } else {  financialQtrData[1].effectOfExchangeRate = 0 }
        
        if (yfData.cashflowStatementHistoryQuarterly.cashflowStatements[1].investments !== undefined && yfData.cashflowStatementHistoryQuarterly.cashflowStatements[1].investments !== null ){
           financialQtrData[1].investments = yfData.cashflowStatementHistoryQuarterly.cashflowStatements[1].investments.raw; 
        } else {  financialQtrData[1].investments = 0 }
        
        if (yfData.cashflowStatementHistoryQuarterly.cashflowStatements[1].issuanceOfStock !== undefined && yfData.cashflowStatementHistoryQuarterly.cashflowStatements[1].issuanceOfStock !== null ){
           financialQtrData[1].issuanceOfStock = yfData.cashflowStatementHistoryQuarterly.cashflowStatements[1].issuanceOfStock.raw; 
        } else {  financialQtrData[1].issuanceOfStock = 0 }
        
        if (yfData.cashflowStatementHistoryQuarterly.cashflowStatements[1].netBorrowings !== undefined && yfData.cashflowStatementHistoryQuarterly.cashflowStatements[1].netBorrowings !== null ){
           financialQtrData[1].netBorrowings = yfData.cashflowStatementHistoryQuarterly.cashflowStatements[1].netBorrowings.raw; 
        } else {  financialQtrData[1].netBorrowings = 0 }
        
        if (yfData.cashflowStatementHistoryQuarterly.cashflowStatements[1].otherCashflowsFromFinancingActivities !== undefined && yfData.cashflowStatementHistoryQuarterly.cashflowStatements[1].otherCashflowsFromFinancingActivities !== null ){
           financialQtrData[1].otherCashflowsFromFinancingActivities = yfData.cashflowStatementHistoryQuarterly.cashflowStatements[1].otherCashflowsFromFinancingActivities.raw; 
        } else {  financialQtrData[1].otherCashflowsFromFinancingActivities = 0 }
        
        if (yfData.cashflowStatementHistoryQuarterly.cashflowStatements[1].otherCashflowsFromOperatingActivities !== undefined && yfData.cashflowStatementHistoryQuarterly.cashflowStatements[1].otherCashflowsFromOperatingActivities !== null ){
           financialQtrData[1].otherCashflowsFromOperatingActivities = yfData.cashflowStatementHistoryQuarterly.cashflowStatements[1].otherCashflowsFromOperatingActivities.raw; 
        } else {  financialQtrData[1].otherCashflowsFromOperatingActivities = 0 }
        
        if (yfData.cashflowStatementHistoryQuarterly.cashflowStatements[1].otherCashflowsFromInvestingActivities !== undefined && yfData.cashflowStatementHistoryQuarterly.cashflowStatements[1].otherCashflowsFromInvestingActivities !== null ){
           financialQtrData[1].otherCashflowsFromInvestingActivities = yfData.cashflowStatementHistoryQuarterly.cashflowStatements[1].otherCashflowsFromInvestingActivities.raw; 
        } else {  financialQtrData[1].otherCashflowsFromInvestingActivities = 0 }
        
        if (yfData.cashflowStatementHistoryQuarterly.cashflowStatements[1].repurchaseOfStock !== undefined && yfData.cashflowStatementHistoryQuarterly.cashflowStatements[1].repurchaseOfStock !== null ){
           financialQtrData[1].repurchaseOfStock = yfData.cashflowStatementHistoryQuarterly.cashflowStatements[1].repurchaseOfStock.raw; 
        } else {  financialQtrData[1].repurchaseOfStock = 0 }
        
        if (yfData.cashflowStatementHistoryQuarterly.cashflowStatements[1].totalCashFromFinancingActivities !== undefined && yfData.cashflowStatementHistoryQuarterly.cashflowStatements[1].totalCashFromFinancingActivities !== null ){
           financialQtrData[1].totalCashFromFinancingActivities = yfData.cashflowStatementHistoryQuarterly.cashflowStatements[1].totalCashFromFinancingActivities.raw; 
        } else {  financialQtrData[1].totalCashFromFinancingActivities = 0 }
        
        if (yfData.cashflowStatementHistoryQuarterly.cashflowStatements[1].totalCashFromOperatingActivities !== undefined && yfData.cashflowStatementHistoryQuarterly.cashflowStatements[1].totalCashFromOperatingActivities !== null ){
           financialQtrData[1].totalCashFromOperatingActivities = yfData.cashflowStatementHistoryQuarterly.cashflowStatements[1].totalCashFromOperatingActivities.raw; 
        } else {  financialQtrData[1].totalCashFromOperatingActivities = 0 }
        
        if (yfData.cashflowStatementHistoryQuarterly.cashflowStatements[1].totalCashflowsFromInvestingActivities !== undefined && yfData.cashflowStatementHistoryQuarterly.cashflowStatements[1].totalCashflowsFromInvestingActivities !== null ){
           financialQtrData[1].totalCashflowsFromInvestingActivities = yfData.cashflowStatementHistoryQuarterly.cashflowStatements[1].totalCashflowsFromInvestingActivities.raw; 
        } else {  financialQtrData[1].totalCashflowsFromInvestingActivities = 0 }

        // Datos del income statement (yfData.incomeStatementHistoryQuarterly
        if (yfData.incomeStatementHistoryQuarterly.incomeStatementHistory[1].costOfRevenue !== undefined && yfData.incomeStatementHistoryQuarterly.incomeStatementHistory[1].costOfRevenue !== null ){
          financialQtrData[1].costOfRevenue = yfData.incomeStatementHistoryQuarterly.incomeStatementHistory[1].costOfRevenue.raw; 
        } else { financialQtrData[1].costOfRevenue = 0 }

        if (yfData.incomeStatementHistoryQuarterly.incomeStatementHistory[1].discontinuedOperations !== undefined && yfData.incomeStatementHistoryQuarterly.incomeStatementHistory[1].discontinuedOperations !== null ){
          financialQtrData[1].discontinuedOperations = yfData.incomeStatementHistoryQuarterly.incomeStatementHistory[1].discontinuedOperations.raw; 
        } else { financialQtrData[1].discontinuedOperations = 0 }

        if (yfData.incomeStatementHistoryQuarterly.incomeStatementHistory[1].ebit !== undefined && yfData.incomeStatementHistoryQuarterly.incomeStatementHistory[1].ebit !== null ){
          financialQtrData[1].ebit = yfData.incomeStatementHistoryQuarterly.incomeStatementHistory[1].ebit.raw; 
        } else { financialQtrData[1].ebit = 0 }

        if (yfData.incomeStatementHistoryQuarterly.incomeStatementHistory[1].effectOfAccountingCharges !== undefined && yfData.incomeStatementHistoryQuarterly.incomeStatementHistory[1].effectOfAccountingCharges !== null ){
          financialQtrData[1].effectOfAccountingCharges = yfData.incomeStatementHistoryQuarterly.incomeStatementHistory[1].effectOfAccountingCharges.raw; 
        } else { financialQtrData[1].effectOfAccountingCharges = 0 }

        if (yfData.incomeStatementHistoryQuarterly.incomeStatementHistory[1].extraordinaryItems !== undefined && yfData.incomeStatementHistoryQuarterly.incomeStatementHistory[1].extraordinaryItems !== null ){
          financialQtrData[1].extraordinaryItems = yfData.incomeStatementHistoryQuarterly.incomeStatementHistory[1].extraordinaryItems.raw; 
        } else { financialQtrData[1].extraordinaryItems = 0 }

        if (yfData.incomeStatementHistoryQuarterly.incomeStatementHistory[1].grossProfit !== undefined && yfData.incomeStatementHistoryQuarterly.incomeStatementHistory[1].grossProfit !== null ){
          financialQtrData[1].grossProfit = yfData.incomeStatementHistoryQuarterly.incomeStatementHistory[1].grossProfit.raw; 
        } else { financialQtrData[1].grossProfit = 0 }

        if (yfData.incomeStatementHistoryQuarterly.incomeStatementHistory[1].incomeBeforeTax !== undefined && yfData.incomeStatementHistoryQuarterly.incomeStatementHistory[1].incomeBeforeTax !== null ){
          financialQtrData[1].incomeBeforeTax = yfData.incomeStatementHistoryQuarterly.incomeStatementHistory[1].incomeBeforeTax.raw; 
        } else { financialQtrData[1].incomeBeforeTax = 0 }

        if (yfData.incomeStatementHistoryQuarterly.incomeStatementHistory[1].incomeTaxExpense !== undefined && yfData.incomeStatementHistoryQuarterly.incomeStatementHistory[1].incomeTaxExpense !== null ){
          financialQtrData[1].incomeTaxExpense = yfData.incomeStatementHistoryQuarterly.incomeStatementHistory[1].incomeTaxExpense.raw; 
        } else { financialQtrData[1].incomeTaxExpense = 0 }

        if (yfData.incomeStatementHistoryQuarterly.incomeStatementHistory[1].interestExpense !== undefined && yfData.incomeStatementHistoryQuarterly.incomeStatementHistory[1].interestExpense !== null ){
          financialQtrData[1].interestExpense = yfData.incomeStatementHistoryQuarterly.incomeStatementHistory[1].interestExpense.raw; 
        } else { financialQtrData[1].interestExpense = 0 }

        if (yfData.incomeStatementHistoryQuarterly.incomeStatementHistory[1].minorityInterest !== undefined && yfData.incomeStatementHistoryQuarterly.incomeStatementHistory[1].minorityInterest !== null ){
          financialQtrData[1].minorityInterest = yfData.incomeStatementHistoryQuarterly.incomeStatementHistory[1].minorityInterest.raw; 
        } else { financialQtrData[1].minorityInterest = 0 }

        if (yfData.incomeStatementHistoryQuarterly.incomeStatementHistory[1].netIncome !== undefined && yfData.incomeStatementHistoryQuarterly.incomeStatementHistory[1].netIncome !== null ){
          financialQtrData[1].netIncome = yfData.incomeStatementHistoryQuarterly.incomeStatementHistory[1].netIncome.raw; 
        } else { financialQtrData[1].netIncome = 0 }

        if (yfData.incomeStatementHistoryQuarterly.incomeStatementHistory[1].netIncomeApplicableToCommonShares !== undefined && yfData.incomeStatementHistoryQuarterly.incomeStatementHistory[1].netIncomeApplicableToCommonShares !== null ){
          financialQtrData[1].netIncomeApplicableToCommonShares = yfData.incomeStatementHistoryQuarterly.incomeStatementHistory[1].netIncomeApplicableToCommonShares.raw; 
        } else { financialQtrData[1].netIncomeApplicableToCommonShares = 0 }

        if (yfData.incomeStatementHistoryQuarterly.incomeStatementHistory[1].netIncomeFromContinuingOps !== undefined && yfData.incomeStatementHistoryQuarterly.incomeStatementHistory[1].netIncomeFromContinuingOps !== null ){
          financialQtrData[1].netIncomeFromContinuingOps = yfData.incomeStatementHistoryQuarterly.incomeStatementHistory[1].netIncomeFromContinuingOps.raw; 
        } else { financialQtrData[1].netIncomeFromContinuingOps = 0 }

        if (yfData.incomeStatementHistoryQuarterly.incomeStatementHistory[1].nonRecurring !== undefined && yfData.incomeStatementHistoryQuarterly.incomeStatementHistory[1].nonRecurring !== null ){
          financialQtrData[1].nonRecurring = yfData.incomeStatementHistoryQuarterly.incomeStatementHistory[1].nonRecurring.raw; 
        } else { financialQtrData[1].nonRecurring = 0 }

        if (yfData.incomeStatementHistoryQuarterly.incomeStatementHistory[1].operatingIncome !== undefined && yfData.incomeStatementHistoryQuarterly.incomeStatementHistory[1].operatingIncome !== null ){
          financialQtrData[1].operatingIncome = yfData.incomeStatementHistoryQuarterly.incomeStatementHistory[1].operatingIncome.raw; 
        } else { financialQtrData[1].operatingIncome = 0 }

        if (yfData.incomeStatementHistoryQuarterly.incomeStatementHistory[1].otherItems !== undefined && yfData.incomeStatementHistoryQuarterly.incomeStatementHistory[1].otherItems !== null ){
          financialQtrData[1].otherItems = yfData.incomeStatementHistoryQuarterly.incomeStatementHistory[1].otherItems.raw; 
        } else { financialQtrData[1].otherItems = 0 }

        if (yfData.incomeStatementHistoryQuarterly.incomeStatementHistory[1].otherOperatingExpenses !== undefined && yfData.incomeStatementHistoryQuarterly.incomeStatementHistory[1].otherOperatingExpenses !== null ){
          financialQtrData[1].otherOperatingExpenses = yfData.incomeStatementHistoryQuarterly.incomeStatementHistory[1].otherOperatingExpenses.raw; 
        } else { financialQtrData[1].otherOperatingExpenses = 0 }

        if (yfData.incomeStatementHistoryQuarterly.incomeStatementHistory[1].researchDevelopment !== undefined && yfData.incomeStatementHistoryQuarterly.incomeStatementHistory[1].researchDevelopment !== null ){
          financialQtrData[1].researchDevelopment = yfData.incomeStatementHistoryQuarterly.incomeStatementHistory[1].researchDevelopment.raw; 
        } else { financialQtrData[1].researchDevelopment = 0 }

        if (yfData.incomeStatementHistoryQuarterly.incomeStatementHistory[1].sellingGeneralAdministrative !== undefined && yfData.incomeStatementHistoryQuarterly.incomeStatementHistory[1].sellingGeneralAdministrative !== null ){
          financialQtrData[1].sellingGeneralAdministrative = yfData.incomeStatementHistoryQuarterly.incomeStatementHistory[1].sellingGeneralAdministrative.raw; 
        } else { financialQtrData[1].sellingGeneralAdministrative = 0 }

        if (yfData.incomeStatementHistoryQuarterly.incomeStatementHistory[1].totalOperatingExpenses !== undefined && yfData.incomeStatementHistoryQuarterly.incomeStatementHistory[1].totalOperatingExpenses !== null ){
          financialQtrData[1].totalOperatingExpenses = yfData.incomeStatementHistoryQuarterly.incomeStatementHistory[1].totalOperatingExpenses.raw; 
        } else { financialQtrData[1].totalOperatingExpenses = 0 }

        if (yfData.incomeStatementHistoryQuarterly.incomeStatementHistory[1].totalOtherIncomeExpenseNet !== undefined && yfData.incomeStatementHistoryQuarterly.incomeStatementHistory[1].totalOtherIncomeExpenseNet !== null ){
          financialQtrData[1].totalOtherIncomeExpenseNet = yfData.incomeStatementHistoryQuarterly.incomeStatementHistory[1].totalOtherIncomeExpenseNet.raw; 
        } else { financialQtrData[1].totalOtherIncomeExpenseNet = 0 }
        
        if (yfData.incomeStatementHistoryQuarterly.incomeStatementHistory[1].totalRevenue !== undefined && yfData.incomeStatementHistoryQuarterly.incomeStatementHistory[1].totalRevenue !== null ){
          financialQtrData[1].totalRevenue = yfData.incomeStatementHistoryQuarterly.incomeStatementHistory[1].totalRevenue.raw; 
        } else { financialQtrData[1].totalRevenue = 0 }
  
        // if (yfData.incomeStatementHistoryQuarterly.incomeStatementHistory[1].costOfRevenue !== undefined && yfData.incomeStatementHistoryQuarterly.incomeStatementHistory[1].costOfRevenue !== null ){
        //   financialQtrData[1].costOfRevenue = yfData.incomeStatementHistoryQuarterly.incomeStatementHistory[1].costOfRevenue.raw; 
        // } else { financialQtrData[1].costOfRevenue = 0 }

        // if (yfData.incomeStatementHistoryQuarterly.incomeStatementHistory[1].netIncome !== undefined && yfData.incomeStatementHistoryQuarterly.incomeStatementHistory[1].netIncome !== null ){
        //   financialQtrData[1].netIncome = yfData.incomeStatementHistoryQuarterly.incomeStatementHistory[1].netIncome.raw; 
        // } else { financialQtrData[1].netIncome = 0 }

        // if (yfData.incomeStatementHistoryQuarterly.incomeStatementHistory[1].totalRevenue !== undefined && yfData.incomeStatementHistoryQuarterly.incomeStatementHistory[1].totalRevenue !== null ){
        //   financialQtrData[1].totalRevenue = yfData.incomeStatementHistoryQuarterly.incomeStatementHistory[1].totalRevenue.raw; 
        // } else { financialQtrData[1].totalRevenue = 0 }

        //
        financialQtrData[2].financialsId = yfData.balanceSheetHistoryQuarterly.balanceSheetStatements[2].endDate.fmt + companyData.symbol;
        financialQtrData[2].companyId = yfData.quoteType.symbol;
        financialQtrData[2].period = 2;

        if (yfData.balanceSheetHistoryQuarterly.balanceSheetStatements[2].endDate !== undefined && yfData.balanceSheetHistoryQuarterly.balanceSheetStatements[2].endDate !== null ){
          financialQtrData[2].endDate = yfData.balanceSheetHistoryQuarterly.balanceSheetStatements[2].endDate.fmt;
        } else { financialQtrData[2].endDate = "" }

        financialQtrData[2].quarter = financialQtrData[2].endDate.substr(0, 7);

        if (yfData.balanceSheetHistoryQuarterly.balanceSheetStatements[2].accountsPayable !== undefined && yfData.balanceSheetHistoryQuarterly.balanceSheetStatements[2].accountsPayable !== null ){
          financialQtrData[2].accountsPayable = yfData.balanceSheetHistoryQuarterly.balanceSheetStatements[2].accountsPayable.raw;
        } else { financialQtrData[2].accountsPayable = 0 }

        if (yfData.balanceSheetHistoryQuarterly.balanceSheetStatements[2].capitalSurplus !== undefined && yfData.balanceSheetHistoryQuarterly.balanceSheetStatements[2].capitalSurplus !== null ){
          financialQtrData[2].capitalSurplus = yfData.balanceSheetHistoryQuarterly.balanceSheetStatements[2].capitalSurplus.raw;
        } else { financialQtrData[2].capitalSurplus = 0 }

        if (yfData.balanceSheetHistoryQuarterly.balanceSheetStatements[2].cash !== undefined && yfData.balanceSheetHistoryQuarterly.balanceSheetStatements[2].cash !== null ){
          financialQtrData[2].cash = yfData.balanceSheetHistoryQuarterly.balanceSheetStatements[2].cash.raw;
        } else { financialQtrData[2].cash = 0 }

        if (yfData.balanceSheetHistoryQuarterly.balanceSheetStatements[2].commonStock !== undefined && yfData.balanceSheetHistoryQuarterly.balanceSheetStatements[2].commonStock !== null ){
          financialQtrData[2].commonStock = yfData.balanceSheetHistoryQuarterly.balanceSheetStatements[2].commonStock.raw;
        } else { financialQtrData[2].commonStock = 0 }

        if (yfData.balanceSheetHistoryQuarterly.balanceSheetStatements[2].goodWill !== undefined && yfData.balanceSheetHistoryQuarterly.balanceSheetStatements[2].goodWill !== null ){
          financialQtrData[2].goodWill = yfData.balanceSheetHistoryQuarterly.balanceSheetStatements[2].goodWill.raw;
        } else { financialQtrData[2].goodWill = 0 }

        if (yfData.balanceSheetHistoryQuarterly.balanceSheetStatements[2].intangibleAssets !== undefined && yfData.balanceSheetHistoryQuarterly.balanceSheetStatements[2].intangibleAssets !== null ){
          financialQtrData[2].intangibleAssets = yfData.balanceSheetHistoryQuarterly.balanceSheetStatements[2].intangibleAssets.raw;
        } else { financialQtrData[2].intangibleAssets = 0 }

        if (yfData.balanceSheetHistoryQuarterly.balanceSheetStatements[2].inventory !== undefined && yfData.balanceSheetHistoryQuarterly.balanceSheetStatements[2].inventory !== null ){
          financialQtrData[2].inventory = yfData.balanceSheetHistoryQuarterly.balanceSheetStatements[2].inventory.raw;
        } else { financialQtrData[2].inventory = 0 }

        if (yfData.balanceSheetHistoryQuarterly.balanceSheetStatements[2].longTermDebt !== undefined && yfData.balanceSheetHistoryQuarterly.balanceSheetStatements[2].longTermDebt !== null ){
          financialQtrData[2].longTermDebt = yfData.balanceSheetHistoryQuarterly.balanceSheetStatements[2].longTermDebt.raw;
        } else { financialQtrData[2].longTermDebt = 0 }

        if (yfData.balanceSheetHistoryQuarterly.balanceSheetStatements[2].longTermInvestments !== undefined && yfData.balanceSheetHistoryQuarterly.balanceSheetStatements[2].longTermInvestments !== null ){
          financialQtrData[2].longTermInvestments = yfData.balanceSheetHistoryQuarterly.balanceSheetStatements[2].longTermInvestments.raw;
        } else { financialQtrData[2].longTermInvestments = 0 }

        if (yfData.balanceSheetHistoryQuarterly.balanceSheetStatements[2].netReceivables !== undefined && yfData.balanceSheetHistoryQuarterly.balanceSheetStatements[2].netReceivables !== null ){
          financialQtrData[2].netReceivables = yfData.balanceSheetHistoryQuarterly.balanceSheetStatements[2].netReceivables.raw;
        } else { financialQtrData[2].netReceivables = 0 }

        if (yfData.balanceSheetHistoryQuarterly.balanceSheetStatements[2].netTangibleAssets !== undefined && yfData.balanceSheetHistoryQuarterly.balanceSheetStatements[2].netTangibleAssets !== null ){
          financialQtrData[2].netTangibleAssets = yfData.balanceSheetHistoryQuarterly.balanceSheetStatements[2].netTangibleAssets.raw;
        } else { financialQtrData[2].netTangibleAssets = 0 }

        if (yfData.balanceSheetHistoryQuarterly.balanceSheetStatements[2].otherAssets !== undefined && yfData.balanceSheetHistoryQuarterly.balanceSheetStatements[2].otherAssets !== null ){
          financialQtrData[2].otherAssets = yfData.balanceSheetHistoryQuarterly.balanceSheetStatements[2].otherAssets.raw;
        } else { financialQtrData[2].otherAssets = 0 }

        if (yfData.balanceSheetHistoryQuarterly.balanceSheetStatements[2].otherCurrentAssets !== undefined && yfData.balanceSheetHistoryQuarterly.balanceSheetStatements[2].otherCurrentAssets !== null ){
          financialQtrData[2].otherCurrentAssets = yfData.balanceSheetHistoryQuarterly.balanceSheetStatements[2].otherCurrentAssets.raw;
        } else { financialQtrData[2].otherCurrentAssets = 0 }

        if (yfData.balanceSheetHistoryQuarterly.balanceSheetStatements[2].otherCurrentLiab !== undefined && yfData.balanceSheetHistoryQuarterly.balanceSheetStatements[2].otherCurrentLiab !== null ){
          financialQtrData[2].otherCurrentLiab = yfData.balanceSheetHistoryQuarterly.balanceSheetStatements[2].otherCurrentLiab.raw;
        } else { financialQtrData[2].otherCurrentLiab = 0 }

        if (yfData.balanceSheetHistoryQuarterly.balanceSheetStatements[2].otherLiab !== undefined && yfData.balanceSheetHistoryQuarterly.balanceSheetStatements[2].otherLiab !== null ){
          financialQtrData[2].otherLiab = yfData.balanceSheetHistoryQuarterly.balanceSheetStatements[2].otherLiab.raw;
        } else { financialQtrData[2].otherLiab = 0 }

        if (yfData.balanceSheetHistoryQuarterly.balanceSheetStatements[2].otherStockholderEquity !== undefined && yfData.balanceSheetHistoryQuarterly.balanceSheetStatements[2].otherStockholderEquity !== null ){
          financialQtrData[2].otherStockholderEquity = yfData.balanceSheetHistoryQuarterly.balanceSheetStatements[2].otherStockholderEquity.raw;
        } else { financialQtrData[2].otherStockholderEquity = 0 }

        if (yfData.balanceSheetHistoryQuarterly.balanceSheetStatements[2].propertyPlantEquipment !== undefined && yfData.balanceSheetHistoryQuarterly.balanceSheetStatements[2].propertyPlantEquipment !== null ){
          financialQtrData[2].propertyPlantEquipment = yfData.balanceSheetHistoryQuarterly.balanceSheetStatements[2].propertyPlantEquipment.raw;
        } else { financialQtrData[2].propertyPlantEquipment = 0 }

        if (yfData.balanceSheetHistoryQuarterly.balanceSheetStatements[2].retainedEarnings !== undefined && yfData.balanceSheetHistoryQuarterly.balanceSheetStatements[2].retainedEarnings !== null ){
          financialQtrData[2].retainedEarnings = yfData.balanceSheetHistoryQuarterly.balanceSheetStatements[2].retainedEarnings.raw;
        } else { financialQtrData[2].retainedEarnings = 0 }

        if (yfData.balanceSheetHistoryQuarterly.balanceSheetStatements[2].shortLongTermDebt !== undefined && yfData.balanceSheetHistoryQuarterly.balanceSheetStatements[2].shortLongTermDebt !== null ){
          financialQtrData[2].shortLongTermDebt = yfData.balanceSheetHistoryQuarterly.balanceSheetStatements[2].shortLongTermDebt.raw;
        } else { financialQtrData[2].shortLongTermDebt = 0 }

        if (yfData.balanceSheetHistoryQuarterly.balanceSheetStatements[2].shortTermInvestments !== undefined && yfData.balanceSheetHistoryQuarterly.balanceSheetStatements[2].shortTermInvestments !== null ){
          financialQtrData[2].shortTermInvestments = yfData.balanceSheetHistoryQuarterly.balanceSheetStatements[2].shortTermInvestments.raw;
        } else { financialQtrData[2].shortTermInvestments = 0 }

        if (yfData.balanceSheetHistoryQuarterly.balanceSheetStatements[2].totalAssets !== undefined && yfData.balanceSheetHistoryQuarterly.balanceSheetStatements[2].totalAssets !== null ){
          financialQtrData[2].totalAssets = yfData.balanceSheetHistoryQuarterly.balanceSheetStatements[2].totalAssets.raw;
        } else { financialQtrData[2].totalAssets = 0 }

        if (yfData.balanceSheetHistoryQuarterly.balanceSheetStatements[2].totalCurrentAssets !== undefined && yfData.balanceSheetHistoryQuarterly.balanceSheetStatements[2].totalCurrentAssets !== null ){
          financialQtrData[2].totalCurrentAssets = yfData.balanceSheetHistoryQuarterly.balanceSheetStatements[2].totalCurrentAssets.raw;
        } else { financialQtrData[2].totalCurrentAssets = 0 }

        if (yfData.balanceSheetHistoryQuarterly.balanceSheetStatements[2].totalCurrentLiabilities !== undefined && yfData.balanceSheetHistoryQuarterly.balanceSheetStatements[2].totalCurrentLiabilities !== null ){
          financialQtrData[2].totalCurrentLiabilities = yfData.balanceSheetHistoryQuarterly.balanceSheetStatements[2].totalCurrentLiabilities.raw;
        } else { financialQtrData[2].totalCurrentLiabilities = 0 }

        if (yfData.balanceSheetHistoryQuarterly.balanceSheetStatements[2].totalLiab !== undefined && yfData.balanceSheetHistoryQuarterly.balanceSheetStatements[2].totalLiab !== null ){
          financialQtrData[2].totalLiab = yfData.balanceSheetHistoryQuarterly.balanceSheetStatements[2].totalLiab.raw;
        } else { financialQtrData[2].totalLiab = 0 }

        if (yfData.balanceSheetHistoryQuarterly.balanceSheetStatements[2].totalStockholderEquity !== undefined && yfData.balanceSheetHistoryQuarterly.balanceSheetStatements[2].totalStockholderEquity !== null ){
          financialQtrData[2].totalStockholderEquity = yfData.balanceSheetHistoryQuarterly.balanceSheetStatements[2].totalStockholderEquity.raw;
        } else { financialQtrData[2].totalStockholderEquity = 0 }

        if (yfData.balanceSheetHistoryQuarterly.balanceSheetStatements[2].treasuryStock !== undefined && yfData.balanceSheetHistoryQuarterly.balanceSheetStatements[2].treasuryStock !== null ){
          financialQtrData[2].treasuryStock = yfData.balanceSheetHistoryQuarterly.balanceSheetStatements[2].treasuryStock.raw;
        } else { financialQtrData[2].treasuryStock = 0 }
        // Datos del flujo de caja 
        if (yfData.cashflowStatementHistoryQuarterly.cashflowStatements[2].capitalExpenditures !== undefined && yfData.cashflowStatementHistoryQuarterly.cashflowStatements[2].capitalExpenditures !== null ){
           financialQtrData[2].capitalExpenditures = yfData.cashflowStatementHistoryQuarterly.cashflowStatements[2].capitalExpenditures.raw; 
        } else {  financialQtrData[2].capitalExpenditures = 0 }

        if (yfData.cashflowStatementHistoryQuarterly.cashflowStatements[2].changeInCash !== undefined && yfData.cashflowStatementHistoryQuarterly.cashflowStatements[2].changeInCash !== null ){
           financialQtrData[2].changeInCash = yfData.cashflowStatementHistoryQuarterly.cashflowStatements[2].changeInCash.raw; 
        } else {  financialQtrData[2].changeInCash = 0 }
        
        if (yfData.cashflowStatementHistoryQuarterly.cashflowStatements[2].changeToAccountReceivables !== undefined && yfData.cashflowStatementHistoryQuarterly.cashflowStatements[2].changeToAccountReceivables !== null ){
           financialQtrData[2].changeToAccountReceivables = yfData.cashflowStatementHistoryQuarterly.cashflowStatements[2].changeToAccountReceivables.raw; 
        } else {  financialQtrData[2].changeToAccountReceivables = 0 }
        
        if (yfData.cashflowStatementHistoryQuarterly.cashflowStatements[2].changeToInventory !== undefined && yfData.cashflowStatementHistoryQuarterly.cashflowStatements[2].changeToInventory !== null ){
           financialQtrData[2].changeToInventory = yfData.cashflowStatementHistoryQuarterly.cashflowStatements[2].changeToInventory.raw; 
        } else {  financialQtrData[2].changeToInventory = 0 }
        
        if (yfData.cashflowStatementHistoryQuarterly.cashflowStatements[2].changeToLiabilities !== undefined && yfData.cashflowStatementHistoryQuarterly.cashflowStatements[2].changeToLiabilities !== null ){
           financialQtrData[2].changeToLiabilities = yfData.cashflowStatementHistoryQuarterly.cashflowStatements[2].changeToLiabilities.raw; 
        } else {  financialQtrData[2].changeToLiabilities = 0 }
        
        if (yfData.cashflowStatementHistoryQuarterly.cashflowStatements[2].changeToNetincome !== undefined && yfData.cashflowStatementHistoryQuarterly.cashflowStatements[2].changeToNetincome !== null ){
           financialQtrData[2].changeToNetincome = yfData.cashflowStatementHistoryQuarterly.cashflowStatements[2].changeToNetincome.raw; 
        } else {  financialQtrData[2].changeToNetincome = 0 }
        
        if (yfData.cashflowStatementHistoryQuarterly.cashflowStatements[2].changeToOperatingActivities !== undefined && yfData.cashflowStatementHistoryQuarterly.cashflowStatements[2].changeToOperatingActivities !== null ){
           financialQtrData[2].changeToOperatingActivities = yfData.cashflowStatementHistoryQuarterly.cashflowStatements[2].changeToOperatingActivities.raw; 
        } else {  financialQtrData[2].changeToOperatingActivities = 0 }
        
        if (yfData.cashflowStatementHistoryQuarterly.cashflowStatements[2].depreciation !== undefined && yfData.cashflowStatementHistoryQuarterly.cashflowStatements[2].depreciation !== null ){
           financialQtrData[2].depreciation = yfData.cashflowStatementHistoryQuarterly.cashflowStatements[2].depreciation.raw; 
        } else {  financialQtrData[2].depreciation = 0 }
        
        if (yfData.cashflowStatementHistoryQuarterly.cashflowStatements[2].dividendsPaid !== undefined && yfData.cashflowStatementHistoryQuarterly.cashflowStatements[2].dividendsPaid !== null ){
           financialQtrData[2].dividendsPaid = yfData.cashflowStatementHistoryQuarterly.cashflowStatements[2].dividendsPaid.raw; 
        } else {  financialQtrData[2].dividendsPaid = 0 }
        
        if (yfData.cashflowStatementHistoryQuarterly.cashflowStatements[2].effectOfExchangeRate !== undefined && yfData.cashflowStatementHistoryQuarterly.cashflowStatements[2].effectOfExchangeRate !== null ){
           financialQtrData[2].effectOfExchangeRate = yfData.cashflowStatementHistoryQuarterly.cashflowStatements[2].effectOfExchangeRate.raw; 
        } else {  financialQtrData[2].effectOfExchangeRate = 0 }
        
        if (yfData.cashflowStatementHistoryQuarterly.cashflowStatements[2].investments !== undefined && yfData.cashflowStatementHistoryQuarterly.cashflowStatements[2].investments !== null ){
           financialQtrData[2].investments = yfData.cashflowStatementHistoryQuarterly.cashflowStatements[2].investments.raw; 
        } else {  financialQtrData[2].investments = 0 }
        
        if (yfData.cashflowStatementHistoryQuarterly.cashflowStatements[2].issuanceOfStock !== undefined && yfData.cashflowStatementHistoryQuarterly.cashflowStatements[2].issuanceOfStock !== null ){
           financialQtrData[2].issuanceOfStock = yfData.cashflowStatementHistoryQuarterly.cashflowStatements[2].issuanceOfStock.raw; 
        } else {  financialQtrData[2].issuanceOfStock = 0 }
        
        if (yfData.cashflowStatementHistoryQuarterly.cashflowStatements[2].netBorrowings !== undefined && yfData.cashflowStatementHistoryQuarterly.cashflowStatements[2].netBorrowings !== null ){
           financialQtrData[2].netBorrowings = yfData.cashflowStatementHistoryQuarterly.cashflowStatements[2].netBorrowings.raw; 
        } else {  financialQtrData[2].netBorrowings = 0 }
        
        if (yfData.cashflowStatementHistoryQuarterly.cashflowStatements[2].otherCashflowsFromFinancingActivities !== undefined && yfData.cashflowStatementHistoryQuarterly.cashflowStatements[2].otherCashflowsFromFinancingActivities !== null ){
           financialQtrData[2].otherCashflowsFromFinancingActivities = yfData.cashflowStatementHistoryQuarterly.cashflowStatements[2].otherCashflowsFromFinancingActivities.raw; 
        } else {  financialQtrData[2].otherCashflowsFromFinancingActivities = 0 }
        
        if (yfData.cashflowStatementHistoryQuarterly.cashflowStatements[2].otherCashflowsFromOperatingActivities !== undefined && yfData.cashflowStatementHistoryQuarterly.cashflowStatements[2].otherCashflowsFromOperatingActivities !== null ){
           financialQtrData[2].otherCashflowsFromOperatingActivities = yfData.cashflowStatementHistoryQuarterly.cashflowStatements[2].otherCashflowsFromOperatingActivities.raw; 
        } else {  financialQtrData[2].otherCashflowsFromOperatingActivities = 0 }
        
        if (yfData.cashflowStatementHistoryQuarterly.cashflowStatements[2].otherCashflowsFromInvestingActivities !== undefined && yfData.cashflowStatementHistoryQuarterly.cashflowStatements[2].otherCashflowsFromInvestingActivities !== null ){
           financialQtrData[2].otherCashflowsFromInvestingActivities = yfData.cashflowStatementHistoryQuarterly.cashflowStatements[2].otherCashflowsFromInvestingActivities.raw; 
        } else {  financialQtrData[2].otherCashflowsFromInvestingActivities = 0 }
        
        if (yfData.cashflowStatementHistoryQuarterly.cashflowStatements[2].repurchaseOfStock !== undefined && yfData.cashflowStatementHistoryQuarterly.cashflowStatements[2].repurchaseOfStock !== null ){
           financialQtrData[2].repurchaseOfStock = yfData.cashflowStatementHistoryQuarterly.cashflowStatements[2].repurchaseOfStock.raw; 
        } else {  financialQtrData[2].repurchaseOfStock = 0 }
        
        if (yfData.cashflowStatementHistoryQuarterly.cashflowStatements[2].totalCashFromFinancingActivities !== undefined && yfData.cashflowStatementHistoryQuarterly.cashflowStatements[2].totalCashFromFinancingActivities !== null ){
           financialQtrData[2].totalCashFromFinancingActivities = yfData.cashflowStatementHistoryQuarterly.cashflowStatements[2].totalCashFromFinancingActivities.raw; 
        } else {  financialQtrData[2].totalCashFromFinancingActivities = 0 }
        
        if (yfData.cashflowStatementHistoryQuarterly.cashflowStatements[2].totalCashFromOperatingActivities !== undefined && yfData.cashflowStatementHistoryQuarterly.cashflowStatements[2].totalCashFromOperatingActivities !== null ){
           financialQtrData[2].totalCashFromOperatingActivities = yfData.cashflowStatementHistoryQuarterly.cashflowStatements[2].totalCashFromOperatingActivities.raw; 
        } else {  financialQtrData[2].totalCashFromOperatingActivities = 0 }
        
        if (yfData.cashflowStatementHistoryQuarterly.cashflowStatements[2].totalCashflowsFromInvestingActivities !== undefined && yfData.cashflowStatementHistoryQuarterly.cashflowStatements[2].totalCashflowsFromInvestingActivities !== null ){
           financialQtrData[2].totalCashflowsFromInvestingActivities = yfData.cashflowStatementHistoryQuarterly.cashflowStatements[2].totalCashflowsFromInvestingActivities.raw; 
        } else {  financialQtrData[2].totalCashflowsFromInvestingActivities = 0 }

        // Datos del income statement (yfData.incomeStatementHistoryQuarterly
        if (yfData.incomeStatementHistoryQuarterly.incomeStatementHistory[2].costOfRevenue !== undefined && yfData.incomeStatementHistoryQuarterly.incomeStatementHistory[2].costOfRevenue !== null ){
          financialQtrData[2].costOfRevenue = yfData.incomeStatementHistoryQuarterly.incomeStatementHistory[2].costOfRevenue.raw; 
        } else { financialQtrData[2].costOfRevenue = 0 }

        if (yfData.incomeStatementHistoryQuarterly.incomeStatementHistory[2].discontinuedOperations !== undefined && yfData.incomeStatementHistoryQuarterly.incomeStatementHistory[2].discontinuedOperations !== null ){
          financialQtrData[2].discontinuedOperations = yfData.incomeStatementHistoryQuarterly.incomeStatementHistory[2].discontinuedOperations.raw; 
        } else { financialQtrData[2].discontinuedOperations = 0 }

        if (yfData.incomeStatementHistoryQuarterly.incomeStatementHistory[2].ebit !== undefined && yfData.incomeStatementHistoryQuarterly.incomeStatementHistory[2].ebit !== null ){
          financialQtrData[2].ebit = yfData.incomeStatementHistoryQuarterly.incomeStatementHistory[2].ebit.raw; 
        } else { financialQtrData[2].ebit = 0 }

        if (yfData.incomeStatementHistoryQuarterly.incomeStatementHistory[2].effectOfAccountingCharges !== undefined && yfData.incomeStatementHistoryQuarterly.incomeStatementHistory[2].effectOfAccountingCharges !== null ){
          financialQtrData[2].effectOfAccountingCharges = yfData.incomeStatementHistoryQuarterly.incomeStatementHistory[2].effectOfAccountingCharges.raw; 
        } else { financialQtrData[2].effectOfAccountingCharges = 0 }

        if (yfData.incomeStatementHistoryQuarterly.incomeStatementHistory[2].extraordinaryItems !== undefined && yfData.incomeStatementHistoryQuarterly.incomeStatementHistory[2].extraordinaryItems !== null ){
          financialQtrData[2].extraordinaryItems = yfData.incomeStatementHistoryQuarterly.incomeStatementHistory[2].extraordinaryItems.raw; 
        } else { financialQtrData[2].extraordinaryItems = 0 }

        if (yfData.incomeStatementHistoryQuarterly.incomeStatementHistory[2].grossProfit !== undefined && yfData.incomeStatementHistoryQuarterly.incomeStatementHistory[2].grossProfit !== null ){
          financialQtrData[2].grossProfit = yfData.incomeStatementHistoryQuarterly.incomeStatementHistory[2].grossProfit.raw; 
        } else { financialQtrData[2].grossProfit = 0 }

        if (yfData.incomeStatementHistoryQuarterly.incomeStatementHistory[2].incomeBeforeTax !== undefined && yfData.incomeStatementHistoryQuarterly.incomeStatementHistory[2].incomeBeforeTax !== null ){
          financialQtrData[2].incomeBeforeTax = yfData.incomeStatementHistoryQuarterly.incomeStatementHistory[2].incomeBeforeTax.raw; 
        } else { financialQtrData[2].incomeBeforeTax = 0 }

        if (yfData.incomeStatementHistoryQuarterly.incomeStatementHistory[2].incomeTaxExpense !== undefined && yfData.incomeStatementHistoryQuarterly.incomeStatementHistory[2].incomeTaxExpense !== null ){
          financialQtrData[2].incomeTaxExpense = yfData.incomeStatementHistoryQuarterly.incomeStatementHistory[2].incomeTaxExpense.raw; 
        } else { financialQtrData[2].incomeTaxExpense = 0 }

        if (yfData.incomeStatementHistoryQuarterly.incomeStatementHistory[2].interestExpense !== undefined && yfData.incomeStatementHistoryQuarterly.incomeStatementHistory[2].interestExpense !== null ){
          financialQtrData[2].interestExpense = yfData.incomeStatementHistoryQuarterly.incomeStatementHistory[2].interestExpense.raw; 
        } else { financialQtrData[2].interestExpense = 0 }

        if (yfData.incomeStatementHistoryQuarterly.incomeStatementHistory[2].minorityInterest !== undefined && yfData.incomeStatementHistoryQuarterly.incomeStatementHistory[2].minorityInterest !== null ){
          financialQtrData[2].minorityInterest = yfData.incomeStatementHistoryQuarterly.incomeStatementHistory[2].minorityInterest.raw; 
        } else { financialQtrData[2].minorityInterest = 0 }

        if (yfData.incomeStatementHistoryQuarterly.incomeStatementHistory[2].netIncome !== undefined && yfData.incomeStatementHistoryQuarterly.incomeStatementHistory[2].netIncome !== null ){
          financialQtrData[2].netIncome = yfData.incomeStatementHistoryQuarterly.incomeStatementHistory[2].netIncome.raw; 
        } else { financialQtrData[2].netIncome = 0 }

        if (yfData.incomeStatementHistoryQuarterly.incomeStatementHistory[2].netIncomeApplicableToCommonShares !== undefined && yfData.incomeStatementHistoryQuarterly.incomeStatementHistory[2].netIncomeApplicableToCommonShares !== null ){
          financialQtrData[2].netIncomeApplicableToCommonShares = yfData.incomeStatementHistoryQuarterly.incomeStatementHistory[2].netIncomeApplicableToCommonShares.raw; 
        } else { financialQtrData[2].netIncomeApplicableToCommonShares = 0 }

        if (yfData.incomeStatementHistoryQuarterly.incomeStatementHistory[2].netIncomeFromContinuingOps !== undefined && yfData.incomeStatementHistoryQuarterly.incomeStatementHistory[2].netIncomeFromContinuingOps !== null ){
          financialQtrData[2].netIncomeFromContinuingOps = yfData.incomeStatementHistoryQuarterly.incomeStatementHistory[2].netIncomeFromContinuingOps.raw; 
        } else { financialQtrData[2].netIncomeFromContinuingOps = 0 }

        if (yfData.incomeStatementHistoryQuarterly.incomeStatementHistory[2].nonRecurring !== undefined && yfData.incomeStatementHistoryQuarterly.incomeStatementHistory[2].nonRecurring !== null ){
          financialQtrData[2].nonRecurring = yfData.incomeStatementHistoryQuarterly.incomeStatementHistory[2].nonRecurring.raw; 
        } else { financialQtrData[2].nonRecurring = 0 }

        if (yfData.incomeStatementHistoryQuarterly.incomeStatementHistory[2].operatingIncome !== undefined && yfData.incomeStatementHistoryQuarterly.incomeStatementHistory[2].operatingIncome !== null ){
          financialQtrData[2].operatingIncome = yfData.incomeStatementHistoryQuarterly.incomeStatementHistory[2].operatingIncome.raw; 
        } else { financialQtrData[2].operatingIncome = 0 }

        if (yfData.incomeStatementHistoryQuarterly.incomeStatementHistory[2].otherItems !== undefined && yfData.incomeStatementHistoryQuarterly.incomeStatementHistory[2].otherItems !== null ){
          financialQtrData[2].otherItems = yfData.incomeStatementHistoryQuarterly.incomeStatementHistory[2].otherItems.raw; 
        } else { financialQtrData[2].otherItems = 0 }

        if (yfData.incomeStatementHistoryQuarterly.incomeStatementHistory[2].otherOperatingExpenses !== undefined && yfData.incomeStatementHistoryQuarterly.incomeStatementHistory[2].otherOperatingExpenses !== null ){
          financialQtrData[2].otherOperatingExpenses = yfData.incomeStatementHistoryQuarterly.incomeStatementHistory[2].otherOperatingExpenses.raw; 
        } else { financialQtrData[2].otherOperatingExpenses = 0 }

        if (yfData.incomeStatementHistoryQuarterly.incomeStatementHistory[2].researchDevelopment !== undefined && yfData.incomeStatementHistoryQuarterly.incomeStatementHistory[2].researchDevelopment !== null ){
          financialQtrData[2].researchDevelopment = yfData.incomeStatementHistoryQuarterly.incomeStatementHistory[2].researchDevelopment.raw; 
        } else { financialQtrData[2].researchDevelopment = 0 }

        if (yfData.incomeStatementHistoryQuarterly.incomeStatementHistory[2].sellingGeneralAdministrative !== undefined && yfData.incomeStatementHistoryQuarterly.incomeStatementHistory[2].sellingGeneralAdministrative !== null ){
          financialQtrData[2].sellingGeneralAdministrative = yfData.incomeStatementHistoryQuarterly.incomeStatementHistory[2].sellingGeneralAdministrative.raw; 
        } else { financialQtrData[2].sellingGeneralAdministrative = 0 }

        if (yfData.incomeStatementHistoryQuarterly.incomeStatementHistory[2].totalOperatingExpenses !== undefined && yfData.incomeStatementHistoryQuarterly.incomeStatementHistory[2].totalOperatingExpenses !== null ){
          financialQtrData[2].totalOperatingExpenses = yfData.incomeStatementHistoryQuarterly.incomeStatementHistory[2].totalOperatingExpenses.raw; 
        } else { financialQtrData[2].totalOperatingExpenses = 0 }

        if (yfData.incomeStatementHistoryQuarterly.incomeStatementHistory[2].totalOtherIncomeExpenseNet !== undefined && yfData.incomeStatementHistoryQuarterly.incomeStatementHistory[2].totalOtherIncomeExpenseNet !== null ){
          financialQtrData[2].totalOtherIncomeExpenseNet = yfData.incomeStatementHistoryQuarterly.incomeStatementHistory[2].totalOtherIncomeExpenseNet.raw; 
        } else { financialQtrData[2].totalOtherIncomeExpenseNet = 0 }
        
        if (yfData.incomeStatementHistoryQuarterly.incomeStatementHistory[2].totalRevenue !== undefined && yfData.incomeStatementHistoryQuarterly.incomeStatementHistory[2].totalRevenue !== null ){
          financialQtrData[2].totalRevenue = yfData.incomeStatementHistoryQuarterly.incomeStatementHistory[2].totalRevenue.raw; 
        } else { financialQtrData[2].totalRevenue = 0 }

        // if (yfData.incomeStatementHistoryQuarterly.incomeStatementHistory[2].costOfRevenue !== undefined && yfData.incomeStatementHistoryQuarterly.incomeStatementHistory[2].costOfRevenue !== null ){
        //   financialQtrData[2].costOfRevenue = yfData.incomeStatementHistoryQuarterly.incomeStatementHistory[2].costOfRevenue.raw; 
        // } else { financialQtrData[2].costOfRevenue = 0 }

        // if (yfData.incomeStatementHistoryQuarterly.incomeStatementHistory[2].netIncome !== undefined && yfData.incomeStatementHistoryQuarterly.incomeStatementHistory[2].netIncome !== null ){
        //   financialQtrData[2].netIncome = yfData.incomeStatementHistoryQuarterly.incomeStatementHistory[2].netIncome.raw; 
        // } else { financialQtrData[2].netIncome = 0 }

        // if (yfData.incomeStatementHistoryQuarterly.incomeStatementHistory[2].totalRevenue !== undefined && yfData.incomeStatementHistoryQuarterly.incomeStatementHistory[2].totalRevenue !== null ){
        //   financialQtrData[2].totalRevenue = yfData.incomeStatementHistoryQuarterly.incomeStatementHistory[2].totalRevenue.raw; 
        // } else { financialQtrData[2].totalRevenue = 0 }
        //---
        
        financialQtrData[3].financialsId = yfData.balanceSheetHistoryQuarterly.balanceSheetStatements[3].endDate.fmt + yfData.quoteType.symbol;
        financialQtrData[3].companyId = yfData.quoteType.symbol;
        financialQtrData[3].period = 3;

        if (yfData.balanceSheetHistoryQuarterly.balanceSheetStatements[3].endDate !== undefined && yfData.balanceSheetHistoryQuarterly.balanceSheetStatements[3].endDate !== null ){
          financialQtrData[3].endDate = yfData.balanceSheetHistoryQuarterly.balanceSheetStatements[3].endDate.fmt;
        } else { financialQtrData[3].endDate = "" }

        financialQtrData[3].quarter = financialQtrData[3].endDate.substr(0, 7);

        if (yfData.balanceSheetHistoryQuarterly.balanceSheetStatements[3].accountsPayable !== undefined && yfData.balanceSheetHistoryQuarterly.balanceSheetStatements[3].accountsPayable !== null ){
          financialQtrData[3].accountsPayable = yfData.balanceSheetHistoryQuarterly.balanceSheetStatements[3].accountsPayable.raw;
        } else { financialQtrData[3].accountsPayable = 0 }

        if (yfData.balanceSheetHistoryQuarterly.balanceSheetStatements[3].capitalSurplus !== undefined && yfData.balanceSheetHistoryQuarterly.balanceSheetStatements[3].capitalSurplus !== null ){
          financialQtrData[3].capitalSurplus = yfData.balanceSheetHistoryQuarterly.balanceSheetStatements[3].capitalSurplus.raw;
        } else { financialQtrData[3].capitalSurplus = 0 }

        if (yfData.balanceSheetHistoryQuarterly.balanceSheetStatements[3].cash !== undefined && yfData.balanceSheetHistoryQuarterly.balanceSheetStatements[3].cash !== null ){
          financialQtrData[3].cash = yfData.balanceSheetHistoryQuarterly.balanceSheetStatements[3].cash.raw;
        } else { financialQtrData[3].cash = 0 }

        if (yfData.balanceSheetHistoryQuarterly.balanceSheetStatements[3].commonStock !== undefined && yfData.balanceSheetHistoryQuarterly.balanceSheetStatements[3].commonStock !== null ){
          financialQtrData[3].commonStock = yfData.balanceSheetHistoryQuarterly.balanceSheetStatements[3].commonStock.raw;
        } else { financialQtrData[3].commonStock = 0 }

        if (yfData.balanceSheetHistoryQuarterly.balanceSheetStatements[3].goodWill !== undefined && yfData.balanceSheetHistoryQuarterly.balanceSheetStatements[3].goodWill !== null ){
          financialQtrData[3].goodWill = yfData.balanceSheetHistoryQuarterly.balanceSheetStatements[3].goodWill.raw;
        } else { financialQtrData[3].goodWill = 0 }

        if (yfData.balanceSheetHistoryQuarterly.balanceSheetStatements[3].intangibleAssets !== undefined && yfData.balanceSheetHistoryQuarterly.balanceSheetStatements[3].intangibleAssets !== null ){
          financialQtrData[3].intangibleAssets = yfData.balanceSheetHistoryQuarterly.balanceSheetStatements[3].intangibleAssets.raw;
        } else { financialQtrData[3].intangibleAssets = 0 }

        if (yfData.balanceSheetHistoryQuarterly.balanceSheetStatements[3].inventory !== undefined && yfData.balanceSheetHistoryQuarterly.balanceSheetStatements[3].inventory !== null ){
          financialQtrData[3].inventory = yfData.balanceSheetHistoryQuarterly.balanceSheetStatements[3].inventory.raw;
        } else { financialQtrData[3].inventory = 0 }

        if (yfData.balanceSheetHistoryQuarterly.balanceSheetStatements[3].longTermDebt !== undefined && yfData.balanceSheetHistoryQuarterly.balanceSheetStatements[3].longTermDebt !== null ){
          financialQtrData[3].longTermDebt = yfData.balanceSheetHistoryQuarterly.balanceSheetStatements[3].longTermDebt.raw;
        } else { financialQtrData[3].longTermDebt = 0 }

        if (yfData.balanceSheetHistoryQuarterly.balanceSheetStatements[3].longTermInvestments !== undefined && yfData.balanceSheetHistoryQuarterly.balanceSheetStatements[3].longTermInvestments !== null ){
          financialQtrData[3].longTermInvestments = yfData.balanceSheetHistoryQuarterly.balanceSheetStatements[3].longTermInvestments.raw;
        } else { financialQtrData[3].longTermInvestments = 0 }

        if (yfData.balanceSheetHistoryQuarterly.balanceSheetStatements[3].netReceivables !== undefined && yfData.balanceSheetHistoryQuarterly.balanceSheetStatements[3].netReceivables !== null ){
          financialQtrData[3].netReceivables = yfData.balanceSheetHistoryQuarterly.balanceSheetStatements[3].netReceivables.raw;
        } else { financialQtrData[3].netReceivables = 0 }

        if (yfData.balanceSheetHistoryQuarterly.balanceSheetStatements[3].netTangibleAssets !== undefined && yfData.balanceSheetHistoryQuarterly.balanceSheetStatements[3].netTangibleAssets !== null ){
          financialQtrData[3].netTangibleAssets = yfData.balanceSheetHistoryQuarterly.balanceSheetStatements[3].netTangibleAssets.raw;
        } else { financialQtrData[3].netTangibleAssets = 0 }

        if (yfData.balanceSheetHistoryQuarterly.balanceSheetStatements[3].otherAssets !== undefined && yfData.balanceSheetHistoryQuarterly.balanceSheetStatements[3].otherAssets !== null ){
          financialQtrData[3].otherAssets = yfData.balanceSheetHistoryQuarterly.balanceSheetStatements[3].otherAssets.raw;
        } else { financialQtrData[3].otherAssets = 0 }

        if (yfData.balanceSheetHistoryQuarterly.balanceSheetStatements[3].otherCurrentAssets !== undefined && yfData.balanceSheetHistoryQuarterly.balanceSheetStatements[3].otherCurrentAssets !== null ){
          financialQtrData[3].otherCurrentAssets = yfData.balanceSheetHistoryQuarterly.balanceSheetStatements[3].otherCurrentAssets.raw;
        } else { financialQtrData[3].otherCurrentAssets = 0 }

        if (yfData.balanceSheetHistoryQuarterly.balanceSheetStatements[3].otherCurrentLiab !== undefined && yfData.balanceSheetHistoryQuarterly.balanceSheetStatements[3].otherCurrentLiab !== null ){
          financialQtrData[3].otherCurrentLiab = yfData.balanceSheetHistoryQuarterly.balanceSheetStatements[3].otherCurrentLiab.raw;
        } else { financialQtrData[3].otherCurrentLiab = 0 }

        if (yfData.balanceSheetHistoryQuarterly.balanceSheetStatements[3].otherLiab !== undefined && yfData.balanceSheetHistoryQuarterly.balanceSheetStatements[3].otherLiab !== null ){
          financialQtrData[3].otherLiab = yfData.balanceSheetHistoryQuarterly.balanceSheetStatements[3].otherLiab.raw;
        } else { financialQtrData[3].otherLiab = 0 }

        if (yfData.balanceSheetHistoryQuarterly.balanceSheetStatements[3].otherStockholderEquity !== undefined && yfData.balanceSheetHistoryQuarterly.balanceSheetStatements[3].otherStockholderEquity !== null ){
          financialQtrData[3].otherStockholderEquity = yfData.balanceSheetHistoryQuarterly.balanceSheetStatements[3].otherStockholderEquity.raw;
        } else { financialQtrData[3].otherStockholderEquity = 0 }

        if (yfData.balanceSheetHistoryQuarterly.balanceSheetStatements[3].propertyPlantEquipment !== undefined && yfData.balanceSheetHistoryQuarterly.balanceSheetStatements[3].propertyPlantEquipment !== null ){
          financialQtrData[3].propertyPlantEquipment = yfData.balanceSheetHistoryQuarterly.balanceSheetStatements[3].propertyPlantEquipment.raw;
        } else { financialQtrData[3].propertyPlantEquipment = 0 }

        if (yfData.balanceSheetHistoryQuarterly.balanceSheetStatements[3].retainedEarnings !== undefined && yfData.balanceSheetHistoryQuarterly.balanceSheetStatements[3].retainedEarnings !== null ){
          financialQtrData[3].retainedEarnings = yfData.balanceSheetHistoryQuarterly.balanceSheetStatements[3].retainedEarnings.raw;
        } else { financialQtrData[3].retainedEarnings = 0 }

        if (yfData.balanceSheetHistoryQuarterly.balanceSheetStatements[3].shortLongTermDebt !== undefined && yfData.balanceSheetHistoryQuarterly.balanceSheetStatements[3].shortLongTermDebt !== null ){
          financialQtrData[3].shortLongTermDebt = yfData.balanceSheetHistoryQuarterly.balanceSheetStatements[3].shortLongTermDebt.raw;
        } else { financialQtrData[3].shortLongTermDebt = 0 }

        if (yfData.balanceSheetHistoryQuarterly.balanceSheetStatements[3].shortTermInvestments !== undefined && yfData.balanceSheetHistoryQuarterly.balanceSheetStatements[3].shortTermInvestments !== null ){
          financialQtrData[3].shortTermInvestments = yfData.balanceSheetHistoryQuarterly.balanceSheetStatements[3].shortTermInvestments.raw;
        } else { financialQtrData[3].shortTermInvestments = 0 }

        if (yfData.balanceSheetHistoryQuarterly.balanceSheetStatements[3].totalAssets !== undefined && yfData.balanceSheetHistoryQuarterly.balanceSheetStatements[3].totalAssets !== null ){
          financialQtrData[3].totalAssets = yfData.balanceSheetHistoryQuarterly.balanceSheetStatements[3].totalAssets.raw;
        } else { financialQtrData[3].totalAssets = 0 }

        if (yfData.balanceSheetHistoryQuarterly.balanceSheetStatements[3].totalCurrentAssets !== undefined && yfData.balanceSheetHistoryQuarterly.balanceSheetStatements[3].totalCurrentAssets !== null ){
          financialQtrData[3].totalCurrentAssets = yfData.balanceSheetHistoryQuarterly.balanceSheetStatements[3].totalCurrentAssets.raw;
        } else { financialQtrData[3].totalCurrentAssets = 0 }

        if (yfData.balanceSheetHistoryQuarterly.balanceSheetStatements[3].totalCurrentLiabilities !== undefined && yfData.balanceSheetHistoryQuarterly.balanceSheetStatements[3].totalCurrentLiabilities !== null ){
          financialQtrData[3].totalCurrentLiabilities = yfData.balanceSheetHistoryQuarterly.balanceSheetStatements[3].totalCurrentLiabilities.raw;
        } else { financialQtrData[3].totalCurrentLiabilities = 0 }

        if (yfData.balanceSheetHistoryQuarterly.balanceSheetStatements[3].totalLiab !== undefined && yfData.balanceSheetHistoryQuarterly.balanceSheetStatements[3].totalLiab !== null ){
          financialQtrData[3].totalLiab = yfData.balanceSheetHistoryQuarterly.balanceSheetStatements[3].totalLiab.raw;
        } else { financialQtrData[3].totalLiab = 0 }

        if (yfData.balanceSheetHistoryQuarterly.balanceSheetStatements[3].totalStockholderEquity !== undefined && yfData.balanceSheetHistoryQuarterly.balanceSheetStatements[3].totalStockholderEquity !== null ){
          financialQtrData[3].totalStockholderEquity = yfData.balanceSheetHistoryQuarterly.balanceSheetStatements[3].totalStockholderEquity.raw;
        } else { financialQtrData[3].totalStockholderEquity = 0 }

        if (yfData.balanceSheetHistoryQuarterly.balanceSheetStatements[3].treasuryStock !== undefined && yfData.balanceSheetHistoryQuarterly.balanceSheetStatements[3].treasuryStock !== null ){
          financialQtrData[3].treasuryStock = yfData.balanceSheetHistoryQuarterly.balanceSheetStatements[3].treasuryStock.raw;
        } else { financialQtrData[3].treasuryStock = 0 }
        // Datos del flujo de caja 
        if (yfData.cashflowStatementHistoryQuarterly.cashflowStatements[3].capitalExpenditures !== undefined && yfData.cashflowStatementHistoryQuarterly.cashflowStatements[3].capitalExpenditures !== null ){
           financialQtrData[3].capitalExpenditures = yfData.cashflowStatementHistoryQuarterly.cashflowStatements[3].capitalExpenditures.raw; 
        } else {  financialQtrData[3].capitalExpenditures = 0 }

        if (yfData.cashflowStatementHistoryQuarterly.cashflowStatements[3].changeInCash !== undefined && yfData.cashflowStatementHistoryQuarterly.cashflowStatements[3].changeInCash !== null ){
           financialQtrData[3].changeInCash = yfData.cashflowStatementHistoryQuarterly.cashflowStatements[3].changeInCash.raw; 
        } else {  financialQtrData[3].changeInCash = 0 }
        
        if (yfData.cashflowStatementHistoryQuarterly.cashflowStatements[3].changeToAccountReceivables !== undefined && yfData.cashflowStatementHistoryQuarterly.cashflowStatements[3].changeToAccountReceivables !== null ){
           financialQtrData[3].changeToAccountReceivables = yfData.cashflowStatementHistoryQuarterly.cashflowStatements[3].changeToAccountReceivables.raw; 
        } else {  financialQtrData[3].changeToAccountReceivables = 0 }
        
        if (yfData.cashflowStatementHistoryQuarterly.cashflowStatements[3].changeToInventory !== undefined && yfData.cashflowStatementHistoryQuarterly.cashflowStatements[3].changeToInventory !== null ){
           financialQtrData[3].changeToInventory = yfData.cashflowStatementHistoryQuarterly.cashflowStatements[3].changeToInventory.raw; 
        } else {  financialQtrData[3].changeToInventory = 0 }
        
        if (yfData.cashflowStatementHistoryQuarterly.cashflowStatements[3].changeToLiabilities !== undefined && yfData.cashflowStatementHistoryQuarterly.cashflowStatements[3].changeToLiabilities !== null ){
           financialQtrData[3].changeToLiabilities = yfData.cashflowStatementHistoryQuarterly.cashflowStatements[3].changeToLiabilities.raw; 
        } else {  financialQtrData[3].changeToLiabilities = 0 }
        
        if (yfData.cashflowStatementHistoryQuarterly.cashflowStatements[3].changeToNetincome !== undefined && yfData.cashflowStatementHistoryQuarterly.cashflowStatements[3].changeToNetincome !== null ){
           financialQtrData[3].changeToNetincome = yfData.cashflowStatementHistoryQuarterly.cashflowStatements[3].changeToNetincome.raw; 
        } else {  financialQtrData[3].changeToNetincome = 0 }
        
        if (yfData.cashflowStatementHistoryQuarterly.cashflowStatements[3].changeToOperatingActivities !== undefined && yfData.cashflowStatementHistoryQuarterly.cashflowStatements[3].changeToOperatingActivities !== null ){
           financialQtrData[3].changeToOperatingActivities = yfData.cashflowStatementHistoryQuarterly.cashflowStatements[3].changeToOperatingActivities.raw; 
        } else {  financialQtrData[3].changeToOperatingActivities = 0 }
        
        if (yfData.cashflowStatementHistoryQuarterly.cashflowStatements[3].depreciation !== undefined && yfData.cashflowStatementHistoryQuarterly.cashflowStatements[3].depreciation !== null ){
           financialQtrData[3].depreciation = yfData.cashflowStatementHistoryQuarterly.cashflowStatements[3].depreciation.raw; 
        } else {  financialQtrData[3].depreciation = 0 }
        
        if (yfData.cashflowStatementHistoryQuarterly.cashflowStatements[3].dividendsPaid !== undefined && yfData.cashflowStatementHistoryQuarterly.cashflowStatements[3].dividendsPaid !== null ){
           financialQtrData[3].dividendsPaid = yfData.cashflowStatementHistoryQuarterly.cashflowStatements[3].dividendsPaid.raw; 
        } else {  financialQtrData[3].dividendsPaid = 0 }
        
        if (yfData.cashflowStatementHistoryQuarterly.cashflowStatements[3].effectOfExchangeRate !== undefined && yfData.cashflowStatementHistoryQuarterly.cashflowStatements[3].effectOfExchangeRate !== null ){
           financialQtrData[3].effectOfExchangeRate = yfData.cashflowStatementHistoryQuarterly.cashflowStatements[3].effectOfExchangeRate.raw; 
        } else {  financialQtrData[3].effectOfExchangeRate = 0 }
        
        if (yfData.cashflowStatementHistoryQuarterly.cashflowStatements[3].investments !== undefined && yfData.cashflowStatementHistoryQuarterly.cashflowStatements[3].investments !== null ){
           financialQtrData[3].investments = yfData.cashflowStatementHistoryQuarterly.cashflowStatements[3].investments.raw; 
        } else {  financialQtrData[3].investments = 0 }
        
        if (yfData.cashflowStatementHistoryQuarterly.cashflowStatements[3].issuanceOfStock !== undefined && yfData.cashflowStatementHistoryQuarterly.cashflowStatements[3].issuanceOfStock !== null ){
           financialQtrData[3].issuanceOfStock = yfData.cashflowStatementHistoryQuarterly.cashflowStatements[3].issuanceOfStock.raw; 
        } else {  financialQtrData[3].issuanceOfStock = 0 }
        
        if (yfData.cashflowStatementHistoryQuarterly.cashflowStatements[3].netBorrowings !== undefined && yfData.cashflowStatementHistoryQuarterly.cashflowStatements[3].netBorrowings !== null ){
           financialQtrData[3].netBorrowings = yfData.cashflowStatementHistoryQuarterly.cashflowStatements[3].netBorrowings.raw; 
        } else {  financialQtrData[3].netBorrowings = 0 }
        
        if (yfData.cashflowStatementHistoryQuarterly.cashflowStatements[3].otherCashflowsFromFinancingActivities !== undefined && yfData.cashflowStatementHistoryQuarterly.cashflowStatements[3].otherCashflowsFromFinancingActivities !== null ){
           financialQtrData[3].otherCashflowsFromFinancingActivities = yfData.cashflowStatementHistoryQuarterly.cashflowStatements[3].otherCashflowsFromFinancingActivities.raw; 
        } else {  financialQtrData[3].otherCashflowsFromFinancingActivities = 0 }
        
        if (yfData.cashflowStatementHistoryQuarterly.cashflowStatements[3].otherCashflowsFromOperatingActivities !== undefined && yfData.cashflowStatementHistoryQuarterly.cashflowStatements[3].otherCashflowsFromOperatingActivities !== null ){
           financialQtrData[3].otherCashflowsFromOperatingActivities = yfData.cashflowStatementHistoryQuarterly.cashflowStatements[3].otherCashflowsFromOperatingActivities.raw; 
        } else {  financialQtrData[3].otherCashflowsFromOperatingActivities = 0 }
        
        if (yfData.cashflowStatementHistoryQuarterly.cashflowStatements[3].otherCashflowsFromInvestingActivities !== undefined && yfData.cashflowStatementHistoryQuarterly.cashflowStatements[3].otherCashflowsFromInvestingActivities !== null ){
           financialQtrData[3].otherCashflowsFromInvestingActivities = yfData.cashflowStatementHistoryQuarterly.cashflowStatements[3].otherCashflowsFromInvestingActivities.raw; 
        } else {  financialQtrData[3].otherCashflowsFromInvestingActivities = 0 }
        
        if (yfData.cashflowStatementHistoryQuarterly.cashflowStatements[3].repurchaseOfStock !== undefined && yfData.cashflowStatementHistoryQuarterly.cashflowStatements[3].repurchaseOfStock !== null ){
           financialQtrData[3].repurchaseOfStock = yfData.cashflowStatementHistoryQuarterly.cashflowStatements[3].repurchaseOfStock.raw; 
        } else {  financialQtrData[3].repurchaseOfStock = 0 }
        
        if (yfData.cashflowStatementHistoryQuarterly.cashflowStatements[3].totalCashFromFinancingActivities !== undefined && yfData.cashflowStatementHistoryQuarterly.cashflowStatements[3].totalCashFromFinancingActivities !== null ){
           financialQtrData[3].totalCashFromFinancingActivities = yfData.cashflowStatementHistoryQuarterly.cashflowStatements[3].totalCashFromFinancingActivities.raw; 
        } else {  financialQtrData[3].totalCashFromFinancingActivities = 0 }
        
        if (yfData.cashflowStatementHistoryQuarterly.cashflowStatements[3].totalCashFromOperatingActivities !== undefined && yfData.cashflowStatementHistoryQuarterly.cashflowStatements[3].totalCashFromOperatingActivities !== null ){
           financialQtrData[3].totalCashFromOperatingActivities = yfData.cashflowStatementHistoryQuarterly.cashflowStatements[3].totalCashFromOperatingActivities.raw; 
        } else {  financialQtrData[3].totalCashFromOperatingActivities = 0 }
        
        if (yfData.cashflowStatementHistoryQuarterly.cashflowStatements[3].totalCashflowsFromInvestingActivities !== undefined && yfData.cashflowStatementHistoryQuarterly.cashflowStatements[3].totalCashflowsFromInvestingActivities !== null ){
           financialQtrData[3].totalCashflowsFromInvestingActivities = yfData.cashflowStatementHistoryQuarterly.cashflowStatements[3].totalCashflowsFromInvestingActivities.raw; 
        } else {  financialQtrData[3].totalCashflowsFromInvestingActivities = 0 }

        // Datos del income statement (yfData.incomeStatementHistoryQuarterly
        if (yfData.incomeStatementHistoryQuarterly.incomeStatementHistory[3].costOfRevenue !== undefined && yfData.incomeStatementHistoryQuarterly.incomeStatementHistory[3].costOfRevenue !== null ){
          financialQtrData[3].costOfRevenue = yfData.incomeStatementHistoryQuarterly.incomeStatementHistory[3].costOfRevenue.raw; 
        } else { financialQtrData[3].costOfRevenue = 0 }

        if (yfData.incomeStatementHistoryQuarterly.incomeStatementHistory[3].discontinuedOperations !== undefined && yfData.incomeStatementHistoryQuarterly.incomeStatementHistory[3].discontinuedOperations !== null ){
          financialQtrData[3].discontinuedOperations = yfData.incomeStatementHistoryQuarterly.incomeStatementHistory[3].discontinuedOperations.raw; 
        } else { financialQtrData[3].discontinuedOperations = 0 }

        if (yfData.incomeStatementHistoryQuarterly.incomeStatementHistory[3].ebit !== undefined && yfData.incomeStatementHistoryQuarterly.incomeStatementHistory[3].ebit !== null ){
          financialQtrData[3].ebit = yfData.incomeStatementHistoryQuarterly.incomeStatementHistory[3].ebit.raw; 
        } else { financialQtrData[3].ebit = 0 }

        if (yfData.incomeStatementHistoryQuarterly.incomeStatementHistory[3].effectOfAccountingCharges !== undefined && yfData.incomeStatementHistoryQuarterly.incomeStatementHistory[3].effectOfAccountingCharges !== null ){
          financialQtrData[3].effectOfAccountingCharges = yfData.incomeStatementHistoryQuarterly.incomeStatementHistory[3].effectOfAccountingCharges.raw; 
        } else { financialQtrData[3].effectOfAccountingCharges = 0 }

        if (yfData.incomeStatementHistoryQuarterly.incomeStatementHistory[3].extraordinaryItems !== undefined && yfData.incomeStatementHistoryQuarterly.incomeStatementHistory[3].extraordinaryItems !== null ){
          financialQtrData[3].extraordinaryItems = yfData.incomeStatementHistoryQuarterly.incomeStatementHistory[3].extraordinaryItems.raw; 
        } else { financialQtrData[3].extraordinaryItems = 0 }

        if (yfData.incomeStatementHistoryQuarterly.incomeStatementHistory[3].grossProfit !== undefined && yfData.incomeStatementHistoryQuarterly.incomeStatementHistory[3].grossProfit !== null ){
          financialQtrData[3].grossProfit = yfData.incomeStatementHistoryQuarterly.incomeStatementHistory[3].grossProfit.raw; 
        } else { financialQtrData[3].grossProfit = 0 }

        if (yfData.incomeStatementHistoryQuarterly.incomeStatementHistory[3].incomeBeforeTax !== undefined && yfData.incomeStatementHistoryQuarterly.incomeStatementHistory[3].incomeBeforeTax !== null ){
          financialQtrData[3].incomeBeforeTax = yfData.incomeStatementHistoryQuarterly.incomeStatementHistory[3].incomeBeforeTax.raw; 
        } else { financialQtrData[3].incomeBeforeTax = 0 }

        if (yfData.incomeStatementHistoryQuarterly.incomeStatementHistory[3].incomeTaxExpense !== undefined && yfData.incomeStatementHistoryQuarterly.incomeStatementHistory[3].incomeTaxExpense !== null ){
          financialQtrData[3].incomeTaxExpense = yfData.incomeStatementHistoryQuarterly.incomeStatementHistory[3].incomeTaxExpense.raw; 
        } else { financialQtrData[3].incomeTaxExpense = 0 }

        if (yfData.incomeStatementHistoryQuarterly.incomeStatementHistory[3].interestExpense !== undefined && yfData.incomeStatementHistoryQuarterly.incomeStatementHistory[3].interestExpense !== null ){
          financialQtrData[3].interestExpense = yfData.incomeStatementHistoryQuarterly.incomeStatementHistory[3].interestExpense.raw; 
        } else { financialQtrData[3].interestExpense = 0 }

        if (yfData.incomeStatementHistoryQuarterly.incomeStatementHistory[3].minorityInterest !== undefined && yfData.incomeStatementHistoryQuarterly.incomeStatementHistory[3].minorityInterest !== null ){
          financialQtrData[3].minorityInterest = yfData.incomeStatementHistoryQuarterly.incomeStatementHistory[3].minorityInterest.raw; 
        } else { financialQtrData[3].minorityInterest = 0 }

        if (yfData.incomeStatementHistoryQuarterly.incomeStatementHistory[3].netIncome !== undefined && yfData.incomeStatementHistoryQuarterly.incomeStatementHistory[3].netIncome !== null ){
          financialQtrData[3].netIncome = yfData.incomeStatementHistoryQuarterly.incomeStatementHistory[3].netIncome.raw; 
        } else { financialQtrData[3].netIncome = 0 }

        if (yfData.incomeStatementHistoryQuarterly.incomeStatementHistory[3].netIncomeApplicableToCommonShares !== undefined && yfData.incomeStatementHistoryQuarterly.incomeStatementHistory[3].netIncomeApplicableToCommonShares !== null ){
          financialQtrData[3].netIncomeApplicableToCommonShares = yfData.incomeStatementHistoryQuarterly.incomeStatementHistory[3].netIncomeApplicableToCommonShares.raw; 
        } else { financialQtrData[3].netIncomeApplicableToCommonShares = 0 }

        if (yfData.incomeStatementHistoryQuarterly.incomeStatementHistory[3].netIncomeFromContinuingOps !== undefined && yfData.incomeStatementHistoryQuarterly.incomeStatementHistory[3].netIncomeFromContinuingOps !== null ){
          financialQtrData[3].netIncomeFromContinuingOps = yfData.incomeStatementHistoryQuarterly.incomeStatementHistory[3].netIncomeFromContinuingOps.raw; 
        } else { financialQtrData[3].netIncomeFromContinuingOps = 0 }

        if (yfData.incomeStatementHistoryQuarterly.incomeStatementHistory[3].nonRecurring !== undefined && yfData.incomeStatementHistoryQuarterly.incomeStatementHistory[3].nonRecurring !== null ){
          financialQtrData[3].nonRecurring = yfData.incomeStatementHistoryQuarterly.incomeStatementHistory[3].nonRecurring.raw; 
        } else { financialQtrData[3].nonRecurring = 0 }

        if (yfData.incomeStatementHistoryQuarterly.incomeStatementHistory[3].operatingIncome !== undefined && yfData.incomeStatementHistoryQuarterly.incomeStatementHistory[3].operatingIncome !== null ){
          financialQtrData[3].operatingIncome = yfData.incomeStatementHistoryQuarterly.incomeStatementHistory[3].operatingIncome.raw; 
        } else { financialQtrData[3].operatingIncome = 0 }

        if (yfData.incomeStatementHistoryQuarterly.incomeStatementHistory[3].otherItems !== undefined && yfData.incomeStatementHistoryQuarterly.incomeStatementHistory[3].otherItems !== null ){
          financialQtrData[3].otherItems = yfData.incomeStatementHistoryQuarterly.incomeStatementHistory[3].otherItems.raw; 
        } else { financialQtrData[3].otherItems = 0 }

        if (yfData.incomeStatementHistoryQuarterly.incomeStatementHistory[3].otherOperatingExpenses !== undefined && yfData.incomeStatementHistoryQuarterly.incomeStatementHistory[3].otherOperatingExpenses !== null ){
          financialQtrData[3].otherOperatingExpenses = yfData.incomeStatementHistoryQuarterly.incomeStatementHistory[3].otherOperatingExpenses.raw; 
        } else { financialQtrData[3].otherOperatingExpenses = 0 }

        if (yfData.incomeStatementHistoryQuarterly.incomeStatementHistory[3].researchDevelopment !== undefined && yfData.incomeStatementHistoryQuarterly.incomeStatementHistory[3].researchDevelopment !== null ){
          financialQtrData[3].researchDevelopment = yfData.incomeStatementHistoryQuarterly.incomeStatementHistory[3].researchDevelopment.raw; 
        } else { financialQtrData[3].researchDevelopment = 0 }

        if (yfData.incomeStatementHistoryQuarterly.incomeStatementHistory[3].sellingGeneralAdministrative !== undefined && yfData.incomeStatementHistoryQuarterly.incomeStatementHistory[3].sellingGeneralAdministrative !== null ){
          financialQtrData[3].sellingGeneralAdministrative = yfData.incomeStatementHistoryQuarterly.incomeStatementHistory[3].sellingGeneralAdministrative.raw; 
        } else { financialQtrData[3].sellingGeneralAdministrative = 0 }

        if (yfData.incomeStatementHistoryQuarterly.incomeStatementHistory[3].totalOperatingExpenses !== undefined && yfData.incomeStatementHistoryQuarterly.incomeStatementHistory[3].totalOperatingExpenses !== null ){
          financialQtrData[3].totalOperatingExpenses = yfData.incomeStatementHistoryQuarterly.incomeStatementHistory[3].totalOperatingExpenses.raw; 
        } else { financialQtrData[3].totalOperatingExpenses = 0 }

        if (yfData.incomeStatementHistoryQuarterly.incomeStatementHistory[3].totalOtherIncomeExpenseNet !== undefined && yfData.incomeStatementHistoryQuarterly.incomeStatementHistory[3].totalOtherIncomeExpenseNet !== null ){
          financialQtrData[3].totalOtherIncomeExpenseNet = yfData.incomeStatementHistoryQuarterly.incomeStatementHistory[3].totalOtherIncomeExpenseNet.raw; 
        } else { financialQtrData[3].totalOtherIncomeExpenseNet = 0 }
        
        if (yfData.incomeStatementHistoryQuarterly.incomeStatementHistory[3].totalRevenue !== undefined && yfData.incomeStatementHistoryQuarterly.incomeStatementHistory[3].totalRevenue !== null ){
          financialQtrData[3].totalRevenue = yfData.incomeStatementHistoryQuarterly.incomeStatementHistory[3].totalRevenue.raw; 
        } else { financialQtrData[3].totalRevenue = 0 }

        // if (yfData.incomeStatementHistoryQuarterly.incomeStatementHistory[3].costOfRevenue !== undefined && yfData.incomeStatementHistoryQuarterly.incomeStatementHistory[3].costOfRevenue !== null ){
        //   financialQtrData[3].costOfRevenue = yfData.incomeStatementHistoryQuarterly.incomeStatementHistory[3].costOfRevenue.raw; 
        // } else { financialQtrData[3].costOfRevenue = 0 }

        // if (yfData.incomeStatementHistoryQuarterly.incomeStatementHistory[3].netIncome !== undefined && yfData.incomeStatementHistoryQuarterly.incomeStatementHistory[3].netIncome !== null ){
        //   financialQtrData[3].netIncome = yfData.incomeStatementHistoryQuarterly.incomeStatementHistory[3].netIncome.raw; 
        // } else { financialQtrData[3].netIncome = 0 }

        // if (yfData.incomeStatementHistoryQuarterly.incomeStatementHistory[3].totalRevenue !== undefined && yfData.incomeStatementHistoryQuarterly.incomeStatementHistory[3].totalRevenue !== null ){
        //   financialQtrData[3].totalRevenue = yfData.incomeStatementHistoryQuarterly.incomeStatementHistory[3].totalRevenue.raw; 
        // } else { financialQtrData[3].totalRevenue = 0 }

        console.log(financialQtrData[0]);
        console.log(financialQtrData[1]);
        console.log(financialQtrData[2]);
        console.log(financialQtrData[3]);

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


