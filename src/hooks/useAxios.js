// Note: Function based on Dave Gray video
import { useState } from "react";

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
            requestConfig = {}
        } = configObj;
        // signal: ctrl.signal
        let res= null;
        try {
            setLoading(true);
            // const ctrl = new AbortController();
            // setController(ctrl);
            if (data){
                res = await axiosInstance[method.toLowerCase()](url, data, {...requestConfig,});
            } else {
                res = await axiosInstance[method.toLowerCase()](url, {...requestConfig,});
            }
            setResponse(res.data);
            successCallback(res.data)
            // if (res.status === 200){
            //     successCallback(res.data);
            // } else {
            //     errorCallback("Action not authorized for this user.");
            //     // console.log("erro, nao retornou status code 200")
            // }
        } catch (err) {
            // alert("catch error useAxios:" + err.message)
            // console.log(err.message);
            setError(err.message);
            errorCallback()

        } finally {
            setLoading(false);
        }
    }
    return { response, error, loading, axiosFetch };
}