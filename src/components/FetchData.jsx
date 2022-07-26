import React, {useState, useEffect} from 'react';

export default function FetchData (request, successCallback, errorCallback){

  const [ data, setData ] = useState(null);
  const [ isLoading, setIsLoading ] = useState(false);
  const [ error, setError ] = useState(null);

  useEffect(() => {
    setIsLoading (true);
    // useFetch(api.get('companies', { headers :{ Authorization: `${companyIdSearch}`,}})
    request.then ((response) =>  {
    setData (response.data);
    successCallback();
        
    })
    .catch ((err) => {
      setError(err);
      errorCallback()
    })
    .finally (() => {
      setIsLoading (false);
    });
  },[ ]);

  return { data, isLoading, error }
}