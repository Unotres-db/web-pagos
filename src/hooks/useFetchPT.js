import { useEffect, useState } from "react";
import axios from 'axios';

function useFetchPT () {
  // function useFetchPT (url) {

  const [ data, setData ] = useState(null);
  const [ isLoading, setIsLoading ] = useState(false);
  const [ isError, setIsError ] = useState(null);

  // useEffect(() => {
  //   setIsLoading (true);
  //   axios.get(url).then ((response) => {
  //     // request.then ((response) => {
  //       setData (response.data);
  //   })
  //   .catch ((err) => {
  //       setError(err);
  //   })
  //   .finally (() => {
  //     setIsLoading (false);
  //   });
  // },[]);

// }, [request]);

  const refetch = (url, successCallback) => {
  // const refetch = (request, successCallback) => {

    setIsLoading(true);
    // request.then((response) => {
    axios.get(url).then ((response) => {  
      setData(response.data);
      successCallback(response.data);
    })
    .catch((err) => {
      setIsError(err);
    })
    .finally(() => {
      setIsLoading(false);
    });
  };

  return { data, isLoading, isError, refetch };
}

export default useFetchPT;