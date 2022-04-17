// import { useState, useContext } from 'react';
// import { LoginContext } from '../helpers/Context.js';

export default function useForm ({setAssumptions, formErrors, setFormErrors}) {
  
  // const { userId, setUserId, setUserName, setSponsorName} = useContext (LoginContext);
  // const [ values, setValues ] = useState ({ contactName: "", contactMobile: "", contactEmail: "", contactMsg:"", userPassword:"" });
  // const [ formErrors, setFormErrors ] = useState({revenueGrowth:"", marginTarget:"", opexGrowth:"", interestGrowth:"", otherGrowth:"",cashFlowGrowthRate:"", taxRate:"", capexGrowth:"", nwcGrowth:"", perpetualGrowthRate: "", cashFlowDiscretePeriod:"", companyBeta:"", riskFreeReturn:"", marketReturn:"",costOfDebt:""});
  // const { contactName, contactMobile, contactEmail, contactMsg, userPassword } = values;

  function noBlanks (value) {
    if (value === "") {
        return {
          valid: false,
          message: "Esta información es requerida"
        }
    } 
    return {valid: true}
  }

  function isValidUser (value) {
    if (value === "") {
      return {
        valid: false, 
        message: "Esta información es requerida"
      }
    } else if (value==="jmartinez" || value==="mcalcena" || value==="elopez" || value==="admin") {
      return {valid:true}
    } else {
      return {
        valid: false,
        message: "Nombre de usuario no catastrado"
      }
    }
  } 

  function isValidPassword (value) {
    if (value === "") {
      return {
        valid: false,
        message: "Esta información es requerida"
      }
    } else if (value==="jmartinez" || value==="mcalcena" || value==="elopez" || value==="admin") {
        return {valid:true}
    } else {
      return {
        valid: false,
        message: "Clave incorrecta"
      }
    }
  }

  function isValidPhone (value) {
{/*    if (value === "") {
        return {
          valid: false, message: "Esta información es requerida"
        }
    }
*/}
    return {
      //valid: new RegExp(/^((\+595|0)9([6-9][1-6])\d{6})$/).test(value), message: "Numero de celular no valido"
      valid: new RegExp(/^\d*$/).test(value),
      message: "Solamente numeros son permitidos"
    }
  }

  function isValidName (value) {
    if (value === "") {
      return {
        valid: false,
        message: "Esta información es requerida"
      }
    }
    return {
      valid: new RegExp(/^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/u).test(value),
      message: "Solamente letras son permitidas"
    }
  }

  function isValidDiscretePeriod(value){
    if (value === "" || value === 0 || value > 21) {
      return {
        valid: false, 
        message: "Should be a numer between 1 and 20"
      }
    }
  }
  
  function isValidEmail (value) {
    if (value === "") {
      return {
        valid: false, 
        message: "Esta información es requerida"
      }
    }
    return {
      valid: new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/).test(value), 
      message: "No es un e-mail valido"
    }
  }

  function chkFormErrors () {
    let isError = false;
    Object.keys(formErrors).forEach( (key) => {   // key es el nombre del key
      if (formErrors[key] !== ""){                //errors[key] es el contenido del key
        isError=true;
      }
    })

    return isError;
  }
  
  // function chkBlankFormContact () {
  //   let isError = false;
  //   const valuesToCheck={ contactName, contactEmail, contactMsg }
  //   Object.keys(valuesToCheck).forEach( (key) => {   // key es el nombre del key
  //     if (values [key] === ""){                      //values[key] es el contenido del key
  //       setFormErrors(prevState => ( {...prevState, [key]:  "Esta información es requerida"}));
  //       isError=true;
  //     }
  //   })
  //   return isError;
  // }

  // function chkBlankFormLogin () {
  //   let isError = false;
  //   const valuesToCheck = { userId, userPassword }
  //   Object.keys(valuesToCheck).forEach( (key) => {   // key es el nombre del key
  //     if (values [key] === "") {                     //values[key] es el contenido del key
  //       setFormErrors(prevState => ( {...prevState, [key]:  "Esta información es requerida"}));
  //       isError=true;
  //     }
  //   })
  //   return isError;
  // }

  function handleSubmit (event) {
    event.preventDefault();
    {setAssumptions(); // executa a funcao que recebe do formulario
  }
}
  const handleChangeHook = (e, validators) =>{
    const target = e.target;
    setAssumptions (prevState => ({...prevState, [target.name]:target.value }))
    handleValidators(target, validators);
  }


  // const handleChangeUserId = (e, validators) =>{
  //   const target=e.target;
  //   // setUserId (prevState => ({...prevState, [target.name]:target.value }))
  //   setUserId(e.target.value)
  //   handleValidators(target, validators);
  // }

  const handleValidators = (target, validators) => {
    validators.forEach(validation => {         // array 
    const result = validation (target.value)    // value="martin" ou "0985 290979"...
    const errors = formErrors [target.name]     // le os erros do "vetor"
      if (result.valid) {                      // se o retorno da funcao eh true, ou seja se o input eh valido.....
 //       if (errors.includes (result.message)){   //"limpa" as mesgs de erro
          setFormErrors (prevState => ( {...prevState, [target.name]: ""}))
 //       }
      } else { 
          if (!errors.includes(result.message)) {   // se ja existe a mensagem, nao inclui novamente
            setFormErrors (prevState => ( {...prevState, [target.name]: result.message}))
          }
        }
    })
  }

  return { handleChangeHook, handleSubmit,chkFormErrors, isValidName, isValidPhone, isValidEmail, noBlanks, isValidUser, isValidPassword, isValidDiscretePeriod, formErrors }
}