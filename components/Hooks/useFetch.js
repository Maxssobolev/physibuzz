//useFetch.js
import { useState, useEffect } from 'react';
import api from '../../apiConfig';

function useFetch(url) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        setLoading('loading...')
        setError(null);
        api.get(url)
            .then(res => {
                setLoading(false);
                //checking for multiple responses for more flexibility 
                //with the url we send in.
                setData(res);

            })
            .catch(err => {
                setLoading(false)
                setError('An error occurred. Awkward..')
            })

    }, [url])

    return { data, loading, error }
}
export default useFetch;