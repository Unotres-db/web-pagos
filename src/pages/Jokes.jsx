import React, { useState, useEffect } from 'react';
import useFetchPT from '../hooks/useFetchPT';

const Jokes = () => {

  const [ companyIdSearch, setCompanyIdSearch ] = useState("CVX");
  const [ companiesList, setCompaniesList] = useState(null);
  const [ companySearchName, setCompanySearchName] = useState(null);
  const [ companyData, setCompanyData] = useState(null);
  const [ assumptions, setAssumptions] = useState(null);

  // const { loading, error, refetch } = useFetchPT(`http://localhost:3333/companies, { headers :{ Authorization: ${companyIdSearch},}}`);
  const { isLoading, isError, refetch } = useFetchPT("http://localhost:3333/companies");
  // const { isLoading: isLoadingCompany, isError:isErrorCompany, refetch: refetchCompany } = useFetchPT('http://localhost:3333/companies', { headers :{ Authorization: companyIdSearch,}});
  const { isLoading: isLoadingCompany, isError:isErrorCompany, refetch: refetchCompany } = useFetchPT('http://localhost:3333/companies', { headers :{ Authorization: companyIdSearch,}});

  const [ allCompanies, setAllCompanies] = useState(null);

  // 'http://localhost:3333/companies', { headers :{ Authorization: companyIdSearch,}}
  // 
  // "https://v2.jokeapi.dev/joke/Any"
  // `http://localhost:3333/companies, { headers :{ Authorization: ${companyIdSearch},}}`
// 'financials',{ headers :{Authorization: companyIdSearch,}}
  // if (loading) return <h1> LOADING...</h1>;

  // if (error) console.log(error);

  function successCallback(dataFromApi){
    setAllCompanies(dataFromApi)
    // Note: Uses 'react-search-autocomplete' parameters (name, id) not the state names such as shortName, companyId...
    let searchListCompanies = Array.from({ length: dataFromApi.length } , () =>({id:"", shortName:"", name:""}));
    for (let i = 0 ; i < dataFromApi.length; i++) {
      searchListCompanies[i].name = dataFromApi[i].symbol + " - " + dataFromApi[i].shortName
      searchListCompanies[i].id = dataFromApi[i].symbol 
      searchListCompanies[i].shortName = dataFromApi[i].shortName
    }
    setCompaniesList (searchListCompanies)
  }

  function successCallbackCompany(dataFromApi) {
      let shares = 0;
      const company = dataFromApi;
      if (company.marketCap > 0 && company.regularMarketPrice > 0 ) {
        shares = company.marketCap/1000000/company.regularMarketPrice //see api value
      } 
      setCompanySearchName(company.symbol + " - " + company.shortName);
      setCompanyData({symbol:company.symbol, shortName:company.shortName, sharesOutstanding: shares, regularMarketPrice:company.regularMarketPrice, fiftyTwoWeekLow:company.fiftyTwoWeekLow, fiftyTwoWeekHigh:company.fiftyTwoWeekHigh, marketCap:company.marketCap/1000000000, beta:company.beta, totalCash: company.totalCash/1000000000, totalDebt: company.totalDebt/1000000000})
      setAssumptions (prevState => ({...prevState, companyBeta: company.beta, revenueGrowth:"", marginTarget:"", opexGrowth:"", interestGrowth:"", otherGrowth:"",taxRate:"",capexGrowth:"",nwcGrowth:"",cashFlowGrowthRate:"",cashFlowDiscretePeriod:5 }))
      // clean previous company forecasted data
      // ++++++++++++
      // setForecastedFinancialData(forecastedInitialValues);
      // setCombinedFinancialData(historicalFinancialData);
  }

  useEffect (()=> {
    refetch(successCallback);
    refetchCompany(`http://localhost:3333/companies, { headers :{ Authorization: ${companyIdSearch},}}`, successCallbackCompany);
  },[]);

  useEffect (()=> {
    // refetchCompany('http://localhost:3333/companies', { headers :{ Authorization: companyIdSearch,}}, successCallbackCompany);
    refetchCompany(`http://localhost:3333/companies, { headers :{ Authorization: ${companyIdSearch},}}`, successCallbackCompany);

  },[companyIdSearch]);

  // useEffect (()=> {
  //   // refetch();
  //   if (companies){
  //     setAllCompanies(companies);
  //   }
  // },[companies]);

  return (
    <div >
      {console.count()}
      <h1>
        {/* {companiesList? <>
          {companiesList.map ( (currElement)=> ( <>
          <div>{currElement.name}</div>
          </>
        ))}
        </>: <div>No hay info de la lista de empresas</div>} */}
    

        {/* {companies? <>
          {companies.map ( (currElement)=> ( <>
          <div>{currElement.symbol}</div>
          <div>{currElement.shortName}</div>
          </>
        ))}
        </>: <div>No hay info</div>} */}
        {companyData? <>
          <div>{companyData.symbol}</div>
          <div>{companyData.regularMarketPrice}</div>
          <div>{companyData.marketCap}</div>
          </>
      : <div>No hay info de la empresa</div>}

        {/* {joke?.setup} : {joke?.delivery} */}
      </h1>

      {/* <button onClick={refetch(successCallback)}>Refetch</button> */}
    </div>
  );
}

export default Jokes;