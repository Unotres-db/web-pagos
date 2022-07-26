import { useEffect, useState } from "react";

// import api from "../services/api";

export default function useFetch3 (request, successCallback, errorCallback) {

  const [ data, setData ] = useState(null);
  const [ isLoading, setIsLoading ] = useState(false);
  const [ error, setError ] = useState(null);

  useEffect(() => {
    setIsLoading (true);
      request.then ((response) => {
        setData (response.data);
        successCallback();
      })
      .catch ((err) => {
        setError(err);
        errorCallback();
      })
      .finally (() => {
        setIsLoading (false);
      });
  },[]);

  return { data, isLoading, error };
}

