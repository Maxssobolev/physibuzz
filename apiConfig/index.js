import axios from 'axios';
import { cookies } from '../pages/_app'
const ISSERVER = typeof window === "undefined";
let token = ''
if (!ISSERVER) {
    token = localStorage.getItem('userToken')
}

const axiosInstance = axios.create({
    baseURL: 'https://physibuzz.rehabapps.net',
    headers: {
        post: {
            "cache-control": "no-cache, private",
            "content-type": "application/json",
            "x-ratelimit-limit": "60",
            "x-ratelimit-remaining": "59",
            "access-control-allow-origin": "*",
            'Authorization': `Bearer ${cookies.get('userToken') || token || 'not stated'}`

        },
        get: {

            'Authorization': `Bearer ${cookies.get('userToken') || token || 'not stated'}`

        },
        put: {
            'Authorization': `Bearer ${cookies.get('userToken') || token || 'not stated'}`
        }
    }
});

module.exports = axiosInstance;