import { useEffect, useState } from 'react';
import api from '../../apiConfig/index'
import useStorage from './useStorage';

export default function useCurrentUser() {
    const { getItem } = useStorage()
    const token = getItem('userToken', 'local')
    const [user, setUser] = useState(null)

    const getUser = async (token) => {
        const res = await api.get('/api/v1/user/edit/current', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        console.log(res)
        return res;
    }
    useEffect(() => {
        getUser(token).then(r => setUser(r.data.data)).catch(err => {
            console.log(err)
        })
    }, [token])


    return user;
}