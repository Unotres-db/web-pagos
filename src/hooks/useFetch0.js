import { useState } from "react";
import api from "../services/api";
export default function useFetch0 () {

  const [ data, setData ] = useState(null);
  const [ isLoading, setIsLoading ] = useState(false);
  const [ error, setError ] = useState(null);
  
  // api.delete (`valuations/${valuationId}`,{ headers : { Authorization: "martincsl",}})
  const refetch = (companyIdSearch) => {
    setIsLoading(true);
    api.get(`'companies', { headers :{ Authorization: ${companyIdSearch},}}`).then((response) => {
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