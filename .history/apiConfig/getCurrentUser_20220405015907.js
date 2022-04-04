import api from './index'
import useStorage from '../components/Hooks/useStorage';

export const useCurrentUser = () => {
    const { getItem } = useStorage()
    const token = getItem('userToken', 'local')

    const response = await api.get(`users/${username}`, {
        headers: {

        }
    });
    return {
        username,
        name: response.data.name,
        publicReposCount: response.data.public_repos,
        followersCount: response.data.followers
    };
}