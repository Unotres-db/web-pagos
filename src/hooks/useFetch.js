import { useEffect, useState } from "react";

import api from "../services/api";
// axios.get(`https://statsapi.web.nhl.com/api/v1/teams/${teams[team].id}/roster`)
//.get("http://localhost:4000/customer/lookup", {
//  params: { name }
function useFetch (request) {

  const [ data, setData ] = useState(null);
  const [ isLoading, setIsLoading ] = useState(false);
  const [ error, setError ] = useState(null);
  // console.count();
  useEffect(() => {
    setIsLoading (true);
      request.then ((response) => {
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
    request.then((response) => {
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