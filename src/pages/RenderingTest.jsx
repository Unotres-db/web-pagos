import React, { useState, useEffect} from 'react';
// tentar fazer o fecth e calular o histrorical
export function RenderingTest() {
  let averages = { revenueGrowth:0, expensesGrowth:0 };
  let empresas = [{symbol:"", shortNamee:""},{symbol:"", shortNamee:""},{symbol:"", shortNamee:""},{symbol:"", shortNamee:""}];
  const [ promedios, setPromedios] = useState({ revenueGrowth:0, expensesGrowth:0 })
  const [ companies, setCompanies] = useState([]);

  averages.revenueGrowth=promedios.revenueGrowth*1.56;
  averages.expensesGrowth=promedios.expensesGrowth*3.5;

  useEffect( ()=> {
    setCompanies([
      {
        symbol:"CVX",
        shortName:"Chevron Corp."
      },
      {
        symbol:"XOM",
        shortName:"Exxon Corp."
      },
      {
        symbol:"PBR",
        shortName:"Petrobras"
      },
      {
        symbol:"SHEL",
        shortName:"Shell PLC"
      },
    ]);
    empresas[0].symbol="CVX";
    empresas[1].symbol="XOM";
    empresas[2].symbol="PBR";
    empresas[3].symbol="SHEL";
    empresas[0].symbol="Chevron";
    empresas[1].symbol="Exxon";
    empresas[2].symbol="Petrobras";
    empresas[3].symbol="SShell";

    // averages.revenueGrowth = 5;
    // averages.expensesGrowth = 3;
    setPromedios ({ revenueGrowth:5, expensesGrowth:3 })
    console.log(averages.revenueGrowth);
  }, []) 

  return (
    <>
    <div>Hello Rendering</div>
    {console.count()}
    { companies ? <>
      { companies.map ( (currElement)=>(
        <div>{currElement.symbol}</div>
      ))}
    </> : null}  
      <p>Variable Averages revenueGrowth</p>
      <div>{averages.revenueGrowth}</div>    
      <p>Variable Averages expensesGrowth</p>
      <div>{averages.expensesGrowth}</div>  
      <p>State Averages revenueGrowth</p>
      <div>{promedios.revenueGrowth}</div>    
      <p>State Averages expensesGrowth</p>
      <div>{promedios.expensesGrowth}</div>  
      { empresas ? <>
      { empresas.map ( (currElement)=>(
        <div>{currElement.symbol}</div>
      ))}
    </> : null}  
    </>
  )

}