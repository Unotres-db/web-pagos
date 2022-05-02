import { useEffect, useState } from "react";

import api from "../services/api";
// axios.get(`https://statsapi.web.nhl.com/api/v1/teams/${teams[team].id}/roster`)
//.get("http://localhost:4000/customer/lookup", {
//  params: { name }
function useFetch2 (url, headerParam) {

  const [ data, setData ] = useState(null);
  const [ isLoading, setIsLoading ] = useState(false);
  const [ error, setError ] = useState(null);
  
  useEffect(() => {
    setIsLoading (true);
    // useFetch(api.get('companies', { headers :{ Authorization: `${companyIdSearch}`,}})
      api.get(url, { headers :{ Authorization: headerParam,}}).then ((response) => {
        console.log("Entrou em fetch2: " + headerParam);
        console.log(response.data);
        setData (response.data);
        
      })
      .catch ((err) => {
        setError(err);
      })
      .finally (() => {
        setIsLoading (false);
      });
  },[url, headerParam ]);
// }, [request]);


  const refetch = (url, headerParam) => {
    setIsLoading(true);
    api.get(url, { headers :{ Authorization: headerParam,}}).then((response) => {
        setData(response.data);
        // console.log(response.data)
        return response.data
      })
      .catch((err) => {
        setError(err);
      })
      .finally((response) => {
        setIsLoading(false);
      });
      
  };

  return { data, isLoading, error, refetch };
}

export default useFetch2;