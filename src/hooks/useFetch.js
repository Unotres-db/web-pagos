import { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';

import { format, parse } from 'date-fns';

import { LoginContext } from '../helpers/Context.js';
import useAxios from './useAxios';
import api from '../services/api';

export default function useFetch ( { setEditMode, setIsSnackbarOpen, setSnackbarMessage } ) {
  const { userData, setUserData } = useContext (LoginContext);
  const { userId, userFirstName, userLastName, transactions, setTransactions } = userData
  const [ deleteTransactionId, setDeleteTransactionId ] = useState("");  
  const [ dialogOptions, setDialogOptions] = useState({severity:"",title:"",message:"",buttons:{}, action:""});
  const [ isDialogOpen, setIsDialogOpen] = useState(false);
  const { axiosFetch: delTransaction } = useAxios();
  const { axiosFetch: postUpdatePassword} = useAxios(); 
  const { axiosFetch: postSession } = useAxios();
  const { response: userUpdateData, axiosFetch: putUser} = useAxios();
  const { response: currUserData, axiosFetch: getUser } = useAxios();
  const history = useHistory();


  // refatorar
  const deleteTransactionSuccessCb=(apiData)=>{
    if (transactions !== undefined && transactions.length > 0){ // elimina el valuation de del listado...
      setTransactions(transactions.filter(currTransaction => currTransaction.idTransaccion !== apiData.idTransaccion));
    } 
    setDialogOptions({severity:"success", title:"Gracias !", message:"La factura fue eliminada exitoamente",buttons:{button1:"Ok"}, action:"deleted"})
    setIsDialogOpen (true);
  }

  const deleteTransactionErrorCallback=(apiData)=>{
    alert("error eneliminacion de factura")
  }

  function deleteTransaction (transactionIdParam){  
    // const userId = userId; // atualizar para state global com Context
    alert(transactionIdParam);
    delTransaction({ axiosInstance: api, method: 'DELETE', url: `/transacciones/${transactionIdParam}`, requestConfig: { headers: {'Authorization': 'martincsl@hotmail.com',},}},deleteTransactionSuccessCb, deleteTransactionErrorCallback);
  }

  function handleDeleteTransaction (idTransaccion){
    setDeleteTransactionId(idTransaccion);
    setDialogOptions({severity:"warning", title:"Alert", message:"Esta seguro de eliminar la factura ?",buttons:{button1:"No",button2:"Si"}, action:"delete"})//button1:"Cancel",button2:"Confirm"
    setIsDialogOpen (true);
  }

  function checkUserById (userIdParam){  
    // alert (userIdParam)
    if (userIdParam){
      const userId = "martincsl"; // atualizar para state global com Context
      getUser({ axiosInstance: api, method: 'GET', url: `/users/${userIdParam}`, requestConfig: { headers: {'Authorization': userId,},}},checkUserByIdSuccessCallback, checkUserByIdErrorCallback);
    }
  }

  function checkUserByIdSuccessCallback (apiData){
    // alert("ya esta en el bd")
    setDialogOptions({severity:"alert", title:"Alert", message:"This email is already registered. Please Try another one !",buttons:{button1:"Ok"}})
    setIsDialogOpen (true);
  }

  function checkUserByIdErrorCallback (apiData){
    // alert("no econtro ese email, puede seguir")
  }

  function errorCallback(errorMessage){
    setDialogOptions({severity:"error", title:"Error", message:errorMessage,buttons:{button1:"Ok"}})
    setIsDialogOpen (true);
  }

  function handleDialogClose (value, action) { 
    setIsDialogOpen (false);
    setDialogOptions({severity:"",title:"",message:"",buttons:{},action:""});
    alert("value: "+value)
    if (value === "Si" && action ==="delete"){
      deleteTransaction(deleteTransactionId);
    }
    else {
      if (value === "Ok" && action ==="delete"){ 
        history.push('/home')
      }
    }
  }

const passwordSuccessCb=()=>{
  setIsSnackbarOpen(true)
  setSnackbarMessage("Your password was changed with success!")
}

const passwordErrorCb=()=>{
  alert("There was an error in the server trying to change the password. Please try again in a couple of minutes")
  history.push('/home')
}

const updatePassword=(id, password)=>{
  const dataToProcess={ id, password }
  // alert ("usefetch updatePassword: " + id + password)
// putUpdatePassword({ axiosInstance: api, method: 'PUT', url: '/users', data: dataToProcess,requestConfig: { headers: {'Authorization': id,},}},passwordSuccessCb, passwordErrorCb);
  postUpdatePassword({ axiosInstance: api, method: 'POST', url: '/change-password', data: dataToProcess, requestConfig: { headers: {'Authorization': id,},}},passwordSuccessCb, passwordErrorCb);
}

const sessionSuccessCb=async(apiData)=>{
  // setIsValuationSample(false);
  await setUserData({userId:apiData.id, userPassword: apiData.password, userProduct: apiData.product, userFirstName:apiData.firstName, userLastName:apiData.lastName, userCountry:apiData.country, userCountryName:apiData.countryName,userBirthday:apiData.birthday, userDescription:apiData.description})
  history.push('/home')
}

const sessionErrorCb =()=> {
  history.push('/home')
}

const createSession=(dataToProcess)=>{
  const { id, password } = dataToProcess;
  postSession({ axiosInstance: api, method: 'POST', url: '/session', data: dataToProcess, requestConfig: { headers: {'Authorization': id,},}},sessionSuccessCb, sessionErrorCb);
}

const putUserSuccessCb=(apiData)=>{
    // console.log("apiData: " + apiData.status)// Ni pasa x aca....
    if (apiData.status===200) {
      // setSnackbarMessage("Changes applyed with success")
      // setIsSnackbarOpen(true)
    } else {
      // setSnackbarMessage("There as an error in the server. Please try again later.")
      // setIsSnackbarOpen(true)
    }
  }

  const putUserErrorCb=()=>{
    alert("There was a problem updating the data on the server. Please try later")
    // setIsSnackbarOpen(true)
  }

  const updateUser=(data)=>{ 
    //refatorar...pq nao esta usando dataToProcess?
    const { userRegistrationData } = data;
    const { confirmPassword, ...dataToProcess } = userRegistrationData;
    const userId = userRegistrationData.id;
    putUser({ axiosInstance: api, method: 'PUT', url: '/users', data: dataToProcess, requestConfig: { headers: {'Authorization': userId,},}}, putUserSuccessCb, putUserErrorCb);
  }

  function userSuccessCallback(){

  }

  async function saveTransaction(transaccion)  {
    return api.post('/transacciones', transaccion)
      .then(response => {
        const { idTransaccion: id } = response.data;  // solo recibe el id del backend
        //actualiza el state en el caller
      })
      .catch(function (err) {

        if (err.response) {
          const errorMsg = Object.values(err.response.data);
          errorCallback("Hubo un error en el acceso a la base de datos. Por favor, inténtalo más tarde, gracias!");
        } else if (err.request) {
          errorCallback("Hubo un error en el acceso a la base de datos. Por favor, inténtalo más tarde, gracias!");
        } else {
          errorCallback("Hubo un error en el acceso a la base de datos. Por favor, inténtalo más tarde, gracias!");
        }
      });
  }

  function saveUser2({userRegistrationData}){
    // alert("entrou em saveUser")
    const { product}=userRegistrationData
    // alert("saveUser2, product: " + product)
    const savedDate = format(new Date(),"yyyy MMM,dd");
    api.post('/users', userRegistrationData )
    .then (response => { 
        // const { userCode } = response.data;
        // setDialogOptions({severity:"success", title:"Thank You", message:"Regitration Completed",buttons:{button1:"Ok"},action:"save"})
        // setIsDialogOpen (true);
      })
    .catch (function (err){
      if (err.response) {
        const errorMsg = Object.values(err.response.data); // ver onde gravar a info..localStorage?
        errorCallback("There was an error in the database access. Registration was not completed. Please try later.");
      } else if (err.request) {
          errorCallback("There was an error in the server access. Registration was not completed. Please try later.");
        } else {
          // console.log(err)
            errorCallback("There was an unexpected error in the server. Registration was not completed. Please try later.");
          }
    });
  }

  return { handleDeleteTransaction, saveTransaction, saveUser2, updatePassword, updateUser, createSession, checkUserById, handleDeleteTransaction, dialogOptions, setDialogOptions, handleDialogClose, isDialogOpen, setIsDialogOpen }
}