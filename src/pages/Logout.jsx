import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

import { LoginContext } from '../helpers/Context';
import useAxios from '../hooks/useAxios';
import api from '../services/api';

export default function Logout(){
  const { userData, setUserData } = useContext(LoginContext);
  const { userId } = userData;
  const { axiosFetch: postLogout, isLoading: isLoadingLogout, error: isErrorLogout } = useAxios();
  const history = useHistory();

  const getLogoutSuccessCb=()=>{
    setUserData({userId:"", userPassword:"", userProduct:"", userFirstName:"", userLastName:"", userCountry:"", userCountryName:"", userPhone:"", userBirthday:""})
    history.push("/home")
  }

  const postLogoutErrorCb=()=>{
    setUserData({userId:"", userPassword:"", userProduct:"", userFirstName:"", userLastName:"", userCountry:"", userCountryName:"", userPhone:"", userBirthday:""})
    history.push("/home")
  }

  useEffect(() => {
    postLogout({ axiosInstance: api, method: 'POST', url: `/logout`, data:{userId},requestConfig: { headers: {'Authorization': userId,},}},getLogoutSuccessCb, postLogoutErrorCb);
  }, []);

  return(
    <>
    </>
  )
}