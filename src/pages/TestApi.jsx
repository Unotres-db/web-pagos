import React, { useState, useEffect } from 'react';
// import useFetchPT from '../hooks/useFetchPT';
import useAxios from '../hooks/useAxios';
// import api from '../services';
// import axios from '../services/axiosApi';
import valuationsWebApi from '../services/valuationsWebApi';

const TestApi = () => {
  const userId="martincsl";
  const [ companyIdSearch, setCompanyIdSearch ] = useState("CVX");
  const [ companiesList, setCompaniesList] = useState(null);
  const [ companySearchName, setCompanySearchName] = useState(null);
  const [ companyData, setCompanyData] = useState(null);
  const [ assumptions, setAssumptions] = useState(null);
  const [ allCompanies, setAllCompanies] = useState(null);
  const [ valuationsList, setValuationsList] = useState(null);
  const { axiosFetch: getAllCompanies} = useAxios();
  const { axiosFetch: getCompany} = useAxios();
  const { axiosFetch: getValuations} = useAxios();

  function successCallbackValuations(apiData){
    setValuationsList(apiData)
  }

  function successCallback(apiData){
    setAllCompanies(apiData)
    //++++ Probar con array.filter
    // Note: Uses 'react-search-autocomplete' parameters (name, id) not the state names such as shortName, companyId...
    let searchListCompanies = Array.from({ length: apiData.length } , () =>({id:"", shortName:"", name:""}));
    for (let i = 0 ; i < apiData.length; i++) {
      searchListCompanies[i].name = apiData[i].symbol + " - " + apiData[i].shortName
      searchListCompanies[i].id = apiData[i].symbol 
      searchListCompanies[i].shortName = apiData[i].shortName
    }
    setCompaniesList (searchListCompanies)
  }

  function successCallbackCompany(apiData) {
      let shares = 0;
      const company = apiData;
      if (company.marketCap > 0 && company.regularMarketPrice > 0 ) {
        shares = company.marketCap/1000000/company.regularMarketPrice //see api value
      } 
      setCompanySearchName(company.symbol + " - " + company.shortName);
      setCompanyData({symbol:company.symbol, shortName:company.shortName, sharesOutstanding: shares, regularMarketPrice:company.regularMarketPrice, fiftyTwoWeekLow:company.fiftyTwoWeekLow, fiftyTwoWeekHigh:company.fiftyTwoWeekHigh, marketCap:company.marketCap/1000000000, beta:company.beta, totalCash: company.totalCash/1000000000, totalDebt: company.totalDebt/1000000000})
      setAssumptions (prevState => ({...prevState, companyBeta: company.beta, revenueGrowth:"", marginTarget:"", opexGrowth:"", interestGrowth:"", otherGrowth:"",taxRate:"",capexGrowth:"",nwcGrowth:"",cashFlowGrowthRate:"",cashFlowDiscretePeriod:5 }))
  }

  useEffect (()=> {

    getAllCompanies ({axiosInstance: valuationsWebApi, method: 'GET', url: '/companies', requestConfig: { headers: {'Content-Language': 'en-US',}}},successCallback);
    getCompany({axiosInstance: valuationsWebApi, method: 'GET', url: `companies/${companyIdSearch}`,requestConfig: {headers: {'Content-Language': 'en-US',}}},successCallbackCompany);
    getValuations({ axiosInstance: valuationsWebApi, method: 'GET', url: '/valuations', requestConfig: {headers: {'Authorization': userId,}}},successCallbackValuations);

  },[]);

  return (
    <div >
      {/* {console.count()} */}
      <h1>
        {/* {companiesList? <>
          {companiesList.map ( (currElement)=> ( <>
          <div>{currElement.name}</div>
          </>
        ))}
        </>: <div>No hay info de la lista de empresas</div>} */}
    
        {companyData? <>
          <div style={{color:"blue"}}>{companyData.symbol}</div>
          <div style={{color:"blue"}}>{companyData.regularMarketPrice}</div>
          <div style={{color:"blue"}}>{companyData.marketCap}</div>
          </>
      : <div>No hay info de la empresa</div>}

      {/* { valuationsList? <>
        { valuationsList.map ( (currElement)=> ( <>
          <div style={{color:"green"}}>{currElement.valuationId}</div>
          <div style={{color:"green"}}>{currElement.companyId}</div>
          </>
        ))}
      </>: <div>No hay info de valuations</div>} */}
      </h1>
    </div>
  );
}

export default TestApi;