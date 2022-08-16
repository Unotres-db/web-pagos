// Note: Function based on Dave Gray video
import { useState, useEffect } from "react";

export default function useAxios () {
    const [response, setResponse] = useState([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false); 
    // const [controller, setController] = useState();

    const axiosFetch = async (configObj, successCallback, errorCallback) => {
        const {
            axiosInstance,
            method,
            url,
            data,
            params,
            headers,
            requestConfig = {}
        } = configObj;
        // signal: ctrl.signal
        try {
            setLoading(true);
            // const ctrl = new AbortController();
            // setController(ctrl);

              const res = await axiosInstance[method.toLowerCase()](url, data? data: params,{ headers } );
  
            // , {...requestConfig}

            // const res = await axiosInstance[method.toLowerCase()](url, {
            //     ...requestConfig,
            // });
            setResponse(res.data);
            if (res.status == 200){
                successCallback(res.data);
            } else {
                errorCallback("Action not authorized for this user.");
                console.log("erro, nao retornou status code 200")
            }
            // successCallback(res.data);
        } catch (err) {
            console.log(err.message);
            errorCallback(`Error Accessing the server. Please try later. ${url}`);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }

    return { response, error, loading, axiosFetch };
}

