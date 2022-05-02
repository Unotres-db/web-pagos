import React, {useState} from 'react';

export default function useValuationForm ({assumptions, setAssumptions}){
  const [ formErrors, setFormErrors] = useState({revenueGrowth:"", marginTarget:"", opexGrowth:"", interestGrowth:"", otherGrowth:"",cashFlowGrowthRate:"", taxRate:"", capexGrowth:"", nwcGrowth:"", perpetualGrowthRate: "", cashFlowDiscretePeriod:"", companyBeta:"", riskFreeReturn:"", marketReturn:"", debtTotalRatio:"", costOfDebt:""})
  
  function noBlanks (value) {
    if (value === "") {
        return {
          valid: false,
          message: "Please enter a value"
        }
    } 
    return {valid: true}
  }
  function isValidTaxRate (value) {
    if (value > 100) {
      return {
        valid: false,
        message: "Maximum of 100"
      }
    } return {valid: true}
  }

  function isValidDiscretePeriod(value){
    if (value === "") {
      return {
        valid: false,
        message: "Please enter a value"
      }
    } 
    if (value <= 0){
      return {
        valid: false, 
        message: "Minimum value is 1"
      }
    }
    if ( value === 0 || value > 30) {
      return {
        valid: false, 
        message: "Maximum value of 30"
      }
    }
    return {valid: true}
  }

  const handleChange = (e, validators) =>{
    const target = e.target;
    setAssumptions (prevState => ({...prevState, [target.name]:target.value }))
    handleValidators(target, validators);
  }

  const handleValidators = (target, validators) => {
    validators.forEach( validation => {         // array 
    const result = validation (target.value)    // value="martin" ou "0985 290979"...
    const errors = formErrors [target.name]     // le os erros do "vetor"
    if (result.valid) {                      // se o retorno da funcao eh true, ou seja se o input eh valido.....
      setFormErrors (prevState => ( {...prevState, [target.name]: ""}))
    } else { 
        if (!errors.includes(result.message)) {   // se ja existe a mensagem, nao inclui novamente
          setFormErrors (prevState => ( {...prevState, [target.name]: result.message}))
        }
      }
    })
  }

  return { formErrors, handleChange, noBlanks, isValidTaxRate, isValidDiscretePeriod }
}