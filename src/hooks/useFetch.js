import { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';

import { format, parse } from 'date-fns';

import { LoginContext } from '../helpers/Context.js';
import useAxios from './useAxios';
import api from '../services/api';
// valuationsList
export default function useFetch ( { setEditMode, setIsSnackbarOpen, setSnackbarMessage } ) {
  const { valuationsList, setValuationsList, userData, setUserData,setSavedValuationData, setIsValuationSample } = useContext (LoginContext);
  const { userId, userFirstName, userLastName } = userData
  const [ deleteValuationId, setDeleteValuationId ] = useState("");  //Poderia ser uma variavel let?
  const [ dialogOptions, setDialogOptions] = useState({severity:"",title:"",message:"",buttons:{}, action:""});
  const [ isDialogOpen, setIsDialogOpen] = useState(false);
  const { response: data, axiosFetch: postForecastedFinancials } = useAxios();
  const { axiosFetch: delValuation } = useAxios();
  const { axiosFetch: postValuation } = useAxios();
  const { axiosFetch: putValuation } = useAxios();
  const { axiosFetch: postUpdatePassword} = useAxios(); 
  const { axiosFetch: postSession } = useAxios();
  const { axiosFetch: postFollower } = useAxios();
  const { axiosFetch: postFollowee } = useAxios();
  const { axiosFetch: delFollower } = useAxios();
  const { axiosFetch: delFollowee } = useAxios();
  const { response: userUpdateData, axiosFetch: putUser} = useAxios();
  // const { axiosFetch: postComment} = useAxios();
  const { response: currUserData, axiosFetch: getUser } = useAxios();
  // const { response: postedUserData, axiosFetch: postUser } = useAxios();
  const history = useHistory();

  const deleteSuccessCb=(apiData)=>{
    if (valuationsList !== undefined && valuationsList.length > 0){ // elimina el valuation de del listado...
      setValuationsList(valuationsList.filter(currValuation => currValuation.valuationId !== apiData.valuationId));
    } 
    setDialogOptions({severity:"success", title:"Thank You !", message:"Your Valuation was successfully deleted.",buttons:{button1:"Ok"}, action:"deleted"})
    setIsDialogOpen (true);
  }

  function handleDelete (valuationId){
    setDeleteValuationId(valuationId);
    setDialogOptions({severity:"warning", title:"Alert", message:"Are you sure you want to delete this valuation ?",buttons:{button1:"Cancel",button2:"Confirm"}, action:"delete"})//button1:"Cancel",button2:"Confirm"
    setIsDialogOpen (true);
  }

  function deleteValuation (valuationIdParam){  
    // const userId = userId; // atualizar para state global com Context
    delValuation({ axiosInstance: api, method: 'DELETE', url: `/valuations/${valuationIdParam}`, requestConfig: { headers: {'Authorization': userId,},}},deleteSuccessCb, errorCallback);
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

  function publishSuccessCallback(apiData){
    if (valuationsList !== undefined && valuationsList.length > 0 ){
      let auxArray = valuationsList  // refatorar? usar diretamente o state, sem var auxiliar?
      const objIndex = valuationsList.findIndex((currValuation => currValuation.valuationId === apiData.valuationId));
      auxArray[objIndex].published = apiData.published;  
      auxArray[objIndex].publishedDate = apiData.publishedDate;  
      setValuationsList(auxArray);// usar prev?
      // setValuationsList ( prevState => ({...prevState, [prevState[objIndex].published]: apiData.published }))
      setSavedValuationData ( prevState => ({...prevState, published: apiData.published, publishedDate: apiData.publishedDate}))
    } 
    // else {
    //     setEditMode("published");
    // }
    setEditMode("published");
    setDialogOptions({severity:"success", title:"Thank You", message:"Your Valuation was sucessfully published.",buttons:{button1:"Ok"},action:"publish"})
    setIsDialogOpen (true);
  }

  function handlePublish (valuationIdParam){  
    const dataToProcess = { valuationId: valuationIdParam, published: "all" }
    putValuation({ axiosInstance: api, method: 'PUT', url: '/publication', data: dataToProcess,requestConfig: { headers: {'Authorization': userId,},}},publishSuccessCallback, errorCallback);
  }

  function errorCallback(errorMessage){
    setDialogOptions({severity:"error", title:"Error", message:errorMessage,buttons:{button1:"Ok"}})
    setIsDialogOpen (true);
  }

  function handleDialogClose (value, action) { 
    setIsDialogOpen (false);
    setDialogOptions({severity:"",title:"",message:"",buttons:{},action:""});
    if (value === "Confirm" && action ==="delete"){  
      deleteValuation(deleteValuationId,deleteSuccessCb, errorCallback);
    } else {
      if (value === "Ok" && action ==="deleted"){ 
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
  setIsValuationSample(false);
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

  const forecastedSucessCb=(apiData)=> {
    // alert("exito grabando en forecasted")
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

const deleteFollowerSuccessCb=(apiData)=>{

}

const deleteFollowerErrorCb=(apiData)=>{
  alert("There was a problem in the server")
}

const deleteFolloweeSuccessCb=(apiData)=>{

}

const deleteFolloweeErrorCb=(apiData)=>{
  alert("There was a problem in the server")
}

function deleteFollower (userId, profileId){  
  // const dataToProcess ={ userId: profileId, followerId:userId }
  // delFollower({ axiosInstance: api, method: 'DELETE', url: "/followers", data: dataToProcess, requestConfig: { headers: {'Authorization': userId,},}},deleteFollowerSuccessCb, deleteFollowerErrorCb);
  delFollower({ axiosInstance: api, method: 'DELETE', url: `/followers?userId=${profileId}&&followerId=${userId}`, requestConfig: { headers: {'Authorization': userId,},}},deleteFollowerSuccessCb, deleteFollowerErrorCb);

  // delFollowee({ axiosInstance: api, method: 'DELETE', url: "/followees", data: dataToProcess, requestConfig: { headers: {'Authorization': userId,},}},deleteFolloweeSuccessCb, deleteFolloweeErrorCb);
  delFollowee({ axiosInstance: api, method: 'DELETE', url: `/followees?userId=${userId}&&followeeId=${profileId}`, requestConfig: { headers: {'Authorization': userId,},}},deleteFolloweeSuccessCb, deleteFolloweeErrorCb);

}

const saveFollowerSuccessCb=()=>{
  // alert("Your are following this user ")
}

const saveFollowerErrorCb=()=>{
  alert("There was an error inthe server")
} 

const saveFolloweeSuccessCb=()=>{
  // alert("Your are following this user ")
}

const saveFolloweeErrorCb=()=>{
  alert("There was an error inthe server")
}  

const saveFollower=(userId, profileId)=>{
  postFollower({ axiosInstance: api, method: 'POST', url: '/followers', data: { userId: profileId, followerId:userId }, requestConfig: { headers: {'Authorization': userId,},}},saveFollowerSuccessCb, saveFollowerErrorCb);
  postFollowee({ axiosInstance: api, method: 'POST', url: '/followees', data: { userId: userId, followeeId:profileId }, requestConfig: { headers: {'Authorization': userId,},}},saveFolloweeSuccessCb, saveFolloweeErrorCb);
}

  // function saveUser ({userRegistrationData}){ 
    // console.log(userRegistrationData)
    // const { id, password,firstName, lastName, phone, birthday, country } = userRegistrationData; 
    // const userId = "martincsl"; // atualizar para state global com Context
    // postUser({ : api, method: 'POST', url: '/users', data: userRegistrationData, requestConfig: { headers: {'Authorization': userId,},}},userSuccessCallback, errorCallback("server error"));
  // }

  function userSuccessCallback(){

  }

  const forecastedErrorCb=(apiData)=>{
    // alert ("Erro gravando o forecated");
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

  // const saveValuation2SuccessCb=(apiData, valuationData,setValuationId, setSavedValuationData, forecastedFinancialData)=>{
    const saveValuation2SuccessCb=(apiData)=>{
    const savedDate = format(new Date(),"yyyy MMM,dd"); 
    // const { userId, companyId, shortName, cashFlowAvgGrowth, sumOfCashFlowPresentValue, perpetuityValue, perpetuityPresentValue, enterpriseValue, cash, debt, equityValue, sharesOutstanding, targetStockPrice, dateStockPrice, marketCap, revenueGrowth, marginTarget, opexGrowth, interestGrowth, otherGrowth, taxRate, capexGrowth, nwcGrowth, perpetualGrowthRate, cashFlowDiscretePeriod, companyBeta, riskFreeReturn, marketReturn, debtTotalRatio, costOfDebt, costOfEquity, costOfCapital, published, publishedDate, lastHistoricalYear }=valuationData
    const { valuationId } = apiData;
    // // let dataToProcess = []; 
    // setDialogOptions({severity:"success", title:"Thank You", message:"Your Valuation was sucessfully saved",buttons:{button1:"Ok"},action:"save"})
    // setIsDialogOpen (true);  
    // alert("entrou em valuationSuccess")
    // setValuationId (valuationId);
    // setSavedValuationData((prevState => ({...prevState, valuationId:valuationId, profileId:userId, profileFirstName: firstName, profileLastName: lastName, symbol:companyId, createdAt:savedDate })))
    // dataToProcess = forecastedFinancialData.map((item, index) => ({...item, valuationId:valuationId, forecastedId:valuationId + index.toString(), companyId:valuationData.companyId})) 
    // map and save each period (year) forecasted....
    // dataToProcess.map ( (currElement, index)=> {
    //   const dataFetch = dataToProcess[index]
    //   postForecastedFinancials({ axiosInstance: api, method: 'POST', url: '/forecasted', data:dataFetch, requestConfig: {}}, forecastedSucessCb, forecastedErrorCb);
    // })
    // const newObject ={ valuationId, companyId, shortName, createdAt:savedDate, deletedAt:null, updatedAt:null, targetStockPrice, regularMarketPrice: dateStockPrice, costOfCapital, avgRating: null, userId, firstName, lastName }
    // setValuationsList([...valuationsList, newObject]);
    setEditMode("saved"); // Save option (unlike Publish and Delete) will be always called by valuation page
    setDialogOptions({severity:"success", title:"Thank You", message:"Your Valuation was sucessfully saved",buttons:{button1:"Ok"},action:"save"})
    setIsDialogOpen (true);  
    // alert("valuation saved with success")
    // history.push(`/saved-valuation:${valuationId}`)
  }

  async function saveValuation({ valuationData, companyData, forecastedFinancialData }) {
    const { userId, companyId, targetStockPrice, dateStockPrice, costOfCapital, inputedCostOfCapital, cashFlowAvgGrowth } = valuationData;
    const { shortName, regularMarketPrice } = companyData;
    const savedDate = format(new Date(), "yyyy-MM-dd HH:mm:ss");

    return api.post('/valuations', valuationData)
      .then(response => {
        const { valuationId } = response.data;  // solo recibe el id del backend

        // incluye los objects literals que no hacen parte del post de valuation???
        const newValuationObject={...valuationData, valuationId:valuationId, createdAt:savedDate, updatedAt:savedDate, deletedAt:null, shortName: shortName, regularMarketPrice:regularMarketPrice, avgRating:null, firstName:userFirstName, lastName: userLastName }
        setValuationsList([...valuationsList, newValuationObject]);
        // const newObject ={ valuationId:valuationId, userId:userId, companyId:companyId, shortName:shortName, createdAt:savedDate, deletedAt:null, updatedAt:savedDate, targetStockPrice:targetStockPrice, regularMarketPrice: dateStockPrice, costOfCapital:costOfCapital, avgRating: null,  firstName:userFirstName, lastName:userLastName }
        // setValuationsList([...valuationsList, newObject]);//revisar el codigo...
        // setValuationsList((prevValuationsList) => [...prevValuationsList, newObject]);
        setSavedValuationData({valuationId: valuationId, profileId: userId, profileFirstName:userFirstName, profileLastName: userLastName, symbol: companyId, shortName: shortName, createdAt: savedDate, updatedAt:savedDate, published:null, publishedDate:null});
        setEditMode("saved");
        // history.push(`/saved-valuation:${valuationId}`);
      })
      .catch(function (err) {
        // alert("erro em post valuation" + err.response);
        // console.log("erro em post valuation" + err.response)
        if (err.response) {
          const errorMsg = Object.values(err.response.data);
          errorCallback("There was an error in the database access. Valuation was not saved. Please try later.");
        } else if (err.request) {
          errorCallback("There was an error in the server access. Valuation was not saved. Please try later.");
        } else {
          errorCallback("There was an unexpected error in the server. Valuation was not saved. Please try later.");
        }
      });
  }
  
  return { saveUser2, saveFollower, deleteFollower, updatePassword, updateUser, createSession, checkUserById, saveValuation, handlePublish, handleDelete, deleteValuation, dialogOptions, setDialogOptions, handleDialogClose, isDialogOpen, setIsDialogOpen }
}