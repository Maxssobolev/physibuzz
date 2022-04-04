import axios from 'axios';

import useStorage from '../components/Hooks/useStorage';
const token = useStorage().getItem('userToken', 'local')

const axiosInstance = axios.create({
    baseURL: 'https://physibuzz.rehabapps.net',
    headers: {
        post: {
            "cache-control": "no-cache, private",
            "content-type": "application/json",
            "x-ratelimit-limit": "60",
            "x-ratelimit-remaining": "59",
            "access-control-allow-origin": "*",
            'Authorization': `Bearer ${token}`

        },
        get: {

            'Authorization': `Bearer ${token}`

        },
        put: {
            'Authorization': `Bearer ${token}`
        }
    }
});

module.exports = axiosInstance;