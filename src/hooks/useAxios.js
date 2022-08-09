// Function from Dave Gray
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
            requestConfig = {}
        } = configObj;

        // signal: ctrl.signal
        try {
            setLoading(true);
            // const ctrl = new AbortController();
            // setController(ctrl);
            const res = await axiosInstance[method.toLowerCase()](url, {
                ...requestConfig,
                
            });
            // console.log(res);
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
            errorCallback("Error Accessing the server. Please try later.");
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }

    // useEffect(() => {
    //     console.log(controller)

    //     // useEffect cleanup function
    //     return () => controller && controller.abort();

    // }, [controller]);

    return { response, error, loading, axiosFetch };
}

