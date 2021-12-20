import React from 'react';
import { useHistory } from 'react-router-dom';

import axios from "axios";
import api from '../services/api';
import Header from '../components/Header';
import { Grid, Typography, Button } from '@material-ui/core';
import { LeakAddTwoTone } from '@material-ui/icons';

export default function Update () {
 

  const history = useHistory ();
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
    
    financialsId: "", 
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
    totalRevenue: "",
  } 
 
  async function handleFinancials (){
    alert("entrou em handleFinancials");
    // busca a informacao dos dados financeiros no bando de dados
    try {
      // console.log(typeof(companyData.financialsId));
      const response = await api.get ('/financials', { headers: { Authorization: companyData.financialsId }})
        try {
          const data =  companyData  ;
          const response = await api.put ('/financials', data);
          return { valid: true, message:"Éxito en actualización de datos financieros" };
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
          console.log("Frontend: datos de este periodo no existen en la base de datos");
          try {
            // tenta incluir nova
  
            const data =  companyData ;
            const response = await api.post('/financials', data );
            return { valid: true, message:"Éxito en inclusión de datos financieros" };
            // se nao conseguiu, ve a msg de erro
          } catch (err) {
              const errorMsg = Object.values(err.response.data);
              alert("Error en inclusión de datos financieros");
              return { valid: false, message:"Error en inclusión de datos financieros" };
            }
        } else {
          // se...
            const errorMsg = Object.values(err.response.data);
            alert("Error en inicio de sessión");
            return { valid: false, message:"Error en actualización de datos financieros" };
          }
        }

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
    // if (handleCompany().valid) {
    //   alert("handleCompany is true");
    //   if (handleFinancials().valid){
    //     alert ("Datos incluidos correctamente");
    //     history.push('/');
    //   }
    // }
    handleCompany();
    handleFinancials();
  }

  function getYFData(){

     
      const options = {
        method: 'GET',
        url: 'https://yh-finance.p.rapidapi.com/stock/v2/get-financials',
        params: {symbol: 'PEP', region: 'US'},
        headers: {
            'x-rapidapi-host': 'yh-finance.p.rapidapi.com',
            'x-rapidapi-key': '057477ec51mshd7404991ea3c956p1dc241jsn2fbfbe21b657'
        }
      };
 
      axios.request(options).then(function (response) {
        const yfData =  response.data;
        const { meta: {symbol}} = yfData;
        const { price: {marketCap: {raw}}} = yfData;
        console.log(yfData);
        companyData.financialsId = yfData.balanceSheetHistory.balanceSheetStatements[0].endDate.fmt + yfData.quoteType.symbol  ;
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
    
        if (yfData.balanceSheetHistory.balanceSheetStatements[0].accountsPayable !== undefined && yfData.balanceSheetHistory.balanceSheetStatements[0].accountsPayable !== null ){
          companyData.accountsPayable = yfData.balanceSheetHistory.balanceSheetStatements[0].accountsPayable.raw;
        } else { companyData.accountsPayable = 0 }

        if (yfData.balanceSheetHistory.balanceSheetStatements[0].capitalSurplus !== undefined && yfData.balanceSheetHistory.balanceSheetStatements[0].capitalSurplus !== null ){
          companyData.capitalSurplus = yfData.balanceSheetHistory.balanceSheetStatements[0].capitalSurplus.raw;
        } else { companyData.capitalSurplus = 0 }

        if (yfData.balanceSheetHistory.balanceSheetStatements[0].cash !== undefined && yfData.balanceSheetHistory.balanceSheetStatements[0].cash !== null ){
          companyData.cash = yfData.balanceSheetHistory.balanceSheetStatements[0].cash.raw;
        } else { companyData.cash = 0 }

        if (yfData.balanceSheetHistory.balanceSheetStatements[0].commonStock !== undefined && yfData.balanceSheetHistory.balanceSheetStatements[0].commonStock !== null ){
          companyData.commonStock = yfData.balanceSheetHistory.balanceSheetStatements[0].commonStock.raw;
        } else { companyData.commonStock = 0 }

        if (yfData.balanceSheetHistory.balanceSheetStatements[0].endDate !== undefined && yfData.balanceSheetHistory.balanceSheetStatements[0].endDate !== null ){
          companyData.endDate = yfData.balanceSheetHistory.balanceSheetStatements[0].endDate.fmt;
        } else { companyData.endDate = "" }

        if (yfData.balanceSheetHistory.balanceSheetStatements[0].goodWill !== undefined && yfData.balanceSheetHistory.balanceSheetStatements[0].goodWill !== null ){
          companyData.goodWill = yfData.balanceSheetHistory.balanceSheetStatements[0].goodWill.raw;
        } else { companyData.goodWill = 0 }

        if (yfData.balanceSheetHistory.balanceSheetStatements[0].intangibleAssets !== undefined && yfData.balanceSheetHistory.balanceSheetStatements[0].intangibleAssets !== null ){
          companyData.intangibleAssets = yfData.balanceSheetHistory.balanceSheetStatements[0].intangibleAssets.raw; 
        } else { companyData.intangibleAssets = 0 }

        if (yfData.balanceSheetHistory.balanceSheetStatements[0].inventory !== undefined && yfData.balanceSheetHistory.balanceSheetStatements[0].inventory !== null ){
          companyData.inventory = yfData.balanceSheetHistory.balanceSheetStatements[0].inventory.raw; 
        } else { companyData.inventory = 0 }

        if (yfData.balanceSheetHistory.balanceSheetStatements[0].longTermDebt !== undefined && yfData.balanceSheetHistory.balanceSheetStatements[0].longTermDebt !== null ){
          companyData.longTermDebt = yfData.balanceSheetHistory.balanceSheetStatements[0].longTermDebt.raw;
        } else { companyData.longTermDebt = 0 }

        if (yfData.balanceSheetHistory.balanceSheetStatements[0].longTermInvestments !== undefined && yfData.balanceSheetHistory.balanceSheetStatements[0].longTermInvestments !== null ){
          companyData.longTermInvestments = yfData.balanceSheetHistory.balanceSheetStatements[0].longTermInvestments.raw;
        } else { companyData.longTermInvestments = 0 }

        if (yfData.balanceSheetHistory.balanceSheetStatements[0].netReceivables !== undefined && yfData.balanceSheetHistory.balanceSheetStatements[0].netReceivables !== null ){
          companyData.netReceivables = yfData.balanceSheetHistory.balanceSheetStatements[0].netReceivables.raw;
        } else { companyData.netReceivables = 0 }

        if (yfData.balanceSheetHistory.balanceSheetStatements[0].netTangibleAssets !== undefined && yfData.balanceSheetHistory.balanceSheetStatements[0].netTangibleAssets !== null ){
          companyData.netTangibleAssets = yfData.balanceSheetHistory.balanceSheetStatements[0].netTangibleAssets.raw;
        } else { companyData.netTangibleAssets = 0 }

        if (yfData.balanceSheetHistory.balanceSheetStatements[0].otherAssets !== undefined && yfData.balanceSheetHistory.balanceSheetStatements[0].otherAssets !== null ){
          companyData.otherAssets = yfData.balanceSheetHistory.balanceSheetStatements[0].otherAssets.raw;
        } else { companyData.otherAssets = 0 }

        if (yfData.balanceSheetHistory.balanceSheetStatements[0].otherCurrentAssets !== undefined && yfData.balanceSheetHistory.balanceSheetStatements[0].otherCurrentAssets !== null ){
          companyData.otherCurrentAssets = yfData.balanceSheetHistory.balanceSheetStatements[0].otherCurrentAssets.raw;
        } else { companyData.otherCurrentAssets = 0 }

        if (yfData.balanceSheetHistory.balanceSheetStatements[0].otherCurrentLiab !== undefined && yfData.balanceSheetHistory.balanceSheetStatements[0].otherCurrentLiab !== null ){
          companyData.otherCurrentLiab = yfData.balanceSheetHistory.balanceSheetStatements[0].otherCurrentLiab.raw;
        } else { companyData.otherCurrentLiab = 0 }

        if (yfData.balanceSheetHistory.balanceSheetStatements[0].otherLiab !== undefined && yfData.balanceSheetHistory.balanceSheetStatements[0].otherLiab !== null ){
          companyData.otherLiab = yfData.balanceSheetHistory.balanceSheetStatements[0].otherLiab.raw;
        } else { companyData.otherLiab = 0 }

        if (yfData.balanceSheetHistory.balanceSheetStatements[0].otherStockholderEquity !== undefined && yfData.balanceSheetHistory.balanceSheetStatements[0].otherStockholderEquity !== null ){
          companyData.otherStockholderEquity = yfData.balanceSheetHistory.balanceSheetStatements[0].otherStockholderEquity.raw;
        } else { companyData.otherStockholderEquity = 0 }
        
        if (yfData.balanceSheetHistory.balanceSheetStatements[0].propertyPlantEquipment !== undefined && yfData.balanceSheetHistory.balanceSheetStatements[0].propertyPlantEquipment !== null ){
          companyData.propertyPlantEquipment = yfData.balanceSheetHistory.balanceSheetStatements[0].propertyPlantEquipment.raw;
        } else { companyData.propertyPlantEquipment = 0 }

        if (yfData.balanceSheetHistory.balanceSheetStatements[0].retainedEarnings !== undefined && yfData.balanceSheetHistory.balanceSheetStatements[0].retainedEarnings !== null ){
          companyData.retainedEarnings = yfData.balanceSheetHistory.balanceSheetStatements[0].retainedEarnings.raw;
        } else { companyData.retainedEarnings = 0 }

        if (yfData.balanceSheetHistory.balanceSheetStatements[0].shortLongTermDebt !== undefined && yfData.balanceSheetHistory.balanceSheetStatements[0].shortLongTermDebt !== null ){
          companyData.shortLongTermDebt = yfData.balanceSheetHistory.balanceSheetStatements[0].shortLongTermDebt.raw;
        } else { companyData.shortLongTermDebt = 0 }     
        
        if (yfData.balanceSheetHistory.balanceSheetStatements[0].shortTermInvestments !== undefined && yfData.balanceSheetHistory.balanceSheetStatements[0].shortTermInvestments !== null ){
          companyData.shortTermInvestments = yfData.balanceSheetHistory.balanceSheetStatements[0].shortTermInvestments.raw;
        } else { companyData.shortTermInvestments = 0 }

        if (yfData.balanceSheetHistory.balanceSheetStatements[0].totalAssets !== undefined && yfData.balanceSheetHistory.balanceSheetStatements[0].totalAssets !== null ){
          companyData.totalAssets = yfData.balanceSheetHistory.balanceSheetStatements[0].totalAssets.raw;
        } else { companyData.totalAssets = 0 }

        if (yfData.balanceSheetHistory.balanceSheetStatements[0].totalCurrentAssets !== undefined && yfData.balanceSheetHistory.balanceSheetStatements[0].totalCurrentAssets !== null ){
          companyData.totalCurrentAssets = yfData.balanceSheetHistory.balanceSheetStatements[0].totalCurrentAssets.raw;
        } else { companyData.totalCurrentAssets = 0 }

        if (yfData.balanceSheetHistory.balanceSheetStatements[0].totalCurrentLiabilities !== undefined && yfData.balanceSheetHistory.balanceSheetStatements[0].totalCurrentLiabilities !== null ){
          companyData.totalCurrentLiabilities = yfData.balanceSheetHistory.balanceSheetStatements[0].totalCurrentLiabilities.raw;
        } else { companyData.totalCurrentLiabilities = 0 }

        if (yfData.balanceSheetHistory.balanceSheetStatements[0].totalLiab !== undefined && yfData.balanceSheetHistory.balanceSheetStatements[0].totalLiab !== null ){
          companyData.totalLiab = yfData.balanceSheetHistory.balanceSheetStatements[0].totalLiab.raw;
        } else { companyData.totalLiab = 0 }

        if (yfData.balanceSheetHistory.balanceSheetStatements[0].totalStockholderEquity !== undefined && yfData.balanceSheetHistory.balanceSheetStatements[0].totalStockholderEquity !== null ){
          companyData.totalStockholderEquity = yfData.balanceSheetHistory.balanceSheetStatements[0].totalStockholderEquity.raw;
        } else { companyData.totalStockholderEquity = 0 }

        if (yfData.balanceSheetHistory.balanceSheetStatements[0].treasuryStock !== undefined && yfData.balanceSheetHistory.balanceSheetStatements[0].treasuryStock !== null ){
          companyData.treasuryStock = yfData.balanceSheetHistory.balanceSheetStatements[0].treasuryStock.raw;
        } else { companyData.treasuryStock = 0 }

        if (yfData.cashflowStatementHistory.cashflowStatements[0].capitalExpenditures !== undefined && yfData.cashflowStatementHistory.cashflowStatements[0].capitalExpenditures !== null ){
          companyData.capitalExpenditures = yfData.cashflowStatementHistory.cashflowStatements[0].capitalExpenditures.raw; 
        } else { companyData.capitalExpenditures = 0 }

        if (yfData.cashflowStatementHistory.cashflowStatements[0].changeInCash !== undefined && yfData.cashflowStatementHistory.cashflowStatements[0].changeInCash !== null ){
          companyData.changeInCash = yfData.cashflowStatementHistory.cashflowStatements[0].changeInCash.raw; 
        } else { companyData.changeInCash = 0 }
        
        if (yfData.cashflowStatementHistory.cashflowStatements[0].changeToAccountReceivables !== undefined && yfData.cashflowStatementHistory.cashflowStatements[0].changeToAccountReceivables !== null ){
          companyData.changeToAccountReceivables = yfData.cashflowStatementHistory.cashflowStatements[0].changeToAccountReceivables.raw; 
        } else { companyData.changeToAccountReceivables = 0 }

        if (yfData.cashflowStatementHistory.cashflowStatements[0].changeToInventory !== undefined && yfData.cashflowStatementHistory.cashflowStatements[0].changeToInventory !== null ){
          companyData.changeToInventory = yfData.cashflowStatementHistory.cashflowStatements[0].changeToInventory.raw; 
        } else { companyData.changeToInventory = 0 }
        
        if (yfData.cashflowStatementHistory.cashflowStatements[0].changeToLiabilities !== undefined && yfData.cashflowStatementHistory.cashflowStatements[0].changeToLiabilities !== null ){
          companyData.changeToLiabilities = yfData.cashflowStatementHistory.cashflowStatements[0].changeToLiabilities.raw; 
        } else { companyData.changeToLiabilities = 0 }

        if (yfData.cashflowStatementHistory.cashflowStatements[0].changeToNetincome !== undefined && yfData.cashflowStatementHistory.cashflowStatements[0].changeToNetincome !== null ){
          companyData.changeToNetincome = yfData.cashflowStatementHistory.cashflowStatements[0].changeToNetincome.raw; 
        } else { companyData.changeToNetincome = 0 }

        if (yfData.cashflowStatementHistory.cashflowStatements[0].changeToOperatingActivities !== undefined && yfData.cashflowStatementHistory.cashflowStatements[0].changeToOperatingActivities !== null ){
          companyData.changeToOperatingActivities = yfData.cashflowStatementHistory.cashflowStatements[0].changeToOperatingActivities.raw; 
        } else { companyData.changeToOperatingActivities = 0 }

        if (yfData.cashflowStatementHistory.cashflowStatements[0].depreciation !== undefined && yfData.cashflowStatementHistory.cashflowStatements[0].depreciation !== null ){
          companyData.depreciation = yfData.cashflowStatementHistory.cashflowStatements[0].depreciation.raw; 
        } else { companyData.depreciation = 0 }

        if (yfData.cashflowStatementHistory.cashflowStatements[0].dividendsPaid !== undefined && yfData.cashflowStatementHistory.cashflowStatements[0].dividendsPaid !== null ){
          companyData.dividendsPaid = yfData.cashflowStatementHistory.cashflowStatements[0].dividendsPaid.raw; 
        } else { companyData.dividendsPaid = 0 }

        if (yfData.cashflowStatementHistory.cashflowStatements[0].effectOfExchangeRate !== undefined && yfData.cashflowStatementHistory.cashflowStatements[0].effectOfExchangeRate !== null ){
          companyData.effectOfExchangeRate = yfData.cashflowStatementHistory.cashflowStatements[0].effectOfExchangeRate.raw; 
        } else { companyData.effectOfExchangeRate = 0 }

        if (yfData.cashflowStatementHistory.cashflowStatements[0].investments !== undefined && yfData.cashflowStatementHistory.cashflowStatements[0].investments !== null ){
          companyData.investments = yfData.cashflowStatementHistory.cashflowStatements[0].investments.raw; 
        } else { companyData.investments = 0 }

        if (yfData.cashflowStatementHistory.cashflowStatements[0].issuanceOfStock !== undefined && yfData.cashflowStatementHistory.cashflowStatements[0].issuanceOfStock !== null ){
          companyData.issuanceOfStock = yfData.cashflowStatementHistory.cashflowStatements[0].issuanceOfStock.raw; 
        } else { companyData.issuanceOfStock = 0 }

        if (yfData.cashflowStatementHistory.cashflowStatements[0].netBorrowings !== undefined && yfData.cashflowStatementHistory.cashflowStatements[0].netBorrowings !== null ){
          companyData.netBorrowings = yfData.cashflowStatementHistory.cashflowStatements[0].netBorrowings.raw; 
        } else { companyData.netBorrowings = 0 }

        if (yfData.cashflowStatementHistory.cashflowStatements[0].otherCashflowsFromFinancingActivities !== undefined && yfData.cashflowStatementHistory.cashflowStatements[0].otherCashflowsFromFinancingActivities !== null ){
          companyData.otherCashflowsFromFinancingActivities = yfData.cashflowStatementHistory.cashflowStatements[0].otherCashflowsFromFinancingActivities.raw; 
        } else { companyData.otherCashflowsFromFinancingActivities = 0 }

        if (yfData.cashflowStatementHistory.cashflowStatements[0].otherCashflowsFromOperatingActivities !== undefined && yfData.cashflowStatementHistory.cashflowStatements[0].otherCashflowsFromOperatingActivities !== null ){
          companyData.otherCashflowsFromOperatingActivities = yfData.cashflowStatementHistory.cashflowStatements[0].otherCashflowsFromOperatingActivities.raw; 
        } else { companyData.otherCashflowsFromOperatingActivities = 0 }

        if (yfData.cashflowStatementHistory.cashflowStatements[0].otherCashflowsFromInvestingActivities !== undefined && yfData.cashflowStatementHistory.cashflowStatements[0].otherCashflowsFromInvestingActivities !== null ){
          companyData.otherCashflowsFromInvestingActivities = yfData.cashflowStatementHistory.cashflowStatements[0].otherCashflowsFromInvestingActivities.raw; 
        } else { companyData.otherCashflowsFromInvestingActivities = 0 }
 
        if (yfData.cashflowStatementHistory.cashflowStatements[0].repurchaseOfStock !== undefined && yfData.cashflowStatementHistory.cashflowStatements[0].repurchaseOfStock !== null ){
          companyData.repurchaseOfStock = yfData.cashflowStatementHistory.cashflowStatements[0].repurchaseOfStock.raw; 
        } else { companyData.repurchaseOfStock = 0 }
 
        if (yfData.cashflowStatementHistory.cashflowStatements[0].totalCashFromFinancingActivities !== undefined && yfData.cashflowStatementHistory.cashflowStatements[0].totalCashFromFinancingActivities !== null ){
          companyData.totalCashFromFinancingActivities = yfData.cashflowStatementHistory.cashflowStatements[0].totalCashFromFinancingActivities.raw; 
        } else { companyData.totalCashFromFinancingActivities = 0 }

        if (yfData.cashflowStatementHistory.cashflowStatements[0].totalCashFromOperatingActivities !== undefined && yfData.cashflowStatementHistory.cashflowStatements[0].totalCashFromOperatingActivities !== null ){
          companyData.totalCashFromOperatingActivities = yfData.cashflowStatementHistory.cashflowStatements[0].totalCashFromOperatingActivities.raw; 
        } else { companyData.totalCashFromOperatingActivities = 0 }

        if (yfData.cashflowStatementHistory.cashflowStatements[0].totalCashflowsFromInvestingActivities !== undefined && yfData.cashflowStatementHistory.cashflowStatements[0].totalCashflowsFromInvestingActivities !== null ){
          companyData.totalCashflowsFromInvestingActivities = yfData.cashflowStatementHistory.cashflowStatements[0].totalCashflowsFromInvestingActivities.raw; 
        } else { companyData.totalCashflowsFromInvestingActivities = 0 }

        if (yfData.incomeStatementHistory.incomeStatementHistory[0].costOfRevenue !== undefined && yfData.incomeStatementHistory.incomeStatementHistory[0].costOfRevenue !== null ){
          companyData.costOfRevenue = yfData.incomeStatementHistory.incomeStatementHistory[0].costOfRevenue.raw; 
        } else { companyData.costOfRevenue = 0 }

        if (yfData.incomeStatementHistory.incomeStatementHistory[0].discontinuedOperations !== undefined && yfData.incomeStatementHistory.incomeStatementHistory[0].discontinuedOperations !== null ){
          companyData.discontinuedOperations = yfData.incomeStatementHistory.incomeStatementHistory[0].discontinuedOperations.raw; 
        } else { companyData.discontinuedOperations = 0 }

        if (yfData.incomeStatementHistory.incomeStatementHistory[0].ebit !== undefined && yfData.incomeStatementHistory.incomeStatementHistory[0].ebit !== null ){
          companyData.ebit = yfData.incomeStatementHistory.incomeStatementHistory[0].ebit.raw; 
        } else { companyData.ebit = 0 }

        if (yfData.incomeStatementHistory.incomeStatementHistory[0].effectOfAccountingCharges !== undefined && yfData.incomeStatementHistory.incomeStatementHistory[0].effectOfAccountingCharges !== null ){
          companyData.effectOfAccountingCharges = yfData.incomeStatementHistory.incomeStatementHistory[0].effectOfAccountingCharges.raw; 
        } else { companyData.effectOfAccountingCharges = 0 }

        if (yfData.incomeStatementHistory.incomeStatementHistory[0].extraordinaryItems !== undefined && yfData.incomeStatementHistory.incomeStatementHistory[0].extraordinaryItems !== null ){
          companyData.extraordinaryItems = yfData.incomeStatementHistory.incomeStatementHistory[0].extraordinaryItems.raw; 
        } else { companyData.extraordinaryItems = 0 }

        if (yfData.incomeStatementHistory.incomeStatementHistory[0].grossProfit !== undefined && yfData.incomeStatementHistory.incomeStatementHistory[0].grossProfit !== null ){
          companyData.grossProfit = yfData.incomeStatementHistory.incomeStatementHistory[0].grossProfit.raw; 
        } else { companyData.grossProfit = 0 }

        if (yfData.incomeStatementHistory.incomeStatementHistory[0].incomeBeforeTax !== undefined && yfData.incomeStatementHistory.incomeStatementHistory[0].incomeBeforeTax !== null ){
          companyData.incomeBeforeTax = yfData.incomeStatementHistory.incomeStatementHistory[0].incomeBeforeTax.raw; 
        } else { companyData.incomeBeforeTax = 0 }

        if (yfData.incomeStatementHistory.incomeStatementHistory[0].incomeTaxExpense !== undefined && yfData.incomeStatementHistory.incomeStatementHistory[0].incomeTaxExpense !== null ){
          companyData.incomeTaxExpense = yfData.incomeStatementHistory.incomeStatementHistory[0].incomeTaxExpense.raw; 
        } else { companyData.incomeTaxExpense = 0 }

        if (yfData.incomeStatementHistory.incomeStatementHistory[0].interestExpense !== undefined && yfData.incomeStatementHistory.incomeStatementHistory[0].interestExpense !== null ){
          companyData.interestExpense = yfData.incomeStatementHistory.incomeStatementHistory[0].interestExpense.raw; 
        } else { companyData.interestExpense = 0 }

        if (yfData.incomeStatementHistory.incomeStatementHistory[0].minorityInterest !== undefined && yfData.incomeStatementHistory.incomeStatementHistory[0].minorityInterest !== null ){
          companyData.minorityInterest = yfData.incomeStatementHistory.incomeStatementHistory[0].minorityInterest.raw; 
        } else { companyData.minorityInterest = 0 }

        if (yfData.incomeStatementHistory.incomeStatementHistory[0].netIncome !== undefined && yfData.incomeStatementHistory.incomeStatementHistory[0].netIncome !== null ){
          companyData.netIncome = yfData.incomeStatementHistory.incomeStatementHistory[0].netIncome.raw; 
        } else { companyData.netIncome = 0 }

        if (yfData.incomeStatementHistory.incomeStatementHistory[0].netIncomeApplicableToCommonShares !== undefined && yfData.incomeStatementHistory.incomeStatementHistory[0].netIncomeApplicableToCommonShares !== null ){
          companyData.netIncomeApplicableToCommonShares = yfData.incomeStatementHistory.incomeStatementHistory[0].netIncomeApplicableToCommonShares.raw; 
        } else { companyData.netIncomeApplicableToCommonShares = 0 }

        if (yfData.incomeStatementHistory.incomeStatementHistory[0].netIncomeFromContinuingOps !== undefined && yfData.incomeStatementHistory.incomeStatementHistory[0].netIncomeFromContinuingOps !== null ){
          companyData.netIncomeFromContinuingOps = yfData.incomeStatementHistory.incomeStatementHistory[0].netIncomeFromContinuingOps.raw; 
        } else { companyData.netIncomeFromContinuingOps = 0 }

        if (yfData.incomeStatementHistory.incomeStatementHistory[0].nonRecurring !== undefined && yfData.incomeStatementHistory.incomeStatementHistory[0].nonRecurring !== null ){
          companyData.nonRecurring = yfData.incomeStatementHistory.incomeStatementHistory[0].nonRecurring.raw; 
        } else { companyData.nonRecurring = 0 }

        if (yfData.incomeStatementHistory.incomeStatementHistory[0].operatingIncome !== undefined && yfData.incomeStatementHistory.incomeStatementHistory[0].operatingIncome !== null ){
          companyData.operatingIncome = yfData.incomeStatementHistory.incomeStatementHistory[0].operatingIncome.raw; 
        } else { companyData.operatingIncome = 0 }

        if (yfData.incomeStatementHistory.incomeStatementHistory[0].otherItems !== undefined && yfData.incomeStatementHistory.incomeStatementHistory[0].otherItems !== null ){
          companyData.otherItems = yfData.incomeStatementHistory.incomeStatementHistory[0].otherItems.raw; 
        } else { companyData.otherItems = 0 }

        if (yfData.incomeStatementHistory.incomeStatementHistory[0].otherOperatingExpenses !== undefined && yfData.incomeStatementHistory.incomeStatementHistory[0].otherOperatingExpenses !== null ){
          companyData.otherOperatingExpenses = yfData.incomeStatementHistory.incomeStatementHistory[0].otherOperatingExpenses.raw; 
        } else { companyData.otherOperatingExpenses = 0 }
        
        if (yfData.incomeStatementHistory.incomeStatementHistory[0].researchDevelopment !== undefined && yfData.incomeStatementHistory.incomeStatementHistory[0].researchDevelopment !== null ){
          companyData.researchDevelopment = yfData.incomeStatementHistory.incomeStatementHistory[0].researchDevelopment.raw; 
        } else { companyData.researchDevelopment = 0 }

        if (yfData.incomeStatementHistory.incomeStatementHistory[0].sellingGeneralAdministrative !== undefined && yfData.incomeStatementHistory.incomeStatementHistory[0].sellingGeneralAdministrative !== null ){
          companyData.sellingGeneralAdministrative = yfData.incomeStatementHistory.incomeStatementHistory[0].sellingGeneralAdministrative.raw; 
        } else { companyData.sellingGeneralAdministrative = 0 }

        if (yfData.incomeStatementHistory.incomeStatementHistory[0].totalOperatingExpenses !== undefined && yfData.incomeStatementHistory.incomeStatementHistory[0].totalOperatingExpenses !== null ){
          companyData.totalOperatingExpenses = yfData.incomeStatementHistory.incomeStatementHistory[0].totalOperatingExpenses.raw; 
        } else { companyData.totalOperatingExpenses = 0 }

        if (yfData.incomeStatementHistory.incomeStatementHistory[0].totalOtherIncomeExpenseNet !== undefined && yfData.incomeStatementHistory.incomeStatementHistory[0].totalOtherIncomeExpenseNet !== null ){
          companyData.totalOtherIncomeExpenseNet = yfData.incomeStatementHistory.incomeStatementHistory[0].totalOtherIncomeExpenseNet.raw; 
        } else { companyData.totalOtherIncomeExpenseNet = 0 }

        if (yfData.incomeStatementHistory.incomeStatementHistory[0].totalRevenue !== undefined && yfData.incomeStatementHistory.incomeStatementHistory[0].totalRevenue !== null ){
          companyData.totalRevenue = yfData.incomeStatementHistory.incomeStatementHistory[0].totalRevenue.raw; 
        } else { companyData.totalRevenue = 0 }
 
        // price.marketCap
        // summaryDetail.beta
        // price.regularMarketPrice
        // summaryDetail.fiftyTwoWeekHigh
        // summaryDetail.fiftyTwoWeekLow
        //summaryDetail.dividendRate
        // summaryDetail.dividendYield
        // summaryDetail.exDividendDate.fmt
        // summaryDetail.fiveYearAvgDividendYield
        // summaryDetail.forwardPE
        // summaryDetail.payoutRatio
        // summaryDetail.trailingAnnualDividendRate
        // summaryDetail.trailingAnnualDividendYield
        // summaryDetail.trailingPE

        console.log(companyData);
        handleCreate();
      }).catch(function (error) {
        alert (error);
        console.error(error);
      });
  
  }

  return (
    <>
    <Header/>
    <Button onClick={getYFData()}>Update</Button>
    </>
)
}