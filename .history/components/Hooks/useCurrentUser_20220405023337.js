import isEmpty from 'lodash.isempty';
import { useEffect, useState } from 'react';
import api from '../../apiConfig/index'
import useStorage from './useStorage';

export default function useCurrentUser() {
    const { getItem } = useStorage()
    const token = getItem('userToken', 'local')
    const [user, setUser] = useState({})

    const getUser = async (token) => {
        const res = await api.get('/api/v1/user/edit/current', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        return res.data.data;
    }
    useEffect(() => {
        getUser(token).then(user => setUser(user)).catch(err => {
            console.log(err)
        })
    }, [token])


    return isEmpty(user) ? { loading: true } : user;
}