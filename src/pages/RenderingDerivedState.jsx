import React, {useState, useEffect} from 'react';

export default function RenderingDerivedState(){
  const [ costOfDebt, setCostOfDebt] = useState(null)
  const costOfCapital = costOfDebt*1.67;
  return  (
    <>
    {console.count()}
    <div>
      <input
        name="DebtCost"
        type="number"
        onChange = {((e) => setCostOfDebt(e.target.value))}
        value= {costOfDebt}
      />
    </div>
    { costOfDebt ? <>

      <div>{costOfDebt}</div>
      <p>Cost of Capital</p>
      <p>{costOfCapital}</p>
    </>: 0}

    </>
  )
}