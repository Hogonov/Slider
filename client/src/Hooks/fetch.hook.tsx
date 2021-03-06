import {useCallback, useState} from 'react';
import {toast} from "react-toastify";

export const useHttp = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState(null);
    const request = useCallback(async (url:string, method:string = 'GET', body:any = null, headers:any = {}) => {
        try {
            setLoading(true)
            if (body) {
                body = JSON.stringify((body))
                headers['Content-type'] = 'application/json'
            }
            const response = await fetch(url, {method, body, headers})
            const data = await response.json()

            if (!response.ok) {
                toast(data.message)
                throw new Error(data.message || 'Something error')
            }
            setLoading(false)
            toast(data.message)
            return data
        } catch (e) {

        }

    }, []);

    const clearError = useCallback(() => setError(null), []);

    return {loading, request, error, clearError};
};