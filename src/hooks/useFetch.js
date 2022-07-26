import { useEffect, useState } from "react";
// import axios from 'axios';

function useFetch (request) {

  const [ data, setData ] = useState(null);
  const [ isLoading, setIsLoading ] = useState(false);
  const [ error, setError ] = useState(null);

  useEffect(() => {
    setIsLoading (true);
    request.then ((response) => {
      // request.then ((response) => {
        setData (response.data);
    })
    .catch ((err) => {
        setError(err);
    })
    .finally (() => {
      setIsLoading (false);
    });
  },[]);
// }, [request]);

  const refetch = () => {
    setIsLoading(true);
    // request.then((response) => {
    request.then ((response) => {  
        setData(response.data);
      })
      .catch((err) => {
        setError(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return { data, isLoading, error, refetch };
}

export default useFetch;