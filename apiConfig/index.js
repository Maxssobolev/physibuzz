import axios from 'axios';

import useStorage from '../components/Hooks/useStorage';
const token = useStorage().getItem('userToken', 'local')

const axiosInstance = axios.create({
    baseURL: 'https://physibuzz.rehabapps.net',
    headers: {
        post: {
            "Accept": "application/json",
            "cache-control": "no-cache, private",
            "content-type": "application/json",
            "x-ratelimit-limit": "60",
            "x-ratelimit-remaining": "59",
            "access-control-allow-origin": "*",
            'Authorization': `Bearer ${token}`

        },
        get: {
            "Accept": "application/json",
            'Authorization': `Bearer ${token}`

        },
        put: {
            "Accept": "application/json",
            'Authorization': `Bearer ${token}`
        }
    }
});

module.exports = axiosInstance;